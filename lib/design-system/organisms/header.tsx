/**
 * ARUMA Design System - Header Organism
 *
 * Site-wide navigation header with mobile-first disclosure menu.
 */

'use client';

import React, { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '../molecules/logo';

export interface HeaderProps {
  showSubtitle?: boolean;
  navigation?: Array<{ label: string; href: string }>;
  actions?: React.ReactNode;
}

export function Header({ showSubtitle = false, navigation = [], actions }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <m.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-[#2F2F31] bg-[#0A0A0A]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Logo variant="compact" size="md" showSubtitle={showSubtitle} />

        {navigation.length > 0 && (
          <nav
            className="hidden items-center gap-6 md:flex"
            role="navigation"
            aria-label="Navegación principal"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-2 py-1 text-sm font-medium text-[#86868B] transition-colors hover:text-[#F5F5F7] focus-visible:text-[#F5F5F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {actions}
          {navigation.length > 0 && (
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#2F2F31] text-[#F5F5F7] transition-colors hover:bg-[#1A1A1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7] md:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && navigation.length > 0 && (
          <>
            <m.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            />
            <m.nav
              id={menuId}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 top-full z-50 border-b border-[#2F2F31] bg-[#0A0A0A] px-4 py-3 shadow-lg md:hidden"
              aria-label="Navegación móvil"
            >
              <ul className="space-y-1" role="list">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#F5F5F7] hover:bg-[#1A1A1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D9461]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </m.header>
  );
}