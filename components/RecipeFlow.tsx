"use client";

import { useEffect, useState } from "react";
import IngredientBundle from "@/components/IngredientBundle";
import type { Recipe } from "@/lib/types";

// Botón flotante "Conseguir los ingredientes" + drawer-selector.
// La receta es lo primero; comprar es una acción secundaria, opcional, que se
// abre solo cuando el usuario la pide.
export default function RecipeFlow({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Botón flotante */}
      <div className={`fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-all duration-300 ${open ? "pointer-events-none translate-y-6 opacity-0" : "opacity-100"}`}>
        <button
          onClick={() => setOpen(true)}
          className="flex w-full max-w-md items-center justify-between gap-3 rounded-full bg-sprout px-5 py-4 text-white shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.99] sm:w-auto"
        >
          <span className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <BasketIcon />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-bold">Conseguir los ingredientes</span>
              <span className="block text-[11px] text-white/70">
                {recipe.ingredients.length} ingredientes · elige los que quieras
              </span>
            </span>
          </span>
          <ChevronUpIcon />
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
      />

      {/* Drawer / bottom-sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Elige tus ingredientes"
        className={`fixed z-50 flex flex-col bg-alabaster shadow-lift transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          inset-x-0 bottom-0 max-h-[90vh] rounded-t-kora
          sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[440px] sm:rounded-t-none
          ${open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"}`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-moss/10 px-5 py-4">
          <div>
            <p className="kora-eyebrow">Bundle en un Clic</p>
            <h2 className="text-lg font-bold text-moss">Elige tus ingredientes</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full text-moss transition-colors hover:bg-moss/8"
          >
            <CloseIcon />
          </button>
        </div>

        {/* drag handle (mobile) */}
        <span className="mx-auto mt-2 h-1 w-10 rounded-full bg-moss/15 sm:hidden" />

        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-1 text-sm text-charcoal/60">
            Para <span className="font-semibold text-moss">{recipe.title}</span> · desmarca lo que ya tengas en casa.
          </p>
          <IngredientBundle recipe={recipe} />
        </div>
      </aside>
    </>
  );
}

function BasketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
