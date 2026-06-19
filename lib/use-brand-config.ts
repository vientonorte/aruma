'use client';

import { useState } from 'react';
import { brandConfig, type BrandConfig } from './brand.config';
import { loadStoredBrandConfig } from './brand-storage';

function getInitialBrandConfig(): BrandConfig {
  if (typeof window === 'undefined') return brandConfig;
  return loadStoredBrandConfig() ?? brandConfig;
}

export function useBrandConfig(): BrandConfig {
  const [config] = useState(getInitialBrandConfig);
  return config;
}