import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_MENSAGENS, WHATSAPP_NUMERO } from '../lib/lp-economize/config';

/**
 * Rota /obrigado — noindex primário via header X-Robots-Tag (vercel.json), já que é
 * um SPA sem SSR e o header funciona mesmo pra crawlers que não executam JS. A meta tag
 * abaixo é só reforço client-side.
 */
export default function Obrigado() {
  useEffect(() => {
    document.title = 'Recebemos seu cadastro | Vigor Energy';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGENS.obrigado)}`;

  return (
    <div className="min-h-screen bg-vigor-dark text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-3">Recebemos! A Júlia já vai te chamar.</h1>
        <p className="text-white/75 leading-relaxed mb-8">
          Pra adiantar seu atendimento, chama ela agora no WhatsApp e manda a foto da sua última fatura.
        </p>
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 bg-accent hover:bg-accent-hover transition-colors text-white font-bold text-lg py-4 rounded-xl shadow-lg"
        >
          <MessageCircle size={20} /> Chamar a Júlia no WhatsApp
        </a>
        <p className="text-white/50 text-sm mt-8 leading-relaxed">
          A Júlia analisa seu cadastro e te chama pelo WhatsApp em até 1 dia útil — mas responder você mesmo agora
          agiliza bastante.
        </p>
      </div>
    </div>
  );
}
