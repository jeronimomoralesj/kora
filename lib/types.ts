// ─────────────────────────────────────────────────────────────
// KORA — tipos de dominio compartidos.
// Una sola fuente de verdad para las formas de datos del catálogo,
// recetas, nodos, membresía y canasta.
// ─────────────────────────────────────────────────────────────

export type BrandKey = "PULSE" | "KORA_ORIGEN" | "STANDARD";

export interface Brand {
  name: string;
  proprietary: boolean;
  tag: string;
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Ingredient {
  id: string;
  name: string;
  brand: BrandKey;
  qty: string;
  price: number;
  owned: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  prepTime: number;
  imageKey: string;
  tags: string[];
  macros: Macros;
  blurb: string;
  story: string;
  ingredients: Ingredient[];
}

export interface RecipeStep {
  title: string;
  time: string;
  body: string;
  imageKey: string;
}

export interface RecipeStepsInfo {
  servings: number;
  difficulty: string;
  steps: RecipeStep[];
}

export interface Product {
  id: string;
  name: string;
  brand: BrandKey;
  category: string;
  price: number;
  compareAt?: number;
  unit: string;
  imageKey: string;
  blurb?: string;
  tagline?: string;
  description?: string;
  highlights?: string[];
  rating?: number;
  reviews?: number;
  sold?: number;
  stock?: number;
  bestSeller?: boolean;
  isNew?: boolean;
  origin?: string;
  pairsWith?: string[];
  macros?: Macros;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  hours: string;
  readyMins: number;
  slots: string[];
  note: string;
  open: boolean;
  area?: string;
  streets: { v: string; h: string };
  blurb?: string;
  features?: string[];
}

export interface DeliveryWindow {
  id: string;
  label: string;
  eta: string;
  price: number;
}

export interface MemberOrder {
  id: string;
  date: string;
  channel: string;
  total: number;
  items: number;
}

export interface Member {
  name: string;
  handle: string;
  phone: string;
  passId: string;
  tier: string;
  points: number;
  joined: string;
  streak: number;
  history: MemberOrder[];
}

export interface ProductReview {
  name: string;
  initials: string;
  rating: number;
  date: string;
  title: string;
  text: string;
}

// ── Canasta ──
// Lo que un componente envía al agregar; `qty` (cantidad) lo gestiona el provider.
export interface CartItemInput {
  id: string;
  name: string;
  price: number;
  brand: BrandKey;
  unit?: string;
  recipe?: string;
  count?: number;
}

export interface CartItem extends CartItemInput {
  qty: number;
  bundleId?: string;
}
