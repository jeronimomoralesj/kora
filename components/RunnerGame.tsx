"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PasilloCharacter, { type PasilloCharacterName } from "@/components/PasilloCharacter";

// ─────────────────────────────────────────────────────────────
// Carrera del Carrito — el runner de KORA.
// La zanahoria empuja el carrito por el pasillo: toca (o Espacio) para
// saltar las góndolas y las cajas. Doble toque, doble salto. Atrapa
// productos en el aire para sumar más. Cada vez va más rápido.
// ─────────────────────────────────────────────────────────────

type ObstacleKind = "box" | "gondola";

interface Obstacle {
  id: number;
  x: number;
  w: number;
  h: number;
  kind: ObstacleKind;
}

interface Pickup {
  id: number;
  x: number;
  y: number; // top
  type: PasilloCharacterName;
  taken: boolean;
}

interface Tile {
  id: number;
  x: number;
}

type Status = "idle" | "playing" | "over";

const PLAYER_W = 92;
const PLAYER_H = 60;
const PLAYER_X = 22;
const PICK_SIZE = 42;
const GRAVITY = 0.0024; // px/ms²
const JUMP_V = 0.78; // px/ms
const STORAGE_KEY = "kora-runner-best";
const GOOD: PasilloCharacterName[] = ["avocado", "egg", "jar", "coconut", "bottle"];

export default function RunnerGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [meters, setMeters] = useState(0);
  const [best, setBest] = useState(0);
  const [jumpY, setJumpY] = useState(0); // altura sobre el piso
  const [tilt, setTilt] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [tiles, setTiles] = useState<Tile[]>([]);

  const live = useRef({
    y: 0, // altura sobre piso (px, positivo = arriba)
    vy: 0,
    jumpsLeft: 2,
    distance: 0,
    collected: 0,
    speed: 0.27,
    obstacles: [] as Obstacle[],
    pickups: [] as Pickup[],
    tiles: [] as Tile[],
    sinceObstacle: 0,
    nextObstacleGap: 600,
    sincePickup: 0,
    nextPickupGap: 800,
    sinceTile: 0,
    nextId: 1,
  });
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBest(Number(raw) || 0);
    } catch {}
  }, []);

  const finish = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setStatus("over");
    const s = live.current;
    const finalScore = Math.floor(s.distance / 50) + s.collected * 15;
    setBest((prev) => {
      const next = Math.max(prev, finalScore);
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
      const groundY = height - 34;
      const dt = Math.min(48, now - lastRef.current);
      lastRef.current = now;
      const s = live.current;

      // Velocidad — sube con la distancia, con techo
      s.speed = Math.min(0.6, 0.27 + s.distance * 0.000014);
      const dx = s.speed * dt;
      s.distance += dx;

      // Física del salto
      if (s.y > 0 || s.vy !== 0) {
        s.vy -= GRAVITY * dt;
        s.y += s.vy * dt;
        if (s.y <= 0) {
          s.y = 0;
          s.vy = 0;
          s.jumpsLeft = 2;
        }
      }

      // Spawns — góndolas/cajas con separación en píxeles (justa a toda velocidad)
      s.sinceObstacle += dx;
      if (s.sinceObstacle >= s.nextObstacleGap) {
        s.sinceObstacle = 0;
        s.nextObstacleGap = 420 + Math.random() * 460;
        const gondola = Math.random() < 0.45;
        s.obstacles.push({
          id: s.nextId++,
          x: width + 20,
          w: gondola ? 64 : 42,
          h: gondola ? 62 : 38,
          kind: gondola ? "gondola" : "box",
        });
      }
      s.sincePickup += dx;
      if (s.sincePickup >= s.nextPickupGap) {
        s.sincePickup = 0;
        s.nextPickupGap = 620 + Math.random() * 720;
        const high = Math.random() < 0.55;
        s.pickups.push({
          id: s.nextId++,
          x: width + 20,
          y: groundY - PLAYER_H - (high ? 96 + Math.random() * 30 : 30 + Math.random() * 30) - PICK_SIZE,
          type: GOOD[Math.floor(Math.random() * GOOD.length)],
          taken: false,
        });
      }
      s.sinceTile += dx;
      if (s.sinceTile >= 220) {
        s.sinceTile = 0;
        s.tiles.push({ id: s.nextId++, x: width + 4 });
      }

      // Mover mundo
      s.obstacles = s.obstacles.filter((o) => (o.x -= dx) > -o.w - 10);
      s.pickups = s.pickups.filter((p) => (p.x -= dx) > -PICK_SIZE - 10);
      s.tiles = s.tiles.filter((t) => (t.x -= dx) > -10);

      // Colisiones (hitbox generosa con el jugador)
      const px1 = PLAYER_X + 14;
      const px2 = PLAYER_X + PLAYER_W - 14;
      const playerTop = groundY - PLAYER_H - s.y;
      const py2 = groundY - s.y; // pies

      for (const o of s.obstacles) {
        const ox1 = o.x + 6;
        const ox2 = o.x + o.w - 6;
        const oy1 = groundY - o.h + 6;
        if (px2 > ox1 && px1 < ox2 && py2 > oy1) {
          finish();
          return;
        }
      }
      for (const p of s.pickups) {
        if (p.taken) continue;
        const cx = p.x + PICK_SIZE / 2;
        const cy = p.y + PICK_SIZE / 2;
        if (cx > px1 - 6 && cx < px2 + 6 && cy > playerTop - 6 && cy < py2 + 6) {
          p.taken = true;
          s.collected += 1;
        }
      }
      s.pickups = s.pickups.filter((p) => !p.taken);

      // Pintar
      setJumpY(s.y);
      setTilt(s.y > 0 ? (s.vy > 0 ? -7 : 5) : 0);
      setObstacles([...s.obstacles]);
      setPickups([...s.pickups]);
      setTiles([...s.tiles]);
      setMeters(Math.floor(s.distance / 50));
      setScore(Math.floor(s.distance / 50) + s.collected * 15);

      rafRef.current = requestAnimationFrame(tick);
    },
    [finish]
  );

  const start = useCallback(() => {
    live.current = {
      y: 0,
      vy: 0,
      jumpsLeft: 2,
      distance: 0,
      collected: 0,
      speed: 0.27,
      obstacles: [],
      pickups: [],
      tiles: [],
      sinceObstacle: 0,
      nextObstacleGap: 600,
      sincePickup: 0,
      nextPickupGap: 800,
      sinceTile: 0,
      nextId: 1,
    };
    setObstacles([]);
    setPickups([]);
    setTiles([]);
    setScore(0);
    setMeters(0);
    setJumpY(0);
    setStatus("playing");
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const jump = useCallback(() => {
    const s = live.current;
    if (s.jumpsLeft <= 0) return;
    s.jumpsLeft -= 1;
    s.vy = JUMP_V;
    if (s.y === 0) s.y = 0.01; // despega
  }, []);

  // Controles: Espacio / flecha arriba
  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, jump]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Marcador */}
      <div className="flex items-end justify-between gap-4 px-1">
        <p className="text-sm text-charcoal/55">
          Puntos <span className="text-2xl font-black tabular-nums tracking-tightest text-moss">{score}</span>
        </p>
        <p className="text-sm text-charcoal/55">
          <span className="text-base font-bold tabular-nums text-moss/70">{meters} m</span> de pasillo
        </p>
        <p className="text-sm text-charcoal/55">
          Récord <span className="text-2xl font-black tabular-nums tracking-tightest text-sprout-dark">{best}</span>
        </p>
      </div>

      {/* Pista */}
      <div
        ref={containerRef}
        onPointerDown={() => status === "playing" && jump()}
        className="relative mt-3 h-[320px] w-full touch-none select-none overflow-hidden rounded-[2rem_0.8rem_2rem_0.8rem] bg-gradient-to-b from-white via-alabaster to-travertine ring-1 ring-moss/10 sm:h-[380px]"
      >
        {/* Lámparas LED del techo */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-moss/5 to-transparent" />

        {/* Piso */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34px] border-t-2 border-moss/15 bg-travertine/80" />
        {tiles.map((t) => (
          <span
            key={t.id}
            className="pointer-events-none absolute bottom-0 h-[34px] w-px bg-moss/10"
            style={{ transform: `translateX(${t.x}px)` }}
          />
        ))}

        {/* Productos en el aire */}
        {pickups.map((p) => (
          <div
            key={p.id}
            className="pointer-events-none absolute"
            style={{ transform: `translate(${p.x}px, ${p.y}px)`, width: PICK_SIZE, height: PICK_SIZE }}
          >
            <PasilloCharacter name={p.type} />
          </div>
        ))}

        {/* Obstáculos */}
        {obstacles.map((o) => (
          <div
            key={o.id}
            className="pointer-events-none absolute bottom-[34px]"
            style={{ transform: `translateX(${o.x}px)`, width: o.w, height: o.h }}
          >
            {o.kind === "gondola" ? <Gondola /> : <KoraBox />}
          </div>
        ))}

        {/* El carrito — la zanahoria empuja, tú saltas */}
        {status !== "idle" && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: PLAYER_X,
              bottom: 34 + jumpY,
              width: PLAYER_W,
              height: PLAYER_H,
              transform: `rotate(${tilt}deg)`,
              transformOrigin: "50% 90%",
            }}
          >
            <RunnerCart rolling={status === "playing"} />
          </div>
        )}

        {/* Overlay de inicio */}
        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="h-16 w-28" aria-hidden="true">
              <RunnerCart rolling />
            </div>
            <h2 className="text-2xl font-black tracking-tightest text-moss sm:text-3xl">Carrera del Carrito</h2>
            <p className="max-w-xs text-sm text-charcoal/60">
              La zanahoria empuja, tú saltas las góndolas — toca o usa Espacio.
              Doble toque, doble salto. Atrapa productos en el aire.
            </p>
            <button onClick={start} className="kora-cta text-base">
              Correr
            </button>
          </div>
        )}

        {/* Overlay de fin */}
        {status === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-alabaster/90 px-6 text-center backdrop-blur-sm">
            <span className="h-16 w-16" aria-hidden="true">
              <PasilloCharacter name="coconut" />
            </span>
            <h2 className="text-2xl font-black tracking-tightest text-moss">¡Chocaste con la góndola!</h2>
            <p className="text-sm text-charcoal/60">
              {meters} m de pasillo y <span className="font-black text-moss">{score}</span> puntos
              {score >= best && score > 0 ? " — ¡nuevo récord! 🌱" : ` · tu récord es ${best}`}
            </p>
            <button onClick={start} className="kora-cta">
              Correr otra vez
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-charcoal/45">
        1 punto por metro · 15 por producto atrapado — el pasillo se acelera, tú decides cuándo saltar.
      </p>
    </div>
  );
}

// El carrito del desfile, ahora jugable — ruedas girando incluidas.
function RunnerCart({ rolling }: { rolling: boolean }) {
  return (
    <svg viewBox="0 0 128 64" className="h-full w-full" aria-hidden="true">
      {/* Carrito */}
      <path d="M14 18 L 22 18 L 28 40 L 66 40 L 72 24 L 30 24" stroke="#2C3E2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M30 26 L 69 26 L 65 38 L 29 38 Z" fill="#2C3E2B" opacity="0.12" />
      <circle cx="38" cy="24" r="5" fill="#8FBF4A" />
      <circle cx="48" cy="22" r="5.5" fill="#CE5044" />
      <rect x="55" y="15" width="8" height="10" rx="2" fill="#C9B68A" />
      <path d="M48 14 L 48 11" stroke="#5F8429" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 11 C 46 8, 42 7, 39 8 C 41 11, 45 12, 48 11 Z" fill="#76A035" />
      <g className={rolling ? "kora-roll" : ""} style={{ transformOrigin: "32px 47px" }}>
        <circle cx="32" cy="47" r="6" fill="none" stroke="#2C3E2B" strokeWidth="2.5" />
        <path d="M32 41.5 V 52.5 M26.5 47 H 37.5" stroke="#2C3E2B" strokeWidth="1.6" />
      </g>
      <g className={rolling ? "kora-roll" : ""} style={{ transformOrigin: "60px 47px" }}>
        <circle cx="60" cy="47" r="6" fill="none" stroke="#2C3E2B" strokeWidth="2.5" />
        <path d="M60 41.5 V 52.5 M54.5 47 H 65.5" stroke="#2C3E2B" strokeWidth="1.6" />
      </g>
      {/* Zanahoria empujando */}
      <g>
        <path d="M97 18 C 95 12, 91 10, 86 9 M101 17 C 101 11, 102 8, 105 4 M104.5 18 C 107 14, 111 12, 115 12" stroke="#76A035" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M94 19 C 92.5 31, 96 43, 101 50 C 106 43, 109.5 31, 108 19 C 103.5 16.5, 98.5 16.5, 94 19 Z" fill="#E08A3C" />
        <path d="M96.5 26 H 105.5 M97.5 33 H 104.5 M99 41 H 103" stroke="#C9702A" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="98.5" cy="24" r="1.4" fill="#1A1A1A" />
        <circle cx="104" cy="24" r="1.4" fill="#1A1A1A" />
        <path d="M98.5 28.5 C 100 30.5, 102.5 30.5, 104 28.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M95 24 C 88 23, 80 21, 73 20" stroke="#E08A3C" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// Góndola baja de nogal — el obstáculo insignia.
function Gondola() {
  return (
    <svg viewBox="0 0 64 62" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <rect x="2" y="10" width="60" height="52" rx="4" fill="#6B4F34" />
      <rect x="2" y="10" width="60" height="6" rx="3" fill="#8A6D3B" />
      <rect x="6" y="26" width="52" height="4" rx="2" fill="#8A6D3B" opacity="0.7" />
      <rect x="6" y="42" width="52" height="4" rx="2" fill="#8A6D3B" opacity="0.7" />
      <circle cx="14" cy="22" r="4" fill="#CE5044" />
      <circle cx="26" cy="22" r="4" fill="#8FBF4A" />
      <circle cx="38" cy="22" r="4" fill="#E08A3C" />
      <circle cx="50" cy="22" r="4" fill="#76A035" />
      <circle cx="20" cy="38" r="4" fill="#E08A3C" />
      <circle cx="33" cy="38" r="4" fill="#CE5044" />
      <circle cx="46" cy="38" r="4" fill="#8FBF4A" />
    </svg>
  );
}

// Caja de despensa KORA.
function KoraBox() {
  return (
    <svg viewBox="0 0 42 38" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <rect x="1" y="3" width="40" height="35" rx="3" fill="#C9B68A" />
      <rect x="1" y="3" width="40" height="8" rx="3" fill="#8A6D3B" opacity="0.5" />
      <text x="21" y="27" textAnchor="middle" fontSize="9" fontWeight="900" letterSpacing="-0.3" fill="#2C3E2B" opacity="0.8" className="font-sans">
        KORA
      </text>
    </svg>
  );
}
