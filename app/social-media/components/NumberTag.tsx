/**
 * NumberTag Component
 * 
 * A numbered badge/tag component following ARUMA design principles
 */

import React from 'react';
import { typography } from '@/lib/design-system/tokens/typography';

interface NumberTagProps {
  number: number | string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'botanical' | 'outline';
  className?: string;
}

const sizeMap = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

export function NumberTag({ 
  number, 
  size = 'md', 
  variant = 'default',
  className = '' 
}: NumberTagProps) {
  const baseStyles = 'rounded-full flex items-center justify-center font-bold transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-neutral-800 text-neutral-100',
    botanical: 'bg-botanical-500 text-white',
    outline: 'border-2 border-neutral-700 text-neutral-100',
  };

  return (
    <div 
      className={`${baseStyles} ${sizeMap[size]} ${variantStyles[variant]} ${className}`}
      role="img"
      aria-label={`Number ${number}`}
      style={{ letterSpacing: typography.letterSpacing.wide }}
    >
      {number}
    </div>
  );
}
