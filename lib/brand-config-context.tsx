'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { brandConfig, type BrandConfig } from './brand.config';
import {
  BRAND_CONFIG_EVENT,
  BRAND_STORAGE_KEY,
  loadStoredBrandConfig,
} from './brand-storage';

const BrandConfigContext = createContext<BrandConfig>(brandConfig);

function getInitialBrandConfig(): BrandConfig {
  if (typeof window === 'undefined') return brandConfig;
  return loadStoredBrandConfig() ?? brandConfig;
}

export function BrandConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<BrandConfig>(getInitialBrandConfig);

  useEffect(() => {
    const refresh = () => {
      setConfig(loadStoredBrandConfig() ?? brandConfig);
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === BRAND_STORAGE_KEY) refresh();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(BRAND_CONFIG_EVENT, refresh);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(BRAND_CONFIG_EVENT, refresh);
    };
  }, []);

  return (
    <BrandConfigContext.Provider value={config}>{children}</BrandConfigContext.Provider>
  );
}

export function useBrandConfigContext(): BrandConfig {
  return useContext(BrandConfigContext);
}