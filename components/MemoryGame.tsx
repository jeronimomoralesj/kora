"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import PasilloCharacter, { type PasilloCharacterName } from "@/components/PasilloCharacter";
import TierCharacter from "@/components/TierCharacter";

// ─────────────────────────────────────────────────────────────
// Memoria del Mercado — encuentra las parejas de la cosecha antes
// de que cierre el nodo. Dos dificultades: Rápida (6 parejas, 60 s)
// y Completa (10 parejas, 2 min — todo el elenco KORA).
// ─────────────────────────────────────────────────────────────

const PASILLO_FACES: PasilloCharacterName[] = ["avocado", "egg", "jar", "coconut", "bottle"];
const TIER_FACES = ["Semilla", "Sprout", "Moss", "Raíz", "Bosque"] as const;
const ALL_FACES: string[] = [...PASILLO_FACES, ...TIER_FACES];

interface Card {
  key: number;
  face: string;
}

type CardState = "down" | "up" | "matched";
type Status = "idle" | "playing" | "won" | "lost";

interface Difficulty {
  id: "rapida" | "completa";
  label: string;
  pairs: number;
  seconds: number;
}

const DIFFICULTIES: Difficulty[] = [
  { id: "rapida", label: "Rápida · 6 parejas · 1 min", pairs: 6, seconds: 60 },
  { id: "completa", label: "Completa · 10 parejas · 2 min", pairs: 10, seconds: 120 },
];

const STORAGE_KEY = "kora-memory-best"; // por dificultad: menos movimientos

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FaceArt({ face }: { face: string }) {
  if ((PASILLO_FACES as string[]).includes(face)) {
    return <PasilloCharacter name={face as PasilloCharacterName} />;
  }
  return <TierCharacter tier={face} />;
}

export default function MemoryGame() {
  const [status, setStatus] = useState<Status>("idle");
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [cards, setCards] = useState<Card[]>([]);
  const [states, setStates] = useState<CardState[]>([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [best, setBest] = useState<Record<string, number>>({});
  const [shaking, setShaking] = useState<number[]>([]);

  const firstPick = useRef<number | null>(null);
  const locked = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBest(JSON.parse(raw) as Record<string, number>);
    } catch {}
  }, []);

  const start = useCallback((d: Difficulty) => {
    const faces = shuffle(ALL_FACES).slice(0, d.pairs);
    const deck = shuffle([...faces, ...faces]).map((face, i) => ({ key: i, face }));
    setDifficulty(d);
    setCards(deck);
    setStates(deck.map(() => "down"));
    setMoves(0);
    setTimeLeft(d.seconds);
    setShaking([]);
    firstPick.current = null;
    locked.current = false;
    setStatus("playing");
  }, []);

  // El reloj del nodo — pierde cuando llega a 0.
  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setStatus("lost");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  const flip = (index: number) => {
    if (status !== "playing" || locked.current) return;
    if (states[index] !== "down") return;

    const next = [...states];
    next[index] = "up";
    setStates(next);

    if (firstPick.current === null) {
      firstPick.current = index;
      return;
    }

    // Segunda carta del turno
    const first = firstPick.current;
    firstPick.current = null;
    setMoves((m) => m + 1);

    if (cards[first].face === cards[index].face) {
      // Pareja — quedan reveladas con su pop
      const matched = [...next];
      matched[first] = "matched";
      matched[index] = "matched";
      setStates(matched);

      if (matched.every((s) => s === "matched")) {
        setStatus("won");
        setBest((prev) => {
          const m = moves + 1;
          const current = prev[difficulty.id];
          if (current !== undefined && current <= m) return prev;
          const updated = { ...prev, [difficulty.id]: m };
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    } else {
      // Falló — sacuden la cabeza y se voltean
      locked.current = true;
      setShaking([first, index]);
      setTimeout(() => {
        setStates((prev) => {
          const back = [...prev];
          if (back[first] === "up") back[first] = "down";
          if (back[index] === "up") back[index] = "down";
          return back;
        });
        setShaking([]);
        locked.current = false;
      }, 750);
    }
  };

  const matchedPairs = states.filter((s) => s === "matched").length / 2;
  const urgent = timeLeft <= 15;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Marcador */}
      {status !== "idle" && (
        <div className="flex items-end justify-between gap-4 px-1">
          <p className="text-sm text-charcoal/55">
            Parejas{" "}
            <span className="text-2xl font-black tabular-nums tracking-tightest text-moss">
              {matchedPairs}/{difficulty.pairs}
            </span>
          </p>
          <p className={`text-sm ${urgent ? "text-[#CE5044]" : "text-charcoal/55"}`}>
            El nodo cierra en{" "}
            <span className={`text-2xl font-black tabular-nums tracking-tightest ${urgent ? "text-[#CE5044]" : "text-moss"}`}>
              {minutes}:{seconds}
            </span>
          </p>
          <p className="text-sm text-charcoal/55">
            Movs <span className="text-2xl font-black tabular-nums tracking-tightest text-sprout-dark">{moves}</span>
          </p>
        </div>
      )}

      {/* Tablero */}
      <div className="relative mt-3 overflow-hidden rounded-[2rem_0.8rem_2rem_0.8rem] bg-gradient-to-b from-white via-alabaster to-travertine p-3 ring-1 ring-moss/10 sm:p-4">
        {status === "idle" ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
            <div className="flex items-end gap-1" aria-hidden="true">
              {(["jar", "egg", "bottle"] as const).map((n, i) => (
                <span key={n} className="kora-bob h-16 w-14" style={{ animationDelay: `${i * 0.35}s` }}>
                  <PasilloCharacter name={n} />
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-black tracking-tightest text-moss sm:text-3xl">Memoria del Mercado</h2>
            <p className="max-w-xs text-sm text-charcoal/60">
              Encuentra las parejas de la cosecha antes de que cierre el nodo.
              Elige tu turno:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {DIFFICULTIES.map((d, i) => (
                <button key={d.id} onClick={() => start(d)} className={i === 0 ? "kora-cta" : "kora-cta-ghost"}>
                  {d.label}
                </button>
              ))}
            </div>
            {(best.rapida !== undefined || best.completa !== undefined) && (
              <p className="text-xs text-charcoal/45">
                Tu récord:{" "}
                {best.rapida !== undefined && `Rápida en ${best.rapida} movs`}
                {best.rapida !== undefined && best.completa !== undefined && " · "}
                {best.completa !== undefined && `Completa en ${best.completa} movs`}
              </p>
            )}
          </div>
        ) : (
          <div className={`grid gap-2 sm:gap-3 ${difficulty.pairs === 6 ? "grid-cols-4" : "grid-cols-4 sm:grid-cols-5"}`}>
            {cards.map((card, i) => {
              const state = states[i];
              const faceUp = state !== "down";
              return (
                <button
                  key={card.key}
                  onClick={() => flip(i)}
                  disabled={status !== "playing" || state !== "down"}
                  aria-label={faceUp ? `Carta ${card.face}` : "Carta boca abajo"}
                  className={`group aspect-[3/4] outline-none [perspective:600px] focus-visible:ring-2 focus-visible:ring-sprout ${
                    shaking.includes(i) ? "kora-shake" : ""
                  }`}
                >
                  <span
                    className={`relative block h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                      faceUp ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* Dorso — la tarjeta KORA */}
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[1rem_0.4rem_1rem_0.4rem] bg-gradient-to-br from-moss-900 via-moss to-moss-700 ring-1 ring-white/10 [backface-visibility:hidden]">
                      <Logo className="text-sm text-alabaster/80" />
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8FBF4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" aria-hidden="true">
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
                      </svg>
                    </span>
                    {/* Frente — el personaje */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center rounded-[0.4rem_1rem_0.4rem_1rem] bg-white p-1.5 [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                        state === "matched" ? "kora-match-pop ring-2 ring-sprout" : "ring-1 ring-moss/15"
                      }`}
                    >
                      <FaceArt face={card.face} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Overlay de victoria / derrota */}
        {(status === "won" || status === "lost") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-alabaster/90 px-6 text-center backdrop-blur-sm">
            <span className="h-16 w-16" aria-hidden="true">
              {status === "won" ? <TierCharacter tier="Bosque" /> : <TierCharacter tier="Semilla" />}
            </span>
            <h2 className="text-2xl font-black tracking-tightest text-moss">
              {status === "won" ? "¡Cosecha completa!" : "El nodo cerró…"}
            </h2>
            <p className="max-w-xs text-sm text-charcoal/60">
              {status === "won"
                ? `${difficulty.pairs} parejas en ${moves} movimientos, con ${minutes}:${seconds} de sobra.`
                : `Te faltaron ${difficulty.pairs - matchedPairs} parejas. La cosecha vuelve mañana a las 07:00.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => start(difficulty)} className="kora-cta">
                {status === "won" ? "Jugar otra vez" : "Reintentar"}
              </button>
              <button onClick={() => setStatus("idle")} className="kora-cta-ghost">
                Cambiar modo
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-charcoal/45">
        Encuentra todas las parejas antes de que cierre el nodo — menos movimientos, mejor récord.
      </p>
    </div>
  );
}
