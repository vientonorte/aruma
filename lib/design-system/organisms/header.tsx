/**
 * ARUMA Design System - Header Organism
 * 
 * Site-wide navigation header
 */

'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Logo } from '../molecules/logo';

export interface HeaderProps {
  showSubtitle?: boolean;
  navigation?: Array<{ label: string; href: string }>;
  actions?: React.ReactNode;
}

export function Header({ showSubtitle = false, navigation = [], actions }: HeaderProps) {
  return (
    <m.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-[#2F2F31] bg-[#0A0A0A]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo variant="compact" size="md" showSubtitle={showSubtitle} />

        {navigation.length > 0 && (
          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Navegación principal">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#86868B] transition-colors hover:text-[#F5F5F7] focus-visible:text-[#F5F5F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7] rounded px-2 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </m.header>
  );
}
