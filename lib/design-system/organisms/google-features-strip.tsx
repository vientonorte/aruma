/**
 * ARUMA v2 — Franja de confianza con integraciones Google
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Map, Mail, Bell } from 'lucide-react';
import { useBrandConfig } from '@/lib/use-brand-config';

const FEATURE_ICONS = {
  calendar: Calendar,
  maps: Map,
  email: Mail,
  reminders: Bell,
} as const;

type FeatureKey = 'calendarAppointments' | 'maps' | 'emailReminders' | 'autoReminders';

const FEATURE_LABELS: Record<FeatureKey, { label: string; icon: keyof typeof FEATURE_ICONS }> = {
  calendarAppointments: { label: 'Google Calendar', icon: 'calendar' },
  maps: { label: 'Google Maps', icon: 'maps' },
  emailReminders: { label: 'Confirmación Gmail', icon: 'email' },
  autoReminders: { label: 'Recordatorios 24 h', icon: 'reminders' },
};

export function GoogleFeaturesStrip() {
  const brandConfig = useBrandConfig();
  const activeFeatures = (Object.entries(brandConfig.google) as [FeatureKey, boolean][])
    .filter(([, enabled]) => enabled)
    .map(([key]) => FEATURE_LABELS[key]);

  return (
    <section aria-label="Calidad del sitio e integraciones Google">
      <ul className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#86868B]">
        <li className="rounded-full border border-[#2F2F31] bg-[#1C1C1E] px-3 py-1.5">
          ĀRŪḾA v{brandConfig.version} · <span className="text-[#3D9461]">STABLE</span>
        </li>
        <li className="rounded-full border border-[#2F2F31] bg-[#1C1C1E] px-3 py-1.5">
          WCAG 2.1 AA
        </li>
        {activeFeatures.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon];
          return (
            <li
              key={feature.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#2F2F31] bg-[#1C1C1E] px-3 py-1.5"
            >
              <Icon className="h-3.5 w-3.5 text-[#3D9461]" aria-hidden="true" />
              {feature.label}
            </li>
          );
        })}
        <li>
          <Link
            href="/brand"
            className="block rounded-full border border-[#F5F0E8]/40 bg-[#1C1C1E] px-3 py-1.5 text-[#F5F0E8] transition-colors hover:border-[#F5F0E8]"
          >
            Design System →
          </Link>
        </li>
      </ul>
    </section>
  );
}