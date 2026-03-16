

export default function Step4Svg() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>
        {`
          .step4-msg { animation: step4-slide-up 6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; }
          .step4-btn-press { animation: step4-click 6s ease-in-out infinite; }
          .step4-confetti { animation: step4-explode 6s ease-out infinite; }
          .step4-sign { stroke-dasharray: 100; animation: step4-draw-sign 6s ease-in-out infinite; }

          @keyframes step4-slide-up {
              0%, 15% { transform: translateY(50px); opacity: 0; }
              20%, 85% { transform: translateY(0); opacity: 1; }
              90%, 100% { transform: translateY(-20px); opacity: 0; }
          }
          @keyframes step4-click {
              0%, 45% { transform: scale(1); fill: #727F48; }
              50%, 85% { transform: scale(0.95); fill: #5F6C37; }
              90%, 100% { transform: scale(1); fill: #727F48; }
          }
          @keyframes step4-explode {
              0%, 48% { opacity: 0; transform: translateY(0) scale(0); }
              50% { opacity: 1; transform: translateY(-20px) scale(1); }
              65%, 100% { opacity: 0; transform: translateY(-50px) scale(1.5); }
          }
          @keyframes step4-draw-sign {
              0%, 25% { stroke-dashoffset: 100; opacity: 0; }
              35%, 85% { stroke-dashoffset: 0; opacity: 1; }
              90%, 100% { stroke-dashoffset: 0; opacity: 0; }
          }
        `}
      </style>

      <svg viewBox="0 0 500 300" width="100%" height="100%" className="drop-shadow-sm">
        {/* Smartphone */}
        <g>
          <rect x="180" y="30" width="140" height="240" rx="20" fill="#FFFFFF" stroke="#727F48" strokeWidth="6" />
          <rect x="230" y="200" width="40" height="40" rx="10" fill="none" stroke="#E0E0E0" strokeWidth="2" opacity="0" /> {/* Home button removed for modern iPhone look */}
          <rect x="220" y="40" width="60" height="5" rx="2.5" fill="#727F48" opacity="0.3" /> {/* Notch */}

          {/* Messages UI */}
          <g className="step4-msg">
            <rect x="195" y="70" width="110" height="80" rx="8" fill="#F4F5F0" />
            <circle cx="215" cy="90" r="8" fill="#727F48" />
            <rect x="230" y="85" width="60" height="4" rx="2" fill="#E0E0E0" />
            <rect x="230" y="95" width="40" height="4" rx="2" fill="#E0E0E0" />

            {/* Signature Area */}
            <rect x="205" y="115" width="90" height="25" rx="4" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
            <path className="step4-sign" d="M 210 125 C 220 115, 230 140, 240 125 S 255 130, 260 120 S 270 140, 280 125" fill="none" stroke="#727F48" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Magic Button inside phone */}
          <g>
            <rect className="step4-btn-press" style={{ transformOrigin: '250px 185px' }} x="205" y="170" width="90" height="30" rx="15" fill="#727F48" />
            <text x="250" y="189" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">APROVAR</text>
          </g>

          {/* Success Check & Confetti originating from button */}
          <g className="step4-confetti" style={{ transformOrigin: '250px 170px' }}>
            <circle cx="250" cy="170" r="15" fill="#F6A937" />
            <path d="M 243 170 L 248 175 L 257 165" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Confetti particles */}
            <circle cx="220" cy="140" r="4" fill="#F6A937" />
            <circle cx="280" cy="150" r="3" fill="#727F48" />
            <circle cx="250" cy="120" r="5" fill="#F6A937" />
            <circle cx="210" cy="160" r="2.5" fill="#727F48" />
            <circle cx="290" cy="130" r="4" fill="#F6A937" />
          </g>

        </g>
      </svg>
    </div>
  );
}
