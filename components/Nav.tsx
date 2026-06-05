"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import Logo from "@/components/Logo";
import { member, cop } from "@/lib/data";

type NavIconName = "home" | "store" | "recipe" | "card" | "user";

interface NavLink {
  href: string;
  label: string;
  icon: NavIconName;
  desc: string;
}

const LINKS: NavLink[] = [
  { href: "/", label: "Inicio", icon: "home", desc: "El mercado de hoy" },
  { href: "/tienda", label: "Tienda", icon: "store", desc: "Frescos, despensa y líneas KORA" },
  { href: "/recipes", label: "Recetas", icon: "recipe", desc: "Macros calculados, bundle en un toque" },
  { href: "/kora-pass", label: "KORA Pass", icon: "card", desc: "Tu llave en caja" },
  { href: "/account", label: "Cuenta", icon: "user", desc: "Pedidos, billetera y recetario" },
];

export default function Nav() {
  const pathname = usePathname();
  const { count, total } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  // Bloquea el scroll del body mientras el menú está abierto; Escape lo cierra.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // Nota: el blur vive en el div interior — backdrop-filter en el <header>
    // convertiría al header en el "containing block" del menú fixed y lo rompería.
    <header className="sticky top-0 z-50">
      <div className="border-b border-moss/10 bg-alabaster/85 backdrop-blur-md">
      <div className="kora-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-none" onClick={close}>
          <Logo className="text-[1.7rem] text-moss" />
          <span className="mt-1 text-[8px] font-medium uppercase tracking-wide3 text-moss/50">
            Foods &amp; Provisions
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-[1rem_0.35rem_1rem_0.35rem] px-4 py-2 text-sm font-medium transition-all duration-300 hover:rounded-[0.35rem_1rem_0.35rem_1rem] ${
                isActive(l.href) ? "bg-moss/8 text-moss" : "text-moss/70 hover:bg-moss/5 hover:text-moss"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/checkout"
            onClick={close}
            className="relative flex h-10 items-center gap-2 rounded-[1rem_0.35rem_1rem_0.35rem] bg-moss px-4 text-sm font-semibold text-alabaster transition-all duration-300 hover:rounded-[0.35rem_1rem_0.35rem_1rem] hover:bg-moss-900"
            aria-label="Abrir canasta"
          >
            <CartIcon />
            <span className="hidden sm:inline">Canasta</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sprout px-1.5 text-[11px] font-bold text-white ring-2 ring-alabaster">
                {count}
              </span>
            )}
          </Link>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-moss transition-colors hover:bg-moss/5 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h12" />
            </svg>
          </button>
        </div>
      </div>
      </div>

      {/* ── Menú mobile — hoja lateral con fondo difuminado ── */}
      <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <div
          onClick={close}
          className={`absolute inset-0 bg-moss/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hoja */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-alabaster shadow-lift transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          inert={!open}
        >
          {/* Encabezado de la hoja */}
          <div className="flex h-16 flex-none items-center justify-between border-b border-moss/10 px-5">
            <Logo className="text-xl text-moss" />
            <button
              onClick={close}
              aria-label="Cerrar menú"
              className="flex h-9 w-9 items-center justify-center rounded-full text-moss transition-colors hover:bg-moss/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Enlaces — key={open} reinicia la animación escalonada al abrir */}
          <nav key={String(open)} className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
            {LINKS.map((l, i) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className={`mb-1 flex animate-fade-up items-center gap-3.5 px-3.5 py-3.5 transition-colors ${
                    i % 2 ? "rounded-[0.6rem_1.4rem_0.6rem_1.4rem]" : "rounded-[1.4rem_0.6rem_1.4rem_0.6rem]"
                  } ${active ? "bg-moss text-alabaster" : "text-moss hover:bg-moss/5"}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${
                      active ? "bg-alabaster/15 text-sprout-light" : "bg-sprout/12 text-sprout-dark"
                    }`}
                  >
                    <NavIcon name={l.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold leading-tight">{l.label}</span>
                    <span className={`block truncate text-xs ${active ? "text-alabaster/60" : "text-charcoal/45"}`}>
                      {l.desc}
                    </span>
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-alabaster/50" : "text-moss/25"}>
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              );
            })}

            {/* Mini KORA Pass — acceso rápido al perfil */}
            <Link
              href="/account"
              onClick={close}
              className="mt-4 flex animate-fade-up items-center gap-3 rounded-[1.4rem_0.6rem_1.4rem_0.6rem] bg-gradient-to-br from-moss-900 via-moss to-moss-700 p-4 text-alabaster shadow-soft"
              style={{ animationDelay: `${LINKS.length * 50}ms` }}
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-alabaster/10 text-sm font-black ring-1 ring-alabaster/25">
                {member.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{member.name}</span>
                <span className="block text-[11px] text-alabaster/60">
                  Miembro {member.tier} · {member.points.toLocaleString("es-CO")} pts
                </span>
              </span>
              <span className="flex-none rounded-full bg-sprout px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide2 text-white">
                Mi Pass
              </span>
            </Link>
          </nav>

          {/* Pie — canasta siempre a mano */}
          <div className="flex-none border-t border-moss/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Link
              href="/checkout"
              onClick={close}
              className="kora-cta w-full justify-between px-5"
            >
              <span className="flex items-center gap-2">
                <CartIcon />
                {count > 0 ? `Ver canasta (${count})` : "Tu canasta está vacía"}
              </span>
              {count > 0 && <span className="tabular-nums">{cop(total)}</span>}
            </Link>
            <p className="mt-3 text-center text-[10px] uppercase tracking-wide2 text-charcoal/35">
              Bogotá · Recogida en 10 min · Domicilio local
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
}

function NavIcon({ name }: { name: NavIconName }) {
  const icons: Record<NavIconName, React.ReactNode> = {
    home: <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM9 22V12h6v10" />,
    store: <path d="M3 9 4 4h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" />,
    recipe: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15ZM9 7h7M9 11h5" />,
    card: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M2 10h20M6 15h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
      </>
    ),
  };
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
