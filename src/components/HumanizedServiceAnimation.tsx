export default function HumanizedServiceAnimation() {
    return (
        <div className="w-full max-w-[1200px] aspect-video relative overflow-hidden">
            <svg className="w-full h-full block" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    
                    {/* Paths Out (Consultant -> Customer) */}
                    <path id="out1" d="M 600 350 Q 450 200 300 200" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />
                    <path id="out2" d="M 600 350 Q 750 200 900 200" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />
                    <path id="out3" d="M 600 350 Q 450 500 300 500" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />
                    <path id="out4" d="M 600 350 Q 750 500 900 500" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />

                    {/* Paths In (Customer -> Consultant) */}
                    <path id="in1" d="M 300 200 Q 450 200 600 350" fill="none" />
                    <path id="in2" d="M 900 200 Q 750 200 600 350" fill="none" />
                    <path id="in3" d="M 300 500 Q 450 500 600 350" fill="none" />
                    <path id="in4" d="M 900 500 Q 750 500 600 350" fill="none" />
                    
                    {/* Customer Node Base */}
                    <g id="customer">
                        <circle cx="0" cy="0" r="45" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
                        <g transform="translate(0, 5)">
                            <path d="M-20,20 Q0,-5 20,20 Z" fill="#94a3b8" />
                            <circle cx="0" cy="-10" r="12" fill="#94a3b8" />
                        </g>
                    </g>
                </defs>

                {/* Base Grid / Background Waves */}
                <g opacity="0.4">
                    <circle cx="600" cy="350" r="150" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="10 10">
                        <animateTransform attributeName="transform" type="rotate" from="0 600 350" to="360 600 350" dur="30s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="600" cy="350" r="250" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="10 10">
                        <animateTransform attributeName="transform" type="rotate" from="360 600 350" to="0 600 350" dur="40s" repeatCount="indefinite"/>
                    </circle>
                </g>

                {/* Draw outward paths so they are visible behind everything */}
                <use href="#out1" />
                <use href="#out2" />
                <use href="#out3" />
                <use href="#out4" />

                {/* ANIMATION DATA FLOWS */}
                
                {/* Flow 1: Top-Left Customer */}
                <g>
                    <animateMotion dur="5s" repeatCount="indefinite" begin="0s"><mpath href="#in1"/></animateMotion>
                    <rect x="-15" y="-20" width="30" height="20" rx="6" fill="#64748b" />
                    <path d="M-5,0 L0,5 L5,0" fill="#64748b" />
                    <circle cx="-6" cy="-10" r="2" fill="#fff"/>
                    <circle cx="0" cy="-10" r="2" fill="#fff"/>
                    <circle cx="6" cy="-10" r="2" fill="#fff"/>
                </g>
                <g>
                    <animateMotion dur="5s" repeatCount="indefinite" begin="2.5s"><mpath href="#out1"/></animateMotion>
                    <rect x="-15" y="-20" width="30" height="20" rx="6" fill="#F6A937" filter="url(#glow)" />
                    <path d="M-5,-2 L0,-7 L5,-2" fill="#F6A937" filter="url(#glow)"/>
                    {/* Heart */}
                    <path d="M0,-8 L -4,-12 A 2.5,2.5 0 0,1 0,-15 A 2.5,2.5 0 0,1 4,-12 Z" fill="#fff" />
                </g>
                
                {/* Flow 2: Top-Right Customer */}
                <g>
                    <animateMotion dur="6s" repeatCount="indefinite" begin="1s"><mpath href="#in2"/></animateMotion>
                    <rect x="-15" y="-20" width="30" height="20" rx="6" fill="#64748b" />
                    <path d="M-5,0 L0,5 L5,0" fill="#64748b" />
                    <circle cx="-6" cy="-10" r="2" fill="#fff"/>
                    <circle cx="0" cy="-10" r="2" fill="#fff"/>
                    <circle cx="6" cy="-10" r="2" fill="#fff"/>
                </g>
                <g>
                    <animateMotion dur="6s" repeatCount="indefinite" begin="4s"><mpath href="#out2"/></animateMotion>
                    <rect x="-15" y="-20" width="30" height="20" rx="6" fill="#5F6C37" filter="url(#glow)" />
                    <path d="M-5,-2 L0,-7 L5,-2" fill="#5F6C37" filter="url(#glow)"/>
                    {/* Check */}
                    <path d="M-4,-12 L-1,-9 L5,-15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Flow 3: Bottom-Left Customer */}
                <g>
                    <animateMotion dur="4.5s" repeatCount="indefinite" begin="2s"><mpath href="#in3"/></animateMotion>
                    <rect x="-15" y="-20" width="30" height="20" rx="6" fill="#64748b" />
                    <path d="M-5,0 L0,5 L5,0" fill="#64748b" />
                    <circle cx="-6" cy="-10" r="2" fill="#fff"/>
                    <circle cx="0" cy="-10" r="2" fill="#fff"/>
                    <circle cx="6" cy="-10" r="2" fill="#fff"/>
                </g>
                <g>
                    <animateMotion dur="4.5s" repeatCount="indefinite" begin="4.25s"><mpath href="#out3"/></animateMotion>
                    <rect x="-15" y="-20" width="30" height="20" rx="6" fill="#F6A937" filter="url(#glow)" />
                    <path d="M-5,-2 L0,-7 L5,-2" fill="#F6A937" filter="url(#glow)"/>
                    {/* Heart */}
                    <path d="M0,-8 L -4,-12 A 2.5,2.5 0 0,1 0,-15 A 2.5,2.5 0 0,1 4,-12 Z" fill="#fff" />
                </g>

                {/* Flow 4: Bottom-Right Customer */}
                <g>
                    <animateMotion dur="5.5s" repeatCount="indefinite" begin="3s"><mpath href="#in4"/></animateMotion>
                    <rect x="-15" y="-20" width="30" height="20" rx="6" fill="#64748b" />
                    <path d="M-5,0 L0,5 L5,0" fill="#64748b" />
                    <circle cx="-6" cy="-10" r="2" fill="#fff"/>
                    <circle cx="0" cy="-10" r="2" fill="#fff"/>
                    <circle cx="6" cy="-10" r="2" fill="#fff"/>
                </g>
                <g>
                    <animateMotion dur="5.5s" repeatCount="indefinite" begin="5.75s"><mpath href="#out4"/></animateMotion>
                    <rect x="-15" y="-20" width="30" height="20" rx="6" fill="#5F6C37" filter="url(#glow)" />
                    <path d="M-5,-2 L0,-7 L5,-2" fill="#5F6C37" filter="url(#glow)"/>
                    {/* Check */}
                    <path d="M-4,-12 L-1,-9 L5,-15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* CUSTOMER NODES */}
                <use href="#customer" x="300" y="200" />
                <use href="#customer" x="900" y="200" />
                <use href="#customer" x="300" y="500" />
                <use href="#customer" x="900" y="500" />

                {/* Small satisfaction badges popping up on customers */}
                <g transform="translate(330, 170)">
                    <circle cx="0" cy="0" r="14" fill="#10b981" filter="url(#glow)">
                        <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" begin="4.2s"/>
                    </circle>
                    <path d="M-4,0 L-1,3 L5,-4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" begin="4.2s"/>
                    </path>
                </g>

                <g transform="translate(930, 170)">
                    <circle cx="0" cy="0" r="14" fill="#10b981" filter="url(#glow)">
                        <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" begin="6s"/>
                    </circle>
                    <path d="M-4,0 L-1,3 L5,-4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" begin="6s"/>
                    </path>
                </g>

                <g transform="translate(330, 470)">
                    <circle cx="0" cy="0" r="14" fill="#F6A937" filter="url(#glow)">
                        <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" repeatCount="indefinite" begin="6.2s"/>
                    </circle>
                    <path d="M0,3 L -5,-2 A 3,3 0 0,1 0,-6 A 3,3 0 0,1 5,-2 Z" fill="#fff">
                        <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" repeatCount="indefinite" begin="6.2s"/>
                    </path>
                </g>

                <g transform="translate(930, 470)">
                    <circle cx="0" cy="0" r="14" fill="#10b981" filter="url(#glow)">
                        <animate attributeName="opacity" values="0;1;1;0" dur="5.5s" repeatCount="indefinite" begin="7.5s"/>
                    </circle>
                    <path d="M-4,0 L-1,3 L5,-4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <animate attributeName="opacity" values="0;1;1;0" dur="5.5s" repeatCount="indefinite" begin="7.5s"/>
                    </path>
                </g>


                {/* CENTRAL CONSULTANT NODE */}
                <g transform="translate(600, 350)">
                    <animateTransform attributeName="transform" type="translate" values="600,345; 600,355; 600,345" dur="6s" repeatCount="indefinite"/>

                    {/* Glowing outer rings */}
                    <circle cx="0" cy="0" r="75" fill="#ffffff" stroke="#F6A937" strokeWidth="4" />
                    <circle cx="0" cy="0" r="85" fill="none" stroke="#F6A937" strokeWidth="2" strokeDasharray="15 10" opacity="0.6">
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="15s" repeatCount="indefinite"/>
                    </circle>
                    
                    {/* Pulse effect */}
                    <circle cx="0" cy="0" r="75" fill="none" stroke="#F6A937" strokeWidth="4" opacity="0.8" filter="url(#glow)">
                        <animate attributeName="r" values="75;95;75" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Consultant Person */}
                    <g transform="translate(0, 10)">
                        <path d="M-35,35 Q0,-5 35,35 Z" fill="#5F6C37" />
                        <circle cx="0" cy="-15" r="18" fill="#5F6C37" />
                        
                        {/* Headset Arc */}
                        <path d="M-22,-15 A 22,22 0 0,1 22,-15" fill="none" stroke="#F6A937" strokeWidth="3" />
                        {/* Headset Earphones */}
                        <rect x="-26" y="-18" width="6" height="12" rx="3" fill="#F6A937" />
                        <rect x="20" y="-18" width="6" height="12" rx="3" fill="#F6A937" />
                        {/* Headset Mic */}
                        <path d="M23,-10 Q30,5 15,10" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="15" cy="10" r="2" fill="#1e293b" />
                    </g>

                    {/* Chat Bubble floating near consultant */}
                    <g>
                        <animateTransform attributeName="transform" type="translate" values="45,-35; 45,-45; 45,-35" dur="4s" repeatCount="indefinite"/>
                        <rect x="-15" y="-15" width="30" height="22" rx="6" fill="#F6A937" filter="url(#glow)"/>
                        <path d="M-5,7 L0,12 L10,7" fill="#F6A937" filter="url(#glow)"/>
                        {/* Heart inside bubble */}
                        <path d="M0,2 L -5,-3 A 3,3 0 0,1 0,-7 A 3,3 0 0,1 5,-3 Z" fill="#fff" />
                    </g>
                    
                    {/* Contact icons floating */}
                    <g>
                        <animateTransform attributeName="transform" type="translate" values="-45,-30; -45,-40; -45,-30" dur="3.5s" repeatCount="indefinite"/>
                        <circle cx="0" cy="0" r="16" fill="#10b981" filter="url(#glow)" />
                        {/* WhatsApp-like icon */}
                        <path d="M-5,-4 Q0,-8 5,-4 Q8,-1 5,4 L6,8 L2,6 Q-3,9 -6,4 Q-8,-1 -5,-4 Z" fill="none" stroke="#fff" strokeWidth="1.5" />
                        <circle cx="-1" cy="0" r="1.5" fill="#fff"/>
                        <circle cx="3" cy="-1" r="1.5" fill="#fff"/>
                    </g>
                </g>
            </svg>
        </div>
    );
}
