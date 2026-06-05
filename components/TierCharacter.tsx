// Personajes de nivel del KORA Pass — la escalera completa del programa:
// Semilla → Sprout → Moss → Raíz → Bosque. El guardián de la cuenta cambia
// según el nivel y la escalera expandible los muestra a todos.
export default function TierCharacter({ tier }: { tier: string }) {
  switch (tier) {
    case "Semilla":
      return <SemillaCharacter />;
    case "Moss":
      return <MossCharacter />;
    case "Raíz":
      return <RaizCharacter />;
    case "Bosque":
      return <BosqueCharacter />;
    default:
      return <SproutCharacter />;
  }
}

// ── Semilla — donde todos empiezan ──
function SemillaCharacter() {
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full" aria-hidden="true">
      <ellipse cx="70" cy="122" rx="36" ry="6" fill="#1E2B1D" opacity="0.12" />
      <ellipse cx="70" cy="116" rx="26" ry="7" fill="#6B4F34" opacity="0.5" />
      {/* Cuerpo de semilla */}
      <path d="M70 34 C 50 34, 40 56, 42 80 C 44 102, 56 114, 70 114 C 84 114, 96 102, 98 80 C 100 56, 90 34, 70 34 Z" fill="#8A6D3B" />
      <path d="M70 42 C 58 42, 51 58, 52 78 C 53 95, 61 105, 70 105 C 79 105, 87 95, 88 78 C 89 58, 82 42, 70 42 Z" fill="#C9B68A" opacity="0.55" />
      <path d="M56 52 C 59 46, 64 42, 69 41" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.35" fill="none" />
      {/* Brotecito asomando — la promesa */}
      <path d="M70 34 L 70 26" stroke="#76A035" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 26 C 67.5 21, 63 19.5, 58 20.5 C 60.5 25.5, 65.5 27.5, 70 26 Z" fill="#8FBF4A" />
      {/* Carita */}
      <g className="kora-blink" style={{ transformOrigin: "70px 74px" }}>
        <circle cx="62" cy="73" r="2.2" fill="#1A1A1A" />
        <circle cx="78" cy="73" r="2.2" fill="#1A1A1A" />
      </g>
      <path d="M63.5 82 C 66.5 85, 73.5 85, 76.5 82" stroke="#1A1A1A" strokeWidth="2.1" strokeLinecap="round" fill="none" />
      <circle cx="55" cy="79" r="2" fill="#CE5044" opacity="0.3" />
      <circle cx="85" cy="79" r="2" fill="#CE5044" opacity="0.3" />
    </svg>
  );
}

// ── Raíz — la remolacha, bien plantada ──
function RaizCharacter() {
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full" aria-hidden="true">
      <ellipse cx="70" cy="124" rx="36" ry="6" fill="#1E2B1D" opacity="0.12" />
      {/* Hojas */}
      <path d="M62 40 C 56 28, 46 22, 34 22 C 38 38, 50 46, 62 40 Z" fill="#76A035" />
      <path d="M78 40 C 84 28, 94 22, 106 22 C 102 38, 90 46, 78 40 Z" fill="#5F8429" />
      <path d="M70 38 L 70 30 M62 42 L 58 36 M78 42 L 82 36" stroke="#5F8429" strokeWidth="3" strokeLinecap="round" />
      {/* Cuerpo de remolacha */}
      <path d="M70 40 C 50 40, 38 54, 38 72 C 38 90, 50 102, 60 110 C 66 115, 68 120, 70 126 C 72 120, 74 115, 80 110 C 90 102, 102 90, 102 72 C 102 54, 90 40, 70 40 Z" fill="#A84465" />
      <path d="M52 60 C 54 52, 60 46, 67 44" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.25" fill="none" />
      <path d="M56 92 C 62 96, 78 96, 84 92 M60 102 C 65 105, 75 105, 80 102" stroke="#7E2F4B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Carita */}
      <g className="kora-blink" style={{ transformOrigin: "70px 70px" }}>
        <circle cx="61" cy="69" r="2.3" fill="#F7F5F0" />
        <circle cx="79" cy="69" r="2.3" fill="#F7F5F0" />
      </g>
      <path d="M62.5 78 C 65.5 81.5, 74.5 81.5, 77.5 78" stroke="#F7F5F0" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="53" cy="75" r="2.1" fill="#fff" opacity="0.3" />
      <circle cx="87" cy="75" r="2.1" fill="#fff" opacity="0.3" />
    </svg>
  );
}

// ── Bosque — el nivel máximo: un árbol entero ──
function BosqueCharacter() {
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full" aria-hidden="true">
      <ellipse cx="70" cy="126" rx="42" ry="6.5" fill="#1E2B1D" opacity="0.15" />
      {/* Tronco */}
      <path d="M63 126 C 64 112, 64 100, 62 90 L 78 90 C 76 100, 76 112, 77 126 Z" fill="#6B4F34" />
      <path d="M66 108 C 69 106, 72 106, 74 108" stroke="#5A4326" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Copa frondosa */}
      <circle cx="44" cy="74" r="22" fill="#3A5238" />
      <circle cx="96" cy="74" r="22" fill="#3A5238" />
      <circle cx="70" cy="52" r="28" fill="#2C3E2B" />
      <circle cx="70" cy="74" r="24" fill="#3A5238" />
      {/* Brillos de hoja */}
      <circle cx="54" cy="48" r="6" fill="#76A035" opacity="0.45" />
      <circle cx="88" cy="52" r="5" fill="#76A035" opacity="0.4" />
      <circle cx="36" cy="70" r="4.5" fill="#76A035" opacity="0.35" />
      <circle cx="104" cy="72" r="4.5" fill="#76A035" opacity="0.35" />
      {/* Carita en la copa */}
      <g className="kora-blink" style={{ transformOrigin: "70px 72px" }}>
        <circle cx="62" cy="71" r="2.3" fill="#F7F5F0" />
        <circle cx="78" cy="71" r="2.3" fill="#F7F5F0" />
      </g>
      <path d="M63.5 80 C 66.5 83.5, 73.5 83.5, 76.5 80" stroke="#F7F5F0" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="54" cy="77" r="2.1" fill="#CE5044" opacity="0.4" />
      <circle cx="86" cy="77" r="2.1" fill="#CE5044" opacity="0.4" />
    </svg>
  );
}

// ── Sprout — saluda con una hoja y sostiene tu Pass con la otra ──
function SproutCharacter() {
  return (
    <svg viewBox="0 0 208 176" className="h-full w-full" aria-hidden="true">
      {/* Sombra + tierra */}
      <ellipse cx="104" cy="164" rx="62" ry="8" fill="#1E2B1D" opacity="0.25" />
      <ellipse cx="104" cy="158" rx="34" ry="9" fill="#6B4F34" opacity="0.55" />

      {/* Tallo */}
      <path d="M104 156 C 104 128, 102 108, 104 88" stroke="#5F8429" strokeWidth="7" strokeLinecap="round" fill="none" />

      {/* Hoja que saluda */}
      <g className="kora-waver" style={{ transformOrigin: "108px 102px" }}>
        <path d="M108 102 C 120 90, 138 86, 154 90 C 148 106, 130 114, 108 102 Z" fill="#8FBF4A" />
        <path d="M110 101 C 122 94, 136 91, 146 93" stroke="#5F8429" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      </g>

      {/* Hoja que sostiene el Pass */}
      <path d="M101 118 C 88 112, 74 112, 64 118 C 72 130, 88 132, 101 118 Z" fill="#76A035" />
      <g transform="rotate(-8 60 132)">
        <rect x="38" y="118" width="44" height="30" rx="6" fill="#2C3E2B" />
        <rect x="38" y="118" width="44" height="30" rx="6" fill="none" stroke="#F7F5F0" strokeOpacity="0.2" />
        <text x="45" y="130" fontSize="7.5" fontWeight="900" letterSpacing="-0.3" fill="#F7F5F0" className="font-sans">
          KORA
        </text>
        <g fill="#F7F5F0" opacity="0.9">
          <rect x="67" y="123" width="3.4" height="3.4" />
          <rect x="72" y="123" width="3.4" height="3.4" />
          <rect x="67" y="128" width="3.4" height="3.4" />
          <rect x="74" y="130" width="3.4" height="3.4" />
          <rect x="70" y="133" width="3.4" height="3.4" />
        </g>
        <rect x="44" y="136" width="22" height="3" rx="1.5" fill="#76A035" />
        <rect x="44" y="141" width="14" height="3" rx="1.5" fill="#F7F5F0" opacity="0.35" />
      </g>

      {/* Cabeza — el cogollo */}
      <circle cx="104" cy="64" r="26" fill="#8FBF4A" />
      <path d="M104 38 C 96 28, 84 24, 72 26 C 76 38, 88 44, 104 38 Z" fill="#76A035" />
      <path d="M104 38 C 110 26, 122 20, 136 22 C 132 36, 118 44, 104 38 Z" fill="#5F8429" />

      {/* Carita */}
      <g className="kora-blink" style={{ transformOrigin: "104px 62px" }}>
        <circle cx="96" cy="61" r="2.4" fill="#1A1A1A" />
        <circle cx="112" cy="61" r="2.4" fill="#1A1A1A" />
      </g>
      <path d="M97 70 C 100 74, 108 74, 111 70" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="89" cy="68" r="2.2" fill="#CE5044" opacity="0.3" />
      <circle cx="119" cy="68" r="2.2" fill="#CE5044" opacity="0.3" />
    </svg>
  );
}

// ── Moss — el montecito de musgo que espera en el siguiente nivel ──
function MossCharacter() {
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full" aria-hidden="true">
      <ellipse cx="70" cy="124" rx="44" ry="7" fill="#1E2B1D" opacity="0.15" />

      {/* Montecito de musgo */}
      <circle cx="46" cy="96" r="26" fill="#3A5238" />
      <circle cx="94" cy="96" r="26" fill="#3A5238" />
      <circle cx="70" cy="78" r="32" fill="#2C3E2B" />
      {/* Textura esponjosa */}
      <circle cx="52" cy="70" r="7" fill="#5F8429" opacity="0.45" />
      <circle cx="88" cy="66" r="6" fill="#5F8429" opacity="0.4" />
      <circle cx="36" cy="92" r="5" fill="#5F8429" opacity="0.35" />
      <circle cx="104" cy="94" r="5.5" fill="#5F8429" opacity="0.35" />
      <circle cx="70" cy="108" r="6" fill="#5F8429" opacity="0.3" />

      {/* Brotecito en la cabeza — aspiración */}
      <path d="M70 46 L 70 36" stroke="#76A035" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M70 36 C 67 30, 61 28, 55 29 C 58 35, 64 38, 70 36 Z" fill="#8FBF4A" />

      {/* Carita — tinta clara sobre cuerpo oscuro */}
      <g className="kora-blink" style={{ transformOrigin: "70px 82px" }}>
        <circle cx="61" cy="81" r="2.3" fill="#F7F5F0" />
        <circle cx="79" cy="81" r="2.3" fill="#F7F5F0" />
      </g>
      <path d="M62.5 90 C 65.5 93.5, 74.5 93.5, 77.5 90" stroke="#F7F5F0" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="53" cy="88" r="2.2" fill="#CE5044" opacity="0.4" />
      <circle cx="87" cy="88" r="2.2" fill="#CE5044" opacity="0.4" />
    </svg>
  );
}
