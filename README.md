# ĀRŪḾA - High-End Booking & Identity

SPA en Next.js + Tailwind con enfoque **Mobile First**, **A11y WCAG 2.1 AA** y **Security by Design**.

## Desarrollo

```bash
npm install
npm run dev
```

## Variables de entorno (servidor)

Define en `.env.local`:

```bash
GOOGLE_CALENDAR_API_BASE_URL=https://www.googleapis.com/calendar/v3/calendars/<calendar-id>
GOOGLE_CALENDAR_API_KEY=<server-side-token>
```

Las credenciales se usan exclusivamente en `app/api/calendar/route.ts` (API Route), nunca en cliente.

## Seguridad aplicada

- Validación con Zod en cliente y servidor.
- Sanitización básica anti-XSS de entradas de reserva.
- Consentimiento legal explícito (GDPR/LOPD) antes de habilitar datos de contacto.
- Headers de seguridad: CSP, HSTS, X-Content-Type-Options, X-Frame-Options.
