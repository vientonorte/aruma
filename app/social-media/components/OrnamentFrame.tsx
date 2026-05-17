/**
 * OrnamentFrame Component
 * 
 * Decorative frame element with botanical motifs
 */

import React from 'react';

interface OrnamentFrameProps {
  children: React.ReactNode;
  variant?: 'simple' | 'decorative' | 'botanical';
  className?: string;
}

export function OrnamentFrame({ 
  children, 
  variant = 'simple',
  className = '' 
}: OrnamentFrameProps) {
  const variantStyles = {
    simple: 'border-2 border-neutral-700',
    decorative: 'border-2 border-botanical-500 shadow-lg shadow-botanical-500/20',
    botanical: 'border-4 border-double border-botanical-500',
  };

  const cornerStyles = variant === 'decorative' || variant === 'botanical' 
    ? 'relative before:absolute before:top-0 before:left-0 before:w-4 before:h-4 before:border-t-2 before:border-l-2 before:border-botanical-500 after:absolute after:bottom-0 after:right-0 after:w-4 after:h-4 after:border-b-2 after:border-r-2 after:border-botanical-500'
    : '';

  return (
    <div 
      className={`${variantStyles[variant]} ${cornerStyles} rounded-sm overflow-hidden ${className}`}
      role="presentation"
    >
      {children}
    </div>
  );
}
