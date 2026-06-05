"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

// Recetas guardadas — persistidas en localStorage. Arranca con dos guardadas
// de muestra (demo) hasta que el usuario toque el corazón por primera vez.
const STORAGE_KEY = "kora-saved-recipes";
const DEFAULT_SAVED = ["pulse-overnight-oats", "green-reset-smoothie"];

interface SavedRecipesContextValue {
  saved: string[];
  toggle(id: string): void;
  isSaved(id: string): boolean;
}

const SavedRecipesContext = createContext<SavedRecipesContextValue | null>(null);

export function SavedRecipesProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(DEFAULT_SAVED);

  // Hidratar desde localStorage después del primer render (evita mismatch SSR).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      /* storage no disponible — seguimos con el estado en memoria */
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const value = useMemo<SavedRecipesContextValue>(
    () => ({ saved, toggle, isSaved: (id: string) => saved.includes(id) }),
    [saved, toggle]
  );

  return <SavedRecipesContext.Provider value={value}>{children}</SavedRecipesContext.Provider>;
}

export function useSavedRecipes(): SavedRecipesContextValue {
  const ctx = useContext(SavedRecipesContext);
  if (!ctx) throw new Error("useSavedRecipes must be used within SavedRecipesProvider");
  return ctx;
}
