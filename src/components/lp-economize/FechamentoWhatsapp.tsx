import { MessageCircle } from 'lucide-react';
import { WHATSAPP_MENSAGENS, WHATSAPP_NUMERO } from '../../lib/lp-economize/config';

function irParaSimulador(e: React.MouseEvent) {
  e.preventDefault();
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('simulador')?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

export default function FechamentoWhatsapp() {
  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGENS.fechamento)}`;

  return (
    <section className="py-16 md:py-24 bg-offwhite">
      <div className="max-w-2xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-text-dark mb-4">Pronto pra ver quanto economiza?</h2>
        <a
          href="#simulador"
          onClick={irParaSimulador}
          className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary-dark transition-colors shadow-lg"
        >
          Simular minha economia
        </a>

        <div className="mt-10 pt-10 border-t border-gray-light">
          <h3 className="text-lg font-bold text-text-dark mb-2">Prefere conversar antes?</h3>
          <p className="text-text-muted mb-4">
            Chame a Júlia no WhatsApp. Ela faz sua simulação na hora — é só estar com a sua conta em mãos.
          </p>
          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold underline"
          >
            <MessageCircle size={18} /> Falar com a Júlia no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
