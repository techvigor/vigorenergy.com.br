import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Home, Building2, Building, PiggyBank, RotateCcw, Plus, Equal, X, MapPin, Phone, User, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SimulatorForm() {
    const [step, setStep] = useState(1);
    const [billValue, setBillValue] = useState('');
    const [profile, setProfile] = useState('Residência');

    // Modal & Lead Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leadForm, setLeadForm] = useState({ name: '', whatsapp: '', city: '' });
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 10) value = value.slice(0, 10);
        const numericValue = parseInt(value || "0", 10) / 100;
        const formatted = numericValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
        setBillValue(value === "" ? "" : formatted);
    };

    const formatWhatsApp = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 2) return digits;
        if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    };

    const handleWhatsAppChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLeadForm(prev => ({ ...prev, whatsapp: formatWhatsApp(e.target.value) }));
    };

    const handleSubmitLead = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitStatus('loading');

        try {
            // Combine all simulation and lead data
            const allData = {
                lead: leadForm,
                simulation: {
                    originalBill: parsedValue,
                    profile,
                    newBill: newTotal,
                    monthlySavings: discount,
                    yearlySavings: discount * 12
                }
            };

            console.log('Enviando dados consolidados:', allData);

            const { error: supabaseError } = await supabase.from('pre_venda').insert([
                {
                    nome_completo: leadForm.name,
                    whatsapp: leadForm.whatsapp,
                    cidade: leadForm.city,
                    valor_conta_luz: parsedValue,
                    tipo_conta: profile,
                    economia_mes: discount,
                    economia_ano: discount * 12
                }
            ]);

            if (supabaseError) throw supabaseError;

            setSubmitStatus('success');
            // Após 3 segundos fecha o modal e reseta
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitStatus('idle');
                setStep(1);
                setBillValue('');
                setLeadForm({ name: '', whatsapp: '', city: '' });
            }, 3000);

        } catch (error) {
            setSubmitStatus('error');
        }
    };

    const parsedValue = parseInt(billValue.replace(/\D/g, '') || '0', 10) / 100;

    // Fixed cost estimations per profile
    const fixedCost = profile === 'Residência' ? 60 : profile === 'Empresa' ? 100 : 120;

    const canCalculate = parsedValue > fixedCost;

    // Calculation Logic
    const discountable = Math.max(0, parsedValue - fixedCost);
    const discount = discountable * 0.20; // 20% average discount
    const vigorBill = discountable - discount;
    const newTotal = vigorBill + fixedCost;

    const formatBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const profiles = [
        { id: 'Residência', icon: Home, label: 'Residência' },
        { id: 'Empresa', icon: Building2, label: 'Empresa' },
        { id: 'Condomínio', icon: Building, label: 'Condomínio' }
    ];

    // Barcode mock generator
    const renderBarcode = () => (
        <div className="flex gap-[2px] justify-center opacity-30 mt-6 overflow-hidden h-8">
            {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className={`bg-gray-800 ${i % 4 === 0 ? 'w-1' : i % 3 === 0 ? 'w-1.5' : i % 2 === 0 ? 'w-0.5' : 'w-[3px]'} h-full`}></div>
            ))}
        </div>
    );

    return (
        <section id="simulador" className="py-20 md:py-28 bg-vigor-dark text-white font-sans relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="form-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#form-grid)" />
                </svg>
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl lg:text-[54px] font-extrabold mb-8 leading-tight">
                        Veja o quanto você irá economizar
                    </h2>
                    <div className="inline-block px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm tracking-widest uppercase shadow-lg">
                        {step === 1 ? 'Antes da assinatura Vigor Energy' : 'Depois da assinatura Vigor Energy'}
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-14 text-gray-800 relative z-20">
                    {step === 1 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Col 1 */}
                            <div className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-vigor-accent flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md">1</div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-700">Digite o valor da sua conta</h3>
                                    </div>
                                    <div className="relative group ml-0 md:ml-14">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-2xl transition-colors group-focus-within:text-vigor-accent">R$</span>
                                        <input
                                            type="text"
                                            value={billValue}
                                            onChange={handleCurrencyChange}
                                            placeholder="350,00"
                                            className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-vigor-accent focus:ring-4 focus:ring-vigor-accent/20 text-3xl md:text-4xl font-black text-vigor-dark transition-all outline-none"
                                        />
                                        {!canCalculate && parsedValue > 0 && (
                                            <p className="text-red-500 text-sm mt-2 font-medium">O valor deve ser maior que o custo mínimo da distribuidora (R$ {fixedCost},00).</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Col 2 */}
                            <div className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-vigor-accent flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md">2</div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-700">Informe o tipo de conta</h3>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 ml-0 md:ml-14">
                                        {profiles.map(p => (
                                            <label
                                                key={p.id}
                                                className={`flex-1 flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all ${profile === p.id
                                                    ? 'border-vigor-accent bg-[#fcf5eb] ring-1 ring-vigor-accent/50'
                                                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                                                    }`}
                                            >
                                                <input type="radio" className="hidden" name="profile" checked={profile === p.id} onChange={() => setProfile(p.id)} />
                                                <p.icon className={`w-8 h-8 transition-transform ${profile === p.id ? 'text-vigor-accent scale-110 drop-shadow-sm' : 'text-gray-400'}`} />
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${profile === p.id ? 'border-vigor-accent' : 'border-gray-300'}`}>
                                                        <div className={`w-2 h-2 rounded-full bg-vigor-accent transition-transform scale-0 ${profile === p.id ? 'scale-100' : ''}`}></div>
                                                    </div>
                                                    <span className={`font-bold text-sm md:text-base ${profile === p.id ? 'text-vigor-dark' : 'text-gray-500'}`}>{p.label}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 flex justify-center mt-4">
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!canCalculate}
                                    className="bg-primary text-white font-black text-xl px-12 py-5 rounded-full hover:bg-primary-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_-10px_rgba(3,211,102,0.6)] hover:shadow-[0_15px_25px_-10px_rgba(3,211,102,0.8)] hover:-translate-y-1 w-full md:w-auto min-w-[300px]"
                                >
                                    Calcular economia
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col xl:flex-row gap-10 items-stretch">
                            {/* Refazer Button - Mobile positioning (Inside structure flow) & Desktop Top-Left */}
                            <button
                                onClick={() => setStep(1)}
                                className="xl:absolute xl:top-8 xl:left-8 flex items-center justify-center xl:justify-start gap-2 text-gray-400 hover:text-vigor-accent font-bold transition-colors uppercase tracking-wider text-sm"
                            >
                                <RotateCcw className="w-5 h-5" /> Calcular novamente
                            </button>

                            {/* Math Section (Left Side) */}
                            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 pt-6 xl:pt-14 relative z-10">

                                {/* Boleto Vigor */}
                                <div className="bg-gray-50 border border-gray-200 p-8 rounded-[2rem] min-h-[300px] w-full max-w-[280px] text-center shadow-sm relative transition-transform hover:-translate-y-1">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 block">Boleto</span>
                                    <div className="flex justify-center mb-6 h-10 items-center">
                                        <img src="/logomarca_transp.png" alt="Vigor Energy" className="h-full object-contain filter drop-shadow-sm" />
                                    </div>
                                    <p className="text-3xl font-black text-vigor-dark">{formatBRL(vigorBill)}</p>
                                    {renderBarcode()}
                                </div>

                                <div className="text-gray-300 flex-shrink-0 animate-pulse"><Plus className="w-8 h-8 md:w-12 md:h-12" /></div>

                                {/* Fatura Distribuidora */}
                                <div className="bg-gray-50 border border-gray-200 p-8 rounded-[2rem] min-h-[300px] w-full max-w-[280px] text-center shadow-sm relative transition-transform hover:-translate-y-1">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 block">Fatura</span>
                                    <div className="flex justify-center mb-6 h-10 items-center">
                                        <span className="font-extrabold text-gray-600 tracking-widest text-sm md:text-base">DISTRIBUIDORA</span>
                                    </div>
                                    <p className="text-3xl font-black text-gray-800">{formatBRL(fixedCost)}<span className="text-vigor-accent text-xl relative -top-2">*</span></p>
                                    {renderBarcode()}
                                </div>

                                <div className="text-gray-300 flex-shrink-0 hidden md:block"><Equal className="w-8 h-8 md:w-12 md:h-12" /></div>

                                {/* Resumo Conta (Desktop & Mobile) */}
                                <div className="text-center md:text-left flex flex-col justify-center bg-gray-50 md:bg-transparent p-6 md:p-0 rounded-3xl w-full md:w-auto">
                                    <div className="text-gray-400 font-bold line-through decoration-red-400/60 mb-2 flex items-center justify-center md:justify-start gap-2 text-lg">
                                        De: <span>{formatBRL(parsedValue)}</span>
                                    </div>
                                    <div className="text-gray-800 font-black flex flex-col items-center md:items-start leading-none gap-1">
                                        <span className="text-sm tracking-widest text-gray-500 uppercase">Para:</span>
                                        <span className="text-4xl lg:text-4xl text-primary drop-shadow-sm">{formatBRL(newTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Savings Box (Right Side) */}
                            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[2rem] p-8 md:p-10 text-white w-full xl:w-[420px] shadow-2xl flex flex-col justify-between relative overflow-hidden flex-shrink-0">
                                {/* Decorate Pattern */}
                                <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-10 blur-xl pointer-events-none">
                                    <PiggyBank className="w-64 h-64 text-white" />
                                </div>

                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-start gap-5">
                                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                                            <PiggyBank className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold leading-tight text-white text-shadow-sm">
                                            Veja o quanto você<br />economizará na fatura
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-black/15 rounded-2xl p-3 border border-white/10 shadow-inner">
                                            <div className="text-sm text-white/80 font-semibold mb-2 uppercase tracking-wider">Por mês</div>
                                            <div className="text-2xl font-black">{formatBRL(discount)}</div>
                                        </div>
                                        <div className="bg-black/15 rounded-2xl p-3 border border-white/10 shadow-inner">
                                            <div className="text-sm text-white/80 font-semibold mb-2 uppercase tracking-wider">Por ano</div>
                                            <div className="text-2xl font-black text-secondary">{formatBRL(discount * 12)}</div>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <p className="text-base text-white/90 text-center font-medium mb-6">
                                            Gostou? Clique abaixo e comece a economizar hoje mesmo!
                                        </p>

                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="block w-full bg-white text-primary-dark text-center font-black text-lg py-5 rounded-2xl hover:bg-gray-100 transition-all shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] hover:shadow-xl hover:-translate-y-1"
                                        >
                                            Quero economizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Disclaimer */}
                <div className="mt-12 text-center text-white/50 text-xs md:text-sm font-medium max-w-4xl mx-auto space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                    <p>* Custo de disponibilidade + Média da taxa de iluminação pública.</p>
                    <p className="leading-relaxed">
                        Os valores são aproximados e condicionados ao tipo de sistema e taxas de disponibilidade e iluminação pública. O desconto é de ATÉ 28% na energia injetada. A fatura de energia da distribuidora continua sendo enviada junto ao nosso boleto e nela constarão os custos mínimos e taxa de iluminação pública nas quais a Vigor Energy não pode atuar para reduzir o valor.
                    </p>
                </div>
            </div>

            {/* Lead Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-vigor-dark/90 backdrop-blur-sm transition-opacity"
                        onClick={() => submitStatus !== 'loading' && setIsModalOpen(false)}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        {submitStatus === 'success' ? (
                            <div className="p-12 text-center space-y-6">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-vigor-dark mb-2">Quase lá!</h3>
                                    <p className="text-gray-600 text-lg">Recebemos sua mensagem e entraremos em contato em breve para oficializar sua economia.</p>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center gap-2">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Sua economia anual será de:</p>
                                    <p className="text-3xl font-black text-primary">{formatBRL(discount * 12)}</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Header */}
                                <div className="p-8 pb-0 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-vigor-accent/10 p-2.5 rounded-xl">
                                            <PiggyBank className="w-6 h-6 text-vigor-accent" />
                                        </div>
                                        <h3 className="text-2xl font-black text-vigor-dark">Finalize seu cadastro</h3>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmitLead} className="p-8 space-y-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Nome Completo</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-vigor-accent transition-colors" />
                                            <input
                                                required
                                                type="text"
                                                value={leadForm.name}
                                                onChange={e => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="Seu nome"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-vigor-accent focus:ring-4 focus:ring-vigor-accent/10 transition-all outline-none text-gray-800 font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">WhatsApp</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-vigor-accent transition-colors" />
                                            <input
                                                required
                                                type="tel"
                                                value={leadForm.whatsapp}
                                                onChange={handleWhatsAppChange}
                                                placeholder="(00) 00000-0000"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-vigor-accent focus:ring-4 focus:ring-vigor-accent/10 transition-all outline-none text-gray-800 font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* City */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Cidade</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-vigor-accent transition-colors" />
                                            <input
                                                required
                                                type="text"
                                                value={leadForm.city}
                                                onChange={e => setLeadForm(prev => ({ ...prev, city: e.target.value }))}
                                                placeholder="Sua cidade"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-vigor-accent focus:ring-4 focus:ring-vigor-accent/10 transition-all outline-none text-gray-800 font-medium"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitStatus === 'loading'}
                                        className="w-full bg-primary text-white font-black text-xl py-5 rounded-2xl hover:bg-primary-dark transition-all shadow-[0_10px_20px_-10px_rgba(3,211,102,0.6)] flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {submitStatus === 'loading' ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Garantir meu desconto
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="p-8 bg-gray-50 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                                        Seus dados serão utilizados apenas para a simulação e proposta comercial. Respeitamos sua privacidade.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
