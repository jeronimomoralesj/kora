import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import PasilloCharacter from "@/components/PasilloCharacter";
import { stores } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nodos — KORA",
  description:
    "Los nodos físicos de KORA en Bogotá: Quinta Camacho abierto hoy; Teusaquillo y Chapinero Alto, en camino.",
};

export default function NodosPage() {
  const open = stores.filter((s) => s.open);
  const soon = stores.filter((s) => !s.open);

  return (
    <div className="kora-shell relative py-8 pb-20 sm:py-12">
      {/* Marca de agua */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-6 select-none text-[clamp(4rem,14vw,11rem)] font-black leading-none tracking-tightest text-moss/[0.05]"
      >
        Nodos
      </span>

      <div className="relative max-w-2xl">
        <p className="kora-eyebrow">El mercado físico</p>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-3xl font-black tracking-tightest text-moss sm:text-5xl">
            Nuestros nodos
          </h1>
          <span className="kora-bob h-14 w-12 flex-none sm:h-16 sm:w-14" aria-hidden="true">
            <PasilloCharacter name="avocado" />
          </span>
        </div>
        <p className="mt-3 text-charcoal/60">
          Pequeños por diseño: 10 × 10 metros de mercado fresco, pensados para
          entrar y salir en minutos. Hoy estamos en Quinta Camacho — y creciendo.
        </p>
      </div>

      {/* Nodo abierto — protagonista */}
      {open.map((s) => (
        <Reveal key={s.id} className="mt-10">
          <Link
            href={`/nodos/${s.id}`}
            className="group kora-leaf-card relative block overflow-hidden shadow-lift hover:-translate-y-1 hover:-rotate-[0.3deg]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photography/nodes/quinta-camacho-interior.jpg"
              alt={`Interior del nodo ${s.name}`}
              className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-[21/9]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-moss-900/85 via-moss-900/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <p className="w-fit rounded-[0.7rem_0.25rem_0.7rem_0.25rem] bg-sprout px-2.5 py-1 text-[10px] font-black uppercase tracking-wide2 text-white">
                  Abierto ahora
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tightest text-alabaster sm:text-4xl">{s.name}</h2>
                <p className="mt-1 text-sm text-alabaster/70">{s.address} · {s.hours}</p>
              </div>
              <span className="flex items-center gap-2 text-sm font-semibold text-sprout-light">
                Conocer el nodo
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}

      {/* En camino */}
      <div className="mt-10">
        <p className="kora-eyebrow">En camino</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {soon.map((s, i) => (
            <Reveal key={s.id} delay={i * 100}>
              <Link
                href={`/nodos/${s.id}`}
                className={`group kora-leaf-card ${i % 2 ? "kora-leaf-card-b" : ""} relative block overflow-hidden hover:-translate-y-1 ${
                  i % 2 ? "hover:rotate-[0.4deg]" : "hover:-rotate-[0.4deg]"
                }`}
              >
                <Photo
                  imageKey="store-facade"
                  alt={`Nodo ${s.name} — próximamente`}
                  rounded="rounded-none"
                  className="aspect-[16/9] w-full opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-moss-900/85 via-moss-900/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="w-fit rounded-[0.7rem_0.25rem_0.7rem_0.25rem] bg-alabaster/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide2 text-alabaster backdrop-blur-sm">
                    Próximamente
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tightest text-alabaster">{s.name}</h2>
                  <p className="mt-0.5 text-xs text-alabaster/65">{s.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
