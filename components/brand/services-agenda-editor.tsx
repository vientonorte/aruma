'use client';

import React from 'react';
import type { BrandConfig } from '@/lib/brand.config';
import {
  DEFAULT_BUSINESS_HOURS_RULES,
  formatBusinessHours,
  type BusinessHoursRule,
} from '@/lib/business-hours';
import { isValidBookingUrl } from '@/lib/brand-storage';

const DAY_OPTIONS = [
  { value: 0, label: 'Dom' },
  { value: 1, label: 'Lun' },
  { value: 2, label: 'Mar' },
  { value: 3, label: 'Mié' },
  { value: 4, label: 'Jue' },
  { value: 5, label: 'Vie' },
  { value: 6, label: 'Sáb' },
] as const;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function uniqueSessionId(base: string, sessions: BrandConfig['sessionTypes']): string {
  let candidate = base || 'servicio';
  let n = 1;
  while (sessions.some((s) => s.id === candidate)) {
    candidate = `${base || 'servicio'}-${n}`;
    n += 1;
  }
  return candidate;
}

type Props = {
  config: BrandConfig;
  onChange: (partial: Partial<BrandConfig>) => void;
};

export function ServicesAgendaEditor({ config, onChange }: Props) {
  const sessions = config.sessionTypes;
  const rules = config.businessHoursRules ?? DEFAULT_BUSINESS_HOURS_RULES;

  function updateSessions(next: BrandConfig['sessionTypes']) {
    onChange({ sessionTypes: next });
  }

  function updateRules(next: BusinessHoursRule[]) {
    onChange({
      businessHoursRules: next,
      businessHours: formatBusinessHours(next, config.timezone),
    });
  }

  function moveSession(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= sessions.length) return;
    const next = [...sessions];
    [next[index], next[target]] = [next[target], next[index]];
    updateSessions(next);
  }

  function duplicateSession(index: number) {
    const source = sessions[index];
    const baseId = `${source.id}-copy`;
    let copyNum = 1;
    let newId = `${baseId}-${copyNum}`;
    while (sessions.some((s) => s.id === newId)) {
      copyNum += 1;
      newId = `${baseId}-${copyNum}`;
    }
    const copy = {
      ...source,
      id: newId,
      name: `${source.name} (copia)`,
      featured: false,
    };
    const next = [...sessions];
    next.splice(index + 1, 0, copy);
    updateSessions(next);
  }

  function removeSession(index: number) {
    if (sessions.length <= 1) return;
    updateSessions(sessions.filter((_, i) => i !== index));
  }

  function addSession() {
    const name = 'Nuevo servicio';
    const id = uniqueSessionId(slugify(name), sessions);
    updateSessions([
      ...sessions,
      {
        id,
        name,
        description: 'Describe el servicio para tus clientes.',
        duration: '60 min',
        priceLabel: '',
      },
    ]);
  }

  function setFeatured(index: number, featured: boolean) {
    updateSessions(
      sessions.map((session, i) => ({
        ...session,
        featured: featured && i === index ? true : false,
      })),
    );
  }

  const idCollision = new Set(sessions.map((s) => s.id)).size !== sessions.length;

  return (
    <section
      aria-label="Servicios y agenda"
      className="mb-12 grid gap-4 rounded-2xl border-2 border-black bg-white p-5"
    >
      <h2 className="text-lg font-black sm:col-span-2">Servicios y agenda</h2>

      <label className="grid gap-1 text-sm font-bold sm:col-span-2">
        URL global de reservas (Google Calendar Appointments)
        <input
          type="url"
          value={config.bookingUrl}
          onChange={(e) => onChange({ bookingUrl: e.target.value.trim() })}
          placeholder="https://calendar.app.google/…"
          className="rounded-lg border border-black/30 px-3 py-2 font-normal"
        />
        <span className="text-xs font-normal text-[#333333]">
          {isValidBookingUrl(config.bookingUrl)
            ? '✓ Enlace válido'
            : 'Fallback cuando una sesión no tiene URL propia'}
        </span>
      </label>

      <div className="grid gap-3 sm:col-span-2">
        <p className="text-sm font-bold">Horario de atención (reglas)</p>
        <ul className="grid gap-2">
          {rules.map((rule, index) => (
            <li key={`${rule.dayOfWeek}-${index}`} className="flex flex-wrap items-center gap-2">
              <select
                value={rule.dayOfWeek}
                onChange={(e) => {
                  const next = [...rules];
                  next[index] = {
                    ...rule,
                    dayOfWeek: Number(e.target.value) as BusinessHoursRule['dayOfWeek'],
                  };
                  updateRules(next);
                }}
                className="rounded-lg border border-black/30 px-2 py-1.5 text-sm"
                aria-label={`Día ${index + 1}`}
              >
                {DAY_OPTIONS.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={rule.open}
                onChange={(e) => {
                  const next = [...rules];
                  next[index] = { ...rule, open: e.target.value };
                  updateRules(next);
                }}
                className="rounded-lg border border-black/30 px-2 py-1.5 text-sm"
                aria-label={`Apertura ${index + 1}`}
              />
              <span className="text-sm">—</span>
              <input
                type="time"
                value={rule.close}
                onChange={(e) => {
                  const next = [...rules];
                  next[index] = { ...rule, close: e.target.value };
                  updateRules(next);
                }}
                className="rounded-lg border border-black/30 px-2 py-1.5 text-sm"
                aria-label={`Cierre ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => updateRules(rules.filter((_, i) => i !== index))}
                disabled={rules.length <= 1}
                className="rounded-lg border border-black/30 px-2 py-1 text-xs disabled:opacity-40"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() =>
            updateRules([
              ...rules,
              { dayOfWeek: 2, open: '10:00', close: '20:00' },
            ])
          }
          className="w-fit rounded-lg border border-black/30 px-3 py-1.5 text-sm"
        >
          + Agregar día
        </button>
        <p className="text-xs text-[#333333]">
          Horario publicado:{' '}
          <span className="font-medium">{config.businessHours}</span>
        </p>
      </div>

      <label className="grid gap-1 text-sm font-bold sm:col-span-2">
        Correo de contacto (respaldo si la agenda no está lista)
        <input
          type="email"
          value={config.contactEmail ?? ''}
          onChange={(e) => onChange({ contactEmail: e.target.value.trim() })}
          placeholder="estudio@ejemplo.cl"
          className="rounded-lg border border-black/30 px-3 py-2 font-normal"
        />
      </label>

      {idCollision && (
        <p className="text-sm font-bold text-red-700 sm:col-span-2" role="alert">
          Hay ids de sesión duplicados — corrígelos antes de exportar.
        </p>
      )}

      <ul className="grid gap-4 sm:col-span-2">
        {sessions.map((session, index) => (
          <li
            key={`${session.id}-${index}`}
            className="rounded-xl border border-black/20 p-4"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold">{session.name || 'Sin nombre'}</span>
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => moveSession(index, -1)}
                  disabled={index === 0}
                  aria-label={`Subir ${session.name}`}
                  className="rounded border border-black/30 px-2 py-1 text-xs disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveSession(index, 1)}
                  disabled={index === sessions.length - 1}
                  aria-label={`Bajar ${session.name}`}
                  className="rounded border border-black/30 px-2 py-1 text-xs disabled:opacity-40"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => duplicateSession(index)}
                  className="rounded border border-black/30 px-2 py-1 text-xs"
                >
                  Duplicar
                </button>
                <button
                  type="button"
                  onClick={() => removeSession(index)}
                  disabled={sessions.length <= 1}
                  className="rounded border border-black/30 px-2 py-1 text-xs disabled:opacity-40"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-xs font-bold">
                Nombre
                <input
                  value={session.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const next = [...sessions];
                    next[index] = { ...session, name };
                    updateSessions(next);
                  }}
                  maxLength={80}
                  className="rounded-lg border border-black/30 px-3 py-2 font-normal"
                />
              </label>
              <label className="grid gap-1 text-xs font-bold">
                ID (slug)
                <input
                  value={session.id}
                  onChange={(e) => {
                    const id = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                    const next = [...sessions];
                    next[index] = { ...session, id };
                    updateSessions(next);
                  }}
                  className="rounded-lg border border-black/30 px-3 py-2 font-normal font-mono"
                />
              </label>
              <label className="grid gap-1 text-xs font-bold sm:col-span-2">
                Descripción
                <textarea
                  value={session.description}
                  onChange={(e) => {
                    const next = [...sessions];
                    next[index] = { ...session, description: e.target.value };
                    updateSessions(next);
                  }}
                  maxLength={300}
                  rows={2}
                  className="rounded-lg border border-black/30 px-3 py-2 font-normal"
                />
              </label>
              <label className="grid gap-1 text-xs font-bold">
                Duración
                <input
                  value={session.duration}
                  onChange={(e) => {
                    const next = [...sessions];
                    next[index] = { ...session, duration: e.target.value };
                    updateSessions(next);
                  }}
                  placeholder="90 min"
                  className="rounded-lg border border-black/30 px-3 py-2 font-normal"
                />
              </label>
              <label className="grid gap-1 text-xs font-bold">
                Precio (etiqueta)
                <input
                  value={session.priceLabel ?? ''}
                  onChange={(e) => {
                    const next = [...sessions];
                    next[index] = { ...session, priceLabel: e.target.value };
                    updateSessions(next);
                  }}
                  placeholder="Desde $120.000"
                  className="rounded-lg border border-black/30 px-3 py-2 font-normal"
                />
              </label>
              <label className="grid gap-1 text-xs font-bold sm:col-span-2">
                URL de reserva propia (opcional)
                <input
                  type="url"
                  value={session.bookingUrl ?? ''}
                  onChange={(e) => {
                    const next = [...sessions];
                    next[index] = {
                      ...session,
                      bookingUrl: e.target.value.trim() || undefined,
                    };
                    updateSessions(next);
                  }}
                  placeholder="https://calendar.app.google/…"
                  className="rounded-lg border border-black/30 px-3 py-2 font-normal"
                />
              </label>
              <label className="flex items-center gap-2 text-xs font-bold sm:col-span-2">
                <input
                  type="checkbox"
                  checked={Boolean(session.featured)}
                  onChange={(e) => setFeatured(index, e.target.checked)}
                />
                Destacar como sesión signature
              </label>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={addSession}
        className="w-fit rounded-lg border-2 border-black px-4 py-2 text-sm font-bold sm:col-span-2"
      >
        + Agregar servicio
      </button>
    </section>
  );
}