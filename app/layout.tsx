import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { SavedRecipesProvider } from "@/components/SavedRecipesProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "KORA — Foods & Provisions",
  description:
    "Nutrición de conveniencia, urbana y tecnológica. Recetas con macros calculados, bundles de ingredientes en un clic y recogida o domicilio sin fricción en Bogotá.",
  metadataBase: new URL("https://kora.example"),
  openGraph: {
    title: "KORA — Foods & Provisions",
    description: "Macros limpios. Orígenes premium. Cero fricción.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F5F0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={roboto.variable}>
      <body className="min-h-screen font-sans antialiased">
        <CartProvider>
          <SavedRecipesProvider>
            <Nav />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
          </SavedRecipesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
