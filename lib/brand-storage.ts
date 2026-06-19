import { brandConfig, type BrandConfig } from './brand.config';

export const BRAND_STORAGE_KEY = 'aruma-brand-config';

/** Enlace roto conocido (página de citas eliminada en Google Calendar). */
export const DEPRECATED_BOOKING_URL = 'https://calendar.app.google/Gw2Js1fHiAiVwiuS6';

export function mergeBrandConfig(parsed: Partial<BrandConfig>): BrandConfig {
  return {
    ...brandConfig,
    ...parsed,
    colors: { ...brandConfig.colors, ...parsed.colors },
    buttons: { ...brandConfig.buttons, ...parsed.buttons },
    project: { ...brandConfig.project, ...parsed.project },
    usage: { ...brandConfig.usage, ...parsed.usage },
    location: { ...brandConfig.location, ...parsed.location },
    google: { ...brandConfig.google, ...parsed.google },
    sessionTypes: parsed.sessionTypes ?? brandConfig.sessionTypes,
  };
}

export function loadStoredBrandConfig(): BrandConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(BRAND_STORAGE_KEY);
    if (!raw) return null;
    return mergeBrandConfig(JSON.parse(raw) as Partial<BrandConfig>);
  } catch {
    return null;
  }
}

const BOOKING_URL_PATTERN =
  /^https:\/\/(calendar\.app\.google\/[A-Za-z0-9_-]+|calendar\.google\.com\/appointments\/)/;

export function isValidBookingUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed || trimmed === DEPRECATED_BOOKING_URL) return false;
  return BOOKING_URL_PATTERN.test(trimmed);
}

export function resolveBookingUrlFromConfig(
  config: BrandConfig,
  session?: BrandConfig['sessionTypes'][number],
): string {
  return session?.bookingUrl ?? config.bookingUrl;
}