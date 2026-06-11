# Propuesta técnica — ĀRŪḾA funcional con agenda Google y experiencia premium

**Fecha:** Junio 2026
**Objetivo:** Dejar el sitio 100 % operativo, conectado al Google Calendar del dueño para administrar la agenda online, y con una experiencia de usuario premium de alto rendimiento.

---

## 1. Diagnóstico del estado actual

### Lo que ya está bien

| Área | Estado |
|---|---|
| Design system | Completo (tokens, atoms, molecules, organisms, patrones botánicos) |
| Accesibilidad | Buen punto de partida WCAG 2.1 AA (labels, aria, roles) |
| Seguridad | Validación Zod cliente/servidor, sanitización, consentimiento GDPR, headers |
| Stack | Next.js 16 + React 19 + Tailwind v4 + Framer Motion, moderno y vigente |

### Problemas críticos que impiden que el sitio sea funcional

1. **La integración con Google Calendar no puede funcionar como está escrita.**
   `app/api/calendar/route.ts` envía una *API key* como token `Bearer`. La API de
   Google Calendar **no acepta API keys para crear eventos** (solo lectura de
   calendarios públicos); crear eventos exige OAuth 2.0 o una *Service Account*.
   Además, el payload enviado (`name`, `email`, `notes`, `date`) no corresponde al
   esquema de la API de Google (`summary`, `start.dateTime`, `end.dateTime`, etc.).
   Resultado: toda reserva termina en error 502, siempre.

2. **El hosting actual (GitHub Pages) es incompatible con la reserva online.**
   El workflow `.github/workflows/nextjs.yml` despliega una exportación estática
   (`./out`). GitHub Pages no ejecuta servidores: la ruta `/api/calendar` jamás
   podrá correr ahí. Además `next.config.ts` no declara `output: 'export'`, por lo
   que el build de Pages probablemente falla, y los headers de seguridad (`CSP`,
   `HSTS`) definidos en `headers()` **no aplican** en un sitio estático.

3. **No hay gestión de disponibilidad.** El cliente elige cualquier fecha/hora con
   un `datetime-local` libre: permite reservar a las 3 AM, en días ocupados o dos
   personas a la misma hora. No hay consulta de horarios libres ni anti-doble-reserva.

4. **No hay confirmación.** Ni correo al cliente, ni notificación al dueño, ni
   invitación de calendario para el cliente.

5. **Deuda menor:** `components/secure-booking.tsx` es un duplicado legacy del
   `BookingForm` del design system; la página principal es 100 % `'use client'`
   (pierde los beneficios de Server Components); no hay metadata SEO ni Open Graph.

---

## 2. Propuesta de solución

### Decisión de arquitectura: conexión con Google

**Recomendado — Opción A: Service Account (cuenta de servicio).**
Se crea una cuenta de servicio en Google Cloud y se comparte el calendario del
dueño con ella (permiso "Hacer cambios en eventos"). El servidor crea/lee eventos
directamente en **tu** Google Calendar, sin pantallas de login ni renovación de
tokens. Tu agenda en el teléfono se convierte en el panel de administración:
mover o borrar un evento en Google Calendar actualiza la disponibilidad del sitio
automáticamente.

*Opción B (alternativa): OAuth 2.0 con refresh token.* Solo necesaria si más
adelante quieres acciones "en nombre de" otros usuarios de Google. Más fricción
de mantenimiento; no se recomienda para esta etapa.

### Decisión de hosting

**Recomendado: migrar a Vercel (plan gratuito).** Es el hosting nativo de
Next.js: ejecuta las API routes, aplica los headers de seguridad, optimiza
imágenes y fuentes, y da previews por cada PR. GitHub Pages se descarta para
producción (puede quedar como espejo estático informativo si se quisiera).

---

## 3. Plan de trabajo por fases

### Fase 1 — Fundamentos: conexión real con Google (prioridad máxima)
- Reescribir `app/api/calendar/route.ts` usando `googleapis` con Service Account
  (JWT), creando eventos con el esquema correcto: título con nombre del cliente,
  `start`/`end` con zona horaria, cliente como invitado (recibe la invitación de
  Google automáticamente), recordatorios y notas.
- Nuevo endpoint `GET /api/availability`: consulta *FreeBusy* de tu calendario y
  devuelve los huecos libres según tu horario de atención configurable
  (días, horas, duración de sesión, tiempo de margen entre sesiones).
- Variables de entorno seguras: `GOOGLE_SERVICE_ACCOUNT_EMAIL`,
  `GOOGLE_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID`, `BOOKING_TIMEZONE`.
- Migración del despliegue a Vercel y retiro del workflow de Pages.

### Fase 2 — Agenda online premium
- Reemplazar el `datetime-local` por un **selector de citas en dos pasos**:
  calendario mensual (días con disponibilidad marcados) → franjas horarias
  disponibles ese día. Imposible reservar horas ocupadas.
- Anti-doble-reserva: re-verificación de disponibilidad en el servidor justo
  antes de crear el evento.
- Confirmación por correo al cliente (vía la invitación nativa de Google
  Calendar; opcionalmente correo de marca con Resend) y evento instantáneo en tu
  agenda con todos los datos del cliente.
- Selección de tipo de sesión (duración/precio configurables) como primer paso
  del flujo de reserva.

### Fase 3 — Experiencia premium de alto rendimiento
- Convertir la página principal a Server Components (solo el flujo de reserva
  queda como isla de cliente) → menos JavaScript, carga más rápida.
- `LazyMotion` de Framer Motion, `next/font` para tipografías, imágenes
  optimizadas con `next/image`. Meta: Lighthouse ≥ 95 en móvil.
- Flujo de reserva multi-paso con microanimaciones (servicio → día → hora →
  datos → confirmación) y estados de carga/éxito cuidados.
- SEO completo: metadata, Open Graph, JSON-LD `LocalBusiness` (aparecer bien en
  Google y al compartir en redes).
- Limpieza: eliminar `components/secure-booking.tsx` (duplicado), ajustar CSP.

### Fase 4 — Opcional, post-lanzamiento
- Enlaces de cancelación/reagendamiento para el cliente.
- Recordatorio automático 24 h antes (Google lo hace nativo para invitados).
- Botón de contacto WhatsApp, analítica de conversión, panel de métricas simple.

---

## 4. Qué se necesita de ti (dueño)

1. **Proyecto en Google Cloud** (gratuito): habilitar la API de Google Calendar y
   crear la Service Account — puedo guiarte paso a paso, son ~10 minutos.
2. **Compartir tu calendario** con el correo de la service account.
3. **Cuenta en Vercel** (gratuita) conectada al repo de GitHub.
4. Definir: horario de atención, duración de cada tipo de sesión y zona horaria.

## 5. Alternativa de bajo costo (si no se quiere desarrollo a medida)

Incrustar la *Página de citas* nativa de Google Calendar o Calendly en el sitio
estático actual. Funciona en GitHub Pages sin servidor, pero rompe la estética
de marca y la experiencia premium. Se menciona por transparencia; no es la
recomendación.

---

**Recomendación final:** ejecutar Fases 1–3. Con eso el sitio queda funcional de
punta a punta: el cliente reserva solo en horarios realmente libres, tú
administras todo desde tu Google Calendar, y la experiencia es rápida, accesible
y al nivel de la marca ĀRŪḾA.
