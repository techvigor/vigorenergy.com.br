import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Tire suas dúvidas', href: '#faq' },
    { label: 'Seja Parceiro', href: '/parceiros', external: true },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState('#vantagens');

    return (
        <header className="fixed top-4 md:top-6 left-0 w-full z-50 flex justify-center px-4">
            {/* Pill Container */}
            <nav className="relative w-full max-w-6xl bg-white/95 backdrop-blur-xl border border-gray-light/60 rounded-full px-5 md:px-6 py-2.5 md:py-3 flex items-center justify-between shadow-lg">

                {/* Logo */}
                <a href="#" className="flex items-center shrink-0 z-10" onClick={() => setActiveRoute('')}>
                    <img src="/logomarca_transp.png" alt="Vigor Energy" className="h-6 md:h-7" />
                </a>

                {/* Center Links (Desktop only) */}
                <div className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => {
                        const isActive = activeRoute === link.href;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => !link.external && setActiveRoute(link.href)}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                    ? 'text-primary bg-primary/10 shadow-sm'
                                    : 'text-text-muted hover:text-primary hover:bg-primary/5'
                                    }`}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </div>

                {/* Right CTA (Desktop only) */}
                <div className="hidden md:flex items-center shrink-0 z-10">
                    <a
                        href="#simulador"
                        className="bg-accent inline-flex items-center justify-center px-6 py-2 rounded-full border border-gray-light/60 text-text-dark text-md font-bold hover:border-accent hover:animate-pulse-orange transition-all duration-300"
                    >
                        Simular economia
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-full text-text-dark hover:bg-offwhite transition-colors z-10"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden absolute top-full left-4 right-4 mt-2 bg-white border border-gray-light/60 rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-xl shadow-xl ${open ? 'max-h-80 opacity-100 p-2' : 'max-h-0 opacity-0 p-0 border-transparent'
                    }`}
            >
                <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => {
                                if (!link.external) {
                                    setActiveRoute(link.href);
                                    setOpen(false);
                                }
                            }}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${activeRoute === link.href
                                ? 'bg-primary/10 text-primary shadow-sm'
                                : 'text-text-muted hover:bg-primary/5 hover:text-primary'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="h-px w-full bg-gray-light/60 my-1" />
                    <a
                        href="#simular"
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 rounded-2xl text-sm font-medium text-accent hover:bg-accent/10 transition-colors text-center mt-1 outline outline-1 outline-accent/30"
                    >
                        Simular Agora
                    </a>
                </nav>
            </div>
        </header>
    );
}
