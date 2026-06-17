import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/blog', label: 'Artigos', icon: FileText, exact: false },
];

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-offwhite">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-gray-light/60 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-light/60">
          <img src="/logomarca_transp.png" alt="Vigor Energy" className="h-7" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:bg-primary/5 hover:text-primary'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-gray-light/60">
          <p className="text-xs text-text-muted px-3 mb-3 truncate">{user?.email}</p>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
