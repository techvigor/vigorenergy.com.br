import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PartnerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerRegistrationModal({ isOpen, onClose }: PartnerRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    cnpj: '',
    model: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleMasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'whatsapp') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length <= 11) {
        formattedValue = formattedValue.replace(/^(\d{2})(\d)/g, '($1) $2');
        formattedValue = formattedValue.replace(/(\d)(\d{4})$/, '$1-$2');
      } else {
        formattedValue = formattedValue.slice(0, 15);
      }
    }

    if (name === 'cnpj') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length <= 14) {
        formattedValue = formattedValue.replace(/^(\d{2})(\d)/, '$1.$2');
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        formattedValue = formattedValue.replace(/\.(\d{3})(\d)/, '.$1/$2');
        formattedValue = formattedValue.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        formattedValue = formattedValue.slice(0, 18);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      const { error } = await supabase
        .from('parceiros')
        .insert([
          {
            nome: formData.name,
            whatsapp: formData.whatsapp,
            cnpj: formData.cnpj,
            modelo_atuacao: formData.model
          }
        ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Erro ao salvar no banco:', err);
      setErrorMsg(err.message || 'Ocorreu um erro ao enviar seu cadastro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setFormData({ name: '', whatsapp: '', cnpj: '', model: '' });
    setIsSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-white border-4 border-primary rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300 relative"
      >
        <button
          onClick={resetAndClose}
          className={`absolute top-4 right-4 z-10 transition-colors p-2 rounded-full ${isSubmitted ? 'text-gray-400 hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
          type="button"
        >
          <X className="w-6 h-6" />
        </button>

        {isSubmitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-text-dark mb-4 tracking-tight">Cadastro Recebido!</h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Recebemos suas informações com sucesso. Nossa equipe de especialistas entrará em contato pelo WhatsApp em breve.
            </p>
            <button
              onClick={resetAndClose}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 w-full"
            >
              Concluir
            </button>
          </div>
        ) : (
          <>
            <div className="bg-primary p-6 text-white relative flex-shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Seja um Parceiro</h2>
              </div>
              <p className="text-white/80 mt-1">
                Preencha seus dados para receber o contato do nosso time de especialistas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 overflow-y-auto">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text-dark mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-light/80 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold text-text-dark mb-1">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleMasks}
                  maxLength={15}
                  className="w-full px-4 py-3 rounded-xl border border-gray-light/80 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label htmlFor="cnpj" className="block text-sm font-semibold text-text-dark mb-1 xl:flex xl:items-baseline xl:justify-between">
                  <span>CNPJ *</span>
                  <span className="text-xs font-normal text-primary mt-1 xl:mt-0 block">Obrigatório possuir CNPJ ativo</span>
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  required
                  value={formData.cnpj}
                  onChange={handleMasks}
                  maxLength={18}
                  className="w-full px-4 py-3 rounded-xl border border-gray-light/80 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-semibold text-text-dark mb-1">
                  Modelo de atuação *
                </label>
                <select
                  id="model"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-light/80 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                >
                  <option value="" disabled>Selecione uma opção...</option>
                  <option value="equipe">Quero formar uma equipe de vendedores</option>
                  <option value="sozinho">Quero atuar sozinho</option>
                </select>
              </div>

              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                  {errorMsg}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? 'Enviando...' : 'Quero me tornar parceiro'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
