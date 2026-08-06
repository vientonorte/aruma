/**
 * ARUMA v2 — Panel de reserva con selector de sesión → Google Calendar Appointments
 */

'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Calendar, Mail, Shield, Clock, AlertTriangle } from 'lucide-react';
import { ButtonLink } from '../atoms/button';
import { Card } from '../atoms/card';
import { Heading, Text, Overline } from '../atoms/typography';
import { Badge } from '../atoms/badge';
import { StatusMessage } from '../molecules/status-message';
import { useBrandConfig } from '@/lib/use-brand-config';
import {
  isValidBookingUrl,
  resolveBookingUrlFromConfig,
} from '@/lib/brand-storage';
import type { SessionType } from '@/lib/brand.config';
import { withBasePath } from '@/lib/site-path';

/** Mailto de respaldo — no expone inbox privado; solo canal público. */
function buildReservationMailto(
  email: string,
  sessionName: string,
): string {
  const subject = `Reserva ĀRŪḾA — ${sessionName}`;
  const body = [
    'Hola Estudio ĀRŪḾA,',
    '',
    `Quiero reservar: ${sessionName}`,
    'Fecha / franja preferida (CLT):',
    'Nombre:',
    'Teléfono o WhatsApp (opcional):',
    'Notas / consentimiento / accesibilidad:',
    '',
    '— Enviado desde vientonorte.io/aruma',
  ].join('\n');
  const q = new URLSearchParams({ subject, body });
  return `mailto:${email}?${q.toString()}`;
}

const GOOGLE_BENEFITS = [
  {
    icon: Calendar,
    title: 'Disponibilidad en tiempo real',
    description: 'En Google Calendar ves solo los cupos libres del estudio.',
  },
  {
    icon: Mail,
    title: 'Confirmación en tu Gmail',
    description: 'Invitación automática con todos los detalles de tu cita.',
  },
  {
    icon: Clock,
    title: 'Recordatorios automáticos',
    description: 'Google te avisa 24 h antes para que no olvides tu sesión.',
  },
  {
    icon: Shield,
    title: 'Sin dobles reservas',
    description: 'Google bloquea el cupo al reservar; evita choques de horario.',
  },
];

function SessionCard({
  session,
  selected,
  onSelect,
}: {
  session: SessionType;
  selected: boolean;
  onSelect: () => void;
}) {
  const inputId = `session-${session.id}`;

  return (
    <label
      htmlFor={inputId}
      className={`block cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
        selected
          ? 'border-[#3D9461] bg-[#3D9461]/10 ring-1 ring-[#3D9461]/50'
          : 'border-[#2F2F31] bg-[#0A0A0A]/40 hover:border-[#3A3A3C]'
      }`}
    >
      <input
        type="radio"
        id={inputId}
        name="session-type"
        value={session.id}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 text-left">
          <span className="font-semibold text-[#F5F5F7]">{session.name}</span>
          {session.featured && (
            <Badge variant="botanical" size="sm" className="ml-2 align-middle">
              Signature
            </Badge>
          )}
          <Text size="sm" muted className="mt-1.5">
            {session.description}
          </Text>
        </div>
        <div className="shrink-0 text-right text-xs text-[#86868B]">
          <div className="font-medium text-[#3D9461]">{session.duration}</div>
          {session.priceLabel && <div className="mt-0.5">{session.priceLabel}</div>}
        </div>
      </div>
    </label>
  );
}

export function GoogleBookingPanel() {
  const config = useBrandConfig();
  const [selectedId, setSelectedId] = useState(config.sessionTypes[0]?.id ?? '');
  const selectedSession =
    config.sessionTypes.find((s) => s.id === selectedId) ?? config.sessionTypes[0];
  const bookingUrl = resolveBookingUrlFromConfig(config, selectedSession);
  const bookingReady = isValidBookingUrl(bookingUrl);
  const contactEmail = config.contactEmail?.trim();

  return (
    <Card variant="botanical" className="mx-auto w-full max-w-2xl p-5 sm:p-8">
      <div className="px-1 text-center sm:px-2">
        <Overline>Paso 1 · Elige tu sesión</Overline>
        <Heading as="h3" className="mt-2 text-xl sm:text-2xl">
          Reserva con Google Calendar
        </Heading>
        <Text size="sm" muted className="mx-auto mt-3 max-w-md">
          Selecciona el tipo de sesión. Si la agenda está activa, continúas en Google Calendar
          (cupos reales + confirmación). Si no, el botón abre un correo de reserva listo.
        </Text>
      </div>

      {!bookingReady && (
        <div className="mt-6 sm:mt-8">
          <StatusMessage
            type="warning"
            title="Agenda Google aún no conectada"
            message="No hay bookingUrl de calendar.app.google en la marca. Por eso no se abre el calendario de citas: hay que crear la página de reservas ĀRŪḾA y pegar el link. Mientras tanto usa «Escribir para reservar» (mailto)."
          />
          <div className="mt-4 rounded-xl border border-[#2F2F31] bg-[#0A0A0A]/60 p-4 text-left text-sm text-[#86868B] sm:p-5">
            <p className="flex items-start gap-2 font-medium text-[#F5F5F7]">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
              Dueño del estudio · checklist
            </p>
            <ol className="mt-3 list-decimal space-y-2.5 pl-5">
              <li>
                Abre{' '}
                <a
                  href="https://calendar.google.com/calendar/u/0/r/appointments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3D9461] underline hover:text-[#5DAF7D]"
                >
                  Google Calendar → Páginas de reserva
                </a>{' '}
                (cuenta marca ĀRŪḾA)
              </li>
              <li>Crea 3 agendas: 30 / 90 / 120 min · TZ America/Santiago.</li>
              <li>
                Copia <code className="rounded bg-[#1C1C1E] px-1 text-[#F5F5F7]">calendar.app.google/…</code>
              </li>
              <li>
                Pégalo en{' '}
                <a
                  href={withBasePath('/brand')}
                  className="text-[#3D9461] underline hover:text-[#5DAF7D]"
                >
                  /aruma/brand → Servicios y agenda
                </a>{' '}
                o en <code className="text-[#F5F5F7]">lib/brand.config.ts</code>
              </li>
            </ol>
          </div>
        </div>
      )}

      <fieldset className="mt-6 space-y-3 sm:mt-8" aria-label="Tipo de sesión">
        <legend className="sr-only">Selecciona el tipo de sesión</legend>
        {config.sessionTypes.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            selected={selectedId === session.id}
            onSelect={() => setSelectedId(session.id)}
          />
        ))}
      </fieldset>

      <AnimatePresence mode="wait">
        <m.div
          key={selectedId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-6 rounded-xl border border-[#2F2F31] bg-[#0A0A0A]/60 p-4"
        >
          <Text size="sm" className="text-[#F5F5F7]">
            <span className="font-semibold text-[#3D9461]">Paso 2 ·</span>{' '}
            {bookingReady
              ? <>Abre la agenda de Google y elige fecha y hora para{' '}
                  <span className="font-medium">{selectedSession?.name}</span>.</>
              : <>Cuando la agenda esté activa, podrás elegir fecha y hora para{' '}
                  <span className="font-medium">{selectedSession?.name}</span>.</>}
          </Text>
        </m.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-col items-center gap-3">
        {bookingReady ? (
          <>
            {/* Primario: agenda Google · mailto solo secundario */}
            <ButtonLink
              variant="botanical"
              size="lg"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              Continuar en Google Calendar
            </ButtonLink>
            {contactEmail ? (
              <a
                href={buildReservationMailto(
                  contactEmail,
                  selectedSession?.name ?? 'Sesión',
                )}
                className="text-sm text-[#86868B] underline underline-offset-2 hover:text-[#F5F5F7]"
              >
                ¿Problemas con Calendar? Escribir a {contactEmail}
              </a>
            ) : null}
          </>
        ) : contactEmail ? (
          <ButtonLink
            variant="botanical"
            size="lg"
            href={buildReservationMailto(
              contactEmail,
              selectedSession?.name ?? 'Sesión',
            )}
            className="w-full sm:w-auto"
          >
            Escribir para reservar
          </ButtonLink>
        ) : (
          <div className="text-center">
            <p className="text-sm text-[#86868B]">
              La agenda de Google aún no está activa.
            </p>
            <a
              href={withBasePath('/brand')}
              className="mt-2 inline-block text-sm text-[#3D9461] underline hover:text-[#5DAF7D]"
            >
              Configurar en /brand → Servicios y agenda
            </a>
          </div>
        )}
        <Text size="sm" muted>
          {bookingReady
            ? `Se abre en una pestaña nueva · ${config.businessHours}`
            : config.businessHours}
        </Text>
      </div>

      <ul
        className="mt-8 grid gap-3 sm:grid-cols-2"
        aria-label="Beneficios de la integración con Google"
      >
        {GOOGLE_BENEFITS.map((benefit) => (
          <li
            key={benefit.title}
            className="flex gap-3 rounded-lg border border-[#2F2F31]/80 bg-[#0A0A0A]/40 p-3"
          >
            <benefit.icon
              className="mt-0.5 h-5 w-5 shrink-0 text-[#3D9461]"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-[#F5F5F7]">{benefit.title}</p>
              <p className="mt-0.5 text-xs text-[#86868B]">{benefit.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}