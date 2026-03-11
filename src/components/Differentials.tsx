import { CheckCircle } from 'lucide-react';
import EnergyDistributionAnimation from './EnergyDistributionAnimation';
import SmartMonitoringAnimation from './SmartMonitoringAnimation';
import HumanizedServiceAnimation from './HumanizedServiceAnimation';

interface DifferentialItem {
    title: string;
    description: string;
    points: string[];
    imagePosition: 'left' | 'right';
    gradient: string;
}

const differentials: DifferentialItem[] = [
    {
        title: 'Energia Solar Sem Obras',
        description:
            'Diferente dos modelos tradicionais, você não precisa instalar nenhum equipamento. Nossa fazenda solar gera a energia e os créditos vão direto para sua conta de luz.',
        points: [
            'Sem necessidade de telhado próprio',
            'Sem obras ou reformas em casa',
            'Processo 100% digital',
        ],
        imagePosition: 'left',
        gradient: 'from-primary/20 to-primary/5',
    },
    {
        title: 'Monitoramento Inteligente',
        description:
            'Acompanhe cada kilowatt gerado e economizado. Nosso sistema de telemetria monitora as usinas em tempo real para garantir a máxima eficiência.',
        points: [
            'Dashboard em tempo real',
            'Relatórios mensais detalhados',
            'Alertas de economia personalizados',
        ],
        imagePosition: 'right',
        gradient: 'from-accent/20 to-accent/5',
    },
    {
        title: 'Atendimento Humanizado',
        description:
            'Nossa equipe está disponível para tirar todas as suas dúvidas e te acompanhar em cada etapa. Do primeiro contato à sua primeira economia.',
        points: [
            'Suporte dedicado via WhatsApp',
            'Consultores especializados',
            'Acompanhamento contínuo',
        ],
        imagePosition: 'left',
        gradient: 'from-primary/15 to-primary-light/5',
    },
];

function DifferentialCard({ imagePosition, gradient }: { imagePosition: 'left' | 'right'; gradient: string }) {
    return (
        <div className={`rounded-2xl bg-gradient-to-br ${gradient} aspect-[4/3] flex items-center justify-center overflow-hidden`}>
            <div className="w-full h-full flex items-center justify-center p-8">
                <div className={`w-full max-w-xs space-y-3 ${imagePosition === 'left' ? '' : ''}`}>
                    {/* Simulated dashboard card */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="h-2 bg-gray-light rounded-full w-3/4" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-light rounded-full" />
                            <div className="h-2 bg-gray-light rounded-full w-5/6" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-accent" />
                            </div>
                            <div className="flex-1 space-y-1.5">
                                <div className="h-2 bg-gray-light rounded-full w-2/3" />
                                <div className="h-1.5 bg-gray-light rounded-full w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Differentials() {
    return (
        <section id="diferenciais" className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
                        Diferenciais
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                        Por que escolher a Vigor Energy?
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Nosso compromisso é oferecer a melhor experiência em energia solar
                        por assinatura do Brasil.
                    </p>
                </div>

                {/* Differential Rows */}
                <div className="space-y-16 md:space-y-24">
                    {differentials.map((item, index) => (
                        <div
                            key={item.title}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${item.imagePosition === 'right' ? '' : ''
                                }`}
                        >
                            {/* Image */}
                            <div
                                className={`${item.imagePosition === 'right'
                                        ? 'order-1 lg:order-2'
                                        : 'order-1'
                                    }`}
                            >
                                {index === 0 ? (
                                    <EnergyDistributionAnimation />
                                ) : index === 1 ? (
                                    <SmartMonitoringAnimation />
                                ) : index === 2 ? (
                                    <HumanizedServiceAnimation />
                                ) : (
                                    <DifferentialCard imagePosition={item.imagePosition} gradient={item.gradient} />
                                )}
                            </div>

                            {/* Text */}
                            <div
                                className={`${item.imagePosition === 'right'
                                        ? 'order-2 lg:order-1'
                                        : 'order-2'
                                    }`}
                            >
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-lg mb-4">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-text-dark mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-text-muted text-lg mb-6 leading-relaxed">
                                    {item.description}
                                </p>
                                <ul className="space-y-3">
                                    {item.points.map((point) => (
                                        <li key={point} className="flex items-center gap-3">
                                            <CheckCircle className="text-primary flex-shrink-0" size={20} />
                                            <span className="text-text-dark font-medium">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
