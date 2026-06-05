import Link from "next/link";
import Logo from "@/components/Logo";

// Promesas de marca que giran en la cinta superior del footer.
const MARQUEE: string[] = [
  "Fresco del día",
  "Macros honestos",
  "Recogida en 10 min",
  "Origen andino",
  "Cero fricción",
  "Hecho en Bogotá",
];

type FooterLink = [label: string, href: string];

export default function Footer() {
  return (
    <footer className="mt-24 overflow-hidden bg-moss text-alabaster">
      {/* ── Cinta marquee — las promesas, en loop (pausa al pasar el mouse) ── */}
      <div className="border-y border-alabaster/10 bg-moss-900 py-3">
        <div className="kora-marquee flex w-max items-center gap-7 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center gap-7" aria-hidden={copy === 1}>
              {MARQUEE.map((m) => (
                <span key={m} className="flex items-center gap-7 text-[11px] font-bold uppercase tracking-wide3 text-sprout-light">
                  {m}
                  <LeafIcon />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Banda CTA — el mercado nunca se siente cerrado ── */}
      <div className="kora-shell flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
        <div>
          <p className="kora-eyebrow text-sprout-light">El mercado sigue abierto</p>
          <h2 className="mt-2 max-w-md text-3xl font-black tracking-tightest sm:text-4xl">
            ¿Antojo de algo fresco?
          </h2>
        </div>
        <Link href="/tienda" className="kora-cta flex-none text-base">
          Comprar ahora
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      {/* ── Columnas ── */}
      <div className="kora-shell grid gap-10 border-t border-alabaster/10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo className="text-3xl text-alabaster" />
          <p className="max-w-xs text-sm leading-relaxed text-alabaster/70">
            Macros limpios. Orígenes premium. Cero fricción. Un minimercado de
            nutrición urbana pensado para la vida en movimiento en Bogotá.
          </p>
        </div>

        <FooterCol
          title="Comprar"
          links={[
            ["Tienda", "/tienda"],
            ["Línea PULSE", "/tienda/buscar?marca=PULSE"],
            ["Recetas", "/recipes"],
            ["Canasta", "/checkout"],
          ]}
        />
        <FooterCol
          title="Cuenta"
          links={[
            ["Mi KORA Pass", "/account"],
            ["Cómo funciona el Pass", "/kora-pass"],
            ["Spec de imágenes", "/image-format"],
          ]}
        />

        <FooterCol
          title="Nodos"
          links={[
            ["Quinta Camacho · abierto", "/nodos/quinta-camacho"],
            ["Teusaquillo · pronto", "/nodos/teusaquillo"],
            ["Chapinero Alto · pronto", "/nodos/chapinero-alto"],
            ["Todos los nodos", "/nodos"],
          ]}
        />
      </div>

      {/* ── Marca de agua tipográfica — la firma del estudio ── */}
      <div className="kora-shell select-none" aria-hidden="true">
        <p className="-mb-[0.14em] overflow-hidden text-center text-[clamp(5rem,21vw,19rem)] font-black leading-[0.78] tracking-tightest text-alabaster/[0.07]">
          KORA
        </p>
      </div>

      <div className="relative border-t border-alabaster/10">
        <div className="kora-shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-alabaster/50 sm:flex-row">
          <p>© 2026 KORA Foods &amp; Provisions · Bogotá, Colombia</p>
          <p className="flex items-center gap-1.5">
            Diseñado y cultivado en Bogotá <LeafIcon /> datos de prueba
          </p>
        </div>
      </div>
    </footer>
  );
}

// Hoja sprout — el separador de marca (mismo trazo que los íconos de confianza).
function LeafIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-none text-sprout-light/70"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-[11px] font-semibold uppercase tracking-wide2 text-sprout-light">
        {title}
      </h4>
      <ul className="space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 text-alabaster/70 transition-all hover:translate-x-1 hover:text-sprout-light"
            >
              {label}
              <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
