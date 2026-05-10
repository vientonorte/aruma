# ĀRŪḾA - High-End Booking & Identity

SPA en Next.js + Tailwind con enfoque **Mobile First**, **A11y WCAG 2.1 AA** y **Security by Design**.

## 🎨 Design System

Este proyecto incluye un **sistema de diseño completo** construido con principios de diseño atómico, inspirado en la identidad de marca ARUMA y el logo con patrones botánicos.

### Características del Design System

- **Design Tokens**: Colores, tipografía, espaciado, bordes, sombras, animaciones
- **Atomic Design**: Componentes organizados en Atoms, Molecules, Organisms
- **Accesibilidad**: WCAG 2.1 AA compliant
- **Mobile First**: Responsive en todos los breakpoints
- **Botanical Patterns**: Patrones decorativos inspirados en el logo
- **TypeScript**: Type-safe en todos los componentes

### Explorar el Design System

- **Documentación**: Ver `lib/design-system/README.md`
- **Showcase**: Visita `/design-system` para ver todos los componentes
- **Resumen**: Ver `DESIGN_SYSTEM_SUMMARY.md` para detalles completos

### Usar Componentes

```tsx
import {
  Button, Card, Hero, BentoGrid, BookingForm
} from '@/lib/design-system';

// Ejemplo
<Hero
  title="ĀRŪḾA"
  variant="botanical"
  description="Tu descripción aquí"
/>
```

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

## Build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Estructura del Proyecto

```
aruma/
├── app/                      # Next.js App Router
│   ├── design-system/       # Design system showcase
│   ├── api/                 # API routes
│   └── page.tsx             # Home page
├── lib/                     # Utilities y Design System
│   ├── design-system/       # Sistema de diseño completo
│   │   ├── tokens/          # Design tokens
│   │   ├── atoms/           # Componentes atómicos
│   │   ├── molecules/       # Componentes moleculares
│   │   ├── organisms/       # Componentes organismos
│   │   └── patterns/        # Patrones decorativos
│   └── sanitize.ts          # Utilidades de sanitización
├── components/              # Componentes legacy (migrar a design-system)
└── public/                  # Assets públicos
```

## Tecnologías

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Validation**: Zod
- **TypeScript**: Full type safety
- **Design System**: Atomic Design principles
