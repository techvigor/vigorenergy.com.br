import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, published, created_at')
      .order('created_at', { ascending: false });

    if (!error && data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Excluir o artigo "${title}"? Esta ação não pode ser desfeita.`)) return;
    setDeletingId(id);
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeletingId(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Artigos</h1>
          <p className="text-sm text-text-muted mt-1">Gerencie os artigos do blog</p>
        </div>
        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-primary text-white font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors"
        >
          <PlusCircle size={16} />
          Novo artigo
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-light/60 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted text-sm">Nenhum artigo criado ainda.</p>
            <Link
              to="/admin/blog/new"
              className="mt-4 inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
            >
              <PlusCircle size={15} />
              Criar primeiro artigo
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-light/60 bg-offwhite">
                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Título
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Data
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-light/40">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-offwhite/60 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-text-dark truncate max-w-xs">{post.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-text-muted whitespace-nowrap">
                    {formatDate(post.created_at)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/blog/${post.id}`}
                        className="p-2 rounded-lg text-text-muted hover:bg-primary/10 hover:text-primary transition-colors"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        disabled={deletingId === post.id}
                        className="p-2 rounded-lg text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
