import { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Link, Image, Undo, Redo, Minus, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface TiptapEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        active
          ? 'bg-primary text-white'
          : 'text-text-muted hover:bg-primary/10 hover:text-primary'
      }`}
    >
      {children}
    </button>
  );
}

export default function TiptapEditor({ initialContent = '', onChange }: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false, HTMLAttributes: { class: 'text-primary underline' } }),
      ImageExtension.configure({ HTMLAttributes: { class: 'max-w-full rounded-lg my-4' } }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor min-h-64 p-4 outline-none prose-content',
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('URL do link:');
    if (!url) return;
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5 MB.');
      return;
    }

    setUploadingImage(true);

    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filename, file, { upsert: false });

    setUploadingImage(false);

    if (error || !data) {
      alert(`Erro ao enviar imagem: ${error?.message ?? 'desconhecido'}`);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(data.path);

    editor.chain().focus().setImage({ src: publicUrl }).run();
  };

  return (
    <div className="border border-gray-light rounded-xl overflow-hidden bg-white">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageFileChange}
        className="sr-only"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-light bg-offwhite">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Desfazer">
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Refazer">
          <Redo size={16} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-light mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Negrito"
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Itálico"
        >
          <Italic size={16} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-light mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Título 2"
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Título 3"
        >
          <Heading3 size={16} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-light mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Lista não ordenada"
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Lista ordenada"
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Citação"
        >
          <Quote size={16} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-light mx-1" />

        <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Inserir link">
          <Link size={16} />
        </ToolbarButton>

        {/* Image upload button */}
        <ToolbarButton
          onClick={() => !uploadingImage && fileInputRef.current?.click()}
          disabled={uploadingImage}
          title="Inserir imagem"
        >
          {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <Image size={16} />}
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Linha horizontal"
        >
          <Minus size={16} />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
