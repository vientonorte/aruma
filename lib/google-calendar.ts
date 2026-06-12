/**
 * Cliente de Google Calendar autenticado con una Service Account.
 *
 * Usa el flujo OAuth 2.0 JWT-bearer firmado con `node:crypto`, sin SDKs
 * pesados. Solo debe importarse desde código de servidor (API routes):
 * las credenciales nunca llegan al cliente.
 *
 * Pasos de configuración: ver docs/CONFIGURACION_GOOGLE.md
 */

import { createSign } from 'node:crypto';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
const SCOPE = 'https://www.googleapis.com/auth/calendar';

export type CalendarCredentials = {
  clientEmail: string;
  privateKey: string;
  calendarId: string;
};

/** Devuelve las credenciales del entorno, o null si la integración no está configurada. */
export function getCalendarCredentials(): CalendarCredentials | null {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // En paneles como Vercel la clave suele pegarse con "\n" literales.
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!clientEmail || !privateKey || !calendarId) return null;
  return { clientEmail, privateKey, calendarId };
}

let cachedToken: { value: string; expiresAtSec: number } | null = null;

async function getAccessToken(creds: CalendarCredentials): Promise<string> {
  const nowSec = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAtSec - 60 > nowSec) {
    return cachedToken.value;
  }

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claims = Buffer.from(
    JSON.stringify({
      iss: creds.clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: nowSec,
      exp: nowSec + 3600,
    }),
  ).toString('base64url');

  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(creds.privateKey).toString('base64url');

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Google OAuth respondió ${response.status}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAtSec: nowSec + data.expires_in };
  return data.access_token;
}

export type BusyInterval = { start: Date; end: Date };

/** Intervalos ocupados del calendario del estudio entre dos instantes (FreeBusy). */
export async function getBusyIntervals(
  creds: CalendarCredentials,
  timeMin: Date,
  timeMax: Date,
): Promise<BusyInterval[]> {
  const token = await getAccessToken(creds);

  const response = await fetch(`${CALENDAR_API}/freeBusy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: creds.calendarId }],
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Google freeBusy respondió ${response.status}`);
  }

  const data = (await response.json()) as {
    calendars?: Record<string, { busy?: { start: string; end: string }[] }>;
  };
  const busy = data.calendars?.[creds.calendarId]?.busy ?? [];
  return busy.map((interval) => ({ start: new Date(interval.start), end: new Date(interval.end) }));
}

export type BookingEventInput = {
  name: string;
  email: string;
  notes: string;
  start: Date;
  end: Date;
  timeZone: string;
};

/**
 * Crea el evento de la reserva en el calendario del estudio e invita al
 * cliente (recibe la invitación y los recordatorios nativos de Google).
 *
 * Las service accounts sin delegación de dominio no pueden invitar
 * asistentes en cuentas Gmail personales; en ese caso se reintenta sin
 * invitado para que la reserva quede igualmente registrada en la agenda.
 */
export async function createBookingEvent(
  creds: CalendarCredentials,
  input: BookingEventInput,
): Promise<{ attendeeInvited: boolean }> {
  const token = await getAccessToken(creds);

  const description = [
    `Reserva online de ${input.name} <${input.email}>.`,
    input.notes ? `Notas: ${input.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const baseEvent = {
    summary: `Sesión ĀRŪḾA — ${input.name}`,
    description,
    start: { dateTime: input.start.toISOString(), timeZone: input.timeZone },
    end: { dateTime: input.end.toISOString(), timeZone: input.timeZone },
    reminders: { useDefault: true },
  };

  const url = `${CALENDAR_API}/calendars/${encodeURIComponent(creds.calendarId)}/events?sendUpdates=all`;
  const post = (body: object) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

  let response = await post({
    ...baseEvent,
    attendees: [{ email: input.email, displayName: input.name }],
  });

  if (response.ok) return { attendeeInvited: true };

  if (response.status === 403) {
    response = await post(baseEvent);
    if (response.ok) return { attendeeInvited: false };
  }

  throw new Error(`Google Calendar respondió ${response.status} al crear el evento`);
}
