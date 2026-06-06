"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PasilloCharacter, { type PasilloCharacterName } from "@/components/PasilloCharacter";

// ─────────────────────────────────────────────────────────────
// El Empaque Perfecto — el stacker de KORA.
// Los productos se balancean sobre la canasta: toca para soltarlos y
// arma la torre. Si no encajan, se caen. El huevo es frágil: necesita
// mejor puntería pero vale doble. Tres caídas y se acabó el mercado.
// ─────────────────────────────────────────────────────────────

type StackItemType = PasilloCharacterName | "box";

interface PlacedItem {
  id: number;
  x: number; // borde izquierdo
  type: StackItemType;
  perfect: boolean;
}

type Status = "idle" | "playing" | "over";

const ITEM_W = 56;
const ITEM_H = 44;
const BASKET_W = 112;
const FLOOR_H = 30;
const STORAGE_KEY = "kora-stack-best";
const TYPES: StackItemType[] = ["avocado", "jar", "coconut", "bottle", "box"];

// Overlap mínimo para que el producto se quede en la torre.
const NEEDED = 0.45;
const NEEDED_EGG = 0.65; // el huevo es frágil
const PERFECT = 0.85;

export default function StackGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(3);
  const [stack, setStack] = useState<PlacedItem[]>([]);
  const [swingX, setSwingX] = useState(0);
  const [current, setCurrent] = useState<StackItemType>("avocado");
  const [toast, setToast] = useState<string | null>(null);
  const [falling, setFalling] = useState<{ x: number; type: StackItemType } | null>(null);

  const live = useRef({
    t: 0,
    swingX: 0,
    speed: 0.0016, // rad por ms
    stack: [] as PlacedItem[],
    score: 0,
    lives: 3,
    nextId: 1,
    current: "avocado" as StackItemType,
  });
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBest(Number(raw) || 0);
    } catch {}
  }, []);

  const pickNext = useCallback((): StackItemType => {
    // El huevo aparece ~1 de cada 4 — la prueba de pulso.
    if (Math.random() < 0.25) return "egg";
    return TYPES[Math.floor(Math.random() * TYPES.length)];
  }, []);

  const finish = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setStatus("over");
    setBest((prev) => {
      const next = Math.max(prev, live.current.score);
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  const tick = useCallback((now: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { width } = el.getBoundingClientRect();
    const dt = Math.min(48, now - lastRef.current);
    lastRef.current = now;
    const s = live.current;

    s.t += dt;
    const amplitude = (width - ITEM_W) / 2 - 8;
    s.swingX = width / 2 - ITEM_W / 2 + Math.sin(s.t * s.speed) * amplitude;
    setSwingX(s.swingX);

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    live.current = {
      t: 0,
      swingX: 0,
      speed: 0.0016,
      stack: [],
      score: 0,
      lives: 3,
      nextId: 1,
      current: pickNext(),
    };
    setStack([]);
    setScore(0);
    setLives(3);
    setToast(null);
    setFalling(null);
    setCurrent(live.current.current);
    setStatus("playing");
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [pickNext, tick]);

  const drop = useCallback(() => {
    const el = containerRef.current;
    if (!el || status !== "playing" || falling) return;
    const { width } = el.getBoundingClientRect();
    const s = live.current;

    const x = s.swingX;
    const type = s.current;

    // Base de aterrizaje: el último de la torre, o la canasta.
    const baseX = s.stack.length > 0 ? s.stack[s.stack.length - 1].x : width / 2 - BASKET_W / 2;
    const baseW = s.stack.length > 0 ? ITEM_W : BASKET_W;

    const overlapPx = Math.min(x + ITEM_W, baseX + baseW) - Math.max(x, baseX);
    const ratio = Math.max(0, overlapPx) / ITEM_W;
    const needed = type === "egg" ? NEEDED_EGG : NEEDED;

    if (ratio < needed) {
      // Se cae — pierde una vida
      s.lives -= 1;
      setLives(s.lives);
      setFalling({ x, type });
      setToast(type === "egg" ? "¡Se rompió el huevo! 🥚" : "¡Se cayó!");
      setTimeout(() => {
        setFalling(null);
        setToast(null);
      }, 700);
      if (s.lives <= 0) {
        setTimeout(finish, 720);
      }
      return;
    }

    const perfect = ratio >= PERFECT;
    const points = (type === "egg" ? 20 : 10) + (perfect ? 10 : 0);
    s.score += points;
    s.stack = [...s.stack, { id: s.nextId++, x, type, perfect }];
    s.speed = Math.min(0.0034, 0.0016 + s.stack.length * 0.00009);
    s.current = pickNext();

    setStack(s.stack);
    setScore(s.score);
    setCurrent(s.current);
    if (perfect) {
      setToast("¡Empaque perfecto! +10");
      setTimeout(() => setToast(null), 650);
    }
  }, [status, falling, pickNext, finish]);

  // Espacio / flecha abajo también sueltan.
  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        drop();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, drop]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // La cámara baja cuando la torre crece, para que la cima quede visible.
  const fieldH = 440;
  const towerTop = FLOOR_H + 24 + stack.length * ITEM_H;
  const camera = Math.max(0, towerTop - (fieldH - 150));

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Marcador */}
      <div className="flex items-end justify-between gap-4 px-1">
        <p className="text-sm text-charcoal/55">
          Puntos <span className="text-2xl font-black tabular-nums tracking-tightest text-moss">{score}</span>
        </p>
        <div className="flex items-center gap-1.5" aria-label={`${lives} vidas`}>
          {[0, 1, 2].map((i) => (
            <LifeLeaf key={i} alive={i < lives} />
          ))}
        </div>
        <p className="text-sm text-charcoal/55">
          Récord <span className="text-2xl font-black tabular-nums tracking-tightest text-sprout-dark">{best}</span>
        </p>
      </div>

      {/* Campo */}
      <div
        ref={containerRef}
        onPointerDown={drop}
        className="relative mt-3 w-full touch-none select-none overflow-hidden rounded-[2rem_0.8rem_2rem_0.8rem] bg-gradient-to-b from-white via-alabaster to-travertine ring-1 ring-moss/10"
        style={{ height: fieldH }}
      >
        {/* Piso */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t-2 border-moss/15 bg-travertine/80" style={{ height: FLOOR_H, transform: `translateY(${camera}px)` }} />

        {/* Canasta base */}
        {status !== "idle" && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: "50%",
              bottom: FLOOR_H - 6 - camera,
              transform: "translateX(-50%)",
              width: BASKET_W,
            }}
          >
            <BasketBase />
          </div>
        )}

        {/* La torre */}
        {stack.map((it, i) => (
          <div
            key={it.id}
            className="pointer-events-none absolute"
            style={{
              left: it.x,
              bottom: FLOOR_H + 22 + i * ITEM_H - camera,
              width: ITEM_W,
              height: ITEM_H + 10,
            }}
          >
            <StackArt type={it.type} />
            {it.perfect && (
              <span className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="#76A035" aria-hidden="true">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
                </svg>
              </span>
            )}
          </div>
        ))}

        {/* El que se cayó — tumba rápida */}
        {falling && (
          <div
            className="pointer-events-none absolute animate-fade-up opacity-40"
            style={{
              left: falling.x,
              bottom: FLOOR_H - camera,
              width: ITEM_W,
              height: ITEM_H + 10,
              transform: "rotate(24deg)",
            }}
          >
            <StackArt type={falling.type} />
          </div>
        )}

        {/* El que se balancea */}
        {status === "playing" && !falling && (
          <div
            className="pointer-events-none absolute top-5"
            style={{ transform: `translateX(${swingX}px)`, width: ITEM_W, height: ITEM_H + 10 }}
          >
            <StackArt type={current} />
            {current === "egg" && (
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-black uppercase tracking-wide2 text-[#8A6D3B]">
                ¡Frágil!
              </span>
            )}
          </div>
        )}

        {/* Toast */}
        {toast && (
          <p className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 animate-fade-up whitespace-nowrap rounded-[1rem_0.35rem_1rem_0.35rem] bg-moss px-4 py-2 text-sm font-bold text-alabaster shadow-lift">
            {toast}
          </p>
        )}

        {/* Overlay de inicio */}
        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex items-end gap-1" aria-hidden="true">
              {(["jar", "egg", "avocado"] as const).map((n, i) => (
                <span key={n} className="kora-bob h-16 w-14" style={{ animationDelay: `${i * 0.35}s` }}>
                  <PasilloCharacter name={n} />
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-black tracking-tightest text-moss sm:text-3xl">El Empaque Perfecto</h2>
            <p className="max-w-xs text-sm text-charcoal/60">
              Los productos se balancean: toca (o Espacio) para soltarlos sobre la
              torre. El huevo es frágil — necesita mejor puntería, pero vale doble.
            </p>
            <button onClick={start} className="kora-cta text-base">
              Empacar
            </button>
          </div>
        )}

        {/* Overlay de fin */}
        {status === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-alabaster/90 px-6 text-center backdrop-blur-sm">
            <span className="h-16 w-16" aria-hidden="true">
              <PasilloCharacter name="jar" />
            </span>
            <h2 className="text-2xl font-black tracking-tightest text-moss">¡Se cayó el mercado!</h2>
            <p className="text-sm text-charcoal/60">
              Empacaste <span className="font-black text-moss">{stack.length}</span> productos ·{" "}
              <span className="font-black text-moss">{score}</span> puntos
              {score >= best && score > 0 ? " — ¡nuevo récord! 🌱" : ` · tu récord es ${best}`}
            </p>
            <button onClick={start} className="kora-cta">
              Empacar otra vez
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-charcoal/45">
        10 pts por producto · huevo 20 · +10 por empaque perfecto — cada piso acelera el balanceo.
      </p>
    </div>
  );
}

function StackArt({ type }: { type: StackItemType }) {
  if (type === "box") {
    return (
      <svg viewBox="0 0 56 54" className="h-full w-full" aria-hidden="true">
        <rect x="2" y="6" width="52" height="46" rx="4" fill="#C9B68A" />
        <rect x="2" y="6" width="52" height="11" rx="4" fill="#8A6D3B" opacity="0.5" />
        <text x="28" y="38" textAnchor="middle" fontSize="11" fontWeight="900" letterSpacing="-0.3" fill="#2C3E2B" opacity="0.8" className="font-sans">
          KORA
        </text>
      </svg>
    );
  }
  return <PasilloCharacter name={type} />;
}

// El huevo también vive en PasilloCharacter — lo exponemos en el tipo del juego.
type LifeProps = { alive: boolean };
function LifeLeaf({ alive }: LifeProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={alive ? "#76A035" : "none"}
      stroke={alive ? "#5F8429" : "#2C3E2B"}
      strokeOpacity={alive ? 1 : 0.25}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={alive ? "" : "opacity-50"}
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
    </svg>
  );
}

// Canasta base — la plataforma donde arranca la torre.
function BasketBase() {
  return (
    <svg viewBox="0 0 112 40" className="w-full" aria-hidden="true">
      <path d="M6 6 L 106 6 L 98 38 L 14 38 Z" fill="#C9B68A" />
      <path d="M6 6 L 106 6 L 104 14 L 8 14 Z" fill="#8A6D3B" opacity="0.55" />
      <path d="M18 20 L 94 20 M20 28 L 92 28" stroke="#8A6D3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M36 9 L 33 36 M56 9 L 56 36 M76 9 L 79 36" stroke="#8A6D3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}
