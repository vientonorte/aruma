/**
 * ARUMA Design System - SlotPicker Molecule
 *
 * Selector de cita en dos pasos: día con disponibilidad → franja horaria
 * libre. Consume GET /api/availability, por lo que solo ofrece horarios
 * realmente reservables en el calendario del estudio.
 *
 * El valor emitido usa el formato de <input type="datetime-local">
 * ("YYYY-MM-DDTHH:mm") expresado en la zona horaria del estudio, que es
 * lo que espera POST /api/calendar.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '../atoms/typography';

type DaySummary = { date: string; available: number };
type SlotInfo = { start: string; end: string };

export interface SlotPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  /** Máximo de días con disponibilidad a mostrar. */
  maxDays?: number;
}

type LoadState = 'loading' | 'ready' | 'error' | 'unconfigured';

function formatTime(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(iso));
}

function dayParts(dateIso: string): { weekday: string; day: string; month: string } {
  // El string ya está en la zona del estudio; mediodía UTC conserva la fecha.
  const noon = new Date(`${dateIso}T12:00:00Z`);
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('es-CL', { timeZone: 'UTC', ...options }).format(noon);
  return {
    weekday: format({ weekday: 'short' }).replace('.', ''),
    day: format({ day: 'numeric' }),
    month: format({ month: 'short' }).replace('.', ''),
  };
}

const chipBase =
  'min-h-11 rounded-xl border px-3 text-sm transition-colors cursor-pointer ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D9461] ' +
  'disabled:cursor-not-allowed disabled:opacity-40';

const chipIdle = 'border-[#3A3A3C] bg-[#0A0A0A] text-[#F5F5F7] hover:border-[#3D9461]';
const chipSelected = 'border-[#3D9461] bg-[#3D9461] font-semibold text-[#0A0A0A]';

export function SlotPicker({ value, onChange, disabled = false, error, maxDays = 14 }: SlotPickerProps) {
  const [state, setState] = useState<LoadState>('loading');
  const [timeZone, setTimeZone] = useState('');
  const [days, setDays] = useState<DaySummary[]>([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [slotsState, setSlotsState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  // Reintentos: incrementar `attempt` vuelve a disparar la carga.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('/api/availability', { cache: 'no-store' });
        if (cancelled) return;
        if (response.status === 503) {
          setState('unconfigured');
          return;
        }
        if (!response.ok) throw new Error();
        const data = (await response.json()) as { timeZone: string; days: DaySummary[] };
        if (cancelled) return;
        setTimeZone(data.timeZone);
        setDays(data.days.filter((day) => day.available > 0).slice(0, maxDays));
        setState('ready');
      } catch {
        if (!cancelled) setState('error');
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [attempt, maxDays]);

  async function selectDay(date: string) {
    setSelectedDay(date);
    onChange('');
    setSlotsState('loading');
    try {
      const response = await fetch(`/api/availability?date=${date}`, { cache: 'no-store' });
      if (!response.ok) throw new Error();
      const data = (await response.json()) as { slots: SlotInfo[] };
      setSlots(data.slots);
      setSlotsState('ready');
    } catch {
      setSlotsState('error');
    }
  }

  function selectSlot(slot: SlotInfo) {
    onChange(`${selectedDay}T${formatTime(slot.start, timeZone)}`);
  }

  const describedBy = error ? 'slot-picker-error' : undefined;

  return (
    <div className="grid gap-3" aria-describedby={describedBy}>
      <Label htmlFor="slot-picker-days">
        Fecha y hora
        <span className="ml-1 text-[#EF4444]" aria-label="requerido">*</span>
      </Label>

      {state === 'loading' && (
        <div className="flex gap-2" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 w-16 animate-pulse rounded-xl bg-[#1C1C1E]" />
          ))}
        </div>
      )}

      {state === 'unconfigured' && (
        <p className="text-sm text-[#86868B]">
          La agenda online aún no está habilitada. Escríbenos para coordinar tu sesión.
        </p>
      )}

      {state === 'error' && (
        <div className="flex items-center gap-3">
          <p className="text-sm text-[#EF4444]">No se pudo cargar la disponibilidad.</p>
          <button
            type="button"
            onClick={() => {
              setState('loading');
              setAttempt((current) => current + 1);
            }}
            className={`${chipBase} ${chipIdle}`}
          >
            Reintentar
          </button>
        </div>
      )}

      {state === 'ready' && days.length === 0 && (
        <p className="text-sm text-[#86868B]">
          No hay horarios disponibles por ahora. Vuelve a intentarlo pronto.
        </p>
      )}

      {state === 'ready' && days.length > 0 && (
        <>
          <div
            id="slot-picker-days"
            role="radiogroup"
            aria-label="Elige un día"
            className="flex gap-2 overflow-x-auto pb-1"
          >
            {days.map((day) => {
              const parts = dayParts(day.date);
              const isSelected = day.date === selectedDay;
              return (
                <button
                  key={day.date}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={disabled}
                  onClick={() => void selectDay(day.date)}
                  className={`${chipBase} ${isSelected ? chipSelected : chipIdle} flex w-16 shrink-0 flex-col items-center py-2`}
                >
                  <span className="text-xs uppercase opacity-80">{parts.weekday}</span>
                  <span className="text-lg font-semibold leading-tight">{parts.day}</span>
                  <span className="text-xs uppercase opacity-80">{parts.month}</span>
                </button>
              );
            })}
          </div>

          {slotsState === 'loading' && (
            <div className="flex flex-wrap gap-2" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-11 w-20 animate-pulse rounded-xl bg-[#1C1C1E]" />
              ))}
            </div>
          )}

          {slotsState === 'error' && (
            <p className="text-sm text-[#EF4444]">
              No se pudieron cargar los horarios de ese día. Elige otro o reintenta.
            </p>
          )}

          {slotsState === 'ready' && slots.length === 0 && (
            <p className="text-sm text-[#86868B]">Ese día ya no tiene horarios libres.</p>
          )}

          {slotsState === 'ready' && slots.length > 0 && (
            <motion.div
              role="radiogroup"
              aria-label="Elige una hora"
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {slots.map((slot) => {
                const time = formatTime(slot.start, timeZone);
                const isSelected = value === `${selectedDay}T${time}`;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={disabled}
                    onClick={() => selectSlot(slot)}
                    className={`${chipBase} ${isSelected ? chipSelected : chipIdle} w-20`}
                  >
                    {time}
                  </button>
                );
              })}
            </motion.div>
          )}
        </>
      )}

      {error && (
        <p id="slot-picker-error" role="alert" className="text-sm text-[#EF4444]">
          {error}
        </p>
      )}
    </div>
  );
}
