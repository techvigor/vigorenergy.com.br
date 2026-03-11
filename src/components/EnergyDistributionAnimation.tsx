export default function EnergyDistributionAnimation() {
    return (
        <div className="w-full max-w-[1200px] aspect-video bg-gradient-to-b from-slate-100 to-white rounded-2xl shadow-xl overflow-hidden relative">
            <svg className="w-full h-full block" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <path id="flowFac" d="M 960 240 L 800 310 Q 700 330 600 200 Q 500 280 400 250 Q 320 380 250 360 Q 180 370 100 220" />
                    <path id="flowHouse1" d="M 960 240 L 800 310 Q 700 330 600 200 Q 500 280 400 250 Q 320 380 250 360 Q 200 450 150 470" />
                    <path id="flowHouse2" d="M 960 240 L 800 310 Q 700 330 600 200 Q 500 280 400 250 Q 320 380 250 360 Q 270 450 280 520" />

                    <g id="solar-panel">
                        <rect x="-5" y="0" width="10" height="30" fill="#475569" />
                        <g transform="skewY(-15) rotate(-10)">
                            <rect x="-40" y="-20" width="80" height="50" fill="#2563eb" rx="2" stroke="#60a5fa" strokeWidth="2" />
                            <line x1="-20" y1="-20" x2="-20" y2="30" stroke="#60a5fa" strokeWidth="1" />
                            <line x1="0" y1="-20" x2="0" y2="30" stroke="#60a5fa" strokeWidth="1" />
                            <line x1="20" y1="-20" x2="20" y2="30" stroke="#60a5fa" strokeWidth="1" />
                            <line x1="-40" y1="5" x2="40" y2="5" stroke="#60a5fa" strokeWidth="1" />
                        </g>
                    </g>

                    <g id="tree">
                        <rect x="-3" y="0" width="6" height="20" fill="#78350f" rx="2" />
                        <circle cx="0" cy="-15" r="18" fill="#10b981" />
                        <circle cx="-10" cy="-8" r="12" fill="#059669" />
                        <circle cx="10" cy="-8" r="12" fill="#059669" />
                        <circle cx="0" cy="-25" r="10" fill="#34d399" />
                    </g>

                    <g id="tower">
                        <polygon points="0,105 -50,130 0,155 50,130" fill="#e2e8f0" />
                        <polygon points="-50,130 0,155 0,165 -50,140" fill="#94a3b8" />
                        <polygon points="0,155 50,130 50,140 0,165" fill="#cbd5e1" />

                        <line x1="0" y1="0" x2="-25" y2="130" stroke="#64748b" strokeWidth="4" />
                        <line x1="0" y1="0" x2="25" y2="130" stroke="#64748b" strokeWidth="4" />
                        <line x1="-12" y1="65" x2="12" y2="65" stroke="#94a3b8" strokeWidth="3" />
                        <line x1="-18" y1="95" x2="18" y2="95" stroke="#94a3b8" strokeWidth="3" />
                        <line x1="-35" y1="35" x2="35" y2="35" stroke="#475569" strokeWidth="4" />
                        <polygon points="0,-5 -35,35 0,70 35,35" fill="none" stroke="#94a3b8" strokeWidth="2" />
                    </g>
                </defs>

                <path d="M 100 100 Q 150 50 200 100 Q 250 80 300 120" fill="none" stroke="#e2e8f0" strokeWidth="40" strokeLinecap="round" />
                <path d="M 700 80 Q 750 40 800 90 Q 860 70 900 100" fill="none" stroke="#e2e8f0" strokeWidth="30" strokeLinecap="round" />

                <circle cx="1050" cy="120" r="45" fill="#fef08a" opacity="0.4">
                    <animate attributeName="r" values="45;55;45" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="1050" cy="120" r="30" fill="#fde047" />

                <ellipse cx="980" cy="240" rx="240" ry="120" fill="rgba(0,0,0,0.04)" />
                <ellipse cx="800" cy="380" rx="60" ry="20" fill="rgba(0,0,0,0.06)" />
                <ellipse cx="600" cy="345" rx="55" ry="20" fill="rgba(0,0,0,0.06)" />
                <ellipse cx="400" cy="395" rx="55" ry="20" fill="rgba(0,0,0,0.06)" />
                <ellipse cx="250" cy="415" rx="45" ry="15" fill="rgba(0,0,0,0.06)" />
                <ellipse cx="100" cy="300" rx="60" ry="20" fill="rgba(0,0,0,0.06)" />
                <ellipse cx="150" cy="540" rx="45" ry="15" fill="rgba(0,0,0,0.06)" />
                <ellipse cx="280" cy="590" rx="40" ry="15" fill="rgba(0,0,0,0.06)" />

                <path d="M 960 240 L 800 310" stroke="#94a3b8" strokeWidth="2" fill="none" />
                <path d="M 800 310 Q 700 330 600 200" stroke="#94a3b8" strokeWidth="2" fill="none" />
                <path d="M 600 200 Q 500 280 400 250" stroke="#94a3b8" strokeWidth="2" fill="none" />
                <path d="M 400 250 Q 320 380 250 360" stroke="#94a3b8" strokeWidth="2" fill="none" />
                <path d="M 250 360 Q 180 370 100 220" stroke="#94a3b8" strokeWidth="2" fill="none" />
                <path d="M 250 360 Q 200 450 150 470" stroke="#94a3b8" strokeWidth="2" fill="none" />
                <path d="M 250 360 Q 270 450 280 520" stroke="#94a3b8" strokeWidth="2" fill="none" />

                <use href="#tree" x="350" y="220" transform="scale(0.8)" />
                <use href="#tree" x="480" y="320" transform="scale(0.9)" />
                <use href="#tree" x="700" y="240" transform="scale(0.7)" />

                <g id="solar-farm-base">
                    <polygon points="980,100 740,220 980,340 1220,220" fill="#86efac" />
                    <polygon points="740,220 980,340 980,360 740,240" fill="#b45309" />
                    <polygon points="980,340 1220,220 1220,240 980,360" fill="#78350f" />

                    <g fill="rgba(0,0,0,0.08)">
                        <ellipse cx="960" cy="190" rx="35" ry="12" />
                        <ellipse cx="1040" cy="230" rx="35" ry="12" />
                        <ellipse cx="1120" cy="270" rx="35" ry="12" />
                        <ellipse cx="880" cy="230" rx="35" ry="12" />
                        <ellipse cx="960" cy="270" rx="35" ry="12" />
                        <ellipse cx="1040" cy="310" rx="35" ry="12" />
                    </g>

                    <circle cx="800" cy="220" r="10" fill="#10b981" />
                    <circle cx="820" cy="230" r="15" fill="#059669" />
                    <circle cx="1140" cy="270" r="12" fill="#10b981" />
                    <circle cx="1160" cy="260" r="8" fill="#34d399" />
                    <circle cx="1060" cy="150" r="10" fill="#059669" />
                </g>

                <use href="#solar-panel" x="960" y="160" />
                <use href="#solar-panel" x="1040" y="200" />
                <use href="#solar-panel" x="1120" y="240" />

                <use href="#solar-panel" x="880" y="200" />
                <use href="#solar-panel" x="960" y="240" />
                <use href="#solar-panel" x="1040" y="280" />

                <g transform="translate(800, 310)">
                    <polygon points="0,35 -55,62.5 0,90 55,62.5" fill="#e2e8f0" />
                    <polygon points="-55,62.5 0,90 0,100 -55,72.5" fill="#94a3b8" />
                    <polygon points="0,90 55,62.5 55,72.5 0,100" fill="#cbd5e1" />

                    <rect x="-40" y="0" width="80" height="50" fill="#e2e8f0" rx="4" />
                    <rect x="-30" y="10" width="20" height="40" fill="#38bdf8" />
                    <rect x="10" y="10" width="20" height="40" fill="#38bdf8" />
                    <circle cx="0" cy="0" r="5" fill="#f59e0b" filter="url(#glow)" />
                </g>

                <use href="#tower" x="600" y="200" />
                <use href="#tower" x="400" y="250" />

                <circle cx="600" cy="200" r="4" fill="#cbd5e1" />
                <circle cx="400" cy="250" r="4" fill="#cbd5e1" />

                <g transform="translate(250, 360)">
                    <rect x="-35" y="10" width="70" height="40" fill="#cbd5e1" rx="4" />
                    <rect x="-25" y="-10" width="10" height="20" fill="#94a3b8" />
                    <rect x="15" y="-10" width="10" height="20" fill="#94a3b8" />
                    <circle cx="0" cy="0" r="5" fill="#f59e0b" filter="url(#glow)" />
                </g>

                <g transform="translate(100, 220)">
                    <circle cx="20" cy="-60" r="12" fill="#e2e8f0" opacity="0.8">
                        <animate attributeName="cy" values="-60;-90;-120" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="r" values="12;18;25" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.3;0" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <rect x="-50" y="0" width="100" height="70" fill="#475569" rx="2" />
                    <polygon points="-60,0 0,-40 60,0" fill="#334155" />
                    <rect x="10" y="-60" width="20" height="50" fill="#64748b" />
                    <rect x="-30" y="20" width="15" height="15" fill="#fde047" opacity="0.8" />
                    <rect x="-5" y="20" width="15" height="15" fill="#fde047" opacity="0.8" />
                    <rect x="20" y="20" width="15" height="15" fill="#fde047" opacity="0.8" />
                </g>

                <g transform="translate(150, 470)">
                    <rect x="-35" y="0" width="70" height="50" fill="#f8fafc" rx="2" />
                    <polygon points="-45,0 0,-35 45,0" fill="#0284c7" />
                    <rect x="-10" y="20" width="20" height="30" fill="#334155" />
                    <rect x="-25" y="10" width="12" height="12" fill="#fde047" filter="url(#glow)" />
                    <rect x="13" y="10" width="12" height="12" fill="#fde047" filter="url(#glow)" />
                </g>

                <g transform="translate(280, 520)">
                    <rect x="-30" y="0" width="60" height="45" fill="#f1f5f9" rx="2" />
                    <polygon points="-40,0 0,-30 40,0" fill="#0369a1" />
                    <rect x="-10" y="15" width="20" height="30" fill="#475569" />
                    <rect x="-20" y="10" width="10" height="15" fill="#fde047" filter="url(#glow)" />
                </g>

                <use href="#tree" x="80" y="320" transform="scale(1.2)" />
                <use href="#tree" x="200" y="520" transform="scale(1)" />
                <use href="#tree" x="350" y="550" transform="scale(1.1)" />
                <use href="#tree" x="300" y="420" transform="scale(0.8)" />
                <use href="#tree" x="500" y="260" transform="scale(0.9)" />
                <use href="#tree" x="850" y="400" transform="scale(1.3)" />

                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="8s" repeatCount="indefinite" begin="0s"><mpath href="#flowFac" /></animateMotion>
                </circle>
                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="8s" repeatCount="indefinite" begin="2.6s"><mpath href="#flowFac" /></animateMotion>
                </circle>
                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="8s" repeatCount="indefinite" begin="5.3s"><mpath href="#flowFac" /></animateMotion>
                </circle>

                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="8.5s" repeatCount="indefinite" begin="1s"><mpath href="#flowHouse1" /></animateMotion>
                </circle>
                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="8.5s" repeatCount="indefinite" begin="3.8s"><mpath href="#flowHouse1" /></animateMotion>
                </circle>
                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="8.5s" repeatCount="indefinite" begin="6.6s"><mpath href="#flowHouse1" /></animateMotion>
                </circle>

                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="9s" repeatCount="indefinite" begin="0.5s"><mpath href="#flowHouse2" /></animateMotion>
                </circle>
                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="9s" repeatCount="indefinite" begin="3.5s"><mpath href="#flowHouse2" /></animateMotion>
                </circle>
                <circle r="6" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion dur="9s" repeatCount="indefinite" begin="6.5s"><mpath href="#flowHouse2" /></animateMotion>
                </circle>

            </svg>
        </div>
    );
}
