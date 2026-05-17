/**
 * FooterMonoLine Component
 * 
 * A single-line footer with ARUMA branding
 */

import React from 'react';
import { typography } from '@/lib/design-system/tokens/typography';

interface FooterMonoLineProps {
  text?: string;
  className?: string;
}

export function FooterMonoLine({ 
  text = 'ARUMA',
  className = '' 
}: FooterMonoLineProps) {
  return (
    <footer 
      className={`w-full border-t border-neutral-800 py-3 ${className}`}
      role="contentinfo"
    >
      <p 
        className="text-center text-xs text-neutral-500 tracking-[0.3em] uppercase font-semibold"
        style={{ letterSpacing: typography.letterSpacing.brand }}
      >
        {text}
      </p>
    </footer>
  );
}
