/**
 * EditorialDossier Component
 * 
 * Editorial/portfolio layout for professional content
 */

import React from 'react';
import { typography } from '@/lib/design-system/tokens/typography';
import { StarDivider } from './StarDivider';
import { OrnamentFrame } from './OrnamentFrame';

interface EditorialDossierProps {
  title?: string;
  subtitle?: string;
  sections?: Array<{ heading: string; content: string }>;
}

const defaultSections = [
  { heading: 'Philosophy', content: 'Harmonizing mind, body, and spirit through holistic wellness practices.' },
  { heading: 'Approach', content: 'Combining ancient wisdom with modern techniques for transformative experiences.' },
  { heading: 'Commitment', content: 'Dedicated to your journey of self-discovery and inner balance.' },
];

export function EditorialDossier({ 
  title = 'ARUMA DOSSIER',
  subtitle = 'A Journey to Wellness',
  sections = defaultSections
}: EditorialDossierProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <OrnamentFrame variant="decorative">
        <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 
              className="text-6xl font-bold text-white mb-4 uppercase"
              style={{ letterSpacing: typography.letterSpacing.brand }}
            >
              {title}
            </h1>
            <StarDivider count={5} className="my-6" />
            <p 
              className="text-xl text-botanical-300"
              style={{ letterSpacing: typography.letterSpacing.subtitle }}
            >
              {subtitle}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-botanical-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <h3 
                    className="text-lg font-semibold text-white uppercase"
                    style={{ letterSpacing: typography.letterSpacing.wide }}
                  >
                    {section.heading}
                  </h3>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed pl-11">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Visual Divider */}
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-botanical-500/30" />
            </div>
            <div className="relative flex justify-center">
              <div className="bg-neutral-900 px-6">
                <div className="w-12 h-12 rounded-full border-2 border-botanical-500 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-botanical-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="text-center mt-12">
            <blockquote className="text-neutral-400 italic text-lg">
              &ldquo;Transform your space, transform your life&rdquo;
            </blockquote>
            <p 
              className="text-botanical-500 text-sm mt-4 font-semibold uppercase"
              style={{ letterSpacing: typography.letterSpacing.wider }}
            >
              — ARUMA
            </p>
          </div>
        </div>
      </OrnamentFrame>
    </div>
  );
}
