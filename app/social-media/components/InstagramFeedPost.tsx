/**
 * InstagramFeedPost Component
 * 
 * Square 1:1 feed post (1080x1080px)
 */

import React from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { typography } from '@/lib/design-system/tokens/typography';
import { StarDivider } from './StarDivider';

interface InstagramFeedPostProps {
  title?: string;
  caption?: string;
  imageUrl?: string;
  likes?: number;
}

export function InstagramFeedPost({ 
  title = 'ARUMA',
  caption = 'Experience the essence of wellness and beauty ✨',
  imageUrl,
  likes = 1234
}: InstagramFeedPostProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-black rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-neutral-950 border-b border-neutral-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-botanical-500" />
          <span className="text-white text-sm font-semibold">aruma.official</span>
        </div>
        <button className="text-white" aria-label="More options">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Image Content */}
      <div 
        className="relative bg-neutral-900"
        style={{ aspectRatio: '1/1' }}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Feed post" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-botanical-900 via-neutral-900 to-black flex flex-col items-center justify-center p-8">
            <h2 
              className="text-5xl font-bold text-white mb-6 uppercase text-center"
              style={{ letterSpacing: typography.letterSpacing.brand }}
            >
              {title}
            </h2>
            <StarDivider count={3} />
            <div className="mt-6 w-16 h-16 rounded-full border-4 border-botanical-500" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3 bg-neutral-950">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button className="hover:opacity-70 transition-opacity" aria-label="Like">
              <Heart className="w-6 h-6 text-white" />
            </button>
            <button className="hover:opacity-70 transition-opacity" aria-label="Comment">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <button className="hover:opacity-70 transition-opacity" aria-label="Share">
              <Send className="w-6 h-6 text-white" />
            </button>
          </div>
          <button className="hover:opacity-70 transition-opacity" aria-label="Save">
            <Bookmark className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <p className="text-white text-sm font-semibold mb-2">{likes.toLocaleString()} likes</p>
        
        <p className="text-white text-sm">
          <span className="font-semibold">aruma.official</span> {caption}
        </p>
        
        <p className="text-neutral-500 text-xs mt-2">2 HOURS AGO</p>
      </div>
    </div>
  );
}
