import type { StatusFaturas } from './validation';

/** Corpo enviado para a Edge Function lp-lead ao cadastrar um lead. */
export interface LeadPayload {
  nome: string;
  whatsapp: string; // só dígitos, com DDD
  cidade: string;
  tipoImovel: 'residencia' | 'empresa';
  faixaConta: string;
  valorContaInformado: number;
  statusFaturas: StatusFaturas;
  consentimentoLgpd: boolean;
  temFatura: boolean;
  /** Só a extensão (ex.: "pdf", "jpg") — o nome do arquivo em si não é usado como path, por privacidade. */
  faturaExtensao: string | null;
  eventId: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  fbclid: string | null;
  gclid: string | null;
  referrer: string | null;
  // Honeypot — deve chegar vazio. Nome deliberadamente "normal" pra enganar bots que preenchem tudo.
  website: string;
}

export interface LeadResponse {
  ok: boolean;
  lead_id?: string;
  qualificado?: boolean;
  upload?: { signedUrl: string; path: string } | null;
  error?: string;
}

export interface ConfirmarFaturaPayload {
  action: 'confirmar_fatura';
  leadId: string;
  faturaPath: string;
}
