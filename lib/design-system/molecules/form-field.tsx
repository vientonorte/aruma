/**
 * ARUMA Design System - FormField Molecule
 * 
 * Complete form field with label, input, and error message
 */

'use client';

import React from 'react';
import { Input, type InputProps } from '../atoms/input';
import { Textarea, type TextareaProps } from '../atoms/textarea';
import { Label } from '../atoms/typography';

interface BaseFormFieldProps {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

interface FormFieldInputProps extends BaseFormFieldProps {
  type?: 'input';
  inputProps?: Omit<InputProps, 'id' | 'aria-invalid' | 'aria-describedby'>;
  textareaProps?: never;
}

interface FormFieldTextareaProps extends BaseFormFieldProps {
  type: 'textarea';
  inputProps?: never;
  textareaProps?: Omit<TextareaProps, 'id' | 'aria-invalid' | 'aria-describedby'>;
}

export type FormFieldProps = FormFieldInputProps | FormFieldTextareaProps;

export function FormField({
  label,
  id,
  error,
  hint,
  required = false,
  type = 'input',
  inputProps,
  textareaProps,
}: FormFieldProps) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const ariaDescribedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-[#EF4444]" aria-label="requerido">*</span>}
      </Label>

      {hint && !hasError && (
        <p id={hintId} className="text-sm text-[#86868B]">
          {hint}
        </p>
      )}

      {type === 'input' ? (
        <Input
          id={id}
          isInvalid={hasError}
          aria-describedby={ariaDescribedBy}
          required={required}
          {...inputProps}
        />
      ) : (
        <Textarea
          id={id}
          isInvalid={hasError}
          aria-describedby={ariaDescribedBy}
          required={required}
          {...textareaProps}
        />
      )}

      {hasError && (
        <p id={errorId} role="alert" className="text-sm text-[#EF4444]">
          {error}
        </p>
      )}
    </div>
  );
}
