'use client';

import { useTranslate } from '@tolgee/react';
import { useParams, usePathname } from 'next/navigation';
import React, { createContext, useMemo } from 'react';

/**
 * Calculates a translation namespace based on the current Next.js
 * pathname and dynamic route parameters.
 */
export function getPathBasedNamespace(
  pathname: string,
  params: Record<string, string | string[] | undefined> | null,
) {
  if (!pathname || pathname === '/') return '';

  let replacedPath = pathname;
  if (params) {
    Object.entries(params).forEach(([_, value]) => {
      if (typeof value === 'string') {
        replacedPath = replacedPath.replace(`/${value}`, '');
      } else if (Array.isArray(value)) {
        value.forEach((v) => {
          replacedPath = replacedPath.replace(`/${v}`, '');
        });
      }
    });
  }

  const segments = replacedPath.split('/').filter(Boolean);
  if (segments.length === 0) return '';
  return segments.join('.');
}

export type TranslateContextType = {
  t: (
    id: string,
    params?: Record<string, string | number>,
    options?: { noWrap?: boolean; orEmpty?: boolean },
  ) => string;
  namespace: string;
};

export const TranslateContext = createContext<TranslateContextType | null>(
  null,
);

/**
 * Provides a smart translation context that automatically calculates
 * the translation namespace based on the current route.
 */
export function TranslateProvider({
  children,
  rootNamespace,
  namespaceOverride,
  absolutePrefixes = [],
}: {
  children: React.ReactNode;
  rootNamespace?: string;
  namespaceOverride?: string;
  absolutePrefixes?: string[];
}) {
  const { t } = useTranslate();
  const pathname = usePathname();
  const params = useParams();

  const namespace = useMemo(() => {
    if (namespaceOverride) return namespaceOverride;

    const pathNamespace = getPathBasedNamespace(pathname, params);

    if (rootNamespace && pathNamespace) {
      return `${rootNamespace}.${pathNamespace}`;
    }
    if (rootNamespace) {
      return rootNamespace;
    }
    return pathNamespace;
  }, [namespaceOverride, rootNamespace, pathname, params]);

  /**
   * Translates the given key by prefixing it with the calculated namespace.
   * Warns in the console if the translation is missing during development.
   */
  const appT = (
    id: string,
    params?: Record<string, string | number>,
    options?: { noWrap?: boolean; orEmpty?: boolean },
  ) => {
    const isAbsolute = absolutePrefixes.some((prefix) =>
      id.startsWith(`${prefix}.`),
    );
    const key = namespace && !isAbsolute ? `${namespace}.${id}` : id;
    const result = params
      ? t(key, params as never, options as never)
      : t(key, undefined, options as never);

    if (result === key) {
      /* eslint-disable-next-line no-console */
      console.warn(`[Translate Error] Missing translation key: "${key}"`);
    }

    return result;
  };

  return (
    <TranslateContext.Provider value={{ t: appT, namespace }}>
      {children}
    </TranslateContext.Provider>
  );
}
