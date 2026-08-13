import { useEffect, useState } from 'react';

export default function MobileStickyCta() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const simulador = document.getElementById('simulador');
    if (!simulador) return;

    // Some enquanto o simulador/formulário está na tela, pra nunca cobrir um campo de input.
    const observer = new IntersectionObserver(
      ([entry]) => setVisivel(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(simulador);
    return () => observer.disconnect();
  }, []);

  const irParaSimulador = (e: React.MouseEvent) => {
    e.preventDefault();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('simulador')?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-light p-3 transition-transform duration-200 ${
        visivel ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href="#simulador"
        onClick={irParaSimulador}
        className="block w-full text-center bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg"
      >
        Simular minha economia
      </a>
    </div>
  );
}
