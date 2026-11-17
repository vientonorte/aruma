/** Única fuente de verdad para basePath — importar también en next.config.ts */
export const SITE_BASE_PATH = '/aruma';

export function withBasePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_BASE_PATH}${normalized}`.replace(/\/+/g, '/');
}