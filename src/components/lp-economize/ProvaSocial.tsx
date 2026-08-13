import { NUMERO_ASSINANTES, FATURA_ANTES, FATURA_DEPOIS } from '../../lib/lp-economize/config';
import { formatarBRL } from '../../lib/lp-economize/format';

/**
 * Sem número real / sem autorização de uso da fatura, a seção inteira não renderiza —
 * nunca com placeholder visível ou dado inventado (item 4.4 do spec).
 */
export default function ProvaSocial() {
  const temContador = NUMERO_ASSINANTES !== null;
  const temComparativo = FATURA_ANTES !== null && FATURA_DEPOIS !== null;

  if (!temContador && !temComparativo) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
        {temContador && (
          <p className="text-xl md:text-2xl font-bold text-text-dark mb-12">
            Mais de <span className="text-primary">{NUMERO_ASSINANTES!.toLocaleString('pt-BR')}</span> famílias e
            empresas em Goiás já pagam menos.
          </p>
        )}
        {temComparativo && FATURA_ANTES && FATURA_DEPOIS && (
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-2">Antes</p>
              <img
                src={FATURA_ANTES.imagemUrl}
                alt="Fatura antes da Vigor Energy"
                className="rounded-xl border border-gray-light w-full"
                loading="lazy"
                width={280}
                height={360}
              />
              <p className="mt-2 font-black text-lg text-text-dark">{formatarBRL(FATURA_ANTES.valor)}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-2">Depois</p>
              <img
                src={FATURA_DEPOIS.imagemUrl}
                alt="Fatura depois da Vigor Energy"
                className="rounded-xl border border-gray-light w-full"
                loading="lazy"
                width={280}
                height={360}
              />
              <p className="mt-2 font-black text-lg text-primary">{formatarBRL(FATURA_DEPOIS.valor)}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
