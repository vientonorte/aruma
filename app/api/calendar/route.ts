import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sanitizeInput } from '@/lib/sanitize';
import { getBookingConfig } from '@/lib/booking-config';
import { createBookingEvent, getCalendarCredentials } from '@/lib/google-calendar';
import { getAvailableSlots, zonedTimeToUtc } from '@/lib/availability';

const requestSchema = z.object({
  consent: z.literal(true),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  notes: z.string().max(280).optional().default(''),
  // Formato de <input type="datetime-local">, interpretado en la zona horaria del estudio.
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/),
});

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const parsed = requestSchema.safeParse({
    consent: body.consent,
    name: sanitizeInput(String(body.name ?? '')),
    email: sanitizeInput(String(body.email ?? '')).toLowerCase(),
    notes: sanitizeInput(String(body.notes ?? '')),
    date: String(body.date ?? ''),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos de reserva inválidos.' }, { status: 400 });
  }

  const creds = getCalendarCredentials();
  if (!creds) {
    return NextResponse.json(
      { error: 'Integración de calendario no configurada en servidor.' },
      { status: 503 },
    );
  }

  const config = getBookingConfig();
  const [dateIso, time] = parsed.data.date.split('T');
  const [year, month, day] = dateIso.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const requestedStart = zonedTimeToUtc(year, month, day, hour, minute, config.timeZone);

  try {
    // Anti-doble-reserva: la franja debe seguir libre y dentro del horario de atención.
    const slots = await getAvailableSlots(creds, dateIso, config);
    const slot = slots.find((candidate) => candidate.start.getTime() === requestedStart.getTime());

    if (!slot) {
      return NextResponse.json(
        { error: 'Ese horario no está disponible. Por favor elige otra hora.' },
        { status: 409 },
      );
    }

    await createBookingEvent(creds, {
      name: parsed.data.name,
      email: parsed.data.email,
      notes: parsed.data.notes,
      start: slot.start,
      end: slot.end,
      timeZone: config.timeZone,
    });

    return NextResponse.json(
      {
        success: true,
        start: slot.start.toISOString(),
        end: slot.end.toISOString(),
        timeZone: config.timeZone,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: 'No se pudo crear el evento.' }, { status: 502 });
  }
}
