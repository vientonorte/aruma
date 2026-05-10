/**
 * ARUMA Design System - Typography Tokens
 * 
 * Inspired by logo's bold, geometric letterforms
 * Following type scale principles and accessibility guidelines
 */

export const typography = {
  // Font Families
  fontFamily: {
    display: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"SF Pro Text", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SF Mono", "Fira Code", "Consolas", monospace',
  },

  // Font Sizes - Using modular scale (1.25 - Major Third)
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter Spacing - Mimicking logo's wide tracking
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    brand: '0.3em', // Signature ARUMA spacing from logo
    subtitle: '0.24em', // For secondary text
  },

  // Text Styles - Predefined combinations
  textStyles: {
    // Display styles
    displayLarge: {
      fontSize: '6rem',
      fontWeight: '700',
      lineHeight: '1',
      letterSpacing: '0.3em',
      fontFamily: '"SF Pro Display", "Inter", sans-serif',
    },
    displayMedium: {
      fontSize: '4.5rem',
      fontWeight: '700',
      lineHeight: '1.1',
      letterSpacing: '0.3em',
      fontFamily: '"SF Pro Display", "Inter", sans-serif',
    },
    displaySmall: {
      fontSize: '3rem',
      fontWeight: '600',
      lineHeight: '1.2',
      letterSpacing: '0.3em',
      fontFamily: '"SF Pro Display", "Inter", sans-serif',
    },

    // Heading styles
    h1: {
      fontSize: '3.75rem',
      fontWeight: '600',
      lineHeight: '1.2',
      letterSpacing: '0.3em',
    },
    h2: {
      fontSize: '3rem',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '0.1em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: '600',
      lineHeight: '1.3',
      letterSpacing: '0.05em',
    },
    h4: {
      fontSize: '1.875rem',
      fontWeight: '600',
      lineHeight: '1.4',
      letterSpacing: '0.025em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.4',
      letterSpacing: '0.025em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: '600',
      lineHeight: '1.5',
      letterSpacing: '0',
    },

    // Body styles
    bodyLarge: {
      fontSize: '1.125rem',
      fontWeight: '400',
      lineHeight: '1.625',
      letterSpacing: '0',
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
    },

    // Label styles
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.25',
      letterSpacing: '0.025em',
    },
    labelSmall: {
      fontSize: '0.75rem',
      fontWeight: '500',
      lineHeight: '1.25',
      letterSpacing: '0.05em',
    },

    // Caption styles
    caption: {
      fontSize: '0.75rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: '600',
      lineHeight: '1.5',
      letterSpacing: '0.24em',
      textTransform: 'uppercase' as const,
    },

    // Button styles
    button: {
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '0.05em',
    },
    buttonLarge: {
      fontSize: '1rem',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '0.05em',
    },
  },
} as const;

export type TypographyToken = typeof typography;
