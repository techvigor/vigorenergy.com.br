import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Ilha separada da árvore do Router: o hero de /economize já foi pintado como HTML estático
// (index.html) antes deste bundle carregar. Aqui o React assume a interatividade do mesmo
// container, sem re-montar nada fora dele. Import dinâmico: nenhuma outra rota deve pagar
// o peso do simulador/formulário da LP só por carregar o entrypoint do site.
if (window.location.pathname.replace(/\/$/, '') === '/economize') {
  const heroShell = document.getElementById('lp-hero-shell')
  if (heroShell) {
    import('./components/lp-economize/HeroIsland').then(({ default: HeroIsland }) => {
      createRoot(heroShell).render(
        <StrictMode>
          <HeroIsland />
        </StrictMode>,
      )
    })
  }
}
