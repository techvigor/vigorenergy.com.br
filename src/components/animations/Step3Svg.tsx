

export default function Step3Svg() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>
        {`
          .step3-gears { transform-origin: 150px 150px; animation: step3-spin 6s linear infinite; }
          .step3-doc { animation: step3-slide-out 6s ease-in-out infinite; }
          .step3-stamp { animation: step3-stamp-in 6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; }
          .step3-particles { animation: step3-poof 6s ease-out infinite; }

          @keyframes step3-spin {
              0% { transform: rotate(0deg); }
              50% { transform: rotate(180deg); }
              100% { transform: rotate(360deg); }
          }
          @keyframes step3-slide-out {
              0%, 20% { transform: translateX(-100px); opacity: 0; }
              35%, 85% { transform: translateX(0); opacity: 1; }
              95%, 100% { transform: translateX(50px); opacity: 0; }
          }
          @keyframes step3-stamp-in {
              0%, 50% { transform: scale(3) rotate(20deg); opacity: 0; transform-origin: 350px 180px; }
              60%, 85% { transform: scale(1) rotate(-10deg); opacity: 1; transform-origin: 350px 180px; }
              95%, 100% { transform: scale(0.5); opacity: 0; transform-origin: 350px 180px; }
          }
          @keyframes step3-poof {
              0%, 58% { opacity: 0; transform: scale(0); transform-origin: 350px 180px; }
              60% { opacity: 1; transform: scale(1.2); transform-origin: 350px 180px; }
              65%, 100% { opacity: 0; transform: scale(1.5); transform-origin: 350px 180px; }
          }
        `}
      </style>

      <svg viewBox="0 0 500 300" width="100%" height="100%" className="drop-shadow-sm">
        {/* Machine/System Left */}
        <g>
          <rect x="50" y="80" width="140" height="140" rx="16" fill="#FFFFFF" stroke="#727F48" strokeWidth="4" />
          <path d="M50 150 L190 150" stroke="#727F48" strokeWidth="4" />

          <g className="step3-gears">
            <circle cx="150" cy="150" r="30" fill="none" stroke="#F6A937" strokeWidth="6" strokeDasharray="12 8" />
            <circle cx="150" cy="150" r="15" fill="#F6A937" />
          </g>

          <g className="step3-gears" style={{ transformOrigin: '90px 150px', animationDirection: 'reverse' }}>
            <circle cx="90" cy="150" r="20" fill="none" stroke="#727F48" strokeWidth="5" strokeDasharray="10 6" />
            <circle cx="90" cy="150" r="8" fill="#727F48" />
          </g>

          {/* Printer Output Slot */}
          <rect x="180" y="110" width="20" height="80" rx="4" fill="#727F48" />
        </g>

        {/* Document sliding out */}
        <g className="step3-doc">
          <g>
            <rect x="220" y="60" width="150" height="180" rx="8" fill="#FFFFFF" stroke="#727F48" strokeWidth="4" />
            {/* Template Lines */}
            <rect x="240" y="80" width="110" height="15" rx="4" fill="#E0E0E0" />
            <rect x="240" y="110" width="80" height="6" rx="3" fill="#E0E0E0" />
            <rect x="240" y="125" width="95" height="6" rx="3" fill="#E0E0E0" />
            <rect x="240" y="140" width="60" height="6" rx="3" fill="#E0E0E0" />

            <rect x="240" y="170" width="110" height="50" rx="4" fill="#727F48" opacity="0.1" />
            <rect x="250" y="180" width="40" height="6" rx="3" fill="#727F48" opacity="0.4" />
            <rect x="250" y="195" width="60" height="6" rx="3" fill="#727F48" opacity="0.4" />
          </g>

          {/* Bonus Stamp */}
          <g>
            <circle className="step3-particles" cx="350" cy="180" r="40" fill="none" stroke="#F6A937" strokeWidth="2" strokeDasharray="2 6" />
            <g className="step3-stamp">
              <circle cx="350" cy="180" r="35" fill="none" stroke="#F6A937" strokeWidth="6" />
              <circle cx="350" cy="180" r="28" fill="none" stroke="#F6A937" strokeWidth="2" />
              <path d="M 330 180 L 345 195 L 375 160" fill="none" stroke="#F6A937" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </g>

      </svg>
    </div>
  );
}
