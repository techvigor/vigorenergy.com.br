import { useState } from 'react';
import {
  Zap,
  Users,
  ShieldCheck,
  LayoutDashboard,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  DollarSign,
  GraduationCap
} from 'lucide-react';
import Footer from '../components/Footer';
import DotPattern from '../components/DotPattern';
import Step1Svg from '../components/animations/Step1Svg';
import Step2Svg from '../components/animations/Step2Svg';
import Step3Svg from '../components/animations/Step3Svg';
import Step4Svg from '../components/animations/Step4Svg';
import Step5Svg from '../components/animations/Step5Svg';
import PartnerRegistrationModal from '../components/PartnerRegistrationModal';

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

export default function Parceiros() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-offwhite font-sans text-text-dark selection:bg-accent selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        {/* Background Elements */}
        <DotPattern
          dotSize={2}
          gap={25}
          baseColor="#727F48"
          glowColor="#F6A937"
          className=" opacity-70 z-0 pointer-events-none [mask-image:radial-gradient(600px_circle_at_center,transparent,white)] md:[mask-image:radial-gradient(800px_circle_at_center,transparent,white)]"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 text-primary font-bold text-sm mb-6 border border-primary/20">
            <Zap className="w-4 h-4 fill-current" /> Programa de Parceiros Vigor Energy
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-text-dark leading-tight mb-6 tracking-tight bg-white/50 rounded-5xl px-6 py-4">
              Seu cliente economiza energia.<br />
              <span className="text-primary">Você ganha até 80% de comissão.</span>
            </h1>
            <p className="text-lg lg:text-xl text-text-muted mb-10 max-w-3xl leading-relaxed bg-white/50 rounded-5xl p-6">
              O programa definitivo de energia por assinatura. Produto sustentável que reduz custos para clientes. <strong className="text-text-dark font-semibold">Ganhe até 80% do valor da primeira fatura!</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsPartnerModalOpen(true)}
              className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-text-dark px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Começar agora <ArrowRight className="w-5 h-5" />
            </button>
            <a href="#como-funciona" className="w-full sm:w-auto bg-white border-2 border-gray-light/60 hover:border-primary text-text-dark px-8 py-4 rounded-full font-bold text-lg transition-all text-center">
              Como funciona
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm font-medium text-text-muted bg-white/70 backdrop-blur-md py-4 px-8 rounded-2xl inline-flex shadow-sm border border-white/50">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Sustentável</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> 100% Regulada</div>
            <div className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" /> Treinamento Completo</div>
          </div>

        </div>
      </section>

      {/* --- PRODUCT SECTION --- */}
      <section id="como-funciona" className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-accent font-bold tracking-wide uppercase text-sm mb-2">O que você vai vender</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-text-dark mb-4 tracking-tight">Um produto de altíssima conversão</h3>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Energia limpa que reduz a conta de luz. O cliente economiza, o planeta agradece e você ganha comissões pelo seu trabalho.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* GD Card - Expanded */}
            <div className="relative bg-white border border-primary/30 rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 overflow-hidden text-center transition-all bg-gradient-to-b from-white to-primary/5">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">
                Geração Distribuída
              </div>
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-primary" fill="currentColor" />
              </div>
              <h4 className="text-3xl font-bold text-text-dark mb-4 tracking-tight">Assinatura de Energia Vigor</h4>
              <p className="text-text-muted mb-8 text-lg">
                Energia solar compartilhada. <strong className="text-text-dark font-semibold">O cliente economiza até 28% na conta de luz</strong> sem instalar nada. Sem obras, sem investimento, e de forma rápida e prática.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-4">
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 flex-1">
                  <div className="text-primary font-bold text-sm mb-1 uppercase tracking-wider">Venda Direta</div>
                  <div className="text-3xl font-bold text-text-dark tracking-tight">Até 80%</div>
                  <div className="text-sm text-text-muted mt-1">da 1ª fatura do cliente</div>
                </div>
                <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20 flex-1">
                  <div className="text-[#d89020] font-bold text-sm mb-1 uppercase tracking-wider">Sua Equipe</div>
                  <div className="text-3xl font-bold text-text-dark tracking-tight">Você define</div>
                  <div className="text-sm text-text-muted mt-1">o quanto cada um deve receber</div>
                </div>
              </div>
            </div>
          </div>

          {/* Automations callout */}
          <div className="mt-16 bg-primary rounded-3xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-primary/20">
            <div className="text-left">
              <h4 className="text-2xl font-bold mb-3 text-accent tracking-tight">Tudo automatizado via IA</h4>
              <p className="text-white/80 text-lg">CRM exclusivo, leitura automática da conta via Inteligência Artificial, proposta em 1 clique e link de aprovação digital. A tecnologia da Vigor cuida de toda a burocracia.</p>
            </div>
            <div className="shrink-0 bg-white/10 p-5 rounded-2xl border border-white/20">
              <LayoutDashboard className="w-12 h-12 text-accent" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsPartnerModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              Quero formar minha equipe
            </button>
          </div>
        </div>
      </section>

      {/* --- STEPS SECTION --- */}
      <section className="py-20 bg-white border-y border-gray-light/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-text-dark mb-4 tracking-tight">Como funciona na prática</h3>
            <p className="text-lg text-text-muted">5 passos simples. Sem complexidade para você e para o cliente.</p>
          </div>

          <div className="space-y-8">
            {[
              { Svg: Step1Svg, title: 'Upload da conta ou cadastro manual', desc: 'Cadastre os dados do cliente ou envie a conta de luz. O sistema lê os dados automaticamente via IA.' },
              { Svg: Step2Svg, title: 'Cálculo de economia', desc: 'Simulação instantânea evidenciando os 28% de desconto projetados.' },
              { Svg: Step3Svg, title: 'Termo gerado', desc: 'PDF automático e profissional, já com o seu bônus atrelado no sistema.' },
              { Svg: Step4Svg, title: 'Aprovação online', desc: 'O cliente recebe um link via WhatsApp/E-mail e assina digitalmente em segundos.' },
              { Svg: Step5Svg, title: 'Bônus na conta', desc: 'Assim que o contrato é ativado, sua comissão é liberada no painel.' }
            ].map((step, idx) => (
              <div key={idx} className={`flex flex-col bg-offwhite md:flex-row rounded-[2rem] p-8 md:p-12 md:py-4 items-center gap-8 md:gap-16 border border-gray-light/60 shadow-sm hover:border-primary/50 transition-colors ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:flex-1 overflow-hidden flex items-center justify-center min-h-[250px]">
                  <step.Svg />
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-gray-light/60 self-stretch my-8"></div>

                <div className="w-full md:flex-1 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl font-bold text-2xl shadow-md mb-2">
                    {idx + 1}
                  </div>
                  <h4 className="text-2xl font-bold text-text-dark tracking-tight">{step.title}</h4>
                  <p className="text-lg text-text-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => setIsPartnerModalOpen(true)}
              className="bg-accent hover:bg-accent-hover text-text-dark px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              Iniciar cadastro gratuito
            </button>
          </div>
        </div>
      </section>

      {/* --- TEAM/NETWORK SECTION (DARK MODE) --- */}
      <section className="py-24 bg-vigor-dark text-white relative overflow-hidden border-b-4 border-accent">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-accent/20 text-accent font-bold text-sm rounded-full border border-accent/20 mb-4">
              Crie sua Força de Vendas
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">Modelo de Parceria Inteligente</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Nossa estrutura é direta e focada em resultados. Você não precisa construir redes complexas. Construa sua própria equipe comercial e defina o quanto cada vendedor deve receber.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            {/* Hierarchy Graphic */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 relative">
              <h5 className="font-bold text-center text-gray-light mb-8 uppercase tracking-wider text-sm">Hierarquia Comercial</h5>

              <div className="flex flex-col items-center space-y-4">
                {/* Nível 0: Vigor */}
                <div className="w-11/12 bg-white/5 rounded-xl p-4 border border-primary/50 text-center relative z-10">
                  <div className="text-accent font-bold text-lg tracking-tight">Vigor Energy</div>
                  <div className="text-xs text-gray-light mt-1">Fornecedora e Plataforma Tecnológica</div>
                </div>

                <div className="w-0.5 h-6 bg-primary/50"></div>

                {/* Nível 1: Parceiro */}
                <div className="w-11/12 relative rounded-xl p-[2px] overflow-hidden shadow-[0_0_30px_rgba(114,127,72,0.3)] z-10">
                  <div
                    className="absolute inset-[-150%] animate-spin"
                    style={{
                      animationDuration: '4s',
                      background: 'conic-gradient(from 0deg, transparent 70%, #90A356 100%)'
                    }}
                  />
                  <div className="relative bg-vigor-dark rounded-[10px] p-4 text-center z-10 h-full w-full">
                    {/* Inner tint to maintain the primary/20 aesthetic partially */}
                    <div className="absolute inset-0 bg-primary/20 rounded-[10px] pointer-events-none"></div>
                    <div className="relative z-20">
                      <div className="text-white font-bold text-xl tracking-tight">Você (Parceiro)</div>
                      <div className="text-sm text-gray-300 mt-1">Ganha 100% dos seus bônus diretos</div>
                    </div>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-accent/50"></div>

                {/* Nível 2: Vendedores */}
                <div className="w-full flex justify-between gap-2 relative z-10">
                  {[1, 2, 3].map((v) => (
                    <div key={v} className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                      <div className="text-accent font-bold text-sm">Vendedor {v}</div>
                      <div className="text-[10px] text-gray-light mt-1">Sua equipe</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-4 italic text-center w-full">
                  Você define o percentual de *todas* as vendas da sua equipe direta.
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-bold text-white shrink-0 mt-1 shadow-lg shadow-primary/20 text-xl">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 tracking-tight text-white">Venda Direta</h4>
                  <p className="text-gray-300">Atue de forma independente fechando seus próprios contratos. A margem é altíssima e o processo via IA leva poucos minutos.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-bold text-white shrink-0 mt-1 shadow-lg shadow-primary/20 text-xl">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 tracking-tight text-white">Forme Vendedores</h4>
                  <p className="text-gray-300">Traga profissionais de vendas para atuar abaixo do seu guarda-chuva. O limite de rede é de apenas um nível: Parceiro e seus Vendedores Parceiros.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-bold text-white shrink-0 mt-1 shadow-lg shadow-primary/20 text-xl">3</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 tracking-tight text-white">Ganhe na Escala</h4>
                  <p className="text-gray-300">Sem esquemas de pirâmide. É um modelo de gestão comercial sólido onde você gerencia seu time e fatura um percentual (override) do volume gerado por eles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFITS & TRAINING SECTION --- */}
      <section id="vantagens" className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4 tracking-tight">O Suporte que a Vigor Entrega</h2>
            <p className="text-lg text-text-muted">Nós formamos você. Você foca apenas em gerenciar seus resultados.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: 'Treinamento Completo', desc: 'Não precisa entender de energia. Fornecemos toda a capacitação técnica e comercial para você e sua equipe.' },
              { icon: Users, title: 'Gestão de Vendedores', desc: 'Plataforma pronta para você cadastrar seus vendedores diretos e acompanhar as vendas de cada um deles.' },
              { icon: LayoutDashboard, title: 'Plataforma Tech', desc: 'Acesso ao nosso CRM exclusivo, IA de leitura de faturas e geração de contratos 100% digitais.' },
              { icon: DollarSign, title: 'Até 80% de Bônus', desc: 'Comissionamento agressivo nas suas vendas diretas, sendo um dos maiores repasses do mercado.' },
              { icon: Zap, title: 'Ativação Rápida', desc: 'Processo desburocratizado para que seus clientes comecem a economizar (e você a ganhar) no menor tempo possível.' },
              { icon: ShieldCheck, title: 'Risco Zero', desc: 'Nós cuidamos da burocracia, do relacionamento com a concessionária e do risco da operação.' }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-light/60 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-text-dark mb-3 tracking-tight">{benefit.title}</h4>
                <p className="text-text-muted leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Training Highlight */}
          <div className="mt-12 max-w-7xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-accent">"Eu não sei vender energia!"</h3>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              Fique tranquilo. A Vigor Energy possui o módulo <strong className="font-semibold text-white">Academy</strong>, onde você aprende do absoluto zero. Entregamos os scripts de abordagem, os argumentos de conversão (os 28% de desconto vendem sozinhos) e ensinamos a usar a plataforma.
              <br />
              <b>Nós capacitamos você para liderar!</b>
            </p>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF & ABOUT --- */}
      <section id="quem-somos" className="py-20 bg-white border-y border-gray-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto bg-offwhite border border-gray-light/60 rounded-3xl p-10 text-center shadow-lg mb-20 transform hover:-translate-y-1 transition-transform">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-accent fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h3 className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-text-dark">
              "A tecnologia da Vigor muda o jogo. Eu apresento os 28% de desconto, o sistema lê a conta por IA e finaliza o contrato. Hoje coordeno minha própria equipe de vendedores parceiros performando diariamente usando o método deles."
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-xl font-bold text-white">
                MC
              </div>
              <div className="text-left">
                <div className="font-bold text-lg text-text-dark">Maurélio Camelo</div>
                <div className="text-primary text-sm font-bold uppercase tracking-wider">Parceiro Oficial</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 bg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-dark mb-4 tracking-tight">Dúvidas comuns</h2>
            <p className="text-lg text-text-muted">Entenda todos os detalhes para abrir sua franquia comercial.</p>
          </div>

          <div className="mb-10">
            <FAQItem
              question="A Vigor ensina como vender?"
              answer="Sim, 100%. Fornecemos treinamento completo que abrange desde a parte técnica (como funciona a energia solar) até os scripts de vendas e objeções comerciais. Você não estará sozinho(a)."
            />
            <FAQItem
              question="Como funciona a equipe de vendas abaixo de mim?"
              answer="Limitamos a estrutura em apenas 1 nível: Você (Parceiro) e os seus Vendedores Parceiros. Você cadastra essas pessoas no seu painel. Toda venda que eles realizarem, eles ganham a comissão deles, e você ganha um percentual (override) preestabelecido pelo gerenciamento da equipe. Sem pirâmides, apenas gestão de força de vendas."
            />
            <FAQItem
              question="Preciso entender muito de tecnologia?"
              answer="Não. A nossa Inteligência Artificial faz o trabalho duro. O único esforço é cadastrar o cliente e enviar o PDF da conta de luz do cliente para o sistema. O resto é gerado automaticamente."
            />
            <FAQItem
              question="Como recebo minhas comissões?"
              answer="Você emite a nota fiscal mensalmente e nós depositamos direto na sua conta bancária. Tudo com total transparência e extratos disponíveis em tempo real no seu painel da Vigor."
            />
            <FAQItem
              question="Eu pago alguma taxa ou mensalidade?"
              answer={<><strong>Definitivamente NÃO!</strong> Você não paga nada para ser nosso parceiro. O nosso lucro real só acontece quando você vende.</>}
            />
          </div>

          {/* CTA Box */}
          <div className="text-center p-10 bg-primary rounded-3xl border border-primary-light shadow-xl shadow-primary/10 text-white mt-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-dark/30 pointer-events-none"></div>
            <div className="relative z-10">
              <Zap className="w-10 h-10 text-accent mx-auto mb-4" fill="currentColor" />
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Pronto para liderar no setor de energia?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Tenha acesso imediato à plataforma Vigor Energy, inicie seus treinamentos e comece a gerar oportunidades hoje mesmo.
              </p>
              <button 
                onClick={() => setIsPartnerModalOpen(true)}
                className="bg-accent hover:bg-accent-hover text-text-dark px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-lg shadow-accent/20"
              >
                Quero ser um Parceiro Vigor
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <PartnerRegistrationModal 
        isOpen={isPartnerModalOpen} 
        onClose={() => setIsPartnerModalOpen(false)} 
      />
    </div>
  );
}
