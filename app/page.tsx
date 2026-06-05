import Link from "next/link";
import Philosophy from "@/components/Philosophy";
import StoreArchitecture from "@/components/StoreArchitecture";
import PasilloCharacter, { type PasilloCharacterName } from "@/components/PasilloCharacter";
import ProductRail from "@/components/ProductRail";
import RecipeCard from "@/components/RecipeCard";
import { recipes } from "@/lib/data";
import { products } from "@/lib/shop";

interface CategoryTile {
  cat: string;
  character: PasilloCharacterName;
  copy: string;
}

// Tiles de categoría — cada pasillo tiene su habitante con carita.
const CATEGORY_TILES: CategoryTile[] = [
  { cat: "Frescos", character: "avocado", copy: "Cosecha del día" },
  { cat: "Proteínas", character: "egg", copy: "Limpias y completas" },
  { cat: "Despensa", character: "jar", copy: "Honesta y trazable" },
  { cat: "Bebidas", character: "coconut", copy: "Hidratación natural" },
  { cat: "Líneas KORA", character: "bottle", copy: "PULSE y KORA Origen" },
];

export default function HomePage() {
  const deals = products.filter((p) => p.compareAt && p.compareAt > p.price);
  const top = products.filter((p) => p.bestSeller);

  return (
    <>
      {/* ── Hero ── video a todo lo ancho, mensaje al centro ── */}
      <section className="kora-grain relative overflow-hidden bg-moss">
        <video
          src="/hero/market.mp4"
          poster="/hero/market.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Velo moss — legibilidad sobre el video */}
        <div className="absolute inset-0 bg-gradient-to-b from-moss-900/75 via-moss/50 to-moss-900/80" />

        <div className="kora-shell relative flex min-h-[72vh] flex-col items-center justify-center py-20 text-center sm:min-h-[78vh] sm:py-28">
          <h1 className="text-[2.8rem] font-black leading-[1.02] tracking-tightest text-alabaster sm:text-6xl lg:text-7xl">
            Lo más fresco,
            <br />
            <span className="text-sprout-light">elevado.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-alabaster/80 sm:text-lg">
            Tu mercado de cada semana, hermoso y confiable. Frescos del día
            seleccionados a mano, proteínas limpias, despensa honesta y nuestras
            líneas propias — con recogida en 10 minutos o domicilio.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tienda" className="kora-cta text-base">
              Comprar ahora
            </Link>
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center gap-2 rounded-[1.4rem_0.45rem_1.4rem_0.45rem] border border-alabaster/30 px-6 py-3 text-base font-semibold text-alabaster transition-all duration-300 hover:rounded-[0.45rem_1.4rem_0.45rem_1.4rem] hover:border-alabaster/60 hover:bg-alabaster/10 active:scale-[0.97]"
            >
              Ver recetas
            </Link>
          </div>

          <dl className="mt-12 grid w-full max-w-md grid-cols-3 gap-4 border-t border-alabaster/15 pt-6">
            {(
              [
                ["Del día", "Frescura garantizada"],
                ["Seleccionado", "A mano, sin relleno"],
                ["10 min", "Recogida lista"],
              ] as const
            ).map(([n, l]) => (
              <div key={l}>
                <dt className="text-xl font-bold tracking-tight text-alabaster sm:text-2xl">{n}</dt>
                <dd className="mt-0.5 text-[11px] text-alabaster/60 sm:text-xs">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Compra por pasillo ── señalética de pasillo sobre la foto, con
           números gigantes y ritmo escalonado — puesto a mano, no generado ── */}
      <section className="kora-shell py-14 sm:py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="kora-eyebrow">El mercado</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tightest text-moss sm:text-3xl">
              Compra por pasillo
            </h2>
          </div>
          <Link href="/tienda" className="text-sm font-semibold text-sprout-dark transition-colors hover:text-sprout">
            Ver toda la tienda →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 pb-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {CATEGORY_TILES.map((t, i) => {
            const mirrored = i % 2 === 1;
            return (
              <Link
                key={t.cat}
                href={`/tienda/buscar?cat=${encodeURIComponent(t.cat)}`}
                className={`group kora-leaf-card ${mirrored ? "kora-leaf-card-b sm:translate-y-5 hover:rotate-[0.6deg]" : "hover:-rotate-[0.6deg]"} relative overflow-hidden shadow-lift hover:-translate-y-1`}
              >
                {/* El habitante del pasillo — flota a su propio ritmo */}
                <div className="relative aspect-[3/4] w-full bg-gradient-to-b from-white to-travertine">
                  <div
                    className="kora-bob absolute inset-x-0 top-3 bottom-12 transition-transform duration-500 group-hover:scale-[1.08]"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  >
                    <PasilloCharacter name={t.character} />
                  </div>
                </div>

                {/* Número de pasillo — gigante y fantasma, como señalética */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-3 select-none text-[4.5rem] font-black leading-none tracking-tightest text-moss/[0.07] transition-colors duration-500 group-hover:text-sprout/25"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Señalética inferior */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-travertine via-travertine/90 to-transparent p-3.5 pt-6">
                  <p className="text-[9px] font-medium uppercase tracking-wide3 text-moss/45">
                    Pasillo {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-base font-black tracking-tight text-moss">{t.cat}</h3>
                  <p className="flex items-center gap-1.5 text-[11px] text-charcoal/55">
                    {t.copy}
                    <span className="-translate-x-1 text-sprout-dark opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Góndolas destacadas ── ofertas y favoritos, como al entrar al super ── */}
      <section className="kora-shell space-y-12 pb-14 sm:pb-16">
        {deals.length > 0 && (
          <ProductRail
            eyebrow="Solo esta semana"
            title="Ofertas de la semana"
            items={deals}
            seeAllHref="/tienda"
          />
        )}
        {top.length > 0 && (
          <ProductRail
            eyebrow="Lo que más se lleva la gente"
            title="Más vendidos"
            items={top}
            seeAllHref="/tienda"
          />
        )}
      </section>

      {/* ── Franja de valor ── */}
      <section className="border-y border-moss/10 bg-moss">
        <div className="kora-shell grid gap-px py-0 sm:grid-cols-3">
          {(
            [
              ["Frescura del día", "Producto seleccionado a mano cada mañana — garantizado o te lo cambiamos."],
              ["Recogida o domicilio", "Recoge en 10 min camino a casa, o domicilio local rápido."],
              ["KORA Pass", "Cada compra suma puntos, en tienda y online, con un solo perfil."],
            ] as const
          ).map(([t, d], i) => (
            <div key={t} className={`px-2 py-8 ${i > 0 ? "sm:border-l sm:border-alabaster/10" : ""}`}>
              <h3 className="text-base font-bold text-sprout-light">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-alabaster/65">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recetas — el complemento del mercado, no el protagonista ── */}
      <section className="kora-shell py-14 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="kora-eyebrow">Y para cocinar</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tightest text-moss sm:text-3xl">
              Recetas con macros calculados
            </h2>
            <p className="mt-2 text-charcoal/60">
              Todo lo de la receta a tu canasta en un toque — desmarca lo que ya tienes.
            </p>
          </div>
          <Link href="/recipes" className="flex-none text-sm font-semibold text-sprout-dark transition-colors hover:text-sprout">
            Ver todas las recetas →
          </Link>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.slice(0, 3).map((r, i) => (
            <div key={r.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <RecipeCard recipe={r} priority={i < 3} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Filosofía de diseño ── */}
      <Philosophy />

      {/* ── La arquitectura de tienda como extensión digital ── */}
      <StoreArchitecture />
    </>
  );
}
