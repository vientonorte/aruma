# Mobile-first — ĀRŪḾA

> Quick wins 2026-06-20

## Header

- **Desktop (`md+`)**: links horizontales en `Header`
- **Mobile**: botón hamburger 44×44, panel disclosure, backdrop, Escape cierra
- `aria-expanded` + `aria-controls` en toggle

## Booking (agenda)

| Estado | UX |
|---|---|
| `bookingUrl` válido | CTA → Google Calendar |
| URL vacía/inválida | Warning + mailto `contacto@vientonorte.cl` |
| Owner | Instrucciones → `/brand` → Servicios y agenda |

## Checklist QA móvil

```
□ Header: menú abre/cierra, links ≥44px
□ Home: GoogleBookingPanel sin overflow horizontal
□ /brand: §03 visible; editor scrollea en 375px
□ Sesión cards: radio + badge Signature legibles
□ Footer links: focus ring visible
```

## Pendiente owner

1. Crear página nueva en Google Calendar Appointments
2. Pegar URL en `/brand` → Editar marca
3. Copiar JSON → commit en `lib/brand.config.ts` para prod estático

## Archivos

- `lib/design-system/organisms/header.tsx`
- `lib/design-system/organisms/google-booking-panel.tsx`
- `lib/brand.config.ts`