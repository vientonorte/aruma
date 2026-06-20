'use client';

import React from 'react';
import type { BrandConfig } from '@/lib/brand.config';
import { isValidBookingUrl, resolveBookingUrlFromConfig } from '@/lib/brand-storage';

type Props = {
  config: BrandConfig;
  negro: string;
  gris: string;
  acento: string;
};

export function ServicesSchedulePreview({ config, negro, gris, acento }: Props) {
  const bookingReady = isValidBookingUrl(config.bookingUrl);
  const featured = config.sessionTypes.find((s) => s.featured);

  return (
    <section
      aria-labelledby="brand-services"
      className="mb-12 rounded-2xl border-2 border-black bg-white p-5 lg:col-span-2"
    >
      <h2 id="brand-services" className="mb-2 text-xl font-black" style={{ color: negro }}>
        03. Servicios y agenda
      </h2>
      <p className="mb-6 text-sm" style={{ color: gris }}>
        Vista previa del flujo de reserva: selector de sesión → Google Calendar Appointments.
        {bookingReady ? ' Agenda activa.' : ' Agenda en reconfiguración — pega el nuevo enlace en Editar marca.'}
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
        <span
          className="rounded-full px-3 py-1 font-bold"
          style={{ backgroundColor: acento, color: gris }}
        >
          {config.businessHours}
        </span>
        <span className="text-xs" style={{ color: gris }}>
          {config.timezone}
        </span>
        {featured && (
          <span className="rounded-full border border-black/20 px-3 py-1 text-xs font-bold">
            Signature · {featured.name}
          </span>
        )}
      </div>

      <ol className="grid gap-3 sm:grid-cols-3" aria-label="Tipos de sesión">
        {config.sessionTypes.map((session, index) => {
          const sessionUrl = resolveBookingUrlFromConfig(config, session);
          const hasUrl = isValidBookingUrl(sessionUrl);
          return (
            <li
              key={session.id}
              className={`flex flex-col rounded-xl border p-4 ${
                session.featured ? 'border-black ring-1 ring-black/10' : 'border-black/15'
              }`}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="text-sm font-black" style={{ color: negro }}>
                  {String(index + 1).padStart(2, '0')}. {session.name}
                </span>
                {session.featured && (
                  <span className="shrink-0 rounded bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Signature
                  </span>
                )}
              </div>
              <p className="mb-3 flex-1 text-xs leading-relaxed" style={{ color: gris }}>
                {session.description}
              </p>
              <div className="mt-auto flex items-end justify-between gap-2 text-xs">
                <span className="font-bold" style={{ color: negro }}>
                  {session.duration}
                </span>
                {session.priceLabel && (
                  <span style={{ color: gris }}>{session.priceLabel}</span>
                )}
              </div>
              {hasUrl && (
                <a
                  href={sessionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs font-bold underline"
                  style={{ color: negro }}
                >
                  Probar enlace de reserva →
                </a>
              )}
            </li>
          );
        })}
      </ol>

      <div
        className="mt-6 grid gap-4 rounded-xl border border-black/15 bg-[#FAFAFA] p-4 sm:grid-cols-2"
        aria-label="Integraciones Google"
      >
        {(
          [
            ['calendarAppointments', 'Google Calendar Appointments'],
            ['maps', 'Google Maps (ubicación)'],
            ['emailReminders', 'Confirmación por Gmail'],
            ['autoReminders', 'Recordatorio 24 h'],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                config.google[key] ? 'bg-black text-white' : 'bg-black/10 text-black/40'
              }`}
              aria-hidden="true"
            >
              {config.google[key] ? '✓' : '—'}
            </span>
            <span style={{ color: config.google[key] ? negro : gris }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}