import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface Post {
  title: string;
  content: string;
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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { navigate('/blog', { replace: true }); return; }

    supabase
      .from('blog_posts')
      .select('title, content, excerpt, cover_image_url, created_at')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col bg-offwhite">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 pt-24 px-4">
          <h1 className="text-3xl font-bold text-text-dark">Artigo não encontrado</h1>
          <p className="text-text-muted">O artigo que você procura não existe ou foi removido.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <ArrowLeft size={16} />
            Voltar ao blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Voltar ao blog
          </Link>

          {/* Cover */}
          {post!.cover_image_url && (
            <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
              <img
                src={post!.cover_image_url}
                alt={post!.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-1.5 text-sm text-text-muted mb-4">
            <Calendar size={14} />
            {formatDate(post!.created_at)}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight mb-4">
            {post!.title}
          </h1>

          {post!.excerpt && (
            <p className="text-lg text-text-muted leading-relaxed mb-8 pb-8 border-b border-gray-light">
              {post!.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post!.content }}
          />

          {/* Footer CTA */}
          <div className="mt-16 pt-8 border-t border-gray-light">
            <div className="bg-primary rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Pronto para economizar na conta de luz?</h3>
              <p className="text-white/80 text-sm mb-5">
                Simule agora quanto você pode economizar com energia solar por assinatura.
              </p>
              <a
                href="/#simulador"
                className="inline-block bg-accent text-text-dark font-bold px-8 py-3 rounded-full hover:bg-accent-hover transition-colors"
              >
                Simular economia
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
