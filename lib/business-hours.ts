export type BusinessHoursRule = {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  open: string;
  close: string;
};

const DAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
] as const;

const SCHEMA_DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const DEFAULT_BUSINESS_HOURS_RULES: BusinessHoursRule[] = [
  { dayOfWeek: 2, open: '10:00', close: '20:00' },
  { dayOfWeek: 3, open: '10:00', close: '20:00' },
  { dayOfWeek: 4, open: '10:00', close: '20:00' },
  { dayOfWeek: 5, open: '10:00', close: '20:00' },
  { dayOfWeek: 6, open: '10:00', close: '20:00' },
];

export const DEFAULT_TIMEZONE = 'America/Santiago';

function sortRules(rules: BusinessHoursRule[]): BusinessHoursRule[] {
  return [...rules].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
}

function formatDayRange(start: number, end: number): string {
  if (start === end) return DAY_NAMES[start];
  return `${DAY_NAMES[start]} a ${DAY_NAMES[end].toLowerCase()}`;
}

export function formatBusinessHours(
  rules: BusinessHoursRule[],
  tz = DEFAULT_TIMEZONE,
): string {
  if (rules.length === 0) return 'Horario por confirmar';

  const sorted = sortRules(rules);
  const groups: { start: number; end: number; open: string; close: string }[] = [];

  for (const rule of sorted) {
    const last = groups[groups.length - 1];
    if (
      last &&
      last.end === rule.dayOfWeek - 1 &&
      last.open === rule.open &&
      last.close === rule.close
    ) {
      last.end = rule.dayOfWeek;
      continue;
    }
    groups.push({
      start: rule.dayOfWeek,
      end: rule.dayOfWeek,
      open: rule.open,
      close: rule.close,
    });
  }

  const tzLabel =
    tz === 'America/Santiago' ? 'hora Chile continental' : `zona ${tz}`;

  const segments = groups.map(
    (g) => `${formatDayRange(g.start, g.end)}, ${g.open}–${g.close}`,
  );

  return `${segments.join(' · ')} (${tzLabel})`;
}

export function toOpeningHoursSpecification(rules: BusinessHoursRule[]) {
  return sortRules(rules).map((rule) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: SCHEMA_DAY_NAMES[rule.dayOfWeek],
    opens: rule.open,
    closes: rule.close,
  }));
}