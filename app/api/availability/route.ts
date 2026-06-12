import { NextRequest, NextResponse } from 'next/server';
import { getBookingConfig } from '@/lib/booking-config';
import { getCalendarCredentials } from '@/lib/google-calendar';
import { dateIsoInTz, getAvailabilitySummary, getAvailableSlots } from '@/lib/availability';

const DATE_ISO = /^\d{4}-\d{2}-\d{2}$/;

/**
 * GET /api/availability            → resumen: franjas libres por día del horizonte.
 * GET /api/availability?date=YYYY-MM-DD → franjas libres de ese día.
 */
export async function GET(request: NextRequest) {
  const creds = getCalendarCredentials();
  if (!creds) {
    return NextResponse.json(
      { error: 'Integración de calendario no configurada en servidor.' },
      { status: 503 },
    );
  }

  const config = getBookingConfig();
  const date = request.nextUrl.searchParams.get('date');

  try {
    if (!date) {
      const days = await getAvailabilitySummary(creds, config);
      return NextResponse.json({ timeZone: config.timeZone, days });
    }

    if (!DATE_ISO.test(date)) {
      return NextResponse.json({ error: 'Fecha inválida. Usa el formato YYYY-MM-DD.' }, { status: 400 });
    }

    const today = dateIsoInTz(new Date(), config.timeZone);
    const horizonEnd = dateIsoInTz(
      new Date(Date.now() + config.horizonDays * 86_400_000),
      config.timeZone,
    );
    if (date < today || date > horizonEnd) {
      return NextResponse.json(
        { error: 'La fecha está fuera del período de reserva disponible.' },
        { status: 400 },
      );
    }

    const slots = await getAvailableSlots(creds, date, config);
    return NextResponse.json({
      date,
      timeZone: config.timeZone,
      sessionMinutes: config.sessionMinutes,
      slots: slots.map((slot) => ({
        start: slot.start.toISOString(),
        end: slot.end.toISOString(),
      })),
    });
  } catch {
    return NextResponse.json(
      { error: 'No se pudo consultar la disponibilidad.' },
      { status: 502 },
    );
  }
}
