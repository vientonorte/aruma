/**
 * StarDivider Component
 * 
 * Decorative divider with star ornaments following ARUMA aesthetics
 */

import React from 'react';
import { Sparkles } from 'lucide-react';

interface StarDividerProps {
  variant?: 'horizontal' | 'vertical';
  count?: number;
  className?: string;
}

export function StarDivider({ 
  variant = 'horizontal', 
  count = 3,
  className = '' 
}: StarDividerProps) {
  const stars = Array.from({ length: count }, (_, i) => i);

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        {stars.map((i) => (
          <Sparkles 
            key={i} 
            className="w-4 h-4 text-botanical-500" 
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-4 w-full ${className}`} role="separator">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-700 to-neutral-700" />
      {stars.map((i) => (
        <Sparkles 
          key={i} 
          className="w-4 h-4 text-botanical-500 flex-shrink-0" 
          aria-hidden="true"
        />
      ))}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-neutral-700 to-neutral-700" />
    </div>
  );
}
