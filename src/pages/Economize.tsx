import ComoFunciona from '../components/lp-economize/ComoFunciona';
import OQueMudaNaoMuda from '../components/lp-economize/OQueMudaNaoMuda';
import ProvaSocial from '../components/lp-economize/ProvaSocial';
import QuemPodeParticipar from '../components/lp-economize/QuemPodeParticipar';
import FaqLp from '../components/lp-economize/FaqLp';
import FechamentoWhatsapp from '../components/lp-economize/FechamentoWhatsapp';
import MobileStickyCta from '../components/lp-economize/MobileStickyCta';
import FooterLp from '../components/lp-economize/FooterLp';

/**
 * Rota /economize — LP de captação da Campanha 2 (Meta Ads).
 * O hero (eyebrow, H1, subtítulo, simulador) NÃO é renderizado aqui: já existe como HTML
 * estático em index.html e é assumido por uma "ilha" React própria (ver src/main.tsx e
 * src/components/lp-economize/HeroIsland.tsx), fora desta árvore do Router — resolve LCP
 * sem SSR. Esta página cuida só do que vem depois do hero.
 */
export default function Economize() {
  return (
    <>
      {/* O hero (fora desta árvore, ver HeroIsland) funciona como banner/header da página —
          por isso o landmark <main> começa aqui, no conteúdo que o Router renderiza. */}
      <main className="min-h-screen pb-20 md:pb-0">
        <ComoFunciona />
        <OQueMudaNaoMuda />
        <ProvaSocial />
        <QuemPodeParticipar />
        <FaqLp />
        <FechamentoWhatsapp />
      </main>
      <FooterLp />
      <MobileStickyCta />
    </>
  );
}
