import type { Metadata } from "next";
import Link from "next/link";
import HarvestGame from "@/components/HarvestGame";
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

      {/* El juego */}
      <div className="mt-10">
        <HarvestGame />
      </div>

      {/* Próximos juegos — teasers */}
      <div className="mt-16">
        <p className="kora-eyebrow">En la huerta</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-moss">Próximos juegos</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Memoria del Mercado",
              copy: "Encuentra las parejas de la cosecha antes de que cierre el nodo.",
              character: "egg" as const,
            },
            {
              title: "Carrera del Carrito",
              copy: "La zanahoria empuja, tú esquivas las góndolas. Próximamente.",
              character: "coconut" as const,
            },
          ].map((g, i) => (
            <div
              key={g.title}
              className={`kora-leaf-card ${i % 2 ? "kora-leaf-card-b" : ""} relative flex items-center gap-4 overflow-hidden p-5 opacity-80`}
            >
              <span className="kora-bob h-16 w-14 flex-none" style={{ animationDelay: `${i * 0.4}s` }} aria-hidden="true">
                <PasilloCharacter name={g.character} />
              </span>
              <div className="min-w-0">
                <p className="w-fit rounded-[0.6rem_0.2rem_0.6rem_0.2rem] bg-moss/8 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide2 text-moss/60">
                  Pronto
                </p>
                <h3 className="mt-1 font-bold text-moss">{g.title}</h3>
                <p className="text-xs text-charcoal/55">{g.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
