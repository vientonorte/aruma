import { z } from 'zod';
import { formatBusinessHours } from './business-hours';

const businessHoursRuleSchema = z.object({
  dayOfWeek: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
  open: z.string().regex(/^\d{2}:\d{2}$/),
  close: z.string().regex(/^\d{2}:\d{2}$/),
});

const sessionTypeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(80),
  description: z.string().max(300),
  duration: z.string().min(1),
  priceLabel: z.string().optional(),
  featured: z.boolean().optional(),
  bookingUrl: z.string().optional(),
});

export const brandConfigSchema = z
  .object({
    name: z.string(),
    tagline: z.string(),
    version: z.string(),
    bookingUrl: z.string(),
    contactEmail: z.string().optional(),
    sessionTypes: z.array(sessionTypeSchema).min(1),
    businessHoursRules: z.array(businessHoursRuleSchema).min(1),
    businessHours: z.string(),
    timezone: z.string(),
    location: z.object({
      area: z.string(),
      addressLine: z.string().optional(),
      mapsEmbedUrl: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    }),
    google: z.object({
      calendarAppointments: z.boolean(),
      maps: z.boolean(),
      emailReminders: z.boolean(),
      autoReminders: z.boolean(),
    }),
    colors: z.record(
      z.string(),
      z.object({ label: z.string(), value: z.string() }),
    ),
    nav: z.array(z.string()),
    buttons: z.object({ primary: z.string(), secondary: z.string() }),
    project: z.object({ title: z.string(), description: z.string() }),
    usage: z.object({ subtitle: z.string(), caption: z.string() }),
  })
  .superRefine((data, ctx) => {
    const ids = data.sessionTypes.map((s) => s.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Los id de sesión deben ser únicos',
        path: ['sessionTypes'],
      });
    }

    const featuredCount = data.sessionTypes.filter((s) => s.featured).length;
    if (featuredCount > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Solo una sesión puede estar destacada',
        path: ['sessionTypes'],
      });
    }

    const derived = formatBusinessHours(data.businessHoursRules, data.timezone);
    if (data.businessHours !== derived) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'businessHours debe coincidir con businessHoursRules derivado',
        path: ['businessHours'],
      });
    }
  });

export type BrandConfigInput = z.infer<typeof brandConfigSchema>;