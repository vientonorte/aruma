/**
 * ARUMA Design System - IconCard Molecule
 * 
 * Card component with icon, title, and description
 */

'use client';

import React from 'react';
import { Card, type CardVariant } from '../atoms/card';
import { Heading, Text } from '../atoms/typography';

export interface IconCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  variant?: CardVariant;
  className?: string;
}

export function IconCard({ icon, title, description, variant = 'default', className = '' }: IconCardProps) {
  return (
    <Card variant={variant} className={className}>
      {icon && <div className="mb-3 text-[#3D9461]" aria-hidden="true">{icon}</div>}
      <Heading as="h3" className="text-lg font-medium text-[#F5F5F7]">
        {title}
      </Heading>
      <Text size="sm" muted className="mt-2">
        {description}
      </Text>
    </Card>
  );
}
