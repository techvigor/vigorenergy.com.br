import { useRef, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { FATURA_UPLOAD_MAX_MB, FATURA_UPLOAD_TIPOS_ACEITOS } from '../../lib/lp-economize/config';

interface Props {
  value: File | null;
  onChange: (file: File | null) => void;
}

const TIPOS_ACEITOS: readonly string[] = FATURA_UPLOAD_TIPOS_ACEITOS;

export default function FaturaUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (file: File | null) => {
    setErro(null);
    if (!file) {
      onChange(null);
      setPreviewUrl(null);
      return;
    }
    if (!TIPOS_ACEITOS.includes(file.type)) {
      setErro('Formato não aceito. Envie jpg, png, webp ou PDF.');
      return;
    }
    if (file.size > FATURA_UPLOAD_MAX_MB * 1024 * 1024) {
      setErro(`Arquivo maior que ${FATURA_UPLOAD_MAX_MB}MB.`);
      return;
    }
    onChange(file);
    setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
  };

  const remover = () => {
    handleFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-text-dark mb-2">
        Fatura (foto ou PDF) <span className="font-normal text-text-muted">— opcional</span>
      </label>
      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-light rounded-2xl py-4 px-4 text-text-muted hover:border-primary hover:text-primary transition-colors text-sm font-medium"
        >
          <Upload size={18} /> Anexar fatura (até {FATURA_UPLOAD_MAX_MB}MB)
        </button>
      ) : (
        <div className="flex items-center gap-3 border border-gray-light rounded-2xl p-3">
          {previewUrl ? (
            <img src={previewUrl} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-offwhite flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-text-muted" />
            </div>
          )}
          <span className="flex-1 text-sm text-text-dark truncate">{value.name}</span>
          <button
            type="button"
            onClick={remover}
            aria-label="Remover fatura"
            className="p-1.5 text-text-muted hover:text-red-600 transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={TIPOS_ACEITOS.join(',')}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      {erro && <p className="text-red-600 text-xs mt-1.5 font-medium">{erro}</p>}
    </div>
  );
}
