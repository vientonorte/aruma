/**
 * ARUMA Design System - BentoGrid Organism
 * 
 * Modern grid layout for content organization
 */

'use client';

import React from 'react';
import { IconCard, type IconCardProps } from '../molecules/icon-card';

export interface BentoGridProps {
  items: Array<IconCardProps & { span?: 1 | 2 | 3 | 4 }>;
  columns?: 2 | 3 | 4;
}

export function BentoGrid({ items, columns = 4 }: BentoGridProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  const spanClasses = {
    1: '',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'sm:col-span-2 lg:col-span-4',
  };

  return (
    <section
      className={`grid gap-4 ${gridCols[columns]}`}
      role="region"
      aria-label="Cuadrícula de características"
    >
      {items.map((item, index) => {
        const { span = 1, ...cardProps } = item;
        return (
          <div key={index} className={spanClasses[span]}>
            <IconCard {...cardProps} />
          </div>
        );
      })}
    </section>
  );
}
