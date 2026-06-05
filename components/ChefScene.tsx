// La cocina de recetas — una olla burbujeando con la tapa que brinca, vapor
// subiendo y el brote asomado con gorro de chef. CSS puro, en loop.
export default function ChefScene() {
  return (
    <div className="relative h-32 w-40 flex-none sm:h-40 sm:w-48" aria-hidden="true">
      <svg viewBox="0 0 192 160" className="h-full w-full">
        {/* Sombra */}
        <ellipse cx="104" cy="148" rx="68" ry="8" fill="#2C3E2B" opacity="0.08" />

        {/* Vapor */}
        <g>
          <circle cx="84" cy="62" r="7" fill="#2C3E2B" opacity="0.12" className="kora-steam" />
          <circle cx="104" cy="56" r="9" fill="#2C3E2B" opacity="0.12" className="kora-steam" style={{ animationDelay: "0.9s" }} />
          <circle cx="124" cy="62" r="6" fill="#2C3E2B" opacity="0.12" className="kora-steam" style={{ animationDelay: "1.8s" }} />
        </g>

        {/* Tapa — brinca con el hervor */}
        <g className="kora-lid" style={{ transformOrigin: "104px 84px" }}>
          <path d="M64 88 C 64 76, 144 76, 144 88 Z" fill="#222220" />
          <rect x="98" y="68" width="12" height="8" rx="4" fill="#222220" />
        </g>

        {/* Olla — acero negro mate, como los monolitos */}
        <path d="M62 90 L 146 90 L 142 142 C 141 147, 136 150, 130 150 L 78 150 C 72 150, 67 147, 66 142 Z" fill="#222220" />
        <path d="M62 90 L 146 90 L 145 102 L 63 102 Z" fill="#000" opacity="0.25" />
        {/* Asas */}
        <path d="M62 100 C 52 100, 52 112, 62 112 M146 100 C 156 100, 156 112, 146 112" stroke="#222220" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Wordmark en la olla */}
        <text x="104" y="126" textAnchor="middle" fontSize="11" fontWeight="900" letterSpacing="-0.4" fill="#F7F5F0" opacity="0.85" className="font-sans">
          KORA
        </text>

        {/* El brote chef — asomado detrás de la olla */}
        <g>
          {/* Gorro de chef */}
          <path d="M158 84 C 152 84, 149 79, 151 74 C 147 72, 147 66, 151 64 C 151 58, 158 55, 163 58 C 168 54, 176 57, 176 63 C 181 64, 182 71, 178 74 C 180 79, 176 84, 170 84 Z" fill="#fff" />
          <rect x="155" y="83" width="18" height="5" rx="2" fill="#EFEAE0" />
          {/* Carita del brote */}
          <circle cx="164" cy="98" r="12" fill="#8FBF4A" />
          <g className="kora-blink" style={{ transformOrigin: "164px 97px" }}>
            <circle cx="160" cy="96" r="1.7" fill="#1A1A1A" />
            <circle cx="168" cy="96" r="1.7" fill="#1A1A1A" />
          </g>
          <path d="M160.5 102 C 162.5 104, 165.5 104, 167.5 102" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          {/* Hojita-brazo con cuchara de palo */}
          <path d="M153 104 C 146 106, 141 104, 137 100" stroke="#76A035" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M137 100 L 128 86" stroke="#8A6D3B" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="126" cy="82" rx="5" ry="6.5" fill="#8A6D3B" transform="rotate(-30 126 82)" />
        </g>
      </svg>
    </div>
  );
}
