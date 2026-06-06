import type { Metadata } from "next";
import Link from "next/link";
import HarvestGame from "@/components/HarvestGame";
import MemoryGame from "@/components/MemoryGame";
import RunnerGame from "@/components/RunnerGame";
import StackGame from "@/components/StackGame";
import PasilloCharacter from "@/components/PasilloCharacter";

export const metadata: Metadata = {
  title: "Juegos — KORA",
  description:
    "La sala de juegos de KORA: atrapa la cosecha con la canasta y esquiva la bolsa plástica. Un descanso fresco entre mercado y mercado.",
};

export default function JuegosPage() {
  return (
    <div className="kora-shell relative py-8 pb-20 sm:py-12">
      {/* Marca de agua */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-6 select-none text-[clamp(4rem,14vw,11rem)] font-black leading-none tracking-tightest text-moss/[0.05]"
      >
        Juegos
      </span>

      <nav aria-label="Miga de pan" className="flex items-center gap-1.5 text-sm text-moss/55">
        <Link href="/account" className="font-medium transition-colors hover:text-moss">Cuenta</Link>
        <span aria-hidden="true">›</span>
        <span className="text-moss/40">Sala de juegos</span>
      </nav>

      <div className="relative mt-3 max-w-xl">
        <p className="kora-eyebrow">Sala de juegos</p>
        <h1 className="mt-2 text-3xl font-black tracking-tightest text-moss sm:text-5xl">
          Un descanso fresco.
        </h1>
        <p className="mt-3 text-charcoal/60">
          Entre mercado y mercado, juega con la cosecha. Sin premios reales (por
          ahora) — solo el honor del récord.
        </p>
      </div>

      {/* Juego 01 — La Cosecha */}
      <div className="mt-10">
        <p className="kora-eyebrow">Juego 01</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-moss">La Cosecha</h2>
        <div className="mt-4">
          <HarvestGame />
        </div>
      </div>

      {/* Juego 02 — Memoria del Mercado */}
      <div className="mt-16">
        <p className="kora-eyebrow">Juego 02</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-moss">Memoria del Mercado</h2>
        <div className="mt-4">
          <MemoryGame />
        </div>
      </div>

      {/* Juego 03 — Carrera del Carrito */}
      <div className="mt-16">
        <p className="kora-eyebrow">Juego 03</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-moss">Carrera del Carrito</h2>
        <div className="mt-4">
          <RunnerGame />
        </div>
      </div>

      {/* Juego 04 — El Empaque Perfecto */}
      <div className="mt-16">
        <p className="kora-eyebrow">Juego 04</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-moss">El Empaque Perfecto</h2>
        <div className="mt-4">
          <StackGame />
        </div>
      </div>

      {/* Próximos juegos — teaser */}
      <div className="mt-16">
        <p className="kora-eyebrow">En la huerta</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-moss">Próximos juegos</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="kora-leaf-card relative flex items-center gap-4 overflow-hidden p-5 opacity-80">
            <span className="kora-bob h-16 w-14 flex-none" aria-hidden="true">
              <PasilloCharacter name="bottle" />
            </span>
            <div className="min-w-0">
              <p className="w-fit rounded-[0.6rem_0.2rem_0.6rem_0.2rem] bg-moss/8 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide2 text-moss/60">
                Pronto
              </p>
              <h3 className="mt-1 font-bold text-moss">La Fila del Viernes</h3>
              <p className="text-xs text-charcoal/55">Atiende la caja a toda velocidad sin perder la calma. Próximamente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
