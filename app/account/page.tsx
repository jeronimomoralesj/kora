import type { Metadata } from "next";
import KoraPass from "@/components/KoraPass";
import TierCharacter from "@/components/TierCharacter";
import CardsManager from "@/components/CardsManager";
import ProductRail from "@/components/ProductRail";
import SavedRecipesSection from "@/components/SavedRecipesSection";
import { member, cop } from "@/lib/data";
import { productById } from "@/lib/shop";
import type { Product } from "@/lib/types";

export const metadata: Metadata = { title: "KORA Pass — Tu cuenta" };

// La escalera completa del programa (dummy) — cada nivel con su personaje
// y sus beneficios. Los perks son de prueba; el programa real los reemplazará.
const TIERS = [
  {
    name: "Semilla",
    at: 0,
    perks: ["Puntos desde tu primera compra", "Café de la barra de cortesía al unirte"],
  },
  {
    name: "Sprout",
    at: 500,
    perks: ["1 pt por cada $100, online y en caja", "Fila prioritaria de recogida", "La receta de la semana, antes que nadie"],
  },
  {
    name: "Moss",
    at: 2000,
    perks: ["Ofertas de la semana 24 h antes", "Doble puntos en frescos del día", "Domicilio estándar gratis los viernes"],
  },
  {
    name: "Raíz",
    at: 5000,
    perks: ["Preventa de lanzamientos PULSE", "Bundle de cosecha exclusivo cada mes", "Un café de especialidad gratis por semana"],
  },
  {
    name: "Bosque",
    at: 12000,
    perks: ["Domicilio gratis, siempre", "Cata trimestral en el nodo con el equipo", "Tu nombre en el jardín vertical de Quinta Camacho"],
  },
];

// "Lo de siempre" — básicos de recompra derivados del historial (dummy).
const BUY_AGAIN_IDS = ["p-yogurt", "p-origen-granola", "p-avocado", "p-pulse-recovery", "p-eggs", "p-banano"];

export default function AccountPage() {
  const buyAgain = BUY_AGAIN_IDS.map(productById).filter((p): p is Product => Boolean(p));
  const currentTier = [...TIERS].reverse().find((t) => member.points >= t.at) ?? TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  const tierPct = nextTier ? Math.min(100, Math.round((member.points / nextTier.at) * 100)) : 100;

  return (
    <div className="kora-shell py-8 sm:py-12">
      {/* Encabezado — banda moss con el aguacate que cuida tu Pass */}
      <div className="kora-grain relative overflow-hidden rounded-[2rem_0.8rem_2rem_0.8rem] bg-gradient-to-br from-moss-900 via-moss to-moss-700 text-alabaster shadow-lift">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-4 select-none text-[clamp(3rem,9vw,6.5rem)] font-black leading-none tracking-tightest text-alabaster/[0.06]"
        >
          Cuenta
        </span>
        <div className="relative flex flex-col items-start gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
          <div>
            <p className="kora-eyebrow text-sprout-light">Panel del miembro</p>
            <h1 className="mt-1 text-3xl font-black tracking-tightest sm:text-4xl">
              Hola, {member.name.split(" ")[0]}.
            </h1>
            <p className="mt-1.5 max-w-sm text-sm text-alabaster/70">
              Un solo perfil en todos los canales — online y en caja.
            </p>
            <p className="mt-4 w-fit rounded-[0.7rem_0.25rem_0.7rem_0.25rem] bg-sprout px-2.5 py-1 text-[10px] font-black uppercase tracking-wide2 text-white">
              Miembro {member.tier} · {member.points.toLocaleString("es-CO")} pts
            </p>
          </div>
          {/* El guardián del Pass — cambia según tu nivel */}
          <div className="-mb-2 h-36 w-44 self-center sm:h-44 sm:w-52 sm:self-end" aria-hidden="true">
            <TierCharacter tier={member.tier} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Pass + billetera */}
        <div className="min-w-0 space-y-8 lg:col-span-5 xl:col-span-4">
          <KoraPass member={member} />
          <CardsManager />
        </div>

        {/* Stats + historial */}
        <div className="min-w-0 space-y-6 lg:col-span-7 xl:col-span-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Nivel" value={member.tier} icon="leaf" />
            <Stat label="Puntos" value={member.points.toLocaleString("es-CO")} icon="spark" />
            <Stat label="Racha (días)" value={member.streak} icon="flame" />
            <Stat label="Miembro desde" value={member.joined} icon="clock" />
          </div>

          {/* Progreso al siguiente nivel — con la escalera completa siempre a la vista */}
          <div className="kora-card overflow-hidden">
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <div>
                  <p className="kora-eyebrow">Camino al siguiente nivel</p>
                  <h3 className="mt-1 text-lg font-bold text-moss">
                    {currentTier.name}{nextTier ? ` → ${nextTier.name}` : " · nivel máximo"}
                  </h3>
                </div>
                {nextTier && (
                  <p className="text-sm font-semibold text-sprout-dark">
                    {(nextTier.at - member.points).toLocaleString("es-CO")} pts para subir
                  </p>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-moss/8">
                  <div className="h-full rounded-full bg-sprout" style={{ width: `${tierPct}%` }} />
                </div>
                {nextTier && (
                  <span className="kora-bob h-10 w-10 flex-none" title={`Nivel ${nextTier.name}`} aria-hidden="true">
                    <TierCharacter tier={nextTier.name} />
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-charcoal/50">
                {member.points.toLocaleString("es-CO")} pts · ganas 1 punto por cada $100, online y en tienda.
              </p>
            </div>

            {/* La escalera — todos los niveles, sus personajes y beneficios */}
            <p className="border-t border-moss/8 bg-alabaster/50 px-5 pt-4 text-[10px] font-semibold uppercase tracking-wide2 text-charcoal/35 sm:hidden">
              Desliza para ver todos los niveles →
            </p>
            <div className="overflow-x-auto bg-alabaster/50 px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:border-t sm:border-moss/8">
              <div className="flex min-w-[680px]">
                {TIERS.map((t, i) => {
                  const achieved = member.points >= t.at;
                  const isCurrent = t.name === currentTier.name;
                  return (
                    <div key={t.name} className="relative flex flex-1 flex-col items-center text-center">
                      {/* Camino que conecta los niveles */}
                      {i > 0 && (
                        <span
                          aria-hidden="true"
                          className={`absolute right-1/2 top-8 -z-10 h-0.5 w-full ${achieved ? "bg-sprout" : "bg-moss/10"}`}
                        />
                      )}
                      <span
                        className={`h-16 w-16 ${isCurrent ? "kora-bob" : ""} ${achieved ? "" : "opacity-45 saturate-50"}`}
                        aria-hidden="true"
                      >
                        <TierCharacter tier={t.name} />
                      </span>
                      <p className={`mt-1.5 text-sm font-bold ${achieved ? "text-moss" : "text-moss/50"}`}>{t.name}</p>
                      <p className="text-[10px] font-medium uppercase tracking-wide2 text-charcoal/40">
                        {t.at === 0 ? "Inicio" : `${t.at.toLocaleString("es-CO")} pts`}
                      </p>
                      {isCurrent && (
                        <span className="mt-1.5 rounded-[0.6rem_0.2rem_0.6rem_0.2rem] bg-sprout px-2 py-0.5 text-[9px] font-black uppercase tracking-wide2 text-white">
                          Estás aquí
                        </span>
                      )}
                      <ul className="mt-2 space-y-1 px-2">
                        {t.perks.map((perk) => (
                          <li
                            key={perk}
                            className={`mx-auto max-w-[8.5rem] text-[10px] leading-tight ${
                              achieved ? "text-charcoal/60" : "text-charcoal/40"
                            }`}
                          >
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="kora-card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-moss/8 px-5 py-4">
              <div>
                <p className="kora-eyebrow">Historial en tiempo real</p>
                <h3 className="text-lg font-bold text-moss">Online y en tienda, unificados</h3>
              </div>
              <span className="rounded-full bg-sprout/12 px-3 py-1.5 text-xs font-semibold text-sprout-dark">
                En vivo
              </span>
            </div>
            <ul className="divide-y divide-moss/8">
              {member.history.map((o) => {
                const inStore = o.channel.startsWith("En tienda");
                return (
                  <li key={o.id} className="flex items-center gap-4 px-5 py-4">
                    <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${inStore ? "bg-moss text-alabaster" : "bg-sprout/12 text-sprout-dark"}`}>
                      {inStore ? <StoreIcon /> : <BagIcon />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-moss">{o.channel}</p>
                      <p className="text-xs text-charcoal/50">
                        {o.date} · {o.items} productos · #{o.id}
                      </p>
                    </div>
                    <p className="flex-none text-sm font-bold tabular-nums text-moss">{cop(o.total)}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-kora bg-moss px-6 py-6 text-alabaster">
            <p className="kora-eyebrow text-sprout-light">Cómo se vincula</p>
            <h3 className="mt-1 text-lg font-bold">¿Comprando en tienda?</h3>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-alabaster/70">
              Muestra el QR o di tu número de 10 dígitos en la caja. La venta se
              asocia a este perfil en tiempo real — puntos, historial y recetas
              sugeridas se actualizan antes de que salgas del mostrador.
            </p>
          </div>
        </div>
      </div>

      {/* ── Recetas guardadas ── */}
      <SavedRecipesSection />

      {/* ── Lo de siempre — recompra en un toque ── */}
      {buyAgain.length > 0 && (
        <div className="mt-12">
          <ProductRail
            eyebrow="Lo de siempre"
            title="Compra de nuevo"
            items={buyAgain}
            seeAllHref="/tienda"
          />
        </div>
      )}
    </div>
  );
}

type GlyphName = "leaf" | "spark" | "flame" | "clock";

function Stat({ label, value, icon }: { label: string; value: string | number; icon: GlyphName }) {
  return (
    <div className="kora-card flex flex-col gap-2 p-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sprout/12 text-sprout-dark">
        <Glyph name={icon} />
      </span>
      <div>
        <p className="text-xl font-bold leading-none text-moss">{value}</p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wide2 text-charcoal/40">{label}</p>
      </div>
    </div>
  );
}

function Glyph({ name }: { name: GlyphName }) {
  const p: Record<GlyphName, string> = {
    leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z M2 21c0-3 1.85-5.36 5.08-6",
    spark: "M12 3v4M12 17v4M3 12h4M17 12h4M12 8l2 2-2 2-2-2 2-2Z",
    flame: "M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C9 11 12 8 12 3Z",
    clock: "M12 7v5l3 2",
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {name === "clock" && <circle cx="12" cy="12" r="9" />}
      <path d={p[name]} />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9 4 4h16l1 5M4 9v11h16V9M4 9h16" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
