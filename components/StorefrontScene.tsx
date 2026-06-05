// La vitrina, viva — un mini nodo KORA con la vitrina encendida y la zanahoria
// (sí, la misma del checkout) cruzando la calle a saltitos para entrar.
// CSS puro, en loop.
export default function StorefrontScene() {
  return (
    <div className="relative mx-auto w-full max-w-xl" aria-hidden="true">
      <svg viewBox="0 0 360 200" className="h-auto w-full">
        {/* Piso / andén */}
        <line x1="12" y1="172" x2="348" y2="172" stroke="#2C3E2B" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="180" cy="180" rx="150" ry="8" fill="#2C3E2B" opacity="0.05" />

        {/* Edificio */}
        <rect x="78" y="34" width="216" height="138" rx="10" fill="#EFEAE0" />
        {/* Banda de fachada con el wordmark */}
        <rect x="78" y="34" width="216" height="30" rx="10" fill="#2C3E2B" />
        <rect x="78" y="52" width="216" height="12" fill="#2C3E2B" />
        {/* Wordmark — misma tipografía del logo: Roboto black, tracking apretado */}
        <text
          x="186"
          y="55"
          textAnchor="middle"
          fontSize="16"
          fontWeight="900"
          letterSpacing="-0.7"
          fill="#F7F5F0"
          className="font-sans"
        >
          KORA
        </text>

        {/* Vitrina — el vidrio de piso a techo, encendido (respira) */}
        <rect x="92" y="74" width="128" height="98" rx="6" fill="#222220" />
        <rect x="96" y="78" width="120" height="90" rx="4" fill="#FFF6DF" className="animate-halo-breathe" />
        {/* Estantes de nogal con producto */}
        <rect x="104" y="104" width="104" height="4" rx="2" fill="#8A6D3B" />
        <rect x="104" y="132" width="104" height="4" rx="2" fill="#8A6D3B" />
        {/* Producto en estantes — frutas y verduras mínimas */}
        <circle cx="116" cy="98" r="5.5" fill="#CE5044" />
        <circle cx="131" cy="98" r="5.5" fill="#E08A3C" />
        <path d="M144 92 C 150 92, 153 96, 153 101 C 148 102, 143 99, 144 92 Z" fill="#76A035" />
        <circle cx="168" cy="98" r="5.5" fill="#8FBF4A" />
        <rect x="182" y="91" width="9" height="12" rx="2" fill="#C9B68A" />
        <circle cx="118" cy="126" r="5.5" fill="#8FBF4A" />
        <rect x="132" y="119" width="9" height="12" rx="2" fill="#6B4F34" />
        <circle cx="156" cy="126" r="5.5" fill="#CE5044" />
        <path d="M170 120 C 176 120, 179 124, 179 129 C 174 130, 169 127, 170 120 Z" fill="#5F8429" />
        <circle cx="196" cy="126" r="5.5" fill="#E08A3C" />
        {/* Isla baja de nogal */}
        <rect x="118" y="150" width="76" height="14" rx="3" fill="#6B4F34" />
        <circle cx="132" cy="148" r="4.5" fill="#76A035" />
        <circle cx="148" cy="147" r="4.5" fill="#CE5044" />
        <circle cx="164" cy="148" r="4.5" fill="#E08A3C" />
        <circle cx="180" cy="147" r="4.5" fill="#8FBF4A" />

        {/* Puerta de vidrio */}
        <rect x="232" y="74" width="48" height="98" rx="6" fill="#222220" />
        <rect x="236" y="78" width="40" height="94" rx="4" fill="#FFF1D0" opacity="0.9" />
        <line x1="256" y1="78" x2="256" y2="172" stroke="#222220" strokeWidth="2.5" />
        <circle cx="250" cy="126" r="2" fill="#222220" />
        <circle cx="262" cy="126" r="2" fill="#222220" />
        {/* Tapete de entrada */}
        <rect x="236" y="172" width="40" height="5" rx="2.5" fill="#76A035" opacity="0.5" />

        {/* Jardín vertical en la esquina */}
        <path d="M286 80 q 4 10 0 20 q -4 10 0 20 q 4 10 0 20" stroke="#76A035" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
        <circle cx="284" cy="92" r="3.5" fill="#8FBF4A" />
        <circle cx="289" cy="112" r="3.5" fill="#76A035" />
        <circle cx="284" cy="132" r="3.5" fill="#5F8429" />
        <circle cx="289" cy="152" r="3.5" fill="#8FBF4A" />

        {/* La fila de antojados — zanahoria, tomate y brócoli entran en turno */}
        <g className="kora-hopper" transform="translate(226, 0)">
          {/* Zanahoria */}
          <path d="M-4 124 C -6 116, -10 113, -15 111 M0 122 C 0 114, 1.5 110, 4.5 106 M3.5 124 C 6.5 119, 11 117, 15.5 117" stroke="#76A035" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M-9 124 C -10.5 139, -6 153, 0 161 C 6 153, 10.5 139, 9 124 C 3 121, -3 121, -9 124 Z" fill="#E08A3C" />
          <path d="M-6 133 H 6 M-4.5 142 H 4.5 M-2.5 151 H 2.5" stroke="#C9702A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="-3.5" cy="130" r="1.6" fill="#1A1A1A" />
          <circle cx="3.5" cy="130" r="1.6" fill="#1A1A1A" />
          <path d="M-3.5 135.5 C -1.5 138, 1.5 138, 3.5 135.5" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>

        <g className="kora-hopper" style={{ animationDelay: "2s" }} transform="translate(226, 0)">
          {/* Tomate */}
          <path d="M0 134 L 0 129" stroke="#5F8429" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M0 129 C -3 123, -9 121, -14 123 C -11 128, -5 130, 0 129 Z" fill="#76A035" />
          <path d="M0 129 C 2 123, 7 120, 13 121 C 11 127, 6 130, 0 129 Z" fill="#5F8429" />
          <circle cx="0" cy="147" r="14" fill="#CE5044" />
          <path d="M-8.5 141 C -6.5 138, -3 136.5, 0.5 137" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity="0.3" fill="none" />
          <circle cx="-4.5" cy="145" r="1.6" fill="#1A1A1A" />
          <circle cx="4.5" cy="145" r="1.6" fill="#1A1A1A" />
          <path d="M-4 151 C -1.5 153.5, 1.5 153.5, 4 151" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>

        <g className="kora-hopper" style={{ animationDelay: "4s" }} transform="translate(226, 0)">
          {/* Brócoli */}
          <path d="M0 161 L 0 146" stroke="#A7C957" strokeWidth="6" strokeLinecap="round" />
          <circle cx="-8" cy="138" r="8" fill="#5F8429" />
          <circle cx="8" cy="138" r="8" fill="#5F8429" />
          <circle cx="0" cy="131" r="9" fill="#76A035" />
          <circle cx="-13" cy="144" r="5.5" fill="#76A035" />
          <circle cx="13" cy="144" r="5.5" fill="#76A035" />
          <circle cx="-4" cy="140" r="1.6" fill="#1A1A1A" />
          <circle cx="4" cy="140" r="1.6" fill="#1A1A1A" />
          <path d="M-3.5 145 C -1.5 147, 1.5 147, 3.5 145" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      <p className="mt-2 text-center text-xs text-charcoal/45">
        Vidrio de piso a techo, isla de nogal, jardín vertical — y siempre alguien antojado.
      </p>
    </div>
  );
}
