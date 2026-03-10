import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import Differentials from './components/Differentials';

import SimulatorForm from './components/SimulatorForm';
import FAQAccordion from './components/FAQAccordion';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <Differentials />

        <SimulatorForm />
        <FAQAccordion />
      </main>
      <Footer />
    </div>
  );
}
