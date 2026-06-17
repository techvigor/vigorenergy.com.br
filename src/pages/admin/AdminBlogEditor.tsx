import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import TiptapEditor from '../../components/admin/TiptapEditor';
import CoverImageInput from '../../components/admin/CoverImageInput';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-|-$/g, '');
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  content: string;
  published: boolean;
}

const emptyForm: FormData = {
  title: '',
  slug: '',
  excerpt: '',
  cover_image_url: '',
  content: '',
  published: false,
};

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<FormData>(emptyForm);
  const [slugManual, setSlugManual] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          setForm({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt ?? '',
            cover_image_url: data.cover_image_url ?? '',
            content: data.content,
            published: data.published,
          });
          setSlugManual(true);
        }
        setLoading(false);
      });
  }, [id, isEdit]);

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugManual ? prev.slug : slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setSlugManual(true);
    setForm((prev) => ({ ...prev, slug: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('O título é obrigatório.'); return; }
    if (!form.slug.trim()) { setError('O slug é obrigatório.'); return; }
    if (!form.content || form.content === '<p></p>') { setError('O conteúdo é obrigatório.'); return; }

    setSaving(true);
    setError('');

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim() || null,
      cover_image_url: form.cover_image_url.trim() || null,
      content: form.content,
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    let queryError;
    if (isEdit) {
      const { error } = await supabase.from('blog_posts').update(payload).eq('id', id);
      queryError = error;
    } else {
      const { error } = await supabase.from('blog_posts').insert(payload);
      queryError = error;
    }

    setSaving(false);

    if (queryError) {
      if (queryError.message.includes('unique')) {
        setError('Já existe um artigo com esse slug. Escolha outro.');
      } else {
        setError('Erro ao salvar. Tente novamente.');
      }
      return;
    }

    navigate('/admin/blog');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-96">
        <div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => navigate('/admin/blog')}
          className="p-2 rounded-xl text-text-muted hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-text-dark">
            {isEdit ? 'Editar artigo' : 'Novo artigo'}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            {isEdit ? 'Atualize o conteúdo do artigo' : 'Crie um novo artigo para o blog'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Title */}
        <div className="bg-white rounded-2xl border border-gray-light/60 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-text-dark">Informações básicas</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-dark">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ex: Como a energia solar pode reduzir sua conta"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-light text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-dark">
              Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 bg-offwhite border border-r-0 border-gray-light rounded-l-xl text-xs text-text-muted font-mono whitespace-nowrap">
                /blog/
              </span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="como-energia-solar-reduz-sua-conta"
                className="flex-1 px-4 py-2.5 rounded-r-xl border border-gray-light text-sm text-text-dark font-mono placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-dark">Resumo</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Breve descrição do artigo (aparece na listagem do blog)"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-light text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <CoverImageInput
            value={form.cover_image_url}
            onChange={(url) => setForm((prev) => ({ ...prev, cover_image_url: url }))}
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-light/60 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-text-dark">
            Conteúdo <span className="text-red-500">*</span>
          </h2>
          <TiptapEditor
            key={isEdit ? id : 'new'}
            initialContent={form.content}
            onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
          />
        </div>

        {/* Publish + Save */}
        <div className="bg-white rounded-2xl border border-gray-light/60 p-6 flex items-center justify-between gap-4">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  form.published ? 'bg-primary' : 'bg-gray-light'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    form.published ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-dark">
                {form.published ? 'Publicado' : 'Rascunho'}
              </p>
              <p className="text-xs text-text-muted">
                {form.published
                  ? 'Visível no blog público'
                  : 'Não aparece no blog público'}
              </p>
            </div>
          </label>

          <div className="flex flex-col items-end gap-2">
            {error && (
              <p className="text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {saving ? 'Salvando...' : 'Salvar artigo'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
