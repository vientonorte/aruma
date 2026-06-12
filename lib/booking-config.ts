/**
 * Configuración de la agenda de reservas.
 *
 * Todos los valores se pueden sobreescribir con variables de entorno
 * (ver .env.example) sin tocar el código. Solo debe usarse en servidor.
 */

export type BookingConfig = {
  /** Zona horaria IANA en la que opera el estudio. */
  timeZone: string;
  /** Días de atención: 0 = domingo … 6 = sábado. */
  workingDays: number[];
  /** Hora de apertura (0–23) en la zona horaria del estudio. */
  openHour: number;
  /** Hora de cierre (0–23): la última sesión termina a esta hora como máximo. */
  closeHour: number;
  /** Duración de cada sesión en minutos. */
  sessionMinutes: number;
  /** Margen entre sesiones en minutos. */
  bufferMinutes: number;
  /** Anticipación mínima para reservar, en horas. */
  minNoticeHours: number;
  /** Cuántos días hacia adelante se puede reservar. */
  horizonDays: number;
};

function intFromEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  const value = raw === undefined ? NaN : Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
}

function daysFromEnv(fallback: number[]): number[] {
  const raw = process.env.BOOKING_DAYS;
  if (!raw) return fallback;
  const days = raw
    .split(',')
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6);
  return days.length > 0 ? days : fallback;
}

export function getBookingConfig(): BookingConfig {
  return {
    timeZone: process.env.BOOKING_TIMEZONE ?? 'America/Santiago',
    workingDays: daysFromEnv([1, 2, 3, 4, 5]),
    openHour: intFromEnv('BOOKING_OPEN_HOUR', 10),
    closeHour: intFromEnv('BOOKING_CLOSE_HOUR', 19),
    sessionMinutes: intFromEnv('BOOKING_SESSION_MINUTES', 60),
    bufferMinutes: intFromEnv('BOOKING_BUFFER_MINUTES', 15),
    minNoticeHours: intFromEnv('BOOKING_MIN_NOTICE_HOURS', 12),
    horizonDays: intFromEnv('BOOKING_HORIZON_DAYS', 30),
  };
}
