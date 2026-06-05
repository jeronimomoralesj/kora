"use client";

import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { useSavedRecipes } from "@/components/SavedRecipesProvider";
import { recipes } from "@/lib/data";

// Recetas guardadas del miembro — lee del provider (corazones en tarjetas y
// detalle de receta). Vacío → invita a explorar las recetas.
export default function SavedRecipesSection() {
  const { saved } = useSavedRecipes();
  const items = recipes.filter((r) => saved.includes(r.id));

  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="kora-eyebrow">Tu recetario</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-moss">
            Recetas guardadas
            <span className="ml-2 align-middle text-sm font-semibold text-charcoal/40">
              {items.length}
            </span>
          </h2>
        </div>
        <Link href="/recipes" className="flex-none text-sm font-semibold text-sprout-dark transition-colors hover:text-sprout">
          Ver todas las recetas →
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <div key={r.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-kora bg-white py-14 text-center ring-1 ring-moss/8">
          <p className="text-charcoal/55">
            Aún no has guardado recetas. Toca el corazón en cualquier receta y aparecerá aquí.
          </p>
          <Link href="/recipes" className="kora-cta mt-4">
            Explorar recetas
          </Link>
        </div>
      )}
    </section>
  );
}
