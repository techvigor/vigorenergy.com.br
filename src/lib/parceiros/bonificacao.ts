// Regra de bonificação dos parceiros comerciais (aprovada em 26/10/2026).
// Fonte da verdade: "Simulador de Bonificação Vigor (1).html". Qualquer mudança de regra entra
// aqui, e a seção de simulação em /parceiros (textos, tabelas e gráficos) se recalcula sozinha.

export const REGRA = {
  tarifa: 1.16, // R$ por kWh da fatura de referência (tarifa travada, só para a regra de bonificação)
  padrao: 20, // desconto padrão e mínimo (%): até aqui, sem redutor
  meio: 25, // de 21% até aqui, cada ponto de desconto tira perda1 pontos da bonificação
  perda1: 2,
  perda2: 3, // de 26% ao máximo, cada ponto tira perda2 pontos
  maximo: 35, // desconto máximo aceito (%), só número inteiro
  autoriza: 20, // acima deste desconto é condição especial: precisa de aprovação da Vigor
  entrada: 0.3, // Pix I: 30% da bonificação, no dia 10 do mês seguinte ao aceite
  recBase: 0.02, // variável: % de cada fatura paga, com o desconto padrão (× redutor)
  recMax: 0.02, // trava: nunca mais que 2% da fatura paga
  // segmento do cliente pelo consumo: [até kWh, nome, desconto máximo %]
  segmentos: [
    [1499, 'C', 25],
    [4999, 'B', 30],
    [Infinity, 'A', 35],
  ] as const,
  minimo: 500, // consumo mínimo por cliente, em kWh por mês
  indicacao: 50, // valor fixo quando o parceiro só indica e a Vigor vende
  // faixas do mês: [até kWh somados no mês, % da fatura com desconto]
  faixas: [
    [2500, 0.2],
    [5000, 0.25],
    [10000, 0.45],
    [20000, 0.6],
    [39999, 0.8],
    [Infinity, 1.2],
  ] as const,
  vigencia: '26/10/2026',
  recorrenteAnos: 3, // variável: o recorrente dura 3 anos depois da assinatura
  pagamentoMinimo: 50, // total do mês abaixo disso passa para o mês seguinte
};

export const MAX_CLIENTES = 30;
export const CONSUMO_MAX = 9_999_999;

export type Cliente = { id: string; c: number; d: number; nome: string; exemplo?: boolean };

export type Faixa = { i: number; pct: number };
export type Segmento = { n: string; max: number; de: number; ate: number };

export type Linha = {
  c: number;
  d: number;
  ok: boolean;
  sg: Segmento | null;
  F: number; // fatura com desconto (R$/mês)
  Bb: number; // bonificação cheia da faixa, antes do redutor
  B: number; // bonificação total, com o redutor
  E: number; // Pix I
  S: number; // Pix II
  P: number; // variável: recorrente por fatura paga
  teto: boolean;
};

export type Resultado = {
  linhas: Linha[];
  V: number; // kWh somados no mês (só quem entra na conta)
  fx: Faixa | null;
  B: number;
  Bb: number;
  E: number;
  S: number;
  P: number;
};

// arredonda o centavo como o Excel (meio centavo para cima)
export function cent(x: number) {
  return Math.round(Number((x * 100).toPrecision(15))) / 100;
}

// pontos que saem da bonificação por causa do desconto
export function perdaPts(d: number) {
  if (d <= REGRA.padrao) return 0;
  if (d <= REGRA.meio) return REGRA.perda1 * (d - REGRA.padrao);
  return REGRA.perda1 * (REGRA.meio - REGRA.padrao) + REGRA.perda2 * (d - REGRA.meio);
}

// parte da bonificação que fica com o parceiro (1 = 100%)
export function redutor(d: number) {
  return 1 - perdaPts(d) / 100;
}

// quanto o parceiro recebe com este desconto, comparado ao desconto padrão (a fatura também encolhe)
export function vsPadrao(d: number) {
  return ((100 - d) / (100 - REGRA.padrao)) * redutor(d);
}

// variável: % de cada fatura paga, igual em todas as faixas; só cai com o desconto
export function recPct(d: number) {
  return Math.min(REGRA.recBase * redutor(d), REGRA.recMax);
}

export function nivel(d: number) {
  return 'N' + (d - REGRA.padrao + 1);
}

export function segDe(c: number): Segmento | null {
  if (!Number.isFinite(c) || c < REGRA.minimo) return null;
  for (let i = 0; i < REGRA.segmentos.length; i++) {
    const [ate, n, max] = REGRA.segmentos[i];
    if (c <= ate) return { n, max, de: i ? REGRA.segmentos[i - 1][0] + 1 : REGRA.minimo, ate };
  }
  return null;
}

export function faixaDe(v: number): Faixa {
  for (let i = 0; i < REGRA.faixas.length; i++) {
    if (v <= REGRA.faixas[i][0]) return { i, pct: REGRA.faixas[i][1] };
  }
  return { i: REGRA.faixas.length - 1, pct: REGRA.faixas[REGRA.faixas.length - 1][1] };
}

// primeiro kWh de cada faixa (F1 começa no consumo mínimo)
export function inicioFaixa(i: number) {
  return i ? REGRA.faixas[i - 1][0] + 1 : REGRA.minimo;
}

export function descontoValido(c: number, d: number) {
  const sg = segDe(c);
  return Number.isInteger(d) && d >= REGRA.padrao && d <= REGRA.maximo && (!sg || d <= sg.max);
}

export function calcular(lista: { c: number; d: number }[]): Resultado {
  const linhas: Linha[] = lista.map((x) => {
    const sg = segDe(x.c);
    const ok = Number.isFinite(x.c) && x.c >= REGRA.minimo && x.c <= CONSUMO_MAX && descontoValido(x.c, x.d);
    return { c: x.c, d: x.d, ok, sg, F: 0, Bb: 0, B: 0, E: 0, S: 0, P: 0, teto: false };
  });
  const V = linhas.reduce((s, l) => s + (l.ok ? l.c : 0), 0);
  const fx = V > 0 ? faixaDe(V) : null;
  let B = 0, Bb = 0, E = 0, S = 0, P = 0;
  linhas.forEach((l) => {
    if (!l.ok || !fx) return;
    l.F = cent(l.c * REGRA.tarifa * (1 - l.d / 100)); // fatura de referência
    const tetoC = cent(l.c * REGRA.tarifa), b = l.F * fx.pct; // nunca passa de R$ 1,16 por kWh
    l.teto = b > tetoC;
    l.Bb = cent(l.teto ? tetoC : b);
    l.B = cent(l.Bb * redutor(l.d));
    l.E = cent(l.B * REGRA.entrada);
    l.S = cent(l.B - l.E);
    l.P = cent(l.F * recPct(l.d));
    B += l.B; Bb += l.Bb; E += l.E; S += l.S; P += l.P;
  });
  return { linhas, V, fx, B: cent(B), Bb: cent(Bb), E: cent(E), S: cent(S), P: cent(P) };
}

// posição na régua (0 a 1): cada faixa ocupa 1/6; dentro dela, a parte já percorrida
export function posicaoRegua(v: number) {
  if (!(v > 0)) return 0;
  const n = REGRA.faixas.length, f = faixaDe(v);
  const lo = f.i ? REGRA.faixas[f.i - 1][0] : 0, hi = REGRA.faixas[f.i][0];
  const dentro = hi === Infinity ? (v - lo) / lo : (v - lo) / (hi - lo);
  return (f.i + Math.max(0, Math.min(1, dentro))) / n;
}

/* ---------- formatação ---------- */
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const brl0 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const n0 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const p1 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
const p2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const r$ = (v: number) => brl.format(v).replace('-', '−');
export const r$0 = (v: number) => brl0.format(v);
export const kwh = (v: number) => n0.format(v);
export const mil = (v: number) => p1.format(v / 1000) + ' mil';
export const pc = (x: number) => p1.format(Math.round(x * 1e6) / 1e4) + '%';
export const pc2 = (x: number) => p2.format(Math.round(x * 1e6) / 1e4) + '%';

// consumo digitado: só o número inteiro de kWh ("4.000", "4000 kWh" e "4000,5" viram 4000)
export function lerConsumo(s: string) {
  const inteiro = s.split(',')[0].replace(/\D/g, '');
  return inteiro ? Number(inteiro) : NaN;
}
