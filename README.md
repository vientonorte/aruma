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

## Conexión con Google Calendar

Las reservas se crean directamente en el Google Calendar del estudio
mediante una **Service Account** (sin pantallas de login). La
disponibilidad se calcula cruzando el horario de atención con FreeBusy.

- Guía de configuración paso a paso: [`docs/CONFIGURACION_GOOGLE.md`](docs/CONFIGURACION_GOOGLE.md)
- Variables de entorno: ver [`.env.example`](.env.example) (copiar a `.env.local` en desarrollo)
- Endpoints: `GET /api/availability` (franjas libres) y `POST /api/calendar` (crear reserva)

Las credenciales se usan exclusivamente en las API Routes del servidor, nunca en cliente.

> **Hosting:** el sitio requiere un hosting con soporte de servidor
> (recomendado: Vercel). GitHub Pages solo puede servir la parte
> estática; el flujo de reservas no funciona ahí.

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
