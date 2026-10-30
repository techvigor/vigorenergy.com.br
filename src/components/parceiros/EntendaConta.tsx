import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  REGRA,
  cent,
  inicioFaixa,
  kwh,
  mil,
  nivel,
  pc,
  pc2,
  r$,
  r$0,
  recPct,
  redutor,
  vsPadrao,
  type Cliente,
  type Resultado,
} from '../../lib/parceiros/bonificacao';

const FX = REGRA.faixas;
// quanto 1.000 kWh rendem em cada faixa, com o desconto padrão; a maior barra ocupa a altura toda
const POR_MIL = FX.map((f) => cent(1000 * REGRA.tarifa * (1 - REGRA.padrao / 100) * f[1]));
const MAIOR_MIL = Math.max(...POR_MIL);
const DESCONTOS = [20, 22, 25, 28, 30, 35];

// um termo da conta; o operador vem colado nele, para a linha nunca quebrar entre o "=" e o resultado
function Tok({ v, leg, op, res }: { v: string; leg: string; op?: string; res?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 min-w-0">
      {op && (
        <span aria-hidden="true" className="text-text-muted font-semibold">
          {op}
        </span>
      )}
      <span className={`inline-grid gap-0.5 rounded-xl px-3 py-2 min-w-0 ${res ? 'bg-vigor-dark text-white' : 'bg-white border border-gray-light/80'}`}>
        <b className="font-semibold tabular-nums">{v}</b>
        <small className={`text-xs leading-snug ${res ? 'text-white/75' : 'text-text-muted'}`}>{leg}</small>
      </span>
    </span>
  );
}

function Linha({ rot, sua, children }: { rot: string; sua?: boolean; children: ReactNode }) {
  return (
    <div className={`grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)] md:items-center rounded-2xl bg-offwhite p-4 ${sua ? 'ring-2 ring-primary/45' : ''}`}>
      <span className="font-semibold text-sm leading-tight">
        {rot}
        {sua && <small className="block text-xs font-semibold text-primary">sua modalidade</small>}
      </span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export default function EntendaConta({ R, clientes, fixo }: { R: Resultado; clientes: Cliente[]; fixo: boolean }) {
  const [sel, setSel] = useState<string | null>(null);
  const fx = R.fx;
  const oks = clientes.map((x, i) => ({ x, i })).filter(({ i }) => R.linhas[i].ok);
  const atual = oks.find(({ x }) => x.id === sel) ?? oks[0];
  const l = atual ? R.linhas[atual.i] : null;
  const rotulo = (x: Cliente, i: number) => x.nome.trim() || 'Consumidor ' + (i + 1);

  return (
    <details className="group mt-6 bg-white border border-gray-light/60 rounded-3xl shadow-sm">
      <summary className="flex items-center justify-between gap-4 p-6 md:px-8 cursor-pointer list-none rounded-3xl [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <span>
          <span className="block text-lg font-bold tracking-tight text-text-dark">Entenda a conta e as regras</span>
          <span className="block mt-0.5 text-sm text-text-muted">A conta passo a passo, as faixas, o desconto e quando você recebe.</span>
        </span>
        <ChevronDown className="w-5 h-5 shrink-0 text-text-muted transition-transform duration-200 ease-saida group-open:rotate-180" aria-hidden="true" />
      </summary>

      <div className="border-t border-gray-light/60 p-5 sm:p-6 md:p-8 grid grid-cols-[minmax(0,1fr)] gap-14 text-text-dark">
        {/* a conta de um consumidor em blocos: fatura, bonificação e como recebe */}
        <section aria-labelledby="ec-conta">
          <h3 id="ec-conta" className="text-xl font-bold tracking-tight">
            A conta, passo a passo
          </h3>
          <p className="mt-1 text-text-muted max-w-[65ch]">
            A bonificação é calculada uma vez, no mês em que a Vigor aceita o consumidor. A fatura com desconto usa o consumo médio
            dos últimos 12 meses e não muda com bandeira, reajuste ou consumo do mês.
          </p>

          {!fx || !l || !atual ? (
            <p className="mt-6 text-sm text-text-muted">Adicione um consumidor com {kwh(REGRA.minimo)} kWh ou mais para ver a conta desenhada.</p>
          ) : (
            <>
              <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Consumidor da conta">
                {oks.map(({ x, i }) => (
                  <button
                    key={x.id}
                    type="button"
                    aria-pressed={x.id === atual.x.id}
                    onClick={() => setSel(x.id)}
                    className={`min-h-10 px-4 rounded-full text-sm font-semibold border transition-[background-color,border-color,color,transform] duration-150 ease-saida active:scale-[0.97] ${
                      x.id === atual.x.id ? 'bg-vigor-dark border-vigor-dark text-white' : 'bg-white border-gray-light text-text-dark hover:border-primary'
                    }`}
                  >
                    {rotulo(x, i)}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-2.5">
                <Linha rot="Fatura com desconto">
                  <Tok v={`${kwh(l.c)} kWh`} leg="consumo médio por mês" />
                  <Tok op="×" v={r$(REGRA.tarifa)} leg="por kWh, tarifa da regra" />
                  <Tok op="×" v={pc(1 - l.d / 100)} leg={`paga, com ${l.d}% de desconto`} />
                  <Tok op="=" v={r$(l.F)} leg="por mês" res />
                </Linha>

                <Linha rot="Bonificação">
                  <Tok v={r$(l.F)} leg="fatura com desconto" />
                  <Tok op="×" v={pc(fx.pct)} leg={`faixa F${fx.i + 1}: o mês soma ${kwh(R.V)} kWh`} />
                  {l.d > REGRA.padrao && <Tok op="×" v={pc(redutor(l.d))} leg={`redutor (${l.d}% de desconto)`} />}
                  <Tok op="=" v={r$(l.B)} leg="bonificação deste consumidor" res />
                </Linha>

                <Linha rot="Na Fixa" sua={fixo}>
                  <div className="w-full grid gap-2">
                    <div className="flex h-3 rounded-full overflow-hidden" aria-hidden="true">
                      <i className="bg-accent" style={{ width: `${(l.E / l.B) * 100}%` }} />
                      <i className="bg-primary" style={{ width: `${(l.S / l.B) * 100}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <i className="w-2.5 h-2.5 rounded-full bg-accent" aria-hidden="true" />
                        Pix I <b className="text-text-dark tabular-nums">{r$(l.E)}</b> ({pc(REGRA.entrada)})
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <i className="w-2.5 h-2.5 rounded-full bg-primary" aria-hidden="true" />
                        Pix II <b className="text-text-dark tabular-nums">{r$(l.S)}</b> ({pc(1 - REGRA.entrada)})
                      </span>
                      {l.Bb > l.B && (
                        <span>
                          O redutor tirou <b className="text-accent-ink tabular-nums">{r$(cent(l.Bb - l.B))}</b>
                        </span>
                      )}
                    </div>
                  </div>
                </Linha>

                <Linha rot="Na Variável" sua={!fixo}>
                  <Tok v={r$(l.E)} leg="Pix I, igual à Fixa" />
                  <span className="text-sm text-text-muted px-1">e depois</span>
                  <Tok v={r$(l.F)} leg="cada fatura paga" />
                  <Tok op="×" v={pc2(recPct(l.d))} leg={l.d > REGRA.padrao ? `${pc(REGRA.recBase)} × redutor` : 'de cada fatura paga'} />
                  <Tok op="=" v={r$(l.P)} leg={`todo mês que ele pagar, por ${REGRA.recorrenteAnos} anos`} res />
                </Linha>
              </div>
              <p className="mt-3 text-sm text-text-muted max-w-[65ch]">
                {r$(REGRA.tarifa)} é a tarifa média que a Vigor usa só para esta regra. A conta real do consumidor muda todo mês. Na
                Variável, o recorrente em reais é uma estimativa feita com a fatura com desconto: o valor real segue a fatura paga.
              </p>
            </>
          )}
        </section>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-2 lg:gap-12">
          {/* faixas: quanto 1.000 kWh rendem em cada uma */}
          <section aria-labelledby="ec-faixas">
            <h3 id="ec-faixas" className="text-xl font-bold tracking-tight">
              Quanto rende cada 1.000 kWh
            </h3>
            <p className="mt-1 text-text-muted">Em cada faixa do mês, com {REGRA.padrao}% de desconto.</p>
            {/* celular: uma linha por faixa, a barra cresce com o valor */}
            <ul className="mt-6 grid gap-2.5 sm:hidden">
              {POR_MIL.map((v, i) => (
                <li key={i} className="grid grid-cols-[4.75rem_minmax(0,1fr)_4.5rem] items-center gap-3">
                  <span className="grid leading-tight">
                    <b className="text-sm">
                      F{i + 1} · {pc(FX[i][1])}
                    </b>
                    <span className="text-[11px] text-text-muted">
                      {FX[i][0] === Infinity ? `${mil(inicioFaixa(i))} ou +` : `até ${mil(FX[i][0] === 39999 ? 40000 : FX[i][0])}`}
                    </span>
                  </span>
                  <i className={`block h-3 rounded-full ${fx?.i === i ? 'bg-accent' : 'bg-primary/85'}`} style={{ width: `${(v / MAIOR_MIL) * 100}%` }} />
                  <b className={`text-sm text-right tabular-nums ${fx?.i === i ? 'text-accent-ink' : ''}`}>
                    {r$0(v)}
                    {fx?.i === i && <span className="sr-only"> (sua faixa)</span>}
                  </b>
                </li>
              ))}
            </ul>
            <div className="mt-6 relative hidden sm:block">
              <div className="relative h-44 border-b border-gray-light">
                <div className="absolute inset-0 grid grid-cols-6 gap-2 sm:gap-3 items-end px-1">
                  {POR_MIL.map((v, i) => (
                    <i
                      key={i}
                      className={`block rounded-t-md transition-colors duration-300 ${fx?.i === i ? 'bg-accent' : 'bg-primary/85'}`}
                      style={{ height: `${(v / MAIOR_MIL) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <ul className="grid grid-cols-6 gap-2 sm:gap-3 px-1 mt-2 text-center">
                {POR_MIL.map((v, i) => (
                  <li key={i} className="grid leading-tight min-w-0">
                    <b className={`text-sm lg:text-xs tabular-nums ${fx?.i === i ? 'text-accent-ink' : ''}`}>{r$0(v)}</b>
                    <span className="text-xs font-semibold text-text-dark mt-0.5">
                      F{i + 1} · {pc(FX[i][1])}
                    </span>
                    <span className="text-[11px] text-text-muted">
                      {FX[i][0] === Infinity ? `${mil(inicioFaixa(i))} ou +` : `até ${mil(FX[i][0] === 39999 ? 40000 : FX[i][0])}`}
                    </span>
                    {fx?.i === i && <span className="sr-only">sua faixa</span>}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-text-muted">
              A faixa é a soma do consumo dos consumidores aceitos no mês e recomeça a cada mês. O percentual vale para todos eles.
            </p>
          </section>

          {/* desconto: de cada 10 moedas da bonificação, quantas ficam com você */}
          <section aria-labelledby="ec-desconto">
            <h3 id="ec-desconto" className="text-xl font-bold tracking-tight">
              Quanto menor o desconto, maior a comissão
            </h3>
            <p className="mt-1 text-text-muted">De cada 10 moedas da bonificação, quantas ficam com você.</p>
            <ul className="mt-6 grid gap-3.5">
              {DESCONTOS.map((d) => {
                const r = redutor(d);
                return (
                  <li key={d} className="grid grid-cols-[3rem_minmax(0,1fr)] sm:grid-cols-[3rem_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1">
                    <span className="font-bold tabular-nums">{d}%</span>
                    <span className="flex gap-1" aria-hidden="true">
                      {Array.from({ length: 10 }, (_, k) => {
                        const f = Math.max(0, Math.min(1, r * 10 - k));
                        return (
                          <i
                            key={k}
                            className="w-3.5 h-3.5 rounded-full border border-accent"
                            style={{ background: `linear-gradient(90deg, var(--color-accent) ${f * 100}%, transparent ${f * 100}%)` }}
                          />
                        );
                      })}
                    </span>
                    <span className="col-start-2 sm:col-start-3 text-sm leading-tight min-w-0">
                      <b className={d === REGRA.padrao ? 'text-primary' : 'text-accent-ink'}>fica {pc(r)}</b>
                      <small className="ml-2 sm:ml-0 sm:block text-xs text-text-muted">
                        {nivel(d)} · {d === REGRA.padrao ? 'padrão, sem aprovação' : 'com aprovação'}
                      </small>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-sm text-text-muted">
              De 21% a {REGRA.meio}%, cada ponto de desconto tira {REGRA.perda1} pontos. Acima disso, {REGRA.perda2} pontos. E a fatura
              também fica menor: com 28%, você recebe {pc(vsPadrao(28))} do que receberia com {REGRA.padrao}%.
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Desconto máximo pelo consumo:{' '}
              {REGRA.segmentos
                .map(([ate, , max], i) => {
                  const de = i ? REGRA.segmentos[i - 1][0] + 1 : REGRA.minimo;
                  return `até ${max}% ${ate === Infinity ? `a partir de ${kwh(de)} kWh` : `de ${kwh(de)} a ${kwh(ate)} kWh`}`;
                })
                .join(', ')
                .replace(/, ([^,]*)$/, ' e $1')}
              .
            </p>
          </section>
        </div>

        <section aria-labelledby="ec-regras">
          <h3 id="ec-regras" className="text-xl font-bold tracking-tight">
            As regras que mudam o valor
          </h3>
          <div className="mt-6 grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <h4 className="font-semibold">Quem conta para a faixa</h4>
              <ul className="mt-3 grid gap-2 text-sm text-text-muted list-disc pl-5 marker:text-primary">
                <li>Cada consumidor precisa ter pelo menos {kwh(REGRA.minimo)} kWh por mês.</li>
                <li>Só Grupo B (B1, B2 e B3). Grupo A, Grupo A optante B e tarifa social não podem assinar.</li>
                <li>A venda só conta depois da assinatura do titular, da análise de cadastro e da ligação de confirmação da Vigor.</li>
                <li>O mesmo consumidor (CPF, CNPJ ou unidade consumidora) não gera bonificação nova antes de 24 meses.</li>
                <li>
                  Se você só indicar e a Vigor fizer a venda, recebe {r$0(REGRA.indicacao)} por consumidor fechado, no lugar da bonificação.
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Quando você recebe</h4>
              <ul className="mt-3 grid gap-2 text-sm text-text-muted list-disc pl-5 marker:text-primary">
                <li>
                  <b className="text-text-dark">Fixa:</b> Pix I no dia 10 do mês seguinte ao aceite. Pix II no dia 10 do mês seguinte à
                  1ª fatura paga, mesmo se o consumidor pagar com atraso.
                </li>
                <li>
                  <b className="text-text-dark">Variável:</b> o mesmo Pix I. Depois, todo mês em que o consumidor pagar,{' '}
                  {pc(REGRA.recBase)} do valor pago vezes o redutor, por {REGRA.recorrenteAnos} anos depois da assinatura.
                </li>
                <li>Você escolhe Fixa ou Variável no contrato, e ela vale para todos os seus consumidores.</li>
                <li>
                  A Vigor paga uma vez por mês, contra nota fiscal da sua empresa. Total abaixo de {r$0(REGRA.pagamentoMinimo)} passa
                  para o mês seguinte.
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Quando o valor muda</h4>
              <ul className="mt-3 grid gap-2 text-sm text-text-muted list-disc pl-5 marker:text-primary">
                <li>Fatura não paga não gera pagamento. Fatura negociada conta quando for paga.</li>
                <li>
                  1ª fatura sem pagamento em 60 dias: o Pix I sai das suas próximas bonificações, até metade de cada pagamento. Se o
                  consumidor pagar depois, ele volta.
                </li>
                <li>Na Variável, se o consumidor sair cedo, você pode ganhar menos que na Fixa.</li>
                <li>Fraude, aliciamento ou descumprimento do contrato encerram os pagamentos.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </details>
  );
}
