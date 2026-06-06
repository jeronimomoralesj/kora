"use client";

import { useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import Logo from "@/components/Logo";
import PasilloCharacter from "@/components/PasilloCharacter";
import type { Member } from "@/lib/types";

// KORA Pass — la tarjeta de membresía física, en digital. Frente tipo tarjeta
// premium; al tocarla gira y muestra el QR + número para el lector de caja.
// El miembro elige el estilo del frente: de la formal a la de los personajes.

type ThemeId = "clasica" | "cosecha" | "sprout" | "nocturna";

interface PassTheme {
  id: ThemeId;
  name: string;
  tagline: string;
  card: string; // fondo + tinta base del frente
  ring: string;
  shine: string;
  faint: string; // labels suaves
  soft: string; // nfc / secundarios
  avatar: string;
  deco?: ReactNode;
}

const PASS_THEMES: PassTheme[] = [
  {
    id: "clasica",
    name: "Clásica",
    tagline: "la formal, de musgo profundo",
    card: "bg-gradient-to-br from-moss-900 via-moss to-moss-700 text-alabaster",
    ring: "ring-1 ring-white/10",
    shine: "bg-white/5",
    faint: "text-alabaster/55",
    soft: "text-alabaster/60",
    avatar: "bg-alabaster/10 ring-alabaster/25",
  },
  {
    id: "cosecha",
    name: "Cosecha",
    tagline: "con los personajes de pasillo",
    card: "bg-gradient-to-br from-white via-alabaster to-travertine text-moss",
    ring: "ring-1 ring-moss/15",
    shine: "bg-sprout/10",
    faint: "text-moss/50",
    soft: "text-moss/50",
    avatar: "bg-moss/8 ring-moss/20",
    deco: (
      <span className="pointer-events-none absolute right-3 top-8 flex items-end -space-x-2" aria-hidden="true">
        {(["egg", "avocado", "coconut"] as const).map((n, i) => (
          <span key={n} className="kora-bob h-10 w-9" style={{ animationDelay: `${i * 0.4}s` }}>
            <PasilloCharacter name={n} />
          </span>
        ))}
      </span>
    ),
  },
  {
    id: "sprout",
    name: "Sprout",
    tagline: "la vibrante, verde total",
    card: "bg-gradient-to-br from-sprout-dark via-sprout to-sprout-light text-white",
    ring: "ring-1 ring-white/25",
    shine: "bg-white/15",
    faint: "text-white/65",
    soft: "text-white/70",
    avatar: "bg-white/15 ring-white/30",
    deco: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="pointer-events-none absolute -bottom-8 -right-5 h-36 w-36 rotate-12 text-white/10"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
      </svg>
    ),
  },
  {
    id: "nocturna",
    name: "Nocturna",
    tagline: "modo PULSE, acero y neón",
    card: "bg-gradient-to-br from-[#141414] via-steel to-[#26261f] text-alabaster",
    ring: "ring-1 ring-sprout/30",
    shine: "bg-sprout/10",
    faint: "text-alabaster/45",
    soft: "text-sprout-light/70",
    avatar: "bg-sprout/15 ring-sprout/40 text-sprout-light",
    deco: (
      <span
        className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-sprout/20 blur-2xl"
        aria-hidden="true"
      />
    ),
  },
];

const THEME_KEY = "kora-pass-style";

export default function KoraPass({
  member,
  dark = false,
  customizable = false,
}: {
  member: Member;
  dark?: boolean;
  customizable?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [themeId, setThemeId] = useState<ThemeId>("clasica");

  // El estilo elegido vive en el navegador — la tarjeta se ve igual en
  // la cuenta y en la página del Pass.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(THEME_KEY) as ThemeId | null;
      if (raw && PASS_THEMES.some((t) => t.id === raw)) setThemeId(raw);
    } catch {}
  }, []);

  const pickTheme = (id: ThemeId) => {
    setThemeId(id);
    try {
      localStorage.setItem(THEME_KEY, id);
    } catch {}
  };

  const t = PASS_THEMES.find((x) => x.id === themeId) ?? PASS_THEMES[0];

  const grid = buildMatrix(member.passId, 25);
  const pretty = member.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const copy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(member.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard no disponible — no-op en el prototipo */
    }
  };

  return (
    <div>
      <p className={`kora-eyebrow ${dark ? "text-sprout-light" : ""}`}>Acceso sin fricción</p>
      <h3 className={`mt-1 text-lg font-bold ${dark ? "text-alabaster" : "text-moss"}`}>Tu KORA Pass</h3>

      {/* Tarjeta — tocar para girar */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? "Ver frente de la tarjeta" : "Mostrar código para el lector"}
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((v) => !v)}
        className="mt-4 block w-full cursor-pointer outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-sprout"
      >
        <div
          className={`relative aspect-[1.586/1] w-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ── Frente — viste el estilo elegido ── */}
          <div
            className={`kora-grain absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-lift [backface-visibility:hidden] sm:p-5 ${t.card} ${t.ring}`}
          >
            {/* brillo diagonal */}
            <div className={`pointer-events-none absolute -inset-x-10 -top-16 h-40 rotate-[-12deg] blur-2xl ${t.shine}`} />
            {t.deco}

            <div className="relative flex items-start justify-between">
              <span className="flex flex-col leading-none">
                <Logo className="text-xl text-current" />
                <span className={`mt-1 text-[8px] font-medium uppercase tracking-wide3 ${t.faint}`}>
                  Foods &amp; Provisions
                </span>
              </span>
              <span className="rounded-full bg-sprout px-2.5 py-1 text-[9px] font-black uppercase tracking-wide2 text-white">
                Miembro {member.tier}
              </span>
            </div>

            {/* chip + contactless */}
            <div className="relative flex items-center gap-3">
              <span className="relative h-8 w-11 overflow-hidden rounded-md bg-gradient-to-br from-[#C9B68A] to-[#8A6D3B]">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/25" />
                <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/25" />
                <span className="absolute inset-1.5 rounded-sm border border-black/20" />
              </span>
              <NfcWaves className={t.soft} />
            </div>

            <div className="relative">
              <p className="font-mono text-xl font-bold tracking-[0.12em] tabular-nums sm:text-2xl sm:tracking-[0.14em]">{pretty}</p>
              <div className="mt-2 flex items-end justify-between gap-3 sm:mt-3">
                <div className="min-w-0">
                  <p className={`text-[9px] font-medium uppercase tracking-wide2 ${t.faint}`}>Miembro</p>
                  <p className="truncate text-xs font-bold uppercase tracking-wide2 sm:text-sm">{member.name}</p>
                  <p className={`mt-0.5 text-[10px] ${t.faint}`}>Desde {member.joined}</p>
                </div>
                <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-black ring-1 sm:h-11 sm:w-11 ${t.avatar}`}>
                  {initials}
                </span>
              </div>
            </div>
          </div>

          {/* ── Reverso — QR + número para el lector (igual en todos los estilos) ── */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-moss/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {/* banda magnética */}
            <div className="h-7 w-full flex-none bg-steel" />

            <div className="flex flex-1 items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
              {/* QR */}
              <div className="relative flex-none rounded-lg bg-white p-1.5 ring-1 ring-moss/15">
                <div className="relative overflow-hidden rounded-sm">
                  <svg
                    viewBox={`0 0 ${grid.length} ${grid.length}`}
                    className="h-24 w-24 sm:h-28 sm:w-28"
                    shapeRendering="crispEdges"
                    role="img"
                    aria-label="Código QR de KORA Pass"
                  >
                    <rect width={grid.length} height={grid.length} fill="#fff" />
                    {grid.map((row, y) =>
                      row.map((on, x) =>
                        on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1A1A1A" /> : null
                      )
                    )}
                    {finderEyes(grid.length)}
                  </svg>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-sprout/0 via-sprout/30 to-sprout/0" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wide2 text-charcoal/40">
                  Escanéalo en caja
                </p>
                <button
                  onClick={copy}
                  className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-base font-bold tracking-wide2 text-moss tabular-nums transition-colors hover:text-sprout-dark sm:text-lg"
                  aria-label="Copiar número"
                >
                  {pretty}
                  <span className="text-[10px] font-sans font-semibold text-sprout-dark">
                    {copied ? "Copiado ✓" : "Copiar"}
                  </span>
                </button>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-charcoal/55">
                  <NfcWaves className="text-sprout" small pulse />
                  o acércala al lector
                </p>
              </div>
            </div>

            {/* código de barras + id */}
            <div className="flex-none px-4 pb-3 sm:px-5">
              <Barcode seed={member.passId} />
              <div className="mt-1.5 flex items-center justify-between text-[9px] text-charcoal/40">
                <span className="font-mono">{member.passId}</span>
                <span>Personal e intransferible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={`mt-3 text-center text-xs ${dark ? "text-alabaster/55" : "text-charcoal/45"}`}>
        {flipped ? "Toca la tarjeta para volver al frente." : "Toca la tarjeta para mostrar tu código en caja."}
      </p>

      {/* ── Estilo de la tarjeta — elige tu frente ── */}
      {customizable && (
        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
            Estilo de tu tarjeta
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            {PASS_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => pickTheme(theme.id)}
                aria-label={`Estilo ${theme.name}`}
                aria-pressed={theme.id === themeId}
                className={`relative h-11 w-[4.5rem] overflow-hidden rounded-[0.7rem_0.25rem_0.7rem_0.25rem] transition-all ${theme.card} ${
                  theme.id === themeId
                    ? "ring-2 ring-sprout ring-offset-2 ring-offset-alabaster"
                    : "ring-1 ring-moss/15 hover:ring-moss/35"
                }`}
              >
                {theme.id === themeId && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute bottom-1 right-1 h-3.5 w-3.5 opacity-80"
                    aria-hidden="true"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-charcoal/45">
            <span className="font-semibold text-moss">{t.name}</span> — {t.tagline}
          </p>
        </div>
      )}
    </div>
  );
}

function NfcWaves({ className = "", small = false, pulse = false }: { className?: string; small?: boolean; pulse?: boolean }) {
  const s = small ? 14 : 20;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={`${className} ${pulse ? "animate-pulse" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 8.5a7 7 0 0 1 0 7" />
      <path d="M9.5 6a11 11 0 0 1 0 12" />
      <path d="M13 3.5a15 15 0 0 1 0 17" />
    </svg>
  );
}

// Código de barras falso pero determinista — mismo seed, mismas barras.
function Barcode({ seed }: { seed: string }) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  while (x < 100) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    h >>>= 0;
    const w = 0.8 + (h % 3) * 0.8;
    if (h % 2) bars.push({ x, w });
    x += w + 0.8;
  }
  return (
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-6 w-full" aria-hidden="true">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="10" fill="#1A1A1A" />
      ))}
    </svg>
  );
}

// Build a deterministic on/off matrix from a string — looks like a QR, isn't one.
function buildMatrix(seedStr: string, size: number): boolean[][] {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const rand = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    h >>>= 0;
    return h / 4294967296;
  };
  const m = Array.from({ length: size }, () => Array.from({ length: size }, () => rand() > 0.52));
  return m;
}

// Three rounded finder-eye squares like a real QR.
function finderEyes(size: number) {
  const positions: [number, number][] = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];
  return positions.map(([x, y], i) => (
    <g key={i}>
      <rect x={x} y={y} width="7" height="7" fill="#1A1A1A" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="#76A035" />
    </g>
  ));
}
