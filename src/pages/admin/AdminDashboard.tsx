import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Stats {
  total: number;
  published: number;
  drafts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('published');

      if (!error && data) {
        const published = data.filter((p) => p.published).length;
        setStats({ total: data.length, published, drafts: data.length - published });
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total de artigos', value: stats.total, icon: FileText, color: 'text-primary bg-primary/10' },
    { label: 'Publicados', value: stats.published, icon: CheckCircle, color: 'text-green-700 bg-green-100' },
    { label: 'Rascunhos', value: stats.drafts, icon: Clock, color: 'text-amber-700 bg-amber-100' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-dark">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">Bem-vindo à área administrativa da Vigor Energy</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-light/60 p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium">{label}</p>
              <p className="text-2xl font-bold text-text-dark leading-tight">
                {loading ? '—' : value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-light/60 p-6">
        <h2 className="text-sm font-semibold text-text-dark mb-4">Ações rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-primary text-white font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors"
          >
            <PlusCircle size={16} />
            Novo artigo
          </Link>
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-2 bg-offwhite text-text-dark font-medium px-5 py-2.5 rounded-xl text-sm border border-gray-light hover:border-primary hover:text-primary transition-colors"
          >
            <FileText size={16} />
            Ver todos os artigos
          </Link>
        </div>
      </div>
    </div>
  );
}
