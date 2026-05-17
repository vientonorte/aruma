/**
 * InstagramReelCover Component
 * 
 * 9:16 vertical reel cover design
 */

import React from 'react';
import { Play } from 'lucide-react';
import { typography } from '@/lib/design-system/tokens/typography';

interface InstagramReelCoverProps {
  title?: string;
  description?: string;
  thumbnail?: string;
}

export function InstagramReelCover({ 
  title = 'ARUMA EXPERIENCE',
  description = 'Discover the art of wellness',
  thumbnail
}: InstagramReelCoverProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className="relative bg-neutral-950 rounded-lg overflow-hidden group cursor-pointer"
        style={{ aspectRatio: '9/16' }}
        role="article"
        aria-label="Instagram Reel Cover Preview"
      >
        {/* Background */}
        <div className="absolute inset-0">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt="Reel background" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-botanical-900 via-neutral-900 to-black" />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-10 h-10 text-white fill-white ml-1" aria-label="Play" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-20">
          <h2 
            className="text-3xl font-bold text-white mb-2 uppercase"
            style={{ letterSpacing: typography.letterSpacing.brand }}
          >
            {title}
          </h2>
          <p className="text-neutral-200 text-sm">
            {description}
          </p>
        </div>

        {/* Bottom Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-white text-xs">
            <span>👁️ 12.5K</span>
            <span>❤️ 856</span>
            <span>💬 42</span>
            <span>📤 125</span>
          </div>
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/40 rounded-tr-md" />
        <div className="absolute bottom-16 left-3 w-6 h-6 border-b-2 border-l-2 border-botanical-500/60 rounded-bl-md" />
      </div>
    </div>
  );
}
