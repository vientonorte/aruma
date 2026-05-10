/**
 * ARUMA Design System - Design Tokens
 * 
 * Central export for all design tokens
 */

export { colors, type ColorToken } from './colors';
export { typography, type TypographyToken } from './typography';
export { spacing, type SpacingToken } from './spacing';
export { radius, type RadiusToken } from './radius';
export { shadows, type ShadowToken } from './shadows';
export { animation, type AnimationToken } from './animation';

// Combined theme object
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { animation } from './animation';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animation,
} as const;

export type Theme = typeof theme;
