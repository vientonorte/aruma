/**
 * ARUMA Design System - Textarea Atom
 * 
 * Multi-line text input component
 */

'use client';

import React from 'react';

export type TextareaVariant = 'default' | 'botanical';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  isInvalid?: boolean;
}

const variantStyles: Record<TextareaVariant, string> = {
  default: 'border-[#3A3A3C] focus:border-[#F5F5F7]',
  botanical: 'border-[#3D9461] focus:border-[#5DAF7D]',
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'default', isInvalid = false, className = '', disabled, ...props }, ref) => {
    const baseStyles = 'w-full min-h-24 rounded-xl border bg-[#0A0A0A] px-3 py-2 text-[#F5F5F7] transition-all duration-250 placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-[#F5F5F7]/20 disabled:cursor-not-allowed disabled:opacity-40 resize-y';
    const invalidStyles = isInvalid ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20' : '';

    return (
      <textarea
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${invalidStyles} ${className}`}
        disabled={disabled}
        aria-invalid={isInvalid}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
