'use client';

import { useContext } from 'react';

import { TranslateContext } from '../providers/translate-provider';

/**
 * Accesses the smart translation context.
 * Must be used within a TranslateProvider.
 */
export function useAppTranslate() {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error('useAppTranslate must be used within TranslateProvider');
  }
  return context;
}
