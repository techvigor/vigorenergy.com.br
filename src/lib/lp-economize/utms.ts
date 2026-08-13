import { UTM_COOKIE_DIAS, UTM_COOKIE_NAME } from './config';

export interface OrigemLead {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  fbclid: string | null;
  gclid: string | null;
  referrer: string | null;
}

const CAMPOS_UTM: (keyof OrigemLead)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
];

function lerCookie(nome: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${nome}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function escreverCookie(nome: string, valor: string, dias: number): void {
  const expira = new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${nome}=${encodeURIComponent(valor)}; expires=${expira}; path=/; SameSite=Lax`;
}

function origemVazia(): OrigemLead {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    fbclid: null,
    gclid: null,
    referrer: null,
  };
}

/**
 * Captura UTMs/click ids da URL atual e do referrer, e persiste em cookie de 30 dias.
 * First-touch: se já existir uma origem salva, ela prevalece — não sobrescreve.
 * Chamar uma vez ao montar a LP.
 */
export function capturarOrigemLead(): OrigemLead {
  const salva = lerCookie(UTM_COOKIE_NAME);
  if (salva) {
    try {
      return { ...origemVazia(), ...(JSON.parse(salva) as Partial<OrigemLead>) };
    } catch {
      // cookie corrompido — cai para recaptura abaixo
    }
  }

  const params = new URLSearchParams(window.location.search);
  const origem = origemVazia();
  for (const campo of CAMPOS_UTM) {
    origem[campo] = params.get(campo);
  }
  origem.referrer = document.referrer || null;

  const temAlgumValor = Object.values(origem).some((v) => v !== null);
  if (temAlgumValor) {
    escreverCookie(UTM_COOKIE_NAME, JSON.stringify(origem), UTM_COOKIE_DIAS);
  }

  return origem;
}

/** Lê a origem já persistida sem tentar recapturar da URL (usado no envio do formulário). */
export function obterOrigemLead(): OrigemLead {
  const salva = lerCookie(UTM_COOKIE_NAME);
  if (!salva) return capturarOrigemLead();
  try {
    return { ...origemVazia(), ...(JSON.parse(salva) as Partial<OrigemLead>) };
  } catch {
    return origemVazia();
  }
}
