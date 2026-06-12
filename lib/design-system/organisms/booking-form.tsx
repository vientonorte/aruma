/**
 * ARUMA Design System - BookingForm Organism
 * 
 * Complete secure booking form with validation
 */

'use client';

import React, { useState, FormEvent } from 'react';
import { m } from 'framer-motion';
import { z } from 'zod';
import { sanitizeInput } from '@/lib/sanitize';
import { FormField } from '../molecules/form-field';
import { SlotPicker } from '../molecules/slot-picker';
import { Button } from '../atoms/button';
import { StatusMessage } from '../molecules/status-message';
import { Card } from '../atoms/card';
import { Heading, Text } from '../atoms/typography';

const bookingSchema = z.object({
  consent: z.boolean().refine((value) => value, 'Debes aceptar el consentimiento legal.'),
  name: z.string().min(2, 'Nombre demasiado corto'),
  email: z.string().email('Correo inválido'),
  notes: z.string().max(280, 'Máximo 280 caracteres'),
  date: z.string().min(1, 'Selecciona fecha y hora'),
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
  name: '',
  email: '',
  notes: '',
  date: '',
};

export interface BookingFormProps {
  onSubmit?: (data: BookingState) => Promise<{ success: boolean; message?: string }>;
  variant?: 'default' | 'botanical';
}

export function BookingForm({ onSubmit, variant = 'default' }: BookingFormProps) {
  const [form, setForm] = useState<BookingState>(initialState);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  // Remonta el SlotPicker tras reservar para refrescar la disponibilidad.
  const [pickerKey, setPickerKey] = useState(0);

  const canCollectContactData = form.consent;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsLoading(true);

    // Sanitize and normalize email (apply toLowerCase after sanitization for consistency)
    const safeForm = {
      consent: form.consent,
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email).toLowerCase(),
      notes: sanitizeInput(form.notes),
      date: form.date,
    };

    const result = bookingSchema.safeParse(safeForm);

    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])));
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      if (onSubmit) {
        const response = await onSubmit(result.data);
        if (response.success) {
          setForm(initialState);
          setStatus({ type: 'success', message: response.message || 'Reserva enviada de forma segura.' });
        } else {
          setStatus({ type: 'error', message: response.message || 'No fue posible completar la reserva.' });
        }
      } else {
        const response = await fetch('/api/calendar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data),
        });

        const payload = (await response.json()) as {
          error?: string;
          start?: string;
          timeZone?: string;
        };

        if (!response.ok) {
          setStatus({ type: 'error', message: payload.error ?? 'No fue posible completar la reserva.' });
        } else {
          setForm(initialState);
          setPickerKey((key) => key + 1);
          const confirmed =
            payload.start && payload.timeZone
              ? new Intl.DateTimeFormat('es-CL', {
                  timeZone: payload.timeZone,
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                  hourCycle: 'h23',
                }).format(new Date(payload.start))
              : null;
          setStatus({
            type: 'success',
            message: confirmed
              ? `Reserva confirmada para el ${confirmed}. Quedó agendada en nuestro calendario.`
              : 'Reserva enviada de forma segura.',
          });
        }
      }
    } catch {
      setStatus({ type: 'error', message: 'Error al procesar la solicitud.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card variant={variant === 'botanical' ? 'botanical' : 'default'}>
      <Heading as="h2" className="mb-2 text-xl">
        Formulario de Reserva Segura
      </Heading>
      <Text size="sm" muted className="mb-6">
        Completa el siguiente formulario para solicitar una reserva de forma segura.
      </Text>

      <m.form
        onSubmit={handleSubmit}
        className="grid gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="grid gap-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
              className="mt-1 h-5 w-5 cursor-pointer rounded border border-[#3A3A3C] accent-[#F5F5F7]"
              aria-describedby="consent-description"
            />
            <div>
              <span className="text-sm font-medium text-[#F5F5F7]">Consentimiento legal (GDPR/LOPD)</span>
              <p id="consent-description" className="mt-1 text-sm text-[#86868B]">
                Acepto el procesamiento de mis datos personales según la normativa de protección de datos.
              </p>
            </div>
          </label>
          {errors.consent && (
            <p role="alert" className="text-sm text-[#EF4444]">
              {errors.consent}
            </p>
          )}
        </div>

        <FormField
          label="Nombre completo"
          id="name"
          required
          error={errors.name}
          inputProps={{
            value: form.name,
            disabled: !canCollectContactData,
            onChange: (e) => setForm((prev) => ({ ...prev, name: e.target.value })),
            placeholder: 'Tu nombre completo',
          }}
        />

        <FormField
          label="Correo electrónico"
          id="email"
          required
          error={errors.email}
          inputProps={{
            type: 'email',
            value: form.email,
            disabled: !canCollectContactData,
            onChange: (e) => setForm((prev) => ({ ...prev, email: e.target.value })),
            placeholder: 'tu@email.com',
          }}
        />

        <SlotPicker
          key={pickerKey}
          value={form.date}
          onChange={(date) => setForm((prev) => ({ ...prev, date }))}
          disabled={!canCollectContactData}
          error={errors.date}
        />

        <FormField
          label="Notas (opcional)"
          id="notes"
          type="textarea"
          hint="Máximo 280 caracteres"
          error={errors.notes}
          textareaProps={{
            value: form.notes,
            disabled: !canCollectContactData,
            onChange: (e) => setForm((prev) => ({ ...prev, notes: e.target.value })),
            maxLength: 280,
            placeholder: 'Información adicional sobre tu reserva...',
          }}
        />

        <Button
          type="submit"
          variant={variant === 'botanical' ? 'botanical' : 'primary'}
          size="lg"
          disabled={!canCollectContactData}
          isLoading={isLoading}
          className="w-full"
        >
          {canCollectContactData ? 'Solicitar reserva segura' : 'Acepta el consentimiento para continuar'}
        </Button>

        {status && (
          <StatusMessage
            type={status.type}
            message={status.message}
            onDismiss={() => setStatus(null)}
          />
        )}
      </m.form>
    </Card>
  );
}
