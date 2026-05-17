/**
 * IconCircle Component
 * 
 * A circular container for icons with ARUMA branding
 */

import React from 'react';
import { colors } from '@/lib/design-system/tokens/colors';

interface IconCircleProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'botanical' | 'outline';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export function IconCircle({ 
  icon, 
  size = 'md', 
  variant = 'default',
  className = '' 
}: IconCircleProps) {
  const baseStyles = 'rounded-full flex items-center justify-center transition-all duration-300';
  
  const variantStyles = {
    default: `bg-neutral-800 text-neutral-100 hover:bg-neutral-700`,
    botanical: `bg-botanical-500 text-white hover:bg-botanical-600`,
    outline: `border-2 border-neutral-700 text-neutral-100 hover:border-botanical-500 hover:text-botanical-500`,
  };

  return (
    <div 
      className={`${baseStyles} ${sizeMap[size]} ${variantStyles[variant]} ${className}`}
      role="presentation"
    >
      {icon}
    </div>
  );
}
