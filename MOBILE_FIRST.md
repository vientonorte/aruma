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
| URL vacía/inválida | Warning + mailto `contacto@vientonorte.io` |
| Owner | Instrucciones → `/brand` → Servicios y agenda |

## Checklist QA móvil

```
□ Header: menú abre/cierra, links ≥44px
□ Home: GoogleBookingPanel sin overflow horizontal
□ /brand: §03 visible; editor scrollea en 375px
□ Sesión cards: radio + badge Signature legibles
□ Footer links: focus ring visible
```

## Pendiente owner → SPRINT ĀRŪḾA (deploy esta semana)

Ver **`SPRINT_ARUMA.md`** (decisión bloqueada):

1. Cuenta Google **tercera solo-ĀRŪḾA** (no gaete.gaona; no IGNIARUS/ANTAKUNZA)
2. Calendario `ĀRŪḾA · Citas` + 3 agendas + share a gaete.gaona
3. Pegar `calendar.app.google/…` en `lib/brand.config.ts` → build → deploy

## Archivos

- `lib/design-system/organisms/header.tsx`
- `lib/design-system/organisms/google-booking-panel.tsx`
- `lib/brand.config.ts`