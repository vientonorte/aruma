/**
 * ARUMA Design System - Footer Organism
 * 
 * Site-wide footer with links and info
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../molecules/logo';
import { Text, Caption } from '../atoms/typography';
import { BotanicalPattern } from '../patterns/botanical';

export interface FooterProps {
  links?: Array<{
    title: string;
    items: Array<{ label: string; href: string }>;
  }>;
  socialLinks?: Array<{ label: string; href: string; icon: React.ReactNode }>;
  copyright?: string;
}

export function Footer({ links = [], socialLinks = [], copyright }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-[#2F2F31] bg-[#0A0A0A]">
      <div className="absolute right-0 top-0 opacity-5">
        <BotanicalPattern variant="branch" size="xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="compact" size="sm" />
            <Text size="sm" muted className="mt-4 max-w-xs">
              Experiencia premium de reservas con seguridad por diseño y accesibilidad universal.
            </Text>
          </div>

          {links.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#F5F5F7]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#86868B] transition-colors hover:text-[#F5F5F7] focus-visible:text-[#F5F5F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-8 flex items-center gap-4 border-t border-[#2F2F31] pt-8">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                aria-label={social.label}
                className="text-[#86868B] transition-colors hover:text-[#3D9461] focus-visible:text-[#3D9461] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7] rounded"
              >
                {social.icon}
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 border-t border-[#2F2F31] pt-8">
          <Caption>
            {copyright || `© ${currentYear} ĀRŪḾA. Todos los derechos reservados.`}
          </Caption>
        </div>
      </div>
    </footer>
  );
}
