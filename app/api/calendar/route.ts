import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeInput } from "@/lib/sanitize";

const requestSchema = z.object({
  consent: z.literal(true),
  name: z.string().min(2),
  email: z.string().email(),
  notes: z.string().max(280).optional().default(""),
  date: z.string().min(1),
});

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;

  const parsed = requestSchema.safeParse({
    consent: body.consent,
    name: sanitizeInput(String(body.name ?? "")),
    email: sanitizeInput(String(body.email ?? "")).toLowerCase(),
    notes: sanitizeInput(String(body.notes ?? "")),
    date: String(body.date ?? ""),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos de reserva inválidos." }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const apiBaseUrl = process.env.GOOGLE_CALENDAR_API_BASE_URL;

  if (!apiKey || !apiBaseUrl) {
    return NextResponse.json(
      { error: "Integración de calendario no configurada en servidor." },
      { status: 503 },
    );
  }

  const upstream = await fetch(`${apiBaseUrl}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(parsed.data),
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "No se pudo crear el evento." }, { status: 502 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
