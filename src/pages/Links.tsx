import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  MessageCircle,
  Sun,
  Handshake,
  BookOpen,
  MapPin,
  ChevronRight,
  Instagram,
  Linkedin,
  type LucideIcon,
} from 'lucide-react';
import { WHATSAPP_MENSAGENS, WHATSAPP_NUMERO } from '../lib/lp-economize/config';

/**
 * Página de "link na bio" do Instagram (vigorenergy.com.br/links). Mobile-first: quase todo
 * acesso vem do navegador interno do Instagram no celular — por isso sem navbar/rodapé do
 * site, coluna única estreita e alvos de toque grandes. Para adicionar/remover botões, edite `links`.
 */

type LinkItem = {
  label: string;
  descricao: string;
  icon: LucideIcon;
  to: string;
  externo?: boolean;
};

const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGENS.links)}`;

const links: LinkItem[] = [
  { label: 'Falar no WhatsApp', descricao: 'Tire suas dúvidas com o nosso time', icon: MessageCircle, to: linkWhatsApp, externo: true },
  { label: 'Conheça a Vigor Energy', descricao: 'Como funciona a energia por assinatura', icon: Sun, to: '/' },
  { label: 'Seja parceiro', descricao: 'Indique clientes e ganhe até 80% da 1ª fatura', icon: Handshake, to: '/parceiros' },
  { label: 'Blog', descricao: 'Dicas para economizar na conta de luz', icon: BookOpen, to: '/blog' },
  { label: 'Contato e endereço', descricao: 'Telefone, e-mail e como chegar', icon: MapPin, to: '/contato' },
];

const redesSociais = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/vigorenergyoficial/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/vigor-energy/' },
];

const destaques = ['Sem obra', 'Sem investimento', 'Sem fidelidade obrigatória'];

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

function LinkContent({ label, descricao, icon: Icon }: Pick<LinkItem, 'label' | 'descricao' | 'icon'>) {
  return (
    <>
      <span className="w-11 h-11 rounded-xl bg-white/10 text-accent flex items-center justify-center flex-shrink-0">
        <Icon size={20} />
      </span>
      <span className="flex-1 min-w-0 text-left">
        <span className="block font-bold text-[15px] leading-tight">{label}</span>
        <span className="block text-[13px] text-white/65 leading-snug mt-0.5 text-pretty">{descricao}</span>
      </span>
      <ChevronRight size={18} className="flex-shrink-0 text-white/40" />
    </>
  );
}

export default function Links() {
  // Ajusta o título da aba enquanto a página estiver aberta (o scroll ao topo é feito no App)
  useEffect(() => {
    const tituloAnterior = document.title;
    document.title = 'Links | Vigor Energy';
    return () => {
      document.title = tituloAnterior;
    };
  }, []);

  const itemClass = `flex items-center gap-3.5 w-full min-h-[68px] rounded-2xl bg-white/[0.07] border border-white/10 px-3.5 py-3 text-white transition-colors hover:bg-white/[0.12] active:bg-white/[0.15] ${focusRing}`;

  return (
    <div className="relative min-h-svh bg-vigor-dark text-white overflow-hidden">
      {/* Brilho laranja sutil atrás do logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-accent/15 blur-3xl"
      />

      <main className="relative mx-auto w-full max-w-md min-h-svh px-4 pt-10 pb-8 flex flex-col">
        {/* Perfil */}
        <header className="text-center mb-7">
          <Link to="/" aria-label="Ir para o site da Vigor Energy" className={`inline-block rounded-full ${focusRing}`}>
            <span className="w-20 h-20 rounded-full bg-white/[0.06] ring-1 ring-white/15 flex items-center justify-center mx-auto shadow-xl">
              <img src="/favicon.png" alt="" width={48} height={48} className="w-12 h-12" />
            </span>
          </Link>
          <h1 className="mt-4">
            <img src="/logomarca_transp.png" alt="Vigor Energy" width={1000} height={150} className="h-7 w-auto mx-auto brightness-0 invert" />
          </h1>
          <p className="mt-3 text-base font-semibold text-white text-balance">Energia solar por assinatura em Goiás</p>
          <p className="mt-1 text-sm text-white/70">
            Até <strong className="text-accent font-bold">28% de desconto</strong> na conta de luz
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {destaques.map((d) => (
              <li key={d} className="text-xs font-medium text-white/80 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1">
                {d}
              </li>
            ))}
          </ul>
        </header>

        {/* Links */}
        <nav aria-label="Links da Vigor Energy" className="flex flex-col gap-3">
          <Link
            to="/simulador"
            className={`flex items-center gap-3.5 w-full min-h-[72px] rounded-2xl bg-accent text-text-dark px-3.5 py-3 shadow-lg shadow-black/25 transition-colors hover:bg-accent-hover active:bg-accent-hover ${focusRing}`}
          >
            <span className="w-11 h-11 rounded-xl bg-white/45 flex items-center justify-center flex-shrink-0">
              <Calculator size={20} />
            </span>
            <span className="flex-1 min-w-0 text-left">
              <span className="block font-extrabold text-base leading-tight">Simule sua economia</span>
              <span className="block text-[13px] text-text-dark/85 leading-snug mt-0.5 text-pretty">Descubra em 1 minuto quanto você economiza</span>
            </span>
            <ChevronRight size={20} className="flex-shrink-0" />
          </Link>

          {links.map(({ label, descricao, icon, to, externo }) =>
            externo ? (
              <a key={label} href={to} target="_blank" rel="noopener noreferrer" className={itemClass}>
                <LinkContent label={label} descricao={descricao} icon={icon} />
              </a>
            ) : (
              <Link key={label} to={to} className={itemClass}>
                <LinkContent label={label} descricao={descricao} icon={icon} />
              </Link>
            )
          )}
        </nav>

        {/* Rodapé */}
        <footer className="mt-auto pt-10 text-center">
          <div className="flex justify-center gap-3 mb-5">
            {redesSociais.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-11 h-11 rounded-full bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/80 hover:text-accent hover:bg-white/[0.12] transition-colors ${focusRing}`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-xs text-white/60">R. 6, 498 - St. Oeste, Goiânia - GO</p>
          <p className="text-xs text-white/60 mt-1">© {new Date().getFullYear()} Vigor Energy</p>
        </footer>
      </main>
    </div>
  );
}
