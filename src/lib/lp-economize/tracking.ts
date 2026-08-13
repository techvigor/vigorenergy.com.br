import { META_PIXEL_ID } from './config';

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let pixelIniciado = false;

/**
 * Carrega o Meta Pixel base (client-side) só se META_PIXEL_ID estiver configurado.
 * Sem ID configurado, toda função de tracking deste módulo vira no-op — nunca quebra a página.
 * Chamar uma única vez, ao montar a LP /economize.
 */
export function iniciarPixel(): void {
  if (pixelIniciado || !META_PIXEL_ID || window.fbq) return;
  pixelIniciado = true;

  // Snippet oficial do Meta Pixel, sem eval/document.write (seguro para CSP normal).
  const fbq = function (this: Fbq, ...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

export function gerarEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  // Fallback simples para navegadores muito antigos.
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Simulador calculado com valor qualificado (>= VALOR_MINIMO_CONTA). Evento customizado, nunca "Lead". */
export function trackSimulacaoCalculada(params: { faixa_conta: string; origem_destino: 'lp' }): void {
  window.fbq?.('trackCustom', 'SimulacaoCalculada', params);
}

/**
 * Lead fora do critério de valor mínimo (gate do simulador) OU faturas em aberto (gate do formulário).
 * Evento customizado — nunca dispara "Lead", pra não ensinar o algoritmo a buscar o público errado.
 */
export function trackLeadDesqualificado(
  params: Record<string, string | number | null | undefined>,
  eventId?: string
): void {
  window.fbq?.('trackCustom', 'LeadDesqualificado', params, eventId ? { eventID: eventId } : undefined);
}

/**
 * Dispara SÓ na resposta bem-sucedida do servidor (nunca no clique do botão).
 * event_id precisa ser o mesmo enviado à Edge Function/CAPI para a deduplicação funcionar.
 */
export function trackLead(eventId: string, params: Record<string, string | number | null | undefined>): void {
  window.fbq?.('track', 'Lead', params, { eventID: eventId });
}
