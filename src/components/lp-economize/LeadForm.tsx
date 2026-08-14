import { useRef, useState, type FormEvent } from 'react';
import { Loader2, MessageCircle } from 'lucide-react';
import Honeypot from './Honeypot';
import FaturaUpload from './FaturaUpload';
import CidadeCombobox from './CidadeCombobox';
import { formatarWhatsApp, digitosWhatsApp, FAIXAS_CONTA } from '../../lib/lp-economize/format';
import {
  validarNome,
  validarWhatsApp,
  validarCidade,
  validarTipoImovel,
  validarFaixaConta,
  validarStatusFaturas,
  validarConsentimento,
  calcularQualificado,
  STATUS_FATURAS_OPCOES,
  type StatusFaturas,
} from '../../lib/lp-economize/validation';
import { WHATSAPP_MENSAGENS, WHATSAPP_NUMERO } from '../../lib/lp-economize/config';
import { gerarEventId, trackLead, trackLeadDesqualificado } from '../../lib/lp-economize/tracking';
import { obterOrigemLead } from '../../lib/lp-economize/utms';
import { enviarLead, enviarFatura, confirmarFatura } from '../../lib/lp-economize/api';
import type { LeadPayload } from '../../lib/lp-economize/types';

interface LeadFormProps {
  faixaContaInicial: string;
  valorContaInformado: number;
  onSucesso: (info: { leadId: string; qualificado: boolean }) => void;
}

type Campo = 'nome' | 'whatsapp' | 'cidade' | 'tipoImovel' | 'faixaConta' | 'statusFaturas' | 'consentimento';

const validadores: Record<Campo, (v: string) => string | null> = {
  nome: validarNome,
  whatsapp: validarWhatsApp,
  cidade: validarCidade,
  tipoImovel: validarTipoImovel,
  faixaConta: validarFaixaConta,
  statusFaturas: validarStatusFaturas,
  consentimento: (v) => validarConsentimento(v === 'true'),
};

export default function LeadForm({ faixaContaInicial, valorContaInformado, onSucesso }: LeadFormProps) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cidade, setCidade] = useState('');
  const [tipoImovel, setTipoImovel] = useState<'residencia' | 'empresa' | ''>('');
  const [faixaConta, setFaixaConta] = useState(faixaContaInicial);
  const [statusFaturas, setStatusFaturas] = useState<StatusFaturas | ''>('');
  const [consentimento, setConsentimento] = useState(false);
  const [fatura, setFatura] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Partial<Record<Campo, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nomeRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const cidadeRef = useRef<HTMLInputElement>(null);
  const tipoImovelRef = useRef<HTMLDivElement>(null);
  const faixaContaRef = useRef<HTMLSelectElement>(null);
  const statusFaturasRef = useRef<HTMLDivElement>(null);
  const consentimentoRef = useRef<HTMLInputElement>(null);

  const refs: Record<Campo, React.RefObject<HTMLElement | null>> = {
    nome: nomeRef,
    whatsapp: whatsappRef,
    cidade: cidadeRef,
    tipoImovel: tipoImovelRef,
    faixaConta: faixaContaRef,
    statusFaturas: statusFaturasRef,
    consentimento: consentimentoRef,
  };

  const valores: Record<Campo, string> = {
    nome,
    whatsapp,
    cidade,
    tipoImovel,
    faixaConta,
    statusFaturas,
    consentimento: String(consentimento),
  };

  const validarCampo = (campo: Campo) => {
    const erro = validadores[campo](valores[campo]);
    setErrors((prev) => ({ ...prev, [campo]: erro ?? undefined }));
    return erro;
  };

  const validarTudo = (): Partial<Record<Campo, string>> => {
    const todosErros: Partial<Record<Campo, string>> = {};
    (Object.keys(validadores) as Campo[]).forEach((campo) => {
      const erro = validadores[campo](valores[campo]);
      if (erro) todosErros[campo] = erro;
    });
    return todosErros;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const todosErros = validarTudo();
    if (Object.keys(todosErros).length > 0) {
      setErrors(todosErros);
      const ordem: Campo[] = ['nome', 'whatsapp', 'cidade', 'tipoImovel', 'faixaConta', 'statusFaturas', 'consentimento'];
      const primeiroCampo = ordem.find((c) => todosErros[c]);
      if (primeiroCampo) refs[primeiroCampo].current?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const eventId = gerarEventId();
    const origem = obterOrigemLead();
    const payload: LeadPayload = {
      nome: nome.trim(),
      whatsapp: digitosWhatsApp(whatsapp),
      cidade,
      tipoImovel: tipoImovel as 'residencia' | 'empresa',
      faixaConta,
      valorContaInformado,
      statusFaturas: statusFaturas as StatusFaturas,
      consentimentoLgpd: consentimento,
      temFatura: !!fatura,
      faturaExtensao: fatura ? (fatura.name.split('.').pop() || null) : null,
      eventId,
      utmSource: origem.utm_source,
      utmMedium: origem.utm_medium,
      utmCampaign: origem.utm_campaign,
      utmContent: origem.utm_content,
      utmTerm: origem.utm_term,
      fbclid: origem.fbclid,
      gclid: origem.gclid,
      referrer: origem.referrer,
      website: honeypot,
    };

    try {
      const resposta = await enviarLead(payload);
      if (!resposta.ok || !resposta.lead_id) {
        throw new Error(resposta.error || 'Não foi possível concluir o cadastro.');
      }

      const qualificado = calcularQualificado(valorContaInformado, statusFaturas);
      const paramsTracking = {
        faixa_conta: faixaConta,
        cidade,
        tipo_imovel: tipoImovel,
        status_faturas: statusFaturas,
        origem_destino: 'lp' as const,
      };
      if (qualificado) {
        trackLead(eventId, paramsTracking);
      } else {
        trackLeadDesqualificado(paramsTracking, eventId);
      }

      if (resposta.upload && fatura) {
        try {
          await enviarFatura(resposta.upload.signedUrl, fatura);
          await confirmarFatura(resposta.lead_id, resposta.upload.path);
        } catch {
          // Upload falhou: o lead já está salvo e válido de qualquer forma. A Júlia pede a fatura pelo WhatsApp.
        }
      }

      onSucesso({ leadId: resposta.lead_id, qualificado });
    } catch {
      setSubmitError(
        'Não conseguimos enviar seu cadastro agora. Seus dados continuam preenchidos — tente de novo ou fale com a Júlia no WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const linkWhatsAppFallback = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGENS.fechamento)}`;

  return (
    <form id="lp-lead-form" onSubmit={handleSubmit} noValidate className="space-y-4">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {/* Nome completo */}
      <div>
        <label htmlFor="lp-nome" className="block text-sm font-semibold text-text-dark mb-1.5">
          Nome completo
        </label>
        <input
          id="lp-nome"
          ref={nomeRef}
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onBlur={() => validarCampo('nome')}
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'lp-nome-erro' : undefined}
          placeholder="Seu nome e sobrenome"
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-text-dark font-medium ${
            errors.nome ? 'border-red-400 focus:border-red-500' : 'border-gray-light focus:border-primary'
          }`}
        />
        {errors.nome && (
          <p id="lp-nome-erro" className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.nome}
          </p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="lp-whatsapp" className="block text-sm font-semibold text-text-dark mb-1.5">
          WhatsApp
        </label>
        <input
          id="lp-whatsapp"
          ref={whatsappRef}
          type="tel"
          inputMode="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(formatarWhatsApp(e.target.value))}
          onBlur={() => validarCampo('whatsapp')}
          aria-invalid={!!errors.whatsapp}
          aria-describedby={errors.whatsapp ? 'lp-whatsapp-erro' : undefined}
          placeholder="(62) 99999-9999"
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-text-dark font-medium ${
            errors.whatsapp ? 'border-red-400 focus:border-red-500' : 'border-gray-light focus:border-primary'
          }`}
        />
        {errors.whatsapp && (
          <p id="lp-whatsapp-erro" className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.whatsapp}
          </p>
        )}
      </div>

      {/* Cidade */}
      <div>
        <label htmlFor="lp-cidade" className="block text-sm font-semibold text-text-dark mb-1.5">
          Cidade
        </label>
        <CidadeCombobox
          id="lp-cidade"
          ref={cidadeRef}
          value={cidade}
          onChange={(v) => {
            setCidade(v);
            if (errors.cidade) setErrors((prev) => ({ ...prev, cidade: undefined }));
          }}
          onBlur={() => validarCampo('cidade')}
          error={errors.cidade}
          ariaDescribedby={errors.cidade ? 'lp-cidade-erro' : undefined}
        />
        {errors.cidade && (
          <p id="lp-cidade-erro" className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.cidade}
          </p>
        )}
      </div>

      {/* Tipo de imóvel */}
      <fieldset>
        <legend className="block text-sm font-semibold text-text-dark mb-1.5">Tipo de imóvel</legend>
        <div ref={tipoImovelRef} tabIndex={-1} className="flex gap-3">
          {(['residencia', 'empresa'] as const).map((opcao) => (
            <label
              key={opcao}
              className={`flex-1 text-center py-3 rounded-xl border-2 cursor-pointer font-semibold text-sm transition-colors ${
                tipoImovel === opcao ? 'border-primary bg-primary/5 text-primary' : 'border-gray-light text-text-muted'
              }`}
            >
              <input
                type="radio"
                name="tipoImovel"
                value={opcao}
                checked={tipoImovel === opcao}
                onChange={() => {
                  setTipoImovel(opcao);
                  setErrors((prev) => ({ ...prev, tipoImovel: undefined }));
                }}
                className="sr-only"
              />
              {opcao === 'residencia' ? 'Residência' : 'Empresa'}
            </label>
          ))}
        </div>
        {errors.tipoImovel && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.tipoImovel}</p>}
      </fieldset>

      {/* Faixa da conta */}
      <div>
        <label htmlFor="lp-faixa" className="block text-sm font-semibold text-text-dark mb-1.5">
          Valor médio da conta
        </label>
        <select
          id="lp-faixa"
          ref={faixaContaRef}
          value={faixaConta}
          onChange={(e) => {
            setFaixaConta(e.target.value);
            setErrors((prev) => ({ ...prev, faixaConta: undefined }));
          }}
          onBlur={() => validarCampo('faixaConta')}
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-text-dark font-medium bg-white ${
            errors.faixaConta ? 'border-red-400 focus:border-red-500' : 'border-gray-light focus:border-primary'
          }`}
        >
          {FAIXAS_CONTA.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>
        {errors.faixaConta && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.faixaConta}</p>}
      </div>

      {/* Status faturas */}
      <fieldset>
        <legend className="block text-sm font-semibold text-text-dark mb-1.5">Suas faturas estão em dia?</legend>
        <div ref={statusFaturasRef} tabIndex={-1} className="space-y-2">
          {STATUS_FATURAS_OPCOES.map((opcao) => (
            <label
              key={opcao.id}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl border-2 cursor-pointer transition-colors ${
                statusFaturas === opcao.id ? 'border-primary bg-primary/5' : 'border-gray-light'
              }`}
            >
              <input
                type="radio"
                name="statusFaturas"
                value={opcao.id}
                checked={statusFaturas === opcao.id}
                onChange={() => {
                  setStatusFaturas(opcao.id);
                  setErrors((prev) => ({ ...prev, statusFaturas: undefined }));
                }}
                className="w-4 h-4 flex-shrink-0 accent-[#5F6C37]"
                style={{ marginRight: '0.75rem' }}
              />
              <span className="text-sm font-medium text-text-dark">{opcao.label}</span>
            </label>
          ))}
        </div>
        {errors.statusFaturas && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.statusFaturas}</p>}
      </fieldset>

      {/* Fatura opcional */}
      <FaturaUpload value={fatura} onChange={setFatura} />

      {/* Consentimento LGPD */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            ref={consentimentoRef}
            type="checkbox"
            checked={consentimento}
            onChange={(e) => {
              setConsentimento(e.target.checked);
              setErrors((prev) => ({ ...prev, consentimento: undefined }));
            }}
            onBlur={() => validarCampo('consentimento')}
            className="mt-1 accent-[#5F6C37]"
          />
          <span className="text-xs text-text-muted leading-relaxed">
            Autorizo a Vigor Energy a usar meus dados para me contatar sobre a simulação de economia, conforme a{' '}
            <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline text-primary">
              Política de Privacidade
            </a>
            .
          </span>
        </label>
        {errors.consentimento && <p className="text-red-600 text-xs mt-1.5 font-medium ml-7">{errors.consentimento}</p>}
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 space-y-2">
          <p>{submitError}</p>
          <a
            href={linkWhatsAppFallback}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-primary underline"
          >
            <MessageCircle size={16} /> Falar com a Júlia no WhatsApp
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary text-white font-bold text-base py-4 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Enviando...
          </>
        ) : (
          'Quero minha simulação'
        )}
      </button>
    </form>
  );
}
