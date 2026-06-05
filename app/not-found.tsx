import Link from "next/link";

export default function NotFound() {
  return (
    <div className="kora-shell flex flex-col items-center justify-center py-32 text-center">
      <p className="text-7xl font-black tracking-tightest text-moss">404</p>
      <h1 className="mt-3 text-2xl font-bold text-moss">Este estante está vacío</h1>
      <p className="mt-2 max-w-sm text-charcoal/55">
        La página que buscas no está en el pasillo. Vuelve a la tienda.
      </p>
      <Link href="/tienda" className="kora-cta mt-6">Volver a la tienda</Link>
    </div>
  );
}
