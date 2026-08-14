import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Ilha separada da árvore do Router: o hero de /economize já foi pintado como HTML estático
// (index.html) antes deste bundle carregar. hydrateRoot (não createRoot) é o que faz o React
// ADOTAR esse DOM já existente em vez de descartar e remontar do zero — createRoot aqui causava
// uma repintura real assim que o JS chegava (medido: ~930ms de "element render delay" no LCP
// em produção), anulando o ganho de ter o hero estático. Import dinâmico: nenhuma outra rota
// deve pagar o peso do simulador/formulário da LP só por carregar o entrypoint do site.
if (window.location.pathname.replace(/\/$/, '') === '/economize') {
  const heroShell = document.getElementById('lp-hero-shell')
  if (heroShell) {
    import('./components/lp-economize/HeroIsland').then(({ default: HeroIsland }) => {
      hydrateRoot(
        heroShell,
        <StrictMode>
          <HeroIsland />
        </StrictMode>,
      )
    })
  }
}
