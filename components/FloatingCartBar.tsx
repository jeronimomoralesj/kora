"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { cop } from "@/lib/shop";

// Barra flotante de canasta — clave en mobile, compartida por tienda y búsqueda.
export default function FloatingCartBar() {
  const { count, total } = useCart();
  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <Link
        href="/checkout"
        className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-4 rounded-full bg-moss px-5 py-3.5 text-alabaster shadow-lift transition-transform hover:scale-[1.01]"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-sprout px-2 text-xs font-bold text-white">
            {count}
          </span>
          Ver canasta
        </span>
        <span className="text-sm font-black tabular-nums">{cop(total)}</span>
      </Link>
    </div>
  );
}
