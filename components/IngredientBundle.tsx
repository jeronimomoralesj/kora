"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { BRANDS, BUNDLE_DISCOUNT, cop } from "@/lib/data";
import { BrandBadge } from "@/components/Tag";
import type { CartItemInput, Ingredient, Recipe } from "@/lib/types";

// One-Click Ingredient Bundle — the core up-sell.
// Separates proprietary KORA lines from standard items, lets users uncheck what
// they already own, and adds the whole recipe at a bundled discount.
export default function IngredientBundle({ recipe }: { recipe: Recipe }) {
  // checked = "I want KORA to supply this". Default to true unless owned at home.
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(recipe.ingredients.map((i): [string, boolean] => [i.id, !i.owned]))
  );
  const [added, setAdded] = useState(false);
  const { addBundle } = useCart();

  const selected = recipe.ingredients.filter((i) => checked[i.id]);
  const proprietary = selected.filter((i) => BRANDS[i.brand].proprietary);
  const standard = selected.filter((i) => !BRANDS[i.brand].proprietary);

  const { subtotal, discount, total } = useMemo(() => {
    const sub = selected.reduce((n, i) => n + i.price, 0);
    const disc = Math.round(sub * BUNDLE_DISCOUNT);
    return { subtotal: sub, discount: disc, total: sub - disc };
  }, [selected]);

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  const addWhole = () => {
    if (selected.length === 0) return;
    addBundle(
      recipe.id,
      recipe.title,
      selected.map(
        (i): CartItemInput => ({
          id: i.id,
          name: i.name,
          price: i.price,
          brand: i.brand,
          unit: i.qty,
          recipe: recipe.title,
        })
      )
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="kora-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-moss/8 px-5 py-4">
        <div>
          <p className="kora-eyebrow">Bundle en un Clic</p>
          <h3 className="text-lg font-bold text-moss">Todo para esta receta</h3>
        </div>
        <span className="rounded-full bg-sprout/12 px-3 py-1.5 text-xs font-bold text-sprout-dark">
          −{Math.round(BUNDLE_DISCOUNT * 100)}% en bundle
        </span>
      </div>

      <div className="space-y-5 px-5 py-5">
        {proprietary.length + standard.length === 0 && (
          <p className="rounded-xl bg-alabaster p-4 text-center text-sm text-charcoal/60">
            Todos los ingredientes desmarcados — nada que agregar. Vuelve a marcar lo que necesitas de KORA.
          </p>
        )}

        {proprietary.length > 0 && (
          <Group title="Líneas Propias KORA" hint="PULSE · KORA Origen" accent>
            {proprietary.map((i) => (
              <IngredientRow key={i.id} item={i} checked={checked[i.id]} onToggle={() => toggle(i.id)} proprietary />
            ))}
          </Group>
        )}

        {standard.length > 0 && (
          <Group title="Mercado Fresco" hint="Despensa estándar">
            {standard.map((i) => (
              <IngredientRow key={i.id} item={i} checked={checked[i.id]} onToggle={() => toggle(i.id)} />
            ))}
          </Group>
        )}

        {/* Ítems desmarcados / que el usuario ya tiene, listados para volver a agregar */}
        {recipe.ingredients.some((i) => !checked[i.id]) && (
          <div className="rounded-xl bg-alabaster px-4 py-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
              Ya lo tengo en casa
            </p>
            <div className="flex flex-col gap-2">
              {recipe.ingredients
                .filter((i) => !checked[i.id])
                .map((i) => (
                  <button
                    key={i.id}
                    onClick={() => toggle(i.id)}
                    className="flex items-center justify-between gap-2 text-left text-sm text-charcoal/45 transition-colors hover:text-moss"
                  >
                    <span className="line-through decoration-charcoal/25">{i.name}</span>
                    <span className="text-xs font-medium text-sprout-dark">+ Volver a agregar</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky-ish bundle summary */}
      <div className="border-t border-moss/8 bg-alabaster/60 px-5 py-4">
        <div className="mb-3 space-y-1.5 text-sm">
          <Row label={`Subtotal · ${selected.length} producto${selected.length !== 1 ? "s" : ""}`} value={cop(subtotal)} muted />
          <Row label="Descuento de bundle" value={`− ${cop(discount)}`} accent />
          <Row label="Total de la receta" value={cop(total)} bold />
        </div>
        <button onClick={addWhole} disabled={selected.length === 0} className="kora-cta w-full text-base">
          {added ? (
            <>
              <CheckIcon /> Agregado a la canasta
            </>
          ) : (
            <>Agregar receta completa · {cop(total)}</>
          )}
        </button>
        <p className="mt-2 text-center text-[11px] text-charcoal/45">
          Disponibilidad verificada en tu nodo más cercano. Desmarca lo que ya tengas.
        </p>
      </div>
    </div>
  );
}

function Group({
  title,
  hint,
  accent,
  children,
}: {
  title: string;
  hint: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h4 className={`text-sm font-bold ${accent ? "text-sprout-dark" : "text-moss"}`}>{title}</h4>
        <span className="text-[11px] font-medium uppercase tracking-wide2 text-charcoal/40">{hint}</span>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function IngredientRow({
  item,
  checked,
  onToggle,
  proprietary,
}: {
  item: Ingredient;
  checked: boolean;
  onToggle: () => void;
  proprietary?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
        proprietary ? "border-sprout/25 bg-sprout/[0.04]" : "border-moss/10 bg-white"
      }`}
    >
      <button
        onClick={onToggle}
        role="checkbox"
        aria-checked={checked}
        aria-label={`Incluir ${item.name}`}
        className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition-colors ${
          checked ? "border-sprout bg-sprout text-white" : "border-moss/25 bg-transparent"
        }`}
      >
        {checked && <CheckIcon small />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-moss">{item.name}</p>
          {proprietary && <BrandBadge label={BRANDS[item.brand].name} />}
        </div>
        <p className="text-xs text-charcoal/50">{item.qty}</p>
      </div>
      <p className="flex-none text-sm font-semibold tabular-nums text-moss">{cop(item.price)}</p>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  accent,
  bold,
}: {
  label: string;
  value: string;
  muted?: boolean;
  accent?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${muted ? "text-charcoal/55" : ""} ${accent ? "text-sprout-dark" : ""} ${bold ? "font-bold text-moss" : ""}`}>
        {label}
      </span>
      <span className={`tabular-nums ${accent ? "font-semibold text-sprout-dark" : ""} ${bold ? "text-base font-bold text-moss" : "text-charcoal/70"}`}>
        {value}
      </span>
    </div>
  );
}

function CheckIcon({ small }: { small?: boolean }) {
  const s = small ? 12 : 16;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
