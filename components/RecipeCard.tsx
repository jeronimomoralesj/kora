import { memo } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import MacroPill from "@/components/MacroPill";
import SaveRecipeButton from "@/components/SaveRecipeButton";
import { Tag } from "@/components/Tag";
import type { Recipe } from "@/lib/types";

function RecipeCard({ recipe, priority }: { recipe: Recipe; priority?: boolean }) {
  const proprietary = recipe.ingredients.filter((i) => i.brand !== "STANDARD").length;

  // La hoja se espeja según el id — estable y alternada, como puesta a mano.
  const mirrored = [...recipe.id].reduce((n, c) => n + c.charCodeAt(0), 0) % 2 === 1;

  return (
    <article
      className={`group kora-leaf-card ${mirrored ? "kora-leaf-card-b" : ""} flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lift ${
        mirrored ? "hover:rotate-[0.4deg]" : "hover:-rotate-[0.4deg]"
      }`}
    >
      <Link href={`/recipes/${recipe.id}`} className="halo-light relative block">
        <Photo
          imageKey={recipe.imageKey}
          alt={recipe.title}
          rounded="rounded-none"
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
          label={`${recipe.prepTime} min`}
        />
        {proprietary > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-sprout px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide2 text-white shadow-soft">
            {proprietary} {proprietary > 1 ? "productos" : "producto"} KORA
          </span>
        )}
        <span className="absolute right-3 top-3">
          <SaveRecipeButton recipeId={recipe.id} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 3).map((t) => (
            <Tag key={t} tone={t === "Alta Proteína" || t === "Post-Entreno" ? "sprout" : "moss"}>
              {t}
            </Tag>
          ))}
        </div>

        <Link href={`/recipes/${recipe.id}`} className="block">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-moss">{recipe.title}</h3>
          <p className="mt-0.5 text-sm text-charcoal/55">{recipe.subtitle}</p>
        </Link>

        <p className="text-[13px] font-semibold text-sprout-dark">{recipe.blurb}</p>

        <div className="mt-auto pt-1">
          <MacroPill macros={recipe.macros} />
        </div>

        <Link
          href={`/recipes/${recipe.id}`}
          className="kora-cta mt-1 w-full"
        >
          Armar esta receta
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// Memoizado — la grilla filtra en cada tecla; las tarjetas sin cambios no se re-renderizan.
export default memo(RecipeCard);
