'use client';

import { TolgeeProvider } from '@tolgee/react';
import React, { useEffect } from 'react';

import en from '../i18n/messages/en.json';
import ja from '../i18n/messages/ja.json';
import { TolgeeUIBase } from '../i18n/tolgee';

import { TranslateProvider } from './translate-provider';

const tolgeeUI = TolgeeUIBase().updateDefaults({
  defaultLanguage: 'en',
  staticData: {
    en,
    ja,
  },
});

export interface UiTranslateProviderProps {
  children: React.ReactNode;
  /*
   * Optional language code to force a specific locale for the UI components.
   * If provided, the UI translation context will immediately switch to this language.
   */
  language?: string;
}

export function UiTranslateProvider({
  children,
  language,
}: UiTranslateProviderProps) {
  useEffect(() => {
    if (language) {
      const tolgee = tolgeeUI.init();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tolgee as any).changeLanguage(language);
    }
  }, [language]);

  return (
    <TolgeeProvider
      tolgee={tolgeeUI.init()}
      fallback={null}
      options={{ useSuspense: false }}>
      <TranslateProvider rootNamespace="components">
        {children}
      </TranslateProvider>
    </TolgeeProvider>
  );
}
