// ─────────────────────────────────────────────────────────────
// KORA — capa de datos de la TIENDA / e-commerce (dummy enriquecido).
// Separado de lib/data.js a propósito. Reexporta BRANDS y cop para que los
// componentes de tienda importen todo desde un solo lugar.
// El cliente proporcionará el catálogo real más adelante.
// ─────────────────────────────────────────────────────────────
import { BRANDS, cop, recipes } from "@/lib/data";
import type { Product, ProductReview, Recipe } from "@/lib/types";

export { BRANDS, cop };

export const productCategories: string[] = [
  "Todo",
  "Líneas KORA",
  "Frescos",
  "Proteínas",
  "Despensa",
  "Bebidas",
];

export const products: Product[] = [
  // ── Líneas propias ──
  {
    id: "p-pulse-recovery", name: "Batido PULSE Recovery", brand: "PULSE", category: "Bebidas",
    price: 12900, compareAt: 14900, unit: "Botella 350 ml", imageKey: "pulse-recovery",
    blurb: "30g Proteína · 0g Azúcar añadida", tagline: "Recuperación lista para beber.",
    description: "Batido de proteína de suero listo para beber, formulado para después de entrenar. 30 g de proteína, electrolitos y cero azúcar añadida en una botella que cabe en tu maleta.",
    highlights: ["30 g de proteína por botella", "0 g de azúcar añadida", "Frío y listo para beber"],
    rating: 4.8, reviews: 214, sold: 1240, stock: 36, bestSeller: true,
    pairsWith: ["p-pulse-bar", "p-banano"], macros: { calories: 180, protein: 30, carbs: 6, fats: 2 },
  },
  {
    id: "p-pulse-vanilla", name: "Proteína Vainilla PULSE", brand: "PULSE", category: "Líneas KORA",
    price: 8900, unit: "Sobre 35 g", imageKey: "pulse-vanilla",
    blurb: "24g Proteína · Sin azúcar", tagline: "Tu base de proteína diaria.",
    description: "Proteína de vainilla de etiqueta limpia para batidos, avena o donde la necesites. Se disuelve sin grumos y suma 24 g de proteína por medida.",
    highlights: ["24 g de proteína por medida", "Sin endulzantes artificiales", "Se mezcla sin grumos"],
    rating: 4.7, reviews: 168, sold: 980, stock: 50, bestSeller: true,
    pairsWith: ["p-origen-oats", "p-banano"], macros: { calories: 130, protein: 24, carbs: 3, fats: 2 },
  },
  {
    id: "p-pulse-greens", name: "PULSE Greens", brand: "PULSE", category: "Líneas KORA",
    price: 9900, unit: "Sobre 30 g", imageKey: "pulse-greens",
    blurb: "Verdes funcionales · Detox", tagline: "Tu reset verde diario.",
    description: "Mezcla de verdes funcionales — espinaca, espirulina y enzimas digestivas — para sumar micronutrientes sin esfuerzo. Ideal en smoothies.",
    highlights: ["Verdes + enzimas digestivas", "Sin azúcar", "1 medida = 2 porciones de verdura"],
    rating: 4.6, reviews: 92, sold: 540, stock: 22, isNew: true,
    pairsWith: ["p-coconut", "p-spinach"],
  },
  {
    id: "p-pulse-collagen", name: "Colágeno Cítrico PULSE", brand: "PULSE", category: "Líneas KORA",
    price: 11200, unit: "Sobre 25 g", imageKey: "pulse-collagen",
    blurb: "Colágeno · Vitamina C", tagline: "Colágeno + vitamina C.",
    description: "Péptidos de colágeno con vitamina C para piel, cabello y articulaciones. Se disuelve transparente en agua fría, con un toque cítrico natural.",
    highlights: ["10 g de colágeno por medida", "Con vitamina C", "Sabor cítrico natural"],
    rating: 4.7, reviews: 76, sold: 410, stock: 18,
    pairsWith: ["p-coconut"],
  },
  {
    id: "p-pulse-bar", name: "Barra PULSE Cacao", brand: "PULSE", category: "Líneas KORA",
    price: 6500, compareAt: 7500, unit: "Barra 55 g", imageKey: "pulse-bar",
    blurb: "20g Proteína · 0g Azúcar añadida", tagline: "Snack que sí sabe a chocolate.",
    description: "Barra de cacao con 20 g de proteína y sin azúcar añadida. El snack para la tarde o el post-entreno rápido, sin culpa.",
    highlights: ["20 g de proteína", "0 g de azúcar añadida", "Cacao real"],
    rating: 4.8, reviews: 301, sold: 2100, stock: 60, bestSeller: true,
    pairsWith: ["p-pulse-recovery"], macros: { calories: 210, protein: 20, carbs: 14, fats: 8 },
  },
  {
    id: "p-origen-granola", name: "Granola Tostada KORA Origen", brand: "KORA_ORIGEN", category: "Despensa",
    price: 10400, unit: "Frasco 400 g", imageKey: "granola-amber",
    blurb: "Origen andino · Sin azúcar refinada", tagline: "Tostada en lotes pequeños.",
    description: "Granola tostada lentamente con avena, miel y nueces de origen andino. Sin azúcar refinada — crujiente, honesta y trazable.",
    highlights: ["Sin azúcar refinada", "Origen andino trazable", "Tostada en lotes pequeños"],
    rating: 4.9, reviews: 188, sold: 1320, stock: 28, bestSeller: true,
    pairsWith: ["p-yogurt", "p-berries"],
  },
  {
    id: "p-origen-oats", name: "Avena en Grano KORA Origen", brand: "KORA_ORIGEN", category: "Despensa",
    price: 7400, unit: "Bolsa 500 g", imageKey: "origen-line",
    blurb: "Avena de grano cortado", tagline: "Grano cortado, textura real.",
    description: "Avena de grano cortado para overnight oats o porridge. Más fibra y textura que la avena instantánea.",
    highlights: ["Grano cortado", "Alta en fibra", "Sin aditivos"],
    rating: 4.7, reviews: 110, sold: 760, stock: 40,
    pairsWith: ["p-pulse-vanilla", "p-berries"],
  },
  {
    id: "p-origen-peanut", name: "Mantequilla de Maní KORA Origen", brand: "KORA_ORIGEN", category: "Despensa",
    price: 13500, compareAt: 15000, unit: "Frasco 350 g", imageKey: "origen-peanut",
    blurb: "100% maní · Sin aceites añadidos", tagline: "Solo maní. Nada más.",
    description: "Mantequilla de maní 100% — un solo ingrediente, sin aceites ni azúcares añadidos. Cremosa, untable y honesta.",
    highlights: ["100% maní", "Sin aceites añadidos", "Sin azúcar"],
    rating: 4.9, reviews: 240, sold: 1500, stock: 24, bestSeller: true,
    pairsWith: ["p-banano", "p-origen-oats"],
  },
  {
    id: "p-origen-quinoa", name: "Quinua Tricolor KORA Origen", brand: "KORA_ORIGEN", category: "Despensa",
    price: 9800, unit: "Bolsa 400 g", imageKey: "origen-quinoa",
    blurb: "Trazada al origen andino", tagline: "Tricolor, trazada al origen.",
    description: "Quinua tricolor andina, lavada y lista para cocer en 12 minutos. Proteína vegetal completa con textura perfecta.",
    highlights: ["Proteína vegetal completa", "Lista en 12 min", "Origen andino"],
    rating: 4.6, reviews: 64, sold: 380, stock: 30,
    pairsWith: ["p-chicken", "p-avocado"],
  },
  // ── Frescos ──
  {
    id: "p-avocado", name: "Aguacate Hass", brand: "STANDARD", category: "Frescos",
    price: 4200, unit: "1 unidad", imageKey: "fresh-avocado",
    blurb: "Punto perfecto de maduración", tagline: "En su punto perfecto, hoy.",
    description: "Aguacate Hass seleccionado a mano en punto de maduración. Cremoso y listo para tu bowl o tostada de hoy mismo.",
    highlights: ["Punto perfecto de maduración", "Seleccionado a mano", "Cosecha del día"],
    rating: 4.8, reviews: 420, sold: 3200, stock: 12, bestSeller: true, origin: "Cosechado hoy",
    pairsWith: ["p-eggs", "p-origen-peanut"],
  },
  {
    id: "p-spinach", name: "Espinaca Baby", brand: "STANDARD", category: "Frescos",
    price: 4800, unit: "Bolsa 150 g", imageKey: "fresh-spinach",
    blurb: "Hoja tierna · Lavada y lista", tagline: "Hoja tierna, lista para usar.",
    description: "Espinaca baby triple lavada, lista para tu smoothie o salteado. Hoja tierna y fresca del día.",
    highlights: ["Triple lavada", "Hoja tierna", "Lista para usar"],
    rating: 4.7, reviews: 150, sold: 980, stock: 16, origin: "Del día",
    pairsWith: ["p-eggs", "p-pulse-greens"],
  },
  {
    id: "p-berries", name: "Berries Andinos Mixtos", brand: "STANDARD", category: "Frescos",
    price: 8200, unit: "Caja 250 g", imageKey: "fresh-berries",
    blurb: "Cosecha de altura", tagline: "Dulzor natural de altura.",
    description: "Mezcla de berries andinos — mora, fresa y arándano — de cultivos de altura. Antioxidantes y dulzor natural.",
    highlights: ["Cultivo de altura", "Ricos en antioxidantes", "Sin azúcar añadida"],
    rating: 4.8, reviews: 198, sold: 1100, stock: 14, bestSeller: true, origin: "Del día",
    pairsWith: ["p-yogurt", "p-origen-granola"],
  },
  {
    id: "p-banano", name: "Banano Orgánico", brand: "STANDARD", category: "Frescos",
    price: 3600, unit: "Racimo ~6", imageKey: "fresh-banano",
    blurb: "Energía limpia para el día", tagline: "Energía limpia para llevar.",
    description: "Banano orgánico, energía natural para antes o después de entrenar. Empácalo en tu maleta y listo.",
    highlights: ["Orgánico certificado", "Energía natural", "Listo para llevar"],
    rating: 4.6, reviews: 88, sold: 700, stock: 50,
    pairsWith: ["p-origen-peanut", "p-pulse-vanilla"],
  },
  // ── Proteínas ──
  {
    id: "p-chicken", name: "Pechuga de Pollo de Campo", brand: "STANDARD", category: "Proteínas",
    price: 14500, unit: "250 g", imageKey: "fresh-chicken",
    blurb: "Libre de hormonas", tagline: "Magra, libre de hormonas.",
    description: "Pechuga de pollo de campo, libre de hormonas y antibióticos. 54 g de proteína por porción para tus comidas de la semana.",
    highlights: ["Libre de hormonas", "54 g de proteína", "De campo"],
    rating: 4.8, reviews: 132, sold: 820, stock: 9, origin: "Fresco del día",
    pairsWith: ["p-origen-quinoa", "p-spinach"], macros: { calories: 280, protein: 54, carbs: 0, fats: 6 },
  },
  {
    id: "p-yogurt", name: "Yogur Griego 0%", brand: "STANDARD", category: "Proteínas",
    price: 7600, unit: "Vaso 200 g", imageKey: "fresh-yogurt",
    blurb: "Cultivos vivos · 18g Proteína", tagline: "Espeso, alto en proteína.",
    description: "Yogur griego 0% grasa, colado y espeso, con cultivos vivos y 18 g de proteína por vaso.",
    highlights: ["18 g de proteína", "0% grasa", "Cultivos vivos"],
    rating: 4.9, reviews: 260, sold: 1700, stock: 26, bestSeller: true,
    pairsWith: ["p-origen-granola", "p-berries"], macros: { calories: 120, protein: 18, carbs: 6, fats: 0 },
  },
  {
    id: "p-eggs", name: "Huevos de Campo x6", brand: "STANDARD", category: "Proteínas",
    price: 9200, unit: "Caja x6", imageKey: "fresh-eggs",
    blurb: "Gallinas libres", tagline: "Gallinas libres, yema intensa.",
    description: "Huevos de campo de gallinas libres, yema intensa y frescura garantizada. La proteína más versátil de tu nevera.",
    highlights: ["Gallinas libres", "Frescura garantizada", "Yema intensa"],
    rating: 4.7, reviews: 140, sold: 900, stock: 20,
    pairsWith: ["p-avocado", "p-spinach"],
  },
  // ── Bebidas ──
  {
    id: "p-coconut", name: "Agua de Coco", brand: "STANDARD", category: "Bebidas",
    price: 4300, unit: "Botella 330 ml", imageKey: "fresh-coconut",
    blurb: "Hidratación natural", tagline: "Hidratación natural, sin azúcar.",
    description: "Agua de coco pura, hidratación natural con electrolitos y sin azúcar añadida.",
    highlights: ["Electrolitos naturales", "Sin azúcar añadida", "100% agua de coco"],
    rating: 4.6, reviews: 96, sold: 600, stock: 34,
    pairsWith: ["p-pulse-greens"],
  },
  {
    id: "p-almond", name: "Leche de Almendra", brand: "STANDARD", category: "Bebidas",
    price: 5200, unit: "Litro", imageKey: "fresh-almond",
    blurb: "Sin azúcar añadida", tagline: "Cremosa, sin azúcar añadida.",
    description: "Leche de almendra sin azúcar añadida, ideal para tus smoothies y overnight oats. Cremosa y ligera.",
    highlights: ["Sin azúcar añadida", "Ligera y cremosa", "Ideal para smoothies"],
    rating: 4.6, reviews: 102, sold: 640, stock: 30,
    pairsWith: ["p-origen-oats", "p-pulse-vanilla"],
  },
];

export const productById = (id: string): Product | undefined => products.find((p) => p.id === id);

// Helpers de conversión.
export const pointsFor = (price: number): number => Math.round(price / 100); // puntos KORA Pass por compra
export const discountPct = (compareAt: number | undefined, price: number): number =>
  compareAt && compareAt > price ? Math.round((1 - price / compareAt) * 100) : 0;
export const bestSellers = (n = 6): Product[] => products.filter((p) => p.bestSeller).slice(0, n);
export const relatedProducts = (product: Product, n = 4): Product[] =>
  products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, n);
export const pairedProducts = (product: Product): Product[] =>
  (product.pairsWith || []).map(productById).filter((p): p is Product => Boolean(p));

// Recetas que usan un producto. Por convención el id de ingrediente es el id
// de producto sin el prefijo "p-"; el mapa cubre los casos que difieren.
const PRODUCT_INGREDIENT_IDS: Record<string, string> = {
  "p-chicken": "chicken-breast",
  "p-yogurt": "greek-yogurt",
  "p-coconut": "coconut-water",
  "p-almond": "almond-milk",
};

export const recipesWithProduct = (productId: string): Recipe[] => {
  const ingredientId = PRODUCT_INGREDIENT_IDS[productId] || productId.replace(/^p-/, "");
  return recipes.filter((r) => r.ingredients.some((i) => i.id === ingredientId));
};

// Reseñas (dummy) — prueba social. Se rotan por producto para variar.
export const productReviews: ProductReview[] = [
  { name: "Mateo G.", initials: "MG", rating: 5, date: "hace 3 días", title: "Mi compra fija de la semana", text: "Frescura impecable y llegó listo para recoger en 10 minutos. La calidad se nota apenas lo abres." },
  { name: "Valentina R.", initials: "VR", rating: 5, date: "hace 1 semana", title: "Calidad premium real", text: "Se siente como un mercado boutique. El producto es honesto, sin azúcares raros, y el empaque es hermoso." },
  { name: "Daniela P.", initials: "DP", rating: 4, date: "hace 2 semanas", title: "Excelente, repito", text: "Cumple justo lo que promete en macros. Volvería a comprarlo sin pensarlo, ideal para el post-entreno." },
  { name: "Andrés M.", initials: "AM", rating: 5, date: "hace 4 días", title: "Vale cada peso", text: "Lo uso a diario. Limpio, fresco y la app hace todo el proceso sin fricción. Recomendado." },
  { name: "Camila S.", initials: "CS", rating: 5, date: "hace 5 días", title: "Mi nuevo favorito", text: "Sabor real, nada artificial. Se nota el cuidado en la selección. KORA se volvió mi parada obligada." },
  { name: "Sebastián T.", initials: "ST", rating: 4, date: "hace 3 semanas", title: "Muy recomendado", text: "Buen tamaño de porción y frescura garantizada. La recogida camino a casa es lo mejor." },
];

export const reviewsForProduct = (id: string, n = 3): ProductReview[] => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const start = h % productReviews.length;
  return Array.from({ length: n }, (_, i) => productReviews[(start + i) % productReviews.length]);
};
