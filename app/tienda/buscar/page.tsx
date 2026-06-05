import type { Metadata } from "next";
import SearchResults from "@/components/SearchResults";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Coerción defensiva — searchParams puede traer arrays con params repetidos.
const str = (v: string | string[] | undefined): string => (typeof v === "string" ? v : "");

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const sp = await searchParams;
  const q = str(sp.q);
  const cat = str(sp.cat);
  return {
    title: q ? `“${q}” — Buscar en KORA` : cat ? `${cat} — Tienda KORA` : "Buscar — Tienda KORA",
    description: "Resultados de búsqueda en la tienda KORA: frescos, proteínas, despensa y líneas propias.",
  };
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  return (
    <div className="kora-shell py-8 sm:py-12">
      <SearchResults
        q={str(sp.q)}
        cat={str(sp.cat)}
        marca={str(sp.marca)}
        orden={str(sp.orden) || "destacados"}
      />
    </div>
  );
}
