import type { Metadata } from "next";
import TiendaGrid from "@/components/TiendaGrid";
import CartParade from "@/components/CartParade";
import { products } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Tienda — KORA",
  description:
    "Compra frescos, proteínas, despensa y las líneas propias KORA (PULSE, KORA Origen). Recogida en 10 minutos o domicilio local.",
};

type TrustIconName = "bolt" | "leaf" | "pass";

const TRUST: { icon: TrustIconName; text: string }[] = [
  { icon: "bolt", text: "Recogida lista en 10 min" },
  { icon: "leaf", text: "Frescura del día, garantizada" },
  { icon: "pass", text: "Acumulas puntos KORA Pass" },
];

// Imagen de prueba (hotlink Whole Foods) — reemplazar por fotografía propia.
const HERO_IMG =
  "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/22/e7/0f9dd66548069f5a123b61990592/produce-hero1500x600-2x-v2.jpg";

export default function TiendaPage() {
  return (
    <div className="kora-shell py-8 sm:py-12">
      {/* Hero de tienda — frescura primero, como la entrada de un buen mercado */}
      <div className="relative overflow-hidden rounded-kora shadow-lift">
        <img
          src={HERO_IMG}
          alt="Frescos del día en KORA"
          className="h-56 w-full object-cover sm:h-64 lg:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-moss/85 via-moss/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-10">
          <span className="rounded-full bg-sprout px-3 py-1 text-[11px] font-bold uppercase tracking-wide2 text-white">
            Cosecha del día
          </span>
          <h1 className="mt-3 max-w-md text-3xl font-black tracking-tightest text-white sm:text-4xl lg:text-5xl">
            Lo más fresco del barrio, en un toque.
          </h1>
          <p className="mt-2 hidden max-w-sm text-sm text-white/85 sm:block">
            Frescos del día, proteínas limpias, despensa y nuestras líneas propias
            — listos en 10 minutos.
          </p>
        </div>
        {/* El desfile — la zanahoria empuja el carrito por el andén del hero */}
        <CartParade />
      </div>

      {/* Barra de confianza — reduce la fricción antes de comprar */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t kora-hairline pt-4">
        {TRUST.map((t) => (
          <span key={t.icon} className="flex items-center gap-2 text-[13px] font-medium text-moss/75">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sprout/12 text-sprout-dark">
              <TrustIcon name={t.icon} />
            </span>
            {t.text}
          </span>
        ))}
      </div>

      <TiendaGrid products={products} />

      <p className="mt-12 text-center text-xs text-charcoal/40">
        Catálogo de prueba · los productos reales reemplazarán estos datos dummy.
      </p>
    </div>
  );
}

function TrustIcon({ name }: { name: TrustIconName }) {
  const paths: Record<TrustIconName, React.ReactNode> = {
    bolt: <path d="M13 2 4.5 13H11l-1 9 8.5-11H13l1-9Z" />,
    leaf: <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10ZM2 21c0-3 1.85-5.36 5.08-6" />,
    pass: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M3 10h18M8 15h4" />
      </>
    ),
  };
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
