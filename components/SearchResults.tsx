"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import FloatingSearch from "@/components/FloatingSearch";
import FloatingCartBar from "@/components/FloatingCartBar";
import PasilloCharacter, { type PasilloCharacterName } from "@/components/PasilloCharacter";
import { products, productCategories, BRANDS } from "@/lib/shop";
import type { BrandKey } from "@/lib/types";

// El habitante de cada pasillo — aparece junto al título al filtrar por categoría.
const CATEGORY_CHARACTERS: Record<string, PasilloCharacterName> = {
  Frescos: "avocado",
  "Proteínas": "egg",
  Despensa: "jar",
  Bebidas: "coconut",
  "Líneas KORA": "bottle",
};

const BRAND_FILTERS: { label: string; value: string }[] = [
  { label: "Todas", value: "" },
  { label: "PULSE", value: "PULSE" },
  { label: "KORA Origen", value: "KORA_ORIGEN" },
  { label: "Mercado", value: "STANDARD" },
];

const SORTS: { value: string; label: string }[] = [
  { value: "destacados", label: "Destacados" },
  { value: "rating", label: "Mejor calificados" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nombre", label: "Nombre (A–Z)" },
];

interface SearchResultsProps {
  q: string;
  cat: string;
  marca: string;
  orden: string;
}

// Página de resultados — todo el estado vive en la URL (q, cat, marca, orden),
// como en cualquier e-commerce real: enlazable, compartible y con botón atrás.
export default function SearchResults({ q, cat, marca, orden }: SearchResultsProps) {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const categories = productCategories.filter((c) => c !== "Todo");

  const buildUrl = (next: Partial<SearchResultsProps>) => {
    const merged = { q, cat, marca, orden, ...next };
    const p = new URLSearchParams();
    if (merged.q) p.set("q", merged.q);
    if (merged.cat) p.set("cat", merged.cat);
    if (merged.marca) p.set("marca", merged.marca);
    if (merged.orden && merged.orden !== "destacados") p.set("orden", merged.orden);
    const s = p.toString();
    return `/tienda/buscar${s ? `?${s}` : ""}`;
  };

  // Base: solo búsqueda por texto — los conteos del sidebar se calculan sobre
  // esta lista para que reflejen los resultados actuales.
  const base = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        !needle ||
        [p.name, p.blurb, p.tagline, p.category].some((t) => t?.toLowerCase().includes(needle))
    );
  }, [q]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of base) m[p.category] = (m[p.category] || 0) + 1;
    return m;
  }, [base]);

  const filtered = useMemo(() => {
    let list = base.filter((p) => (!cat || p.category === cat) && (!marca || p.brand === marca));
    if (orden === "rating") list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (orden === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (orden === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (orden === "nombre") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "es"));
    return list;
  }, [base, cat, marca, orden]);

  const title = q
    ? `Resultados para “${q}”`
    : cat || (marca && BRANDS[marca as BrandKey]?.name) || "Toda la tienda";

  return (
    <div>
      {/* Miga de pan + encabezado de resultados */}
      <nav aria-label="Miga de pan" className="flex items-center gap-1.5 text-sm text-moss/55">
        <Link href="/tienda" className="font-medium transition-colors hover:text-moss">Tienda</Link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-moss/30" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span className="text-moss/40">Búsqueda</span>
      </nav>

      <div className="mt-3 flex items-center gap-3">
        <h1 className="text-2xl font-black tracking-tightest text-moss sm:text-3xl">{title}</h1>
        {cat && CATEGORY_CHARACTERS[cat] && (
          <span className="kora-bob h-14 w-12 flex-none sm:h-16 sm:w-14" aria-hidden="true">
            <PasilloCharacter name={CATEGORY_CHARACTERS[cat]} />
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-charcoal/55">
        <span className="font-bold text-moss">{filtered.length}</span> producto{filtered.length !== 1 ? "s" : ""}
        {cat && q ? ` en ${cat}` : ""}
        {marca ? ` · ${BRANDS[marca as BrandKey]?.name}` : ""}
      </p>

      <div ref={searchRef} className="mt-5 max-w-xl">
        <SearchBar defaultValue={q} />
      </div>

      <div className="mt-8 gap-8 lg:grid lg:grid-cols-[220px_1fr]">
        {/* Sidebar (desktop) — filtros sobre la URL */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-7">
            <FilterGroup title="Categorías">
              <SidebarLink href={buildUrl({ cat: "" })} active={!cat} count={base.length}>
                Todo
              </SidebarLink>
              {categories.map((c) => (
                <SidebarLink key={c} href={buildUrl({ cat: c })} active={cat === c} count={counts[c] || 0}>
                  {c}
                </SidebarLink>
              ))}
            </FilterGroup>
            <FilterGroup title="Marca">
              {BRAND_FILTERS.map((b) => (
                <SidebarLink key={b.value} href={buildUrl({ marca: b.value })} active={marca === b.value}>
                  {b.label}
                </SidebarLink>
              ))}
            </FilterGroup>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Chips de categoría (mobile) */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Chip href={buildUrl({ cat: "" })} active={!cat}>Todo</Chip>
            {categories.map((c) => (
              <Chip key={c} href={buildUrl({ cat: c })} active={cat === c}>{c}</Chip>
            ))}
          </div>

          {/* Chips de marca (mobile) */}
          <div className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {BRAND_FILTERS.map((b) => (
              <Chip key={b.value} href={buildUrl({ marca: b.value })} active={marca === b.value} small>
                {b.label}
              </Chip>
            ))}
          </div>

          {/* Toolbar — orden */}
          <div className="mb-5 flex items-center justify-end">
            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-charcoal/45 sm:inline">Ordenar:</span>
              <select
                value={orden}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => router.push(buildUrl({ orden: e.target.value }))}
                className="rounded-full border border-moss/15 bg-white px-3 py-2 text-sm font-medium text-moss outline-none focus:border-sprout"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${(i % 8) * 45}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-kora bg-white py-16 text-center ring-1 ring-moss/8">
              <p className="text-charcoal/55">
                No encontramos productos{q ? ` para “${q}”` : ""} con esos filtros.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {(cat || marca) && (
                  <Link href={buildUrl({ cat: "", marca: "" })} className="kora-cta-ghost">
                    Limpiar filtros
                  </Link>
                )}
                <Link href="/tienda" className="kora-cta">
                  Ver toda la tienda
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <FloatingSearch anchorRef={searchRef} defaultValue={q} />
      <FloatingCartBar />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">{title}</h3>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function SidebarLink({
  href,
  active,
  count,
  children,
}: {
  href: string;
  active?: boolean;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
        active ? "bg-moss/8 text-moss" : "text-moss/65 hover:bg-moss/5 hover:text-moss"
      }`}
    >
      <span>{children}</span>
      {count != null && <span className={`text-xs ${active ? "text-sprout-dark" : "text-charcoal/35"}`}>{count}</span>}
    </Link>
  );
}

function Chip({
  href,
  active,
  small,
  children,
}: {
  href: string;
  active?: boolean;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex-none rounded-full font-medium transition-all ${
        small ? "px-3.5 py-1.5 text-xs font-semibold" : "px-4 py-2 text-sm"
      } ${
        active
          ? small
            ? "bg-sprout text-white"
            : "bg-moss text-alabaster shadow-soft"
          : "bg-white text-moss/70 ring-1 ring-moss/10"
      }`}
    >
      {children}
    </Link>
  );
}
