import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    billAmount: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    billAmount?: string;
}

export default function SimulatorForm() {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        billAmount: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    function validate(): FormErrors {
        const errs: FormErrors = {};
        if (!form.name.trim()) errs.name = 'Nome é obrigatório';
        if (!form.email.trim()) errs.email = 'E-mail é obrigatório';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = 'E-mail inválido';
        if (!form.phone.trim()) errs.phone = 'Telefone é obrigatório';
        else if (form.phone.replace(/\D/g, '').length < 10)
            errs.phone = 'Telefone inválido';
        if (!form.billAmount.trim()) errs.billAmount = 'Valor é obrigatório';
        else if (Number(form.billAmount.replace(/\D/g, '')) <= 0)
            errs.billAmount = 'Informe um valor válido';
        return errs;
    }

    function formatPhone(value: string) {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 2) return digits;
        if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    function formatCurrency(value: string) {
        const digits = value.replace(/\D/g, '');
        if (!digits) return '';
        const num = parseInt(digits, 10);
        return num.toLocaleString('pt-BR');
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    billAmount: Number(form.billAmount.replace(/\D/g, '')),
                }),
            });
            if (!res.ok) throw new Error('Erro ao enviar');
            setStatus('success');
        } catch {
            setStatus('error');
        }
    }

    function handleChange(field: keyof FormData, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (status === 'success') {
        return (
            <section id="simular" className="py-20 md:py-28 bg-offwhite">
                <div className="max-w-xl mx-auto px-4 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-light/60">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-primary" size={32} />
                        </div>
                        <h3 className="text-2xl font-extrabold text-text-dark mb-3">
                            Simulação enviada com sucesso!
                        </h3>
                        <p className="text-text-muted text-lg">
                            Nossa equipe entrará em contato em breve com os detalhes da sua
                            economia.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="simular" className="py-20 md:py-28 bg-offwhite">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Text */}
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
                            Simulação Gratuita
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-6">
                            Descubra quanto você pode economizar
                        </h2>
                        <p className="text-text-muted text-lg mb-8 leading-relaxed">
                            Preencha o formulário ao lado e receba uma simulação personalizada
                            da sua economia com energia solar. É rápido, simples e sem
                            compromisso.
                        </p>
                        <div className="space-y-4">
                            {[
                                'Sem necessidade de cartão de crédito',
                                'Resposta em até 24 horas',
                                'Consultoria gratuita e personalizada',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                                    <span className="text-text-dark font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-light/60">
                        <h3 className="text-xl font-bold text-text-dark mb-6">
                            Simule sua economia
                        </h3>

                        {status === 'error' && (
                            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                <AlertCircle size={18} />
                                Ocorreu um erro. Tente novamente.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-text-dark mb-1.5">
                                    Nome completo
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="Seu nome"
                                    className={`w-full px-4 py-3 rounded-xl border bg-offwhite text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.name ? 'border-red-400' : 'border-gray-light'
                                        }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-text-dark mb-1.5">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="seu@email.com"
                                    className={`w-full px-4 py-3 rounded-xl border bg-offwhite text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.email ? 'border-red-400' : 'border-gray-light'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-text-dark mb-1.5">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) =>
                                        handleChange('phone', formatPhone(e.target.value))
                                    }
                                    placeholder="(00) 00000-0000"
                                    className={`w-full px-4 py-3 rounded-xl border bg-offwhite text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.phone ? 'border-red-400' : 'border-gray-light'
                                        }`}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Bill Amount */}
                            <div>
                                <label className="block text-sm font-semibold text-text-dark mb-1.5">
                                    Valor médio da conta (R$)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">
                                        R$
                                    </span>
                                    <input
                                        type="text"
                                        value={form.billAmount}
                                        onChange={(e) =>
                                            handleChange('billAmount', formatCurrency(e.target.value))
                                        }
                                        placeholder="350"
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-offwhite text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.billAmount ? 'border-red-400' : 'border-gray-light'
                                            }`}
                                    />
                                </div>
                                {errors.billAmount && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.billAmount}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full flex items-center justify-center gap-2 bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent-hover transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Simular minha economia
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-xs text-text-muted text-center mt-4">
                            Seus dados estão protegidos e não serão compartilhados.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
