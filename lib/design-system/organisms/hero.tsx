/**
 * ARUMA Design System - Hero Organism
 * 
 * Landing page hero section with branding
 */

'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Heading, Text } from '../atoms/typography';
import { Button, ButtonLink, type ButtonVariant } from '../atoms/button';
import { BotanicalBackground } from '../patterns/botanical';

export interface HeroAction {
  label: string;
  /** Ancla o ruta: permite usar el Hero desde Server Components. */
  href?: string;
  onClick?: () => void;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  variant?: 'default' | 'botanical';
}

function HeroActionButton({ action, variant }: { action: HeroAction; variant: ButtonVariant }) {
  if (action.href) {
    return (
      <ButtonLink variant={variant} size="lg" href={action.href}>
        {action.label}
      </ButtonLink>
    );
  }
  return (
    <Button variant={variant} size="lg" onClick={action.onClick}>
      {action.label}
    </Button>
  );
}

export function Hero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
}: HeroProps) {
  const isBotanical = variant === 'botanical';

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#2F2F31] bg-[#1C1C1E] p-8 sm:p-12 lg:p-16">
      {isBotanical && <BotanicalBackground variant="scatter" density="medium" />}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {subtitle && (
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.24em] text-[#86868B]"
          >
            {subtitle}
          </m.p>
        )}

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Heading as="h1" brand className="mt-4 text-4xl sm:text-5xl lg:text-6xl">
            {title}
          </Heading>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Text size="lg" muted className="mt-6 max-w-2xl mx-auto">
            {description}
          </Text>
        </m.div>

        {(primaryAction || secondaryAction) && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {primaryAction && (
              <HeroActionButton action={primaryAction} variant={isBotanical ? 'botanical' : 'primary'} />
            )}
            {secondaryAction && <HeroActionButton action={secondaryAction} variant="ghost" />}
          </m.div>
        )}
      </div>
    </section>
  );
}
