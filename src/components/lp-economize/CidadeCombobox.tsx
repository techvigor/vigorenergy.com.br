import { forwardRef, useId, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { GOIAS_CIDADES } from '../../lib/lp-economize/goiasCidades';
import { normalizarTexto } from '../../lib/lp-economize/format';

interface CidadeComboboxProps {
  id?: string;
  value: string;
  onChange: (valor: string) => void;
  onBlur: () => void;
  error?: string;
  ariaDescribedby?: string;
}

const MAX_SUGESTOES = 8;

/**
 * Combobox de cidade com busca sem acento — "goiania" precisa achar "Goiânia".
 * Trocou o <input list> + <datalist> nativo porque a filtragem do datalist é sensível a
 * acento/caixa no Chrome/Edge (comportamento do navegador, sem gancho de JS pra corrigir).
 */
const CidadeCombobox = forwardRef<HTMLInputElement, CidadeComboboxProps>(function CidadeCombobox(
  { id, value, onChange, onBlur, error, ariaDescribedby },
  ref
) {
  const [aberto, setAberto] = useState(false);
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const blurTimeoutRef = useRef<number | undefined>(undefined);
  const listboxId = useId();

  const sugestoes = useMemo(() => {
    const consulta = normalizarTexto(value);
    if (!consulta) return [];
    return GOIAS_CIDADES.filter((cidade) => normalizarTexto(cidade).includes(consulta)).slice(0, MAX_SUGESTOES);
  }, [value]);

  const selecionar = (cidade: string) => {
    onChange(cidade);
    setAberto(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setAberto(true);
    setIndiceAtivo(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!aberto || sugestoes.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndiceAtivo((i) => (i + 1) % sugestoes.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndiceAtivo((i) => (i - 1 + sugestoes.length) % sugestoes.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selecionar(sugestoes[indiceAtivo]);
    } else if (e.key === 'Escape') {
      setAberto(false);
    }
  };

  const handleBlur = () => {
    // Atraso curto: se o blur foi causado por clique numa sugestão, dá tempo do onMouseDown
    // da opção rodar antes de fechar a lista (senão o clique nunca chega a selecionar nada).
    blurTimeoutRef.current = window.setTimeout(() => {
      setAberto(false);
      onBlur();
    }, 120);
  };

  const handleFocus = () => {
    if (value) setAberto(true);
  };

  return (
    <div className="relative">
      <input
        id={id}
        ref={ref}
        type="text"
        role="combobox"
        aria-expanded={aberto && sugestoes.length > 0}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={aberto && sugestoes.length > 0 ? `${listboxId}-opt-${indiceAtivo}` : undefined}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedby}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Digite e escolha sua cidade"
        autoComplete="off"
        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-text-dark font-medium ${
          error ? 'border-red-400 focus:border-red-500' : 'border-gray-light focus:border-primary'
        }`}
      />
      {aberto && sugestoes.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-56 overflow-auto rounded-xl border border-gray-light bg-white shadow-lg py-1"
        >
          {sugestoes.map((cidade, i) => (
            <li
              key={cidade}
              id={`${listboxId}-opt-${i}`}
              role="option"
              aria-selected={i === indiceAtivo}
              // onMouseDown (não onClick) dispara antes do blur do input, senão o blur fecha a lista primeiro.
              onMouseDown={(e) => {
                e.preventDefault();
                if (blurTimeoutRef.current) window.clearTimeout(blurTimeoutRef.current);
                selecionar(cidade);
              }}
              onMouseEnter={() => setIndiceAtivo(i)}
              className={`px-4 py-2.5 cursor-pointer text-sm font-medium ${
                i === indiceAtivo ? 'bg-primary/10 text-primary' : 'text-text-dark'
              }`}
            >
              {cidade}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default CidadeCombobox;
