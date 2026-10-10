import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Headset, X, Zap, type LucideIcon } from 'lucide-react';
import { WHATSAPP_COMERCIAL, WHATSAPP_MENSAGENS, WHATSAPP_SUPORTE } from '../lib/lp-economize/config';

// Rotas sem o botão: o painel administrativo e /energia (que já redireciona direto pro WhatsApp).
const ROTAS_SEM_BOTAO = ['/admin', '/energia'];

// Páginas que já têm mensagem própria usam a mesma na opção Comercial — é ela que diz ao
// comercial de onde o lead veio (anúncio, link da bio, cadastro recém-feito).
const MENSAGEM_COMERCIAL_POR_ROTA: Record<string, string> = {
  '/economize': WHATSAPP_MENSAGENS.fechamento,
  '/obrigado': WHATSAPP_MENSAGENS.obrigado,
  '/links': WHATSAPP_MENSAGENS.links,
};

const POSICAO_PADRAO = 'bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-6';
// Em /economize o mobile tem a barra fixa "Simular minha economia" (MobileStickyCta) no rodapé
// da tela: o botão sobe o suficiente pra ficar acima dela, em vez de cobrir o CTA.
const POSICAO_ACIMA_DO_CTA_FIXO = 'bottom-[calc(5rem+max(0.75rem,env(safe-area-inset-bottom)))] md:bottom-6';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

type Opcao = {
  titulo: string;
  descricao: string;
  icon: LucideIcon;
  numero: string;
  mensagem: string;
};

/**
 * Botão flutuante do WhatsApp, no canto inferior direito de todas as páginas públicas do site.
 * O clique abre, acima do botão, a lista de atendimentos (Comercial ou Suporte); cada opção leva
 * pro WhatsApp do respectivo time. Para adicionar/remover opções, edite `opcoes`.
 */
export default function WhatsAppFloatingButton() {
  const { pathname } = useLocation();
  const rota = pathname.replace(/\/$/, '') || '/';

  // Guarda a rota em que a lista foi aberta, em vez de um booleano: ao navegar, ela fecha sozinha.
  const [abertoNaRota, setAbertoNaRota] = useState<string | null>(null);
  const aberto = abertoNaRota === rota;
  const containerRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);

  // Com a lista aberta: fecha ao clicar/tocar fora dela ou apertar Esc.
  useEffect(() => {
    if (!aberto) return;

    const aoApontarFora = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setAbertoNaRota(null);
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setAbertoNaRota(null);
      botaoRef.current?.focus();
    };

    document.addEventListener('pointerdown', aoApontarFora);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('pointerdown', aoApontarFora);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  if (ROTAS_SEM_BOTAO.some((r) => rota === r || rota.startsWith(`${r}/`))) return null;

  const opcoes: Opcao[] = [
    {
      titulo: 'Comercial',
      descricao: 'Quero economizar na conta de luz',
      icon: Zap,
      numero: WHATSAPP_COMERCIAL,
      mensagem: MENSAGEM_COMERCIAL_POR_ROTA[rota] ?? WHATSAPP_MENSAGENS.site,
    },
    {
      titulo: 'Suporte e dúvidas',
      descricao: 'Já sou cliente ou preciso de ajuda',
      icon: Headset,
      numero: WHATSAPP_SUPORTE,
      mensagem: WHATSAPP_MENSAGENS.suporte,
    },
  ];

  return (
    // flex-col-reverse: no DOM o botão vem antes da lista (ordem do Tab), na tela a lista fica acima dele.
    <div
      ref={containerRef}
      className={`fixed right-4 md:right-6 z-40 flex flex-col-reverse items-end gap-3 ${
        rota === '/economize' ? POSICAO_ACIMA_DO_CTA_FIXO : POSICAO_PADRAO
      }`}
    >
      <button
        ref={botaoRef}
        type="button"
        onClick={() => setAbertoNaRota(aberto ? null : rota)}
        aria-expanded={aberto}
        aria-controls="whatsapp-opcoes"
        aria-label={aberto ? 'Fechar opções de atendimento' : 'Falar com a Vigor Energy no WhatsApp'}
        className={`w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 ${focusRing}`}
      >
        {aberto ? (
          <X size={26} aria-hidden="true" />
        ) : (
          // Logo do WhatsApp (o lucide-react não traz ícones de marca)
          <svg viewBox="0 0 24 24" width={30} height={30} fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        )}
      </button>

      {aberto && (
        <div
          id="whatsapp-opcoes"
          role="group"
          aria-labelledby="whatsapp-opcoes-titulo"
          className="w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-gray-light/60 shadow-xl shadow-black/15 p-2 motion-safe:animate-fade-up"
        >
          <p id="whatsapp-opcoes-titulo" className="px-3 pt-2 pb-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
            Com quem você quer falar?
          </p>
          <ul className="flex flex-col gap-1">
            {opcoes.map(({ titulo, descricao, icon: Icon, numero, mensagem }) => (
              <li key={titulo}>
                <a
                  href={`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setAbertoNaRota(null)}
                  className={`group flex items-center gap-3 rounded-xl p-3 hover:bg-primary/5 transition-colors ${focusRing}`}
                >
                  <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-text-dark leading-tight">{titulo}</span>
                    <span className="block text-[13px] text-text-muted leading-snug mt-0.5 text-pretty">{descricao}</span>
                  </span>
                  <ChevronRight size={16} className="flex-shrink-0 text-text-muted group-hover:text-primary transition-colors" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
