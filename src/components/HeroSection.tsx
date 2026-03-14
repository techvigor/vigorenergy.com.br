import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import CLOUDS from 'vanta/dist/vanta.clouds.min';

export default function HeroSection() {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        if (!vantaEffect.current && vantaRef.current) {
            vantaEffect.current = CLOUDS({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                backgroundColor: 0x0,
                skyColor: 0x29a8cf,
                cloudColor: 0xadc1de,
                cloudShadowColor: 0x183550,
                sunColor: 0xff9919,
                sunGlareColor: 0xff6633,
                sunlightColor: 0xff9933,
                speed: 1.1,
            });
        }
        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-vigor-dark"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: "url('/usina_2.png')" }}
            />

            {/* Vanta Clouds Overlay - Moved AFTER background and increased opacity/z-index. Added scale-y-[-1] to flip it. */}
            <div ref={vantaRef} className="absolute inset-0 z-[1] opacity-100 mix-blend-overlay pointer-events-none scale-y-[-1]" />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-[2]" />

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
                    <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl leading-relaxed font-medium">
                        Assine energia solar e comece a economizar imediatamente.
                        Sem obras, sem equipamentos, sem burocracia. Energia limpa direto na sua conta.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#simulador"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent text-white font-bold text-base hover:bg-accent-hover transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 animate-pulse-orange"
                        >
                            Simular minha economia
                        </a>
                    </div>
                </div>
            </div>
        </section >
    );
}
