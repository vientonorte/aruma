import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Fuente secundaria oficial de la marca (lámina de identidad ARUMA).
const inter = Inter({ subsets: ["latin"], display: "swap" });
import { Header, Footer, MotionProvider } from "@/lib/design-system";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aruma-khuromutups-projects.vercel.app";
const SITE_DESCRIPTION =
  "Espacio íntimo y seguro para sesiones fotográficas auténticas. Reserva online en segundos, con total privacidad y protección de tus datos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ĀRŪḾA | Estudio fotográfico — Reserva tu sesión",
    template: "%s | ĀRŪḾA",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "ĀRŪḾA",
    title: "ĀRŪḾA | Estudio fotográfico & espacio seguro",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "ĀRŪḾA | Estudio fotográfico & espacio seguro",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ĀRŪḾA",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressCountry: "CL" },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth antialiased">
      <body className={`${inter.className} flex min-h-full flex-col bg-[#0A0A0A] text-[#F5F5F7]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#F5F0E8] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Saltar al contenido principal
        </a>
        <MotionProvider>
        <Header
          navigation={[
            { label: "Servicios", href: "#servicios" },
            { label: "Proceso", href: "#proceso" },
            { label: "Reservar", href: "#reserva" },
            { label: "Design System →", href: "/brand" },
          ]}
        />
        <div className="flex-1" id="contenido">{children}</div>
        <Footer
          links={[
            {
              title: "Servicios",
              items: [
                { label: "Sesión fotográfica", href: "#servicios" },
                { label: "Reservar sesión", href: "#reserva" },
              ],
            },
            {
              title: "Legal",
              items: [
                // TODO: add dedicated /privacidad and /terminos pages
                { label: "Política de privacidad", href: "#" },
                { label: "Términos de uso", href: "#" },
              ],
            },
          ]}
        />
        </MotionProvider>
      </body>
    </html>
  );
}
