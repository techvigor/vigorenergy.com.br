import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              Blog Vigor Energy
            </h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              Tudo o que você precisa saber sobre o mercado de energia e como economizar.
            </p>
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">Nenhum artigo publicado ainda.</p>
              <p className="text-text-muted text-sm mt-2">Volte em breve!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-light/60 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  {/* Cover image */}
                  {post.cover_image_url ? (
                    <div className="overflow-hidden aspect-video bg-offwhite">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <img src="/logomarca_transp.png" alt="Vigor Energy" className="h-8 opacity-30" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
                      <Calendar size={13} />
                      {formatDate(post.created_at)}
                    </div>
                    <h2 className="font-bold text-text-dark text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      Ler artigo
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
