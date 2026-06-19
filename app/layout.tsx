import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
import { Header, Footer, MotionProvider } from "@/lib/design-system";
import { buildLocalBusinessJsonLd, buildWebSiteJsonLd } from "@/lib/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vientonorte.github.io/aruma";
const SITE_DESCRIPTION =
  "Espacio íntimo y seguro para sesiones fotográficas auténticas. Reserva online con Google Calendar en segundos, con total privacidad y protección de tus datos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ĀRŪḾA | Estudio fotográfico — Reserva con Google Calendar",
    template: "%s | ĀRŪḾA",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "estudio fotográfico",
    "sesión fotográfica íntima",
    "reserva online",
    "Google Calendar",
    "Santiago Chile",
    "ĀRŪḾA",
    "ARUMA",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "ĀRŪḾA",
    title: "ĀRŪḾA | Estudio fotográfico & espacio seguro",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "ĀRŪḾA | Estudio fotográfico & espacio seguro",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const structuredData = [buildLocalBusinessJsonLd(), buildWebSiteJsonLd()];

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
            { label: "Ubicación", href: "#ubicacion" },
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
                { label: "Ubicación", href: "#ubicacion" },
              ],
            },
            {
              title: "Legal",
              items: [
                { label: "Política de privacidad", href: "/privacidad" },
                { label: "Términos de uso", href: "/terminos" },
              ],
            },
          ]}
        />
        </MotionProvider>
      </body>
    </html>
  );
}