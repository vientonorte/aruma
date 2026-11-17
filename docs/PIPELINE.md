# Pipeline ĀRŪḾA — un solo GitHub Pages

SSOT en Obsidian: `Ro/00-sistema/PIPELINE-ARUMA.md`.

## Qué se publica

| URL | Origen | Indexable |
|-----|--------|-----------|
| https://vientonorte.io/aruma/ | tip de `main` | sí (salvo `/brand`) |
| https://vientonorte.io/aruma/qa/ | tip de la rama `qa` | no (`noindex, nofollow` + `robots` Disallow) |

`vientonorte.io` es el dominio custom del user site `vientonorte/vientonorte.github.io`. Este repo es un **project site** de GitHub Pages, así que todo `/aruma/*` lo sirve el artifact de este workflow. No se publica el QA copiando archivos al hub en `/aruma/qa/`: el project site gana esa ruta.

El workflow (`.github/workflows/nextjs.yml`) arma **un solo artifact**: build de `main` con `basePath` `/aruma` en la raíz, y build de `qa` con `basePath` `/aruma/qa` en `out/qa/`. Se dispara cuando CI queda verde en `main` o `qa`, o con `workflow_dispatch`. La producción se construye siempre desde el tip de `main`, no desde la rama que disparó el job.

Si la rama `qa` no existe, `/aruma/qa/` queda en un stub con noindex.

## Ramas y merge

- Feature: `feat/` o `fix/` (o `cursor/` si la abre un agente). El PR nace en **borrador**.
- La rama `qa` se **reconstruye** mergeando sobre `main` los PR en revisión (nunca al revés). Tiene que incluir el `main` que ya lee `NEXT_PUBLIC_BASE_PATH`; si no, el guard del workflow falla.
- Todo PR: revisión de código de TL + seguridad de Hackdr + CI verde.
- Rö hace QA humano en `/aruma/qa/`, da el OK en el chat de M5, y recién ahí va el squash a `main` con mensaje de alcance (qué entra, qué no, reviews, CI, OK de Rö con fecha y hora). Después, smoke en producción.
- Sin merge, deploy ni push a `main` sin ese OK.
- En precios flash no se usa la palabra «desde».

## Desconectar Vercel

Paso **manual, posterior al merge**, y solo con OK explícito de Rö. Los pasos están en el cuerpo del PR de este cambio. Este documento no autoriza ese paso.
