"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";

// Billetera del miembro — tarjetas de pago vinculadas a la cuenta (dummy).
// Agregar, eliminar y elegir la predeterminada; persiste en localStorage.
const STORAGE_KEY = "kora-linked-cards";

type CardBrand = "Visa" | "Mastercard" | "Amex" | "Tarjeta";

interface LinkedCard {
  id: string;
  brand: CardBrand;
  last4: string;
  holder: string;
  exp: string;
}

interface WalletState {
  defaultId: string;
  cards: LinkedCard[];
}

const DEFAULT_STATE: WalletState = {
  defaultId: "c-1",
  cards: [
    { id: "c-1", brand: "Visa", last4: "4242", holder: "Valentina Ríos", exp: "08/27" },
    { id: "c-2", brand: "Mastercard", last4: "8810", holder: "Valentina Ríos", exp: "01/26" },
  ],
};

const brandFor = (number: string): CardBrand => {
  if (number.startsWith("4")) return "Visa";
  if (number.startsWith("5")) return "Mastercard";
  if (number.startsWith("34") || number.startsWith("37")) return "Amex";
  return "Tarjeta";
};

const BRAND_SHORT: Record<CardBrand, string> = { Visa: "VISA", Mastercard: "MC", Amex: "AMEX", Tarjeta: "CARD" };

export default function CardsManager() {
  const [state, setState] = useState<WalletState>(DEFAULT_STATE);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ number: "", holder: "", exp: "" });
  const [error, setError] = useState("");

  // Hidratar desde localStorage después del primer render (evita mismatch SSR).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as WalletState);
    } catch {}
  }, []);

  const persist = (next: WalletState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const setDefault = (id: string) => persist({ ...state, defaultId: id });

  const removeCard = (id: string) => {
    const cards = state.cards.filter((c) => c.id !== id);
    persist({
      cards,
      defaultId: state.defaultId === id ? cards[0]?.id || "" : state.defaultId,
    });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const digits = form.number.replace(/\s/g, "");
    if (!/^\d{15,16}$/.test(digits)) return setError("Revisa el número — deben ser 15 o 16 dígitos.");
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) return setError("Vencimiento en formato MM/AA.");
    if (!form.holder.trim()) return setError("Falta el nombre como aparece en la tarjeta.");

    const card: LinkedCard = {
      id: `c-${Date.now().toString(36)}`,
      brand: brandFor(digits),
      last4: digits.slice(-4),
      holder: form.holder.trim(),
      exp: form.exp,
    };
    persist({
      cards: [...state.cards, card],
      defaultId: state.defaultId || card.id,
    });
    setForm({ number: "", holder: "", exp: "" });
    setError("");
    setAdding(false);
  };

  // Agrupa el número en bloques de 4 mientras se escribe.
  const onNumber = (v: string) =>
    setForm({ ...form, number: v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ") });

  return (
    <div className="kora-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-moss/8 px-5 py-4">
        <div>
          <p className="kora-eyebrow">Billetera</p>
          <h3 className="text-lg font-bold text-moss">
            Tarjetas vinculadas
            <span className="ml-2 align-middle text-sm font-semibold text-charcoal/40">
              {state.cards.length}
            </span>
          </h3>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex-none rounded-full bg-sprout/12 px-3.5 py-2 text-xs font-bold text-sprout-dark transition-colors hover:bg-sprout/20"
          >
            + Agregar
          </button>
        )}
      </div>

      {state.cards.length > 0 ? (
        <ul className="divide-y divide-moss/8">
          {state.cards.map((c) => {
            const isDefault = c.id === state.defaultId;
            return (
              <li key={c.id} className="flex items-center gap-3 px-5 py-4">
                <span className="flex h-9 w-12 flex-none items-center justify-center rounded-md bg-steel text-[9px] font-black tracking-wide2 text-white">
                  {BRAND_SHORT[c.brand]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-moss">
                    {c.brand} •••• {c.last4}
                    {isDefault && (
                      <span className="rounded-full bg-sprout/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide2 text-sprout-dark">
                        Predeterminada
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-charcoal/50">
                    {c.holder} · Vence {c.exp}
                  </p>
                  {!isDefault && (
                    <button
                      onClick={() => setDefault(c.id)}
                      className="mt-1 text-xs font-semibold text-sprout-dark transition-colors hover:text-sprout"
                    >
                      Usar como predeterminada
                    </button>
                  )}
                </div>
                <button
                  onClick={() => removeCard(c.id)}
                  aria-label={`Eliminar ${c.brand} terminada en ${c.last4}`}
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-charcoal/35 transition-colors hover:bg-moss/5 hover:text-moss"
                >
                  <TrashIcon />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        !adding && (
          <p className="px-5 py-8 text-center text-sm text-charcoal/50">
            No tienes tarjetas vinculadas. Agrega una para pagar en un toque.
          </p>
        )
      )}

      {adding && (
        <form onSubmit={submit} className="space-y-3 border-t border-moss/8 bg-alabaster/60 px-5 py-5">
          <Field label="Número de tarjeta">
            <input
              value={form.number}
              onChange={(e) => onNumber(e.target.value)}
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              className="w-full rounded-xl border border-moss/15 bg-white px-4 py-2.5 font-mono text-sm text-moss outline-none placeholder:text-charcoal/30 focus:border-sprout"
            />
          </Field>
          <div className="grid grid-cols-[1fr_92px] gap-3">
            <Field label="Nombre en la tarjeta">
              <input
                value={form.holder}
                onChange={(e) => setForm({ ...form, holder: e.target.value })}
                placeholder="Como aparece impreso"
                className="w-full rounded-xl border border-moss/15 bg-white px-4 py-2.5 text-sm text-moss outline-none placeholder:text-charcoal/30 focus:border-sprout"
              />
            </Field>
            <Field label="Vence">
              <input
                value={form.exp}
                onChange={(e) =>
                  setForm({
                    ...form,
                    exp: e.target.value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/"),
                  })
                }
                inputMode="numeric"
                placeholder="MM/AA"
                className="w-full rounded-xl border border-moss/15 bg-white px-4 py-2.5 font-mono text-sm text-moss outline-none placeholder:text-charcoal/30 focus:border-sprout"
              />
            </Field>
          </div>
          {error && <p className="text-xs font-semibold text-[#8A6D3B]">{error}</p>}
          <div className="flex items-center gap-3 pt-1">
            <button type="submit" className="kora-cta flex-1 py-2.5 text-sm">
              Vincular tarjeta
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setError("");
              }}
              className="text-sm font-semibold text-charcoal/50 transition-colors hover:text-moss"
            >
              Cancelar
            </button>
          </div>
          <p className="text-[11px] text-charcoal/40">
            Demo — los datos se guardan solo en este navegador, no se envían a ningún servidor.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
        {label}
      </span>
      {children}
    </label>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
    </svg>
  );
}
