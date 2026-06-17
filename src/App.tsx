import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SelecaoVigorEnergy from './pages/SelecaoVigorEnergy';
import Parceiros from './pages/Parceiros';
import UploadFaturas from './pages/UploadFaturas';
import ParceirosMotoristas from './pages/ParceirosMotoristas';
import PassageiroVigor from './pages/PassageiroVigor';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogList from './pages/admin/AdminBlogList';
import AdminBlogEditor from './pages/admin/AdminBlogEditor';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/selecao-vigor-energy" element={<SelecaoVigorEnergy />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/parceiros-motoristas" element={<ParceirosMotoristas />} />
          <Route path="/passageiro" element={<PassageiroVigor />} />
          <Route path="/upload" element={<UploadFaturas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Admin login (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/blog" element={<AdminBlogList />} />
              <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
              <Route path="/admin/blog/:id" element={<AdminBlogEditor />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
