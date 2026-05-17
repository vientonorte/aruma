/**
 * PanoramicTriptych Component
 * 
 * Wide 3-panel layout for panoramic content
 */

import React from 'react';
import { typography } from '@/lib/design-system/tokens/typography';
import { NumberTag } from './NumberTag';

interface TriptychPanel {
  title: string;
  description: string;
  imageUrl?: string;
}

interface PanoramicTriptychProps {
  mainTitle?: string;
  panels?: TriptychPanel[];
}

const defaultPanels: TriptychPanel[] = [
  { 
    title: 'DISCOVER', 
    description: 'Begin your wellness journey with personalized guidance' 
  },
  { 
    title: 'EXPERIENCE', 
    description: 'Immerse yourself in transformative practices' 
  },
  { 
    title: 'TRANSFORM', 
    description: 'Achieve lasting balance and inner peace' 
  },
];

export function PanoramicTriptych({ 
  mainTitle = 'THE ARUMA WAY',
  panels = defaultPanels
}: PanoramicTriptychProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 
          className="text-5xl md:text-6xl font-bold text-white uppercase"
          style={{ letterSpacing: typography.letterSpacing.brand }}
        >
          {mainTitle}
        </h1>
      </div>

      {/* Triptych Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-neutral-800 p-1 rounded-lg overflow-hidden">
        {panels.map((panel, index) => (
          <div
            key={index}
            className="relative group bg-neutral-900 overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Background */}
            {panel.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={panel.imageUrl} 
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-botanical-900 via-neutral-900 to-black" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              {/* Panel Number */}
              <div className="flex justify-end">
                <NumberTag 
                  number={index + 1} 
                  variant="botanical" 
                  size="lg" 
                />
              </div>

              {/* Panel Text */}
              <div className="space-y-3">
                <h2 
                  className="text-3xl md:text-4xl font-bold text-white uppercase"
                  style={{ letterSpacing: typography.letterSpacing.brand }}
                >
                  {panel.title}
                </h2>
                <p className="text-neutral-200 text-sm leading-relaxed">
                  {panel.description}
                </p>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-botanical-500/50 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Bottom Accent Line */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <div className="w-12 h-px bg-botanical-500" />
        <div className="w-2 h-2 rounded-full bg-botanical-500" />
        <div className="w-24 h-px bg-botanical-500" />
        <div className="w-2 h-2 rounded-full bg-botanical-500" />
        <div className="w-12 h-px bg-botanical-500" />
      </div>
    </div>
  );
}
