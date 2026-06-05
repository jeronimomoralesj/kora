// ─────────────────────────────────────────────────────────────
// KORA — capa de datos dummy (placeholder)
// Todos los valores son de prueba. Los datos reales vendrán de las
// APIs de comercio + nutrición. La fotografía se referencia por
// `imageKey` (ver app/image-format para el contrato de assets).
// ─────────────────────────────────────────────────────────────
import type {
  Brand,
  BrandKey,
  DeliveryWindow,
  Member,
  Recipe,
  RecipeStepsInfo,
  Store,
} from "@/lib/types";

// Las banderas de marca permiten a la UI separar las líneas propias de
// KORA (PULSE, KORA Origen) de productos de terceros / estándar.
export const BRANDS: Record<BrandKey, Brand> = {
  PULSE: { name: "PULSE", proprietary: true, tag: "Rendimiento KORA" },
  KORA_ORIGEN: { name: "KORA Origen", proprietary: true, tag: "Provisiones KORA" },
  STANDARD: { name: "Mercado", proprietary: false, tag: "Mercado Fresco" },
};

// imageKey → semilla de degradado determinista usada por el placeholder <Photo />.
// Cuando llegue la fotografía real, el mismo imageKey mapea a una ruta de archivo.
export const recipes: Recipe[] = [
  {
    id: "andean-protein-bowl",
    title: "Bowl Andino de Proteína",
    subtitle: "Quinua, pollo a la parrilla y aguacate",
    prepTime: 12,
    imageKey: "bowl-green",
    tags: ["Post-Entreno", "Alta Proteína", "Sin Gluten"],
    macros: { calories: 540, protein: 38, carbs: 46, fats: 18 },
    blurb: "38g Proteína. 0g Azúcar Añadida. Ingredientes Crudos.",
    story:
      "Hecho para el camino a casa después de entrenar. Quinua andina, pechuga de pollo magra y aguacate Hass — armado en lo que tardas en llenar tu botella.",
    ingredients: [
      { id: "pulse-recovery", name: "Batido PULSE Recovery", brand: "PULSE", qty: "1 botella", price: 12900, owned: false },
      { id: "origen-quinoa", name: "Quinua Tricolor KORA Origen", brand: "KORA_ORIGEN", qty: "200 g", price: 9800, owned: false },
      { id: "chicken-breast", name: "Pechuga de Pollo de Campo", brand: "STANDARD", qty: "250 g", price: 14500, owned: false },
      { id: "avocado", name: "Aguacate Hass", brand: "STANDARD", qty: "1 unidad", price: 4200, owned: false },
      { id: "cherry-tomato", name: "Tomates Cherry", brand: "STANDARD", qty: "150 g", price: 5600, owned: false },
      { id: "olive-oil", name: "Aceite de Oliva Extra Virgen", brand: "STANDARD", qty: "30 ml", price: 3200, owned: true },
    ],
  },
  {
    id: "pulse-overnight-oats",
    title: "Avena Nocturna PULSE",
    subtitle: "Avena lenta, berries y nibs de cacao",
    prepTime: 5,
    imageKey: "oats-cream",
    tags: ["Desayuno", "Alta Proteína", "Bajo en Carbos"],
    macros: { calories: 410, protein: 30, carbs: 38, fats: 12 },
    blurb: "30g Proteína. 0g Azúcar Añadida. Remojada toda la noche.",
    story:
      "Prepárala hoy, recógela mañana. Proteína PULSE integrada en avena de remojo lento con berries andinos y nibs de cacao crudo.",
    ingredients: [
      { id: "pulse-vanilla", name: "Proteína Vainilla PULSE", brand: "PULSE", qty: "1 medida", price: 8900, owned: false },
      { id: "origen-oats", name: "Avena en Grano KORA Origen", brand: "KORA_ORIGEN", qty: "80 g", price: 7400, owned: false },
      { id: "berries", name: "Berries Andinos Mixtos", brand: "STANDARD", qty: "120 g", price: 8200, owned: false },
      { id: "cacao-nibs", name: "Nibs de Cacao Crudo", brand: "STANDARD", qty: "20 g", price: 4600, owned: false },
      { id: "almond-milk", name: "Leche de Almendra", brand: "STANDARD", qty: "150 ml", price: 5200, owned: false },
    ],
  },
  {
    id: "green-reset-smoothie",
    title: "Smoothie Verde Reset",
    subtitle: "Espinaca, mango y PULSE Greens",
    prepTime: 4,
    imageKey: "smoothie-green",
    tags: ["Bajo en Carbos", "Detox", "Vegano"],
    macros: { calories: 280, protein: 22, carbs: 30, fats: 6 },
    blurb: "22g Proteína. 0g Lácteos. Prensado en frío.",
    story:
      "Tu reset entre reuniones. Espinaca fría, mango maduro y PULSE Greens licuados en un golpe de macros limpio y bebible.",
    ingredients: [
      { id: "pulse-greens", name: "Mezcla PULSE Greens", brand: "PULSE", qty: "1 medida", price: 9900, owned: false },
      { id: "origen-flax", name: "Linaza Dorada KORA Origen", brand: "KORA_ORIGEN", qty: "15 g", price: 6100, owned: false },
      { id: "spinach", name: "Espinaca Baby", brand: "STANDARD", qty: "60 g", price: 4800, owned: false },
      { id: "mango", name: "Mango Congelado", brand: "STANDARD", qty: "120 g", price: 5400, owned: false },
      { id: "coconut-water", name: "Agua de Coco", brand: "STANDARD", qty: "200 ml", price: 4300, owned: true },
    ],
  },
  {
    id: "moss-power-wrap",
    title: "Wrap Power Moss",
    subtitle: "Hummus, falafel y slaw encurtido",
    prepTime: 9,
    imageKey: "wrap-earth",
    tags: ["Almuerzo", "Vegano", "Alta Fibra"],
    macros: { calories: 480, protein: 24, carbs: 52, fats: 16 },
    blurb: "24g Proteína. 11g Fibra. Solo plantas.",
    story:
      "Un almuerzo de mano que viaja contigo. Hummus de piedra, falafel al horno y slaw encurtido brillante envueltos en pan plano germinado.",
    ingredients: [
      { id: "origen-flatbread", name: "Pan Plano Germinado KORA Origen", brand: "KORA_ORIGEN", qty: "2 unidades", price: 8700, owned: false },
      { id: "origen-hummus", name: "Hummus Artesanal KORA Origen", brand: "KORA_ORIGEN", qty: "120 g", price: 7900, owned: false },
      { id: "falafel", name: "Falafel al Horno", brand: "STANDARD", qty: "6 unidades", price: 9300, owned: false },
      { id: "slaw", name: "Slaw Rojo Encurtido", brand: "STANDARD", qty: "80 g", price: 4900, owned: false },
    ],
  },
  {
    id: "origen-granola-jar",
    title: "Frasco de Granola KORA Origen",
    subtitle: "Yogur griego, granola y miel",
    prepTime: 3,
    imageKey: "granola-amber",
    tags: ["Desayuno", "Alta Proteína", "Rápido"],
    macros: { calories: 390, protein: 28, carbs: 40, fats: 11 },
    blurb: "28g Proteína. Cultivos vivos. Servido en 3 min.",
    story:
      "El golpe de macros más rápido del menú. Yogur griego espeso en capas con granola KORA Origen y un hilo de miel cruda de páramo.",
    ingredients: [
      { id: "origen-granola", name: "Granola Tostada KORA Origen", brand: "KORA_ORIGEN", qty: "60 g", price: 10400, owned: false },
      { id: "greek-yogurt", name: "Yogur Griego 0%", brand: "STANDARD", qty: "200 g", price: 7600, owned: false },
      { id: "honey", name: "Miel de Páramo Cruda", brand: "STANDARD", qty: "15 g", price: 5100, owned: false },
      { id: "walnuts", name: "Nueces Tostadas", brand: "STANDARD", qty: "20 g", price: 6200, owned: true },
    ],
  },
  {
    id: "sprout-power-salad",
    title: "Ensalada Sprout Power",
    subtitle: "Lentejas, remolacha y aderezo cítrico",
    prepTime: 8,
    imageKey: "salad-bright",
    tags: ["Almuerzo", "Bajo en Carbos", "Alta Fibra"],
    macros: { calories: 350, protein: 21, carbs: 34, fats: 13 },
    blurb: "21g Proteína. 9g Fibra. Cítrica y brillante.",
    story:
      "Fría, crocante y silenciosamente saciante. Lentejas germinadas, remolacha asada y un aderezo cítrico que mantiene la tarde afilada.",
    ingredients: [
      { id: "origen-lentils", name: "Lentejas Germinadas KORA Origen", brand: "KORA_ORIGEN", qty: "150 g", price: 8100, owned: false },
      { id: "pulse-collagen", name: "Colágeno Cítrico PULSE", brand: "PULSE", qty: "1 medida", price: 11200, owned: false },
      { id: "beet", name: "Remolacha Asada", brand: "STANDARD", qty: "100 g", price: 4400, owned: false },
      { id: "mixed-greens", name: "Mezcla de Verdes", brand: "STANDARD", qty: "80 g", price: 5300, owned: false },
      { id: "citrus", name: "Aderezo Cítrico y Mostaza", brand: "STANDARD", qty: "30 ml", price: 3900, owned: false },
    ],
  },
];

export const recipeById = (id: string): Recipe | undefined => recipes.find((r) => r.id === id);

// Pasos de preparación por receta (dummy). Cada paso referencia su propia foto
// vía imageKey (placeholder hasta que llegue la fotografía real).
export const recipeSteps: Record<string, RecipeStepsInfo> = {
  "andean-protein-bowl": {
    servings: 1,
    difficulty: "Fácil",
    steps: [
      { title: "Cocina la quinua", time: "12 min", body: "Enjuaga 200 g de quinua tricolor y cuécela en agua con sal hasta que esté esponjosa. Escurre y reserva.", imageKey: "andean-protein-bowl-1" },
      { title: "Sella el pollo", time: "8 min", body: "Salpimienta la pechuga y séllala a fuego alto 4 minutos por lado hasta dorar. Deja reposar y corta en láminas.", imageKey: "andean-protein-bowl-2" },
      { title: "Prepara los frescos", time: "3 min", body: "Corta el aguacate Hass en láminas y los tomates cherry por la mitad.", imageKey: "andean-protein-bowl-3" },
      { title: "Arma el bowl", time: "2 min", body: "Sirve la quinua de base, acomoda pollo, aguacate y tomate, rocía aceite de oliva y acompaña con tu Batido PULSE.", imageKey: "andean-protein-bowl-4" },
    ],
  },
  "pulse-overnight-oats": {
    servings: 1,
    difficulty: "Muy fácil",
    steps: [
      { title: "Mezcla la base", time: "2 min", body: "Combina 80 g de avena, 1 medida de Proteína Vainilla PULSE y 150 ml de leche de almendra en un frasco.", imageKey: "pulse-overnight-oats-1" },
      { title: "Suma sabor", time: "1 min", body: "Agrega los berries andinos y los nibs de cacao crudo. Mezcla bien.", imageKey: "pulse-overnight-oats-2" },
      { title: "Refrigera toda la noche", time: "6 h", body: "Tapa el frasco y deja en la nevera mínimo 6 horas para que la avena se hidrate.", imageKey: "pulse-overnight-oats-3" },
      { title: "Sirve y listo", time: "1 min", body: "En la mañana, remueve, corona con más berries y llévala para tu camino.", imageKey: "pulse-overnight-oats-4" },
    ],
  },
  "green-reset-smoothie": {
    servings: 1,
    difficulty: "Muy fácil",
    steps: [
      { title: "Reúne los verdes", time: "2 min", body: "Pon espinaca baby, mango congelado y agua de coco en la licuadora.", imageKey: "green-reset-smoothie-1" },
      { title: "Suma el boost", time: "1 min", body: "Agrega 1 medida de PULSE Greens y la linaza dorada KORA Origen.", imageKey: "green-reset-smoothie-2" },
      { title: "Licúa cremoso", time: "1 min", body: "Licúa 45 segundos hasta lograr una textura suave y homogénea.", imageKey: "green-reset-smoothie-3" },
      { title: "Sirve frío", time: "1 min", body: "Vierte en tu vaso y bebe de inmediato para el máximo frescor.", imageKey: "green-reset-smoothie-4" },
    ],
  },
  "moss-power-wrap": {
    servings: 1,
    difficulty: "Fácil",
    steps: [
      { title: "Calienta el pan", time: "2 min", body: "Tuesta ligeramente el pan plano germinado en una sartén caliente hasta que esté flexible.", imageKey: "moss-power-wrap-1" },
      { title: "Unta el hummus", time: "1 min", body: "Extiende una capa generosa de Hummus Artesanal KORA Origen sobre el pan.", imageKey: "moss-power-wrap-2" },
      { title: "Rellena", time: "2 min", body: "Coloca el falafel al horno y el slaw rojo encurtido a lo largo del centro.", imageKey: "moss-power-wrap-3" },
      { title: "Envuelve y corta", time: "2 min", body: "Enrolla firme, corta en diagonal y empácalo para llevar.", imageKey: "moss-power-wrap-4" },
    ],
  },
  "origen-granola-jar": {
    servings: 1,
    difficulty: "Muy fácil",
    steps: [
      { title: "Primera capa", time: "1 min", body: "Pon una base de yogur griego 0% en el fondo del frasco.", imageKey: "origen-granola-jar-1" },
      { title: "Suma la granola", time: "1 min", body: "Agrega una capa generosa de Granola Tostada KORA Origen.", imageKey: "origen-granola-jar-2" },
      { title: "Repite capas", time: "1 min", body: "Alterna yogur y granola hasta llenar el frasco.", imageKey: "origen-granola-jar-3" },
      { title: "Corona con miel", time: "1 min", body: "Termina con un hilo de miel cruda de páramo y nueces tostadas.", imageKey: "origen-granola-jar-4" },
    ],
  },
  "sprout-power-salad": {
    servings: 1,
    difficulty: "Fácil",
    steps: [
      { title: "Cocina las lentejas", time: "10 min", body: "Cuece las lentejas germinadas KORA Origen 10 minutos y enfría.", imageKey: "sprout-power-salad-1" },
      { title: "Corta la remolacha", time: "3 min", body: "Corta la remolacha asada en cubos parejos.", imageKey: "sprout-power-salad-2" },
      { title: "Prepara el aderezo", time: "2 min", body: "Mezcla el aderezo cítrico y mostaza con 1 medida de Colágeno Cítrico PULSE.", imageKey: "sprout-power-salad-3" },
      { title: "Mezcla todo", time: "2 min", body: "Combina la mezcla de verdes, lentejas y remolacha; baña con el aderezo y sirve.", imageKey: "sprout-power-salad-4" },
    ],
  },
};

export const stepsForRecipe = (id: string): RecipeStepsInfo =>
  recipeSteps[id] || { servings: 1, difficulty: "Fácil", steps: [] };

// Chips de filtro de la sección de recetas.
export const recipeFilters: string[] = [
  "Todas",
  "Post-Entreno",
  "Alta Proteína",
  "Bajo en Carbos",
  "Desayuno",
  "Vegano",
  "Almuerzo",
];

// Nodos (tiendas físicas). Hoy solo Quinta Camacho está abierto; los demás
// están en camino. `streets` alimenta el mapa estilizado de /nodos/[id].
export const stores: Store[] = [
  {
    id: "quinta-camacho",
    name: "Quinta Camacho",
    address: "Cra. 7 #70-21, Bogotá",
    hours: "07:00 – 21:00",
    readyMins: 10,
    slots: ["Listo en 10 min", "12:30", "13:00", "18:15", "19:00"],
    note: "Listo en 10 minutos para tu camino a casa",
    open: true,
    area: "100 m²",
    streets: { v: "Carrera 7", h: "Calle 70" },
    blurb:
      "Nuestro primer nodo: 10 × 10 metros de mercado fresco diseñados para que entres, elijas y salgas en minutos — con la calma de una galería.",
    features: [
      "Isla de frescos del día en madera de nogal",
      "Panadería horneada en sitio, cada mañana",
      "Barra de café de especialidad — solo para llevar",
      "Jardín vertical vivo como acento de pared",
      "Precios en pantallas digitales, siempre al día",
      "Góndolas bajas — línea de visión completa del local",
      "Neveras multideck abiertas de bebidas y proteínas",
      "Zona de descompresión al entrar — sin afán",
    ],
  },
  {
    id: "teusaquillo",
    name: "Teusaquillo",
    address: "Cl. 39 #19-45, Bogotá",
    hours: "07:00 – 20:00",
    readyMins: 12,
    slots: ["Listo en 12 min", "12:45", "13:15", "17:45", "18:30"],
    note: "En tu ruta desde la universidad",
    open: false,
    streets: { v: "Carrera 19", h: "Calle 39" },
    blurb: "El segundo nodo, en tu ruta desde la universidad. Muy pronto.",
  },
  {
    id: "chapinero-alto",
    name: "Chapinero Alto",
    address: "Cl. 60 #5-08, Bogotá",
    hours: "06:30 – 21:30",
    readyMins: 9,
    slots: ["Listo en 9 min", "12:15", "13:30", "18:00", "19:45"],
    note: "Abre más temprano — recogidas pre-gym",
    open: false,
    streets: { v: "Carrera 5", h: "Calle 60" },
    blurb: "Abre más temprano para tus recogidas pre-gym. En camino.",
  },
];

export const storeById = (id: string): Store | undefined => stores.find((s) => s.id === id);

// Ventanas de entrega para domicilio local rápido.
export const deliveryWindows: DeliveryWindow[] = [
  { id: "express", label: "Express", eta: "25–35 min", price: 6900 },
  { id: "standard", label: "Estándar", eta: "45–60 min", price: 3900 },
  { id: "scheduled", label: "Programado", eta: "Elige una hora", price: 2900 },
];

// El miembro con sesión iniciada (dummy).
export const member: Member = {
  name: "Valentina Ríos",
  handle: "@valen.rios",
  phone: "3001234567", // identificador KORA Pass de 10 dígitos
  passId: "KORA-3001234567",
  tier: "Sprout",
  points: 1480,
  joined: "2025-09",
  streak: 7,
  history: [
    { id: "o-1042", date: "2026-06-02", channel: "En tienda · Quinta Camacho", total: 38400, items: 4 },
    { id: "o-1037", date: "2026-05-29", channel: "Domicilio · Teusaquillo", total: 26100, items: 3 },
    { id: "o-1031", date: "2026-05-24", channel: "En tienda · Chapinero Alto", total: 19800, items: 2 },
    { id: "o-1024", date: "2026-05-20", channel: "Recogida · Quinta Camacho", total: 44900, items: 5 },
  ],
};

// Helper de moneda — pesos colombianos, sin decimales.
export const cop = (value: number): string =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

// Descuento de bundle aplicado al agregar una receta completa de una vez.
export const BUNDLE_DISCOUNT = 0.1; // capa de descuento del 10%
