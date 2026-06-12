/**
 * ARUMA Design System - StatusMessage Molecule
 * 
 * Alert/notification component for user feedback
 */

'use client';

import React from 'react';
import { m } from 'framer-motion';

export type StatusType = 'success' | 'error' | 'warning' | 'info';

export interface StatusMessageProps {
  type: StatusType;
  title?: string;
  message: string;
  onDismiss?: () => void;
}

const typeStyles: Record<StatusType, { bg: string; text: string; border: string }> = {
  success: {
    bg: 'bg-[#DCEFE1]/10',
    text: 'text-[#3D9461]',
    border: 'border-[#3D9461]/30',
  },
  error: {
    bg: 'bg-[#FEE2E2]/10',
    text: 'text-[#EF4444]',
    border: 'border-[#EF4444]/30',
  },
  warning: {
    bg: 'bg-[#FEF3C7]/10',
    text: 'text-[#F59E0B]',
    border: 'border-[#F59E0B]/30',
  },
  info: {
    bg: 'bg-[#DBEAFE]/10',
    text: 'text-[#3B82F6]',
    border: 'border-[#3B82F6]/30',
  },
};

const icons: Record<StatusType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export function StatusMessage({ type, title, message, onDismiss }: StatusMessageProps) {
  const styles = typeStyles[type];

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-start gap-3 rounded-xl border p-4 ${styles.bg} ${styles.border}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <span className={`text-lg ${styles.text}`} aria-hidden="true">
        {icons[type]}
      </span>

      <div className="flex-1">
        {title && <p className={`font-semibold ${styles.text}`}>{title}</p>}
        <p className={`text-sm ${title ? 'mt-1' : ''} text-[#F5F5F7]`}>{message}</p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`ml-auto text-lg ${styles.text} hover:opacity-70 transition-opacity`}
          aria-label="Cerrar mensaje"
        >
          ✕
        </button>
      )}
    </m.div>
  );
}
