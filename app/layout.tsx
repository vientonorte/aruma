import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ĀRŪḾA | Secure Booking",
  description: "SPA de reservas premium con seguridad por diseño y accesibilidad universal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-[#0A0A0A] text-[#F5F5F7]">{children}</body>
    </html>
  );
}
