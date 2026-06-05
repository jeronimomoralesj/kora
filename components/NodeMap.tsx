import Logo from "@/components/Logo";

// Mapa de barrio estilizado — no es cartografía real, es señalética KORA:
// manzanas en travertino, calles en alabastro, un parque sprout y el pin del
// nodo latiendo en la esquina. `streets` nombra los dos ejes.
interface NodeMapProps {
  streets?: { v: string; h: string };
  open?: boolean;
  address?: string;
  hours?: string;
}

export default function NodeMap({ streets = { v: "Carrera 7", h: "Calle 70" }, open = true, address, hours }: NodeMapProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem_0.8rem_2rem_0.8rem] bg-alabaster shadow-soft ring-1 ring-moss/10">
      <svg viewBox="0 0 400 280" className="block w-full" role="img" aria-label={`Mapa del nodo — ${streets.v} con ${streets.h}`}>
        <rect width="400" height="280" fill="#F7F5F0" />

        {/* Manzanas — travertino con esquinas hoja */}
        {[
          // [x, y, w, h]
          [16, 16, 150, 92],
          [16, 132, 150, 60],
          [16, 216, 150, 48],
          [190, 16, 90, 92],
          [304, 16, 80, 92],
          [190, 216, 194, 48],
          [304, 132, 80, 60],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="10"
            fill="#EFEAE0"
          />
        ))}

        {/* Parque — la mancha sprout del barrio */}
        <rect x="190" y="132" width="90" height="60" rx="14" fill="#76A035" opacity="0.16" />
        <circle cx="218" cy="158" r="7" fill="#76A035" opacity="0.35" />
        <circle cx="240" cy="170" r="5" fill="#76A035" opacity="0.3" />
        <circle cx="256" cy="152" r="6" fill="#76A035" opacity="0.25" />
        <text x="235" y="186" textAnchor="middle" fontSize="7" fill="#2C3E2B" opacity="0.45" fontWeight="700" letterSpacing="1">
          PARQUE
        </text>

        {/* Nombres de las calles */}
        <text x="200" y="124" textAnchor="middle" fontSize="8" fill="#2C3E2B" opacity="0.5" fontWeight="700" letterSpacing="2">
          {streets.h.toUpperCase()}
        </text>
        <text x="178" y="150" fontSize="8" fill="#2C3E2B" opacity="0.5" fontWeight="700" letterSpacing="2" transform="rotate(90 178 150)">
          {streets.v.toUpperCase()}
        </text>

        {/* Recorridos punteados hacia el nodo */}
        <path d="M40 112 H 170 M 296 200 V 120" stroke="#76A035" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* Brújula hoja */}
        <g transform="translate(368, 36)">
          <circle r="14" fill="#fff" stroke="#2C3E2B" strokeOpacity="0.15" />
          <path d="M0 -8 L3.5 4 L0 1.5 L-3.5 4 Z" fill="#76A035" />
          <text y="-18" textAnchor="middle" fontSize="8" fill="#2C3E2B" opacity="0.55" fontWeight="700">N</text>
        </g>
      </svg>

      {/* Pin del nodo — late sobre la esquina de la intersección */}
      <div className="absolute left-[44%] top-[40%]">
        <span className="absolute -inset-3 animate-pulse-ring rounded-full bg-sprout/40" aria-hidden="true" />
        <span className="relative flex items-center justify-center rounded-[0.8rem_0.3rem_0.8rem_0.3rem] bg-moss px-2.5 py-1.5 shadow-lift ring-2 ring-alabaster">
          <Logo className="text-[11px] text-alabaster" />
        </span>
      </div>

      {/* Barra de datos */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-moss/10 bg-white px-5 py-3.5">
        <p className="text-sm font-semibold text-moss">{address}</p>
        <p className={`text-xs font-bold uppercase tracking-wide2 ${open ? "text-sprout-dark" : "text-charcoal/45"}`}>
          {open ? `Abierto · ${hours}` : "Próximamente"}
        </p>
      </div>
    </div>
  );
}
