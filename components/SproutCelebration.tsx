// Celebración tonta (y encantadora) del pedido confirmado: un brote crece de
// la tierra y una zanahoria con carita aparece a saludar. CSS puro — la
// secuencia corre sola al montar (tallo → hojas → zanahoria → wiggle infinito).
export default function SproutCelebration() {
  return (
    <div className="relative h-44 w-56" aria-hidden="true">
      <svg viewBox="0 0 224 176" className="h-full w-full">
        {/* Montículo de tierra */}
        <ellipse cx="112" cy="156" rx="86" ry="16" fill="#6B4F34" opacity="0.18" />
        <ellipse cx="112" cy="152" rx="64" ry="12" fill="#6B4F34" opacity="0.35" />

        {/* Brote — el logo, vivo */}
        <g className="kora-wiggle" style={{ transformOrigin: "92px 150px" }}>
          <path
            d="M92 150 C 92 122, 90 104, 94 84"
            stroke="#5F8429"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            pathLength={1}
            className="kora-stem"
          />
          {/* Hoja derecha */}
          <g className="kora-leaf" style={{ transformOrigin: "94px 86px", animationDelay: "0.95s" }}>
            <path d="M94 86 C 96 66, 112 56, 132 54 C 130 76, 114 86, 94 86 Z" fill="#76A035" />
          </g>
          {/* Hoja izquierda */}
          <g className="kora-leaf" style={{ transformOrigin: "93px 102px", animationDelay: "1.15s" }}>
            <path d="M93 102 C 90 86, 78 78, 60 76 C 62 94, 76 102, 93 102 Z" fill="#8FBF4A" />
          </g>
        </g>

        {/* Zanahoria — brota del suelo y saluda */}
        <g className="kora-veggie">
          <g className="kora-wiggle" style={{ transformOrigin: "152px 150px", animationDelay: "2.5s" }}>
            {/* Tallos de la zanahoria */}
            <path d="M148 104 C 146 96, 140 92, 134 90 M152 102 C 152 92, 154 88, 158 82 M156 104 C 160 98, 166 96, 172 96" stroke="#76A035" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Cuerpo */}
            <path d="M140 104 C 138 124, 144 142, 152 152 C 160 142, 166 124, 164 104 C 156 100, 148 100, 140 104 Z" fill="#E08A3C" />
            <path d="M144 116 H 160 M146 128 H 158 M149 139 H 155" stroke="#C9702A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Carita — la parte importante */}
            <g className="kora-blink" style={{ transformOrigin: "152px 113px" }}>
              <circle cx="147.5" cy="112" r="2.1" fill="#1A1A1A" />
              <circle cx="156.5" cy="112" r="2.1" fill="#1A1A1A" />
            </g>
            <path d="M147 119 C 149.5 122, 154.5 122, 157 119" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Cachetes */}
            <circle cx="143.5" cy="116.5" r="1.8" fill="#fff" opacity="0.45" />
            <circle cx="160.5" cy="116.5" r="1.8" fill="#fff" opacity="0.45" />
          </g>
        </g>

        {/* Pasto mínimo */}
        <path d="M52 150 q 2 -8 6 -10 M176 150 q -2 -8 -6 -10 M70 153 q 1 -6 4 -8" stroke="#76A035" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    </div>
  );
}
