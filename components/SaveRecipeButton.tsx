"use client";

import type { MouseEvent } from "react";
import { useSavedRecipes } from "@/components/SavedRecipesProvider";

interface SaveRecipeButtonProps {
  recipeId: string;
  variant?: "icon" | "pill";
}

// Corazón de guardar receta — variante "icon" (sobre la foto de la tarjeta)
// o "pill" (en el encabezado del detalle de receta).
export default function SaveRecipeButton({ recipeId, variant = "icon" }: SaveRecipeButtonProps) {
  const { isSaved, toggle } = useSavedRecipes();
  const saved = isSaved(recipeId);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(recipeId);
  };

  if (variant === "pill") {
    return (
      <button
        onClick={onClick}
        aria-pressed={saved}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
          saved
            ? "bg-sprout/12 text-sprout-dark ring-1 ring-sprout/30"
            : "border border-moss/20 text-moss hover:border-moss/40 hover:bg-moss/5"
        }`}
      >
        <Heart filled={saved} size={16} />
        {saved ? "Guardada" : "Guardar receta"}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? "Quitar de guardadas" : "Guardar receta"}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-moss shadow-soft backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
    >
      <Heart filled={saved} size={17} />
    </button>
  );
}

function Heart({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#76A035" : "none"}
      stroke={filled ? "#76A035" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}
