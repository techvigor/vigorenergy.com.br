import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Target } from 'lucide-react';

const quickLinks = [
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Diferenciais', href: '#diferenciais' },

    { label: 'Simulação', href: '#simular' },
    { label: 'FAQ', href: '#faq' },
];

const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/vigorenergyoficial/', target: '_blank', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/vigor-energy/', target: '_blank', label: 'LinkedIn' },
];

export default function Footer() {
    return (
        <footer id="contato" className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    {/* Logo & About */}
                    <div className="lg:col-span-1">
                        <img src="/logo.svg" alt="Vigor Energy" className="h-9 mb-4 brightness-0 invert" />
                        <p className="text-white/70 text-sm leading-relaxed">
                            Energia solar por assinatura. Economia garantida, sem
                            complexidade. Junte-se a milhares de clientes que já estão
                            economizando.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base font-bold mb-4">Links Rápidos</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 text-sm hover:text-accent transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-base font-bold mb-4">Contato</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-accent flex-shrink-0 mt-0.5" size={16} />
                                <span className="text-white/70 text-sm">
                                    R. 7, 530 - St. Oeste
                                    <br />
                                    Goiânia - GO, 74110-090
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-accent flex-shrink-0" size={16} />
                                <a
                                    href="tel:+5562991183449"
                                    className="text-white/70 text-sm hover:text-accent transition-colors"
                                >
                                    (62) 99118-3449
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-accent flex-shrink-0" size={16} />
                                <a
                                    href="mailto:contato@vigorenergy.com.br"
                                    className="text-white/70 text-sm hover:text-accent transition-colors"
                                >
                                    contato@vigorenergy.com.br
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social + Newsletter */}
                    <div>
                        <h4 className="text-base font-bold mb-4">Redes Sociais</h4>
                        <div className="flex gap-3 mb-6">
                            {socialLinks.map(({ icon: Icon, href, target, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={target}
                                    aria-label={label}
                                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent transition-colors duration-200"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                        <p className="text-white/50 text-xs">
                            Siga-nos nas redes sociais e fique por dentro das novidades e dicas
                            de economia.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} Vigor Energy. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-white/50 text-sm hover:text-white/80 transition-colors"
                        >
                            Política de Privacidade
                        </a>
                        <a
                            href="#"
                            className="text-white/50 text-sm hover:text-white/80 transition-colors"
                        >
                            Termos de Uso
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
