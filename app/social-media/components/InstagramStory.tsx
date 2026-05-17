/**
 * InstagramStory Component
 * 
 * 9:16 vertical story format (1080x1920px)
 */

import React from 'react';
import { typography } from '@/lib/design-system/tokens/typography';
import { StarDivider } from './StarDivider';

interface InstagramStoryProps {
  title?: string;
  subtitle?: string;
  logoUrl?: string;
}

export function InstagramStory({ 
  title = 'ARUMA',
  subtitle = 'Wellness & Beauty',
  logoUrl 
}: InstagramStoryProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className="relative bg-neutral-950 rounded-lg overflow-hidden"
        style={{ aspectRatio: '9/16' }}
        role="article"
        aria-label="Instagram Story Preview"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between p-8">
          {/* Header */}
          <div className="w-full flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-botanical-500" />
              <span className="text-white text-sm font-medium">aruma.official</span>
            </div>
            <span className="text-neutral-400 text-xs">2h</span>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
            {logoUrl && (
              <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              </div>
            )}
            
            <h1 
              className="text-4xl md:text-5xl font-bold text-white uppercase"
              style={{ letterSpacing: typography.letterSpacing.brand }}
            >
              {title}
            </h1>
            
            <StarDivider count={3} />
            
            <p 
              className="text-lg text-neutral-300 max-w-xs"
              style={{ letterSpacing: typography.letterSpacing.subtitle }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer */}
          <div className="w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-full py-3 px-6 text-center">
              <span className="text-white text-sm font-medium">Swipe Up</span>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-botanical-500/30 rounded-tl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-botanical-500/30 rounded-br-lg" />
      </div>
    </div>
  );
}
