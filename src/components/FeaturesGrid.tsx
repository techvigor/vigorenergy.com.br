import { useEffect, useRef, useState } from 'react';

import {
    ShieldCheck,
    TrendingDown,
    Smartphone,
    Leaf,
    BadgePercent,
    Zap,
    PiggyBank
} from 'lucide-react';

const features = [
    {
        icon: TrendingDown,
        title: 'Economia na sua Conta',
        description:
            'Reduza sua conta de energia em até 28% após a aprovação da distribuidora local.',
    },
    {
        icon: ShieldCheck,
        title: 'Sem Investimento Inicial',
        description:
            'Não é necessário comprar painéis ou fazer qualquer tipo de obra na sua residência.',
    },
    {
        icon: Leaf,
        title: 'Energia 100% Limpa',
        description:
            'Contribua com o meio ambiente utilizando energia solar sustentável e renovável.',
    },
    {
        icon: BadgePercent,
        title: 'Garantia de 3 Meses',
        description:
            'Após começar a receber o desconto em sua fatura, você tem 3 meses de carência.',
    },
];

export default function FeaturesGrid() {
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const vantaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!vantaEffect && vantaRef.current && (window as any).VANTA) {
            const effect = (window as any).VANTA.DOTS({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xed7d2d,
                color2: 0xffffff,
                backgroundColor: 0xf7f7f7,
                size: 4.20,
                spacing: 30.00,
                showLines: false,
            });
            setVantaEffect(effect);
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <section id="vantagens" className="flex flex-col pt-0 pb-20 md:pb-28 relative z-20 bg-offwhite">
            {/* Vanta.js Background container */}
            <div ref={vantaRef} className="absolute opacity-30 inset-0 z-0" />

            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 relative z-20">

                {/* Overlapping Benefits Card (from Screenshot) */}
                <div className="relative z-20 -mt-20 md:-mt-20 mb-20 md:mb-32 bg-white rounded-[2rem] shadow-xl border border-gray-light/60 p-8 md:p-8 lg:p-12">

                    {/* Card Grid Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                        {/* Column 1 */}
                        <div>
                            <div className="mb-6">
                                <Zap className="text-primary" strokeWidth={1.5} size={36} />
                            </div>
                            <h3 className="text-xl font-bold text-text-dark mb-3">Investimento zero</h3>
                            <p className="text-text-muted leading-relaxed text-sm md:text-base">
                                Economize imediatamente sem a necessidade de comprar painéis solares, realizar obras pesadas ou adaptações na sua empresa ou residência.
                            </p>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <div className="mb-6">
                                <PiggyBank className="text-primary" strokeWidth={1.5} size={36} />
                            </div>
                            <h3 className="text-xl font-bold text-text-dark mb-3">Economia garantida</h3>
                            <p className="text-text-muted leading-relaxed text-sm md:text-base">
                                Reduza sua conta de luz em até 28% de forma previsível desde o primeiro mês, aliviando suas despesas fixas de longo prazo.
                            </p>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <div className="mb-6">
                                <Smartphone className="text-primary" strokeWidth={1.5} size={36} />
                            </div>
                            <h3 className="text-xl font-bold text-text-dark mb-3">Processo 100% digital</h3>
                            <p className="text-text-muted leading-relaxed text-sm md:text-base">
                                Todo o processo é online, sem visitas técnicas e sem alterações no imóvel. Simples, rápido e na palma da sua mão.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className="text-center mb-16 relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                        Vantagens
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                        Nossas principais vantagens
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Descubra por que milhares de clientes já escolheram a Vigor Energy
                        para economizar na conta de luz.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-light/60"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <Icon
                                    className="text-primary group-hover:text-white transition-colors duration-300"
                                    size={26}
                                />
                            </div>
                            <h3 className="text-xl font-bold text-text-dark mb-2">{title}</h3>
                            <p className="text-text-muted leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
