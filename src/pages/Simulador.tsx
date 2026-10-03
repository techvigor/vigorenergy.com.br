import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SimulatorForm from '../components/SimulatorForm';
import Footer from '../components/Footer';

export default function Simulador() {
  // Sobe o scroll para o topo ao carregar a página e ajusta o título da aba enquanto ela estiver aberta
  useEffect(() => {
    window.scrollTo(0, 0);
    const tituloAnterior = document.title;
    document.title = 'Simule sua economia | Vigor Energy';
    return () => {
      document.title = tituloAnterior;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-vigor-dark">
      <Navbar />
      {/* Respiro extra no topo: a navbar é fixa e flutua sobre o início da seção */}
      <main className="flex-1 pt-12 md:pt-8">
        <SimulatorForm headingAs="h1" />
      </main>
      <Footer />
    </div>
  );
}
