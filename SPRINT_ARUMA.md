# SPRINT ĀRŪḾA — Google Citas + deploy (esta semana)

**Estado:** en ejecución · **bloqueado en cuenta Google humana**  
**Meta deploy:** `vientonorte.io/aruma` con agenda Google activa y marca enmascarada  
**Fecha target:** semana en curso (deploy)  
**Actualizado:** 2026-08-04 · M5 (post Sketch FO)

### Progreso automático (repo)

| Paso | Estado |
|---|---|
| Playbook + DoD en repo | ✅ `SPRINT_ARUMA.md` |
| `bookingUrl` vacío + mailto fallback | ✅ `lib/brand.config.ts` |
| 3 sessionTypes alineados (30/90/120) + slots link | ✅ listos para pegar |
| README / MOBILE_FIRST punteros | ✅ |
| Cuenta Google tercera ĀRŪḾA | ⬜ **humano** |
| 3 agendas + share gaete.gaona | ⬜ **humano** |
| Links en `brand.config.ts` | ⬜ tras pasos Google |
| `npm run build` + push main → Pages | ⬜ tras links (o deploy fallback ya posible) |
| Smoke prod CTA Calendar | ⬜ |

---

## Decisión bloqueada

| Tema | Decisión |
|---|---|
| Identidad pública | **Cuenta Google tercera solo-ĀRŪḾA** (no `gaete.gaona`) |
| No usar para citas | `IGNIARUS`, `ANTAKUNZA` (quedan fuera de booking) |
| Operador | `gaete.gaona` solo vía **calendario compartido** |
| Producto | Google Calendar → Páginas de reserva (Appointment Schedule) |
| Código | `bookingUrl` vacío hoy → CTA en “reconfiguración” + mailto `contacto@vientonorte.cl` |

---

## DoD (Definition of Done) — deploy

- [ ] Cuenta Google **ĀRŪḾA** creada (Gmail marca o `…@vientonorte.cl`)
- [ ] Nombre cuenta: **Estudio ĀRŪḾA** · foto = logo
- [ ] Calendario secundario: **ĀRŪḾA · Citas** · TZ `America/Santiago`
- [ ] Compartido con `gaete.gaona` → permiso *Hacer cambios en eventos*
- [ ] 3 agendas de citas en ese calendario:

  | Título | Duración |
  |---|---|
  | Consulta inicial | 30 min |
  | Sesión fotográfica íntima | 90 min |
  | Exploración Rigger / Tantra | 120 min |

- [ ] Ubicación pública: `Santiago (detalle al confirmar)` (sin dirección exacta si no se quiere)
- [ ] Recordatorio 24 h activo
- [ ] QA enmascarado con Gmail ajeno: no aparece Gaete/Gaona; organizador = mail ĀRŪḾA
- [ ] `gaete.gaona` ve el evento de prueba en el calendario compartido
- [ ] Links `calendar.app.google/…` pegados en `lib/brand.config.ts` (`bookingUrl` y/o por sesión)
- [ ] `npm run build` + deploy GitHub Pages / ruta prod
- [ ] Smoke en `https://vientonorte.io/aruma`: CTA **Continuar en Google Calendar** (sin warning)

---

## Playbook Google (orden fijo)

1. Crear cuenta tercera (solo marca; sin datos personales de Rodrigo).
2. [Info personal](https://myaccount.google.com/personal-info) → nombre + logo.
3. [Calendar](https://calendar.google.com) → crear **ĀRŪḾA · Citas** → compartir con gaete.gaona.
4. [Páginas de reserva](https://calendar.google.com/calendar/u/0/r/appointments) → 3 agendas → copiar links.
5. Pegar en código (abajo) → build → deploy.
6. Reserva de prueba → cancelar prueba.

---

## Cableado en repo (cuando existan los links)

Archivo: `lib/brand.config.ts`

```ts
// Global (mínimo viable — un solo link de “consulta” o hub)
bookingUrl: 'https://calendar.app.google/XXXX',

// Opcional: un link por sesión
sessionTypes: [
  { id: 'consulta', bookingUrl: 'https://calendar.app.google/…', /* … */ },
  { id: 'foto-intima', bookingUrl: 'https://calendar.app.google/…', /* … */ },
  { id: 'rigger-tantra', bookingUrl: 'https://calendar.app.google/…', /* … */ },
],
```

Alternativa pre-commit: pegar en live `/aruma/brand` → exportar JSON → copiar a `brand.config.ts`.

---

## Fuera de alcance de este sprint

- Reusar o renombrar IGNIARUS / ANTAKUNZA para citas
- Formulario propio de reserva en el sitio (sigue 100 % estático → Google)
- Stripe / cobro en Calendar (opcional post-deploy)

---

## Handoff en 1 línea

> Cuenta **tercera ĀRŪḾA** = anfitrión · **gaete.gaona** = operador · **IGNIARUS/ANTAKUNZA** = no booking · deploy cuando `bookingUrl` válido en prod.
