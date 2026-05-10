export function ParchmentMap({ showGrid = false }: { showGrid?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <radialGradient id="pm-seaGrad" cx="50%" cy="50%" r="75%">
          <stop offset="0%"   stopColor="#bfb992" />
          <stop offset="80%"  stopColor="#a8a07a" />
          <stop offset="100%" stopColor="#8c8460" />
        </radialGradient>
        <radialGradient id="pm-landGrad" cx="40%" cy="35%" r="70%">
          <stop offset="0%"   stopColor="#d8c98a" />
          <stop offset="100%" stopColor="#b89e60" />
        </radialGradient>
        <radialGradient id="pm-vignette" cx="50%" cy="50%" r="65%">
          <stop offset="60%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(40,28,12,0.55)" />
        </radialGradient>
        <filter id="pm-paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.32  0 0 0 0 0.22  0 0 0 0 0.10  0 0 0 0.18 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <pattern id="pm-waves" x="0" y="0" width="42" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 12 Q 10 6, 21 12 T 42 12" fill="none" stroke="#7d774f" strokeWidth="0.6" opacity="0.55" />
        </pattern>
        <pattern id="pm-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0 L0 0 0 60" fill="none" stroke="#3a2d1a" strokeWidth="0.5" opacity="0.18" />
        </pattern>
      </defs>

      {/* Ocean base */}
      <rect x="0" y="0" width="1200" height="800" fill="url(#pm-seaGrad)" />
      <rect x="0" y="0" width="1200" height="800" fill="url(#pm-waves)" />

      {/* Stylised water hatching */}
      <g opacity="0.5" stroke="#6a5d35" fill="none" strokeWidth="0.7">
        {[0, 1, 2, 3].map(i => (
          <path
            key={i}
            d={`M ${80 - i * 14} ${260 + i * 8} C ${260 - i * 14} ${130 + i * 8}, ${520 - i * 10} ${90 + i * 6}, ${720 - i * 8} ${130 + i * 4} C ${920 - i * 4} ${170 + i * 2}, ${1080 + i * 4} ${230 - i * 2}, ${1140 + i * 10} ${360 - i * 4} C ${1180 + i * 14} ${520 - i * 8}, ${1100 + i * 10} ${660 - i * 6}, ${1000 + i * 4} ${700 - i * 4} C ${880 + i * 2} ${745 - i * 2}, ${720} ${740}, ${580 - i * 2} ${760 + i * 2} C ${420 - i * 4} ${780 + i * 4}, ${240 - i * 6} ${760 + i * 6}, ${130 - i * 8} ${700 + i * 4} C ${60 - i * 10} ${660 + i * 2}, ${30 - i * 10} ${540 + i * 4}, ${50 - i * 12} ${420 + i * 6} C ${60 - i * 12} ${340 + i * 6}, ${70 - i * 14} ${300 + i * 8}, ${80 - i * 14} ${260 + i * 8} Z`}
          />
        ))}
      </g>

      {/* Main continent */}
      <g>
        <path
          d="M 130 300 C 160 220, 250 180, 360 200 C 430 215, 470 175, 540 180 C 610 185, 650 220, 720 215 C 800 210, 870 240, 920 290 C 970 340, 1020 360, 1040 420 C 1055 470, 1020 520, 950 540 C 880 555, 810 545, 740 560 C 660 575, 600 595, 540 590 C 460 580, 400 610, 350 640 C 290 640, 240 600, 200 575 C 165 555, 145 510, 120 460 C 100 420, 110 370, 115 340 C 120 320, 130 300, 130 300 Z"
          fill="url(#pm-landGrad)" stroke="#3a2d1a" strokeWidth="2.2" strokeLinejoin="round"
        />
        <path
          d="M 145 305 C 175 230, 260 195, 365 215 C 435 228, 475 190, 545 195 C 615 200, 655 232, 720 228 C 798 224, 862 252, 908 297 C 956 344, 1005 365, 1024 420 C 1037 462, 1006 506, 940 525 C 872 540, 805 530, 738 545 C 660 558, 604 576, 545 572 C 466 563, 406 592, 358 622 C 310 636, 255 599, 218 576 C 184 554, 166 506, 144 460 C 124 423, 134 376, 138 348 C 140 326, 145 305, 145 305 Z"
          fill="none" stroke="#8a7546" strokeWidth="0.9" opacity="0.7"
        />
      </g>

      {/* Northern islands */}
      <g fill="url(#pm-landGrad)" stroke="#3a2d1a" strokeWidth="1.6">
        <path d="M 1000 120 C 1030 95, 1080 100, 1095 130 C 1110 160, 1080 180, 1040 175 C 1010 172, 985 150, 1000 120 Z" />
        <path d="M 940 170 C 955 152, 985 152, 988 175 C 990 195, 960 200, 944 188 C 932 180, 932 178, 940 170 Z" />
        <path d="M 1085 200 C 1110 195, 1130 215, 1120 235 C 1110 250, 1085 245, 1080 225 C 1077 213, 1076 202, 1085 200 Z" />
      </g>

      {/* Southern shoals */}
      <g fill="url(#pm-landGrad)" stroke="#3a2d1a" strokeWidth="1.6">
        <path d="M 380 700 C 410 720, 460 730, 480 750 C 495 770, 470 780, 440 775 C 405 770, 365 745, 360 725 C 358 712, 365 700, 380 700 Z" />
        <path d="M 520 720 C 545 715, 565 735, 552 750 C 540 762, 520 758, 510 745 C 502 735, 506 722, 520 720 Z" />
      </g>

      {/* Mountain ranges */}
      <g stroke="#3a2d1a" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {([[330,290],[348,280],[368,290],[388,278],[408,288],[428,276],[448,290],[470,282],[492,294],[514,284]] as [number,number][]).map(([x, y], i) => (
          <g key={'mn' + i} transform={`translate(${x},${y})`}>
            <path d="M -10 8 L 0 -8 L 10 8 Z" fill="#e6d6a8" />
            <path d="M -4 4 L 0 -3" />
          </g>
        ))}
        {([[820,420],[838,408],[858,420],[878,406],[898,420],[860,440],[840,452],[880,440]] as [number,number][]).map(([x, y], i) => (
          <g key={'me' + i} transform={`translate(${x},${y})`}>
            <path d="M -9 7 L 0 -8 L 9 7 Z" fill="#c8a073" />
            <path d="M -3 3 L 0 -3" />
          </g>
        ))}
      </g>

      {/* Forests */}
      <g fill="#7a8c5a" stroke="#3a2d1a" strokeWidth="0.8" opacity="0.75">
        {([[200,350],[218,342],[236,352],[254,342],[198,368],[216,360],[234,370],[600,300],[616,290],[632,302],[648,292],[608,318],[624,310],[640,320]] as [number,number][]).map(([x, y], i) => (
          <path key={'f' + i} d={`M ${x} ${y + 10} L ${x + 10} ${y - 8} L ${x + 20} ${y + 10} Z`} />
        ))}
      </g>

      {/* Roads */}
      <g fill="none" stroke="#6a553a" strokeWidth="1" strokeDasharray="3 4" opacity="0.7">
        <path d="M 295 540 C 360 510, 430 470, 500 460 C 580 450, 660 440, 740 430" />
        <path d="M 295 540 C 320 580, 350 620, 380 640" />
      </g>

      {showGrid && <rect x="80" y="80" width="1040" height="640" fill="url(#pm-grid)" />}

      <rect x="0" y="0" width="1200" height="800" fill="url(#pm-vignette)" pointerEvents="none" />
      <rect x="0" y="0" width="1200" height="800" filter="url(#pm-paper)" opacity="0.5" pointerEvents="none" />

      {/* Region labels */}
      <g fontFamily="Georgia, serif" fill="#3a2d1a" pointerEvents="none">
        <text x="600" y="120" textAnchor="middle" fontSize="34" fontStyle="italic" letterSpacing="14" opacity="0.5">THE  WAVERING  SEA</text>
        <text x="420" y="430" textAnchor="middle" fontSize="22" fontStyle="italic" letterSpacing="6" opacity="0.75">Eldrune</text>
        <text x="420" y="448" textAnchor="middle" fontSize="10" letterSpacing="4" opacity="0.55">THE  SUNDERED  CONTINENT</text>
        <text x="870" y="490" textAnchor="middle" fontSize="14" fontStyle="italic" letterSpacing="5" opacity="0.7">Ash  Reach</text>
        <text x="220" y="600" textAnchor="middle" fontSize="13" fontStyle="italic" letterSpacing="4" opacity="0.7">Glimmer  Basin</text>
        <text x="700" y="640" textAnchor="middle" fontSize="13" fontStyle="italic" letterSpacing="4" opacity="0.6">The  Hollow  Marches</text>
        <text x="1050" y="160" textAnchor="middle" fontSize="11" fontStyle="italic" letterSpacing="3" opacity="0.7">Drowned Isles</text>
      </g>

      {/* Compass rose */}
      <g transform="translate(1080, 670)" opacity="0.85">
        <circle r="36" fill="#e2d2a3" stroke="#3a2d1a" strokeWidth="1.2" />
        <circle r="26" fill="none" stroke="#3a2d1a" strokeWidth="0.6" opacity="0.6" />
        <g stroke="#3a2d1a" strokeWidth="1" fill="#c9a25b">
          <path d="M 0 -30 L 5 0 L 0 30 L -5 0 Z" />
          <path d="M -30 0 L 0 5 L 30 0 L 0 -5 Z" fill="#a8956a" />
        </g>
        <text y="-40" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic" fill="#3a2d1a">N</text>
      </g>

      {/* Scale bar */}
      <g transform="translate(80, 720)" fill="#3a2d1a">
        <line x1="0" y1="0" x2="120" y2="0" stroke="#3a2d1a" strokeWidth="1.4" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#3a2d1a" strokeWidth="1.4" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="#3a2d1a" strokeWidth="1" />
        <line x1="120" y1="-4" x2="120" y2="4" stroke="#3a2d1a" strokeWidth="1.4" />
        <text x="0" y="18" fontSize="8" letterSpacing="1.5">0</text>
        <text x="120" y="18" fontSize="8" letterSpacing="1.5">200 LEAGUES</text>
      </g>
    </svg>
  )
}
