import {
  Hero,
  Card,
  Heading,
  Text,
  Overline,
  GoogleBookingPanel,
  GoogleMapsSection,
  GoogleFeaturesStrip,
} from "@/lib/design-system";
import { ArtesSection } from "@/components/artes-section";
import { FlashGhibliTechSection } from "@/components/flash-ghibli-tech-section";

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Elige tu práctica',
    description: 'Tatuaje, shibari, fotografía o sesión dom. Abre la agenda y reserva el cupo.',
  },
  {
    step: '02',
    title: 'Acuerdos antes',
    description: 'Límites, consentimiento y cuidados quedan claros antes de empezar.',
  },
  {
    step: '03',
    title: 'La sesión',
    description: 'Un espacio sin prisas. Si la práctica incluye fotografía, la galería editada llega en 72 horas.',
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-10 sm:gap-20 sm:px-6 sm:py-14 lg:px-8">

      <Hero
        title="ĀRŪḾA"
        subtitle="Espacio para la Exploración Visual"
        description="Tatuaje, shibari, fotografía y sesiones dom en un espacio cuidado. Reserva en tus términos, con acuerdos claros y protección de tus datos."
        variant="botanical"
        primaryAction={{ label: "Reservar ahora", href: "#reserva" }}
        secondaryAction={{ label: "Ver las cuatro artes", href: "#servicios" }}
      />

      <GoogleFeaturesStrip />

      <ArtesSection />

      <FlashGhibliTechSection />

      <section id="proceso" aria-labelledby="proceso-heading">
        <div className="mb-8 text-center">
          <Overline>Así de sencillo</Overline>
          <Heading as="h2" id="proceso-heading" className="mt-2 text-2xl sm:text-3xl">
            Tres pasos para tu sesión
          </Heading>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {PROCESS_STEPS.map((step, index) => (
            <Card
              key={step.step}
              variant="default"
              className="h-full"
              transition={{ delay: index * 0.12, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <span
                className="text-3xl font-bold tracking-tight text-[#3D9461]"
                aria-label={`Paso ${step.step}`}
              >
                {step.step}
              </span>
              <Heading as="h3" className="mt-3 text-lg font-semibold">
                {step.title}
              </Heading>
              <Text size="sm" muted className="mt-2">
                {step.description}
              </Text>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="reserva"
        aria-labelledby="reserva-heading"
        className="scroll-mt-24 rounded-2xl border border-[#2F2F31]/80 bg-[#121214]/40 px-4 py-10 sm:scroll-mt-28 sm:px-8 sm:py-14"
      >
        <div className="mb-8 text-center sm:mb-10">
          <Overline>Da el primer paso</Overline>
          <Heading as="h2" id="reserva-heading" className="mt-2 text-2xl sm:text-3xl">
            Reserva tu sesión
          </Heading>
          <Text size="sm" muted className="mx-auto mt-3 max-w-md px-1">
            Proceso seguro y confidencial. Con agenda Google activa eliges fecha en Calendar;
            si aún se reconfigura, puedes escribir por correo con el detalle de la sesión.
          </Text>
        </div>
        <div className="mx-auto w-full max-w-2xl px-0 sm:px-2">
          <GoogleBookingPanel />
        </div>
      </section>

      <GoogleMapsSection />

    </main>
  );
}
