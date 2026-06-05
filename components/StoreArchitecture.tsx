import StorefrontScene from "@/components/StorefrontScene";

// Traduce el diseño espacial físico de KORA a una sección digital.
// La arquitectura de tienda es nuestro principal medio de adquisición — por eso
// la mostramos como una vitrina viva, con la zanahoria entrando al nodo.
export default function StoreArchitecture() {
  return (
    <section className="border-y border-moss/10 bg-travertine">
      <div className="kora-shell py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="kora-eyebrow">La tienda como medio</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tightest text-moss sm:text-4xl">
            Una vitrina a pie de calle, no un local.
          </h2>
          <p className="mt-3 text-charcoal/60">
            Santuarios de esquina compactos, bajo 80 m². Vidrio sin marcos,
            estantería baja en nogal, líneas de visión claras hasta el fondo. La
            app digital es una extensión directa de este espacio — misma calma,
            misma geometría.
          </p>
        </div>

        {/* La vitrina, en vivo — la zanahoria entra al nodo en loop */}
        <div className="mt-10">
          <StorefrontScene />
        </div>

        {/* Franja de principios + material */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-kora ring-1 ring-moss/10 sm:grid-cols-3">
          <Principle
            title="Zona de descompresión"
            body="Sin rejas, torniquetes ni pilas de carritos. Entras a la apertura — igual que el home abre con aire, no con ruido."
            swatch="alabaster"
          />
          <Principle
            title="Monolitos recesados"
            body="Neveras enmarcadas en acero negro mate con LED difuso oculto. En digital, los productos viven en esa misma luz de galería."
            swatch="steel"
          />
          <Principle
            title="Materiales honestos"
            body="Nogal macizo, concreto chorreado, acero cepillado y vidrio continuo. Nunca laminados baratos ni plásticos brillantes."
            swatch="walnut"
          />
        </div>

        {/* Paleta de materiales táctiles */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Material name="Alabastro Cálido" hex="#F7F5F0" className="bg-alabaster ring-1 ring-moss/10" textDark />
          <Material name="Madera de Nogal" hex="#6B4F34" className="surface-walnut" />
          <Material name="Concreto Chorreado" hex="#D9D5CC" className="surface-concrete" textDark />
          <Material name="Acero Negro Mate" hex="#222220" className="bg-steel" />
        </div>
      </div>
    </section>
  );
}

type SwatchName = "alabaster" | "steel" | "walnut";

function Principle({ title, body, swatch }: { title: string; body: string; swatch: SwatchName }) {
  const swatches: Record<SwatchName, string> = {
    alabaster: "bg-alabaster ring-1 ring-moss/15",
    steel: "bg-steel",
    walnut: "surface-walnut",
  };
  return (
    <div className="bg-white p-6">
      <span className={`mb-4 block h-8 w-8 rounded-full ${swatches[swatch]}`} />
      <h3 className="text-base font-bold text-moss">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">{body}</p>
    </div>
  );
}

function Material({
  name,
  hex,
  className,
  textDark,
}: {
  name: string;
  hex: string;
  className: string;
  textDark?: boolean;
}) {
  return (
    <div className={`relative flex aspect-[5/3] flex-col justify-end overflow-hidden rounded-xl p-3 ${className}`}>
      <span className={`text-xs font-bold ${textDark ? "text-moss" : "text-white"}`}>{name}</span>
      <span className={`font-mono text-[10px] ${textDark ? "text-moss/50" : "text-white/55"}`}>{hex}</span>
    </div>
  );
}
