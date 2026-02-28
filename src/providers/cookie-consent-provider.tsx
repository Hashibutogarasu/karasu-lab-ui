'use client';

import React from 'react';
import CookieConsent from 'react-cookie-consent';

import { getServerCookie, setServerCookie } from '../utils/server-cookie';

interface CookieConsentContextValue {
  consent: 'unknown' | 'accepted' | 'declined';
  isInitialized: boolean;
  accept: () => void;
  decline: () => void;
}

const CookieConsentContext =
  React.createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = React.useState<
    'unknown' | 'accepted' | 'declined'
  >('unknown');
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      const c = await getServerCookie<
        { cookie_consent: string },
        'cookie_consent'
      >('cookie_consent');
      if (c === 'accepted' || c === 'declined') {
        setConsent(c);
      } else {
        setConsent('unknown');
      }
      setIsInitialized(true);
    };
    init();
  }, []);

  const accept = React.useCallback(async () => {
    try {
      await setServerCookie({ cookie_consent: 'accepted' });
      setConsent('accepted');
    } catch {
      setConsent('accepted');
    }
  }, []);

  const decline = React.useCallback(async () => {
    try {
      await setServerCookie({ cookie_consent: 'declined' });
      setConsent('declined');
    } catch {
      setConsent('declined');
    }
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{ consent, isInitialized, accept, decline }}>
      <CookieConsent
        disableStyles
        location="none"
        cookieName="cookie_consent"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        onAccept={() => accept()}
        onDecline={() => decline()}
        style={{ display: 'none' }}
      />
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const ctx = React.useContext(CookieConsentContext);
  if (!ctx)
    throw new Error(
      'useCookieConsentContext must be used within CookieConsentProvider',
    );
  return ctx;
}
