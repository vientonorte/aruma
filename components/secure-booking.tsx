"use client";

import { motion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { z } from "zod";
import { sanitizeInput } from "@/lib/sanitize";

const bookingSchema = z.object({
  consent: z.boolean().refine((value) => value, "Debes aceptar el consentimiento legal."),
  name: z.string().min(2, "Nombre demasiado corto"),
  email: z.string().email("Correo inválido"),
  notes: z.string().max(280, "Máximo 280 caracteres"),
  date: z.string().min(1, "Selecciona fecha y hora"),
});

type BookingState = {
  consent: boolean;
  name: string;
  email: string;
  notes: string;
  date: string;
};

const initialState: BookingState = {
  consent: false,
  name: "",
  email: "",
  notes: "",
  date: "",
};

export function SecureBooking() {
  const [form, setForm] = useState<BookingState>(initialState);
  const [status, setStatus] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const canCollectContactData = form.consent;

  const submitLabel = useMemo(
    () => (form.consent ? "Solicitar reserva segura" : "Acepta el consentimiento para continuar"),
    [form.consent],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const safeForm = {
      consent: form.consent,
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email.toLowerCase()),
      notes: sanitizeInput(form.notes),
      date: form.date,
    };

    const result = bookingSchema.safeParse(safeForm);

    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])));
      return;
    }

    setErrors({});

    const response = await fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setStatus(payload.error ?? "No fue posible completar la reserva.");
      return;
    }

    setForm(initialState);
    setStatus("Reserva enviada de forma segura.");
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-[#2F2F31] bg-[#1C1C1E] p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      aria-label="Formulario seguro de reserva"
    >
      <label className="grid gap-2 text-sm" htmlFor="consent">
        <span className="text-[#F5F5F7]">Consentimiento legal (GDPR/LOPD)</span>
        <span className="text-[#86868B]">Debes aceptar antes de compartir tus datos de contacto.</span>
      </label>
      <input
        id="consent"
        type="checkbox"
        checked={form.consent}
        onChange={(event) => setForm((prev) => ({ ...prev, consent: event.target.checked }))}
        aria-describedby="consent-hint"
        className="h-11 w-11 cursor-pointer rounded border border-[#3A3A3C] accent-[#F5F5F7]"
      />
      <span id="consent-hint" className="sr-only">
        Activa para habilitar nombre, email y fecha.
      </span>

      <label className="grid gap-1 text-sm" htmlFor="name">
        <span className="text-[#F5F5F7]">Nombre completo</span>
        <input
          id="name"
          name="name"
          value={form.name}
          disabled={!canCollectContactData}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="h-11 rounded-xl border border-[#3A3A3C] bg-[#0A0A0A] px-3 text-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
      </label>
      {errors.name && (
        <p id="name-error" role="alert" className="text-sm text-red-300">
          {errors.name}
        </p>
      )}

      <label className="grid gap-1 text-sm" htmlFor="email">
        <span className="text-[#F5F5F7]">Correo electrónico</span>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          disabled={!canCollectContactData}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="h-11 rounded-xl border border-[#3A3A3C] bg-[#0A0A0A] px-3 text-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
      </label>
      {errors.email && (
        <p id="email-error" role="alert" className="text-sm text-red-300">
          {errors.email}
        </p>
      )}

      <label className="grid gap-1 text-sm" htmlFor="date">
        <span className="text-[#F5F5F7]">Fecha y hora</span>
        <input
          id="date"
          name="date"
          type="datetime-local"
          value={form.date}
          disabled={!canCollectContactData}
          onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
          className="h-11 rounded-xl border border-[#3A3A3C] bg-[#0A0A0A] px-3 text-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "date-error" : undefined}
          required
        />
      </label>
      {errors.date && (
        <p id="date-error" role="alert" className="text-sm text-red-300">
          {errors.date}
        </p>
      )}

      <label className="grid gap-1 text-sm" htmlFor="notes">
        <span className="text-[#F5F5F7]">Notas (opcional)</span>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          disabled={!canCollectContactData}
          onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          className="min-h-24 rounded-xl border border-[#3A3A3C] bg-[#0A0A0A] px-3 py-2 text-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
          maxLength={280}
        />
      </label>

      <button
        type="submit"
        disabled={!canCollectContactData}
        className="min-h-11 rounded-full bg-[#F5F5F7] px-4 text-sm font-semibold tracking-wide text-[#0A0A0A] transition hover:bg-white disabled:cursor-not-allowed disabled:bg-[#86868B] disabled:text-[#1C1C1E]"
        aria-label="Enviar solicitud de reserva segura"
      >
        {submitLabel}
      </button>

      {status && (
        <p role="status" aria-live="polite" className="text-sm text-[#F5F5F7]">
          {status}
        </p>
      )}
    </motion.form>
  );
}
