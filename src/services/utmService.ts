import { useEffect } from 'react';

export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term?: string;
  utm_content?: string;
}

class UTMService {
  private readonly UTM_STORAGE_KEY = 'lysticle_utm_params';

  getUTMParams(): UTMParams | null {
    const stored = localStorage.getItem(this.UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  saveUTMParams(params: UTMParams): void {
    localStorage.setItem(this.UTM_STORAGE_KEY, JSON.stringify(params));
  }

  clearUTMParams(): void {
    localStorage.removeItem(this.UTM_STORAGE_KEY);
  }

  extractUTMFromURL(url: string): UTMParams | null {
    const urlParams = new URLSearchParams(url);
    const utmParams: Partial<UTMParams> = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
    };

    // Return null if required UTM parameters are missing
    if (!utmParams.utm_source || !utmParams.utm_medium || !utmParams.utm_campaign) {
      return null;
    }

    return utmParams as UTMParams;
  }
}

export const utmService = new UTMService();

// React hook to handle UTM parameters
export const useUTMTracking = () => {
  useEffect(() => {
    const captureUTM = () => {
      const currentSearch = window.location.search;
      if (currentSearch) {
        const utmParams = utmService.extractUTMFromURL(currentSearch);
        if (utmParams) {
          utmService.saveUTMParams(utmParams);
        }
      }
    };

    captureUTM();
  }, []);
};
