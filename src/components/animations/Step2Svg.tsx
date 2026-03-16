

export default function Step2Svg() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>
        {`
          .step2-chart-bar1 { animation: step2-grow1 6s ease-in-out infinite; }
          .step2-chart-bar2 { animation: step2-grow2 6s ease-in-out infinite; }
          .step2-chart-bar3 { animation: step2-grow3 6s ease-in-out infinite; }
          .step2-calc-btn { animation: step2-press 6s ease-in-out infinite; }
          .step2-discount { animation: step2-show-discount 6s ease-in-out infinite; }

          @keyframes step2-grow1 {
              0%, 10% { height: 0; y: 220; }
              20%, 90% { height: 120px; y: 100px; }
              100% { height: 0; y: 220; }
          }
          @keyframes step2-grow2 {
              0%, 20% { height: 0; y: 220; }
              30%, 90% { height: 90px; y: 130px; }
              100% { height: 0; y: 220; }
          }
          @keyframes step2-grow3 {
              0%, 30% { height: 0; y: 220; }
              40%, 90% { height: 40px; y: 180px; }
              100% { height: 0; y: 220; }
          }
          @keyframes step2-press {
              0%, 20% { transform: scale(1); opacity: 0.8; }
              25% { transform: scale(0.9); opacity: 1; fill: #F6A937; }
              30%, 100% { transform: scale(1); opacity: 0.8; fill: #E0E0E0; }
          }
          @keyframes step2-show-discount {
              0%, 45% { opacity: 0; transform: translateY(10px); }
              55%, 90% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-10px); }
          }
        `}
      </style>

      <svg viewBox="0 0 500 300" width="100%" height="100%" className="drop-shadow-sm">
        {/* Calculator Left */}
        <g>
          <rect x="50" y="60" width="140" height="190" rx="12" fill="#FFFFFF" stroke="#727F48" strokeWidth="4" />
          <rect x="65" y="75" width="110" height="40" rx="4" fill="#E0E0E0" />
          <text x="170" y="102" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" fill="#727F48" textAnchor="end">28%</text>

          {/* Calc buttons */}
          <rect x="65" y="130" width="25" height="25" rx="4" fill="#E0E0E0" />
          <rect x="107" y="130" width="25" height="25" rx="4" fill="#E0E0E0" />
          <rect x="150" y="130" width="25" height="25" rx="4" fill="#E0E0E0" />

          <rect x="65" y="170" width="25" height="25" rx="4" fill="#E0E0E0" />
          <rect x="107" y="170" width="25" height="25" rx="4" fill="#E0E0E0" />
          <rect className="step2-calc-btn" style={{ transformOrigin: '162px 182px' }} x="150" y="170" width="25" height="65" rx="4" fill="#E0E0E0" />

          <rect x="65" y="210" width="67" height="25" rx="4" fill="#E0E0E0" />
        </g>

        {/* Data lines connecting calc to chart */}
        <path d="M200 150 L250 150" stroke="#F6A937" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />
        <path d="M250 150 L250 220 L270 220" stroke="#F6A937" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />

        {/* Chart Right */}
        <g>
          {/* Axis */}
          <line x1="270" y1="220" x2="450" y2="220" stroke="#727F48" strokeWidth="4" strokeLinecap="round" />
          <line x1="270" y1="220" x2="270" y2="70" stroke="#727F48" strokeWidth="4" strokeLinecap="round" />

          {/* Bars */}
          <rect className="step2-chart-bar1" x="290" y="100" width="30" height="120" rx="4" fill="#E0E0E0" />
          <rect className="step2-chart-bar2" x="340" y="130" width="30" height="90" rx="4" fill="#E0E0E0" />
          <rect className="step2-chart-bar3" x="390" y="180" width="30" height="40" rx="4" fill="#F6A937" />

          {/* Value highlight */}
          <g className="step2-discount">
            <rect x="360" y="50" width="90" height="30" rx="15" fill="#727F48" />
            <polygon points="405,80 395,90 385,80" fill="#727F48" />
            <text x="405" y="70" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">-28% Conta</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
