import type { Metadata } from "next";
import Link from "next/link";
import KoraPass from "@/components/KoraPass";
import Reveal from "@/components/Reveal";
import TierCharacter from "@/components/TierCharacter";
import PasilloCharacter, { type PasilloCharacterName } from "@/components/PasilloCharacter";
import { member } from "@/lib/data";

export const metadata: Metadata = {
  title: "KORA Pass — Cómo funciona",
  description:
    "Un solo perfil que une tu compra online y en tienda. Escanea tu QR o di tu número de 10 dígitos en caja y todo se sincroniza al instante.",
};

interface Step {
  n: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "Crea tu KORA Pass",
    body: "Al registrarte recibes un QR de alto contraste y un número de 10 dígitos fácil de recordar. Ese es tu pase: vive en tu perfil, listo para usar.",
  },
  {
    n: "02",
    title: "Compra donde quieras",
    body: "Arma tu canasta en la app o entra a cualquier nodo KORA y toma lo que necesitas de los estantes y las neveras.",
  },
  {
    n: "03",
    title: "Escanea o di tu número",
    body: "En caja, muestra el QR o di tus 10 dígitos. El POS vincula la venta a tu perfil en menos de un segundo — sin formularios, sin filas largas.",
  },
  {
    n: "04",
    title: "Todo se sincroniza solo",
    body: "Historial, puntos, macros y recetas sugeridas se actualizan en tiempo real, antes de que salgas del mostrador. Una sola fuente de verdad.",
  },
];

const BENEFITS: [string, string][] = [
  ["Online y físico, unificados", "Lo que compras en tienda aparece en tu historial digital al instante, y viceversa."],
  ["Cero fricción en caja", "Nada de apps que abrir ni tarjetas que buscar. Tu número basta."],
  ["Macros que te siguen", "Tus compras alimentan recomendaciones de recetas según tus objetivos."],
  ["Puntos automáticos", "Cada compra suma a tu nivel sin que tengas que escanear cupones."],
];

const FAQ: [string, string][] = [
  ["¿Necesito la app para comprar en tienda?", "No. Basta con decir tu número de 10 dígitos o mostrar el QR. La app es opcional y solo enriquece la experiencia."],
  ["¿Qué pasa si no doy mi Pass?", "La compra funciona igual, pero no se vincula a tu perfil ni suma puntos. Siempre puedes asociarla después con tu recibo."],
  ["¿Mis datos están seguros?", "El Pass solo identifica tu perfil. No expone datos de pago en el mostrador y puedes regenerar tu QR cuando quieras."],
  ["¿Funciona en todos los nodos?", "Hoy operamos Quinta Camacho — Teusaquillo y Chapinero Alto llegan pronto. Tu mismo perfil funcionará en todos, en tiempo real."],
];

const MARQUEE: string[] = ["Toma", "Vincula", "Sal"];

export default function KoraPassPage() {
  return (
    <div>
      {/* ── Hero oscuro — la tarjeta real, interactiva, en el centro ── */}
      <section className="kora-grain relative overflow-hidden bg-gradient-to-b from-moss-900 via-moss to-moss-900 text-alabaster">
        {/* Firma fantasma */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(6rem,22vw,20rem)] font-black leading-none tracking-tightest text-alabaster/[0.04]"
        >
          PASS
        </span>

        <div className="kora-shell relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="kora-eyebrow text-sprout-light">El loop omnicanal sin fricción</p>
            <h1 className="mt-4 text-[2.8rem] font-black leading-[1.0] tracking-tightest sm:text-6xl">
              Un perfil.
              <br />
              <span className="text-sprout-light">Cero fricción.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-alabaster/75 sm:text-lg">
              El KORA Pass conecta tu compra online con la caja física: entra,
              elige, di tu número y sal. Tu perfil se actualiza solo, en tiempo
              real.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/account" className="kora-cta text-base">
                Ver mi Pass
              </Link>
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-2 rounded-[1.4rem_0.45rem_1.4rem_0.45rem] border border-alabaster/30 px-6 py-3 text-base font-semibold text-alabaster transition-all duration-300 hover:rounded-[0.45rem_1.4rem_0.45rem_1.4rem] hover:border-alabaster/60 hover:bg-alabaster/10 active:scale-[0.97]"
              >
                Ir a la tienda
              </Link>
            </div>
          </div>

          {/* La tarjeta de verdad — tócala y gira aquí mismo */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-6">
            <KoraPass member={member} dark />
            {/* El brote guardián, asomado a la tarjeta */}
            <span className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-20 sm:-left-10" aria-hidden="true">
              <TierCharacter tier="Sprout" />
            </span>
          </div>
        </div>

        {/* Señal de scroll */}
        <div className="relative flex justify-center pb-6">
          <span className="animate-float-sm text-alabaster/50" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v16M6 14l6 6 6-6" />
            </svg>
          </span>
        </div>
      </section>

      {/* ── Cinta — el mantra del Pass ── */}
      <div className="overflow-hidden border-b border-moss/10 bg-moss-900 py-3">
        <div className="kora-marquee flex w-max items-center gap-7 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center gap-7" aria-hidden={copy === 1}>
              {Array.from({ length: 4 }, (_, r) =>
                MARQUEE.map((m, i) => (
                  <span key={`${r}-${m}`} className="flex items-center gap-7 text-[11px] font-bold uppercase tracking-wide3 text-sprout-light">
                    {m}
                    <span className="text-alabaster/30">→</span>
                  </span>
                ))
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scrollytelling — el título se queda, los pasos pasan ── */}
      <section className="kora-shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="kora-eyebrow">Cómo funciona</p>
              <h2 className="mt-2 text-3xl font-black tracking-tightest text-moss sm:text-5xl">
                Cuatro pasos,
                <br />
                ni un formulario.
              </h2>
              <p className="mt-4 max-w-sm text-charcoal/60">
                Diseñamos la caja para que respete tu tiempo. El número que ya
                sabes de memoria une el mundo físico y el digital en un instante.
              </p>
              <div className="mt-8 hidden gap-2 lg:grid">
                {["Online — arma tu canasta", "En tienda — toma de los estantes", "En caja — di tu número, listo"].map((t, i) => (
                  <div key={t} className={`w-fit bg-moss/5 px-4 py-2 text-xs font-semibold text-moss/70 ${i % 2 ? "rounded-[0.4rem_1rem_0.4rem_1rem]" : "rounded-[1rem_0.4rem_1rem_0.4rem]"}`}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className={`kora-leaf-card ${i % 2 ? "kora-leaf-card-b" : ""} relative overflow-hidden p-7 pb-9 sm:p-9`}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-6 select-none text-[6rem] font-black leading-none tracking-tightest text-moss/[0.06]"
                  >
                    {s.n}
                  </span>
                  {/* El acompañante del paso */}
                  <span
                    className="kora-bob pointer-events-none absolute bottom-2 right-3 h-16 w-14"
                    style={{ animationDelay: `${i * 0.5}s` }}
                    aria-hidden="true"
                  >
                    <StepBuddy index={i} />
                  </span>
                  <span className="kora-eyebrow">Paso {s.n}</span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-moss">{s.title}</h3>
                  <p className="mt-2 max-w-md pr-12 leading-relaxed text-charcoal/60 sm:pr-16">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beneficios ── */}
      <section className="border-y border-moss/10 bg-moss text-alabaster">
        <div className="kora-shell relative py-16 sm:py-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-4 select-none text-[clamp(3rem,9vw,7rem)] font-black leading-none tracking-tightest text-alabaster/[0.05]"
          >
            Beneficios
          </span>
          <div className="max-w-2xl">
            <p className="kora-eyebrow text-sprout-light">Por qué importa</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tightest sm:text-4xl">
              Un solo perfil que trabaja por ti.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map(([t, b], i) => (
              <Reveal key={t} delay={(i % 2) * 100}>
                <div className={`flex gap-4 bg-moss-900/40 p-5 ${i % 2 ? "rounded-[0.7rem_1.7rem_0.7rem_1.7rem]" : "rounded-[1.7rem_0.7rem_1.7rem_0.7rem]"}`}>
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-[0.8rem_0.3rem_0.8rem_0.3rem] bg-sprout/20 text-sprout-light">
                    <LeafIcon />
                  </span>
                  <div>
                    <h3 className="font-bold">{t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-alabaster/65">{b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="kora-shell py-16 sm:py-20">
        <h2 className="text-2xl font-bold tracking-tight text-moss">Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-moss/10 overflow-hidden rounded-[1.7rem_0.7rem_1.7rem_0.7rem] ring-1 ring-moss/10">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-moss [&::-webkit-details-marker]:hidden">
                {q}
                <span className="flex-none text-sprout transition-transform group-open:rotate-45">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal/60">{a}</p>
            </details>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-col items-center gap-4 rounded-[2rem_0.8rem_2rem_0.8rem] bg-travertine px-6 py-12 text-center">
            <h3 className="text-2xl font-black tracking-tightest text-moss sm:text-3xl">
              ¿Listo para tu KORA Pass?
            </h3>
            <p className="max-w-md text-charcoal/60">
              Velo en tu cuenta, cópialo y empieza a vincular tus compras desde tu
              próxima visita.
            </p>
            <Link href="/account" className="kora-cta">Ver mi KORA Pass</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

// El acompañante de cada paso: nace (Semilla), compra (aguacate), escanea
// (botella PULSE) y se relaja mientras todo se sincroniza (Moss).
function StepBuddy({ index }: { index: number }) {
  if (index === 0) return <TierCharacter tier="Semilla" />;
  if (index === 3) return <TierCharacter tier="Moss" />;
  const names: PasilloCharacterName[] = ["avocado", "avocado", "bottle"];
  return <PasilloCharacter name={names[index] ?? "avocado"} />;
}

function LeafIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}
