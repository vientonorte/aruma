import { Hero, BentoGrid, BookingForm, Card, Heading, Text, Overline } from "@/lib/design-system";

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Reserva',
    description: 'Elige fecha y hora en segundos. Todo online, sin llamadas ni esperas.',
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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-8 sm:px-6 sm:py-12">

      {/* Empatizar: Hero con propuesta de valor clara y llamadas a la acción */}
      <Hero
        title="ĀRŪḾA"
        subtitle="Estudio fotográfico & espacio seguro"
        description="Reserva tu sesión en un ambiente íntimo diseñado para que te sientas cómoda/o. Fotografía auténtica, en tus términos y con total protección de tus datos."
        variant="botanical"
        primaryAction={{ label: "Reservar ahora", href: "#reserva" }}
        secondaryAction={{ label: "Ver servicios", href: "#servicios" }}
      />

      {/* Definir: Sección de servicios centrada en beneficios del usuario, no en features técnicas */}
      <section id="servicios" aria-labelledby="servicios-heading">
        <div className="mb-8 text-center">
          <Overline>Lo que ofrecemos</Overline>
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
              icon: <CameraIcon />,
              title: "Fotografía auténtica",
              description: "Capturamos quién eres de verdad, sin poses forzadas. Tu historia, contada con honestidad.",
              span: 1,
            },
            {
              icon: <DownloadIcon />,
              title: "Entrega en 72 h",
              description: "Galería editada profesionalmente en 72 horas, lista para compartir o imprimir.",
              span: 1,
            },
          ]}
        />
      </section>

      {/* Prototipar: Sección de proceso paso a paso para reducir fricción y aumentar confianza */}
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

      {/* Validar: Formulario de reserva accesible y con consentimiento explícito */}
      <section id="reserva" aria-labelledby="reserva-heading">
        <div className="mb-8 text-center">
          <Overline>Da el primer paso</Overline>
          <Heading as="h2" id="reserva-heading" className="mt-2 text-2xl sm:text-3xl">
            Reserva tu sesión
          </Heading>
          <Text size="sm" muted className="mt-2 mx-auto max-w-md">
            Proceso seguro y confidencial. Tus datos solo se usan para gestionar tu reserva.
          </Text>
        </div>
        <BookingForm variant="botanical" />
      </section>

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

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" />
      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15a5 5 0 110-10 5 5 0 010 10z" />
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
