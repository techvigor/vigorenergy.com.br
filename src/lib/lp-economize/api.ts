import type { LeadPayload, LeadResponse } from './types';

// fetch() puro em vez do SDK @supabase/supabase-js: a LP não precisa de Postgrest/Realtime/
// GoTrue, só de chamar a Edge Function e subir um arquivo numa signed URL. Evita colocar ~35KB+
// gzip do SDK no bundle de /economize (item 9 — orçamento de 100KB de JS na página).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * Único ponto de contato com o backend. O browser NUNCA insere direto na tabela leads_lp —
 * tudo passa pela Edge Function lp-lead.
 */
export async function enviarLead(payload: LeadPayload): Promise<LeadResponse> {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/lp-lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  const data = (await resp.json().catch(() => null)) as LeadResponse | null;
  if (!resp.ok || !data) {
    throw new Error(data?.error || `Falha ao enviar (HTTP ${resp.status}).`);
  }
  return data;
}

export async function confirmarFatura(leadId: string, faturaPath: string): Promise<void> {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/lp-lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ action: 'confirmar_fatura', leadId, faturaPath }),
  });
  if (!resp.ok) throw new Error(`Falha ao confirmar fatura (HTTP ${resp.status}).`);
}

/** Envia o arquivo pra Supabase Storage usando a URL assinada devolvida pela Edge Function. */
export async function enviarFatura(signedUrl: string, arquivo: File): Promise<void> {
  const resp = await fetch(signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': arquivo.type || 'application/octet-stream' },
    body: arquivo,
  });
  if (!resp.ok) throw new Error(`Falha no upload (HTTP ${resp.status}).`);
}
