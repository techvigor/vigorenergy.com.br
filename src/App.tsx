import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SelecaoVigorEnergy from './pages/SelecaoVigorEnergy';
import Parceiros from './pages/Parceiros';
import UploadFaturas from './pages/UploadFaturas';
import ParceirosMotoristas from './pages/ParceirosMotoristas';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selecao-vigor-energy" element={<SelecaoVigorEnergy />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/parceiros-motoristas" element={<ParceirosMotoristas />} />
        <Route path="/upload" element={<UploadFaturas />} />
      </Routes>
    </Router>
  );
}
