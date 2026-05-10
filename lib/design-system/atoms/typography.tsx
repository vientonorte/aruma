/**
 * ARUMA Design System - Typography Atoms
 * 
 * Semantic text components with brand styling
 */

import React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  brand?: boolean;
  children: React.ReactNode;
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  muted?: boolean;
  children: React.ReactNode;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-5xl font-semibold leading-tight tracking-[0.3em]',
  h2: 'text-4xl font-semibold leading-tight tracking-[0.1em]',
  h3: 'text-3xl font-semibold leading-snug tracking-wider',
  h4: 'text-2xl font-semibold leading-snug tracking-wide',
  h5: 'text-xl font-semibold leading-normal',
  h6: 'text-lg font-medium leading-normal',
};

const textSizeStyles: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export function Heading({ as: Component = 'h2', brand = false, children, className = '', ...props }: HeadingProps) {
  const brandStyles = brand ? 'text-[#F5F5F7]' : '';

  return (
    <Component className={`${headingStyles[Component]} ${brandStyles} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function Text({ size = 'base', muted = false, children, className = '', ...props }: TextProps) {
  const colorStyles = muted ? 'text-[#86868B]' : 'text-[#F5F5F7]';

  return (
    <p className={`${textSizeStyles[size]} ${colorStyles} leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function Label({ children, className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`text-sm font-medium text-[#F5F5F7] ${className}`} {...props}>
      {children}
    </label>
  );
}

export function Caption({ children, className = '', ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`text-xs text-[#86868B] ${className}`} {...props}>
      {children}
    </span>
  );
}

export function Overline({ children, className = '', ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`text-xs font-semibold uppercase tracking-[0.24em] text-[#86868B] ${className}`} {...props}>
      {children}
    </span>
  );
}
