/**
 * ARUMA Design System - Input Atom
 * 
 * Form input component with validation states
 * Accessibility-first design
 */

'use client';

import React from 'react';

export type InputVariant = 'default' | 'botanical';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  inputSize?: InputSize;
  isInvalid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
  default: 'border-[#3A3A3C] focus:border-[#F5F5F7]',
  botanical: 'border-[#3D9461] focus:border-[#5DAF7D]',
};

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-3 text-base',
  lg: 'h-14 px-4 text-lg',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      inputSize = 'md',
      isInvalid = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-full rounded-xl border bg-[#0A0A0A] text-[#F5F5F7] transition-all duration-250 placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-[#F5F5F7]/20 disabled:cursor-not-allowed disabled:opacity-40';
    const invalidStyles = isInvalid ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20' : '';
    const hasIcons = leftIcon || rightIcon;

    if (hasIcons) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[inputSize]} ${invalidStyles} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
            disabled={disabled}
            aria-invalid={isInvalid}
            {...props}
          />
          {rightIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B]">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[inputSize]} ${invalidStyles} ${className}`}
        disabled={disabled}
        aria-invalid={isInvalid}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
