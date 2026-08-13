// Edge Function lp-lead — único caminho de escrita pra leads_lp (item 10.5 do spec).
// O browser nunca insere direto na tabela; tudo revalidado aqui, mesmo o que o client já
// validou (validação de browser é conveniência, não segurança).
//
// Secrets usados (SUPABASE_URL/ANON_KEY/SERVICE_ROLE_KEY são injetados automaticamente pelo
// runtime de toda Edge Function do Supabase — não precisam ser configurados manualmente):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  — sempre presentes
//   META_PIXEL_ID, META_CAPI_TOKEN            — TODO: configurar em Project Settings > Edge Functions
//                                                sem eles, a função funciona normalmente e só
//                                                grava capi_status = "sem_config"

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const META_CAPI_TOKEN = Deno.env.get('META_CAPI_TOKEN');

// Precisa ficar em sync com VALOR_MINIMO_CONTA em src/lib/lp-economize/config.ts. O client usa
// o mesmo número só como conveniência de UX (portão do simulador) — aqui é a fonte de verdade
// que decide o campo `qualificado` gravado no banco e qual evento a CAPI dispara.
const VALOR_MINIMO_CONTA = 300;
const RATE_LIMIT_JANELA_MINUTOS = 10;
const RATE_LIMIT_MAX_ENVIOS = 5;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

async function sha256Hex(texto: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// PostgREST direto via fetch, com a service role — ignora RLS por desenho do Supabase.
// Evita importar o SDK inteiro só pra um insert/patch/count simples.
async function pg(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

const DDDS_VALIDOS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43,
  44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77,
  79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);
const STATUS_FATURAS_VALIDOS = new Set(['sempre_em_dia', 'atraso_alguns_dias', 'faturas_em_aberto']);
const TIPOS_IMOVEL_VALIDOS = new Set(['residencia', 'empresa']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Payload = Record<string, any>;

/** Retorna o nome do primeiro campo inválido, ou null se tudo ok. Cidade não é validada contra
 *  a lista completa dos 246 municípios de Goiás de propósito — não é campo de segurança/fraude,
 *  só qualidade de dado, e duplicar a lista aqui criaria mais uma cópia pra manter em sync. */
function validarPayload(body: Payload): string | null {
  if (!body.nome || String(body.nome).trim().split(/\s+/).filter(Boolean).length < 2) return 'nome';
  const digitos = String(body.whatsapp || '').replace(/\D/g, '');
  if (digitos.length < 10 || digitos.length > 11) return 'whatsapp';
  const ddd = parseInt(digitos.slice(0, 2), 10);
  if (!DDDS_VALIDOS.has(ddd)) return 'whatsapp';
  const cidade = String(body.cidade || '').trim();
  if (cidade.length < 2 || cidade.length > 100) return 'cidade';
  if (!TIPOS_IMOVEL_VALIDOS.has(body.tipoImovel)) return 'tipoImovel';
  if (!body.faixaConta || typeof body.faixaConta !== 'string') return 'faixaConta';
  if (typeof body.valorContaInformado !== 'number' || !isFinite(body.valorContaInformado) || body.valorContaInformado <= 0) {
    return 'valorContaInformado';
  }
  if (!STATUS_FATURAS_VALIDOS.has(body.statusFaturas)) return 'statusFaturas';
  if (body.consentimentoLgpd !== true) return 'consentimentoLgpd';
  if (!body.eventId || typeof body.eventId !== 'string') return 'eventId';
  return null;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // ---- Ação secundária: confirmar upload da fatura já feito direto na Storage ----
  if (body?.action === 'confirmar_fatura') {
    const { leadId, faturaPath } = body;
    if (!leadId || !faturaPath) return json({ ok: false, error: 'payload_invalido' }, 400);
    const resp = await pg(`/leads_lp?id=eq.${encodeURIComponent(String(leadId))}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ fatura_path: faturaPath }),
    });
    if (!resp.ok) return json({ ok: false, error: 'falha_ao_confirmar' }, 500);
    return json({ ok: true });
  }

  // ---- Fluxo principal: novo lead ----
  // Honeypot: campo deve chegar vazio. Rejeita com 200 genérico — não entrega a tática pro bot.
  if (body?.website) return json({ ok: false, error: 'validacao_falhou' }, 200);

  const clienteIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
  const ipHash = await sha256Hex(clienteIp || 'sem-ip');

  const janela = new Date(Date.now() - RATE_LIMIT_JANELA_MINUTOS * 60 * 1000).toISOString();
  const rateResp = await pg(
    `/leads_lp?ip_hash=eq.${ipHash}&criado_em=gte.${encodeURIComponent(janela)}&select=id&limit=1`,
    { headers: { Prefer: 'count=exact' } }
  );
  const totalRecente = parseInt(rateResp.headers.get('content-range')?.split('/')[1] || '0', 10);
  if (totalRecente >= RATE_LIMIT_MAX_ENVIOS) {
    return json({ ok: false, error: 'muitas_tentativas' }, 429);
  }

  const campoInvalido = validarPayload(body);
  if (campoInvalido) return json({ ok: false, error: `campo_invalido:${campoInvalido}` }, 400);

  const whatsappDigitos = String(body.whatsapp).replace(/\D/g, '');
  const qualificado = body.valorContaInformado >= VALOR_MINIMO_CONTA && body.statusFaturas !== 'faturas_em_aberto';
  const nome = String(body.nome).trim();

  const registro = {
    nome,
    whatsapp: whatsappDigitos,
    cidade: String(body.cidade).trim(),
    tipo_imovel: body.tipoImovel,
    faixa_conta: body.faixaConta,
    valor_conta_informado: body.valorContaInformado,
    status_faturas: body.statusFaturas,
    qualificado,
    consentimento_lgpd: true,
    consentimento_em: new Date().toISOString(),
    utm_source: body.utmSource ?? null,
    utm_medium: body.utmMedium ?? null,
    utm_campaign: body.utmCampaign ?? null,
    utm_content: body.utmContent ?? null,
    utm_term: body.utmTerm ?? null,
    fbclid: body.fbclid ?? null,
    referrer: body.referrer ?? null,
    event_id: body.eventId,
    user_agent: req.headers.get('user-agent') ?? null,
    ip_hash: ipHash,
  };

  const insertResp = await pg('/leads_lp', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(registro),
  });
  if (!insertResp.ok) {
    return json({ ok: false, error: 'falha_ao_salvar' }, 500);
  }
  const inseridos = await insertResp.json();
  const leadId = inseridos?.[0]?.id;
  if (!leadId) return json({ ok: false, error: 'falha_ao_salvar' }, 500);

  // ---- Meta CAPI, server-side — event_id igual ao do pixel no browser, pra deduplicar.
  // Falha aqui NUNCA derruba a captação: o lead já está salvo antes desta etapa começar. ----
  let capiStatus = 'sem_config';
  if (META_PIXEL_ID && META_CAPI_TOKEN) {
    try {
      const [phHash, fnHash] = await Promise.all([
        sha256Hex(`55${whatsappDigitos}`),
        sha256Hex((nome.split(' ')[0] || '').toLowerCase()),
      ]);
      const capiResp = await fetch(
        `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: [
              {
                event_name: qualificado ? 'Lead' : 'LeadDesqualificado',
                event_time: Math.floor(Date.now() / 1000),
                event_id: body.eventId,
                action_source: 'website',
                event_source_url: body.referrer || undefined,
                user_data: {
                  ph: [phHash],
                  fn: [fnHash],
                  client_ip_address: clienteIp || undefined,
                  client_user_agent: req.headers.get('user-agent') ?? undefined,
                },
                custom_data: {
                  faixa_conta: registro.faixa_conta,
                  cidade: registro.cidade,
                  tipo_imovel: registro.tipo_imovel,
                  status_faturas: registro.status_faturas,
                  origem_destino: 'lp',
                },
              },
            ],
          }),
        }
      );
      capiStatus = capiResp.ok ? 'ok' : `erro_http_${capiResp.status}`;
    } catch {
      capiStatus = 'erro_rede';
    }
  }

  pg(`/leads_lp?id=eq.${leadId}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ capi_status: capiStatus }),
  }).catch(() => {});

  // ---- URL assinada de upload, se o lead anexou fatura (opcional; nunca bloqueia a resposta) ----
  let upload: { signedUrl: string; path: string } | null = null;
  if (body.temFatura) {
    const ext = String(body.faturaExtensao || 'bin').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10) || 'bin';
    const path = `${leadId}/fatura.${ext}`;
    try {
      const signResp = await fetch(`${SUPABASE_URL}/storage/v1/object/upload/sign/faturas-lp/${path}`, {
        method: 'POST',
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (signResp.ok) {
        const signData = await signResp.json();
        upload = { signedUrl: `${SUPABASE_URL}/storage/v1${signData.url}`, path };
      }
    } catch {
      // Upload é opcional — se a assinatura falhar, o lead já está salvo e válido de qualquer forma.
    }
  }

  return json({ ok: true, lead_id: leadId, qualificado, upload });
});
