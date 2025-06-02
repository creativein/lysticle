import axios from 'axios';
const REQUIRED_A_RECORD = import.meta.env.VITE_REQUIRED_A_RECORD;
const PROXY_API_URL = import.meta.env.VITE_PROXY_API_URL;

interface DNSRecord {
  type: string;
  host: string;
  value: string;
}

interface DNSVerificationResponse {
  isValid: boolean;
  message: string;
  records?: DNSRecord[];
  requiredRecords?: DNSRecord[];
}

/**
 * Service for verifying DNS records using the SiteRelic API
 */
export const dnsService = {
  /**
   * Verify DNS records for a domain
   * @param domain - The domain to verify DNS records for
   * @returns A promise resolving to the verification result
   */
  verifyDNS: async (domain: string): Promise<DNSVerificationResponse> => {
    try {
      // Clean up domain if needed (remove http:// or https://)
      const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
      
      const response = await axios.post(`${PROXY_API_URL}/proxy.php`, {
        service: 'siterelic',
        payload: {
          url: cleanDomain,
          types: ['A', 'CNAME'],
        },
      });

      // Assuming the API returns a success status if DNS is properly configured
      if (response.data && response.status === 200) {
        return {
          isValid: true,
          message: 'DNS records verified successfully',
          records: response.data.records,
          requiredRecords: [
            { type: 'A', host: '@', value: REQUIRED_A_RECORD },
            { type: 'CNAME', host: 'www', value: domain }
          ]
        };
      }

      return {
        isValid: false,
        message: 'DNS records are not properly configured',
        requiredRecords: [
          { type: 'A', host: '@', value: REQUIRED_A_RECORD },
          { type: 'CNAME', host: 'www', value: domain }
        ]
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          isValid: false,
          message: error.response?.data?.message || 'Failed to verify DNS records',
        };
      }
      
      return {
        isValid: false,
        message: 'An unexpected error occurred',
      };
    }
  },

    /**
   * Verify DNS records for a domain using Google DNS API
   * @param domain - The domain to verify DNS records for
   * @returns A promise resolving to the verification result
   */
  verifyDNSWithGoogle: async (domain: string): Promise<DNSVerificationResponse> => {
    try {
      // Clean up domain if needed (remove http:// or https://)
      const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
  
      const response = await axios.post(`${PROXY_API_URL}/proxy.php`, {
        service: 'googledns',
        payload: {
          name: cleanDomain,
          type: 'A',
        },
      });
  
      if (response.data && response.status === 200) {
        const answer = response.data.Answer || [];
        const records = answer.map((record: any) => ({
          type: 'A',
          host: record.name,
          value: record.data,
        }));
  
        return {
          isValid: records.length > 0,
          message: records.length > 0
            ? 'DNS records verified successfully using Google DNS'
            : 'No DNS records found for the domain',
          records,
          requiredRecords: [
            { type: 'A', host: '@', value: '66.94.124.95' },
          ],
        };
      }
  
      return {
        isValid: false,
        message: 'Failed to verify DNS records using Google DNS',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          isValid: false,
          message: error.response?.data?.message || 'Failed to verify DNS records using Google DNS',
        };
      }
  
      return {
        isValid: false,
        message: 'An unexpected error occurred',
      };
    }
  },
};
