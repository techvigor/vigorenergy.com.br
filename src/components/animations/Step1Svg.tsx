

export default function Step1Svg() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>
        {`
          .step1-doc-group { animation: step1-upload 6s ease-in-out infinite; }
          .step1-scanner-line { animation: step1-scan 6s linear infinite; }
          .step1-scanner-glow { animation: step1-scan-glow 6s linear infinite; }
          .step1-ai-pulse { transform-origin: 250px 150px; animation: step1-pulse-ai 6s ease-in-out infinite; }
          .step1-data-stream { stroke-dasharray: 8 4; animation: step1-flow-data 6s linear infinite; }
          
          .step1-f1 { animation: step1-fill1 6s ease-in-out infinite; }
          .step1-f2 { animation: step1-fill2 6s ease-in-out infinite; }
          .step1-f3 { animation: step1-fill3 6s ease-in-out infinite; }
          .step1-f4 { animation: step1-fill4 6s ease-in-out infinite; }
          .step1-check { animation: step1-pop-check 6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; }

          @keyframes step1-upload {
              0% { transform: translateY(40px); opacity: 0; }
              10%, 85% { transform: translateY(0); opacity: 1; }
              95%, 100% { transform: translateY(-30px); opacity: 0; }
          }
          @keyframes step1-scan {
              0%, 15% { transform: translateY(0); opacity: 0; }
              18% { opacity: 1; }
              40% { transform: translateY(140px); opacity: 1; }
              45%, 100% { transform: translateY(140px); opacity: 0; }
          }
          @keyframes step1-scan-glow {
              0%, 15% { transform: translateY(0); opacity: 0; fill: #F6A937; }
              18% { opacity: 0.3; }
              40% { transform: translateY(140px); opacity: 0.3; }
              45%, 100% { transform: translateY(140px); opacity: 0; }
          }
          @keyframes step1-pulse-ai {
              0%, 20% { transform: scale(0.9); opacity: 0.5; }
              25%, 45% { transform: scale(1.1); opacity: 1; stroke-width: 4px; }
              50%, 100% { transform: scale(0.9); opacity: 0.5; stroke-width: 2px; }
          }
          @keyframes step1-flow-data {
              0%, 20% { stroke-dashoffset: 24; opacity: 0; }
              25%, 45% { opacity: 1; stroke-dashoffset: 0; }
              50%, 100% { stroke-dashoffset: -24; opacity: 0; }
          }
          
          @keyframes step1-fill1 {
              0%, 26% { fill: #E0E0E0; width: 40px; }
              30%, 90% { fill: #727F48; width: 80px; }
              95%, 100% { fill: #E0E0E0; width: 40px; }
          }
          @keyframes step1-fill2 {
              0%, 31% { fill: #E0E0E0; width: 50px; }
              35%, 90% { fill: #727F48; width: 90px; }
              95%, 100% { fill: #E0E0E0; width: 50px; }
          }
          @keyframes step1-fill3 {
              0%, 36% { fill: #E0E0E0; width: 30px; }
              40%, 90% { fill: #727F48; width: 70px; }
              95%, 100% { fill: #E0E0E0; width: 30px; }
          }
          @keyframes step1-fill4 {
              0%, 41% { fill: #E0E0E0; width: 40px; }
              45%, 90% { fill: #F6A937; width: 60px; }
              95%, 100% { fill: #E0E0E0; width: 40px; }
          }
          @keyframes step1-pop-check {
              0%, 45% { transform: scale(0); opacity: 0; transform-origin: 395px 75px; }
              50%, 90% { transform: scale(1); opacity: 1; transform-origin: 395px 75px; }
              95%, 100% { transform: scale(0); opacity: 0; transform-origin: 395px 75px; }
          }
        `}
      </style>

      <svg viewBox="0 0 500 300" width="100%" height="100%" className="drop-shadow-sm">
        {/* Upload Area */}
        <g className="step1-doc-group">
          <path d="M125 240 L125 270 M105 250 L125 230 L145 250" stroke="#F6A937" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />

          <rect x="65" y="70" width="120" height="160" rx="8" fill="#FFFFFF" stroke="#727F48" strokeWidth="4" />

          <circle cx="95" cy="95" r="10" fill="#F6A937" opacity="0.8" />
          <rect x="115" y="90" width="45" height="10" rx="3" fill="#727F48" opacity="0.8" />

          <rect x="85" y="120" width="80" height="6" rx="2" fill="#727F48" opacity="0.3" />
          <rect x="85" y="135" width="60" height="6" rx="2" fill="#727F48" opacity="0.3" />
          <rect x="85" y="150" width="75" height="6" rx="2" fill="#727F48" opacity="0.3" />

          <rect x="85" y="180" width="5" height="30" fill="#727F48" />
          <rect x="94" y="180" width="8" height="30" fill="#727F48" />
          <rect x="106" y="180" width="4" height="30" fill="#727F48" />
          <rect x="114" y="180" width="12" height="30" fill="#727F48" />
          <rect x="130" y="180" width="6" height="30" fill="#727F48" />
          <rect x="140" y="180" width="10" height="30" fill="#727F48" />

          {/* Scanner */}
          <line className="step1-scanner-line" x1="50" y1="75" x2="200" y2="75" stroke="#F6A937" strokeWidth="4" strokeLinecap="round" />
          <polygon className="step1-scanner-glow" points="50,75 200,75 180,95 70,95" fill="#F6A937" />
        </g>

        {/* AI Processing */}
        <path className="step1-data-stream" d="M195 150 L220 150" stroke="#F6A937" strokeWidth="3" strokeLinecap="round" />
        <g className="step1-ai-pulse">
          <polygon points="250,115 280,132 280,168 250,185 220,168 220,132" fill="#FFFFFF" stroke="#727F48" strokeWidth="4" />
          <circle cx="250" cy="150" r="12" fill="none" stroke="#F6A937" strokeWidth="3" strokeDasharray="6 4" />
          <circle cx="250" cy="150" r="4" fill="#F6A937" />
          <text x="250" y="125" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="bold" fill="#727F48" textAnchor="middle">IA</text>
        </g>
        <path className="step1-data-stream" d="M280 150 L305 150" stroke="#F6A937" strokeWidth="3" strokeLinecap="round" />

        {/* Form Generation */}
        <g className="step1-doc-group">
          <rect x="315" y="70" width="120" height="160" rx="8" fill="#FFFFFF" stroke="#727F48" strokeWidth="4" />

          <circle className="step1-check" cx="395" cy="70" r="14" fill="#F6A937" />
          <path className="step1-check" d="M389 71 L393 75 L401 65" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="330" y="90" width="90" height="12" rx="4" fill="#727F48" opacity="0.1" />
          <circle cx="340" cy="96" r="4" fill="#727F48" />

          <rect x="330" y="115" width="20" height="6" rx="2" fill="#E0E0E0" />
          <rect className="step1-f1" x="330" y="125" width="40" height="10" rx="3" fill="#E0E0E0" />

          <rect x="330" y="145" width="30" height="6" rx="2" fill="#E0E0E0" />
          <rect className="step1-f2" x="330" y="155" width="50" height="10" rx="3" fill="#E0E0E0" />

          <rect x="330" y="175" width="25" height="6" rx="2" fill="#E0E0E0" />
          <rect className="step1-f3" x="330" y="185" width="30" height="10" rx="3" fill="#E0E0E0" />

          <rect x="330" y="205" width="35" height="6" rx="2" fill="#E0E0E0" />
          <rect className="step1-f4" x="330" y="215" width="40" height="10" rx="3" fill="#E0E0E0" />
        </g>
      </svg>
    </div>
  );
}
