import type { Metadata } from "next";
import { Heading, Text } from "@/lib/design-system";

export const metadata: Metadata = {
  title: "Términos de uso",
  description:
    "Condiciones de reserva, cancelación y uso del sitio del estudio fotográfico ĀRŪḾA.",
};

const sections = [
  {
    title: "Reservas",
    body: "Las sesiones se agendan a través de la página de citas de Google Calendar enlazada desde este sitio. La reserva queda confirmada cuando recibes la confirmación automática de Google Calendar en tu correo.",
  },
  {
    title: "Cancelaciones y reagendamiento",
    body: "Puedes cancelar o reagendar tu sesión desde el enlace incluido en la confirmación de tu cita. Te pedimos avisar con al menos 24 horas de anticipación para liberar el cupo a otras personas.",
  },
  {
    title: "Espacio seguro",
    body: "ĀRŪḾA es un espacio íntimo y respetuoso. Los límites acordados antes y durante la sesión son inamovibles, y cualquier conducta que vulnere la seguridad o dignidad de las personas implica el término inmediato de la sesión.",
  },
  {
    title: "Uso del material fotográfico",
    body: "Los derechos de uso de las imágenes se acuerdan por escrito antes de cada sesión. El estudio no publica ni difunde material sin consentimiento explícito de las personas fotografiadas.",
  },
  {
    title: "Uso del sitio",
    body: "El contenido de este sitio (textos, marca e identidad visual) pertenece a ĀRŪḾA y no puede reproducirse sin autorización. El sitio se ofrece tal cual, sin garantías sobre disponibilidad ininterrumpida.",
  },
];

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Heading as="h1" brand className="text-3xl sm:text-4xl">
        Términos de uso
      </Heading>
      <Text muted className="mt-4">
        Última actualización: junio de 2026
      </Text>
      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <Heading as="h2" className="text-xl tracking-wide">
              {section.title}
            </Heading>
            <Text muted className="mt-3">
              {section.body}
            </Text>
          </section>
        ))}
      </div>
    </main>
  );
}
