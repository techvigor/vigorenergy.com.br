export default function SmartMonitoringAnimation() {
    return (
        <div className="w-full max-w-[1200px] aspect-video relative overflow-hidden">
            <svg className="w-full h-full block" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* Data flows */}
                    <path id="p1" d="M 195 200 L 250 200 Q 300 200 300 250 L 300 350" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />
                    <path id="p2" d="M 195 550 L 250 550 Q 300 550 300 500 L 300 350" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />
                    <path id="p3" d="M 1005 200 L 950 200 Q 900 200 900 250 L 900 350" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />
                    <path id="p4" d="M 1005 550 L 950 550 Q 900 550 900 500 L 900 350" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />

                    {/* Dashboard Inner Clip */}
                    <clipPath id="dash-clip">
                        <rect x="300" y="150" width="600" height="400" rx="16" />
                    </clipPath>
                </defs>

                {/* NODES */}

                {/* Node 1: Solar Farm (Top Left) */}
                <circle cx="150" cy="200" r="45" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
                <g transform="translate(150, 200) scale(0.7) translate(-20, -10)">
                    <rect x="-5" y="0" width="10" height="30" fill="#475569" />
                    <g transform="skewY(-15) rotate(-10)">
                        <rect x="-40" y="-20" width="80" height="50" fill="#0284c7" rx="2" stroke="#60a5fa" strokeWidth="2" />
                        <line x1="-20" y1="-20" x2="-20" y2="30" stroke="#60a5fa" strokeWidth="1" />
                        <line x1="0" y1="-20" x2="0" y2="30" stroke="#60a5fa" strokeWidth="1" />
                        <line x1="20" y1="-20" x2="20" y2="30" stroke="#60a5fa" strokeWidth="1" />
                        <line x1="-40" y1="5" x2="40" y2="5" stroke="#60a5fa" strokeWidth="1" />
                    </g>
                </g>
                <circle cx="150" cy="200" r="45" fill="none" stroke="#F6A937" strokeWidth="2" strokeDasharray="10 10">
                    <animateTransform attributeName="transform" type="rotate" from="0 150 200" to="360 150 200" dur="10s" repeatCount="indefinite" />
                </circle>

                {/* Node 2: Battery (Bottom Left) */}
                <circle cx="150" cy="550" r="45" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
                <g transform="translate(150, 550)">
                    <rect x="-15" y="-20" width="30" height="40" rx="3" fill="#cbd5e1" />
                    <rect x="-8" y="-25" width="16" height="5" fill="#94a3b8" />
                    <rect x="-10" y="-5" width="20" height="20" fill="#5F6C37" />
                    <circle cx="0" cy="5" r="3" fill="#F6A937" filter="url(#glow)" />
                </g>
                <circle cx="150" cy="550" r="45" fill="none" stroke="#5F6C37" strokeWidth="2" strokeDasharray="10 10">
                    <animateTransform attributeName="transform" type="rotate" from="360 150 550" to="0 150 550" dur="12s" repeatCount="indefinite" />
                </circle>

                {/* Node 3: Grid (Top Right) */}
                <circle cx="1050" cy="200" r="45" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
                <g transform="translate(1050, 195) scale(0.4)">
                    <line x1="0" y1="-20" x2="-25" y2="70" stroke="#64748b" strokeWidth="4" />
                    <line x1="0" y1="-20" x2="25" y2="70" stroke="#64748b" strokeWidth="4" />
                    <line x1="-12" y1="20" x2="12" y2="20" stroke="#94a3b8" strokeWidth="3" />
                    <line x1="-18" y1="45" x2="18" y2="45" stroke="#94a3b8" strokeWidth="3" />
                    <line x1="-35" y1="0" x2="35" y2="0" stroke="#475569" strokeWidth="4" />
                    <polygon points="0,-20 -35,0 0,35 35,0" fill="none" stroke="#94a3b8" strokeWidth="2" />
                </g>
                <circle cx="1050" cy="200" r="45" fill="none" stroke="#727F48" strokeWidth="2" strokeDasharray="10 10">
                    <animateTransform attributeName="transform" type="rotate" from="0 1050 200" to="360 1050 200" dur="15s" repeatCount="indefinite" />
                </circle>

                {/* Node 4: House (Bottom Right) */}
                <circle cx="1050" cy="550" r="45" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
                <g transform="translate(1050, 555) scale(0.7)">
                    <rect x="-30" y="-15" width="60" height="40" fill="#cbd5e1" rx="2" />
                    <polygon points="-40,-15 0,-45 40,-15" fill="#4A5528" />
                    <rect x="-10" y="5" width="20" height="20" fill="#334155" />
                    <rect x="-20" y="0" width="8" height="8" fill="#F6A937" filter="url(#glow)" />
                    <rect x="12" y="0" width="8" height="8" fill="#F6A937" filter="url(#glow)" />
                </g>
                <circle cx="1050" cy="550" r="45" fill="none" stroke="#E89A20" strokeWidth="2" strokeDasharray="10 10">
                    <animateTransform attributeName="transform" type="rotate" from="360 1050 550" to="0 1050 550" dur="11s" repeatCount="indefinite" />
                </circle>

                {/* DATA PARTICLES ON PATHS */}
                <use href="#p1" />
                <use href="#p2" />
                <use href="#p3" />
                <use href="#p4" />

                <circle r="4" fill="#F6A937" filter="url(#glow)">
                    <animateMotion dur="3s" repeatCount="indefinite" begin="0s"><mpath href="#p1" /></animateMotion>
                </circle>
                <circle r="4" fill="#F6A937" filter="url(#glow)">
                    <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s"><mpath href="#p1" /></animateMotion>
                </circle>

                <circle r="4" fill="#5F6C37" filter="url(#glow)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s"><mpath href="#p2" /></animateMotion>
                </circle>
                <circle r="4" fill="#5F6C37" filter="url(#glow)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" begin="2.25s"><mpath href="#p2" /></animateMotion>
                </circle>

                <circle r="4" fill="#F6A937" filter="url(#glow)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.2s"><mpath href="#p3" /></animateMotion>
                </circle>
                <circle r="4" fill="#F6A937" filter="url(#glow)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" begin="1.95s"><mpath href="#p3" /></animateMotion>
                </circle>

                <circle r="4" fill="#5F6C37" filter="url(#glow)">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin="0.8s"><mpath href="#p4" /></animateMotion>
                </circle>
                <circle r="4" fill="#5F6C37" filter="url(#glow)">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin="2.4s"><mpath href="#p4" /></animateMotion>
                </circle>

                {/* MAIN DASHBOARD */}
                <g>
                    {/* Floating animation for dashboard */}
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="6s" repeatCount="indefinite" />

                    <rect x="300" y="150" width="600" height="400" fill="#ffffff" stroke="#e2e8f0" strokeWidth="4" rx="16" />

                    <g clipPath="url(#dash-clip)">
                        {/* Header */}
                        <rect x="300" y="150" width="600" height="50" fill="#1F2937" />
                        {/* Window controls */}
                        <circle cx="325" cy="175" r="6" fill="#ef4444" />
                        <circle cx="345" cy="175" r="6" fill="#f59e0b" />
                        <circle cx="365" cy="175" r="6" fill="#10b981" />
                        <text x="600" y="181" fill="#f8fafc" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" textAnchor="middle" letterSpacing="1">VIGOR ENERGY</text>

                        {/* KPI Cards */}
                        {/* Card 1 */}
                        <rect x="320" y="220" width="170" height="80" fill="#f1f5f9" rx="8" />
                        <text x="335" y="245" fill="#64748b" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700">GERAÇÃO (MÊS)</text>
                        <text x="335" y="280" fill="#1e293b" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="800">4,280 kWh</text>
                        <circle cx="470" cy="240" r="5" fill="#10b981" filter="url(#glow)">
                            <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                        </circle>

                        {/* Card 2 */}
                        <rect x="515" y="220" width="170" height="80" fill="#f1f5f9" rx="8" />
                        <text x="530" y="245" fill="#64748b" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700">ECONOMIA (R$)</text>
                        <text x="530" y="280" fill="#5F6C37" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="800">R$ 1.250</text>
                        <path d="M 645 250 L 655 240 L 665 250 M 655 240 L 655 270" stroke="#5F6C37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                        {/* Card 3 */}
                        <rect x="710" y="220" width="170" height="80" fill="#f1f5f9" rx="8" />
                        <text x="725" y="245" fill="#64748b" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700">STATUS DA USINA</text>
                        <text x="725" y="280" fill="#F6A937" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="800">OTIMIZADA</text>

                        {/* Main Chart Background */}
                        <rect x="320" y="320" width="560" height="210" fill="#f8fafc" rx="8" />

                        {/* Grid lines */}
                        <g stroke="#e2e8f0" strokeWidth="1">
                            <line x1="320" y1="360" x2="880" y2="360" />
                            <line x1="320" y1="400" x2="880" y2="400" />
                            <line x1="320" y1="440" x2="880" y2="440" />
                            <line x1="320" y1="480" x2="880" y2="480" />
                        </g>

                        {/* Animated Bars */}
                        <g transform="translate(320, 530)">
                            <rect x="25" y="-120" width="25" height="120" rx="3" fill="#5F6C37">
                                <animate attributeName="y" values="-120;-160;-100;-120" dur="4s" repeatCount="indefinite" />
                                <animate attributeName="height" values="120;160;100;120" dur="4s" repeatCount="indefinite" />
                            </rect>
                            <rect x="70" y="-80" width="25" height="80" rx="3" fill="#727F48">
                                <animate attributeName="y" values="-80;-110;-60;-80" dur="3.5s" repeatCount="indefinite" />
                                <animate attributeName="height" values="80;110;60;80" dur="3.5s" repeatCount="indefinite" />
                            </rect>
                            <rect x="115" y="-150" width="25" height="150" rx="3" fill="#4A5528">
                                <animate attributeName="y" values="-150;-180;-120;-150" dur="4.2s" repeatCount="indefinite" />
                                <animate attributeName="height" values="150;180;120;150" dur="4.2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="160" y="-90" width="25" height="90" rx="3" fill="#F6A937">
                                <animate attributeName="y" values="-90;-130;-70;-90" dur="3.8s" repeatCount="indefinite" />
                                <animate attributeName="height" values="90;130;70;90" dur="3.8s" repeatCount="indefinite" />
                            </rect>
                            <rect x="205" y="-110" width="25" height="110" rx="3" fill="#5F6C37">
                                <animate attributeName="y" values="-110;-140;-90;-110" dur="4.5s" repeatCount="indefinite" />
                                <animate attributeName="height" values="110;140;90;110" dur="4.5s" repeatCount="indefinite" />
                            </rect>
                            <rect x="250" y="-160" width="25" height="160" rx="3" fill="#727F48">
                                <animate attributeName="y" values="-160;-190;-130;-160" dur="3.1s" repeatCount="indefinite" />
                                <animate attributeName="height" values="160;190;130;160" dur="3.1s" repeatCount="indefinite" />
                            </rect>
                            <rect x="295" y="-100" width="25" height="100" rx="3" fill="#4A5528">
                                <animate attributeName="y" values="-100;-120;-80;-100" dur="4.8s" repeatCount="indefinite" />
                                <animate attributeName="height" values="100;120;80;100" dur="4.8s" repeatCount="indefinite" />
                            </rect>
                            <rect x="340" y="-140" width="25" height="140" rx="3" fill="#F6A937">
                                <animate attributeName="y" values="-140;-170;-110;-140" dur="3.6s" repeatCount="indefinite" />
                                <animate attributeName="height" values="140;170;110;140" dur="3.6s" repeatCount="indefinite" />
                            </rect>
                            <rect x="385" y="-130" width="25" height="130" rx="3" fill="#5F6C37">
                                <animate attributeName="y" values="-130;-160;-90;-130" dur="4.1s" repeatCount="indefinite" />
                                <animate attributeName="height" values="130;160;90;130" dur="4.1s" repeatCount="indefinite" />
                            </rect>
                            <rect x="430" y="-170" width="25" height="170" rx="3" fill="#727F48">
                                <animate attributeName="y" values="-170;-200;-140;-170" dur="3.3s" repeatCount="indefinite" />
                                <animate attributeName="height" values="170;200;140;170" dur="3.3s" repeatCount="indefinite" />
                            </rect>
                            <rect x="475" y="-150" width="25" height="150" rx="3" fill="#F6A937">
                                <animate attributeName="y" values="-150;-180;-120;-150" dur="4.7s" repeatCount="indefinite" />
                                <animate attributeName="height" values="150;180;120;150" dur="4.7s" repeatCount="indefinite" />
                            </rect>
                        </g>

                        {/* Smooth Wave Path */}
                        <path d="M 320 480 C 370 410, 420 500, 480 430 C 540 360, 600 450, 660 380 C 720 310, 780 400, 880 340" fill="none" stroke="#F6A937" strokeWidth="4" strokeLinecap="round" opacity="0.8">
                            <animate attributeName="d" values="
                                M 320 480 C 370 410, 420 500, 480 430 C 540 360, 600 450, 660 380 C 720 310, 780 400, 880 340;
                                M 320 460 C 370 450, 420 420, 480 450 C 540 480, 600 400, 660 410 C 720 420, 780 350, 880 320;
                                M 320 480 C 370 410, 420 500, 480 430 C 540 360, 600 450, 660 380 C 720 310, 780 400, 880 340"
                                dur="6s" repeatCount="indefinite" />
                        </path>

                        {/* Glow points on the wave (animated position) */}
                        <circle cx="480" cy="430" r="6" fill="#F6A937" filter="url(#glow)">
                            <animate attributeName="cy" values="430;450;430" dur="6s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="660" cy="380" r="6" fill="#F6A937" filter="url(#glow)">
                            <animate attributeName="cy" values="380;410;380" dur="6s" repeatCount="indefinite" />
                        </circle>
                    </g>
                </g>
            </svg>
        </div>
    );
}
