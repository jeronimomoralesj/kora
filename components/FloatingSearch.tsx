"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useCart } from "@/components/CartProvider";

// Buscador flotante — aparece abajo cuando el buscador principal (anchorRef)
// queda por encima del viewport. Se acomoda sobre la barra de canasta si hay
// productos agregados.
interface FloatingSearchProps {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  defaultValue?: string;
}

export default function FloatingSearch({ anchorRef, defaultValue = "" }: FloatingSearchProps) {
  const [show, setShow] = useState(false);
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
    <div className={`fixed inset-x-0 z-40 flex justify-center px-4 ${count > 0 ? "bottom-20" : "bottom-4"}`}>
      <div className="w-full max-w-md animate-fade-up rounded-full shadow-lift">
        <SearchBar defaultValue={defaultValue} />
      </div>
    </div>
  );
}
