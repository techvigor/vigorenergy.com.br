// Máscaras e formatação — usadas tanto no simulador (hero island) quanto no formulário de lead.

/** Todos os DDDs válidos do Brasil (ANATEL). Usado para validar o WhatsApp sem travar lead legítimo de fora de GO. */
export const DDDS_VALIDOS_BRASIL = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/** DDDs de Goiás — usado só como sinal informativo (não bloqueia lead com DDD de outro estado). */
export const DDDS_GOIAS = new Set([62, 64]);

/** Recebe dígitos livres e devolve a máscara (99) 99999-9999, truncando em 11 dígitos. */
export function formatarWhatsApp(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 11);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

export function digitosWhatsApp(valorMascarado: string): string {
  return valorMascarado.replace(/\D/g, '');
}

/** Formata dígitos livres como moeda BRL (input tipo "35000" -> "350,00"). */
export function formatarMoeda(valorDigitado: string): string {
  const digitos = valorDigitado.replace(/\D/g, '').slice(0, 10);
  if (digitos === '') return '';
  const numerico = parseInt(digitos, 10) / 100;
  return numerico.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Converte o valor mascarado ("350,00") para número (350). */
export function parseMoeda(valorMascarado: string): number {
  const digitos = valorMascarado.replace(/\D/g, '');
  if (digitos === '') return 0;
  return parseInt(digitos, 10) / 100;
}

export function formatarBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Faixas de conta usadas no select do formulário (pré-preenchido pelo valor do simulador). */
export const FAIXAS_CONTA = [
  { id: '300_500', label: 'R$ 300 a R$ 500', min: 300, max: 500 },
  { id: '500_800', label: 'R$ 500 a R$ 800', min: 500, max: 800 },
  { id: '800_1500', label: 'R$ 800 a R$ 1.500', min: 800, max: 1500 },
  { id: 'acima_1500', label: 'Acima de R$ 1.500', min: 1500, max: Infinity },
] as const;

export function faixaContaPorValor(valor: number): (typeof FAIXAS_CONTA)[number]['id'] {
  const faixa = FAIXAS_CONTA.find((f) => valor >= f.min && valor < f.max);
  return faixa ? faixa.id : FAIXAS_CONTA[FAIXAS_CONTA.length - 1].id;
}
