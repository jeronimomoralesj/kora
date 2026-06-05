"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import FulfillmentSelector from "@/components/FulfillmentSelector";
import { BRANDS, cop, deliveryWindows } from "@/lib/data";
import { BrandBadge } from "@/components/Tag";
import SproutCelebration from "@/components/SproutCelebration";
import EmptyBasketScene from "@/components/EmptyBasketScene";
import type { CartItem } from "@/lib/types";

export default function CheckoutPage() {
  const { items, count, subtotal, discount, total, setQty, removeItem, clear } = useCart();
  const [method, setMethod] = useState("pickup");
  const [placed, setPlaced] = useState(false);

  const deliveryFee = method === "delivery" ? deliveryWindows[0].price : 0;
  const grandTotal = total + deliveryFee;

  if (placed) return <OrderConfirmed method={method} onReset={() => { clear(); setPlaced(false); }} />;

  if (count === 0) return <EmptyBasket />;

  return (
    <div className="kora-shell py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <p className="kora-eyebrow">Canasta</p>
          <h1 className="text-3xl font-black tracking-tightest text-moss sm:text-4xl">Finalizar compra</h1>
        </div>
        <button onClick={clear} className="text-sm font-medium text-charcoal/45 transition-colors hover:text-moss">
          Vaciar canasta
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Productos */}
        <div className="space-y-6 lg:col-span-7">
          <div className="kora-card overflow-hidden">
            <div className="border-b border-moss/8 px-5 py-4">
              <h3 className="font-bold text-moss">
                {count} producto{count !== 1 ? "s" : ""} en la canasta
              </h3>
            </div>
            <ul className="divide-y divide-moss/8">
              {items.map((i: CartItem) => {
                const proprietary = BRANDS[i.brand]?.proprietary;
                return (
                  <li key={i.id} className="flex flex-wrap items-center gap-x-3 gap-y-2.5 px-4 py-4 sm:px-5">
                    <div className="min-w-0 flex-1 basis-44">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-semibold text-moss">{i.name}</p>
                        {proprietary && <BrandBadge label={BRANDS[i.brand].name} />}
                        {i.bundleId && (
                          <span className="rounded-full bg-sprout/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide2 text-sprout-dark">
                            Bundle
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-charcoal/50">
                        {i.unit || i.qty || ""} {i.recipe ? `· ${i.recipe}` : ""}
                      </p>
                      <p className="mt-1 text-sm font-semibold tabular-nums text-charcoal/70">{cop(i.price)}</p>
                    </div>

                    <div className="ml-auto flex items-center gap-2.5">
                      <div className="flex items-center gap-1 rounded-full bg-alabaster p-1 ring-1 ring-moss/10">
                        <Stepper onClick={() => setQty(i.id, i.qty - 1)} aria="Restar">−</Stepper>
                        <span className="w-7 text-center text-sm font-bold tabular-nums text-moss">{i.qty}</span>
                        <Stepper onClick={() => setQty(i.id, i.qty + 1)} aria="Sumar">+</Stepper>
                      </div>

                      <button onClick={() => removeItem(i.id)} aria-label="Quitar" className="text-charcoal/30 transition-colors hover:text-moss">
                        <TrashIcon />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <FulfillmentSelector onChange={setMethod} />
        </div>

        {/* Resumen */}
        <div className="lg:col-span-5">
          <div className="kora-card sticky top-24 overflow-hidden">
            <div className="border-b border-moss/8 px-5 py-4">
              <h3 className="font-bold text-moss">Resumen del pedido</h3>
            </div>
            <div className="space-y-2.5 px-5 py-5 text-sm">
              <Row label="Subtotal" value={cop(subtotal)} />
              {discount > 0 && <Row label="Descuento de bundle" value={`− ${cop(discount)}`} accent />}
              <Row label={method === "delivery" ? "Domicilio (Express)" : "Recogida"} value={deliveryFee ? cop(deliveryFee) : "Gratis"} />
              <div className="my-3 border-t border-dashed border-moss/15" />
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-moss">Total</span>
                <span className="text-xl font-black tabular-nums text-moss">{cop(grandTotal)}</span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button onClick={() => setPlaced(true)} className="kora-cta w-full text-base">
                Confirmar pedido de {method === "delivery" ? "domicilio" : "recogida"}
              </button>
              <p className="mt-2 text-center text-[11px] text-charcoal/45">
                Prototipo · no se procesa ningún pago real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={accent ? "text-sprout-dark" : "text-charcoal/60"}>{label}</span>
      <span className={`tabular-nums ${accent ? "font-semibold text-sprout-dark" : "text-charcoal/80"}`}>{value}</span>
    </div>
  );
}

function Stepper({ children, onClick, aria }: { children: React.ReactNode; onClick: () => void; aria: string }) {
  return (
    <button onClick={onClick} aria-label={aria} className="flex h-7 w-7 items-center justify-center rounded-full text-moss transition-colors hover:bg-moss hover:text-alabaster">
      {children}
    </button>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
    </svg>
  );
}

function EmptyBasket() {
  return (
    <div className="kora-shell flex flex-col items-center justify-center py-28 text-center">
      {/* El tomate aburrido espera junto a la canasta vacía */}
      <EmptyBasketScene />
      <h1 className="mt-4 text-2xl font-black tracking-tight text-moss">Tu canasta está vacía</h1>
      <p className="mt-2 max-w-sm text-charcoal/55">
        Empieza por los frescos del día y las ofertas de la semana — o arma una
        receta completa en un toque.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/tienda" className="kora-cta">Ir a la tienda</Link>
        <Link href="/recipes" className="kora-cta-ghost">Ver recetas</Link>
      </div>
    </div>
  );
}

function OrderConfirmed({ method, onReset }: { method: string; onReset: () => void }) {
  return (
    <div className="kora-shell flex flex-col items-center justify-center py-24 text-center">
      {/* El brote crece, la zanahoria saluda — tu pedido ya está sembrado */}
      <SproutCelebration />
      <h1 className="mt-4 text-3xl font-black tracking-tightest text-moss">Pedido confirmado</h1>
      <p className="mt-2 max-w-sm text-charcoal/60">
        {method === "delivery"
          ? "Tu mensajero está en camino. Síguelo desde tu KORA Pass — ETA 25–35 min."
          : "Lo estamos empacando. Muestra tu KORA Pass en el mostrador — listo para tu camino a casa en 10 minutos."}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/account" className="kora-cta">Ver en KORA Pass</Link>
        <button onClick={onReset} className="kora-cta-ghost">Nuevo pedido</button>
      </div>
    </div>
  );
}
