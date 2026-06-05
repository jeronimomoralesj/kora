"use client";

import { useRouter } from "next/navigation";

// Buscador estilo e-commerce — siempre navega a la página de resultados
// /tienda/buscar?q=… (una búsqueda nueva resetea los filtros, como en
// cualquier tienda real).
interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ defaultValue = "", placeholder = "Buscar en la tienda…", className = "" }: SearchBarProps) {
  const router = useRouter();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = (new FormData(e.currentTarget).get("q") || "").toString().trim();
    router.push(q ? `/tienda/buscar?q=${encodeURIComponent(q)}` : "/tienda");
  };

  return (
    <form onSubmit={submit} role="search" className={`relative ${className}`}>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-moss/40">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
      <input
        key={defaultValue}
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        className="w-full rounded-full border border-moss/15 bg-white py-3 pl-11 pr-24 text-sm text-moss outline-none transition-colors placeholder:text-charcoal/35 focus:border-sprout focus:ring-2 focus:ring-sprout/20"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-[1rem_0.35rem_1rem_0.35rem] bg-sprout px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:rounded-[0.35rem_1rem_0.35rem_1rem] hover:bg-sprout-dark"
      >
        Buscar
      </button>
    </form>
  );
}
