import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Tire suas dúvidas', href: '#faq' },
    { label: 'Blog', href: '/blog', page: true },
    { label: 'Seja Parceiro', href: '/parceiros', external: true },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState('#vantagens');
    const location = useLocation();

    // Dynamically set active route highlight based on URL
    useEffect(() => {
        if (location.pathname === '/') {
            if (location.hash) {
                setActiveRoute(location.hash);
            } else {
                setActiveRoute('');
            }
        } else if (location.pathname.startsWith('/blog')) {
            setActiveRoute('/blog');
        } else {
            setActiveRoute(location.pathname);
        }
    }, [location.pathname, location.hash]);

    // Handle scroll to hash elements dynamically
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                const timer = setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [location.hash, location.pathname]);

    return (
        <header className="fixed top-4 md:top-6 left-0 w-full z-50 flex justify-center px-4">
            {/* Pill Container */}
            <nav className="relative w-full max-w-6xl bg-white/95 backdrop-blur-xl border border-gray-light/60 rounded-full px-5 md:px-6 py-2.5 md:py-3 flex items-center justify-between shadow-lg">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center shrink-0 z-10"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <img src="/logomarca_transp.png" alt="Vigor Energy" className="h-6 md:h-7" />
                </Link>

                {/* Center Links (Desktop only) */}
                <div className="hidden lg:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => {
                        const isActive = activeRoute === link.href;
                        const className = `relative px-3 lg:px-4 xl:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive
                            ? 'text-primary bg-primary/10 shadow-sm'
                            : 'text-text-muted hover:text-primary hover:bg-primary/5'
                            }`;

                        if (link.external) {
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={className}
                                >
                                    {link.label}
                                </a>
                            );
                        }

                        const targetPath = link.page ? link.href : `/${link.href}`;

                        return (
                            <Link
                                key={link.href}
                                to={targetPath}
                                className={className}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right CTA (Desktop only) */}
                <div className="hidden lg:flex items-center shrink-0 z-10">
                    <Link
                        to="/#simulador"
                        className="bg-accent inline-flex items-center justify-center px-6 py-2 rounded-full border border-gray-light/60 text-text-dark text-md font-bold hover:border-accent hover:animate-pulse-orange transition-all duration-300"
                    >
                        Simular economia
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden p-2 rounded-full text-text-dark hover:bg-offwhite transition-colors z-10"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                className={`lg:hidden absolute top-full left-4 right-4 mt-2 bg-white border border-gray-light/60 rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-xl shadow-xl ${open ? 'max-h-80 opacity-100 p-2' : 'max-h-0 opacity-0 p-0 border-transparent'
                    }`}
            >
                <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                        const isActive = activeRoute === link.href;
                        const mobileClass = `px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${isActive
                            ? 'bg-primary/10 text-primary shadow-sm'
                            : 'text-text-muted hover:bg-primary/5 hover:text-primary'
                            }`;

                        if (link.external) {
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={mobileClass}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </a>
                            );
                        }

                        const targetPath = link.page ? link.href : `/${link.href}`;

                        return (
                            <Link
                                key={link.href}
                                to={targetPath}
                                onClick={() => setOpen(false)}
                                className={mobileClass}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div className="h-px w-full bg-gray-light/60 my-1" />
                    <Link
                        to="/#simulador"
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 rounded-2xl text-sm font-medium text-accent hover:bg-accent/10 transition-colors text-center mt-1 outline outline-1 outline-accent/30"
                    >
                        Simular Agora
                    </Link>
                </nav>
            </div>
        </header>
    );
}
