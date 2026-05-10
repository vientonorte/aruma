import { Hero, BentoGrid, BookingForm } from "@/lib/design-system";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10">
      <Hero
        title="ĀRŪḾA"
        subtitle="High-End Booking & Identity"
        description="Experiencia de reserva premium con enfoque Mobile First, accesibilidad universal y seguridad por diseño."
        variant="botanical"
      />

      <BentoGrid
        columns={4}
        items={[
          {
            title: "Security by Design",
            description: "Validación de esquemas, sanitización anti-XSS y flujo de consentimiento explícito GDPR/LOPD.",
            span: 2,
            variant: "botanical",
          },
          {
            title: "A11y WCAG 2.1 AA",
            description: "Navegación por teclado, estados de foco visibles y contraste optimizado para fondos oscuros.",
            span: 1,
          },
          {
            title: "API Routes Seguras",
            description: "Integración de calendario encapsulada del lado servidor para proteger credenciales.",
            span: 1,
          },
        ]}
      />

      <BookingForm variant="botanical" />
    </main>
  );
}
