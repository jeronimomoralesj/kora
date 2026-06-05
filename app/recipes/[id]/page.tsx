import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import MacroPill from "@/components/MacroPill";
import RecipeFlow from "@/components/RecipeFlow";
import SaveRecipeButton from "@/components/SaveRecipeButton";
import { Tag, BrandBadge } from "@/components/Tag";
import { recipes, recipeById, stepsForRecipe, BRANDS } from "@/lib/data";

export function generateStaticParams(): { id: string }[] {
  return recipes.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = recipeById(id);
  if (!recipe) return { title: "Receta — KORA" };
  return { title: `${recipe.title} — KORA`, description: recipe.blurb };
}

const ACCENT_TAGS = ["Alta Proteína", "Post-Entreno"];

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = recipeById(id);
  if (!recipe) notFound();
  const { servings, difficulty, steps } = stepsForRecipe(recipe.id);
  const totalTime = recipe.prepTime;

  return (
    <div className="pb-28">
      {/* ── Encabezado editorial — la receta es protagonista ── */}
      <div className="kora-shell pt-8 sm:pt-12">
        <Link href="/recipes" className="inline-flex items-center gap-1.5 text-sm font-medium text-moss/60 transition-colors hover:text-moss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Todas las recetas
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Foto principal */}
          <Photo
            imageKey={recipe.imageKey}
            alt={recipe.title}
            className="aspect-[4/3] w-full shadow-lift lg:aspect-[4/5]"
            label="Resultado final"
          />

          {/* Meta */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-1.5">
              {recipe.tags.map((t) => (
                <Tag key={t} tone={ACCENT_TAGS.includes(t) ? "sprout" : "moss"}>
                  {t}
                </Tag>
              ))}
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tightest text-moss sm:text-5xl">{recipe.title}</h1>
            <p className="mt-1.5 text-lg text-charcoal/55">{recipe.subtitle}</p>
            <div className="mt-4">
              <SaveRecipeButton recipeId={recipe.id} variant="pill" />
            </div>
            <p className="mt-4 max-w-md leading-relaxed text-charcoal/65">{recipe.story}</p>

            {/* Fila de meta — tiempo, porciones, dificultad, pasos */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetaStat icon="clock" label="Tiempo" value={`${totalTime} min`} />
              <MetaStat icon="users" label="Porciones" value={servings} />
              <MetaStat icon="gauge" label="Dificultad" value={difficulty} />
              <MetaStat icon="list" label="Pasos" value={steps.length} />
            </div>

            <div className="mt-6 max-w-sm">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-charcoal/40">
                Por porción
              </p>
              <MacroPill macros={recipe.macros} defaultOpen />
            </div>

            <p className="mt-5 text-[13px] font-semibold text-sprout-dark">{recipe.blurb}</p>
          </div>
        </div>
      </div>

      {/* ── Ingredientes (vista de lectura) ── */}
      <div className="kora-shell mt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="kora-eyebrow">Lo que necesitas</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-moss">Ingredientes</h2>
            <p className="mt-2 text-sm text-charcoal/55">
              Para {servings} porción{servings !== 1 ? "es" : ""}. ¿No los tienes? Consíguelos abajo y elige solo lo que te falte.
            </p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-8">
            {recipe.ingredients.map((i) => {
              const proprietary = BRANDS[i.brand]?.proprietary;
              return (
                <li key={i.id} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-moss/8">
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-semibold text-moss">{i.name}</span>
                      {proprietary && <BrandBadge label={BRANDS[i.brand].name} />}
                    </span>
                  </span>
                  <span className="flex-none text-xs font-medium text-charcoal/50">{i.qty}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── Preparación paso a paso ── */}
      <div className="kora-shell mt-16">
        <div className="max-w-2xl">
          <p className="kora-eyebrow">Manos a la obra</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tightest text-moss sm:text-4xl">Preparación paso a paso</h2>
          <p className="mt-2 text-charcoal/60">{steps.length} pasos · {totalTime} min en total. Sigue el ritmo, sin afán.</p>
        </div>

        <ol className="mt-10 space-y-10 sm:space-y-14">
          {steps.map((s, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <li key={idx} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                <div className={reverse ? "lg:order-2" : ""}>
                  <Photo
                    imageKey={s.imageKey}
                    alt={`Paso ${idx + 1}: ${s.title}`}
                    className="aspect-[4/3] w-full shadow-soft"
                    label={`Paso ${idx + 1}`}
                  />
                </div>
                <div className={reverse ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-moss text-lg font-black text-alabaster">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-moss">{s.title}</h3>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-sprout-dark">
                        <ClockIcon /> {s.time}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 max-w-md leading-relaxed text-charcoal/70">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── Nota de transparencia ── */}
      <div className="kora-shell mt-16">
        <div className="rounded-kora bg-moss p-6 text-alabaster sm:p-8">
          <p className="kora-eyebrow text-sprout-light">Transparente por defecto</p>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-alabaster/75">
            Los macros se calculan sobre ingredientes crudos antes de preparar. Las
            líneas propias KORA (PULSE, KORA Origen) son de etiqueta limpia y sin
            azúcar añadida. La disponibilidad se verifica en vivo contra tu nodo más
            cercano cuando armas tu bundle.
          </p>
        </div>
      </div>

      {/* ── Más recetas ── */}
      <div className="kora-shell mt-16">
        <h2 className="text-xl font-bold text-moss">Sigue cocinando</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {recipes
            .filter((r) => r.id !== recipe.id)
            .slice(0, 4)
            .map((r) => (
              <Link key={r.id} href={`/recipes/${r.id}`} className="group">
                <Photo imageKey={r.imageKey} alt={r.title} className="aspect-square w-full transition-transform duration-300 group-hover:scale-[1.03]" />
                <p className="mt-2 text-sm font-semibold leading-tight text-moss">{r.title}</p>
                <p className="text-xs text-sprout-dark">{r.macros.protein}g proteína</p>
              </Link>
            ))}
        </div>
      </div>

      {/* Botón flotante + selector de ingredientes */}
      <RecipeFlow recipe={recipe} />
    </div>
  );
}

type MetaIconName = "clock" | "users" | "gauge" | "list";

function MetaStat({ icon, label, value }: { icon: MetaIconName; label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white px-3 py-3 ring-1 ring-moss/8">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sprout/12 text-sprout-dark">
        <MetaIcon name={icon} />
      </span>
      <p className="mt-2 text-sm font-bold leading-none text-moss">{value}</p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide2 text-charcoal/40">{label}</p>
    </div>
  );
}

function MetaIcon({ name }: { name: MetaIconName }) {
  const paths: Record<MetaIconName, string> = {
    clock: "M12 7v5l3 2",
    users: "M16 18v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM22 18v-1a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11",
    gauge: "M12 14l3-3M5 18a8 8 0 1 1 14 0",
    list: "M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01",
  };
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {name === "clock" && <circle cx="12" cy="12" r="9" />}
      <path d={paths[name]} />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
