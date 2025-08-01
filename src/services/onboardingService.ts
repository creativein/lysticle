import { CompanyFormData } from '../features/onboarding/CompanyDetailsForm';
import { ContactFormData } from '../features/onboarding/ContactDetailsForm';
import { DomainFormData } from '../features/onboarding/DomainConfigForm';
import axios from 'axios';
import { utmService } from './utmService';

const PROXY_API_URL = import.meta.env.VITE_PROXY_API_URL;
export interface OnboardingSubmissionData {
  // Company Details
  companyName: string;
  industry: string;
  companySize: string;
  companyWebsite: string;

  // Contact Details
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;

  // Domain Configuration
  customDomain: string;
  isDNSVerified: boolean;

  // UTM Parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

class OnboardingService {
  private readonly API_URL = PROXY_API_URL;

  async submitOnboardingData(
    companyData: CompanyFormData,
    contactData: ContactFormData,
    domainData: DomainFormData
  ): Promise<{ success: boolean; message: string }> {
    try {
      const utmParams = utmService.getUTMParams();
      const formData: OnboardingSubmissionData = {
        // Company Details
        companyName: companyData.companyName,
        industry: companyData.industry,
        companySize: companyData.size,
        companyWebsite: companyData.website,

        // Contact Details
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phoneNumber: contactData.phoneNumber,
        jobTitle: contactData.jobTitle,

        // Domain Configuration
        customDomain: domainData.customDomain,
        isDNSVerified: domainData.isDNSVerified || false,

        // UTM Parameters
        ...(utmParams || {}),
      };

      const response = await fetch(`${this.API_URL}/proxy.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: {...formData}, service: 'onboarding'}),
      });

      if (!response.ok) {
        throw new Error('Failed to submit onboarding data');
      }

      await response.json();
      return {
        success: true,
        message: 'Onboarding data submitted successfully',
      };

    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit onboarding data',
      };
    }
  }

  async fetchOnboardings(params?: {
    page?: number;
    limit?: number;
    filters?: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    };
  }): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const response = await axios.post(`${PROXY_API_URL}/proxy.php`, {
        service: 'get_onboardings',
        payload: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          filters: params?.filters || {},
        },
      });

      if (!response.data || response.status !== 200) {
        throw new Error('Failed to fetch onboardings');
      }

      const result = response.data;
      return {
        success: true,
        data: result,
      };

    } catch (error) {
      console.error('Error fetching onboardings:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch onboardings',
      };
    }
  }
}

export const onboardingService = new OnboardingService();
