import { brandConfig, type BrandConfig } from './brand.config';
import { formatBusinessHours } from './business-hours';
import { brandConfigSchema } from './brand-schema';
export const BRAND_STORAGE_KEY = 'aruma-brand-config';
export const BRAND_CONFIG_EVENT = 'aruma-brand-config';

/** Enlace roto conocido (página de citas eliminada en Google Calendar). */
export const DEPRECATED_BOOKING_URL = 'https://calendar.app.google/Gw2Js1fHiAiVwiuS6';

function withDerivedBusinessHours(config: BrandConfig): BrandConfig {
  const rules = config.businessHoursRules ?? brandConfig.businessHoursRules;
  const timezone = config.timezone ?? brandConfig.timezone;
  return {
    ...config,
    businessHoursRules: rules,
    timezone,
    businessHours: formatBusinessHours(rules, timezone),
  };
}

export function mergeBrandConfig(parsed: Partial<BrandConfig>): BrandConfig {
  const merged = withDerivedBusinessHours({
    ...brandConfig,
    ...parsed,
    colors: { ...brandConfig.colors, ...parsed.colors },
    buttons: { ...brandConfig.buttons, ...parsed.buttons },
    project: { ...brandConfig.project, ...parsed.project },
    usage: { ...brandConfig.usage, ...parsed.usage },
    location: { ...brandConfig.location, ...parsed.location },
    google: { ...brandConfig.google, ...parsed.google },
    sessionTypes: parsed.sessionTypes ?? brandConfig.sessionTypes,
    businessHoursRules: parsed.businessHoursRules ?? brandConfig.businessHoursRules,
    timezone: parsed.timezone ?? brandConfig.timezone,
  });

  const result = brandConfigSchema.safeParse(merged);
  if (!result.success) return brandConfig;
  return result.data as BrandConfig;
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

export function persistBrandConfig(config: BrandConfig): void {
  const normalized = withDerivedBusinessHours(config);
  window.localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new Event(BRAND_CONFIG_EVENT));
}

export function clearStoredBrandConfig(): void {
  window.localStorage.removeItem(BRAND_STORAGE_KEY);
  window.dispatchEvent(new Event(BRAND_CONFIG_EVENT));
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