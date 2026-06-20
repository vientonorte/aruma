/**
 * ARUMA v2 — Ubicación del estudio con Google Maps embed
 */

'use client';

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Card } from '../atoms/card';
import { Heading, Text, Overline } from '../atoms/typography';
import { useBrandConfig } from '@/lib/use-brand-config';

export function GoogleMapsSection() {
  const config = useBrandConfig();
  const { location, businessHours } = config;
  const hasEmbed = Boolean(location.mapsEmbedUrl) && config.google.maps;

  return (
    <section id="ubicacion" aria-labelledby="ubicacion-heading">
      <div className="mb-8 text-center">
        <Overline>Encuéntranos</Overline>
        <Heading as="h2" id="ubicacion-heading" className="mt-2 text-2xl sm:text-3xl">
          Ubicación del estudio
        </Heading>
        <Text size="sm" muted className="mx-auto mt-2 max-w-md">
          Zona de atención en {location.area}. La dirección exacta se confirma al reservar tu sesión.
        </Text>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="default" className="flex flex-col justify-center">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#3D9461]" aria-hidden="true" />
            <div>
              <Heading as="h3" className="text-lg">
                {location.area}
              </Heading>
              {location.addressLine && (
                <Text size="sm" muted className="mt-1">
                  {location.addressLine}
                </Text>
              )}
              <Text size="sm" muted className="mt-3">
                {businessHours}
              </Text>
            </div>
          </div>

          {hasEmbed && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.area)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#3D9461] transition-colors hover:text-[#5DAF7D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D9461] rounded px-1"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Abrir en Google Maps
            </a>
          )}
        </Card>

        {hasEmbed ? (
          <Card variant="default" className="overflow-hidden p-0">
            <div className="relative aspect-[4/3] w-full sm:aspect-video">
              <iframe
                title={`Mapa de ubicación de ĀRŪḾA en ${location.area}`}
                src={location.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Card>
        ) : (
          <Card variant="outlined" className="flex items-center justify-center text-center">
            <Text size="sm" muted>
              Mapa disponible próximamente. Contáctanos al reservar para coordinar la ubicación.
            </Text>
          </Card>
        )}
      </div>
    </section>
  );
}