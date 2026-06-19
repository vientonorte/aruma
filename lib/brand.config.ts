/**
 * ARUMA - Configuración de marca
 *
 * Única fuente de verdad de los valores editables de la identidad:
 * colores, textos, navegación, integraciones Google y tipos de sesión.
 * La página /brand permite ajustarlos en vivo y exportar esta configuración.
 */

export type BrandColorKey = 'negro' | 'blanco' | 'gris' | 'acento';

export type SessionType = {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceLabel?: string;
  /** Destaca la sesión signature en el selector de reserva. */
  featured?: boolean;
  /** URL alternativa de Google Calendar Appointments (opcional). */
  bookingUrl?: string;
};

export type StudioLocation = {
  /** Zona pública mostrada en el sitio (sin dirección exacta si se prefiere privacidad). */
  area: string;
  /** Dirección completa; solo se muestra si está definida. */
  addressLine?: string;
  /** URL de embed de Google Maps (Compartir → Insertar mapa). */
  mapsEmbedUrl?: string;
  latitude?: number;
  longitude?: number;
};

export type GoogleIntegrations = {
  calendarAppointments: boolean;
  maps: boolean;
  emailReminders: boolean;
  /** Recordatorios automáticos 24 h antes vía Google Calendar. */
  autoReminders: boolean;
};

export type BrandConfig = {
  name: string;
  tagline: string;
  version: string;
  /** Página de citas de Google Calendar donde se agendan las sesiones. */
  bookingUrl: string;
  /** Correo de contacto cuando la agenda no está disponible. */
  contactEmail?: string;
  sessionTypes: SessionType[];
  location: StudioLocation;
  google: GoogleIntegrations;
  businessHours: string;
  colors: Record<BrandColorKey, { label: string; value: string }>;
  nav: string[];
  buttons: { primary: string; secondary: string };
  project: { title: string; description: string };
  usage: { subtitle: string; caption: string };
};

export const brandConfig: BrandConfig = {
  name: 'ARUMA',
  tagline: 'Espacio para la Exploración Visual.',
  version: '2.0',
  // Vacío hasta pegar el enlace nuevo de Google Calendar Appointments.
  // El enlace anterior (Gw2Js1fHiAiVwiuS6) fue eliminado o invalidado en Google.
  bookingUrl: '',
  contactEmail: '',
  sessionTypes: [
    {
      id: 'foto-intima',
      name: 'Sesión fotográfica íntima',
      description:
        'Ambiente seguro y personalizado. Fotografía auténtica adaptada a tu ritmo y comodidad.',
      duration: '90 min',
      priceLabel: 'Desde $120.000',
    },
    {
      id: 'rigger-tantra',
      name: 'Exploración Rigger / Tantra',
      description:
        'Sesión signature — Shibari y exploración corporal guiada con consentimiento y respeto absolutos.',
      duration: '120 min',
      priceLabel: 'Desde $180.000',
      featured: true,
    },
    {
      id: 'consulta',
      name: 'Consulta inicial',
      description:
        'Conoce el espacio, resuelve dudas y define qué tipo de sesión necesitas. Sin compromiso.',
      duration: '30 min',
      priceLabel: 'Gratuita',
    },
  ],
  location: {
    area: 'Santiago, Región Metropolitana, Chile',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0!2d-70.6483!3d-33.4489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzU2LjAiUyA3MMKwMzgnNTQuMCJX!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl',
    latitude: -33.4489,
    longitude: -70.6483,
  },
  google: {
    calendarAppointments: true,
    maps: true,
    emailReminders: true,
    autoReminders: true,
  },
  businessHours: 'Martes a sábado, 10:00–20:00 (hora Chile continental)',
  colors: {
    negro: { label: 'Negro Principal', value: '#000000' },
    blanco: { label: 'Blanco', value: '#FFFFFF' },
    gris: { label: 'Gris Texto', value: '#333333' },
    acento: { label: 'Acento', value: '#F5F0E8' },
  },
  nav: ['INICIO', 'GALERÍA', 'SOBRE NOSOTROS', 'CONTACTO'],
  buttons: { primary: 'CONTACTAR', secondary: 'VER PROYECTOS.' },
  project: { title: "Proyecto Shibari'", description: 'Exploración de formas y texturas.' },
  usage: { subtitle: "'RIGGER / TANTRA'", caption: 'Espacio para la exploración visual.' },
};

/** @deprecated Usa resolveBookingUrlFromConfig desde brand-storage. */
export function resolveBookingUrl(session?: SessionType): string {
  return session?.bookingUrl ?? brandConfig.bookingUrl;
}