# Pipeline ĀRŪḾA — un solo GitHub Pages

SSOT en Obsidian: `Ro/00-sistema/PIPELINE-ARUMA.md`.

## Qué se publica

| URL | Origen | Indexable |
|-----|--------|-----------|
| https://vientonorte.io/aruma/ | tip de `main` | sí (salvo `/brand`, que ya lleva noindex) |
| https://vientonorte.io/aruma/qa/ | tip de la rama `qa` | no (`noindex, nofollow`) |

`vientonorte.io` es el dominio custom del user site `vientonorte/vientonorte.github.io`. Este repo es un **project site** de GitHub Pages, así que todo `/aruma/*` lo sirve el artifact de este workflow. No se publica el QA copiando archivos al hub en `/aruma/qa/`: el project site gana esa ruta.

El workflow (`.github/workflows/nextjs.yml`) arma **un solo artifact**: build de `main` con `basePath` `/aruma` en la raíz, y build de `qa` con `basePath` `/aruma/qa` en `out/qa/`. Se dispara cuando CI de un **push** a `main` o `qa` queda verde (`workflow_run.event == 'push'`), o con `workflow_dispatch`. No se despliega si el CI verde viene de un `pull_request`: el filtro `branches` de `workflow_run` mira `head_branch`, y un PR o fork llamado `main` o `qa` coincidiría. La producción se construye siempre desde el tip de `main`, no desde la rama que disparó el job.

Si la rama `qa` no existe, `/aruma/qa/` queda en un stub con noindex.

## SEO de `/qa/`

Lo que protege el QA es el meta `robots` `noindex, nofollow` (lo pone Next y el workflow lo refuerza en todo el HTML).

`/aruma/robots.txt` **no rige** el rastreo: los crawlers solo leen `https://vientonorte.io/robots.txt` (el del hub). No se añade un `Disallow: /aruma/qa` al robots del hub (ese repo no se toca en este pipeline). El `Disallow` de `/aruma/qa` que llegó a estar en el robots de este repo se sacó porque no tenía efecto y confundía. El `robots.txt` que el build de QA deja en `/aruma/qa/robots.txt` es solo una convención; tampoco lo consultan los crawlers.

## Ramas y merge

- Feature: `feat/` o `fix/` (o `cursor/` si la abre un agente). El PR nace en **borrador**.
- **M5 reconstruye `qa`**: `git checkout -B qa origin/main`, `git merge --no-ff` de los PR en revisión, `git push --force-with-lease` **solo a `qa`**. Después le manda a TL el SHA de `qa` y la lista PR+SHA. `qa` tiene que incluir el `main` que ya lee `NEXT_PUBLIC_BASE_PATH`; si no, el guard del workflow falla.
- Todo PR: revisión de código de TL + seguridad de Hackdr + CI verde.
- Rö hace QA humano en `/aruma/qa/`, da el OK en el chat de M5, y recién ahí va el squash a `main` con mensaje de alcance (qué entra, qué no, reviews, CI, OK de Rö con fecha y hora). Después, smoke en producción (abajo).
- Sin merge, deploy ni push a `main` sin ese OK.
- En precios flash no se usa la palabra «desde».

## Smoke de merge (producción)

Tras el primer deploy de este pipeline (y en cada ship):

- `https://vientonorte.io/aruma/` responde 200, con el mismo HTML y JSON-LD de `main`.
- `https://vientonorte.io/aruma/qa/` muestra el stub (o el build de `qa`) con `noindex`.
- El job `guard` del workflow corre en verde (solo `workflow_dispatch` o CI de un `push`).
- `https://vientonorte.github.io/aruma` (y `/aruma/`) responde 301 a `https://vientonorte.io/aruma/`.

Activar `https_enforced` en Pages de este repo queda para un pack aparte; no va en este cambio.

## Desconectar Vercel

Paso **manual, posterior al merge**, y solo con OK explícito de Rö. Los pasos están en el cuerpo del PR de este cambio. Este documento no autoriza ese paso.
