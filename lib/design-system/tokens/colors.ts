/**
 * ARUMA Design System - Color Tokens
 * 
 * Extracted from brand logo analysis:
 * - Primary: Black (#000000) from logo letterforms
 * - Secondary: Off-white (#F5F5F7) for contrast
 * - Accent: Botanical green from leaf patterns
 * - Surface: Dark grays for depth
 * 
 * Following WCAG 2.1 AA standards for accessibility
 */

export const colors = {
  // Brand Colors - Extracted from ARUMA logo
  brand: {
    black: '#000000',
    white: '#FFFFFF',
    offWhite: '#F5F5F7',
    botanical: {
      50: '#F0F9F4',
      100: '#DCEFE1',
      200: '#B8DFC3',
      300: '#8BCAA0',
      400: '#5DAF7D',
      500: '#3D9461', // Primary botanical green
      600: '#2D764B',
      700: '#245D3C',
      800: '#1E4A31',
      900: '#1A3E29',
    },
  },

  // Neutral Palette - For surfaces and backgrounds
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },

  // Semantic Colors - Following Material Design 3 principles
  semantic: {
    primary: {
      main: '#F5F5F7',
      hover: '#FFFFFF',
      active: '#E8E8EA',
      disabled: '#86868B',
    },
    secondary: {
      main: '#3D9461',
      hover: '#5DAF7D',
      active: '#2D764B',
      disabled: '#8BCAA0',
    },
    success: {
      main: '#3D9461',
      light: '#DCEFE1',
      dark: '#245D3C',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#FEE2E2',
      dark: '#B91C1C',
    },
    info: {
      main: '#3B82F6',
      light: '#DBEAFE',
      dark: '#1E40AF',
    },
  },

  // Surface Colors - For cards, modals, etc.
  surface: {
    background: '#0A0A0A',
    elevated: '#1C1C1E',
    overlay: '#2C2C2E',
    card: '#1C1C1E',
    modal: '#1C1C1E',
  },

  // Text Colors - Optimized for dark backgrounds
  text: {
    primary: '#F5F5F7',
    secondary: '#86868B',
    tertiary: '#636366',
    disabled: '#48484A',
    inverse: '#0A0A0A',
  },

  // Border Colors
  border: {
    default: '#2F2F31',
    hover: '#3A3A3C',
    focus: '#F5F5F7',
    disabled: '#1C1C1E',
    botanical: '#3D9461',
  },

  // Interactive States
  interactive: {
    hover: 'rgba(245, 245, 247, 0.1)',
    active: 'rgba(245, 245, 247, 0.2)',
    focus: 'rgba(245, 245, 247, 0.3)',
    disabled: 'rgba(134, 134, 139, 0.3)',
  },

  // Alpha/Opacity variants
  alpha: {
    white: {
      5: 'rgba(255, 255, 255, 0.05)',
      10: 'rgba(255, 255, 255, 0.1)',
      20: 'rgba(255, 255, 255, 0.2)',
      30: 'rgba(255, 255, 255, 0.3)',
      40: 'rgba(255, 255, 255, 0.4)',
      50: 'rgba(255, 255, 255, 0.5)',
    },
    black: {
      5: 'rgba(0, 0, 0, 0.05)',
      10: 'rgba(0, 0, 0, 0.1)',
      20: 'rgba(0, 0, 0, 0.2)',
      30: 'rgba(0, 0, 0, 0.3)',
      40: 'rgba(0, 0, 0, 0.4)',
      50: 'rgba(0, 0, 0, 0.5)',
    },
  },
} as const;

export type ColorToken = typeof colors;
