import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUp, Check, ChevronRight, Minus, Pencil, Plus, TriangleAlert, X } from 'lucide-react';
import {
  CONSUMO_MAX,
  MAX_CLIENTES,
  REGRA,
  calcular,
  kwh,
  lerConsumo,
  mil,
  pc,
  pc2,
  posicaoRegua,
  r$,
  segDe,
  type Cliente,
} from '../../lib/parceiros/bonificacao';
import EntendaConta from './EntendaConta';

type Modalidade = 'fixa' | 'variavel';
type Aviso = { tx: string; desfazer?: { item: Cliente; pos: number } };

// 1ª visita: a régua já aparece com a conta funcionando (marcado como exemplo; sai com um toque)
const EXEMPLO = [
  { c: 650, d: 20, nome: 'Residência' },
  { c: 2300, d: 20, nome: 'Padaria' },
  { c: 7800, d: 26, nome: 'Supermercado' },
];
let seq = 0;
const novoId = () => 'c' + ++seq;
const exemplo = (): Cliente[] => EXEMPLO.map((x) => ({ ...x, id: novoId(), exemplo: true }));
const FX = REGRA.faixas;
const NF = FX.length;
const formVazio = { consumo: '', d: REGRA.padrao, nome: '' };

export default function SimuladorBonificacao({ onCadastro }: { onCadastro: () => void }) {
  const [clientes, setClientes] = useState<Cliente[]>(exemplo);
  const [tipo, setTipo] = useState<Modalidade>('fixa');
  const [form, setForm] = useState(formVazio);
  const [editando, setEditando] = useState<string | null>(null);
  const [realce, setRealce] = useState<string | null>(null);
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [trilhoW, setTrilhoW] = useState(600);
  const [anuncio, setAnuncio] = useState('');
  const trilhoRef = useRef<HTMLDivElement>(null);
  const consumoRef = useRef<HTMLInputElement>(null);
  const fixo = tipo === 'fixa';

  const R = useMemo(() => calcular(clientes), [clientes]);
  const fx = R.fx;
  const rotulo = (x: Cliente, i: number) => x.nome.trim() || 'Cliente ' + (i + 1);
  const temExemplo = clientes.some((x) => x.exemplo);

  // o cliente do formulário, já somado ao mês, para a prévia e o bloco tracejado na régua
  const c = lerConsumo(form.consumo);
  const sg = segDe(c);
  const iEditando = editando ? clientes.findIndex((x) => x.id === editando) : -1;
  const idxForm = iEditando >= 0 ? iEditando : clientes.length;
  const R1 = useMemo(() => {
    if (!Number.isFinite(c)) return null;
    const lista = clientes.map((x) => ({ c: x.c, d: x.d }));
    lista[idxForm] = { c, d: form.d };
    return calcular(lista);
  }, [clientes, c, form.d, idxForm]);
  const l1 = R1?.linhas[idxForm];

  let bloqueio = '';
  const lotado = !editando && clientes.length >= MAX_CLIENTES;
  if (lotado) bloqueio = `A simulação já tem ${MAX_CLIENTES} clientes.`;
  else if (form.consumo.trim() && !Number.isFinite(c)) bloqueio = 'Use só números no consumo.';
  else if (c > CONSUMO_MAX) bloqueio = `Consumo acima de ${kwh(CONSUMO_MAX)} kWh por mês.`;
  else if (c < REGRA.minimo) bloqueio = `Abaixo de ${kwh(REGRA.minimo)} kWh por mês: o cliente não entra na conta.`;
  else if (sg && form.d > sg.max) bloqueio = `No segmento ${sg.n}, o desconto vai até ${sg.max}%.`;
  const podeAdicionar = !bloqueio && Number.isFinite(c) && !!l1?.ok;

  // o que o cliente do formulário rende no plano padrão, quando o desconto pedido é maior
  const ganhoPadrao = useMemo(() => {
    if (!podeAdicionar || form.d <= REGRA.padrao || !R1 || !l1) return null;
    const lista = clientes.map((x) => ({ c: x.c, d: x.d }));
    lista[idxForm] = { c, d: REGRA.padrao };
    const b = calcular(lista).linhas[idxForm];
    return { B: b.B - l1.B, E: b.E - l1.E, P: b.P - l1.P };
  }, [podeAdicionar, form.d, R1, l1, clientes, idxForm, c]);

  // o mês inteiro no plano padrão: mostra quanto o desconto acima de 20% está custando
  const alt = useMemo(
    () => calcular(clientes.map((x) => ({ c: x.c, d: x.d > REGRA.padrao ? REGRA.padrao : x.d }))),
    [clientes],
  );
  const ganhoMes = fixo ? alt.B - R.B : alt.E - R.E;

  // largura real do trilho, para decidir quanto texto cabe em cada bloco
  useEffect(() => {
    const el = trilhoRef.current;
    if (!el || !('ResizeObserver' in window)) return;
    const ro = new ResizeObserver(([e]) => setTrilhoW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!realce) return;
    const t = setTimeout(() => setRealce(null), 1400);
    return () => clearTimeout(t);
  }, [realce]);

  // leitor de tela: um resumo depois que a pessoa para de mexer
  useEffect(() => {
    const t = setTimeout(() => {
      setAnuncio(
        fx
          ? `${fixo ? 'Fixa' : 'Variável'}. Faixa F${fx.i + 1}, ${pc(fx.pct)} da fatura com desconto. ` +
              (fixo ? `Bonificação do mês ${r$(R.B)}. Pix I ${r$(R.E)}. Pix II ${r$(R.S)}.` : `Pix I ${r$(R.E)}. Recorrente ${r$(R.P)} por mês.`)
          : 'Nenhum cliente na simulação.',
      );
    }, 800);
    return () => clearTimeout(t);
  }, [fx, fixo, R.B, R.E, R.S, R.P]);

  function salvar(e: FormEvent) {
    e.preventDefault();
    if (!podeAdicionar) return;
    const nome = form.nome.trim().slice(0, 60);
    if (editando) {
      setClientes((cs) => cs.map((x) => (x.id === editando ? { ...x, c, d: form.d, nome, exemplo: false } : x)));
      setRealce(editando);
      setAviso({ tx: 'Alteração salva.' });
      setEditando(null);
    } else {
      const id = novoId();
      setClientes((cs) => [...cs, { id, c, d: form.d, nome }]);
      setRealce(id);
      setAviso({ tx: `${nome || 'Cliente ' + (clientes.length + 1)} entrou na régua.` });
    }
    setForm(formVazio);
    consumoRef.current?.focus();
  }

  function editar(i: number) {
    const x = clientes[i];
    setEditando(x.id);
    setForm({ consumo: kwh(x.c), d: x.d, nome: x.nome });
    setAviso(null);
    consumoRef.current?.focus({ preventScroll: true });
    consumoRef.current?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function remover(i: number) {
    const item = clientes[i];
    setClientes((cs) => cs.filter((x) => x.id !== item.id));
    if (editando === item.id) cancelarEdicao();
    setAviso({ tx: `${rotulo(item, i)} saiu da régua.`, desfazer: { item, pos: i } });
  }

  function desfazer() {
    const d = aviso?.desfazer;
    if (!d) return;
    setClientes((cs) => [...cs.slice(0, d.pos), d.item, ...cs.slice(d.pos)]);
    setRealce(d.item.id);
    setAviso(null);
  }

  function cancelarEdicao() {
    setEditando(null);
    setForm(formVazio);
  }

  function limparExemplo() {
    if (editando && clientes.find((x) => x.id === editando)?.exemplo) cancelarEdicao();
    setClientes((cs) => cs.filter((x) => !x.exemplo));
    setAviso({ tx: 'Exemplo removido. Adicione os seus clientes.' });
    consumoRef.current?.focus();
  }

  function verExemplo() {
    setClientes(exemplo());
    setAviso(null);
  }

  // texto do topo da régua: quanto falta para a próxima faixa
  let prox = '';
  if (fx) {
    const lim = FX[fx.i][0];
    if (lim === Infinity) prox = 'você está na maior faixa';
    else {
      const falta = lim + 1 - R.V;
      prox = `faltam ${kwh(falta)} kWh para ${pc(FX[fx.i + 1][1])}`;
    }
  }
  const faltaPouco = !!fx && FX[fx.i][0] !== Infinity && FX[fx.i][0] + 1 - R.V < REGRA.minimo;

  // blocos da régua: um por cliente que entra na conta, na ordem da lista
  let acumulado = 0;
  let numero = 0;
  const blocos = R.linhas.map((l, i) => {
    if (!l.ok) return null;
    numero++;
    const a = posicaoRegua(acumulado), b = posicaoRegua(acumulado + l.c);
    acumulado += l.c;
    const px = (b - a) * trilhoW, x = clientes[i];
    return { id: x.id, n: numero, nome: rotulo(x, i), c: l.c, a, b, px };
  });
  const fantasma = !editando && R1 && podeAdicionar && R1.V > R.V ? { a: posicaoRegua(R.V), b: posicaoRegua(R1.V) } : null;

  const nOk = R.linhas.filter((l) => l.ok).length;
  const nEx = clientes.filter((x) => x.exemplo).length;
  const sub = fx
    ? `Faixa F${fx.i + 1} (${pc(fx.pct)} da fatura com desconto) · ${nOk} ${nOk > 1 ? 'clientes' : 'cliente'}` +
      (nEx === nOk ? ' de exemplo' : nEx ? ` (${nEx} de exemplo)` : '')
    : 'Adicione um cliente para ver a sua bonificação.';

  // prévia do formulário: o que o cliente rende e o que ele faz com a faixa do mês
  let efeito = '';
  if (R1 && l1?.ok && podeAdicionar) {
    const de = fx ? fx.pct : 0, para = R1.fx ? R1.fx.pct : 0;
    const v0 = fixo ? R.B : R.E, v1 = fixo ? R1.B : R1.E;
    const oq = fixo ? 'a bonificação do mês' : 'o Pix I do mês';
    if (editando) efeito = `Com a alteração, ${oq} vai de ${r$(v0)} para ${r$(v1)}.`;
    else if (para > de && de > 0)
      efeito = `Com ele, a faixa sobe de ${pc(de)} para ${pc(para)} e ${oq} sobe ${r$(v1 - v0)}, porque a faixa nova vale para todos.`;
    else efeito = `Com ele, ${oq} vai para ${r$(v1)}.`;
  }

  let dica = `Mínimo de ${kwh(REGRA.minimo)} kWh por mês. Desconto padrão de ${REGRA.padrao}%.`;
  if (sg)
    dica =
      `Segmento ${sg.n}: ${sg.ate === Infinity ? kwh(sg.de) + ' kWh ou mais' : kwh(sg.de) + ' a ' + kwh(sg.ate) + ' kWh'}, ` +
      `desconto de ${REGRA.padrao}% a ${sg.max}%. Acima de ${REGRA.autoriza}%, só com aprovação da Vigor.`;
  const dMax = sg ? sg.max : REGRA.maximo;

  return (
    <section id="simulador" className="py-20 bg-offwhite scroll-mt-8" aria-labelledby="sim-titulo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="sim-titulo" className="text-3xl md:text-4xl font-bold text-text-dark mb-4 tracking-tight">
            Simule sua bonificação
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Some os clientes que você fecharia em um mês. Quanto mais kWh no mês, maior a faixa, e ela vale para todos eles.
          </p>
        </div>

        <div className="bg-vigor-dark text-white rounded-3xl overflow-hidden shadow-xl shadow-vigor-dark/20">
          <div className="p-5 sm:p-8 md:p-10 grid grid-cols-[minmax(0,1fr)] gap-10">
            {/* total do mês e modalidade */}
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-white/75">{fixo ? 'Bonificação do mês' : 'Pix I + recorrente'}</h3>
                <p className={`mt-1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight tabular-nums leading-[1.05] ${fx ? '' : 'text-white/45'}`}>
                  {fx ? r$(fixo ? R.B : R.E) : r$(0)}
                  {fx && !fixo && (
                    <span className="block sm:inline sm:ml-3 mt-1 sm:mt-0 text-xl sm:text-2xl font-semibold tracking-normal text-white/80">
                      + ≈ {r$(R.P)} por mês
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm sm:text-base text-white/75">{sub}</p>
                {fx && ganhoMes > 0.004 && (
                  <p className="mt-2 inline-flex items-start gap-1.5 text-sm font-semibold text-accent">
                    <ArrowUp className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    {fixo
                      ? `No plano padrão de ${REGRA.padrao}%, seria ${r$(alt.B)} (+${r$(ganhoMes)}).`
                      : `No plano padrão de ${REGRA.padrao}%: Pix I +${r$(ganhoMes)} e recorrente +≈ ${r$(alt.P - R.P)} por mês.`}
                  </p>
                )}
              </div>
              <div className="inline-flex p-1 rounded-full bg-white/10" role="group" aria-label="Como você recebe">
                {(['fixa', 'variavel'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={tipo === t}
                    onClick={() => setTipo(t)}
                    className={`min-h-11 px-6 rounded-full text-sm font-bold transition-[background-color,color,transform] duration-150 ease-saida active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      tipo === t ? 'bg-accent text-text-dark' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {t === 'fixa' ? 'Fixa' : 'Variável'}
                  </button>
                ))}
              </div>
            </div>

            {/* régua do mês: a escada das faixas em cima, os clientes enchendo o trilho embaixo */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold">Régua do mês</h3>
                {fx && (
                  <p className="text-sm text-white/75 tabular-nums">
                    {kwh(R.V)} kWh no mês ·{' '}
                    {prox.startsWith('faltam') ? (
                      <>
                        faltam <b className="text-accent">{kwh(FX[fx.i][0] + 1 - R.V)} kWh</b> para {pc(FX[fx.i + 1][1])}
                        {faltaPouco && ', basta mais um cliente'}
                      </>
                    ) : (
                      <b className="text-accent">{prox}</b>
                    )}
                  </p>
                )}
              </div>

              <div
                className="mt-5"
                role="img"
                aria-label={
                  `Régua do mês: ${kwh(R.V)} kWh somados` +
                  (fx ? `, faixa F${fx.i + 1} com ${pc(fx.pct)}` : '') +
                  '. Faixas: ' + FX.map((f, i) => `F${i + 1} ${pc(f[1])}`).join(', ') + '.'
                }
              >
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2 items-end h-28 mb-1.5">
                  {FX.map((f, i) => {
                    const atual = fx?.i === i, passou = !!fx && i < fx.i;
                    return (
                      <div key={i} className="h-full flex flex-col justify-end items-center gap-0.5">
                        <span className={`text-sm sm:text-base font-bold tabular-nums ${atual ? 'text-white' : 'text-white/75'}`}>{pc(f[1])}</span>
                        <span className={`text-[11px] font-semibold mb-1 ${atual ? 'text-accent' : 'text-white/60'}`}>F{i + 1}</span>
                        <i
                          className={`block w-full max-w-[72px] rounded-t-md transition-colors duration-300 ${
                            atual ? 'bg-accent' : passou ? 'bg-vigor-lime/45' : 'bg-white/10'
                          }`}
                          style={{ height: `${(f[1] / FX[NF - 1][1]) * 62}%`, minHeight: 6 }}
                        />
                      </div>
                    );
                  })}
                </div>

                <div ref={trilhoRef} className="relative h-9 rounded-xl bg-white/10">
                  {FX.slice(1).map((_, s) => (
                    <i key={s} className="absolute inset-y-0 w-px bg-white/15" style={{ left: `${((s + 1) / NF) * 100}%` }} />
                  ))}
                  {blocos.map(
                    (b) =>
                      b && (
                        <i
                          key={b.id}
                          title={`${b.n}. ${b.nome} · ${kwh(b.c)} kWh`}
                          className={`absolute inset-y-0 flex items-center px-2 overflow-hidden rounded-lg bg-vigor-lime text-vigor-dark text-xs font-bold not-italic whitespace-nowrap shadow-[inset_-2px_0_0_var(--color-vigor-dark)] transition-[left,width] duration-[420ms] ease-movimento motion-reduce:transition-none ${
                            realce === b.id ? 'animate-regua-entra motion-reduce:animate-none' : ''
                          }`}
                          style={{ left: `${b.a * 100}%`, width: `${(b.b - b.a) * 100}%` }}
                        >
                          <span className="truncate">{b.px >= 84 ? `${b.n} · ${b.nome}` : b.px >= 18 ? b.n : ''}</span>
                        </i>
                      ),
                  )}
                  {fantasma && (
                    <i
                      className="absolute inset-y-0 flex items-center px-2 overflow-hidden rounded-lg bg-accent/20 border-2 border-dashed border-accent text-accent text-xs font-bold not-italic whitespace-nowrap"
                      style={{ left: `${fantasma.a * 100}%`, width: `${(fantasma.b - fantasma.a) * 100}%` }}
                    >
                      {(fantasma.b - fantasma.a) * trilhoW >= 48 ? '+ novo' : ''}
                    </i>
                  )}
                  {R.V > 0 && (
                    <i
                      className="absolute -top-1.5 -bottom-1.5 w-1 -ml-0.5 rounded-sm bg-accent shadow-[0_0_0_2px_var(--color-vigor-dark)] transition-[left] duration-[420ms] ease-movimento motion-reduce:transition-none"
                      style={{ left: `${posicaoRegua(R.V) * 100}%` }}
                    />
                  )}
                </div>
                <div className="relative h-5 mt-1.5 text-[11px] text-white/60 tabular-nums" aria-hidden="true">
                  {FX.slice(0, -1).map((f, i) => (
                    <span key={i} className="absolute top-0 -translate-x-1/2 whitespace-nowrap" style={{ left: `${((i + 1) / NF) * 100}%` }}>
                      {mil(f[0] === 39999 ? 40000 : f[0])}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-white/65">Cada bloco é um cliente. A faixa vem da soma do mês, e o percentual dela vale para todos.</p>

              <ul className="mt-5 flex flex-wrap gap-2 items-center">
                {clientes.length === 0 && (
                  <li className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                    Nenhum cliente ainda. Adicione o primeiro abaixo.
                    <button type="button" onClick={verExemplo} className="font-semibold text-accent underline underline-offset-4 decoration-1 hover:text-white">
                      Ver um exemplo
                    </button>
                  </li>
                )}
                {clientes.map((x, i) => {
                  const l = R.linhas[i], nm = rotulo(x, i), n = blocos[i]?.n;
                  return (
                    <li
                      key={x.id}
                      className={`w-full sm:w-auto max-w-full sm:max-w-[26rem] inline-flex items-center gap-2.5 rounded-xl border bg-white/[0.06] py-1.5 pl-1.5 pr-1 text-sm transition-colors duration-200 ${
                        editando === x.id ? 'border-accent' : 'border-white/15'
                      } ${realce === x.id ? 'animate-ficha-entra motion-reduce:animate-none' : ''}`}
                    >
                      <span className="grid place-items-center min-w-6 h-6 rounded-lg bg-vigor-lime text-vigor-dark text-xs font-bold shrink-0">{n ?? '–'}</span>
                      <span className="grid leading-tight min-w-0 flex-1 sm:flex-initial">
                        <span className="flex items-baseline justify-between gap-3 min-w-0">
                          <b className="font-semibold truncate" title={nm}>
                            {nm}
                          </b>
                          {l.ok && fx && <span className="font-semibold tabular-nums whitespace-nowrap">{r$(fixo ? l.B : l.E)}</span>}
                        </span>
                        <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-white/65 tabular-nums">
                          <span className="whitespace-nowrap">
                            {kwh(x.c)} kWh · {x.d}%
                          </span>
                          {x.d > REGRA.autoriza && <span className="rounded-full bg-accent/20 px-1.5 text-[11px] font-bold text-accent">aprovação</span>}
                        </span>
                      </span>
                      <span className="flex shrink-0">
                        <button
                          type="button"
                          onClick={() => editar(i)}
                          aria-label={`Editar ${nm}`}
                          title="Editar"
                          className="grid place-items-center w-9 h-9 rounded-lg text-white/65 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          <Pencil className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => remover(i)}
                          aria-label={`Remover ${nm}`}
                          title="Remover"
                          className="grid place-items-center w-9 h-9 rounded-lg text-white/65 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </span>
                    </li>
                  );
                })}
                {temExemplo && (
                  <li>
                    <button type="button" onClick={limparExemplo} className="px-2 py-2 text-sm font-semibold text-accent underline underline-offset-4 decoration-1 hover:text-white">
                      Limpar exemplo
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* você recebe: as moedas no tempo */}
            <div>
              <h3 className="font-semibold">Você recebe</h3>
              {!fx ? (
                <p className="mt-3 text-sm text-white/75">Adicione um cliente para ver quanto e quando.</p>
              ) : (
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <div className="flex items-center gap-3 min-w-0">
                    <i className="w-7 h-7 rounded-full bg-accent shadow-[inset_0_0_0_3px_rgb(138_90_15/0.3)] shrink-0" aria-hidden="true" />
                    <div className="leading-tight">
                      <b className="block text-xl font-bold tabular-nums">{r$(R.E)}</b>
                      <span className="text-sm text-white/70">Pix I ({pc(REGRA.entrada)}) · dia 10 do mês seguinte ao aceite</span>
                    </div>
                  </div>
                  <span aria-hidden="true" className="ml-3.5 sm:ml-0 flex items-center sm:flex-1 sm:min-w-10 text-white/25">
                    <i className="block w-0.5 h-5 sm:w-auto sm:h-0.5 sm:flex-1 bg-current" />
                    <ChevronRight className="hidden sm:block w-4 h-4 -ml-2.5 shrink-0" strokeWidth={2.5} />
                  </span>
                  {fixo ? (
                    <div className="flex items-center gap-3 min-w-0">
                      <i className="w-11 h-11 -ml-2 sm:ml-0 rounded-full bg-accent shadow-[inset_0_0_0_4px_rgb(138_90_15/0.32)] shrink-0" aria-hidden="true" />
                      <div className="leading-tight">
                        <b className="block text-xl font-bold tabular-nums">{r$(R.S)}</b>
                        <span className="text-sm text-white/70">Pix II ({pc(1 - REGRA.entrada)}) · dia 10 do mês seguinte à 1ª fatura paga</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="inline-flex gap-1 shrink-0 -ml-2 sm:ml-0" aria-hidden="true">
                        {Array.from({ length: 7 }, (_, k) => (
                          <i key={k} className={`w-3 h-3 rounded-full bg-accent ${k >= 3 ? 'hidden sm:block' : ''}`} style={{ opacity: 1 - k * 0.11 }} />
                        ))}
                      </span>
                      <div className="leading-tight">
                        <b className="block text-xl font-bold tabular-nums">{r$(R.P)} por mês</b>
                        <span className="text-sm text-white/70">
                          recorrente estimado, nos meses em que o cliente pagar, por {REGRA.recorrenteAnos} anos depois da assinatura
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* adicionar cliente: a faixa clara do mesmo painel */}
          <form onSubmit={salvar} className="bg-white text-text-dark p-5 sm:p-8 md:px-10" aria-labelledby="sim-add">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 id="sim-add" className="font-bold text-lg tracking-tight">
                {editando ? 'Editar cliente' : 'Adicionar cliente'}
              </h3>
              {editando && (
                <button type="button" onClick={cancelarEdicao} className="text-sm font-semibold text-primary underline underline-offset-4 decoration-1 hover:text-primary-dark">
                  Cancelar edição
                </button>
              )}
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,1fr)_auto] items-end">
              <label className="grid gap-1.5 min-w-0" htmlFor="sim-consumo">
                <span className="text-sm font-semibold text-text-dark">Consumo médio</span>
                <span className="flex items-center h-12 px-4 rounded-xl border border-gray-light/80 bg-offwhite focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-[background-color,border-color,box-shadow]">
                  <input
                    ref={consumoRef}
                    id="sim-consumo"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="ex.: 4.000"
                    aria-describedby="sim-dica sim-msg"
                    aria-invalid={!!bloqueio && !!form.consumo.trim()}
                    value={form.consumo}
                    onChange={(e) => {
                      const v = lerConsumo(e.target.value);
                      setForm((f) => ({ ...f, consumo: Number.isFinite(v) ? kwh(v) : e.target.value.replace(/\d/g, '') ? e.target.value : '' }));
                    }}
                    className="flex-1 w-0 min-w-0 bg-transparent outline-none text-xl font-semibold tabular-nums text-text-dark placeholder:text-text-muted placeholder:font-normal caret-primary"
                  />
                  <span className="text-sm font-semibold text-text-muted whitespace-nowrap">kWh/mês</span>
                </span>
              </label>

              <div className="grid gap-1.5">
                <span className="text-sm font-semibold text-text-dark" id="sim-desc-rot">
                  Desconto
                </span>
                <div className="flex items-center gap-1.5" role="group" aria-labelledby="sim-desc-rot">
                  <button
                    type="button"
                    aria-label="Diminuir o desconto"
                    disabled={form.d <= REGRA.padrao}
                    onClick={() => setForm((f) => ({ ...f, d: Math.max(REGRA.padrao, f.d - 1) }))}
                    className="grid place-items-center w-11 h-12 rounded-xl border border-gray-light bg-white text-text-dark hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-light transition-[border-color,transform] duration-150 ease-saida active:enabled:scale-[0.97]"
                  >
                    <Minus className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <output className="min-w-16 text-center text-xl font-semibold tabular-nums" aria-live="polite">
                    {form.d}%
                  </output>
                  <button
                    type="button"
                    aria-label="Aumentar o desconto"
                    disabled={form.d >= dMax}
                    onClick={() => setForm((f) => ({ ...f, d: Math.min(dMax, f.d + 1) }))}
                    className="grid place-items-center w-11 h-12 rounded-xl border border-gray-light bg-white text-text-dark hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-light transition-[border-color,transform] duration-150 ease-saida active:enabled:scale-[0.97]"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <label className="grid gap-1.5 min-w-0 sm:col-span-2 lg:col-span-1" htmlFor="sim-nome">
                <span className="text-sm font-semibold text-text-dark">
                  Nome <span className="font-normal text-text-muted">opcional</span>
                </span>
                <input
                  id="sim-nome"
                  autoComplete="off"
                  maxLength={60}
                  placeholder="ex.: Padaria Central"
                  value={form.nome}
                  onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                  className="w-full h-12 px-4 rounded-xl border border-gray-light/80 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-[background-color,border-color,box-shadow] text-text-dark placeholder:text-text-muted caret-primary"
                />
              </label>

              <button
                type="submit"
                disabled={!podeAdicionar}
                className="sm:col-span-2 lg:col-span-1 h-12 px-6 rounded-full bg-primary text-white font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap hover:bg-primary-dark disabled:opacity-45 disabled:cursor-not-allowed transition-[background-color,transform] duration-150 ease-saida active:enabled:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {editando ? <Check className="w-5 h-5" aria-hidden="true" /> : <Plus className="w-5 h-5" aria-hidden="true" />}
                {editando ? 'Salvar alteração' : 'Adicionar'}
              </button>
            </div>

            <p id="sim-dica" className="mt-3 text-sm text-text-muted">
              {dica}
            </p>

            {podeAdicionar && l1 && (
              <div className="mt-4 grid gap-2 text-sm text-text-muted">
                <p>
                  Este cliente rende{' '}
                  {fixo ? (
                    <>
                      <b className="text-text-dark tabular-nums">{r$(l1.B)}</b> (Pix I {r$(l1.E)} + Pix II {r$(l1.S)})
                    </>
                  ) : (
                    <>
                      Pix I <b className="text-text-dark tabular-nums">{r$(l1.E)}</b> e depois <b className="text-text-dark tabular-nums">{r$(l1.P)}</b> por fatura paga ({pc2(l1.P / l1.F)})
                    </>
                  )}
                  . {efeito}
                </p>
                <p className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {form.d > REGRA.padrao ? (
                    <>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-accent-ink">
                        <TriangleAlert className="w-4 h-4" aria-hidden="true" />
                        Condição especial: precisa de aprovação da Vigor
                      </span>
                      {ganhoPadrao && (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                          <ArrowUp className="w-4 h-4" aria-hidden="true" />
                          No plano padrão de {REGRA.padrao}%:{' '}
                          {fixo ? `+${r$(ganhoPadrao.B)} na bonificação` : `Pix I +${r$(ganhoPadrao.E)} e +${r$(ganhoPadrao.P)} por fatura`}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                      <Check className="w-4 h-4" aria-hidden="true" />
                      Plano padrão: o maior ganho por cliente
                    </span>
                  )}
                </p>
              </div>
            )}

            <p id="sim-msg" className="mt-3 text-sm min-h-5" aria-live="polite">
              {bloqueio && (form.consumo.trim() || lotado) ? (
                <span className="font-semibold text-red-700">{bloqueio}</span>
              ) : aviso ? (
                <span className="text-text-muted">
                  {aviso.tx}{' '}
                  {aviso.desfazer && (
                    <button type="button" onClick={desfazer} className="font-semibold text-primary underline underline-offset-4 decoration-1 hover:text-primary-dark">
                      Desfazer
                    </button>
                  )}
                </span>
              ) : null}
            </p>
          </form>
        </div>

        <EntendaConta R={R} clientes={clientes} fixo={fixo} />

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onCadastro}
            className="bg-accent hover:bg-accent-hover text-text-dark px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2"
          >
            Começar agora <ArrowRight className="w-5 h-5" />
          </button>
          <p className="mt-6 text-sm text-text-muted max-w-2xl mx-auto">
            Simulação com valores brutos, antes de impostos e retenções. Não é garantia de pagamento: os valores finais seguem o
            Contrato de Parceria e dependem das faturas pagas pelos clientes. Regra de bonificação de {REGRA.vigencia}.
          </p>
        </div>
        <p className="sr-only" aria-live="polite">
          {anuncio}
        </p>
      </div>
    </section>
  );
}
