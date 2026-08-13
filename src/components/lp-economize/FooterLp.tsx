import {
  EMPRESA_RAZAO_SOCIAL,
  EMPRESA_CNPJ,
  EMPRESA_CONTATO_EMAIL,
  EMPRESA_CONTATO_TELEFONE,
} from '../../lib/lp-economize/config';

/**
 * Rodapé mínimo da LP — sem menu de navegação e sem link de saída, exceto a Política de
 * Privacidade (nova aba). Tráfego pago não deve ter porta de saída pra outro lugar do site.
 */
export default function FooterLp() {
  return (
    <footer className="bg-vigor-dark text-white/70 py-8">
      <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center text-xs leading-relaxed space-y-2">
        <p>
          {EMPRESA_RAZAO_SOCIAL} · CNPJ {EMPRESA_CNPJ}
        </p>
        <p>
          {EMPRESA_CONTATO_TELEFONE} · {EMPRESA_CONTATO_EMAIL}
        </p>
        <p>
          <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
            Política de Privacidade
          </a>
        </p>
      </div>
    </footer>
  );
}
