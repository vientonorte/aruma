/**
 * ARUMA Design System - Wordmark Atom
 *
 * Logotipo ARUMA recreado como vectores: cada letra es un path SVG
 * independiente (letra por letra), en el estilo angular y pesado de la
 * fuente primaria "ARUMA Display". Variantes:
 *
 * - solid:   letras planas (versión minimalista / solo tipografía)
 * - leaves:  patrón botánico/shibari trazado dentro de las letras
 * - macron:  diacríticos de marca (ĀRŪḾA) para el uso "RIGGER / TANTRA"
 *
 * El color se hereda de `currentColor`, por lo que funciona en positivo
 * (negro sobre claro) y en negativo (blanco sobre negro) sin cambios.
 */

import React from 'react';

/** Caja de cada glifo: 100 de alto × 96 de ancho, separación 18. */
const GLYPH_W = 96;
const GLYPH_GAP = 18;
const GLYPH_H = 100;
/** Espacio superior reservado para los diacríticos (macrones). */
const MACRON_H = 22;

type Glyph = {
  char: string;
  /** Contorno del glifo (fill-rule evenodd para los contraformas). */
  d: string;
  /** Trazo del diacrítico de la variante macron, si corresponde. */
  macron?: string;
};

/**
 * Glifos angulares, vector por vector. Coordenadas en caja 0..96 × 0..100.
 * Terminales en cuña y cortes diagonales, fieles al estilo de la lámina.
 */
export const ARUMA_GLYPHS: Glyph[] = [
  {
    char: 'A',
    d:
      'M2 100 L34 0 L66 6 L94 100 L68 100 L61 76 L33 76 L26 100 Z ' +
      'M39 56 L55 56 L47 26 Z',
    macron: 'M26 -16 L70 -16 L74 -8 L30 -8 Z',
  },
  {
    char: 'R',
    d:
      'M6 0 L70 0 L92 16 L92 48 L72 62 L94 100 L66 100 L48 66 L32 66 L32 100 L6 100 Z ' +
      'M32 22 L32 46 L62 46 L68 40 L68 28 L60 22 Z',
  },
  {
    char: 'U',
    d:
      'M4 0 L30 0 L30 66 L40 80 L56 80 L66 66 L66 0 L92 0 L92 72 L68 100 L28 100 L4 72 Z',
    macron: 'M26 -16 L70 -16 L74 -8 L30 -8 Z',
  },
  {
    char: 'M',
    d:
      'M4 100 L4 0 L30 0 L48 36 L66 0 L92 0 L92 100 L68 100 L68 48 L48 80 L28 48 L28 100 Z',
    macron: 'M38 -20 L52 -8 L44 -2 L32 -12 Z',
  },
  {
    char: 'A',
    d:
      'M2 100 L30 6 L62 0 L94 100 L68 100 L61 76 L33 76 L26 100 Z ' +
      'M39 56 L55 56 L47 26 Z',
  },
];

/** Hojas/ligaduras trazadas dentro de las letras (patrón botánico de la marca). */
const LEAF_VINES = [
  'M150 30 q22 18 8 44 q-4 8 -14 12',
  'M168 70 q14 -22 38 -24',
  'M262 26 q-18 22 -6 48',
  'M276 64 q18 -14 36 -8',
  'M388 34 q16 24 -2 46',
];

const LEAVES = [
  { d: 'M158 46 q12 -16 28 -12 q-4 18 -22 20 q-5 0 -6 -8', },
  { d: 'M270 48 q14 -14 30 -8 q-6 16 -24 16 q-5 -1 -6 -8', },
  { d: 'M384 52 q-14 -14 -30 -8 q6 16 24 16 q5 -1 6 -8', },
];

export type WordmarkVariant = 'solid' | 'leaves';

export interface ArumaWordmarkProps {
  variant?: WordmarkVariant;
  /** Diacríticos de marca (ĀRŪḾA). */
  macron?: boolean;
  className?: string;
  /** Texto accesible; por defecto "ARUMA". */
  label?: string;
}

const TOTAL_W = ARUMA_GLYPHS.length * (GLYPH_W + GLYPH_GAP) - GLYPH_GAP;

export function ArumaWordmark({
  variant = 'solid',
  macron = false,
  className = '',
  label = 'ARUMA',
}: ArumaWordmarkProps) {
  const top = macron ? -MACRON_H : 0;
  const height = GLYPH_H + (macron ? MACRON_H : 0);
  const clipId = React.useId();

  return (
    <svg
      viewBox={`0 ${top} ${TOTAL_W} ${height}`}
      role="img"
      aria-label={label}
      className={className}
      fill="currentColor"
    >
      {variant === 'leaves' && (
        <clipPath id={clipId}>
          {ARUMA_GLYPHS.map((glyph, index) => (
            <path
              key={glyph.char + index}
              d={glyph.d}
              transform={`translate(${index * (GLYPH_W + GLYPH_GAP)}, 0)`}
            />
          ))}
        </clipPath>
      )}

      {ARUMA_GLYPHS.map((glyph, index) => (
        <g key={glyph.char + index} transform={`translate(${index * (GLYPH_W + GLYPH_GAP)}, 0)`}>
          <path d={glyph.d} fillRule="evenodd" />
          {macron && glyph.macron && <path d={glyph.macron} />}
        </g>
      ))}

      {variant === 'leaves' && (
        <g clipPath={`url(#${clipId})`} fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
          {LEAF_VINES.map((d) => (
            <path key={d} d={d} />
          ))}
          {LEAVES.map((leaf) => (
            <path key={leaf.d} d={leaf.d} fill="#FFFFFF" stroke="none" />
          ))}
        </g>
      )}
    </svg>
  );
}

/** Un glifo individual del alfabeto ARUMA Display, para especímenes tipográficos. */
export function ArumaGlyph({
  index,
  className = '',
}: {
  index: number;
  className?: string;
}) {
  const glyph = ARUMA_GLYPHS[index % ARUMA_GLYPHS.length];
  return (
    <svg viewBox={`0 0 ${GLYPH_W} ${GLYPH_H}`} aria-hidden="true" className={className} fill="currentColor">
      <path d={glyph.d} fillRule="evenodd" />
    </svg>
  );
}
