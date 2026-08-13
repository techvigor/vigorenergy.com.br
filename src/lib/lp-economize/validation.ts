import { DDDS_VALIDOS_BRASIL, digitosWhatsApp } from './format';
import { GOIAS_CIDADES } from './goiasCidades';
import { VALOR_MINIMO_CONTA } from './config';

export function validarNome(nome: string): string | null {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length < 2) return 'Informe seu nome completo (nome e sobrenome).';
  return null;
}

export function validarWhatsApp(valorMascarado: string): string | null {
  const digitos = digitosWhatsApp(valorMascarado);
  if (digitos.length < 10) return 'Informe um WhatsApp com DDD.';
  if (digitos.length > 11) return 'Número de WhatsApp inválido.';
  const ddd = parseInt(digitos.slice(0, 2), 10);
  if (!DDDS_VALIDOS_BRASIL.has(ddd)) return 'DDD inválido. Confira o número.';
  // Celular tem 9 dígitos (11 no total com DDD); fixo tem 8 (10 no total) — aceitamos os dois,
  // mas se vier com 11 dígitos o primeiro depois do DDD precisa ser 9.
  if (digitos.length === 11 && digitos[2] !== '9') return 'Confira o número do WhatsApp.';
  return null;
}

export function validarCidade(cidade: string): string | null {
  if (!cidade.trim()) return 'Selecione sua cidade.';
  if (!GOIAS_CIDADES.includes(cidade.trim())) return 'Selecione uma cidade de Goiás na lista.';
  return null;
}

export function validarTipoImovel(tipo: string): string | null {
  if (tipo !== 'residencia' && tipo !== 'empresa') return 'Selecione o tipo de imóvel.';
  return null;
}

export function validarFaixaConta(faixa: string): string | null {
  if (!faixa) return 'Selecione a faixa da sua conta de luz.';
  return null;
}

export const STATUS_FATURAS_OPCOES = [
  { id: 'sempre_em_dia', label: 'Sempre pago em dia' },
  { id: 'atraso_alguns_dias', label: 'Às vezes atraso alguns dias' },
  { id: 'faturas_em_aberto', label: 'Tenho faturas em aberto' },
] as const;

export type StatusFaturas = (typeof STATUS_FATURAS_OPCOES)[number]['id'];

export function validarStatusFaturas(status: string): string | null {
  if (!STATUS_FATURAS_OPCOES.some((o) => o.id === status)) return 'Informe a situação das suas faturas.';
  return null;
}

export function validarConsentimento(aceito: boolean): string | null {
  if (!aceito) return 'É preciso aceitar para continuar.';
  return null;
}

/** Regra de qualificação — espelha (client-side, "conveniência") a mesma fórmula que a Edge Function reaplica como autoridade. */
export function calcularQualificado(valorConta: number, statusFaturas: string): boolean {
  return valorConta >= VALOR_MINIMO_CONTA && statusFaturas !== 'faturas_em_aberto';
}
