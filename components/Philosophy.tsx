// Reduccionismo Radical — la filosofía de diseño, y las tres sensaciones que
// cada punto de contacto KORA debe evocar.
export default function Philosophy() {
  return (
    <section className="bg-moss text-alabaster">
      <div className="kora-shell py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="kora-eyebrow text-sprout-light">Filosofía de diseño</p>
            <h2 className="mt-3 text-3xl font-bold leading-[1.08] tracking-tightest sm:text-5xl">
              Reduccionismo Radical.
              <span className="block text-alabaster/55">Un oasis de calma, por diseño.</span>
            </h2>
          </div>
          <p className="text-alabaster/70 lg:col-span-5">
            El retail tradicional vive del caos visual — etiquetas de descuento,
            desorden, ruido sensorial. Nosotros hacemos exactamente lo opuesto. Lo
            premium no nace de materiales llamativos, sino de la luz, la geometría
            estricta y la presentación meticulosa. Un nuevo estándar del fresco
            premium en Latinoamérica.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-kora border border-alabaster/10 sm:grid-cols-3">
          {(
            [
              ["Eficiencia sin fricción", "Cada recorrido — en caja o en el carrito — es rápido y sin esfuerzo. Un toque agrega un bundle completo y balanceado.", "01"],
              ["Calma visual", "Alabastro cálido, nogal y tipografía limpia ofrecen una pausa del caos de la ciudad.", "02"],
              ["Confianza total", "Macros transparentes, frescura visible y etiquetas limpias hacen que elegir KORA se sienta inteligente y sano.", "03"],
            ] as [title: string, body: string, n: string][]
          ).map(([title, body, n]) => (
            <div key={title} className="bg-moss-900/40 p-7">
              <span className="text-xs font-bold tracking-wide3 text-sprout-light">{n}</span>
              <h3 className="mt-3 text-xl font-bold text-alabaster">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-alabaster/65">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
