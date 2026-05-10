/**
 * ARUMA Design System - Badge Atom
 * 
 * Small status and label component
 */

'use client';

import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'botanical';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#2F2F31] text-[#F5F5F7]',
  success: 'bg-[#DCEFE1] text-[#245D3C]',
  warning: 'bg-[#FEF3C7] text-[#D97706]',
  error: 'bg-[#FEE2E2] text-[#B91C1C]',
  info: 'bg-[#DBEAFE] text-[#1E40AF]',
  botanical: 'bg-gradient-to-r from-[#3D9461] to-[#2D764B] text-white',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export function Badge({ variant = 'default', size = 'md', children, className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium';

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}
