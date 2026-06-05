"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import ProductRail from "@/components/ProductRail";
import SearchBar from "@/components/SearchBar";
import FloatingSearch from "@/components/FloatingSearch";
import FloatingCartBar from "@/components/FloatingCartBar";
import { productCategories } from "@/lib/shop";
import type { BrandKey, Product } from "@/lib/types";

const BRAND_LINKS: { label: string; value: BrandKey }[] = [
  { label: "PULSE", value: "PULSE" },
  { label: "KORA Origen", value: "KORA_ORIGEN" },
  { label: "Mercado", value: "STANDARD" },
];

// Portada de la tienda — pasillos por categoría. Buscar o filtrar navega a la
// página de resultados (/tienda/buscar), como en cualquier e-commerce real.
export default function TiendaGrid({ products }: { products: Product[] }) {
  const searchRef = useRef<HTMLDivElement>(null);
  const aisles = productCategories.filter((c) => c !== "Todo");

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of products) m[p.category] = (m[p.category] || 0) + 1;
    return m;
  }, [products]);

  // Cabeceras de góndola — ofertas y más vendidos primero, como en un super real.
  const deals = useMemo(() => products.filter((p) => p.compareAt && p.compareAt > p.price), [products]);
  const top = useMemo(() => products.filter((p) => p.bestSeller), [products]);

  const catUrl = (c: string) => `/tienda/buscar?cat=${encodeURIComponent(c)}`;
  const brandUrl = (b: string) => `/tienda/buscar?marca=${encodeURIComponent(b)}`;

  return (
    <div>
      {/* Buscador */}
      <div ref={searchRef} className="mt-6 max-w-xl">
        <SearchBar />
      </div>

      <div className="mt-8 gap-8 lg:grid lg:grid-cols-[220px_1fr]">
        {/* Sidebar (desktop) — como un super real */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-7">
            <FilterGroup title="Categorías">
              {aisles.map((c) => (
                <SidebarLink key={c} href={catUrl(c)} count={counts[c]}>
                  {c}
                </SidebarLink>
              ))}
            </FilterGroup>
            <FilterGroup title="Marca">
              {BRAND_LINKS.map((b) => (
                <SidebarLink key={b.value} href={brandUrl(b.value)}>
                  {b.label}
                </SidebarLink>
              ))}
            </FilterGroup>
            <div className="rounded-kora bg-moss p-4 text-alabaster">
              <p className="kora-eyebrow text-sprout-light">Entrega</p>
              <p className="mt-1 text-sm font-semibold">Recoge en 10 min</p>
              <p className="mt-0.5 text-xs text-alabaster/65">o domicilio local el mismo día.</p>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Chips de categoría (mobile) */}
          <div className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {aisles.map((c) => (
              <Link
                key={c}
                href={catUrl(c)}
                className="flex-none rounded-full bg-white px-4 py-2 text-sm font-medium text-moss/70 ring-1 ring-moss/10 transition-all"
              >
                {c}
              </Link>
            ))}
          </div>

          {/* Pasillos */}
          <div className="space-y-12">
            {/* Cabeceras de góndola — el "volante" de ofertas y los favoritos */}
            {deals.length > 0 && (
              <ProductRail eyebrow="Solo esta semana" title="Ofertas de la semana" items={deals} />
            )}
            {top.length > 0 && (
              <ProductRail eyebrow="Lo que más se lleva la gente" title="Más vendidos" items={top} />
            )}

            {aisles.map((c) => {
              const items = products.filter((p) => p.category === c);
              if (!items.length) return null;
              return <ProductRail key={c} title={c} items={items} seeAllHref={catUrl(c)} />;
            })}
          </div>
        </div>
      </div>

      <FloatingSearch anchorRef={searchRef} />
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
  count,
  children,
}: {
  href: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-moss/65 transition-colors hover:bg-moss/5 hover:text-moss"
    >
      <span>{children}</span>
      {count != null && <span className="text-xs text-charcoal/35">{count}</span>}
    </Link>
  );
}
