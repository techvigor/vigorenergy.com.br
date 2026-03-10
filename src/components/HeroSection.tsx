export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/usina.jpg')" }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-32 pb-40 md:pt-40 md:pb-40">
                <div className="max-w-6xl">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-6 backdrop-blur-sm border border-accent/30">
                        Energia Solar por Assinatura
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                        Reduza sua conta de luz em até{' '}
                        <span className="text-accent">28%</span> sem investir nada
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                        Assine energia solar e comece a economizar imediatamente. Sem obras,
                        sem equipamentos, sem burocracia. Energia limpa direto na sua conta.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#simular"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent text-white font-bold text-base hover:bg-accent-hover transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Simular minha economia
                        </a>
                        <a
                            href="#vantagens"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                        >
                            Saiba mais
                        </a>
                    </div>
                </div>
            </div>


        </section>
    );
}
