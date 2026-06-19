import { brandConfig } from './brand.config';
import { isValidBookingUrl } from './brand-storage';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vientonorte.github.io/aruma';
const SITE_DESCRIPTION =
  'Espacio íntimo y seguro para sesiones fotográficas auténticas. Reserva online en segundos, con total privacidad y protección de tus datos.';

export function buildLocalBusinessJsonLd() {
  const { location, sessionTypes } = brandConfig;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ĀRŪḾA',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    priceRange: '$$',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: location.area,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sesiones ĀRŪḾA',
      itemListElement: sessionTypes.map((session, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: session.name,
          description: session.description,
          provider: { '@type': 'LocalBusiness', name: 'ĀRŪḾA' },
        },
      })),
    },
  };

  if (location.addressLine) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      streetAddress: location.addressLine,
      addressLocality: 'Santiago',
      addressCountry: 'CL',
    };
  } else {
    jsonLd.address = {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    };
  }

  if (location.latitude != null && location.longitude != null) {
    jsonLd.geo = {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  if (location.mapsEmbedUrl) {
    jsonLd.hasMap = location.mapsEmbedUrl.replace('/embed', '');
  }

  return jsonLd;
}

export function buildWebSiteJsonLd() {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ĀRŪḾA',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  if (isValidBookingUrl(brandConfig.bookingUrl)) {
    jsonLd.potentialAction = {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: brandConfig.bookingUrl,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Reservation',
        name: 'Reserva de sesión fotográfica',
      },
    };
  }

  return jsonLd;
}