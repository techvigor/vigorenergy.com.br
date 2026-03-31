import { useState } from 'react';
import {
  Zap,
  ShieldCheck,
  LayoutDashboard,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  DollarSign,
  GraduationCap,
  CarFront,
  MapPin,
  FileSignature,
  Smartphone,
  QrCode
} from 'lucide-react';
import Footer from '../components/Footer';
import driverHeroBg from '../assets/driver-hero-bg.png';
import DriverPartnerRegistrationModal from '../components/DriverPartnerRegistrationModal';

// --- COMPONENTS ---

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-light/60 rounded-lg mb-4 bg-white overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-text-dark hover:text-primary transition-colors"
      >
        <span className="text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`px-5 text-text-muted transition-all duration-300 ease-in-out ${isOpen ? 'pb-5 max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default function ParceirosMotoristas() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <div className="font-sans text-text-dark selection:bg-accent selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${driverHeroBg})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-primary"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent font-bold text-sm mb-6 border border-white/20 backdrop-blur-md">
            <CarFront className="w-4 h-4 fill-current" /> Programa Vigor Energy para Motoristas
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
              Seu passageiro economiza energia.<br />
              <span className="text-accent underline decoration-primary decoration-4 underline-offset-8">E você ganha por cada indicação.</span>
            </h1>
            <p className="text-lg lg:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed drop-shadow-md">
              Aumente sua renda enquanto dirige! Ofereça aos seus passageiros até <strong className="text-accent font-bold">28% de desconto</strong> na conta de luz da Equatorial. Sem vender nada, apenas com um QR Code no seu carro.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-text-dark px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Quero ser parceiro <ArrowRight className="w-6 h-6" />
            </button>
            <a href="#como-funciona" className="w-full sm:w-auto bg-white/10 border-2 border-white/30 hover:border-accent text-white px-10 py-5 rounded-full font-bold text-xl transition-all text-center backdrop-blur-md">
              Como funciona
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-6 text-sm font-semibold text-white/80 bg-black/30 backdrop-blur-xl py-5 px-6 md:px-10 rounded-3xl md:inline-flex border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 px-2"><CheckCircle2 className="w-5 h-5 text-accent" /> Adesão 100% Gratuita</div>
            <div className="flex items-center gap-2 px-2 border-t md:border-t-0 border-white/10 pt-4 md:pt-0"><ShieldCheck className="w-5 h-5 text-accent" /> Necessário CNPJ (pode ser MEI)</div>
            <div className="flex items-center gap-2 px-2 border-t md:border-t-0 border-white/10 pt-4 md:pt-0"><GraduationCap className="w-5 h-5 text-accent" /> Treinamento & Material Inclusos</div>
          </div>

        </div>
      </section>

      {/* --- PRODUCT SECTION (O QUE É) --- */}
      <section id="como-funciona" className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-accent font-bold tracking-wide uppercase text-sm mb-2">Entenda o Benefício</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-text-dark mb-4 tracking-tight">O que é a Vigor Energy e como funciona?</h3>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Nossa empresa possui fazendas solares em Goiás. Injetamos energia barata e limpa direto na rede para o seu passageiro pagar menos luz no fim do mês!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white border border-primary/30 rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 overflow-hidden text-center transition-all bg-gradient-to-b from-white to-primary/5">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-primary" fill="currentColor" />
              </div>
              <h4 className="text-3xl font-bold text-text-dark mb-4 tracking-tight">Vantagens Imbatíveis para o Passageiro</h4>
              <p className="text-text-muted mb-8 text-lg">
                O passageiro recebe até <strong className="text-text-dark font-semibold">28% de desconto</strong> na conta de luz da Equatorial Goiás.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <div className="text-primary font-bold text-sm mb-2 uppercase tracking-wider">Zero Custo</div>
                  <div className="text-text-dark font-medium">Não é necessário comprar placas nem pagar taxa de adesão.</div>
                </div>
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <div className="text-primary font-bold text-sm mb-2 uppercase tracking-wider">Zero Obra</div>
                  <div className="text-text-dark font-medium">Sem a necessidade de reforma em casa. Tudo 100% digital.</div>
                </div>
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <div className="text-primary font-bold text-sm mb-2 uppercase tracking-wider">Entrega Garantida</div>
                  <div className="text-text-dark font-medium">A energia chega pela própria rede da Equatorial.</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA para a oportunidade */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              Quero aproveitar essa oportunidade <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* --- STEPS SECTION (COMO SE TORNAR PARCEIRO) --- */}
      <section className="py-20 bg-white border-y border-gray-light/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-text-dark mb-4 tracking-tight">Como você pode se tornar um Parceiro</h3>
            <p className="text-lg text-text-muted">A adesão é simples, mas possui requisitos indispensáveis.</p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row bg-offwhite rounded-[2rem] p-8 md:p-10 items-center gap-8 border border-gray-light/60 shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-full md:w-1/3 flex justify-center">
                <FileSignature className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-primary" />
              </div>
              <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl font-bold text-xl shadow-md mb-2">1</div>
                <h4 className="text-2xl font-bold text-text-dark tracking-tight">Cadastro e CNPJ</h4>
                <p className="text-lg text-text-muted leading-relaxed">
                  <strong>Exigência Obrigatória:</strong> É obrigatório possuir um CNPJ ativo (pode ser MEI). Não aceitamos cadastros como Pessoa Física (CPF). Você se cadastra em nosso portal e assina digitalmente o "Contrato de Parceria".
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse bg-offwhite rounded-[2rem] p-8 md:p-10 items-center gap-8 border border-gray-light/60 shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-full md:w-1/3 flex justify-center">
                <GraduationCap className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-accent" />
              </div>
              <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-text-dark rounded-xl font-bold text-xl shadow-md mb-2">2</div>
                <h4 className="text-2xl font-bold text-text-dark tracking-tight">Treinamento e Material</h4>
                <p className="text-lg text-text-muted leading-relaxed">
                  O motorista deverá comparecer na na Vigor Energy na data combinada para a realização do treinamento básico, onde retirará o seu QR Code oficial e demais materiais necessários.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row bg-offwhite rounded-[2rem] p-8 md:p-10 items-center gap-8 border border-gray-light/60 shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-full md:w-1/3 flex justify-center">
                <LayoutDashboard className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-primary" />
              </div>
              <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl font-bold text-xl shadow-md mb-2">3</div>
                <h4 className="text-2xl font-bold text-text-dark tracking-tight">Acesso ao Painel</h4>
                <p className="text-lg text-text-muted leading-relaxed">
                  Após aprovação, você recebe acesso ao nosso Dashboard. Lá você poderá acompanhar todos os clientes que escanearam seu código e efetivamente fecharam negócio!
                </p>
              </div>
            </div>
          </div>

          {/* CTA para os Passos */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="bg-accent hover:bg-accent-hover text-text-dark px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              Começar meu cadastro <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* --- NA PRÁTICA & COMISSIONAMENTO --- */}
      <section className="py-24 bg-vigor-dark text-white relative overflow-hidden border-b-4 border-accent">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-accent/20 text-accent font-bold text-sm rounded-full border border-accent/20 mb-4">
              Na Prática
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">Como você fatura durante as viagens?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Ganhar dinheiro sem sair da rota. É simples, tecnológico e prático.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3 tracking-tight text-white">O QR Code</h4>
              <p className="text-gray-300">
                Você coloca o QR code recebido no encosto do banco. O passageiro verá o material durante a corrida.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3 tracking-tight text-white">A Abordagem</h4>
              <p className="text-gray-300">
                Você não precisa ser especialista. O passageiro escaneia com o celular, tira dúvidas rápidas e faz o cadastro ali mesmo.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center relative overflow-hidden">
              <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-3 tracking-tight text-accent">Sua Comissão</h4>
              <p className="text-gray-300">
                Ganhe <strong>10% sobre o valor médio</strong> da fatura do consumidor ou <strong>R$50,00 fixo</strong> por fechamento. Você emite a NF e recebe direto na conta do seu CNPJ.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              Iniciar cadastro gratuito
            </button>
          </div>
        </div>
      </section>

      {/* --- TRIAGEM RÁPIDA --- */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-primary/20 shadow-xl shadow-primary/5">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-text-dark mb-4 tracking-tight">Triagem Rápida</h3>
              <p className="text-xl text-text-muted">Como saber se o seu passageiro tem o perfil de cliente e garantir sua comissão?</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MapPin, title: 'Localização', desc: 'A conta de luz deve ser do próprio Estado de Goiás (atendida pela Equatorial Goiás).' },
                { icon: DollarSign, title: 'Valor da Conta', desc: 'A conta de luz deve ser de, no mínimo, R$300,00 mensais (ou consumo acima de 300 kWh).' },
                { icon: CheckCircle2, title: 'Histórico Limpo', desc: 'O passageiro não pode ter contas atrasadas há mais de 30 dias, parcelamentos ou "gatos" na rede.' },
                { icon: ShieldCheck, title: 'Sem Benefício Prévio', desc: 'Não pode ter placas solares instaladas nem benefício da "Tarifa Social" do Governo.' }
              ].map((rule, idx) => (
                <div key={idx} className="bg-offwhite p-6 rounded-2xl border border-gray-light/60">
                  <rule.icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-lg font-bold text-text-dark mb-2">{rule.title}</h4>
                  <p className="text-sm text-text-muted">{rule.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA para Triagem */}
            <div className="mt-12 text-center">
              <button
                onClick={() => setIsPartnerModalOpen(true)}
                className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
              >
                Garantir minha vaga <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 bg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-dark mb-4 tracking-tight">Dúvidas Frequentes dos Passageiros</h2>
            <p className="text-lg text-text-muted">Como você, o motorista, deve responder perguntas rápidas.</p>
          </div>

          <div className="mb-10">
            <FAQItem
              question="Eu vou parar de receber a conta da Equatorial?"
              answer={<><strong>Não.</strong> Você vai passar a receber duas contas que, somadas, dão um valor menor do que você paga hoje. A da Equatorial virá apenas com as taxas mínimas obrigatórias (como iluminação pública e manutenção de postes), e o boleto da Vigor virá cobrando a energia que você consumiu, já com o desconto aplicado.</>}
            />
            <FAQItem
              question="Tem alguma taxa para entrar?"
              answer="A entrada é custo zero. O processo é 100% digital e você paga apenas pela energia que consumir."
            />
            <FAQItem
              question="E se acabar a luz na minha rua, quem eu chamo?"
              answer="A Equatorial Goiás continua sendo a responsável por toda a fiação e fornecimento físico. Em caso de queda de energia, o atendimento continua sendo feito pela concessionária normalmente."
            />
          </div>

          {/* CTA Box */}
          <div className="text-center p-10 bg-primary rounded-3xl border border-primary-light shadow-xl shadow-primary/10 text-white mt-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-dark/30 pointer-events-none"></div>
            <div className="relative z-10">
              <CarFront className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Incentive sem esforço. Ganhe.</h2>
              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Cadastre o seu CNPJ na Vigor Energy agora e comece a rentabilizar o espaço do seu carro durante todas as corridas do mês!
              </p>
              <button
                onClick={() => setIsPartnerModalOpen(true)}
                className="bg-accent hover:bg-accent-hover text-text-dark px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-lg shadow-accent/20"
              >
                Cadastrar meu CNPJ
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <DriverPartnerRegistrationModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </div>
  );
}
