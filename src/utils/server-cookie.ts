'use server';
import { cookies } from 'next/headers';

type SameSite = 'lax' | 'strict' | 'none';

export type CookieOptions = {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: SameSite;
};

const defaultOptions: CookieOptions = {
  maxAge: 60 * 60 * 24 * 30,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax',
  domain:
    process.env.NODE_ENV === 'production' ? '.karasu256.com' : 'localhost',
};

export async function setServerCookie<T extends Record<string, unknown>>(
  data: T,
  opts?: CookieOptions,
): Promise<void> {
  const cookieStore = await cookies();
  const options = { ...defaultOptions, ...(opts ?? {}) };

  for (const key of Object.keys(data)) {
    const val = (data as Record<string, unknown>)[key];
    cookieStore.set(key, JSON.stringify(val), options);
  }
}

export async function getServerCookie<
  T extends Record<string, unknown>,
  K extends keyof T,
>(key: K): Promise<T[K] | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(String(key));

  if (!cookie?.value) return undefined;

  try {
    return JSON.parse(cookie.value) as T[K];
  } catch {
    return undefined;
  }
}
