"use client";

import Link from "next/link";
import Photo from "@/components/Photo";
import Stars from "@/components/Stars";
import { useCart } from "@/components/CartProvider";
import { BRANDS, cop, discountPct } from "@/lib/shop";
import { BrandBadge } from "@/components/Tag";
import type { Product } from "@/lib/types";

// Umbral de escasez — gatilla el aviso "quedan pocas unidades".
const LOW_STOCK = 12;

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem, setQty } = useCart();
  const inCart = items.find((i) => i.id === product.id);
  const qty = inCart?.qty || 0;
  const proprietary = BRANDS[product.brand]?.proprietary;
  const off = discountPct(product.compareAt, product.price);
  const lowStock = product.stock != null && product.stock <= LOW_STOCK;

  const add = () =>
    addItem(
      { id: product.id, name: product.name, price: product.price, brand: product.brand, unit: product.unit },
      1
    );

  // La hoja se espeja según el id — estable y alternada, como puesta a mano.
  const mirrored = [...product.id].reduce((n, c) => n + c.charCodeAt(0), 0) % 2 === 1;

  return (
    <article
      className={`group kora-leaf-card ${mirrored ? "kora-leaf-card-b" : ""} flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lift ${
        mirrored ? "hover:rotate-[0.4deg]" : "hover:-rotate-[0.4deg]"
      }`}
    >
      <Link href={`/tienda/${product.id}`} className="halo-light relative block" aria-label={`Ver ${product.name}`}>
        <Photo
          imageKey={product.imageKey}
          alt={product.name}
          rounded="rounded-none"
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Anclaje de precio — el descuento manda sobre cualquier otra señal */}
        {off > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-sprout px-2 py-0.5 text-[11px] font-black text-white shadow-soft">
            -{off}%
          </span>
        )}
        <span className="absolute left-3 top-3 flex flex-col items-start gap-1">
          {proprietary && <BrandBadge label={BRANDS[product.brand].name} />}
          {product.bestSeller && (
            <span className="rounded-full bg-moss px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide2 text-alabaster">
              Más vendido
            </span>
          )}
          {product.isNew && !product.bestSeller && (
            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide2 text-sprout-dark backdrop-blur-sm">
              Nuevo
            </span>
          )}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="kora-gallery-label">{product.category}</span>
        <Link href={`/tienda/${product.id}`}>
          <h3 className="text-sm font-bold leading-tight text-moss transition-colors group-hover:text-sprout-dark">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-charcoal/50">{product.unit}</p>

        {/* Prueba social — calificación y volumen de reseñas */}
        {product.rating && (
          <span className="mt-0.5 flex items-center gap-1.5">
            <Stars value={product.rating} size={12} />
            <span className="text-[11px] font-semibold text-moss">{product.rating}</span>
            {product.reviews && <span className="text-[11px] text-charcoal/40">({product.reviews})</span>}
          </span>
        )}

        {/* Escasez honesta — solo cuando de verdad queda poco */}
        {lowStock && (
          <p className="text-[11px] font-semibold text-[#8A6D3B]">¡Quedan {product.stock}!</p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <span className="flex flex-col leading-none">
            {off > 0 && (
              <span className="text-[11px] text-charcoal/40 line-through tabular-nums">{cop(product.compareAt!)}</span>
            )}
            <span className="text-base font-black tabular-nums text-moss">{cop(product.price)}</span>
          </span>

          {qty === 0 ? (
            <button onClick={add} className="kora-cta px-4 py-2 text-sm" aria-label={`Agregar ${product.name}`}>
              Agregar
            </button>
          ) : (
            <div className="flex items-center gap-1 rounded-full bg-sprout p-1 text-white">
              <button onClick={() => setQty(product.id, qty - 1)} aria-label="Restar" className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-sprout-dark">
                −
              </button>
              <span className="w-6 text-center text-sm font-bold tabular-nums">{qty}</span>
              <button onClick={() => setQty(product.id, qty + 1)} aria-label="Sumar" className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-sprout-dark">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
