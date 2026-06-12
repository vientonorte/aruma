import type { NextConfig } from "next";

// Sitio 100 % estático para GitHub Pages (vientonorte.github.io/aruma).
// No hay servidor: las reservas se gestionan con la página de citas de
// Google Calendar (ver lib/brand.config.ts → bookingUrl).
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aruma",
  images: { unoptimized: true },
};

export default nextConfig;
