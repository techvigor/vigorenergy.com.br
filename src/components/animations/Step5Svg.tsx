

export default function Step5Svg() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>
        {`
          .step5-coin1 { animation: step5-drop 6s ease-in infinite; animation-delay: 0s; }
          .step5-coin2 { animation: step5-drop 6s ease-in infinite; animation-delay: 0.3s; }
          .step5-coin3 { animation: step5-drop 6s ease-in infinite; animation-delay: 0.6s; }
          .step5-wallet { animation: step5-bounce 6s ease-in-out infinite; }
          .step5-balance-glow { animation: step5-glow 6s ease-in-out infinite; }

          @keyframes step5-drop {
              0% { transform: translateY(-50px) scale(0.5); opacity: 0; }
              10% { opacity: 1; transform: translateY(0) scale(1); }
              30%, 80% { transform: translateY(80px) scale(1); opacity: 1; }
              85%, 100% { transform: translateY(80px) scale(0.5); opacity: 0; }
          }
          @keyframes step5-bounce {
              0%, 25% { transform: translateY(0); }
              30% { transform: translateY(5px); }
              35% { transform: translateY(0); }
              40% { transform: translateY(5px); }
              45%, 100% { transform: translateY(0); }
          }
          @keyframes step5-glow {
              0%, 30% { fill: #E0E0E0; }
              40%, 80% { fill: #5F6C37; }
              90%, 100% { fill: #E0E0E0; }
          }
        `}
      </style>

      <svg viewBox="0 0 500 300" width="100%" height="100%" className="drop-shadow-sm">
        {/* Abstract Bank/Account Screen */}
        <g>
          <rect x="80" y="80" width="340" height="160" rx="16" fill="#FFFFFF" stroke="#727F48" strokeWidth="4" />

          {/* Header */}
          <rect x="80" y="80" width="340" height="50" rx="16" fill="#F4F5F0" />
          <rect x="80" y="110" width="340" height="20" fill="#F4F5F0" /> {/* Straighten bottom corners of header */}
          <line x1="80" y1="130" x2="420" y2="130" stroke="#E0E0E0" strokeWidth="2" />

          <rect x="100" y="95" width="60" height="15" rx="4" fill="#727F48" opacity="0.2" />

          {/* Balance View */}
          <rect x="100" y="160" width="80" height="10" rx="5" fill="#E0E0E0" />
          <rect className="step5-balance-glow" x="100" y="180" width="160" height="30" rx="8" fill="#E0E0E0" />
          <circle cx="280" cy="195" r="10" fill="#E0E0E0" />

          {/* Falling Coins Container */}
          <g className="step5-wallet" style={{ transformOrigin: '350px 170px' }}>
            {/* Wallet Graphic */}
            <path d="M 320 160 C 320 150, 380 150, 380 160 L 380 200 C 380 210, 320 210, 320 200 Z" fill="#727F48" opacity="0.1" stroke="#727F48" strokeWidth="3" />
            <path d="M 320 160 C 320 170, 380 170, 380 160" fill="none" stroke="#727F48" strokeWidth="3" />
            <rect x="345" y="175" width="10" height="10" rx="5" fill="#F6A937" />
          </g>

          {/* Coins (using SVG path for generic coin stack) */}
          <g className="step5-coin1" style={{ transformOrigin: '350px 100px' }}>
            <circle cx="350" cy="100" r="15" fill="#F6A937" stroke="#FFFFFF" strokeWidth="2" />
            <text x="350" y="105" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">$</text>
          </g>
          <g className="step5-coin2" style={{ transformOrigin: '350px 80px' }}>
            <circle cx="350" cy="80" r="15" fill="#F6A937" stroke="#FFFFFF" strokeWidth="2" />
            <text x="350" y="85" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">$</text>
          </g>
          <g className="step5-coin3" style={{ transformOrigin: '350px 60px' }}>
            <circle cx="350" cy="60" r="15" fill="#F6A937" stroke="#FFFFFF" strokeWidth="2" />
            <text x="350" y="65" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">$</text>
          </g>

        </g>
      </svg>
    </div>
  );
}
