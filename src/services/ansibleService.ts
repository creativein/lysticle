import axios from 'axios';

const PROXY_API_URL = import.meta.env.VITE_PROXY_API_URL;

interface AnsibleDeploymentParams {
  domain: string;
  email: string;
}

interface AnsibleDeploymentResponse {
  success: boolean;
  message: string;
  jobId?: string;
}

/**
 * Service for deploying infrastructure using Ansible through Jenkins API
 */
export const ansibleService = {
  /**
   * Trigger an Ansible playbook deployment
   * @param params - The deployment parameters including domain and email
   * @returns A promise resolving to the deployment response
   */
  triggerDeployment: async (
    params: AnsibleDeploymentParams
  ): Promise<AnsibleDeploymentResponse> => {
    try {
      // Create the form data
      const formData = new URLSearchParams();
      formData.append('domain', params.domain);
      formData.append('email', params.email);

      const response = await axios.post(`${PROXY_API_URL}/proxy.php`, {
        service: 'ansible',
        payload: {
          domain: params.domain,
          email: params.email,
        },
      });

      // Jenkins typically responds with 201 if the job was queued successfully
      if (response.status === 201 || response.status === 200) {
        // Extract job ID or other information if available in the response
        const jobId = response.headers?.location?.split('/').pop() || '';
        
        return {
          success: true,
          message: 'Deployment started successfully',
          jobId,
        };
      }

      return {
        success: false,
        message: 'Failed to trigger deployment',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to trigger deployment: Network error',
        };
      }
      
      return {
        success: false,
        message: 'An unexpected error occurred during deployment',
      };
    }
  },
};
