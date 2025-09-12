const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_EXPIRY_DAYS = 180; // 6 months

interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
  timestamp: number;
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Strict`;
};

export const getCookieConsent = (): CookieConsent | null => {
  const consent = getCookie(COOKIE_CONSENT_KEY);
  return consent ? JSON.parse(decodeURIComponent(consent)) : null;
};

export const setCookieConsent = (consent: Partial<CookieConsent>) => {
  const timestamp = Date.now();
  const fullConsent: CookieConsent = {
    analytics: false,
    marketing: false,
    necessary: true, // Necessary cookies are always accepted
    ...consent,
    timestamp,
  };
  
  setCookie(
    COOKIE_CONSENT_KEY, 
    encodeURIComponent(JSON.stringify(fullConsent)), 
    COOKIE_EXPIRY_DAYS
  );
  return fullConsent;
};

export const clearCookieConsent = () => {
  // Set expiry to past date to delete the cookie
  document.cookie = `${COOKIE_CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
};

export const hasValidConsent = (): boolean => {
  const consent = getCookieConsent();
  if (!consent) return false;
  
  // Consider consent valid for 6 months
  const SIX_MONTHS = 180 * 24 * 60 * 60 * 1000;
  return Date.now() - consent.timestamp < SIX_MONTHS;
};