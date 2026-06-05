import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NodeMap from "@/components/NodeMap";
import Reveal from "@/components/Reveal";
import TierCharacter from "@/components/TierCharacter";
import PasilloCharacter from "@/components/PasilloCharacter";
import { stores, storeById } from "@/lib/data";
import type { Store } from "@/lib/types";

export function generateStaticParams(): { id: string }[] {
  return stores.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const store = storeById(id);
  if (!store) return { title: "Nodo — KORA" };
  return {
    title: `Nodo ${store.name} — KORA`,
    description: store.blurb || `${store.address} · ${store.hours}`,
  };
}

export default async function NodoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = storeById(id);
  if (!store) notFound();

  if (!store.open) return <ComingSoon store={store} />;

  return (
    <div className="pb-20">
      {/* ── Hero — el interior real, a sangre completa ── */}
      <section className="relative min-h-[68vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photography/nodes/quinta-camacho-interior.jpg"
          alt={`Interior del nodo ${store.name}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moss-900/90 via-moss-900/30 to-moss-900/20" />

        <div className="kora-shell relative flex min-h-[68vh] flex-col justify-end pb-10 pt-24">
          <nav aria-label="Miga de pan" className="flex items-center gap-1.5 text-sm text-alabaster/60">
            <Link href="/nodos" className="font-medium transition-colors hover:text-alabaster">Nodos</Link>
            <span aria-hidden="true">›</span>
            <span className="text-alabaster/40">{store.name}</span>
          </nav>

          <p className="mt-4 w-fit rounded-[0.7rem_0.25rem_0.7rem_0.25rem] bg-sprout px-2.5 py-1 text-[10px] font-black uppercase tracking-wide2 text-white">
            Abierto ahora · cierra {store.hours.split("–")[1].trim()}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tightest text-alabaster sm:text-6xl">
            Nodo {store.name}
          </h1>
          <p className="mt-2 max-w-md text-alabaster/75">{store.blurb}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tienda" className="kora-cta text-base">
              Comprar para recoger aquí
            </Link>
            <a
              href="#mapa"
              className="inline-flex items-center justify-center gap-2 rounded-[1.4rem_0.45rem_1.4rem_0.45rem] border border-alabaster/30 px-6 py-3 text-base font-semibold text-alabaster transition-all duration-300 hover:rounded-[0.45rem_1.4rem_0.45rem_1.4rem] hover:border-alabaster/60 hover:bg-alabaster/10"
            >
              Cómo llegar
            </a>
          </div>

          {/* Datos rápidos */}
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-alabaster/15 pt-5">
            {(
              [
                [`${store.readyMins} min`, "Pedido listo"],
                [store.area, "De mercado"],
                [store.hours.replace(" – ", "–"), "Todos los días"],
              ] as [string | undefined, string][]
            ).map(([n, l]) => (
              <div key={l}>
                <dt className="text-lg font-bold tracking-tight text-alabaster sm:text-xl">{n}</dt>
                <dd className="mt-0.5 text-[11px] text-alabaster/60">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── El plano — 10 × 10 m de diseño intencional ── */}
      <section className="kora-shell relative pt-16 sm:pt-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-8 select-none text-[clamp(3.5rem,11vw,9rem)] font-black leading-none tracking-tightest text-moss/[0.05]"
        >
          El plano
        </span>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="kora-leaf-card -rotate-[0.5deg] overflow-hidden p-2 shadow-lift transition-transform duration-500 hover:rotate-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photography/nodes/quinta-camacho-plano.jpg"
                alt={`Plano del nodo ${store.name}: isla de frescos, panadería, barra de café y góndolas bajas`}
                className="w-full rounded-[1.4rem_0.5rem_1.4rem_0.5rem]"
              />
            </div>
            <p className="mt-3 text-center text-xs text-charcoal/45">
              10 × 10 metros, pasillos de 1.5 m — diseñado para entrar y salir en minutos.
            </p>
          </Reveal>

          <div className="lg:col-span-5">
            <p className="kora-eyebrow">Adentro</p>
            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-3xl font-black tracking-tightest text-moss sm:text-4xl">
                Cada metro, con intención.
              </h2>
              <span className="kora-bob h-14 w-12 flex-none" aria-hidden="true">
                <PasilloCharacter name="jar" />
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {store.features?.map((f, i) => (
                <Reveal key={f} delay={i * 60}>
                  <li className="flex items-center gap-3 text-sm text-charcoal/70">
                    <span className={`flex h-6 w-6 flex-none items-center justify-center bg-sprout/12 text-sprout-dark ${i % 2 ? "rounded-[0.25rem_0.7rem_0.25rem_0.7rem]" : "rounded-[0.7rem_0.25rem_0.7rem_0.25rem]"}`}>
                      <LeafIcon />
                    </span>
                    {f}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Mapa — señalética de barrio, no cartografía ── */}
      <section id="mapa" className="kora-shell scroll-mt-24 pt-16 sm:pt-20">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kora-eyebrow">Cómo llegar</p>
            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-3xl font-black tracking-tightest text-moss sm:text-4xl">
                {store.streets.v} con {store.streets.h}.
              </h2>
              <span className="kora-bob h-14 w-12 flex-none" aria-hidden="true" style={{ animationDelay: "0.6s" }}>
                <PasilloCharacter name="coconut" />
              </span>
            </div>
            <p className="mt-3 max-w-sm text-charcoal/60">
              “{store.note}”. Muestra tu KORA Pass en el mostrador y tu pedido
              sale contigo.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
                Horas de recogida de hoy
              </p>
              <div className="flex flex-wrap gap-2">
                {store.slots.map((sl, i) => (
                  <span
                    key={sl}
                    className={`px-3.5 py-2 text-sm font-medium ${
                      i === 0
                        ? "rounded-[1rem_0.4rem_1rem_0.4rem] bg-sprout text-white"
                        : "rounded-[0.4rem_1rem_0.4rem_1rem] bg-white text-moss/70 ring-1 ring-moss/12"
                    }`}
                  >
                    {sl}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Reveal className="lg:col-span-7">
            <NodeMap streets={store.streets} open={store.open} address={store.address} hours={store.hours} />
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="kora-shell pt-16">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 rounded-[2rem_0.8rem_2rem_0.8rem] bg-moss p-6 text-alabaster sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="kora-eyebrow text-sprout-light">Tu pedido te espera</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Pide ahora, recoge en {store.readyMins} minutos.
              </h2>
            </div>
            <Link href="/tienda" className="kora-cta flex-none">
              Empezar mi canasta
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

// Nodo aún no abierto — teaser con el mapa del barrio.
function ComingSoon({ store }: { store: Store }) {
  return (
    <div className="kora-shell relative py-10 pb-20 sm:py-14">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-8 select-none text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tightest text-moss/[0.05]"
      >
        Pronto
      </span>

      <nav aria-label="Miga de pan" className="flex items-center gap-1.5 text-sm text-moss/55">
        <Link href="/nodos" className="font-medium transition-colors hover:text-moss">Nodos</Link>
        <span aria-hidden="true">›</span>
        <span className="text-moss/40">{store.name}</span>
      </nav>

      <div className="mt-6 flex items-center gap-2">
        <span className="kora-bob h-12 w-11 flex-none" aria-hidden="true">
          <TierCharacter tier="Semilla" />
        </span>
        <p className="w-fit rounded-[0.7rem_0.25rem_0.7rem_0.25rem] bg-moss/8 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide2 text-moss">
          Próximamente · este nodo está germinando
        </p>
      </div>
      <h1 className="mt-3 text-4xl font-black tracking-tightest text-moss sm:text-6xl">
        Nodo {store.name}
      </h1>
      <p className="mt-3 max-w-md text-charcoal/60">{store.blurb}</p>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <NodeMap streets={store.streets} open={false} address={store.address} hours={store.hours} />
        </Reveal>
        <div className="lg:col-span-5">
          <div className="kora-leaf-card p-6">
            <p className="kora-eyebrow">Mientras tanto</p>
            <h2 className="mt-1 text-xl font-bold text-moss">Quinta Camacho ya está abierto</h2>
            <p className="mt-2 text-sm text-charcoal/60">
              Tu mismo KORA Pass funcionará aquí el día uno — historial, puntos y
              recogida en minutos.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/nodos/quinta-camacho" className="kora-cta">Conocer el nodo</Link>
              <Link href="/tienda" className="kora-cta-ghost">Ir a la tienda</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}
