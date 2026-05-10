import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/lib/design-system";

export const metadata: Metadata = {
  title: "ĀRŪḾA | Reserva tu sesión",
  description: "Espacio íntimo y seguro para sesiones fotográficas auténticas. Reserva online en segundos, con total privacidad y protección de tus datos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-[#0A0A0A] text-[#F5F5F7]">
        <Header
          navigation={[
            { label: "Servicios", href: "#servicios" },
            { label: "Proceso", href: "#proceso" },
            { label: "Reservar", href: "#reserva" },
          ]}
        />
        <div className="flex-1">{children}</div>
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
      </body>
    </html>
  );
}
