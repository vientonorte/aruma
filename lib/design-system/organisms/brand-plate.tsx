/**
 * ARUMA Design System - BrandPlate Organism
 *
 * "Uso de la Marca" de la lámina: placa negra con el logotipo ĀRŪḾA en
 * blanco, subtítulo y leyenda inferior.
 */

import React from 'react';
import { ArumaWordmark } from '../atoms/wordmark';

export interface BrandPlateProps {
  subtitle: string;
  caption?: string;
  gray?: string;
  className?: string;
}

export function BrandPlate({ subtitle, caption, gray = '#333333', className = '' }: BrandPlateProps) {
  return (
    <figure className={className}>
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-black px-8 py-7">
        <ArumaWordmark macron className="h-12 text-white" label="ĀRŪḾA" />
        <figcaption className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-white">
          {subtitle}
        </figcaption>
      </div>
      {caption && (
        <p className="mt-2 text-center text-xs font-light" style={{ color: gray }}>
          {caption}
        </p>
      )}
    </figure>
  );
}
