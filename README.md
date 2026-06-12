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

## Reservas con Google Calendar

El sitio es **100 % estático** y se publica en **GitHub Pages**
(<https://vientonorte.github.io/aruma>). Las reservas se gestionan con la
**página de citas de Google Calendar** del estudio: el botón "Reservar mi
sesión" abre la agenda, Google muestra solo los cupos libres, evita
dobles reservas y envía confirmación y recordatorios al cliente.

- La URL de la página de citas se administra en `lib/brand.config.ts`
  (`bookingUrl`) o desde la página `/brand` del sitio.
- No se requieren credenciales ni variables de servidor.

## Página /brand

Lámina de identidad viva: logotipo vectorial, paleta, tokens y
componentes de marca, con un editor para que el dueño ajuste colores y
textos desde el navegador.

## Seguridad y privacidad

- Sitio 100 % estático: no recopila datos personales ni usa cookies de seguimiento.
- Las reservas y sus datos se gestionan en Google Calendar; el sitio no
  procesa formularios propios.
- Páginas legales dedicadas: `/privacidad` y `/terminos`.

## Build

```bash
npm run build
```

Genera el sitio estático en `out/` (configurado con `output: "export"` y
`basePath: "/aruma"` para GitHub Pages).

## Lint

```bash
npm run lint
```

## Estructura del Proyecto

```
aruma/
├── app/                      # Next.js App Router
│   ├── brand/               # Lámina de identidad viva
│   ├── design-system/       # Design system showcase
│   ├── privacidad/          # Política de privacidad
│   ├── terminos/            # Términos de uso
│   ├── social-media/        # Plantillas para redes sociales
│   └── page.tsx             # Home page
├── lib/                     # Utilities y Design System
│   ├── brand.config.ts      # Configuración editable de la marca
│   └── design-system/       # Sistema de diseño completo
│       ├── tokens/          # Design tokens
│       ├── atoms/           # Componentes atómicos
│       ├── molecules/       # Componentes moleculares
│       ├── organisms/       # Componentes organismos
│       └── patterns/        # Patrones decorativos
└── public/                  # Assets públicos
```

## Tecnologías

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **TypeScript**: Full type safety
- **Design System**: Atomic Design principles
