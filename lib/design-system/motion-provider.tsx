/**
 * ARUMA Design System - MotionProvider
 *
 * Carga diferida de framer-motion: los componentes usan `m.*` y las
 * features de animación llegan en un chunk pequeño (domAnimation) en vez
 * del bundle completo. `strict` falla en desarrollo si algún componente
 * vuelve a importar `motion.*` por error.
 */

'use client';

import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
