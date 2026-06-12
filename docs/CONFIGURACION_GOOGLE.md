# Conectar ĀRŪḾA con tu Google Calendar

Guía paso a paso (~10 minutos, todo gratuito) para que el sitio cree las
reservas directamente en tu agenda de Google. Una vez conectado, **tu
Google Calendar es tu panel de administración**: si mueves o borras un
evento desde el teléfono, la disponibilidad del sitio se actualiza sola.

## 1. Crear el proyecto en Google Cloud

1. Entra a <https://console.cloud.google.com/> con tu cuenta de Google.
2. Arriba a la izquierda: **Selector de proyecto → Proyecto nuevo**.
   Nombre sugerido: `aruma-agenda`. Crear.
3. Con el proyecto seleccionado, ve a **APIs y servicios → Biblioteca**,
   busca **Google Calendar API** y pulsa **Habilitar**.

## 2. Crear la cuenta de servicio (service account)

1. Ve a **APIs y servicios → Credenciales → Crear credenciales →
   Cuenta de servicio**.
2. Nombre: `aruma-reservas`. Pulsa **Crear y continuar** y luego
   **Listo** (no necesita roles del proyecto).
3. Abre la cuenta recién creada → pestaña **Claves** →
   **Agregar clave → Crear clave nueva → JSON → Crear**.
   Se descarga un archivo `.json`: **guárdalo en un lugar seguro y no lo
   subas nunca al repositorio**.

Del archivo JSON necesitarás dos campos:

- `client_email` → variable `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → variable `GOOGLE_PRIVATE_KEY` (pégala completa,
  incluyendo `-----BEGIN PRIVATE KEY-----`; los `\n` literales son válidos)

## 3. Compartir tu calendario con la cuenta de servicio

1. Abre <https://calendar.google.com/> → engranaje → **Configuración**.
2. En la izquierda elige el calendario que usarás para el estudio.
3. Sección **Compartir con determinadas personas**: añade el correo de la
   cuenta de servicio (el `client_email`, termina en
   `iam.gserviceaccount.com`) con permiso **"Hacer cambios en eventos"**.
4. En **Integrar el calendario** copia el **ID del calendario**
   (en cuentas personales suele ser tu propio correo) → variable
   `GOOGLE_CALENDAR_ID`.

## 4. Configurar las variables en el hosting (Vercel)

1. Crea la cuenta gratuita en <https://vercel.com> e importa el
   repositorio `vientonorte/aruma` (Add New → Project). Vercel detecta
   Next.js solo; no hay nada más que configurar.
2. En el proyecto: **Settings → Environment Variables** y agrega las
   variables de `.env.example` (las tres de Google son obligatorias; las
   de horario son opcionales y tienen valores por defecto).
3. Haz **Redeploy**. Listo: el formulario del sitio crea eventos reales.

Para probar en tu computador, copia `.env.example` a `.env.local`,
rellena los valores y ejecuta `npm run dev`.

## 5. Horario de atención

La disponibilidad que ve el cliente se calcula cruzando tu horario de
atención con los huecos libres de tu calendario. Se ajusta con
variables de entorno, sin tocar código:

| Variable | Qué controla | Por defecto |
|---|---|---|
| `BOOKING_TIMEZONE` | Zona horaria del estudio | `America/Santiago` |
| `BOOKING_DAYS` | Días de atención (0=dom … 6=sáb) | `1,2,3,4,5` |
| `BOOKING_OPEN_HOUR` / `BOOKING_CLOSE_HOUR` | Apertura y cierre | `10` / `19` |
| `BOOKING_SESSION_MINUTES` | Duración de la sesión | `60` |
| `BOOKING_BUFFER_MINUTES` | Margen entre sesiones | `15` |
| `BOOKING_MIN_NOTICE_HOURS` | Anticipación mínima | `12` |
| `BOOKING_HORIZON_DAYS` | Hasta cuántos días adelante se reserva | `30` |

¿Quieres bloquear un día u hora puntual (vacaciones, evento personal)?
Crea cualquier evento en tu Google Calendar en ese rango y el sitio
dejará de ofrecerlo automáticamente.

## Nota sobre la invitación al cliente

Google restringe que las cuentas de servicio inviten asistentes cuando se
usa un Gmail personal (sin Google Workspace). El sitio lo intenta y, si
Google lo rechaza, registra igualmente la reserva en tu agenda con los
datos del cliente en la descripción. En la Fase 2 el cliente recibirá
además un correo de confirmación propio de la marca, independiente de
esta limitación.
