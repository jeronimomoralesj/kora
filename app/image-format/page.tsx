import type { Metadata } from "next";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "Formato de imagen — KORA",
  description: "El contrato de assets de imagen para la app web de KORA.",
};

const KEYS: [string, string, string][] = [
  ["hero-store", "Tienda / lifestyle", "16:9 · 5:4"],
  ["store-facade", "Espacial — fachada de vidrio", "16:10"],
  ["produce-island", "Espacial — isla de frescos", "16:10"],
  ["wall-chiller", "Espacial — monolito / nevera", "16:10"],
  ["bowl-green", "Receta — Bowl Andino", "4:3 · 1:1"],
  ["oats-cream", "Receta — Avena Nocturna", "4:3 · 1:1"],
  ["smoothie-green", "Receta — Smoothie Verde", "4:3 · 1:1"],
  ["wrap-earth", "Receta — Wrap Power Moss", "4:3 · 1:1"],
  ["granola-amber", "Receta — Frasco de Granola", "4:3 · 1:1"],
  ["salad-bright", "Receta — Ensalada Sprout", "4:3 · 1:1"],
  ["pulse-line", "Marca — PULSE", "16:10"],
  ["origen-line", "Marca — KORA Origen", "16:10"],
];

export default function ImageFormatPage() {
  return (
    <div className="kora-shell py-8 sm:py-12">
      <div className="max-w-3xl">
        <p className="kora-eyebrow">Referencia de ingeniería</p>
        <h1 className="mt-2 text-3xl font-black tracking-tightest text-moss sm:text-4xl">
          Formato de imagen y contrato de assets
        </h1>
        <p className="mt-3 text-charcoal/65">
          Lee esto antes de agregar cualquier fotografía. La app renderiza cada
          imagen a través de un solo componente para que siempre funcione —
          incluso sin assets binarios en el repo. Esta página es la fuente de
          verdad para cualquier desarrollador o IA que trabaje en el código.
        </p>
      </div>

      {/* El contrato */}
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <Card n="01" title="Un solo componente">
          Cada superficie fotográfica se renderiza con{" "}
          <Code>&lt;Photo imageKey=&quot;…&quot; /&gt;</Code> (
          <Code>components/Photo.js</Code>). Nunca pongas un{" "}
          <Code>&lt;img&gt;</Code> suelto en una página — pasa por{" "}
          <Code>Photo</Code> para que placeholders y assets reales sean
          intercambiables.
        </Card>
        <Card n="02" title="imageKey es la clave">
          El <Code>imageKey</Code> es el identificador único que une un slot de UI
          con un archivo. Es kebab-case, describe el sujeto + tono dominante (ej.{" "}
          <Code>bowl-green</Code>), y se declara en <Code>lib/data.js</Code>.
        </Card>
        <Card n="03" title="Los placeholders sí se versionan">
          Los placeholders SVG deterministas <em>sí</em> están en control de
          versiones para que la app compile en cualquier lado. La fotografía HD
          real está <strong className="text-moss">en .gitignore</strong> (ver
          abajo).
        </Card>
      </div>

      {/* Carpetas + spec */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="kora-card p-6">
          <h2 className="text-lg font-bold text-moss">Estructura de carpetas</h2>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-moss p-4 text-[13px] leading-relaxed text-alabaster">
{`public/
└─ photography/
   ├─ README.md          (versionado — las reglas)
   ├─ raw/               (en .gitignore · masters PSD/TIFF)
   └─ hd/                (en .gitignore · exports web)
      ├─ bowl-green.webp
      ├─ bowl-green@2x.webp
      ├─ hero-store.webp
      └─ …                (nombre de archivo === imageKey)`}
          </pre>
          <p className="mt-3 text-sm text-charcoal/55">
            El nombre del archivo debe ser igual al <Code>imageKey</Code>. La
            variante <Code>@2x</Code> es la fuente retina.
          </p>
        </div>

        <div className="kora-card p-6">
          <h2 className="text-lg font-bold text-moss">Especificación del archivo</h2>
          <dl className="mt-3 divide-y divide-moss/8 text-sm">
            {(
              [
                ["Formato", "WebP (principal) · AVIF opcional · JPEG fallback"],
                ["Perfil de color", "sRGB, 8-bit"],
                ["Recetas", "1600 × 1200 (4:3) — también recorta cuadrado 1:1"],
                ["Hero / lifestyle", "2400 × 1500 (16:10) o 2000 × 2500 (4:5)"],
                ["Paneles de marca", "1920 × 1200 (16:10)"],
                ["Peso máximo", "≤ 220 KB @1x · ≤ 480 KB @2x"],
                ["Fondo", "Alabastro cálido (#F7F5F0) o madera de la tienda"],
                ["Iluminación", "Brillante, de exhibición, luz suave única — sin sombra dura"],
                ["Margen de recorte", "Sujeto centrado; 12% de margen seguro por lado"],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-2.5">
                <dt className="flex-none font-semibold text-moss">{k}</dt>
                <dd className="text-right text-charcoal/60">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Dirección de arte */}
      <div className="mt-6 kora-card p-6">
        <h2 className="text-lg font-bold text-moss">Dirección de arte — el paralelo con la tienda</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-charcoal/60">
          Cada imagen debe leerse como la tienda física: fachadas de vidrio,
          madera natural, iluminación de exhibición y cero desorden. Nítida,
          fresca, arquitectónica. Espacio negativo generoso. Ingredientes reales,
          honestamente iluminados. Sin brillo de stock, sin props recargados, sin
          texto incrustado en la foto.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {(
            [
              ["Sí", ["Tonos de luz natural", "Superficies neutras cálidas", "Un solo sujeto protagonista", "Textura fresca visible"], "sprout"],
              ["Evitar", ["Filtros / viñetas pesadas", "Mesas recargadas", "Dominantes azules frías", "Texto de marketing incrustado"], "moss"],
              ["Tono de voz", ["“30g Proteína.”", "“0g Azúcar Añadida.”", "“Ingredientes Crudos.”", "Directo, sin relleno"], "earth"],
            ] as [string, string[], string][]
          ).map(([title, items, tone]) => (
            <div key={title} className="rounded-xl bg-alabaster p-4">
              <p className={`text-xs font-bold uppercase tracking-wide2 ${tone === "sprout" ? "text-sprout-dark" : tone === "earth" ? "text-[#8A6D3B]" : "text-moss"}`}>
                {title}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-charcoal/60">
                {items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Cómo reemplazar */}
      <div className="mt-6 kora-card p-6">
        <h2 className="text-lg font-bold text-moss">Reemplazar un placeholder por una foto real</h2>
        <p className="mt-2 text-sm text-charcoal/55">
          Dentro de <Code>components/Photo.js</Code>, reemplaza el cuerpo SVG por
          un <Code>&lt;img&gt;</Code> progresivo basado en el mismo{" "}
          <Code>imageKey</Code>. Nada más en la app cambia.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-moss p-4 text-[13px] leading-relaxed text-alabaster">
{`// components/Photo.js — swap a producción
export default function Photo({ imageKey, alt, className, rounded }) {
  return (
    <div className={\`relative overflow-hidden \${rounded} \${className}\`}>
      <img
        src={\`/photography/hd/\${imageKey}.webp\`}
        srcSet={\`/photography/hd/\${imageKey}@2x.webp 2x\`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}`}
        </pre>
      </div>

      {/* gitignore */}
      <div className="mt-6 rounded-kora bg-moss px-6 py-6 text-alabaster">
        <h2 className="text-lg font-bold text-sprout-light">.gitignore — qué se versiona y qué no</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-alabaster/75">
          La fotografía real es pesada y licenciada, así que las carpetas de
          masters y exports HD están ignoradas. Los placeholders SVG livianos sí
          se versionan para que el build nunca se rompa.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-moss-900 p-4 text-[13px] leading-relaxed text-alabaster/90">
{`# Fotografía HD de producción (NO versionada)
/public/photography/raw/
/public/photography/hd/
*.psd
*.tiff`}
        </pre>
      </div>

      {/* Registro de keys */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-moss">Registro actual de imageKeys</h2>
        <p className="mt-1 text-sm text-charcoal/55">
          Render en vivo de cada placeholder en uso. Cada uno mapea 1:1 a un
          archivo HD.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {KEYS.map(([key, label, ratios]) => (
            <div key={key} className="kora-card overflow-hidden">
              <Photo imageKey={key} alt={label} rounded="rounded-none" className="aspect-[4/3] w-full" label={key} />
              <div className="p-3">
                <p className="font-mono text-xs font-semibold text-moss">{key}</p>
                <p className="text-xs text-charcoal/50">{label}</p>
                <p className="mt-1 text-[11px] font-medium text-sprout-dark">{ratios}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="kora-card p-6">
      <span className="text-xs font-bold tracking-wide2 text-sprout">{n}</span>
      <h2 className="mt-1 text-lg font-bold text-moss">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{children}</p>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-moss/8 px-1.5 py-0.5 font-mono text-[0.85em] text-moss">{children}</code>
  );
}
