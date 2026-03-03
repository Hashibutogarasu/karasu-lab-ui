import { Tolgee, FormatSimple, DevTools } from '@tolgee/web';

// Note: These should ideally be environment variables or passed in via context if needed from the app.
// For UI package isolation, we can define a static config or allow injection.
const TOLGEE_API_KEY = process.env.NEXT_PUBLIC_TOLGEE_API_KEY || '';
const TOLGEE_API_URL =
  process.env.NEXT_PUBLIC_TOLGEE_API_URL || 'https://app.tolgee.io';

export function TolgeeUIBase() {
  return Tolgee().use(FormatSimple()).use(DevTools()).updateDefaults({
    apiKey: TOLGEE_API_KEY,
    apiUrl: TOLGEE_API_URL,
    // You can bind UI-specific JSON files here if you intend to bundle translations into the UI package
    // staticData: {
    //   en: () => import('./messages/en.json'),
    //   ja: () => import('./messages/ja.json'),
    // },
  });
}
