import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Zap, ShieldCheck, CheckCircle2, FileText, Sprout, ArrowRight, Home, Smartphone, PiggyBank } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';

export default function PassageiroVigor() {
  const [searchParams] = useSearchParams();
  const driverId = searchParams.get('ref') || 'Não identificado';

  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    valorConta: '',
    cidade: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sobe o scroll para o topo ao carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    if (name === 'valorConta') {
      // Máscara simples para dinheiro
      let v = value.replace(/\D/g, '');
      if (v.length > 0) {
        v = (parseFloat(v) / 100).toFixed(2).replace('.', ',');
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        formattedValue = `R$ ${v}`;
      } else {
        formattedValue = '';
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Remover a formatação do valor para salvar no banco (opcional, mas recomendado)
      // Como o usuário pediu na coluna valor_conta_luz, manteremos o R$ se for VARCHAR, 
      // ou apenas os números. Vou manter como o usuário preencheu (string formatada com "R$").

      const payload = {
        nome_campanha: 'Motorista Parceiro',
        nome_participante: driverId,                // Aqui entra o código/id do motorista
        nome_indicado: formData.nome,
        whatsapp_indicado: formData.whatsapp,
        cidade_indicado: formData.cidade,
        valor_conta_luz: formData.valorConta        // Nova coluna conforme solicitação
      };

      const { error } = await supabase
        .from('indicacoes')
        .insert([payload]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Erro ao salvar no banco:', err);
      setErrorMsg(err.message || 'Ocorreu um erro ao enviar seu cadastro. Tente novamente.');
    } setSubmittingFalse: {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite font-sans text-text-dark selection:bg-accent selection:text-white flex flex-col">

      {/* Hero Section e Conteúdo Principal */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary via-primary-dark to-vigor-dark pt-12 pb-32 px-4 relative overflow-hidden text-center rounded-b-[3rem] shadow-xl">
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent font-bold text-xs sm:text-sm mb-6 backdrop-blur-md uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Oferta Exclusiva para Passageiros
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-sm">
              Ganhe até <span className="text-accent underline decoration-4 underline-offset-4">28% de desconto</span> na sua conta de luz
            </h1>

            <p className="text-white/80 text-lg md:text-xl font-medium max-w-lg mx-auto drop-shadow-sm">
              Aproveite essa oportunidade indicada pelo seu motorista. Sem obras, sem taxas e sem fidelidade.
            </p>
          </div>
        </section>

        {/* Formulário Card Flutuante */}
        <section id="simulacao" className="px-4 -mt-20 md:-mt-24 relative z-20 mb-20">
          <div className="max-w-xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-primary/10 border border-gray-light p-6 md:p-10">

            {isSubmitted ? (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-text-dark mb-4">Tudo Certo!</h2>
                <p className="text-lg text-text-muted mb-8 leading-relaxed">
                  Legal! Recebemos os seus dados. Um de nossos especialistas entrará em contato com você pelo WhatsApp em breve para explicar como o desconto será aplicado na sua conta da Equatorial.
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  <Home className="w-5 h-5" /> Voltar para a página inicial
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-dark mb-2">Preencha rapidamente para sabermos mais sobre o seu consumo em Goiás.</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-bold text-text-dark mb-1 ml-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark placeholder:text-gray-400 font-medium"
                      placeholder="João Alves Silva"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-bold text-text-dark mb-1 ml-1">
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
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark placeholder:text-gray-400 font-medium"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="cidade" className="block text-sm font-bold text-text-dark mb-1 ml-1">
                        Cidade (GO) *
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        required
                        value={formData.cidade}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark placeholder:text-gray-400 font-medium"
                        placeholder="Ex: Goiânia"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="valorConta" className="block text-sm font-bold text-text-dark mb-1 ml-1">
                      Valor médio da conta de luz *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="valorConta"
                        name="valorConta"
                        required
                        value={formData.valorConta}
                        onChange={handleMasks}
                        className="w-full pl-11 pr-5 py-4 rounded-xl border-2 border-gray-100 bg-offwhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark placeholder:text-gray-400 font-medium"
                        placeholder="R$ 0,00"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent-hover text-text-dark font-extrabold text-lg py-5 px-6 rounded-xl shadow-lg shadow-accent/20 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Processando...'
                      ) : (
                        <>Quero meu desconto agora <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4 px-4">
                      Seus dados estão seguros. Ao enviar, você aceita o contato de nossa equipe via WhatsApp.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>

        {/* Benefícios Dinâmicos (Inspirado na Home) */}
        <section className="bg-white py-20 px-4 mt-10 rounded-t-[3rem] border-t border-gray-200 shadow-sm relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 uppercase tracking-widest">
                Vantagens
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-text-dark mb-4">
                Nossas principais vantagens
              </h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                Descubra por que milhares de clientes da Equatorial Goiás já escolheram a Vigor Energy para economizar na conta de luz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                {
                  icon: PiggyBank,
                  title: 'Economia na sua Conta',
                  description: 'Reduza sua conta de energia em até 28% no mês, sem fidelidade ou taxas extras.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Sem Investimento',
                  description: 'Não é necessário investir do seu bolso, nem comprar painéis para ter placas em casa.',
                },
                {
                  icon: Sprout,
                  title: 'Energia 100% Limpa',
                  description: 'Nossa fazenda gera a energia lá, e os créditos entram automaticamente aqui.',
                },
                {
                  icon: Smartphone,
                  title: 'Processo 100% Digital',
                  description: 'Você pode fazer tudo pelo WhatsApp e não tem visita técnica nem alteração no imóvel.',
                },
              ].map(({ icon: Icon, title, description }, idx) => (
                <div key={idx} className="group bg-offwhite rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm border border-gray-50 group-hover:bg-primary transition-colors duration-300 relative z-10">
                    <Icon className="text-primary group-hover:text-white transition-colors duration-300" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-3 relative z-10">{title}</h3>
                  <p className="text-text-muted leading-relaxed relative z-10">{description}</p>
                </div>
              ))}
            </div>

            {/* Como funciona - Steps */}
            <div className="bg-vigor-dark rounded-[3rem] p-10 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-12">Como a energia chega na sua casa?</h2>
                <div className="grid md:grid-cols-3 gap-10">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-inner">
                      <span className="text-2xl font-black text-primary">1</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Simulação Grátis</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Você preenche o formulário acima e nossa equipe calcula o desconto que será enviado no WhatsApp.</p>
                  </div>
                  <div className="text-center relative">
                    <div className="hidden md:block absolute top-8 -left-8 w-16 h-[2px] bg-white/10"></div>
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent/30 shadow-inner">
                      <span className="text-2xl font-black text-accent">2</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Assinatura Digital</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Processo aprovado! Basta nos enviar a foto da sua conta de luz e assinar o contrato digital online sem burocracia.</p>
                  </div>
                  <div className="text-center relative">
                    <div className="hidden md:block absolute top-8 -left-8 w-16 h-[2px] bg-white/10"></div>
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-inner">
                      <span className="text-2xl font-black text-green-400">3</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Sua Luz com Desconto</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">A distribuidora recebe os créditos garantidos. O benefício é injetado direto no seu desconto total que cai por mês.</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 relative z-10">
                <a
                  href="#simulacao"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-dark font-black px-10 py-5 rounded-2xl shadow-xl shadow-accent/20 transition-all hover:-translate-y-1 active:scale-95 text-lg sm:text-xl"
                >
                  Eu quero o benefício <ArrowRight className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Tira Dúvidas Rápido */}
        <section className="bg-offwhite py-20 px-4 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-text-dark mb-4">Dúvidas Comuns</h2>
              <p className="text-text-muted">Ainda com receio? A transparência é nossa maior marca.</p>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: 'Eu vou parar de receber a conta da Equatorial?',
                  a: 'Você vai passar a receber as contas de uma forma melhor: A da Equatorial virá apenas com as taxas mínimas governamentais e obrigatórias, enquanto a fatura da Vigor Energy virá cobrando a energia que você realmente consumiu, com o desconto já aplicado, que no fechamento total gera a economia mensal.'
                },
                {
                  q: 'Tem alguma taxa surpresa para entrar?',
                  a: 'A adesão é totalmente gratuita! Nossa ideia é fazer você economizar dinheiro, não gastar comprando placas e sistemas.'
                },
                {
                  q: 'E se acabar a luz na minha rua, para quem eu ligo?',
                  a: 'A Equatorial Goiás continua sendo a distribuidora física responsável pela conservação de cabos e reparos na sua rua. No caso de quedas ou problemas na fiação, a manutenção continua sendo feita pela Equatorial.'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                  <h4 className="text-lg font-bold text-text-dark mb-3 flex items-start gap-3">
                    <span className="text-primary mt-1"><CheckCircle2 className="w-5 h-5" /></span>
                    {faq.q}
                  </h4>
                  <p className="text-text-muted ml-8 leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a
                href="#simulacao"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 text-lg"
              >
                Garantir meu desconto <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-gray-400 text-sm mt-4">Simulação gratuita e 100% digital.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
