/**
 * ARUMA Design System - BrandNav Molecule
 *
 * Navegación de la lámina de identidad: etiquetas en mayúsculas con
 * subrayado en el ítem activo.
 */

import React from 'react';

export interface BrandNavProps {
  items: string[];
  /** Índice del ítem activo (subrayado). */
  active?: number;
  className?: string;
}

export function BrandNav({ items, active = 0, className = '' }: BrandNavProps) {
  return (
    <nav aria-label="Navegación de marca" className={className}>
      <ul className="flex flex-wrap items-center gap-5">
        {items.map((item, index) => (
          <li key={item + index}>
            <a
              href="#"
              aria-current={index === active ? 'page' : undefined}
              className={`text-xs font-bold uppercase tracking-[0.08em] text-black hover:opacity-70 ${
                index === active ? 'border-b-2 border-black pb-0.5' : ''
              }`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
