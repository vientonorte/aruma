import { SecureBooking } from "@/components/secure-booking";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 rounded-2xl border border-[#2F2F31] bg-[#1C1C1E] p-5 sm:mb-8 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[#86868B]">High-End Booking & Identity</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[0.3em] text-[#F5F5F7] sm:text-5xl">ĀRŪḾA</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#86868B] sm:text-base">
          Experiencia de reserva premium con enfoque Mobile First, accesibilidad universal y seguridad por diseño.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Bento grid de servicios">
        <article className="rounded-2xl border border-[#2F2F31] bg-[#1C1C1E] p-5 lg:col-span-2" aria-label="Principios de seguridad">
          <h2 className="text-lg font-medium text-[#F5F5F7]">Security by Design</h2>
          <p className="mt-2 text-sm leading-6 text-[#86868B]">
            Validación de esquemas, sanitización anti-XSS y flujo de consentimiento explícito GDPR/LOPD.
          </p>
        </article>

        <article className="rounded-2xl border border-[#2F2F31] bg-[#1C1C1E] p-5" aria-label="Accesibilidad">
          <h2 className="text-lg font-medium text-[#F5F5F7]">A11y WCAG 2.1 AA</h2>
          <p className="mt-2 text-sm leading-6 text-[#86868B]">
            Navegación por teclado, estados de foco visibles y contraste optimizado para fondos oscuros.
          </p>
        </article>

        <article className="rounded-2xl border border-[#2F2F31] bg-[#1C1C1E] p-5" aria-label="Integración segura">
          <h2 className="text-lg font-medium text-[#F5F5F7]">API Routes Seguras</h2>
          <p className="mt-2 text-sm leading-6 text-[#86868B]">
            Integración de calendario encapsulada del lado servidor para proteger credenciales.
          </p>
        </article>

        <div className="sm:col-span-2 lg:col-span-4">
          <SecureBooking />
        </div>
      </section>
    </main>
  );
}
