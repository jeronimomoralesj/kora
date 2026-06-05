"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { useCart } from "@/components/CartProvider";
import { cop, pointsFor, discountPct } from "@/lib/shop";
import type { Product } from "@/lib/types";

// Umbral de escasez compartido con la grilla de tienda.
const LOW_STOCK = 12;

type TrustIconName = "bolt" | "truck" | "shield";

// Caja de compra del detalle de producto — el momento de conversión.
// Anclaje de precio, ahorro explícito, escasez honesta, puntos KORA Pass,
// CTA único y barra fija en mobile para que comprar nunca quede lejos del pulgar.
export default function ProductBuyBox({ product }: { product: Product }) {
  const { items, addItem, setQty } = useCart();
  const inCart = items.find((i) => i.id === product.id);
  const cartQty = inCart?.qty || 0;
  const [qty, setLocalQty] = useState(1);

  const off = discountPct(product.compareAt, product.price);
  const savings = off > 0 ? product.compareAt! - product.price : 0;
  const lowStock = product.stock != null && product.stock <= LOW_STOCK;
  const points = pointsFor(product.price);

  const add = () => {
    addItem(
      { id: product.id, name: product.name, price: product.price, brand: product.brand, unit: product.unit },
      qty
    );
    setLocalQty(1);
  };

  return (
    <>
      <div className="kora-card mt-6 p-5 sm:p-6">
        {/* Precio con anclaje — el ahorro se dice en pesos, no solo en % */}
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <span className="text-3xl font-black tabular-nums tracking-tightest text-moss">{cop(product.price)}</span>
          {off > 0 && (
            <>
              <span className="pb-1 text-sm text-charcoal/40 line-through tabular-nums">{cop(product.compareAt!)}</span>
              <span className="mb-1 rounded-full bg-sprout/12 px-2.5 py-1 text-xs font-bold text-sprout-dark">
                Ahorras {cop(savings)} (-{off}%)
              </span>
            </>
          )}
        </div>
        <p className="mt-1 text-sm text-charcoal/50">
          {product.unit} · <span className="font-semibold text-sprout-dark">+{points} pts KORA Pass</span>
        </p>

        {/* Escasez — solo aparece cuando es real */}
        {lowStock && (
          <div className="mt-4">
            <p className="text-[13px] font-bold text-[#8A6D3B]">¡Quedan solo {product.stock} unidades!</p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-moss/8">
              <div
                className="h-full rounded-full bg-[#C9B68A]"
                style={{ width: `${Math.max(10, Math.min(45, product.stock! * 3))}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA — antes de agregar: selector + botón. Después: control de canasta. */}
        {cartQty === 0 ? (
          <div className="mt-5 flex items-stretch gap-3">
            <div className="flex flex-none items-center gap-1 rounded-full border border-moss/15 bg-white p-1">
              <button
                onClick={() => setLocalQty(Math.max(1, qty - 1))}
                aria-label="Restar"
                className="flex h-9 w-9 items-center justify-center rounded-full text-moss transition-colors hover:bg-moss/5"
              >
                −
              </button>
              <span className="w-7 text-center text-sm font-bold tabular-nums text-moss">{qty}</span>
              <button
                onClick={() => setLocalQty(qty + 1)}
                aria-label="Sumar"
                className="flex h-9 w-9 items-center justify-center rounded-full text-moss transition-colors hover:bg-moss/5"
              >
                +
              </button>
            </div>
            <button onClick={add} className="kora-cta flex-1 justify-between px-5">
              <span>Agregar a la canasta</span>
              <span className="tabular-nums">{cop(product.price * qty)}</span>
            </button>
          </div>
        ) : (
          <div className="mt-5 flex items-stretch gap-3">
            <div className="flex flex-none items-center gap-1 rounded-full bg-sprout p-1 text-white">
              <button
                onClick={() => setQty(product.id, cartQty - 1)}
                aria-label="Restar"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sprout-dark"
              >
                −
              </button>
              <span className="w-7 text-center text-sm font-bold tabular-nums">{cartQty}</span>
              <button
                onClick={() => setQty(product.id, cartQty + 1)}
                aria-label="Sumar"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sprout-dark"
              >
                +
              </button>
            </div>
            <Link href="/checkout" className="kora-cta flex-1 justify-between px-5">
              <span>En tu canasta · Ir a pagar</span>
              <span className="tabular-nums">{cop(product.price * cartQty)}</span>
            </Link>
          </div>
        )}

        {/* Señales de confianza — quitan las últimas dudas junto al CTA */}
        <ul className="mt-5 space-y-2 border-t kora-hairline pt-4">
          <TrustRow icon="bolt">Recógelo listo en <strong>10 minutos</strong> en tu nodo KORA</TrustRow>
          <TrustRow icon="truck">Domicilio local el <strong>mismo día</strong></TrustRow>
          <TrustRow icon="shield">Frescura garantizada — <strong>te lo cambiamos</strong> si no llega perfecto</TrustRow>
        </ul>
      </div>

      {/* Barra de compra fija en mobile — el CTA siempre a un pulgar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-moss/10 bg-alabaster/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <span className="flex min-w-0 flex-col leading-tight">
            {off > 0 && <span className="text-[10px] text-charcoal/40 line-through tabular-nums">{cop(product.compareAt!)}</span>}
            <span className="text-lg font-black tabular-nums text-moss">{cop(product.price)}</span>
          </span>
          {cartQty === 0 ? (
            <button onClick={add} className="kora-cta flex-1">
              Agregar a la canasta
            </button>
          ) : (
            <>
              <div className="flex flex-none items-center gap-1 rounded-full bg-sprout p-1 text-white">
                <button onClick={() => setQty(product.id, cartQty - 1)} aria-label="Restar" className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-sprout-dark">
                  −
                </button>
                <span className="w-6 text-center text-sm font-bold tabular-nums">{cartQty}</span>
                <button onClick={() => setQty(product.id, cartQty + 1)} aria-label="Sumar" className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-sprout-dark">
                  +
                </button>
              </div>
              <Link href="/checkout" className="kora-cta flex-1 px-4">
                Ir a pagar
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function TrustRow({ icon, children }: { icon: TrustIconName; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 text-[13px] text-charcoal/65 [&_strong]:font-semibold [&_strong]:text-moss">
      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sprout/12 text-sprout-dark">
        <TrustIcon name={icon} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function TrustIcon({ name }: { name: TrustIconName }) {
  const paths: Record<TrustIconName, ReactNode> = {
    bolt: <path d="M13 2 4.5 13H11l-1 9 8.5-11H13l1-9Z" />,
    truck: (
      <>
        <path d="M1 7h14v10H1zM15 11h4l3 3v3h-7z" />
        <circle cx="6" cy="19" r="1.6" />
        <circle cx="18" cy="19" r="1.6" />
      </>
    ),
    shield: <path d="M12 2 4 5.5V11c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5.5L12 2ZM8.5 12l2.5 2.5L16 9.5" />,
  };
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
