/** Única fuente de verdad para basePath — importar también en next.config.ts */
function normalizeBasePath(raw: string | undefined): string {
  const value = (raw ?? "/aruma").trim();
  if (!value || value === "/") return "";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

export const SITE_BASE_PATH = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

/** Build de QA publicado en /aruma/qa/ — noindex y sin datos estructurados de prod. */
export const IS_QA_BUILD =
  process.env.NEXT_PUBLIC_NOINDEX === "1" || SITE_BASE_PATH.endsWith("/qa");

export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_PATH}${normalized}`.replace(/\/+/g, "/");
}
