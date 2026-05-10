/**
 * ARUMA Design System - Botanical Pattern Component
 * 
 * SVG-based decorative patterns inspired by the leaf motifs in the logo
 * Used for brand identity and visual interest
 */

'use client';

import React, { useMemo } from 'react';

export type BotanicalPatternProps = {
  variant?: 'leaf' | 'branch' | 'scatter' | 'geometric';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  color?: string;
  className?: string;
};

const SIZES = {
  sm: 24,
  md: 48,
  lg: 96,
  xl: 192,
};

export function BotanicalPattern({
  variant = 'leaf',
  size = 'md',
  opacity = 0.2,
  color = '#3D9461',
  className = '',
}: BotanicalPatternProps) {
  const dimensions = SIZES[size];

  const patterns = {
    leaf: (
      <svg width={dimensions} height={dimensions} viewBox="0 0 100 100" className={className}>
        <path
          d="M50 10 Q30 30, 40 50 Q30 70, 50 90 Q70 70, 60 50 Q70 30, 50 10 M45 25 L55 25 M42 35 L58 35 M40 45 L60 45 M42 55 L58 55 M45 65 L55 65"
          fill={color}
          opacity={opacity}
          strokeWidth="1"
          stroke={color}
        />
      </svg>
    ),
    branch: (
      <svg width={dimensions} height={dimensions} viewBox="0 0 100 100" className={className}>
        <g opacity={opacity} fill={color}>
          <path d="M50 90 L50 10 M50 30 Q30 35, 25 45 M50 40 Q70 45, 75 55 M50 50 Q25 55, 20 65 M50 60 Q75 65, 80 75" />
          <circle cx="25" cy="45" r="3" />
          <circle cx="75" cy="55" r="3" />
          <circle cx="20" cy="65" r="3" />
          <circle cx="80" cy="75" r="3" />
        </g>
      </svg>
    ),
    scatter: (
      <svg width={dimensions} height={dimensions} viewBox="0 0 100 100" className={className}>
        <g opacity={opacity} fill={color}>
          <path d="M20 20 Q15 15, 20 10 Q25 15, 20 20" />
          <path d="M70 30 Q65 25, 70 20 Q75 25, 70 30" />
          <path d="M40 60 Q35 55, 40 50 Q45 55, 40 60" />
          <path d="M80 80 Q75 75, 80 70 Q85 75, 80 80" />
          <path d="M30 85 Q25 80, 30 75 Q35 80, 30 85" />
        </g>
      </svg>
    ),
    geometric: (
      <svg width={dimensions} height={dimensions} viewBox="0 0 100 100" className={className}>
        <g opacity={opacity} stroke={color} fill="none" strokeWidth="1.5">
          <polygon points="50,15 35,35 50,35 50,65 35,65 50,85 65,65 50,65 50,35 65,35" />
          <path d="M30 25 L35 30 M30 35 L35 40 M30 45 L35 50" />
          <path d="M70 25 L65 30 M70 35 L65 40 M70 45 L65 50" />
          <path d="M30 55 L35 60 M30 65 L35 70 M30 75 L35 80" />
          <path d="M70 55 L65 60 M70 65 L65 70 M70 75 L65 80" />
        </g>
      </svg>
    ),
  };

  return patterns[variant];
}

// Pattern for use as background
export function BotanicalBackground({
  variant = 'scatter',
  density = 'medium',
  className = '',
  seed = 0,
}: {
  variant?: BotanicalPatternProps['variant'];
  density?: 'low' | 'medium' | 'high';
  className?: string;
  seed?: number;
}) {
  // Use useMemo to make positions stable based on seed
  const positions = useMemo(() => {
    const densityCounts = {
      low: 3,
      medium: 6,
      high: 12,
    };
    const count = densityCounts[density];
    // Simple seeded random number generator for stable positions
    const seededRandom = (index: number) => {
      const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, i) => ({
      top: `${seededRandom(i) * 100}%`,
      left: `${seededRandom(i + 100) * 100}%`,
      rotation: seededRandom(i + 200) * 360,
      scale: 0.5 + seededRandom(i + 300) * 0.5,
    }));
  }, [density, seed]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {positions.map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
          }}
        >
          <BotanicalPattern variant={variant} size="lg" opacity={0.05} />
        </div>
      ))}
    </div>
  );
}
