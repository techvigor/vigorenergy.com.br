import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SelecaoVigorEnergy from './pages/SelecaoVigorEnergy';
import Parceiros from './pages/Parceiros';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selecao-vigor-energy" element={<SelecaoVigorEnergy />} />
        <Route path="/parceiros" element={<Parceiros />} />
      </Routes>
    </Router>
  );
}
