/**
 * ARUMA Design System - Card Atom
 * 
 * Container component for content grouping
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'botanical';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[#1C1C1E] border border-[#2F2F31]',
  elevated: 'bg-[#1C1C1E] shadow-lg',
  outlined: 'bg-transparent border-2 border-[#2F2F31]',
  botanical: 'bg-[#1C1C1E] border border-[#3D9461]/30 shadow-[0_0_20px_rgba(61,148,97,0.1)]',
};

export function Card({ variant = 'default', children, className = '', ...props }: CardProps) {
  const baseStyles = 'rounded-2xl p-5 transition-all duration-250';

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
