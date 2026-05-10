/**
 * ARUMA Design System - Animation Tokens
 * 
 * Motion design inspired by natural, organic movements
 */

export const animation = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
    slowest: '750ms',
  },

  // Easing functions - Natural, organic curves
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom organic easings
    botanical: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy, plant-like
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    elegant: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },

  // Presets
  presets: {
    fadeIn: {
      duration: '250ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      fillMode: 'forwards' as const,
    },
    fadeOut: {
      duration: '250ms',
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fillMode: 'forwards' as const,
    },
    slideUp: {
      duration: '350ms',
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      fillMode: 'forwards' as const,
    },
    slideDown: {
      duration: '350ms',
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      fillMode: 'forwards' as const,
    },
    scale: {
      duration: '250ms',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fillMode: 'forwards' as const,
    },
  },

  // Framer Motion variants
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
    },
    botanical: {
      initial: { opacity: 0, scale: 0.8, rotate: -5 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      exit: { opacity: 0, scale: 0.8, rotate: 5 },
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
} as const;

export type AnimationToken = typeof animation;
