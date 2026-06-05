// <Photo /> — KORA image placeholder system.
//
// Every photographic surface in the app renders through this component so the
// product always runs without binary assets in the repo (see .gitignore).
// Each `imageKey` deterministically maps to a curated gradient + organic motif,
// presented like a boutique-gallery item under diffuse, recessed LED light.
//
// ── How real photography drops in (the contract) ──
// When approved HD photography is available, replace the SVG body below with:
//   <img src={`/photography/hd/${imageKey}.webp`} alt={alt} className="..." />
// The `imageKey` is the single source of truth — filenames must match it.
// Spec completa: /image-format

// Fotos dummy locales (trial) — un archivo por imageKey en
// public/photography/products/. Cuando llegue la fotografía HD aprobada,
// estos archivos se reemplazan siguiendo el contrato de /image-format.
const LOCAL_PHOTOS = new Set<string>([
  "pulse-recovery", "pulse-vanilla", "pulse-greens", "pulse-collagen", "pulse-bar",
  "granola-amber", "origen-line", "origen-peanut", "origen-quinoa",
  "fresh-avocado", "fresh-spinach", "fresh-berries", "fresh-banano",
  "fresh-chicken", "fresh-yogurt", "fresh-eggs", "fresh-coconut", "fresh-almond",
]);

// Fotos dummy de recetas + pasos genéricos de cocina (1 prepara → 2 cocina →
// 3 mezcla → 4 sirve) reutilizados por todas las recetas.
const RECIPE_PHOTOS = new Set<string>(["bowl-green", "oats-cream", "smoothie-green", "wrap-earth", "salad-bright"]);
const STEP_RE = /^(andean-protein-bowl|pulse-overnight-oats|green-reset-smoothie|moss-power-wrap|origen-granola-jar|sprout-power-salad)-([1-4])$/;

function photoSrcFor(key: string): string | null {
  if (LOCAL_PHOTOS.has(key)) return `/photography/products/${key}.jpg`;
  if (RECIPE_PHOTOS.has(key)) return `/photography/recipes/${key}.jpg`;
  const step = key.match(STEP_RE);
  if (step) return `/photography/recipes/cooking-step-${step[2]}.jpg`;
  return null;
}

const PALETTES: Record<string, [string, string]> = {
  "bowl-green": ["#2C3E2B", "#76A035"],
  "oats-cream": ["#3A5238", "#C9B68A"],
  "smoothie-green": ["#5F8429", "#A7C957"],
  "wrap-earth": ["#3A5238", "#8A6D3B"],
  "granola-amber": ["#5A4326", "#C98A2B"],
  "salad-bright": ["#2C3E2B", "#8FBF4A"],
  "hero-store": ["#1E2B1D", "#2C3E2B"],
  "pulse-line": ["#141414", "#76A035"],
  "origen-line": ["#E7E1D3", "#C9B68A"],
  "store-facade": ["#1E2B1D", "#3A5238"],
  "produce-island": ["#2C3E2B", "#8FBF4A"],
  "wall-chiller": ["#141414", "#3A5238"],
};

// Stable hash → fallback palette so unknown keys still look intentional.
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function paletteFor(key: string): [string, string] {
  if (PALETTES[key]) return PALETTES[key];
  const h = hash(key);
  const hue = h % 60; // keep within the green/earth band
  return [`hsl(${90 + hue} 30% 22%)`, `hsl(${70 + hue} 45% 45%)`];
}

interface PhotoProps {
  imageKey?: string;
  alt?: string;
  className?: string;
  rounded?: string;
  label?: string;
  frame?: boolean;
}

interface Blob {
  cx: number;
  cy: number;
  r: number;
  o: number;
}

export default function Photo({
  imageKey = "bowl-green",
  alt = "",
  className = "",
  rounded = "rounded-kora",
  label,
  frame = false, // matte-black steel chiller frame
}: PhotoProps) {
  const [from, to] = paletteFor(imageKey);
  const seed = hash(imageKey);
  // A few organic blobs positioned deterministically from the seed.
  const blobs: Blob[] = Array.from({ length: 3 }, (_, i) => {
    const s = hash(imageKey + i);
    return {
      cx: 15 + (s % 70),
      cy: 15 + ((s >> 3) % 70),
      r: 18 + ((s >> 6) % 26),
      o: 0.12 + ((s >> 9) % 16) / 100,
    };
  });

  const photoSrc = photoSrcFor(imageKey);

  const inner = (
    <div
      className={`relative isolate overflow-hidden bg-moss ${frame ? "rounded-[0.75rem]" : rounded} ${className}`}
      role="img"
      aria-label={alt || label || imageKey}
    >
      {photoSrc ? (
        // Fotografía real (dummy local por ahora) — el imageKey es el contrato.
        <img src={photoSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={from} />
                <stop offset="100%" stopColor={to} />
              </linearGradient>
              <radialGradient id={`v-${seed}`} cx="50%" cy="38%" r="75%">
                <stop offset="55%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.34)" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill={`url(#g-${seed})`} />
            {blobs.map((b, i) => (
              <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="#fff" opacity={b.o} />
            ))}
            <rect width="100" height="100" fill={`url(#v-${seed})`} />
          </svg>

          {/* Recessed diffuse-LED halo — the boutique chiller lighting */}
          <div className="pointer-events-none absolute inset-x-0 -top-1/4 h-2/3 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.28),transparent_70%)]" />

          {/* High-stage lighting streak */}
          <div className="pointer-events-none absolute -inset-x-10 -top-10 h-24 rotate-[-8deg] bg-white/10 blur-2xl" />
        </>
      )}

      {/* Quiet KORA monogram, like a debossed studio watermark */}
      <span className="pointer-events-none absolute bottom-3 right-3 text-[10px] font-semibold uppercase tracking-wide2 text-white/45">
        KORA
      </span>

      {label ? (
        <span className="absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide2 text-white/85 backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  );

  if (!frame) return inner;

  // Matte-black brushed-steel frame, as recessed into the store walls.
  return (
    <div className="kora-frame">
      {inner}
      <span className="pointer-events-none absolute inset-2 rounded-[0.75rem] ring-1 ring-white/5" />
    </div>
  );
}
