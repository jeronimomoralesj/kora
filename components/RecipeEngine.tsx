"use client";

import { useDeferredValue, useMemo, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import ChefScene from "@/components/ChefScene";
import { recipeFilters } from "@/lib/data";
import type { Macros, Recipe } from "@/lib/types";

const SORTS: { value: string; label: string }[] = [
  { value: "destacadas", label: "Destacadas" },
  { value: "proteina", label: "Más proteína" },
  { value: "tiempo", label: "Menos tiempo" },
  { value: "calorias", label: "Menos calorías" },
];

// Filtros por macro — cada uno cicla: apagado → ≥ (más de) → ≤ (hasta).
const MACROS: { key: keyof Macros; label: string; unit: string; start: number }[] = [
  { key: "protein", label: "Proteína", unit: "g", start: 25 },
  { key: "carbs", label: "Carbos", unit: "g", start: 40 },
  { key: "fats", label: "Grasas", unit: "g", start: 15 },
  { key: "calories", label: "Kcal", unit: "kcal", start: 450 },
];

type MacroFilter = { op: "gte" | "lte"; val: number };

export default function RecipeEngine({ recipes }: { recipes: Recipe[] }) {
  const [filter, setFilter] = useState("Todas");
  const [query, setQuery] = useState("");
  // El input responde al instante; el filtrado pesado corre con la versión diferida.
  const deferredQuery = useDeferredValue(query);
  const [sort, setSort] = useState("destacadas");
  const [macroFilters, setMacroFilters] = useState<Record<string, MacroFilter>>({}); // key → { op: "gte"|"lte", val }

  const cycleMacro = (key: string, start: number) =>
    setMacroFilters((prev) => {
      const cur = prev[key];
      const next = { ...prev };
      if (!cur) next[key] = { op: "gte", val: start };
      else if (cur.op === "gte") next[key] = { ...cur, op: "lte" };
      else delete next[key];
      return next;
    });

  const setMacroVal = (key: string, val: string) =>
    setMacroFilters((prev) => ({ ...prev, [key]: { ...prev[key], val: Math.max(0, Number(val) || 0) } }));

  const hasMacroFilters = Object.keys(macroFilters).length > 0;

  const shown = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    let list = recipes.filter((r) => {
      const okTag = filter === "Todas" || r.tags.includes(filter);
      const okQ =
        !q ||
        [r.title, r.subtitle, ...r.tags, ...r.ingredients.map((i) => i.name)].some((t) =>
          t.toLowerCase().includes(q)
        );
      const okMacros = Object.entries(macroFilters).every(([key, f]) =>
        f.op === "gte" ? r.macros[key as keyof Macros] >= f.val : r.macros[key as keyof Macros] <= f.val
      );
      return okTag && okQ && okMacros;
    });
    if (sort === "proteina") list = [...list].sort((a, b) => b.macros.protein - a.macros.protein);
    if (sort === "tiempo") list = [...list].sort((a, b) => a.prepTime - b.prepTime);
    if (sort === "calorias") list = [...list].sort((a, b) => a.macros.calories - b.macros.calories);
    return list;
  }, [recipes, filter, deferredQuery, sort, macroFilters]);

  return (
    <section id="recipes" className="kora-shell relative py-16 sm:py-20">
      {/* Marca de agua de sección — eco de la firma gigante del footer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-8 select-none text-[clamp(4rem,14vw,11rem)] font-black leading-none tracking-tightest text-moss/[0.05]"
      >
        Recetas
      </span>

      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="kora-eyebrow">El Motor de Recetas</p>
          <h2 className="mt-2 text-3xl font-black tracking-tightest text-moss sm:text-5xl">
            Come según tus macros, no según una grilla.
          </h2>
          <p className="mt-3 text-charcoal/60">
            Cada receta tiene macros calculados y está a un toque de tu canasta.
            Agrega todo y desmarca lo que ya tienes en tu cocina.
          </p>
        </div>
        {/* La olla siempre está puesta — el brote chef vigila el hervor */}
        <ChefScene />
      </div>

      {/* Buscador de recetas — por nombre, tag o ingrediente */}
      <div className="relative mt-7 max-w-xl">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-moss/40">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Buscar por receta, tag o ingrediente…"
          className="w-full rounded-[1.4rem_0.5rem_1.4rem_0.5rem] border border-moss/15 bg-white py-3 pl-11 pr-4 text-sm text-moss outline-none transition-all duration-300 placeholder:text-charcoal/35 focus:rounded-[0.5rem_1.4rem_0.5rem_1.4rem] focus:border-sprout focus:ring-2 focus:ring-sprout/20"
        />
      </div>

      {/* Toolbar — chips + conteo + orden */}
      <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {recipeFilters.map((f, i) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-none px-4 py-2 text-sm font-medium transition-all duration-300 ${
              i % 2 ? "rounded-[0.4rem_1rem_0.4rem_1rem]" : "rounded-[1rem_0.4rem_1rem_0.4rem]"
            } ${
              filter === f
                ? "bg-moss text-alabaster shadow-soft"
                : "bg-white text-moss/70 ring-1 ring-moss/10 hover:ring-moss/25"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Filtros por macro — toca el macro para ciclar: — → ≥ más de → ≤ hasta */}
      <div className="-mx-5 mt-3 flex items-center gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="flex-none text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
          Macros
        </span>
        {MACROS.map((m, i) => {
          const f = macroFilters[m.key];
          return (
            <div
              key={m.key}
              className={`flex flex-none items-center gap-1.5 py-1.5 pl-3 pr-2 text-sm transition-all duration-300 ${
                i % 2 ? "rounded-[0.4rem_1rem_0.4rem_1rem]" : "rounded-[1rem_0.4rem_1rem_0.4rem]"
              } ${f ? "bg-sprout/10 ring-1 ring-sprout/40" : "bg-white ring-1 ring-moss/10 hover:ring-moss/25"}`}
            >
              <button
                onClick={() => cycleMacro(m.key, m.start)}
                aria-label={`Filtrar por ${m.label}: ${!f ? "sin filtro" : f.op === "gte" ? "más de" : "hasta"}`}
                title={!f ? "Toca para filtrar" : f.op === "gte" ? "≥ más de — toca para cambiar a hasta" : "≤ hasta — toca para quitar"}
                className={`flex items-center gap-1.5 font-medium ${f ? "text-sprout-dark" : "text-moss/70"}`}
              >
                {m.label}
                <span className={`text-base font-black leading-none ${f ? "text-sprout-dark" : "text-moss/30"}`}>
                  {!f ? "—" : f.op === "gte" ? "≥" : "≤"}
                </span>
              </button>
              {f && (
                <>
                  <input
                    type="number"
                    min="0"
                    value={f.val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMacroVal(m.key, e.target.value)}
                    aria-label={`Valor de ${m.label}`}
                    className="w-12 rounded-md bg-white px-1 py-0.5 text-center text-sm font-bold text-moss outline-none ring-1 ring-sprout/30 focus:ring-sprout [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-[10px] font-medium text-charcoal/45">{m.unit}</span>
                </>
              )}
            </div>
          );
        })}
        {hasMacroFilters && (
          <button
            onClick={() => setMacroFilters({})}
            className="flex-none text-xs font-semibold text-charcoal/45 transition-colors hover:text-moss"
          >
            Limpiar macros
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-charcoal/55">
          <span className="font-bold text-moss">{shown.length}</span> receta{shown.length !== 1 ? "s" : ""}
          {query && <span className="hidden sm:inline"> para “{query}”</span>}
          {hasMacroFilters && (
            <span className="hidden sm:inline">
              {" "}·{" "}
              {Object.entries(macroFilters)
                .map(([k, f]) => {
                  const m = MACROS.find((x) => x.key === k)!;
                  return `${m.label} ${f.op === "gte" ? "≥" : "≤"} ${f.val}${m.unit === "kcal" ? "" : m.unit}`;
                })
                .join(" · ")}
            </span>
          )}
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="hidden text-charcoal/45 sm:inline">Ordenar:</span>
          <select
            value={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}
            className="rounded-full border border-moss/15 bg-white px-3 py-2 text-sm font-medium text-moss outline-none focus:border-sprout"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Grilla escalonada — la columna del medio baja, como puesta a mano */}
      <div className="mt-8 grid gap-5 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r, i) => (
          <div key={r.id} className={i % 3 === 1 ? "lg:translate-y-8" : ""}>
            <div className="animate-fade-up" style={{ animationDelay: `${(i % 6) * 60}ms` }}>
              <RecipeCard recipe={r} priority={i < 3} />
            </div>
          </div>
        ))}
      </div>

      {shown.length === 0 && (
        <div className="rounded-[2rem_0.8rem_2rem_0.8rem] bg-white py-16 text-center ring-1 ring-moss/8">
          <p className="text-charcoal/55">
            No encontramos recetas{query ? ` para “${query}”` : ""} con esos filtros.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setFilter("Todas");
              setMacroFilters({});
            }}
            className="kora-cta-ghost mt-4"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </section>
  );
}
