'use client';

import React from 'react';

import { useAppTranslate } from '../../hooks/use-app-translate';
import { TranslateProvider } from '../../providers/translate-provider';

type TextProps = {
  id: string;
  params?: Record<string, string | number>;
  className?: string;
  as?: React.ElementType;
  namespaceOverride?: string;
  rootNamespace?: string;
};

/**
 * Renders translated text automatically formatted based on the current route.
 * Can be configured to render as a specific HTML element or React fragment.
 */
export const Text = ({
  id,
  params,
  className,
  as: Component = 'span',
  namespaceOverride,
  rootNamespace,
  ...props
}: TextProps & React.HTMLAttributes<HTMLElement>) => {
  if (namespaceOverride || rootNamespace) {
    return (
      <TranslateProvider
        namespaceOverride={namespaceOverride}
        rootNamespace={rootNamespace}>
        <TextInner
          id={id}
          params={params}
          className={className}
          as={Component}
          {...props}
        />
      </TranslateProvider>
    );
  }

  return (
    <TextInner
      id={id}
      params={params}
      className={className}
      as={Component}
      {...props}
    />
  );
};

/**
 * Internal component used by Text to retrieve and render the translation.
 */
const TextInner = ({
  id,
  params,
  className,
  as,
  ...props
}: Omit<TextProps, 'namespaceOverride' | 'rootNamespace'> &
  React.HTMLAttributes<HTMLElement>) => {
  const { t } = useAppTranslate();
  const text = t(id, params);
  const Component = as || 'span';

  if (Component === React.Fragment) {
    return <>{text}</>;
  }

  return (
    <Component className={className} {...props}>
      {text}
    </Component>
  );
};
