"use client";

import { createContext, useContext, useMemo, useReducer, useCallback } from "react";
import type { ReactNode } from "react";
import { BUNDLE_DISCOUNT } from "@/lib/data";
import type { CartItem, CartItemInput } from "@/lib/types";

interface CartState {
  items: Record<string, CartItem>;
  bundles: Record<string, string>;
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItemInput & { count?: number } }
  | { type: "ADD_BUNDLE"; bundleId: string; title: string; items: CartItemInput[] }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "CLEAR" };

export interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  discount: number;
  total: number;
  bundles: Record<string, string>;
  addItem(item: CartItemInput, count?: number): void;
  addBundle(bundleId: string, title: string, items: CartItemInput[]): void;
  setQty(id: string, qty: number): void;
  removeItem(id: string): void;
  clear(): void;
}

const CartContext = createContext<CartContextValue | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item } = action;
      const existing = state.items[item.id];
      const qty = (existing?.qty || 0) + (item.count || 1);
      return {
        ...state,
        items: { ...state.items, [item.id]: { ...item, qty } },
      };
    }
    case "ADD_BUNDLE": {
      // Adds many recipe ingredients at once and flags them as a discounted bundle.
      const next = { ...state.items };
      for (const item of action.items) {
        const existing = next[item.id];
        next[item.id] = {
          ...item,
          qty: (existing?.qty || 0) + 1,
          bundleId: action.bundleId,
        };
      }
      return { ...state, items: next, bundles: { ...state.bundles, [action.bundleId]: action.title } };
    }
    case "SET_QTY": {
      const next = { ...state.items };
      if (action.qty <= 0) delete next[action.id];
      else next[action.id] = { ...next[action.id], qty: action.qty };
      return { ...state, items: next };
    }
    case "REMOVE_ITEM": {
      const next = { ...state.items };
      delete next[action.id];
      return { ...state, items: next };
    }
    case "CLEAR":
      return { items: {}, bundles: {} };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: {}, bundles: {} });

  const addItem = useCallback((item: CartItemInput, count = 1) => {
    dispatch({ type: "ADD_ITEM", item: { ...item, count } });
  }, []);

  const addBundle = useCallback((bundleId: string, title: string, items: CartItemInput[]) => {
    dispatch({ type: "ADD_BUNDLE", bundleId, title, items });
  }, []);

  const setQty = useCallback((id: string, qty: number) => dispatch({ type: "SET_QTY", id, qty }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: "REMOVE_ITEM", id }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const derived = useMemo(() => {
    const items = Object.values(state.items);
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);

    // Bundle discount applies to items tagged with a bundleId.
    const bundledSubtotal = items
      .filter((i) => i.bundleId)
      .reduce((n, i) => n + i.price * i.qty, 0);
    const discount = Math.round(bundledSubtotal * BUNDLE_DISCOUNT);

    return { items, count, subtotal, discount, total: subtotal - discount };
  }, [state.items]);

  const value = useMemo<CartContextValue>(
    () => ({ ...state, ...derived, addItem, addBundle, setQty, removeItem, clear }),
    [state, derived, addItem, addBundle, setQty, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
