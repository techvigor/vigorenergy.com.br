import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Gift, Users, Zap, ArrowLeft, Trophy, Clock, ShieldCheck, AlertCircle, ChevronDown, ArrowDown, Shirt, Wind, Palette } from 'lucide-react';
import Footer from '../components/Footer';

export default function SelecaoVigorEnergy() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [activePrizeImage, setActivePrizeImage] = useState(0);

    const prizeImages = [
        {
            url: "uniforme-1-brasil-1.jpg",
            title: "Amarelinha",
            subtitle: "Modelo original da Seleção Brasileira"
        },
        {
            url: "/camisa-azul-brasil.webp",
            title: "Modelo azul",
            subtitle: "As cinco estrelas"
        },
        {
            url: "/uniforme-1-brasil-2.jpg",
            title: "Um clássico da história",
            subtitle: "O futebol em cada detalhe"
        },
        {
            url: "/detalhe-camisa-azul-brasil.avif",
            title: "Em Campo",
            subtitle: "A emoção de vestir o manto"
        }
    ];

    // Lógica de Datas
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        // Define o limite como 10 de Abril de 2026, às 23:59:59
        const deadline = new Date('2026-04-10T23:59:59');
        const now = new Date();
        if (now > deadline) {
            setIsClosed(true);
        }
    }, []);

    // Estados do Formulário
    // 'register' | 'referrals' | 'warning' | 'success'
    const [currentStep, setCurrentStep] = useState<'register' | 'referrals' | 'warning' | 'success'>('register');

    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const [referrals, setReferrals] = useState([
        { name: '', whatsapp: '', city: '' }
    ]);

    // Handlers do Usuário
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const goToReferrals = (e: React.FormEvent) => {
        e.preventDefault();
        if (userData.name && userData.phone && userData.email) {
            setCurrentStep('referrals');
        }
    };

    // Handlers de Indicações
    const handleReferralChange = (index: number, field: string, value: string) => {
        const newReferrals = [...referrals];
        newReferrals[index] = { ...newReferrals[index], [field]: value };
        setReferrals(newReferrals);
    };

    const addReferral = () => {
        setReferrals([...referrals, { name: '', whatsapp: '', city: '' }]);
    };

    const removeReferral = (index: number) => {
        if (referrals.length > 1) {
            const newReferrals = referrals.filter((_, i) => i !== index);
            setReferrals(newReferrals);
        }
    };

    // Lógica de Submissão
    const handleFinish = () => {
        // Filtra apenas indicações que tenham pelo menos nome e whatsapp preenchidos
        const validReferrals = referrals.filter(r => r.name.trim() !== '' && r.whatsapp.trim() !== '');

        if (validReferrals.length < 3) {
            setCurrentStep('warning');
        } else {
            submitData(validReferrals);
            setCurrentStep('success');
        }
    };

    const confirmWarning = () => {
        const validReferrals = referrals.filter(r => r.name.trim() !== '' && r.whatsapp.trim() !== '');
        submitData(validReferrals);
        setCurrentStep('success');
    };

    const submitData = (validReferrals: any[]) => {
        const payload = {
            user: userData,
            referrals: validReferrals,
            timestamp: new Date().toISOString()
        };
        // AQUI: Disparo do webhook para o Make/n8n/RD Station
        console.log("Dados prontos para automação:", payload);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-offwhite text-text-dark selection:bg-accent/30">
            {/* Custom Scrollbar and Animations inside a style tag */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                html { scroll-behavior: smooth; }
            `}</style>

            {/* Hero Section - Navbar removida para layout imersivo */}
            <section
                className="relative flex items-center min-h-screen py-12 px-4 md:px-8 bg-white bg-[length:120%_auto] md:bg-[length:100%_auto] bg-no-repeat bg-bottom md:bg-right-center"
                style={{ backgroundImage: "url('https://vigorenergy.com.br/wp-content/uploads/2026/03/camiseta_bg-scaled.png')" }}
            >
                {/* Gradiente para garantir legibilidade do texto no lado esquerdo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
                <div className="absolute inset-0 bg-white/40 md:hidden"></div> {/* Extra legibilidade no mobile */}

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10 w-full">
                    <div className="md:w-4/5 space-y-6">
                        <img
                            src="https://vigorenergy.com.br/wp-content/uploads/2024/07/LOGO-01.webp"
                            alt="Logo Vigor Energy"
                            className="h-16 md:h-20 w-auto object-contain mb-4"
                        />
                        <h1 className="text-3xl md:text-5xl lg:text-[54px] font-extrabold text-vigor-dark leading-tight drop-shadow-sm">
                            Programa de Indicação <br />
                            <span className="text-[35px] md:text-[54px] text-vigor-accent">Seleção Vigor Energy</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-900 font-medium max-w-xl">
                            Nesta época de Copa do Mundo, a Vigor Energy vai sortear <strong>1 Camiseta Oficial da Seleção Brasileira</strong> para quem espalhar a melhor energia!
                        </p>
                        <div className="bg-white/90 p-6 rounded-2xl border-l-8 border-vigor-accent shadow-xl backdrop-blur-sm max-w-lg">
                            <p className="font-bold text-lg text-vigor-dark">Regra de Ouro:</p>
                            <p className="text-base text-gray-800 mt-2">Indique ao menos <strong>3 pessoas</strong> (com consumo médio acima de 500kWh/mês) para validar sua participação no sorteio.</p>
                        </div>

                        {/* Botão com animação contínua */}
                        <div className="pt-6">
                            <a
                                href="#participar"
                                className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-vigor-accent text-white font-black text-xl hover:bg-[#d5891e] transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(230,154,37,0.5)] hover:-translate-y-1 animate-pulse-orange"
                            >
                                Quero participar!
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/5 hidden md:block">
                        {/* Espaço vazio para não cobrir a parte da imagem de fundo */}
                    </div>
                </div>
            </section>

            {/* Cronograma Section */}
            <section id="cronograma" className="py-20 bg-offwhite">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">Cronograma</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-primary-dark">Fique de olho nas datas</h3>
                        <p className="text-lg text-text-muted mt-4 max-w-2xl mx-auto">Acompanhe as fases da campanha para não perder a chance de ganhar sua camisa.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Desktop connector line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Users className="w-8 h-8" />
                            </div>
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-bold mb-4">16 Mar - 10 Abr</span>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Inscrições & Apuração</h4>
                            <p className="text-gray-600">Período para você fazer sua inscrição e cadastrar suas indicações.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                                <Clock className="w-8 h-8" />
                            </div>
                            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-4">10 de Abril</span>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Encerramento</h4>
                            <p className="text-gray-600">Data limite (23:59h) para o preenchimento do formulário no site.</p>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-primary-dark p-8 rounded-2xl shadow-lg border border-primary text-center relative hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                                <Gift className="w-8 h-8" />
                            </div>
                            <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-bold mb-4 border border-white/30">15 de Abril</span>
                            <h4 className="text-xl font-bold text-white mb-2">O Grande Sorteio</h4>
                            <p className="text-white/80">O sorteio será realizado e divulgado nas nossas redes sociais!</p>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <a
                            href="#participar"
                            className="inline-flex items-center gap-2 bg-vigor-accent text-white font-bold px-8 py-4 rounded-full hover:bg-[#d5891e] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            Participe agora
                            <ArrowDown className="w-5 h-5 animate-bounce" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Regras e Informações */}
            <section id="regras" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <img
                                src="/camisa-azul-brasil.webp"
                                alt="Camiseta Oficial da Seleção Brasileira 2026"
                                className="w-full h-[700px] object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">Requisitos</h2>
                                <h3 className="text-3xl md:text-4xl font-extrabold text-primary-dark mb-6">Como validar minha participação?</h3>
                                <p className="text-lg text-gray-600">A Vigor Energy busca levar economia para quem mais consome e precisa. Por isso, preparamos regras simples e claras para o programa de indicação:</p>
                            </div>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary mt-1">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">1. Indique no mínimo 3 amigos</h4>
                                        <p className="text-gray-600 mt-1">Para garantir sua participação no sorteio, você precisa cadastrar os dados de pelo menos 3 pessoas interessadas em obter economia na conta de luz.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-accent mt-1">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">2. Consumo Médio de 500kWh</h4>
                                        <p className="text-gray-600 mt-1">As indicações devem ter um consumo médio de energia igual ou superior a 500kWh mensais. Nossa equipe é especialista e cuidará de averiguar esses dados com cada indicado seu.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100/50 rounded-2xl flex items-center justify-center flex-shrink-0 text-green-600 mt-1">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">3. Validação Justa</h4>
                                        <p className="text-gray-600 mt-1">Isso garante que todos tenham chances iguais e que levemos nossa solução de energia limpa para clientes com o perfil ideal. A validação é feita de forma segura e transparente por nossos consultores.</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="text-center mt-12">
                                <a
                                    href="#participar"
                                    className="inline-flex items-center gap-2 bg-vigor-accent text-white font-bold px-8 py-4 rounded-full hover:bg-[#d5891e] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                >
                                    Participe agora
                                    <ArrowDown className="w-5 h-5 animate-bounce" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dúvidas Frequentes (FAQ) */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">Tire suas dúvidas</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-primary-dark">Perguntas Frequentes</h3>
                        <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                            Ainda não tem certeza de como funciona? Separamos as principais dúvidas para te ajudar a participar agora mesmo.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* FAQ Item 1 */}
                        <div className={`bg-white rounded-2xl shadow-sm border ${openFaq === 0 ? 'border-accent ring-1 ring-accent/20' : 'border-gray-100'} overflow-hidden transition-all duration-300`}>
                            <button
                                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <h4 className="flex items-start text-lg md:text-xl font-bold text-gray-900 gap-3">
                                    <span>Como sei se meu indicado consome mais de 500kWh?</span>
                                </h4>
                                <ChevronDown className={`w-6 h-6 flex-shrink-0 text-gray-400 transition-transform duration-300 ${openFaq === 0 ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="px-6 md:px-8 pb-6 md:pb-8 text-gray-600 leading-relaxed text-base md:text-lg">
                                    O ideal é focar em amigos que moram em casas maiores com ar-condicionado, ou que possuem comércios (padarias, clínicas, etc). Geralmente, faturas acima de R$450 a R$500 reais já se enquadram. Você não precisa ter certeza absoluta, nossa equipe comercial fará a validação final!
                                </p>
                            </div>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className={`bg-white rounded-2xl shadow-sm border ${openFaq === 1 ? 'border-accent ring-1 ring-accent/20' : 'border-gray-100'} overflow-hidden transition-all duration-300`}>
                            <button
                                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <h4 className="flex items-start text-lg md:text-xl font-bold text-gray-900 gap-3">
                                    <span>Meus indicados precisam fechar contrato ou apenas se cadastrar?</span>
                                </h4>
                                <ChevronDown className={`w-6 h-6 flex-shrink-0 text-gray-400 transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="px-6 md:px-8 pb-6 md:pb-8 text-gray-600 leading-relaxed text-base md:text-lg">
                                    Para validar a sua participação no sorteio, o seu indicado precisa ter a conta de energia aprovada no nosso sistema e se tornar um cliente ativo Vigor Energy. É bom para ele que vai economizar, e ótimo para você que concorre ao prêmio.
                                </p>
                            </div>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className={`rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 ${openFaq === 2 ? 'bg-orange-50/50 border-orange-200 ring-1 ring-orange-200/50' : 'bg-white border-gray-100'}`}>
                            <button
                                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <h4 className="flex items-start text-lg md:text-xl font-bold text-gray-900 gap-3">
                                    <span>Se apenas 2 dos meus 3 indicados tiverem o consumo mínimo, eu concorro?</span>
                                </h4>
                                <ChevronDown className={`w-6 h-6 flex-shrink-0 text-gray-400 transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="px-6 md:px-8 pb-6 md:pb-8 text-gray-700 leading-relaxed text-base md:text-lg font-medium">
                                    <span className="text-red-600 font-bold">Infelizmente não.</span> A regra base para gerar o seu 1º número da sorte é ter exatamente 3 indicados validados no sistema com o consumo {'>'} 500kWh.<br /><br />
                                    <strong className="text-primary-dark">💡 A dica de ouro é:</strong> indique 5 ou 6 pessoas, assim você garante que pelo menos 3 serão aprovadas!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <a
                            href="#participar"
                            className="inline-flex items-center gap-2 bg-vigor-accent text-white font-bold px-8 py-4 rounded-full hover:bg-[#d5891e] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            Participe agora
                            <ArrowDown className="w-5 h-5 animate-bounce" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Area: Dynamic Form / Messages */}
            <section id="participar" className="bg-gray-100 py-24 px-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="form-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#form-grid)" />
                    </svg>
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-dark">Preencha e Concorra</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Em apenas 2 passos você garante sua vaga no nosso sorteio oficial.</p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative">
                        {isClosed ? (
                            /* Estado: Campanha Encerrada */
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-12 h-12 text-gray-400" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Inscrições Encerradas!</h2>
                                <p className="text-gray-600 mb-6 text-lg max-w-lg mx-auto">
                                    O prazo para cadastrar suas indicações finalizou no dia <strong>10 de Abril</strong>.
                                </p>
                                <p className="text-gray-600 text-lg">
                                    Fique ligado em nossas redes sociais para acompanhar o grande sorteio no dia <strong>15 de Abril</strong>.<br />
                                    <strong>Boa sorte a todos os participantes!</strong>
                                </p>
                            </div>
                        ) : (
                            /* Fluxo Ativo */
                            <>
                                {/* Progress Indicator */}
                                {currentStep !== 'success' && currentStep !== 'warning' && (
                                    <div className="flex items-center justify-center mb-12">
                                        <div className="flex items-center w-full max-w-xs">
                                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md">1</div>
                                            <div className={`flex-1 h-1 mx-2 rounded ${currentStep === 'referrals' ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md ${currentStep === 'referrals' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 'register' && (
                                    <div className="animate-in fade-in duration-500">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Seus Dados Pessoais</h2>
                                            <p className="text-gray-500">Iremos usar esses dados para te contatar caso seja o ganhador da camisa!</p>
                                        </div>

                                        <form onSubmit={goToReferrals} className="space-y-6 max-w-xl mx-auto">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label>
                                                <input required type="text" name="name" value={userData.name} onChange={handleUserChange} className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all shadow-sm" placeholder="Ex: João da Silva" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp *</label>
                                                    <input required type="tel" name="phone" value={userData.phone} onChange={handleUserChange} className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all shadow-sm" placeholder="(00) 00000-0000" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail *</label>
                                                    <input required type="email" name="email" value={userData.email} onChange={handleUserChange} className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all shadow-sm" placeholder="joao@email.com" />
                                                </div>
                                            </div>
                                            <div className="pt-6">
                                                <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white font-bold text-lg py-5 rounded-xl shadow-[0_10px_20px_-10px_rgba(246,169,55,0.7)] transform transition-all hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2">
                                                    Avançar para Indicações <ArrowLeft className="w-5 h-5 rotate-180" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {currentStep === 'referrals' && (
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col">
                                        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                            <div>
                                                <button onClick={() => setCurrentStep('register')} className="text-sm font-semibold text-gray-500 hover:text-accent mb-4 flex items-center gap-1 transition-colors">
                                                    &larr; Voltar para Meus Dados
                                                </button>
                                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Suas Indicações</h2>
                                                <p className="text-gray-500">Mínimo necessário: <strong className="text-primary-dark">3 indicações validas</strong>.</p>
                                            </div>
                                            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100 inline-block">
                                                Indicações atuais: <strong className="text-lg">{referrals.filter(r => r.name.trim() !== '').length}</strong>
                                            </div>
                                        </div>

                                        {/* Container para as indicações (Scrollável se forem muitas) */}
                                        <div className="overflow-y-auto custom-scrollbar pr-2 lg:pr-4 pb-4 space-y-6 max-h-[500px]">
                                            {referrals.map((referral, index) => (
                                                <div key={index} className="bg-white border-2 border-gray-100 p-6 rounded-2xl relative group hover:border-accent/30 transition-colors shadow-sm focus-within:ring-4 focus-within:ring-primary/5">
                                                    <div className="absolute top-4 right-4 flex items-center gap-3">
                                                        <span className="text-xs font-black text-white bg-primary px-3 py-1 rounded-full shadow-sm">INDICAÇÃO {index + 1}</span>
                                                        {referrals.length > 1 && (
                                                            <button
                                                                onClick={() => removeReferral(index)}
                                                                className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-all"
                                                                title="Remover indicação"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
                                                        <div className="lg:col-span-12">
                                                            <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo do Indicado</label>
                                                            <input type="text" value={referral.name} onChange={(e) => handleReferralChange(index, 'name', e.target.value)} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Ex: Maria Alice Souza" />
                                                        </div>
                                                        <div className="lg:col-span-6">
                                                            <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp</label>
                                                            <input type="tel" value={referral.whatsapp} onChange={(e) => handleReferralChange(index, 'whatsapp', e.target.value)} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="(00) 00000-0000" />
                                                        </div>
                                                        <div className="lg:col-span-6">
                                                            <label className="block text-sm font-bold text-gray-700 mb-2">Cidade/UF</label>
                                                            <input type="text" value={referral.city} onChange={(e) => handleReferralChange(index, 'city', e.target.value)} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Ex: Goiânia - GO" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col lg:flex-row gap-4 items-center justify-between">
                                            <button
                                                onClick={addReferral}
                                                className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-accent text-accent font-bold rounded-xl hover:bg-accent/5 transition-colors focus:ring-4 focus:ring-accent/20 outline-none"
                                            >
                                                <Plus className="w-5 h-5" /> Adicionar mais um indicado
                                            </button>
                                            <button
                                                onClick={handleFinish}
                                                className="w-full lg:w-auto px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(95,108,55,0.7)] transform transition-all hover:-translate-y-1 active:scale-[0.98] text-lg"
                                            >
                                                Finalizar e Concorrer
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 'warning' && (
                                    <div className="animate-in zoom-in-95 duration-500 text-center py-12 max-w-lg mx-auto">
                                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 border-8 border-red-50/50">
                                            <AlertCircle className="w-10 h-10 text-red-500" />
                                        </div>
                                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Atenção! Faltam Indicações!</h2>
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                                            <p className="text-gray-700 text-lg leading-relaxed">
                                                Você nos enviou os dados de apenas <strong>{referrals.filter(r => r.name.trim() !== '').length} pessoa(s)</strong>.<br />
                                            </p>
                                            <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                                                <p className="font-bold text-accent-hover text-lg">Para ter o direito de concorrer à camisa oficial, você precisa de no mínimo <span className="underline decoration-wavy decoration-accent">3 indicações</span>.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={() => setCurrentStep('referrals')}
                                                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all text-lg hover:-translate-y-0.5"
                                            >
                                                ← Quero adicionar mais pessoas
                                            </button>
                                            <button
                                                onClick={confirmWarning}
                                                className="w-full text-gray-500 hover:text-gray-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors"
                                            >
                                                Confirmar e finalizar mesmo assim
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 'success' && (
                                    <div className="animate-in zoom-in-95 duration-700 text-center py-16 max-w-2xl mx-auto">
                                        <div className="flex justify-center mb-8 relative">
                                            <div className="absolute inset-0 bg-green-400 blur-3xl opacity-20 rounded-full"></div>
                                            <CheckCircle className="w-24 h-24 text-[#009C3B] relative z-10" />
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Show de bola, {userData.name.split(' ')[0]}!</h2>

                                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mb-8 shadow-sm">
                                            {referrals.filter(r => r.name.trim() !== '').length >= 3 ? (
                                                <>
                                                    <p className="text-gray-700 text-xl mb-6 font-medium leading-relaxed">
                                                        Recebemos suas indicações com sucesso. Nossa equipe de especialistas irá validar as indicações feitas atestando o consumo médio (igual ou superior a 500kWh) e entraremos em contato.
                                                    </p>
                                                    <div className="bg-green-50 border border-green-200 text-green-800 p-5 rounded-2xl shadow-inner">
                                                        <strong className="text-lg flex items-center justify-center gap-2">
                                                            <Trophy className="w-6 h-6 text-[#FFDF00] drop-shadow-sm" />
                                                            Você já deu um grande passo para vestir a amarelinha! 🇧🇷
                                                        </strong>
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="text-gray-600 text-xl leading-relaxed">
                                                    Suas indicações foram registradas. Que pena que você não atingiu as 3 indicações mínimas para participar do sorteio desta vez.<br /><br />
                                                    <strong>Mas agradecemos demais a sua parceria com a Vigor Energy! Toda energia positiva conta.</strong>
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => window.location.reload()}
                                            className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-300 hover:text-gray-900 rounded-xl transition-all shadow-sm"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Fazer uma nova indicação
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* O Prêmio Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Texto */}
                        <div className="order-2 lg:order-1 space-y-8">
                            <div>
                                <h2 className="text-sm font-bold text-vigor-accent tracking-widest uppercase mb-3">O Prêmio</h2>
                                <h3 className="text-3xl md:text-5xl font-extrabold text-vigor-dark mb-6 leading-tight">O Manto Sagrado que você já conhece</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Não estamos falando de réplicas. O vencedor levará para casa a <strong>Camisa Oficial Nike (Modelo Torcedor) 2026</strong> da Seleção Brasileira. Você escolhe o tamanho (P, M, G ou GG) e nós teremos o prazer de te entregar.
                                </p>
                            </div>

                            <ul className="space-y-6">
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <span className="text-lg md:text-xl font-bold text-gray-800">Selo de Autenticidade</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                                        <Wind className="w-6 h-6" />
                                    </div>
                                    <span className="text-lg md:text-xl font-bold text-gray-800">Tecnologia AERO-FIT</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                                        <Palette className="w-6 h-6" />
                                    </div>
                                    <span className="text-lg md:text-xl font-bold text-gray-800">Você Escolhe a Cor e o Tamanho</span>
                                </li>
                            </ul>
                        </div>

                        {/* Galeria Interativa */}
                        <div className="order-1 lg:order-2 space-y-4">
                            {/* Imagem Principal */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] border border-gray-100 bg-gray-50 group">
                                <img
                                    src={prizeImages[activePrizeImage].url}
                                    alt={prizeImages[activePrizeImage].title}
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                />
                                {/* Overlay Gradiente Padrão */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-black/30 pointer-events-none"></div>

                                {/* Info Superior Esquerda */}
                                <div className="absolute top-6 left-6 flex items-center gap-2">
                                    <Shirt className="w-5 h-5 text-white" />
                                    <span className="text-white font-semibold tracking-wider text-sm drop-shadow-md">
                                        {prizeImages[activePrizeImage].title}
                                    </span>
                                </div>

                                {/* Categoria Base */}
                                <div className="absolute bottom-6 left-6">
                                    <h4 className="text-white font-extrabold text-2xl drop-shadow-lg">
                                        {prizeImages[activePrizeImage].subtitle}
                                    </h4>
                                </div>
                            </div>

                            {/* Miniaturas */}
                            <div className="p-2 flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                                {prizeImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActivePrizeImage(idx)}
                                        className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-28 rounded-2xl overflow-hidden transition-all duration-300 ${activePrizeImage === idx ? 'ring-4 ring-vigor-accent ring-offset-2 scale-[1.02] shadow-md' : 'opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
                                    >
                                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                                        <div className={`absolute inset-0 transition-colors ${activePrizeImage === idx ? 'bg-transparent' : 'bg-black/20 group-hover:bg-transparent'}`}></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

// Inline fallback icon for RotateCcw just in case it wasn't imported above to prevent breaking, though it's standard lucide.
function RotateCcw(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
        </svg>
    )
}
