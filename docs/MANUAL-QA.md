<!-- Viento Norte Manual QA v1.0.0 · 2026-07-20 · colectivo -->

# Manual QA — aruma

**App:** Sitio servicios seguridad y confort (Next.js)  
**Repo:** https://github.com/vientonorte/aruma  
**Stack:** Next.js App Router · design system local  
**Versión checklist:** 1.0.0 · 2026-07-20

---

## Mapa de rutas

| Ruta | Contenido |
|------|-----------|
| `/` | Home |
| `/brand` | Brand |
| `/design-system` | Design system |
| `/social-media` | Dossier / piezas social |
| `/privacidad` | Privacidad |
| `/terminos` | Términos |

---

## A · Smoke (5 min) — **obligatorio**

- [ ] **A1** `/` carga; hero/servicios legibles
- [ ] **A2** Console sin errores rojos
- [ ] **A3** Nav a todas las rutas del mapa (sin 404)
- [ ] **A4** Footer / legal links OK
- [ ] **A5** Favicon presente

**Resultado A:** PASS / FAIL

---

## B · Brand + design system (8 min)

- [ ] **B1** `/brand` renderiza tokens/identidad sin layout roto
- [ ] **B2** `/design-system` muestra componentes (botones, tipografía, etc.)
- [ ] **B3** Agenda/servicios editor o preview (si visible): no crash al interactuar
- [ ] **B4** Consistencia visual brand ↔ home (colores, type)

**Resultado B:** PASS / FAIL / N/A

---

## C · Social media dossier (10 min)

- [ ] **C1** `/social-media` carga dossier completo
- [ ] **C2** Carrusel Instagram / feed / reels / stories: navegables
- [ ] **C3** Imágenes no rotas (alt o fallback)
- [ ] **C4** Componentes de layout (triptych, frames) no solapan texto
- [ ] **C5** Mobile: dossier scrolleable sin corte de copy crítico

**Resultado C:** PASS / FAIL / N/A

---

## D · Legal (3 min)

- [ ] **D1** `/privacidad` texto legible y actual
- [ ] **D2** `/terminos` texto legible y actual
- [ ] **D3** Cross-links entre legal y home

**Resultado D:** PASS / FAIL

---

## E · Mobile + performance (8 min)

- [ ] **E1** 390×844: home sin scroll horizontal
- [ ] **E2** Touch targets en CTAs
- [ ] **E3** Imágenes social no desbordan viewport
- [ ] **E4** First load aceptable en red normal (&lt;3s percibido)

**Resultado E:** PASS / FAIL

---

## Z · A11y mínimo (5 min)

- [ ] **Z1** Tab por nav y CTAs
- [ ] **Z2** Focus visible
- [ ] **Z3** Headings en orden razonable por página
- [ ] **Z4** Carruseles: controles alcanzables por teclado o alternativa
- [ ] **Z5** Contraste body/brand spot-check

**Resultado Z:** PASS / FAIL

---

## Go / No-Go

| Check | OK |
|-------|-----|
| Smoke A PASS | [ ] |
| Rutas mapa sin 404 | [ ] |
| Legal D PASS | [ ] |
| Cero S0/S1 | [ ] |

**Decisión:** GO / GO condicional / NO-GO  
**Executor:** ___________ **Fecha:** ___________ **SHA:** ___________

---

## Protocolo colectivo (extracto)

Severidades: **S0** crash/security (bloquea) · **S1** feature crítica (bloquea) · **S2** UX material · **S3** cosmético.

Gate: Smoke A PASS + 0× S0/S1 = GO. Registrar sesión en issue/PR o archivo de log local.

A11y mínimo (sección Z): tab order, focus visible, Escape en modales, contraste spot, reduced-motion.

Fuente del paquete: workflow Viento Norte · Manual QA 1.0.0
