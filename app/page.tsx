import {
  Hero,
  BentoGrid,
  Card,
  Heading,
  Text,
  Overline,
  GoogleBookingPanel,
  GoogleMapsSection,
  GoogleFeaturesStrip,
} from "@/lib/design-system";

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Elige tu sesión',
    description: 'Selecciona el tipo de experiencia y abre la agenda de Google con cupos reales.',
  },
  {
    step: '02',
    title: 'Vive la experiencia',
    description: 'Relájate en un espacio diseñado para ti. Sin prisas, sin poses forzadas.',
  },
  {
    step: '03',
    title: 'Recibe tus fotos',
    description: 'Descarga tu galería editada profesionalmente en 72 horas, lista para compartir.',
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 sm:py-12">

      <Hero
        title="ĀRŪḾA"
        subtitle="Espacio para la Exploración Visual"
        description="Reserva tu sesión en un ambiente íntimo diseñado para que te sientas cómoda/o. Fotografía auténtica, en tus términos y con total protección de tus datos."
        variant="botanical"
        primaryAction={{ label: "Reservar ahora", href: "#reserva" }}
        secondaryAction={{ label: "Ver servicios", href: "#servicios" }}
      />

      <GoogleFeaturesStrip />

      <section id="servicios" aria-labelledby="servicios-heading">
        <div className="mb-8 text-center">
          <Overline>Nuestras líneas de negocio</Overline>
          <Heading as="h2" id="servicios-heading" className="mt-2 text-2xl sm:text-3xl">
            Un espacio hecho para ti
          </Heading>
        </div>
        <BentoGrid
          columns={4}
          items={[
            {
              icon: <LeafIcon />,
              title: "Tu espacio, tus reglas",
              description: "Sesiones en un ambiente íntimo y seguro, completamente adaptadas a lo que necesitas y a tu ritmo.",
              span: 2,
              variant: "botanical",
            },
            {
              icon: <CalendarIcon />,
              title: "Agenda Google en vivo",
              description: "Disponibilidad real, confirmación por Gmail y recordatorios automáticos — sin llamadas ni esperas.",
              span: 1,
            },
            {
              icon: <DownloadIcon />,
              title: "Entrega en 72 h",
              description: "Galería editada profesionalmente en 72 horas, lista para compartir o imprimir.",
              span: 1,
            },
            {
              icon: <KnotIcon />,
              title: "Exploración Rigger / Tantra",
              description:
                "⭐ Sesión signature — Shibari y exploración corporal guiada en un entorno de respeto y consentimiento absoluto.",
              span: 4,
              variant: "botanical",
            },
          ]}
        />
      </section>

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

      <section id="reserva" aria-labelledby="reserva-heading">
        <div className="mb-8 text-center">
          <Overline>Da el primer paso</Overline>
          <Heading as="h2" id="reserva-heading" className="mt-2 text-2xl sm:text-3xl">
            Reserva tu sesión
          </Heading>
          <Text size="sm" muted className="mt-2 mx-auto max-w-md">
            Proceso seguro y confidencial. Tus datos se gestionan en Google Calendar con
            confirmación y recordatorios automáticos.
          </Text>
        </div>
        <GoogleBookingPanel />
      </section>

      <GoogleMapsSection />

    </main>
  );
}

function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.82L5.71 21l1-1.23A4.49 4.49 0 008 20C12 20 20 19 20 10c0-5.5-3-8-3-8zm-2.55 8.89A13.79 13.79 0 018.64 18c.77-1.69 2.5-4.53 6.36-6a.65.65 0 01.45 1.2A12.5 12.5 0 0014.45 16.89z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" />
    </svg>
  );
}

function KnotIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 4c4 0 10 3 10 8s-6 8-10 8" strokeLinecap="round" />
      <path d="M17 4C13 4 7 7 7 12s6 8 10 8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </svg>
  );
}