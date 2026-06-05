// Los personajes de pasillo — cada categoría tiene su habitante con carita.
// CSS puro: flotan con kora-bob (el delay lo pone el tile) y parpadean.
import type { ReactNode } from "react";

export type PasilloCharacterName = "avocado" | "egg" | "jar" | "coconut" | "bottle";

export default function PasilloCharacter({ name }: { name: PasilloCharacterName }) {
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full" aria-hidden="true">
      <ellipse cx="70" cy="126" rx="38" ry="6" fill="#2C3E2B" opacity="0.08" />
      {CHARACTERS[name]}
    </svg>
  );
}

function Face({ cx, cy, dark = false, gap = 9 }: { cx: number; cy: number; dark?: boolean; gap?: number }) {
  const ink = dark ? "#F7F5F0" : "#1A1A1A";
  const half = gap / 2;
  return (
    <g>
      <g className="kora-blink" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx - half} cy={cy} r="2.1" fill={ink} />
        <circle cx={cx + half} cy={cy} r="2.1" fill={ink} />
      </g>
      <path
        d={`M${cx - half + 1} ${cy + 6.5} C ${cx - 1.5} ${cy + 9}, ${cx + 1.5} ${cy + 9}, ${cx + half - 1} ${cy + 6.5}`}
        stroke={ink}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={cx - half - 5} cy={cy + 5} r="1.8" fill="#CE5044" opacity="0.3" />
      <circle cx={cx + half + 5} cy={cy + 5} r="1.8" fill="#CE5044" opacity="0.3" />
    </g>
  );
}

const CHARACTERS: Record<PasilloCharacterName, ReactNode> = {
  // Frescos — el aguacate
  avocado: (
    <g>
      <path d="M70 22 C 58 22, 52 33, 50.5 45 C 47.5 66, 37 74, 37 92 C 37 112, 52 124, 70 124 C 88 124, 103 112, 103 92 C 103 74, 92.5 66, 89.5 45 C 88 33, 82 22, 70 22 Z" fill="#5F8429" />
      <path d="M70 34 C 62 34, 58 42, 56.5 51 C 54 68, 46 75, 46 90 C 46 106, 57 116, 70 116 C 83 116, 94 106, 94 90 C 94 75, 86 68, 83.5 51 C 82 42, 78 34, 70 34 Z" fill="#D8E8B0" />
      <circle cx="70" cy="94" r="14" fill="#8A6D3B" />
      <path d="M62 88 C 64 84, 68 82, 72 83" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.3" fill="none" />
      <Face cx={70} cy={58} />
    </g>
  ),

  // Proteínas — el huevo
  egg: (
    <g>
      <path d="M70 22 C 50 22, 38 52, 38 78 C 38 102, 52 118, 70 118 C 88 118, 102 102, 102 78 C 102 52, 90 22, 70 22 Z" fill="#FFF6E8" />
      <path d="M70 22 C 50 22, 38 52, 38 78 C 38 102, 52 118, 70 118 C 88 118, 102 102, 102 78 C 102 52, 90 22, 70 22 Z" fill="none" stroke="#C9B68A" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M52 48 C 55 38, 60 31, 66 28" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" fill="none" />
      <Face cx={70} cy={66} />
    </g>
  ),

  // Despensa — el frasco de mantequilla de maní
  jar: (
    <g>
      <rect x="44" y="34" width="52" height="12" rx="4" fill="#C9B68A" />
      <rect x="48" y="44" width="44" height="6" fill="#8A6D3B" opacity="0.35" />
      <path d="M44 50 L 96 50 C 99 50, 101 53, 101 57 L 101 112 C 101 118, 96 122, 90 122 L 50 122 C 44 122, 39 118, 39 112 L 39 57 C 39 53, 41 50, 44 50 Z" fill="#E08A3C" opacity="0.9" />
      <rect x="39" y="62" width="62" height="34" fill="#F7F5F0" />
      <text x="70" y="74" textAnchor="middle" fontSize="9" fontWeight="900" letterSpacing="-0.3" fill="#2C3E2B" className="font-sans">
        KORA
      </text>
      <Face cx={70} cy={84} gap={10} />
    </g>
  ),

  // Bebidas — el coco con pitillo
  coconut: (
    <g>
      <circle cx="70" cy="82" r="40" fill="#6B4F34" />
      <path d="M44 60 C 50 52, 60 46, 70 45 M50 102 C 44 96, 41 88, 41 80" stroke="#8A6D3B" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
      <ellipse cx="84" cy="52" rx="6" ry="4.5" fill="#3E2D1C" />
      {/* Pitillo */}
      <path d="M86 52 L 94 28 L 104 24" stroke="#76A035" strokeWidth="5" strokeLinecap="round" fill="none" />
      <Face cx={66} cy={78} dark gap={10} />
    </g>
  ),

  // Líneas KORA — la botella PULSE
  bottle: (
    <g>
      <rect x="60" y="20" width="20" height="10" rx="3" fill="#76A035" />
      <path d="M58 30 L 82 30 L 86 48 C 87 52, 88 56, 88 60 L 88 112 C 88 118, 83 122, 77 122 L 63 122 C 57 122, 52 118, 52 112 L 52 60 C 52 56, 53 52, 54 48 Z" fill="#222220" />
      <rect x="52" y="58" width="36" height="22" fill="#2C3E2B" />
      <text x="70" y="72" textAnchor="middle" fontSize="9.5" fontWeight="900" letterSpacing="0.4" fill="#8FBF4A" className="font-sans">
        PULSE
      </text>
      <path d="M58 36 C 60 34, 64 33, 68 33.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.25" fill="none" />
      <Face cx={70} cy={94} dark gap={10} />
    </g>
  ),
};
