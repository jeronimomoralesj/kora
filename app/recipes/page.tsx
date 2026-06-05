import type { Metadata } from "next";
import Link from "next/link";
import RecipeEngine from "@/components/RecipeEngine";
import RecipeCard from "@/components/RecipeCard";
import { recipes } from "@/lib/data";
import { productById, recipesWithProduct } from "@/lib/shop";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const str = (v: string | string[] | undefined): string => (typeof v === "string" ? v : "");

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const sp = await searchParams;
  const product = productById(str(sp.con));
  return {
    title: product ? `Recetas con ${product.name} — KORA` : "Recetas — KORA",
    description:
      "Recetas funcionales con macros calculados, listas para armar en un toque con productos de la tienda KORA.",
  };
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const product = productById(str(sp.con));

  // Vista filtrada — recetas que usan un producto específico de la tienda.
  if (product) {
    const matches = recipesWithProduct(product.id);
    return (
      <div className="kora-shell py-8 sm:py-12">
        <nav aria-label="Miga de pan" className="flex items-center gap-1.5 text-sm text-moss/55">
          <Link href="/recipes" className="font-medium transition-colors hover:text-moss">Recetas</Link>
          <Chevron />
          <span className="truncate text-moss/40">Con {product.name}</span>
        </nav>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="kora-eyebrow">Cocina con esto</p>
            <h1 className="mt-2 text-3xl font-black tracking-tightest text-moss sm:text-4xl">
              Recetas con {product.name}
            </h1>
            <p className="mt-2 text-charcoal/60">
              {matches.length} receta{matches.length !== 1 ? "s" : ""} con macros calculados que usa
              {matches.length !== 1 ? "n" : ""} este producto. Agrega el bundle completo a tu canasta en un toque.
            </p>
          </div>
          <Link
            href={`/tienda/${product.id}`}
            className="text-sm font-semibold text-sprout-dark transition-colors hover:text-sprout"
          >
            ← Volver al producto
          </Link>
        </div>

        {matches.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((r, i) => (
              <div key={r.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <RecipeCard recipe={r} priority={i < 3} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-kora bg-white py-16 text-center ring-1 ring-moss/8">
            <p className="text-charcoal/55">Aún no tenemos recetas con este producto.</p>
            <Link href="/recipes" className="kora-cta mt-4">
              Ver todas las recetas
            </Link>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/recipes" className="kora-cta-ghost">
            Ver todas las recetas
          </Link>
        </div>
      </div>
    );
  }

  // Vista completa — el motor de recetas con filtros por tag.
  return <RecipeEngine recipes={recipes} />;
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-moss/30" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
