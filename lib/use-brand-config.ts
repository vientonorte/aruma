'use client';

import { useBrandConfigContext } from './brand-config-context';

export function useBrandConfig() {
  return useBrandConfigContext();
}