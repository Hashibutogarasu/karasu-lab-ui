'use client';

import { useTranslate } from '@tolgee/react';
import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import { useCookieConsentContext } from '../../providers/cookie-consent-provider';

import { ButtonWithAdornments } from './button-with-adornments';
import {
  Toast as RadixToast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport as RadixToastViewport,
} from './toast';

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledToast = styled(RadixToast)`
  position: relative;
  display: inline-block;
  z-index: 999;
  background-color: var(--card);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  opacity: 0.98;
  list-style: none;
  transform: translateY(0);
  padding: 1.5rem; /* Match shadcn's p-6 */

  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
  will-change: transform, opacity;

  &[data-state='open'] {
    animation: ${slideInFromBottom} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-swipe='move'] {
    transition: none;
    transform: translateX(var(--radix-toast-swipe-move-x, 0))
      translateY(var(--radix-toast-swipe-move-y, 0));
  }
  &[data-swipe='cancel'] {
    transform: translateX(0) translateY(0);
    transition: transform 0.2s ease-out;
  }
  &[data-swipe='end'] {
    transform: translateX(var(--radix-toast-swipe-end-x, 0))
      translateY(var(--radix-toast-swipe-end-y, 0));
    transition: transform 0.2s ease-out;
    opacity: 0;
  }

  @media (max-width: 640px) {
    border-radius: 6px;
    padding: 12px;
    width: auto;
    min-width: 0;
  }
`;

const StyledToastViewport = styled(RadixToastViewport)`
  position: fixed;
  left: 50%;
  bottom: 16px;
  top: auto !important;
  right: auto !important;
  transform: translateX(-50%);
  width: 100%;
  max-width: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 8px;
  pointer-events: none;
  z-index: 9999;

  & > * {
    pointer-events: auto;
  }

  @media (max-width: 640px) {
    bottom: 12px;
    padding: 8px;
    max-width: calc(100% - 24px);
  }
`;

export function CookieConsentToast() {
  const { consent, isInitialized, accept, decline } = useCookieConsentContext();
  const { t } = useTranslate();
  const show = React.useMemo(
    () => isInitialized && consent !== 'accepted',
    [isInitialized, consent],
  );

  if (!show) return null;

  return (
    <ToastProvider duration={Infinity} swipeDirection="down">
      <StyledToast
        open={show}
        onOpenChange={(open) => {
          if (!open && consent !== 'accepted') {
            decline();
          }
        }}>
        <div className="flex w-full max-w-[680px] flex-col gap-4">
          <div className="grid gap-1">
            <ToastTitle>{t('components.forms.cookieConsent.title')}</ToastTitle>
            <ToastDescription>
              <p className="mb-2">
                {t('components.forms.cookieConsent.description1')}
              </p>
              <p>{t('components.forms.cookieConsent.description2')}</p>
              <p>
                {t('components.forms.cookieConsent.description3_prefix')}
                <strong>
                  <u>{t('components.forms.cookieConsent.settingsLink')}</u>
                </strong>
                {t('components.forms.cookieConsent.description3_suffix')}
              </p>
            </ToastDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ButtonWithAdornments variant="default" size="sm" onClick={accept}>
              {t('components.forms.cookieConsent.accept')}
            </ButtonWithAdornments>
            <ButtonWithAdornments variant="outline" size="sm" onClick={decline}>
              {t('components.forms.cookieConsent.decline')}
            </ButtonWithAdornments>
          </div>
        </div>
      </StyledToast>
      <StyledToastViewport />
    </ToastProvider>
  );
}
