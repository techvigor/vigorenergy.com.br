import { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, X, ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface CoverImageInputProps {
  value: string;
  onChange: (url: string) => void;
}

type Mode = 'url' | 'upload';

export default function CoverImageInput({ value, onChange }: CoverImageInputProps) {
  const [mode, setMode] = useState<Mode>('url');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Apenas arquivos de imagem são permitidos.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('O arquivo deve ter no máximo 5 MB.');
      return;
    }

    setUploadError('');
    setUploading(true);

    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filename, file, { upsert: false });

    setUploading(false);

    if (error) {
      setUploadError(`Erro no upload: ${error.message}`);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(data.path);

    onChange(publicUrl);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-dark">Imagem de capa</label>

        {/* Mode toggle */}
        <div className="flex bg-offwhite border border-gray-light rounded-lg p-0.5 gap-0.5">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              mode === 'url'
                ? 'bg-white text-text-dark shadow-sm border border-gray-light/60'
                : 'text-text-muted hover:text-text-dark'
            }`}
          >
            <LinkIcon size={13} />
            URL
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              mode === 'upload'
                ? 'bg-white text-text-dark shadow-sm border border-gray-light/60'
                : 'text-text-muted hover:text-text-dark'
            }`}
          >
            <Upload size={13} />
            Upload
          </button>
        </div>
      </div>

      {/* URL mode */}
      {mode === 'url' && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-light text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
        />
      )}

      {/* Upload mode */}
      {mode === 'upload' && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="sr-only"
          />
          <div
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl px-6 py-8 transition-colors cursor-pointer ${
              dragOver
                ? 'border-primary bg-primary/5'
                : 'border-gray-light hover:border-primary/50 hover:bg-offwhite'
            } ${uploading ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            {uploading ? (
              <>
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-text-muted">Enviando imagem...</p>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ImageIcon size={20} className="text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-text-dark">
                    Clique ou arraste a imagem aqui
                  </p>
                  <p className="text-xs text-text-muted mt-1">PNG, JPG, WebP — máx. 5 MB</p>
                </div>
              </>
            )}
          </div>

          {uploadError && (
            <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
              {uploadError}
            </p>
          )}
        </>
      )}

      {/* Preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden border border-gray-light">
          <img
            src={value}
            alt="Prévia da capa"
            className="w-full max-h-48 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
            title="Remover imagem"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
