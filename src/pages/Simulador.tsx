import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SimulatorForm from '../components/SimulatorForm';
import Footer from '../components/Footer';

export default function Simulador() {
  // Ajusta o título da aba enquanto a página estiver aberta (o scroll ao topo é feito no App)
  useEffect(() => {
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
