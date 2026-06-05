import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import Stars from "@/components/Stars";
import MacroPill from "@/components/MacroPill";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";
import ProductBuyBox from "@/components/ProductBuyBox";
import { BrandBadge } from "@/components/Tag";
import {
  products,
  productById,
  pairedProducts,
  relatedProducts,
  reviewsForProduct,
  recipesWithProduct,
  BRANDS,
} from "@/lib/shop";

export function generateStaticParams(): { id: string }[] {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = productById(id);
  if (!product) return { title: "Producto — KORA" };
  return { title: `${product.name} — Tienda KORA`, description: product.description || product.blurb };
}

const nf = new Intl.NumberFormat("es-CO");

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();

  const proprietary = BRANDS[product.brand]?.proprietary;
  const pairs = pairedProducts(product);
  const related = relatedProducts(product);
  const reviews = reviewsForProduct(product.id);
  const productRecipes = recipesWithProduct(product.id);

  return (
    <div className="pb-24 lg:pb-16">
      {/* ── Encabezado: el producto es protagonista ── */}
      <div className="kora-shell relative pt-8 sm:pt-12">
        {/* Marca de agua de la góndola — eco de la firma gigante del footer */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-2 select-none text-[clamp(3.5rem,10vw,8rem)] font-black leading-none tracking-tightest text-moss/[0.05]"
        >
          {product.category}
        </span>
        {/* Miga de pan — orientación, como la señalética de pasillo */}
        <nav aria-label="Miga de pan" className="flex items-center gap-1.5 text-sm text-moss/55">
          <Link href="/tienda" className="font-medium transition-colors hover:text-moss">Tienda</Link>
          <Chevron />
          <span className="font-medium text-moss/80">{product.category}</span>
          <Chevron />
          <span className="truncate text-moss/40">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Foto — pieza de galería, hoja grande, apoyada a mano */}
          <div>
            <Photo
              imageKey={product.imageKey}
              alt={product.name}
              rounded="rounded-[2.4rem_1rem_2.4rem_1rem]"
              className="aspect-square w-full -rotate-[0.7deg] shadow-lift transition-transform duration-500 hover:rotate-0"
              label={product.origin || (proprietary ? BRANDS[product.brand].tag : undefined)}
            />
            {/* Lo que hay adentro — macros junto a la foto, transparencia primero */}
            {product.macros && (
              <div className="mt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
                  Por porción
                </p>
                <MacroPill macros={product.macros} defaultOpen />
              </div>
            )}
          </div>

          {/* Meta + caja de compra */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-1.5">
              {proprietary && <BrandBadge label={BRANDS[product.brand].name} />}
              {product.bestSeller && (
                <span className="rounded-full bg-moss px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide2 text-alabaster">
                  Más vendido
                </span>
              )}
              {product.isNew && (
                <span className="rounded-full bg-sprout/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide2 text-sprout-dark">
                  Nuevo
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-black tracking-tightest text-moss sm:text-4xl">{product.name}</h1>
            {product.tagline && <p className="mt-1.5 text-lg text-charcoal/55">{product.tagline}</p>}

            {/* Prueba social — calificación + volumen, ancla a las reseñas */}
            {product.rating && (
              <a href="#resenas" className="mt-3 flex flex-wrap items-center gap-2">
                <Stars value={product.rating} size={16} />
                <span className="text-sm font-bold text-moss">{product.rating}</span>
                {product.reviews && (
                  <span className="text-sm text-charcoal/50 underline-offset-2 hover:underline">
                    ({product.reviews} reseñas)
                  </span>
                )}
                {product.sold && (
                  <span className="text-sm text-charcoal/40">· +{nf.format(product.sold)} vendidos</span>
                )}
              </a>
            )}

            <ProductBuyBox product={product} />

            {/* Por qué lo elegimos — beneficios escaneables */}
            {product.highlights && product.highlights.length > 0 && (
              <ul className="mt-6 space-y-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-sm text-charcoal/70">
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-[0.6rem_0.2rem_0.6rem_0.2rem] bg-sprout/12 text-sprout-dark">
                      <Leaf />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {product.description && (
              <p className="mt-6 max-w-lg leading-relaxed text-charcoal/65">{product.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Combínalo con — adyacencia de góndola, sube el ticket promedio ── */}
      {pairs.length > 0 && (
        <div className="kora-shell mt-16">
          <p className="kora-eyebrow">Mejor juntos</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-moss">Combínalo con</h2>
          <p className="mt-1 text-sm text-charcoal/55">Lo que otros llevan junto a {product.name}.</p>
          <div className="mt-4">
            <Carousel>
              {pairs.map((p) => (
                <div key={p.id} className="w-44 flex-none snap-start sm:w-52">
                  <ProductCard product={p} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}

      {/* ── Recetas con este producto — el puente tienda → cocina ── */}
      {productRecipes.length > 0 && (
        <div className="kora-shell mt-16">
          <div className="flex flex-col items-start justify-between gap-5 rounded-[2rem_0.8rem_2rem_0.8rem] bg-moss p-6 text-alabaster sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="kora-eyebrow text-sprout-light">Cocina con esto</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">Recetas con {product.name}</h2>
              <p className="mt-1 max-w-md text-sm text-alabaster/70">
                {productRecipes.length} receta{productRecipes.length !== 1 ? "s" : ""} con macros
                calculados — agrega el bundle completo a tu canasta en un toque.
              </p>
            </div>
            <Link href={`/recipes?con=${product.id}`} className="kora-cta flex-none">
              Ver recetas
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* ── Reseñas — la prueba social a fondo ── */}
      <div id="resenas" className="kora-shell mt-16 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="kora-eyebrow">Lo que dicen</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-moss">Reseñas</h2>
            {product.rating && (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-5xl font-black tracking-tightest text-moss">{product.rating}</span>
                <span className="flex flex-col gap-1">
                  <Stars value={product.rating} size={16} />
                  {product.reviews && (
                    <span className="text-xs text-charcoal/50">{product.reviews} reseñas verificadas</span>
                  )}
                </span>
              </div>
            )}
            <p className="mt-3 text-sm text-charcoal/55">
              Compras verificadas de miembros KORA Pass.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
            {reviews.map((r) => (
              <article key={r.name} className="kora-card flex flex-col gap-2 p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-moss/8 text-xs font-bold text-moss">
                    {r.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-moss">{r.name}</span>
                    <span className="block text-[11px] text-charcoal/40">{r.date}</span>
                  </span>
                </div>
                <Stars value={r.rating} size={13} />
                <h3 className="text-sm font-bold text-moss">{r.title}</h3>
                <p className="text-[13px] leading-relaxed text-charcoal/60">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── Nota de transparencia ── */}
      <div className="kora-shell mt-16">
        <div className="rounded-[0.8rem_2rem_0.8rem_2rem] bg-moss p-6 text-alabaster sm:p-8">
          <p className="kora-eyebrow text-sprout-light">Transparente por defecto</p>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-alabaster/75">
            Precios en pesos colombianos con impuestos incluidos. Los macros se
            declaran por porción sobre producto sin preparar. La disponibilidad y
            el inventario se verifican en vivo contra tu nodo más cercano al pagar.
          </p>
        </div>
      </div>

      {/* ── También en la misma góndola ── */}
      {related.length > 0 && (
        <div className="kora-shell mt-16">
          <h2 className="text-xl font-bold text-moss">También en {product.category}</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-moss/30" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// Hoja sprout — el bullet de marca en los beneficios.
function Leaf() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 0 1-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}
