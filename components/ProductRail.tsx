import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";
import type { Product } from "@/lib/types";

// Góndola horizontal de productos — compartida por la portada de tienda y el landing.
interface ProductRailProps {
  eyebrow?: string;
  title: string;
  items: Product[];
  seeAllHref?: string;
}

export default function ProductRail({ eyebrow, title, items, seeAllHref }: ProductRailProps) {
  return (
    <section>
      <div className="mb-3 flex items-end justify-between">
        <div>
          {eyebrow && <p className="kora-eyebrow">{eyebrow}</p>}
          <h2 className="text-xl font-bold tracking-tight text-moss">{title}</h2>
        </div>
        {seeAllHref && (
          <Link href={seeAllHref} className="text-sm font-semibold text-sprout-dark transition-colors hover:text-sprout">
            Ver todo →
          </Link>
        )}
      </div>
      <Carousel>
        {items.map((p) => (
          <div key={p.id} className="w-44 flex-none snap-start sm:w-52">
            <ProductCard product={p} />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
