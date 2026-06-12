/**
 * Generación de disponibilidad: cruza el horario de atención del estudio
 * (lib/booking-config.ts) con los intervalos ocupados del Google Calendar
 * del estudio (FreeBusy) para producir las franjas reservables.
 *
 * El manejo de zona horaria usa la API Intl nativa, sin dependencias.
 */

import { BookingConfig } from './booking-config';
import { BusyInterval, CalendarCredentials, getBusyIntervals } from './google-calendar';

export type Slot = { start: Date; end: Date };

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function tzOffsetMs(date: Date, timeZone: string): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );
  return asUtc - date.getTime();
}

/** Convierte una hora "de pared" en una zona horaria al instante UTC real. */
export function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  let offset = tzOffsetMs(new Date(guess), timeZone);
  // Segundo ajuste para fechas que cruzan un cambio de horario (DST).
  const adjusted = tzOffsetMs(new Date(guess - offset), timeZone);
  if (adjusted !== offset) offset = adjusted;
  return new Date(guess - offset);
}

/** Fecha "YYYY-MM-DD" que corresponde a un instante dado en una zona horaria. */
export function dateIsoInTz(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function weekdayInTz(date: Date, timeZone: string): number {
  const name = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short' }).format(date);
  return WEEKDAY_INDEX[name] ?? -1;
}

/** Todas las franjas teóricas de un día según el horario de atención (sin mirar la agenda). */
export function generateDaySlots(dateIso: string, config: BookingConfig): Slot[] {
  const [year, month, day] = dateIso.split('-').map(Number);
  const noon = zonedTimeToUtc(year, month, day, 12, 0, config.timeZone);

  if (!config.workingDays.includes(weekdayInTz(noon, config.timeZone))) return [];

  const slots: Slot[] = [];
  const stepMinutes = config.sessionMinutes + config.bufferMinutes;

  for (
    let minutes = config.openHour * 60;
    minutes + config.sessionMinutes <= config.closeHour * 60;
    minutes += stepMinutes
  ) {
    const start = zonedTimeToUtc(
      year,
      month,
      day,
      Math.floor(minutes / 60),
      minutes % 60,
      config.timeZone,
    );
    slots.push({ start, end: new Date(start.getTime() + config.sessionMinutes * 60_000) });
  }

  return slots;
}

/** Filtra las franjas que chocan con la agenda o no respetan la anticipación mínima. */
export function filterAvailableSlots(
  slots: Slot[],
  busy: BusyInterval[],
  config: BookingConfig,
  now: Date = new Date(),
): Slot[] {
  const minStartMs = now.getTime() + config.minNoticeHours * 3_600_000;
  const bufferMs = config.bufferMinutes * 60_000;

  return slots.filter(
    (slot) =>
      slot.start.getTime() >= minStartMs &&
      !busy.some(
        (interval) =>
          slot.start.getTime() < interval.end.getTime() + bufferMs &&
          slot.end.getTime() + bufferMs > interval.start.getTime(),
      ),
  );
}

/** Franjas realmente reservables de un día, consultando FreeBusy del calendario. */
export async function getAvailableSlots(
  creds: CalendarCredentials,
  dateIso: string,
  config: BookingConfig,
): Promise<Slot[]> {
  const slots = generateDaySlots(dateIso, config);
  if (slots.length === 0) return [];

  const busy = await getBusyIntervals(creds, slots[0].start, slots[slots.length - 1].end);
  return filterAvailableSlots(slots, busy, config);
}

/**
 * Resumen del horizonte de reserva: cuántas franjas libres tiene cada día.
 * Pensado para pintar el calendario mensual del flujo de reserva.
 */
export async function getAvailabilitySummary(
  creds: CalendarCredentials,
  config: BookingConfig,
): Promise<{ date: string; available: number }[]> {
  const now = new Date();
  const days: { date: string; slots: Slot[] }[] = [];

  for (let offset = 0; offset < config.horizonDays; offset += 1) {
    const dateIso = dateIsoInTz(new Date(now.getTime() + offset * 86_400_000), config.timeZone);
    const slots = generateDaySlots(dateIso, config);
    if (slots.length > 0) days.push({ date: dateIso, slots });
  }

  if (days.length === 0) return [];

  const busy = await getBusyIntervals(
    creds,
    days[0].slots[0].start,
    days[days.length - 1].slots.at(-1)!.end,
  );

  return days.map(({ date, slots }) => ({
    date,
    available: filterAvailableSlots(slots, busy, config, now).length,
  }));
}
