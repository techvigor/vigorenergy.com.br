import { Star, BarChart3, Bell, Shield } from 'lucide-react';

const appFeatures = [
    { icon: BarChart3, text: 'Acompanhe sua economia em tempo real' },
    { icon: Bell, text: 'Notificações de fatura e consumo' },
    { icon: Star, text: 'Histórico completo de economia' },
    { icon: Shield, text: 'Dados protegidos e seguros' },
];

export default function AppPromo() {
    return (
        <section id="app" className="py-20 md:py-28 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Phone Mockup */}
                    <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative">
                            {/* Phone Frame 1 */}
                            <div className="w-56 md:w-64 h-[440px] md:h-[500px] rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-dark shadow-2xl p-3 relative z-10">
                                <div className="w-full h-full rounded-[2rem] bg-white overflow-hidden flex flex-col">
                                    {/* Status bar */}
                                    <div className="bg-primary px-4 py-3 flex items-center justify-between">
                                        <span className="text-white text-xs font-semibold">Vigor Energy</span>
                                        <div className="flex gap-1">
                                            <div className="w-3 h-3 rounded-full bg-accent" />
                                            <div className="w-3 h-3 rounded-full bg-white/30" />
                                        </div>
                                    </div>
                                    {/* App Content */}
                                    <div className="p-4 flex-1 flex flex-col gap-3">
                                        <div className="text-xs text-text-muted">Sua economia</div>
                                        <div className="text-2xl font-extrabold text-primary">R$ 1.284,00</div>
                                        <div className="text-xs text-accent font-semibold">↑ 28% este mês</div>
                                        <div className="mt-2 bg-offwhite rounded-xl p-3 space-y-2">
                                            <div className="flex justify-between text-xs"><span className="text-text-muted">Jan</span><span className="font-semibold">R$ 89</span></div>
                                            <div className="flex justify-between text-xs"><span className="text-text-muted">Fev</span><span className="font-semibold">R$ 102</span></div>
                                            <div className="flex justify-between text-xs"><span className="text-text-muted">Mar</span><span className="font-semibold">R$ 95</span></div>
                                        </div>
                                        <div className="mt-auto bg-accent rounded-xl py-2.5 text-center text-white text-xs font-bold">
                                            Ver detalhes
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Phone Frame 2 (behind) */}
                            <div className="absolute top-8 left-20 md:left-24 w-56 md:w-64 h-[440px] md:h-[500px] rounded-[2.5rem] bg-gradient-to-br from-primary-light to-primary shadow-xl p-3 -z-0 opacity-60 rotate-6">
                                <div className="w-full h-full rounded-[2rem] bg-white/80" />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="order-1 lg:order-2">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                            Aplicativo
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-6">
                            Tudo na palma da sua mão
                        </h2>
                        <p className="text-text-muted text-lg mb-8 leading-relaxed">
                            Baixe o aplicativo Vigor Energy e acompanhe sua economia, gerencie
                            sua assinatura e receba notificações importantes diretamente no
                            seu celular.
                        </p>

                        {/* Features list */}
                        <div className="space-y-4 mb-10">
                            {appFeatures.map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Icon className="text-accent" size={20} />
                                    </div>
                                    <span className="text-text-dark font-medium">{text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Download Badges */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#"
                                className="inline-flex items-center gap-3 bg-text-dark text-white px-5 py-3 rounded-xl hover:bg-black transition-colors duration-200"
                            >
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] leading-none opacity-70">Baixe na</div>
                                    <div className="text-sm font-semibold leading-tight">App Store</div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-3 bg-text-dark text-white px-5 py-3 rounded-xl hover:bg-black transition-colors duration-200"
                            >
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path d="M3.18 23.75c-.36 0-.63-.06-.85-.17-.55-.28-.87-.85-.87-1.56V2c0-.72.33-1.3.89-1.57.56-.28 1.24-.2 1.84.2l13.6 7.75c.6.34.95.82.95 1.31v4.63c0 .49-.35.97-.95 1.31L4.18 23.38c-.37.21-.72.37-1 .37zM3.96 2.5v19l12.5-7.12V9.62L3.96 2.5z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] leading-none opacity-70">Disponível no</div>
                                    <div className="text-sm font-semibold leading-tight">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
