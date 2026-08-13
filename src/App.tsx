import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const AuthProviderOutlet = lazy(() =>
  import('./contexts/AuthContext').then((m) => ({
    default: () => (
      <m.AuthProvider>
        <Outlet />
      </m.AuthProvider>
    ),
  }))
);

// Code-split por rota: cada página vira um chunk carregado sob demanda, não tudo no bundle
// inicial. Crítico pra /economize, que precisa ficar bem abaixo de 100KB de JS (tráfego pago,
// LCP em 4G) e não tem motivo pra baixar o editor Tiptap do admin ou o three.js/vanta do Home.
const Home = lazy(() => import('./pages/Home'));
const SelecaoVigorEnergy = lazy(() => import('./pages/SelecaoVigorEnergy'));
const Parceiros = lazy(() => import('./pages/Parceiros'));
const UploadFaturas = lazy(() => import('./pages/UploadFaturas'));
const ParceirosMotoristas = lazy(() => import('./pages/ParceirosMotoristas'));
const PassageiroVigor = lazy(() => import('./pages/PassageiroVigor'));
const EnergiaRedirect = lazy(() => import('./pages/EnergiaRedirect'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PoliticaDePrivacidade = lazy(() => import('./pages/PoliticaDePrivacidade'));
const TermosDeUso = lazy(() => import('./pages/TermosDeUso'));
const EstatutoAssociacao = lazy(() => import('./pages/EstatutoAssociacao'));
const Economize = lazy(() => import('./pages/Economize'));
const Obrigado = lazy(() => import('./pages/Obrigado'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminBlogList = lazy(() => import('./pages/admin/AdminBlogList'));
const AdminBlogEditor = lazy(() => import('./pages/admin/AdminBlogEditor'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/energia" element={<EnergiaRedirect />} />
          <Route path="/selecao-vigor-energy" element={<SelecaoVigorEnergy />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/parceiros-motoristas" element={<ParceirosMotoristas />} />
          <Route path="/passageiro" element={<PassageiroVigor />} />
          <Route path="/upload" element={<UploadFaturas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/estatuto-associacao" element={<EstatutoAssociacao />} />
          <Route path="/economize" element={<Economize />} />
          <Route path="/obrigado" element={<Obrigado />} />

          {/*
            AuthProvider (e o SDK do Supabase que ele carrega) fica só a partir daqui —
            nenhuma rota pública precisa de sessão de auth, e /economize em especial não
            pode pagar o peso do SDK completo só porque o admin existe em algum lugar do app.
          */}
          <Route element={<AuthProviderOutlet />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/blog" element={<AdminBlogList />} />
                <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
                <Route path="/admin/blog/:id" element={<AdminBlogEditor />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
