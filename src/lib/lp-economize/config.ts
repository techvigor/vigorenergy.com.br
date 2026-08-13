import h1MapData from './h1-map.json';

/**
 * Config único da LP /economize (Campanha 2 — Meta Ads).
 * Tudo que precisa ser ajustado sem tocar em componente vive aqui.
 * Mesmo arquivo (h1-map.json) alimenta este config E o script inline
 * do index.html (injetado em build time por vite.config.ts) — não duplicar a lista.
 */

/**
 * Fração da tarifa de CONSUMO usada na estimativa do simulador. NUNCA exibir 28% como resultado
 * calculado (isso é o "até" do headline, não a estimativa real).
 * Comercial confirmou faixa real de 20% a 28%, variando com o desconto da tarifa de bandeira
 * (que por si só pode chegar a até 100%, à parte do consumo). Fico com a ponta de baixo (20%)
 * de propósito: a Vigor prefere prometer menos e entregar mais na simulação real da Júlia.
 */
export const TAXA_ECONOMIA_ESTIMADA = 0.20;

/** Abaixo deste valor de conta, o lead é desqualificado no próprio simulador (não chega ao formulário). */
export const VALOR_MINIMO_CONTA = 300;

/** null = a seção de prova social (contador de assinantes) não renderiza. */
export const NUMERO_ASSINANTES: number | null = 1000; // "Mais de 1.000" — ver copy em ProvaSocial.tsx

/** null/null = o comparativo de fatura antes/depois não renderiza. */
export const FATURA_ANTES: { valor: number; imagemUrl: string } | null = null; // TODO: validar valores e autorização de uso
export const FATURA_DEPOIS: { valor: number; imagemUrl: string } | null = null; // TODO: validar valores e autorização de uso

/** Número único do WhatsApp usado em toda a LP (CTA fixo, fechamento, /obrigado). Formato: 55DDDNUMERO, só dígitos. */
export const WHATSAPP_NUMERO = '5562991308408'; // Júlia (Inside Sales)

/** Mensagens pré-preenchidas por origem/contexto de clique. */
export const WHATSAPP_MENSAGENS = {
  fechamento: 'Oi! Vi o anúncio da Vigor Energy e quero saber quanto posso economizar na minha conta de luz.',
  obrigado: 'Oi Júlia! Acabei de fazer meu cadastro no site e quero a simulação da minha economia.',
} as const;

export type H1Regra = { contains: string; h1: string };
export type H1Map = { default: string; rules: H1Regra[] };

/** Mapa H1 dinâmico por utm_content — fonte única, também injetada no script inline do index.html. */
export const MAPA_H1_POR_UTM_CONTENT: H1Map = h1MapData as H1Map;

/**
 * Mesma lógica do script inline do index.html, em TS — usada pelo HeroIsland pra renderizar
 * exatamente o H1 que o script síncrono já pintou (mesma fonte de dados, mesmo resultado,
 * sem precisar ler o DOM pra "adivinhar" o que já está lá).
 */
export function resolverH1(search: string): string {
  const params = new URLSearchParams(search);
  const utmContent = params.get('utm_content') || '';
  if (utmContent) {
    for (const regra of MAPA_H1_POR_UTM_CONTENT.rules) {
      if (utmContent.includes(regra.contains)) return regra.h1;
    }
  }
  return MAPA_H1_POR_UTM_CONTENT.default;
}

/** Enquanto false, o evento LeadQualificado (webhook do VigorHub pós análise cadastral) fica pronto mas não dispara. */
export const FLAG_EVENTO_LEAD_QUALIFICADO = false;

/** ID do Pixel do Meta — não é segredo, roda no browser. Ausente = pixel não carrega (tracking vira no-op). */
export const META_PIXEL_ID: string | null = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || null; // TODO: CONFIRMAR

/** Nome do cookie de primeira origem (UTMs/click ids), 30 dias, first-touch. */
export const UTM_COOKIE_NAME = 'vigor_lp_origem';
export const UTM_COOKIE_DIAS = 30;

/** Rodapé mínimo (item 4.9) — mesma razão social usada em /termos-de-uso. */
export const EMPRESA_RAZAO_SOCIAL = 'Vigor Energy Soluções em Energia Ltda.';
export const EMPRESA_CNPJ = '57.072.689/0001-87';
export const EMPRESA_CONTATO_EMAIL = 'contato@vigorenergy.com.br';
export const EMPRESA_CONTATO_TELEFONE = '(62) 99118-3449';

/** Regras de upload de fatura (opcional). */
export const FATURA_UPLOAD_MAX_MB = 10;
export const FATURA_UPLOAD_TIPOS_ACEITOS = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] as const;
