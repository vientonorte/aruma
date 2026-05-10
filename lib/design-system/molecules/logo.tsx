/**
 * ARUMA Design System - Logo Molecule
 * 
 * Brand logo component with variants
 */

'use client';

import React from 'react';
import { Heading, Overline } from '../atoms/typography';

export type LogoVariant = 'full' | 'compact' | 'icon';
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  showSubtitle?: boolean;
  className?: string;
}

const sizeStyles: Record<LogoSize, { heading: string; subtitle: string }> = {
  sm: { heading: 'text-2xl', subtitle: 'text-[0.5rem]' },
  md: { heading: 'text-4xl', subtitle: 'text-xs' },
  lg: { heading: 'text-5xl', subtitle: 'text-sm' },
  xl: { heading: 'text-7xl', subtitle: 'text-base' },
};

export function Logo({ variant = 'full', size = 'md', showSubtitle = false, className = '' }: LogoProps) {
  const styles = sizeStyles[size];

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div className="relative">
          <span className={`font-bold ${styles.heading}`}>Ā</span>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <path
                d="M50 20 Q30 35, 40 50 Q30 65, 50 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-[#3D9461]"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex flex-col ${className}`}>
        <Heading as="h1" brand className={styles.heading}>
          ĀRŪḾA
        </Heading>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <Overline className={`mb-1 ${styles.subtitle}`}>High-End Booking & Identity</Overline>
      <Heading as="h1" brand className={styles.heading}>
        ĀRŪḾA
      </Heading>
      {showSubtitle && (
        <p className={`mt-2 ${styles.subtitle} text-[#86868B]`}>
          &apos;RIGGER / TANTRA&apos; • Fotografía y Espacio Seguro
        </p>
      )}
    </div>
  );
}
