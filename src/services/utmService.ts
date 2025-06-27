/**
 * UTM Tracking Service
 * 
 * This service handles the extraction, storage, and retrieval of UTM parameters
 * throughout the application.
 */

// Define the structure of UTM data
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  first_visit?: string;
  referrer?: string;
}

const UTM_STORAGE_KEY = 'lysticle_utm_data';

/**
 * Extract UTM parameters from a URL
 */
const extractUTMFromURL = (url: string): UTMParams => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    
    const utmData: UTMParams = {};
    
    // Extract standard UTM parameters
    if (params.has('utm_source')) utmData.utm_source = params.get('utm_source') || undefined;
    if (params.has('utm_medium')) utmData.utm_medium = params.get('utm_medium') || undefined;
    if (params.has('utm_campaign')) utmData.utm_campaign = params.get('utm_campaign') || undefined;
    if (params.has('utm_content')) utmData.utm_content = params.get('utm_content') || undefined;
    if (params.has('utm_term')) utmData.utm_term = params.get('utm_term') || undefined;
    
    return utmData;
  } catch (error) {
    console.error('Error extracting UTM parameters:', error);
    return {};
  }
};

/**
 * Store UTM parameters in session storage
 */
const storeUTMParams = (utmParams: UTMParams): void => {
  try {
    // Get existing UTM data if available
    const existingData = getUTMParams();
    
    // Merge with new data, preferring new values
    const mergedData = { ...existingData, ...utmParams };
    
    // Add first visit timestamp if not already present
    if (!mergedData.first_visit) {
      mergedData.first_visit = new Date().toISOString();
    }
    
    // Add referrer if not already present
    if (!mergedData.referrer && document.referrer) {
      mergedData.referrer = document.referrer;
    }
    
    // Store in session storage
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(mergedData));
  } catch (error) {
    console.error('Error storing UTM parameters:', error);
  }
};

/**
 * Retrieve UTM parameters from session storage
 */
const getUTMParams = (): UTMParams => {
  try {
    const storedData = sessionStorage.getItem(UTM_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('Error retrieving UTM parameters:', error);
    return {};
  }
};

/**
 * Initialize UTM tracking by extracting params from current URL
 */
const initUTMTracking = (): void => {
  if (typeof window !== 'undefined') {
    const currentUrl = window.location.href;
    const utmParams = extractUTMFromURL(currentUrl);
    
    // Only store if we have UTM parameters
    if (Object.keys(utmParams).length > 0) {
      storeUTMParams(utmParams);
    }
  }
};

/**
 * Append UTM parameters to a URL
 */
const appendUTMToURL = (url: string): string => {
  try {
    const utmParams = getUTMParams();
    
    // If no UTM params, return original URL
    if (Object.keys(utmParams).filter(key => key.startsWith('utm_')).length === 0) {
      return url;
    }
    
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    
    // Add UTM parameters to URL
    if (utmParams.utm_source) searchParams.set('utm_source', utmParams.utm_source);
    if (utmParams.utm_medium) searchParams.set('utm_medium', utmParams.utm_medium);
    if (utmParams.utm_campaign) searchParams.set('utm_campaign', utmParams.utm_campaign);
    if (utmParams.utm_content) searchParams.set('utm_content', utmParams.utm_content);
    if (utmParams.utm_term) searchParams.set('utm_term', utmParams.utm_term);
    
    urlObj.search = searchParams.toString();
    return urlObj.toString();
  } catch (error) {
    console.error('Error appending UTM parameters to URL:', error);
    return url;
  }
};

export const utmService = {
  extractUTMFromURL,
  storeUTMParams,
  getUTMParams,
  initUTMTracking,
  appendUTMToURL
};

export default utmService;
