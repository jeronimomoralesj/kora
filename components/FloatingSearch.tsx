"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useCart } from "@/components/CartProvider";

// Buscador flotante — aparece abajo cuando el buscador principal (anchorRef)
// queda por encima del viewport. Al enfocarlo salta arriba (bajo el nav) para
// que el teclado del celular no lo tape y siempre veas lo que escribes.
interface FloatingSearchProps {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  defaultValue?: string;
}

export default function FloatingSearch({ anchorRef, defaultValue = "" }: FloatingSearchProps) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [anchorRef]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-x-0 z-40 flex justify-center px-4 ${
        focused ? "top-20" : count > 0 ? "bottom-20" : "bottom-4"
      }`}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        // Vuelve abajo solo cuando el foco sale del buscador por completo
        // (no al pasar del input al botón "Buscar").
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      {/* Importante: el input NO se re-monta al reubicarse — conserva el foco,
          el teclado y lo escrito mientras salta de abajo hacia arriba. */}
      <div className="w-full max-w-md animate-fade-up rounded-full shadow-lift">
        <SearchBar defaultValue={defaultValue} />
      </div>
    </div>
  );
}
