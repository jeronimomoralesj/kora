"use client";

import { useEffect, useRef, useState } from "react";

// Carrusel de góndola — contenido dentro del ancho de página, swipe en mobile
// y flechas en desktop. Las flechas aparecen solo cuando hay más por ver.
interface CarouselProps {
  children: React.ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const nudge = (dir: number) => {
    const el = trackRef.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Degradés en los bordes — señalan que hay más contenido */}
      {canL && <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-alabaster to-transparent" />}
      {canR && <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-alabaster to-transparent" />}

      {canL && (
        <button
          onClick={() => nudge(-1)}
          aria-label="Anterior"
          className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-moss shadow-lift ring-1 ring-moss/10 transition-all hover:bg-moss hover:text-alabaster sm:flex"
        >
          <Arrow dir="left" />
        </button>
      )}
      {canR && (
        <button
          onClick={() => nudge(1)}
          aria-label="Siguiente"
          className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-moss shadow-lift ring-1 ring-moss/10 transition-all hover:bg-moss hover:text-alabaster sm:flex"
        >
          <Arrow dir="right" />
        </button>
      )}
    </div>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}
