// Desfile del mercado — la zanahoria empuja el carrito (con el tomate de
// copiloto saludando) a lo largo del hero de la tienda. CSS puro, en loop.
export default function CartParade() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-1 h-16 overflow-hidden" aria-hidden="true">
      <div className="kora-stroller absolute bottom-0 w-32">
        <svg viewBox="0 0 128 64" className="h-16 w-32">
          {/* Carrito */}
          <path d="M14 18 L 22 18 L 28 40 L 66 40 L 72 24 L 30 24" stroke="#F7F5F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M30 26 L 69 26 L 65 38 L 29 38 Z" fill="#F7F5F0" opacity="0.18" />
          {/* Mercado dentro del carrito */}
          <circle cx="38" cy="24" r="5" fill="#8FBF4A" />
          <circle cx="48" cy="22" r="5.5" fill="#CE5044" />
          <rect x="55" y="15" width="8" height="10" rx="2" fill="#C9B68A" />
          {/* Hojita del tomate copiloto */}
          <path d="M48 14 L 48 11" stroke="#5F8429" strokeWidth="2" strokeLinecap="round" />
          <path d="M48 11 C 46 8, 42 7, 39 8 C 41 11, 45 12, 48 11 Z" fill="#76A035" />
          {/* Ruedas con radios — se nota que giran */}
          <g className="kora-roll" style={{ transformOrigin: "32px 47px" }}>
            <circle cx="32" cy="47" r="6" fill="none" stroke="#F7F5F0" strokeWidth="2.5" />
            <path d="M32 41.5 V 52.5 M26.5 47 H 37.5" stroke="#F7F5F0" strokeWidth="1.6" />
          </g>
          <g className="kora-roll" style={{ transformOrigin: "60px 47px" }}>
            <circle cx="60" cy="47" r="6" fill="none" stroke="#F7F5F0" strokeWidth="2.5" />
            <path d="M60 41.5 V 52.5 M54.5 47 H 65.5" stroke="#F7F5F0" strokeWidth="1.6" />
          </g>

          {/* Zanahoria empujando */}
          <g>
            <path d="M97 18 C 95 12, 91 10, 86 9 M101 17 C 101 11, 102 8, 105 4 M104.5 18 C 107 14, 111 12, 115 12" stroke="#76A035" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M94 19 C 92.5 31, 96 43, 101 50 C 106 43, 109.5 31, 108 19 C 103.5 16.5, 98.5 16.5, 94 19 Z" fill="#E08A3C" />
            <path d="M96.5 26 H 105.5 M97.5 33 H 104.5 M99 41 H 103" stroke="#C9702A" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="98.5" cy="24" r="1.4" fill="#1A1A1A" />
            <circle cx="104" cy="24" r="1.4" fill="#1A1A1A" />
            <path d="M98.5 28.5 C 100 30.5, 102.5 30.5, 104 28.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            {/* Bracito al manubrio */}
            <path d="M95 24 C 88 23, 80 21, 73 20" stroke="#E08A3C" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}
