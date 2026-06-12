/**
 * ARUMA - Configuración de marca
 *
 * Única fuente de verdad de los valores editables de la identidad:
 * colores, textos, navegación y etiquetas. La página /brand permite
 * ajustarlos en vivo y exportar esta configuración actualizada.
 */

export type BrandColorKey = 'negro' | 'blanco' | 'gris' | 'acento';

export type BrandConfig = {
  name: string;
  tagline: string;
  /** Página de citas de Google Calendar donde se agendan las sesiones. */
  bookingUrl: string;
  colors: Record<BrandColorKey, { label: string; value: string }>;
  nav: string[];
  buttons: { primary: string; secondary: string };
  project: { title: string; description: string };
  usage: { subtitle: string; caption: string };
};

export const brandConfig: BrandConfig = {
  name: 'ARUMA',
  tagline: 'Espacio para la Exploración Visual.',
  bookingUrl: 'https://calendar.app.google/Gw2Js1fHiAiVwiuS6',
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
