"use client";

import { useState } from "react";
import { stores, deliveryWindows, cop } from "@/lib/data";

type FulfillmentMethod = "pickup" | "delivery";

const TABS: [id: FulfillmentMethod, label: string, sub: string][] = [
  ["pickup", "Recogida en Tienda", "Click & Collect"],
  ["delivery", "Domicilio Rápido", "Mensajero local"],
];

// Smart Fulfillment Selector — the dual-tab Buy vs Pick Up switcher.
export default function FulfillmentSelector({
  onChange,
}: {
  onChange?: (method: FulfillmentMethod) => void;
}) {
  const [tab, setTab] = useState<FulfillmentMethod>("pickup");
  const [storeId, setStoreId] = useState(stores[0].id);
  const [slot, setSlot] = useState(stores[0].slots[0]);
  const [window, setWindow] = useState<string>(deliveryWindows[0].id);
  const [address, setAddress] = useState("");

  const store = stores.find((s) => s.id === storeId)!;

  const select = (next: FulfillmentMethod) => {
    setTab(next);
    onChange?.(next);
  };

  return (
    <div className="kora-card overflow-hidden">
      <div className="border-b border-moss/8 px-5 pt-5">
        <p className="kora-eyebrow">Entrega inteligente</p>
        <h3 className="mt-1 text-lg font-bold text-moss">¿Cómo lo quieres?</h3>

        {/* Dual-tab switcher */}
        <div className="relative mt-4 grid grid-cols-2 rounded-full bg-alabaster p-1 ring-1 ring-moss/10">
          <span
            className={`absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-moss shadow-soft transition-transform duration-300 ${
              tab === "delivery" ? "translate-x-[calc(100%+0.25rem)]" : "translate-x-1"
            }`}
            style={{ left: 0 }}
            aria-hidden
          />
          {TABS.map(([id, label, sub]) => (
            <button
              key={id}
              onClick={() => select(id)}
              className={`relative z-10 flex flex-col items-center rounded-full px-2 py-2.5 text-center text-[13px] font-semibold leading-tight transition-colors sm:text-sm ${
                tab === id ? "text-alabaster" : "text-moss/60"
              }`}
            >
              {label}
              <span className={`text-[10px] font-medium ${tab === id ? "text-alabaster/60" : "text-moss/40"}`}>{sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-5">
        {tab === "pickup" ? (
          <div className="space-y-5 animate-fade-up">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
                Nodo más cercano
              </p>
              <div className="grid gap-2">
                {stores.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setStoreId(s.id);
                      setSlot(s.slots[0]);
                    }}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                      storeId === s.id ? "border-sprout bg-sprout/[0.05]" : "border-moss/12 hover:border-moss/25"
                    }`}
                  >
                    <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${storeId === s.id ? "border-sprout bg-sprout" : "border-moss/25"}`}>
                      {storeId === s.id && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
                        <span className="font-semibold text-moss">{s.name}</span>
                        <span className="text-xs font-semibold text-sprout-dark">{s.hours}</span>
                      </span>
                      <span className="block text-xs text-charcoal/50">{s.address}</span>
                      <span className="mt-1 block text-[11px] italic text-moss/60">“{s.note}”</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
                Hora de recogida
              </p>
              <div className="flex flex-wrap gap-2">
                {store.slots.map((sl) => (
                  <button
                    key={sl}
                    onClick={() => setSlot(sl)}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      slot === sl ? "bg-moss text-alabaster" : "bg-alabaster text-moss/70 ring-1 ring-moss/12 hover:ring-moss/25"
                    }`}
                  >
                    {sl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-sprout/[0.06] px-4 py-3 text-sm text-sprout-dark">
              <BoltIcon />
              <span className="font-medium">
                {slot.startsWith("Listo") ? slot : `Programado · ${slot}`} en {store.name}.
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-up">
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
                Dirección de entrega
              </label>
              <input
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                placeholder="Cra. 7 #70-21, Apto 402"
                className="w-full rounded-xl border border-moss/15 bg-alabaster px-4 py-3 text-sm text-moss outline-none transition-colors placeholder:text-charcoal/35 focus:border-sprout focus:ring-2 focus:ring-sprout/20"
              />
              <p className="mt-1.5 text-[11px] text-charcoal/45">
                Entregamos en Chapinero, Teusaquillo y Quinta Camacho.
              </p>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
                Ventana de entrega
              </p>
              <div className="grid gap-2">
                {deliveryWindows.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWindow(w.id)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      window === w.id ? "border-sprout bg-sprout/[0.05]" : "border-moss/12 hover:border-moss/25"
                    }`}
                  >
                    <span className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${window === w.id ? "border-sprout bg-sprout" : "border-moss/25"}`}>
                      {window === w.id && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                    <span className="flex-1">
                      <span className="font-semibold text-moss">{w.label}</span>
                      <span className="block text-xs text-charcoal/50">{w.eta}</span>
                    </span>
                    <span className="text-sm font-semibold text-moss">{cop(w.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}
