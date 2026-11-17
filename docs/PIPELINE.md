# Pipeline ĀRŪḾA — un solo GitHub Pages

SSOT en Obsidian: `Ro/00-sistema/PIPELINE-ARUMA.md`.

## Qué se publica

| URL | Origen | Indexable |
|-----|--------|-----------|
| https://vientonorte.io/aruma/ | SHA de producción (abajo) | sí (salvo `/brand`, que ya lleva noindex) |
| https://vientonorte.io/aruma/qa/ | SHA de la rama `qa` | no (`noindex, nofollow`) |

`vientonorte.io` es el dominio custom del user site `vientonorte/vientonorte.github.io`. Este repo es un **project site** de GitHub Pages, así que todo `/aruma/*` lo sirve el artifact de este workflow. No se publica el QA copiando archivos al hub en `/aruma/qa/`: el project site gana esa ruta.

El workflow (`.github/workflows/nextjs.yml`) arma **un solo artifact** en jobs separados:

1. `guard` — acepta `workflow_dispatch` o CI verde de un **push** en este mismo repo (`workflow_run.event == 'push'` y `head_repository.full_name == github.repository`). El filtro `branches` de `workflow_run` mira `head_branch`, y un PR o fork llamado `main` o `qa` coincidiría. Si el disparo es `main`, prod se construye desde `workflow_run.head_sha` (no desde el tip). Si el disparo es `qa` o un dispatch, el guard verifica por API (checks/status y el run de `ci.yml` en ese SHA) que el tip de `main` tiene CI verde; si no, aborta.
2. `build-prod` — checkout de ese SHA con `persist-credentials: false`, `npm ci --ignore-scripts`, sin `NODE_AUTH_TOKEN`.
3. `build-qa` — job propio, solo `contents:read`, sin secrets, checkout con `persist-credentials: false`, `npm ci --ignore-scripts`. Sube su propio artifact. Si no hay rama `qa`, se salta y el ensamblado deja un stub con noindex.
4. `assemble` — no ejecuta código de QA: descarga ambos artifacts, copia QA a `out/qa/`, inyecta noindex y **falla si `find -type l` encuentra symlinks**.
5. `deploy` — único job con `pages:write` e `id-token:write`. El top-level del workflow solo tiene `contents:read`. `actions:read` y `checks:read` solo están en `guard`.

Las actions van fijadas a un SHA completo (la versión va en un comentario).

`https_enforced` de Pages **no se toca** en este cambio (decisión de Rö, pack aparte).

## SEO de `/qa/`

Lo que protege el QA es el meta `robots` `noindex, nofollow` (lo pone Next y el ensamblado lo refuerza en todo el HTML).

`/aruma/robots.txt` **no rige** el rastreo: los crawlers solo leen `https://vientonorte.io/robots.txt` (el del hub, en la raíz del dominio). **Nunca** añadir un `Disallow` de `/aruma/qa` (ni ningún otro) en el robots de la raíz. El `Disallow` de `/aruma/qa` que llegó a estar en el robots de este repo se sacó porque no tenía efecto y confundía. El `robots.txt` que el ensamblado deja en `/aruma/qa/robots.txt` es solo una convención; tampoco lo consultan los crawlers.

## Ramas y merge

- Feature: `feat/` o `fix/` (o `cursor/` si la abre un agente). El PR nace en **borrador**.
- **Al crear la rama `qa`, hay que protegerla** en GitHub (sin borrado, pushes limitados). El `--force-with-lease` de la reconstrucción solo lo pueden usar quienes reconstruyen (M5 / admins); si la regla bloquea todo force-push, el procedimiento de abajo no se puede aplicar.
- **M5 reconstruye `qa`**: `git checkout -B qa origin/main`, `git merge --no-ff` de los PR en revisión, `git push --force-with-lease` **solo a `qa`**. Después le manda a TL el SHA de `qa` y la lista PR+SHA. `qa` tiene que incluir el `main` que ya lee `NEXT_PUBLIC_BASE_PATH`; si no, el guard del build de QA falla.
- Todo PR: revisión de código de TL + seguridad de Hackdr + CI verde.
- Rö hace QA humano en `/aruma/qa/`, da el OK en el chat de M5, y recién ahí va el squash a `main` con mensaje de alcance (qué entra, qué no, reviews, CI, OK de Rö con fecha y hora). Después, smoke en producción (abajo).
- Sin merge, deploy ni push a `main` sin ese OK.
- En precios flash no se usa la palabra «desde».

## Smoke de merge (producción)

Tras el primer deploy de este pipeline (y en cada ship):

- `https://vientonorte.io/aruma/` responde 200, con el mismo HTML y JSON-LD de `main`.
- `https://vientonorte.io/aruma/qa/` muestra el stub (o el build de `qa`) con `noindex`.
- El job `guard` del workflow corre en verde (solo `workflow_dispatch` o CI de un `push` en este repo).
- `https://vientonorte.github.io/aruma` (y `/aruma/`) responde 301 a `https://vientonorte.io/aruma/`.

## Desconectar Vercel

Paso **manual, posterior al merge**, y solo con OK explícito de Rö. Los pasos están en el cuerpo del PR de este cambio. Este documento no autoriza ese paso.
