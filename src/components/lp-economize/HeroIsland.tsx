import { useEffect, useMemo, useRef, useState } from 'react';
import LeadForm from './LeadForm';
import { formatarMoeda, parseMoeda, formatarBRL, faixaContaPorValor } from '../../lib/lp-economize/format';
import { TAXA_ECONOMIA_ESTIMADA, VALOR_MINIMO_CONTA, resolverH1, WHATSAPP_MENSAGENS, WHATSAPP_NUMERO } from '../../lib/lp-economize/config';
import { trackSimulacaoCalculada, trackLeadDesqualificado, iniciarPixel } from '../../lib/lp-economize/tracking';
import { capturarOrigemLead } from '../../lib/lp-economize/utms';

/**
 * "Ilha" React montada com createRoot próprio dentro de #lp-hero-shell (ver src/main.tsx),
 * fora da árvore do React Router. O markup estático em index.html já pintou este bloco antes
 * de qualquer JS — este componente reproduz exatamente as mesmas classes CSS (definidas
 * inline no <head> do index.html) pra assumir a interatividade sem re-pintar nada visível.
 *
 * Dono do simulador + portão de qualificação + formulário de lead — tudo no mesmo lugar,
 * porque o formulário só aparece "logo abaixo do resultado", dentro do próprio hero.
 */
export default function HeroIsland() {
  const h1Texto = useMemo(() => resolverH1(window.location.search), []);
  const [billValue, setBillValue] = useState(() => {
    const staticInput = document.getElementById('lp-static-bill') as HTMLInputElement | null;
    return staticInput?.value ? formatarMoeda(staticInput.value) : '';
  });
  const [calculated, setCalculated] = useState(false);
  const [leadEnviado, setLeadEnviado] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const desqualificadoDisparado = useRef(false);

  useEffect(() => {
    iniciarPixel();
    capturarOrigemLead();
  }, []);

  const parsedValue = parseMoeda(billValue);
  const qualificado = parsedValue >= VALOR_MINIMO_CONTA;
  const economiaMensal = parsedValue * TAXA_ECONOMIA_ESTIMADA;
  const economiaAnual = economiaMensal * 12;

  const handleCalcular = () => {
    setCalculated(true);
    if (parsedValue >= VALOR_MINIMO_CONTA) {
      desqualificadoDisparado.current = false;
      trackSimulacaoCalculada({ faixa_conta: faixaContaPorValor(parsedValue), origem_destino: 'lp' });
      requestAnimationFrame(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        resultRef.current?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      });
    } else if (parsedValue > 0 && !desqualificadoDisparado.current) {
      desqualificadoDisparado.current = true;
      trackLeadDesqualificado({ valor_informado: parsedValue, origem_destino: 'lp' });
    }
  };

  const handleSucessoLead = () => {
    setLeadEnviado(true);
    // Pequeno atraso pra dar tempo do fbq('track','Lead',...) sair antes de navegar embora.
    window.setTimeout(() => {
      window.location.assign('/obrigado');
    }, 300);
  };

  const linkWhatsAppFechamento = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGENS.fechamento)}`;

  return (
    <header id="simulador" className="lp-hero" aria-label="Vigor Energy — economize na conta de luz">
      <span className="lp-hero__eyebrow">Energia por assinatura · Usinas em Goiás</span>
      <h1 className="lp-hero__h1" id="lp-hero-h1" data-h1-slot="">{h1Texto}</h1>
      <p className="lp-hero__sub">
        Sua energia continua chegando pela Equatorial, do mesmo jeito. Muda só o valor da tarifa.
      </p>

      {leadEnviado ? (
        <div className="lp-hero__sim motion-safe:animate-fade-up" role="status">
          <p className="text-sm font-semibold text-text-dark">Recebemos! Te levando pro próximo passo...</p>
        </div>
      ) : (
        <div className="lp-hero__sim">
          <label htmlFor="lp-static-bill">Qual o valor médio da sua conta de luz?</label>
          <div className="lp-hero__sim-row">
            <input
              id="lp-static-bill"
              type="text"
              inputMode="decimal"
              placeholder="R$ 350,00"
              aria-label="Valor médio da conta de luz"
              value={billValue}
              onChange={(e) => {
                setBillValue(formatarMoeda(e.target.value));
                setCalculated(false);
              }}
            />
            <button id="lp-static-btn" type="button" onClick={handleCalcular}>
              Ver minha economia
            </button>
          </div>

          {calculated && parsedValue > 0 && (
            <div ref={resultRef} className="mt-4 motion-safe:animate-fade-up">
              {qualificado ? (
                <>
                  <div className="bg-offwhite rounded-2xl p-4">
                    <p className="text-xs font-semibold text-text-muted">
                      Estimativa. A simulação oficial usa a sua fatura real.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted">Por mês</p>
                        <p className="text-xl font-black text-primary">{formatarBRL(economiaMensal)}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted">Por ano</p>
                        <p className="text-xl font-black text-primary">{formatarBRL(economiaAnual)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-light">
                    <LeadForm
                      faixaContaInicial={faixaContaPorValor(parsedValue)}
                      valorContaInformado={parsedValue}
                      onSucesso={handleSucessoLead}
                    />
                  </div>
                </>
              ) : (
                <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 space-y-2">
                  <p className="text-sm font-semibold text-text-dark leading-relaxed">
                    Hoje a Vigor atende contas a partir de R$300 por mês. Abaixo disso o desconto não compensa a
                    troca, e a gente prefere te falar isso agora.
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Se você tem outro imóvel ou uma empresa que se encaixe, é só simular de novo com aquele valor.
                  </p>
                  <a
                    href={linkWhatsAppFechamento}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-bold text-primary underline"
                  >
                    Prefere falar com a Júlia mesmo assim?
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <ul className="lp-hero__badges">
        <li>Sem instalação</li>
        <li>Sem investimento</li>
        <li>Sem fidelidade obrigatória</li>
      </ul>
    </header>
  );
}
