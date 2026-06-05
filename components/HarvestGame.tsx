"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PasilloCharacter, { type PasilloCharacterName } from "@/components/PasilloCharacter";

// ─────────────────────────────────────────────────────────────
// La Cosecha — el minijuego de KORA.
// Los personajes caen del cielo del mercado: atrápalos con la canasta.
// Cuidado con la bolsa plástica (en KORA no usamos plásticos brillantes).
// Mueve con el dedo, el mouse o las flechas del teclado.
// ─────────────────────────────────────────────────────────────

type ItemType = PasilloCharacterName | "bag";

interface FallingItem {
  id: number;
  x: number; // px, borde izquierdo
  y: number; // px, borde superior
  speed: number; // px por ms
  type: ItemType;
}

const GOOD: PasilloCharacterName[] = ["avocado", "egg", "jar", "coconut", "bottle"];
const POINTS: Record<PasilloCharacterName, number> = {
  avocado: 15,
  egg: 10,
  jar: 20,
  coconut: 15,
  bottle: 25,
};

const ITEM_SIZE = 52;
const BASKET_W = 104;
const STORAGE_KEY = "kora-harvest-best";

type Status = "idle" | "playing" | "over";

export default function HarvestGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [basketX, setBasketX] = useState(0);
  const [hit, setHit] = useState(false); // flash al atrapar una bolsa

  // Estado vivo del loop — en refs para no re-crear el rAF.
  const live = useRef({ items: [] as FallingItem[], score: 0, lives: 3, basketX: 0, spawnAcc: 0, nextId: 1 });
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBest(Number(raw) || 0);
    } catch {}
  }, []);

  const moveBasket = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - BASKET_W, clientX - rect.left - BASKET_W / 2));
    live.current.basketX = x;
    setBasketX(x);
  }, []);

  const stop = useCallback(() => {
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

  const tick = useCallback(
    (now: number) => {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      const dt = Math.min(48, now - lastRef.current); // clamp por pestañas en background
      lastRef.current = now;
      const s = live.current;

      // Aparecen más rápido a medida que sube el puntaje.
      s.spawnAcc += dt;
      const spawnEvery = Math.max(420, 950 - s.score * 2.2);
      if (s.spawnAcc >= spawnEvery) {
        s.spawnAcc = 0;
        const bag = Math.random() < 0.18;
        s.items.push({
          id: s.nextId++,
          x: Math.random() * (width - ITEM_SIZE),
          y: -ITEM_SIZE,
          speed: 0.11 + Math.random() * 0.07 + Math.min(0.12, s.score * 0.0005),
          type: bag ? "bag" : GOOD[Math.floor(Math.random() * GOOD.length)],
        });
      }

      const catchY = height - 78; // boca de la canasta
      const kept: FallingItem[] = [];
      for (const it of s.items) {
        it.y += it.speed * dt;
        const centerX = it.x + ITEM_SIZE / 2;
        const inBasket =
          it.y + ITEM_SIZE >= catchY &&
          it.y + ITEM_SIZE <= catchY + 46 &&
          centerX >= s.basketX - 6 &&
          centerX <= s.basketX + BASKET_W + 6;

        if (inBasket) {
          if (it.type === "bag") {
            s.lives -= 1;
            setHit(true);
            setTimeout(() => setHit(false), 350);
          } else {
            s.score += POINTS[it.type];
          }
          continue; // atrapado — no se conserva
        }
        if (it.y > height) {
          if (it.type !== "bag") s.lives -= 1; // se te cayó la cosecha
          continue;
        }
        kept.push(it);
      }
      s.items = kept;

      setItems([...s.items]);
      setScore(s.score);
      setLives(s.lives);

      if (s.lives <= 0) {
        stop();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [stop]
  );

  const start = useCallback(() => {
    const el = containerRef.current;
    const width = el ? el.getBoundingClientRect().width : 320;
    live.current = { items: [], score: 0, lives: 3, basketX: (width - BASKET_W) / 2, spawnAcc: 0, nextId: 1 };
    setItems([]);
    setScore(0);
    setLives(3);
    setBasketX((width - BASKET_W) / 2);
    setStatus("playing");
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // Teclado: flechas mueven la canasta.
  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.getBoundingClientRect().width;
      const step = 32;
      if (e.key === "ArrowLeft") {
        const x = Math.max(0, live.current.basketX - step);
        live.current.basketX = x;
        setBasketX(x);
      }
      if (e.key === "ArrowRight") {
        const x = Math.min(w - BASKET_W, live.current.basketX + step);
        live.current.basketX = x;
        setBasketX(x);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

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

      {/* Campo de juego */}
      <div
        ref={containerRef}
        onPointerMove={(e) => status === "playing" && moveBasket(e.clientX)}
        onPointerDown={(e) => status === "playing" && moveBasket(e.clientX)}
        className={`relative mt-3 h-[420px] w-full touch-none select-none overflow-hidden rounded-[2rem_0.8rem_2rem_0.8rem] bg-gradient-to-b from-white via-alabaster to-travertine ring-1 ring-moss/10 transition-shadow sm:h-[480px] ${
          hit ? "ring-4 ring-[#CE5044]/60" : ""
        }`}
      >
        {/* Piso */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-moss/10 to-transparent" />

        {/* Personajes cayendo */}
        {items.map((it) => (
          <div
            key={it.id}
            className="pointer-events-none absolute"
            style={{ transform: `translate(${it.x}px, ${it.y}px)`, width: ITEM_SIZE, height: ITEM_SIZE }}
          >
            {it.type === "bag" ? <PlasticBag /> : <PasilloCharacter name={it.type} />}
          </div>
        ))}

        {/* La canasta */}
        {status !== "idle" && (
          <div
            className="pointer-events-none absolute bottom-2"
            style={{ transform: `translateX(${basketX}px)`, width: BASKET_W }}
          >
            <Basket />
          </div>
        )}

        {/* Overlay de inicio */}
        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex items-end gap-1">
              {GOOD.slice(0, 3).map((n, i) => (
                <span key={n} className="kora-bob h-16 w-14" style={{ animationDelay: `${i * 0.35}s` }} aria-hidden="true">
                  <PasilloCharacter name={n} />
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-black tracking-tightest text-moss sm:text-3xl">La Cosecha</h2>
            <p className="max-w-xs text-sm text-charcoal/60">
              Atrapa la cosecha con la canasta — mueve con el dedo o las flechas.
              Esquiva la bolsa plástica: aquí no usamos de esas.
            </p>
            <button onClick={start} className="kora-cta text-base">
              Jugar
            </button>
          </div>
        )}

        {/* Overlay de fin */}
        {status === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-alabaster/90 px-6 text-center backdrop-blur-sm">
            <span className="h-16 w-16" aria-hidden="true">
              <PasilloCharacter name="avocado" />
            </span>
            <h2 className="text-2xl font-black tracking-tightest text-moss">¡Cosecha terminada!</h2>
            <p className="text-sm text-charcoal/60">
              Hiciste <span className="font-black text-moss">{score}</span> puntos
              {score >= best && score > 0 ? " — ¡nuevo récord! 🌱" : ` · tu récord es ${best}`}
            </p>
            <button onClick={start} className="kora-cta">
              Jugar otra vez
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-charcoal/45">
        Aguacate 15 · Huevo 10 · Coco 15 · Frasco 20 · PULSE 25 — la bolsa plástica te quita una vida.
      </p>
    </div>
  );
}

// Vida — una hojita que se apaga cuando la pierdes.
function LifeLeaf({ alive }: { alive: boolean }) {
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

// La bolsa plástica — el único villano del universo KORA.
function PlasticBag() {
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full" aria-hidden="true">
      <path d="M44 48 L 96 48 L 104 118 L 36 118 Z" fill="#B8B8B4" />
      <path d="M44 48 L 96 48 L 104 118 L 36 118 Z" fill="none" stroke="#8E8E8A" strokeWidth="2" />
      <path d="M54 48 C 54 34, 64 30, 70 30 C 76 30, 86 34, 86 48" stroke="#8E8E8A" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M48 60 C 56 64, 66 64, 74 60 M88 70 C 82 74, 74 75, 66 73" stroke="#8E8E8A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Cara de villano aburrido */}
      <path d="M58 80 L 64 86 M64 80 L 58 86 M76 80 L 82 86 M82 80 L 76 86" stroke="#1A1A1A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M62 98 C 66 95, 74 95, 78 98" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// La canasta del jugador — prima de la del checkout.
function Basket() {
  return (
    <svg viewBox="0 0 104 64" className="w-full" aria-hidden="true">
      <ellipse cx="52" cy="60" rx="44" ry="4" fill="#2C3E2B" opacity="0.12" />
      <path d="M10 18 L 94 18 L 86 58 L 18 58 Z" fill="#C9B68A" />
      <path d="M10 18 L 94 18 L 92 29 L 12 29 Z" fill="#8A6D3B" opacity="0.55" />
      <path d="M20 34 L 84 34 M22 44 L 82 44 M24 52 L 80 52" stroke="#8A6D3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d="M34 22 L 30 56 M52 22 L 52 56 M70 22 L 74 56" stroke="#8A6D3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      <ellipse cx="52" cy="19" rx="42" ry="5" fill="#6B4F34" opacity="0.4" />
    </svg>
  );
}
