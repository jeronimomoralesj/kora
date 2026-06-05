// Canasta vacía — un tomate aburrido suspira junto a la canasta, con su hoja
// meciéndose. CSS puro, hermano de la zanahoria del pedido confirmado.
export default function EmptyBasketScene() {
  return (
    <div className="relative h-40 w-56" aria-hidden="true">
      <svg viewBox="0 0 224 160" className="h-full w-full">
        {/* Sombra del piso */}
        <ellipse cx="112" cy="142" rx="84" ry="11" fill="#2C3E2B" opacity="0.08" />

        {/* Canasta — vacía y un poco ladeada */}
        <g transform="rotate(-4 88 110)">
          {/* Asa */}
          <path d="M58 96 C 58 70, 118 70, 118 96" stroke="#8A6D3B" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Cuerpo */}
          <path d="M48 96 L 128 96 L 120 140 L 56 140 Z" fill="#C9B68A" />
          <path d="M48 96 L 128 96 L 126 108 L 50 108 Z" fill="#8A6D3B" opacity="0.5" />
          {/* Tejido */}
          <path d="M58 112 L 118 112 M60 124 L 116 124 M62 134 L 114 134" stroke="#8A6D3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
          <path d="M70 100 L 66 138 M88 100 L 88 138 M106 100 L 110 138" stroke="#8A6D3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
          {/* Interior vacío (la tragedia) */}
          <ellipse cx="88" cy="98" rx="38" ry="7" fill="#6B4F34" opacity="0.35" />
        </g>

        {/* Tomate — tan aburrido que de vez en cuando pega un brinco */}
        <g className="kora-jumper" style={{ transformOrigin: "168px 143px" }}>
          {/* Hoja caída que se mece */}
          <g className="kora-sway" style={{ transformOrigin: "168px 104px" }}>
            <path d="M168 104 C 164 96, 156 94, 148 96 C 152 103, 160 106, 168 104 Z" fill="#76A035" />
            <path d="M168 104 C 170 96, 176 92, 184 92 C 182 100, 176 104, 168 104 Z" fill="#5F8429" />
          </g>
          <path d="M168 104 L 168 110" stroke="#5F8429" strokeWidth="3.5" strokeLinecap="round" />
          {/* Cuerpo */}
          <circle cx="168" cy="124" r="19" fill="#CE5044" />
          <path d="M156 116 C 159 112, 164 110, 169 111" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.3" fill="none" />
          {/* Carita resignada */}
          <g className="kora-blink" style={{ transformOrigin: "168px 122px" }}>
            <circle cx="162" cy="121" r="2" fill="#1A1A1A" />
            <circle cx="174" cy="121" r="2" fill="#1A1A1A" />
          </g>
          {/* Boquita plana — aburrido, no triste-triste */}
          <path d="M163.5 130 H 172.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="157" cy="127" r="1.7" fill="#fff" opacity="0.4" />
          <circle cx="179" cy="127" r="1.7" fill="#fff" opacity="0.4" />
        </g>

        {/* Pasto mínimo */}
        <path d="M36 142 q 2 -7 5 -9 M196 140 q -2 -7 -5 -9" stroke="#76A035" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}
