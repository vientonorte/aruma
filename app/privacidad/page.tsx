import type { Metadata } from "next";
import { Heading, Text } from "@/lib/design-system";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo ĀRŪḾA protege tu privacidad: qué datos se tratan al reservar una sesión y cuáles son tus derechos.",
};

const sections = [
  {
    title: "Datos que tratamos",
    body: "Este sitio es completamente estático y no recopila datos personales por sí mismo: no usa formularios propios, cookies de seguimiento ni analítica. Los únicos datos personales que recibimos son los que tú entregas voluntariamente al agendar una sesión (nombre, correo electrónico y, opcionalmente, teléfono).",
  },
  {
    title: "Reservas a través de Google Calendar",
    body: "Las reservas se gestionan mediante la página de citas de Google Calendar. Al agendar, tus datos son tratados por Google según su propia política de privacidad. Nosotros solo accedemos a la información de la cita para confirmar y coordinar tu sesión.",
  },
  {
    title: "Uso de la información",
    body: "Usamos tus datos de contacto exclusivamente para coordinar, confirmar o reagendar tu sesión fotográfica. No compartimos tu información con terceros ni la usamos con fines publicitarios.",
  },
  {
    title: "Fotografías y consentimiento",
    body: "Las imágenes producidas en una sesión te pertenecen en los términos acordados. Nunca publicamos ni compartimos material de una sesión sin tu consentimiento explícito y por escrito.",
  },
  {
    title: "Tus derechos",
    body: "Puedes solicitar en cualquier momento el acceso, rectificación o eliminación de tus datos escribiéndonos por los canales de contacto del estudio. También puedes cancelar una cita directamente desde la confirmación de Google Calendar.",
  },
];

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Heading as="h1" brand className="text-3xl sm:text-4xl">
        Política de privacidad
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
