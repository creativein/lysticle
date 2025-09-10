import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import { Check, Loader2, RefreshCw } from 'lucide-react';
import { dnsService } from '../../services/dnsService';
import { ansibleService } from '../../services/ansibleService';
import { onboardingService } from '../../services/onboardingService';
import DeploymentProgress from './DeploymentProgress';

import { CompanyFormData } from './CompanyDetailsForm';
import { ContactFormData } from './ContactDetailsForm';

type DomainConfigFormProps = {
  onNext: (data: DomainFormData) => void;
  onBack: () => void;
  initialData?: DomainFormData;
  email: string;
  companyData?: CompanyFormData;
  contactData?: ContactFormData;
  onDeploymentStart?: () => void;
  onDeploymentComplete?: () => void;
};

export type DomainFormData = {
  subdomain: string;
  customDomain: string;
  usesCustomDomain: boolean;
  isDNSVerified?: boolean;
  email?: string; // optional: if you want to keep it in the form data
};

const REQUIRED_A_RECORD = import.meta.env.VITE_REQUIRED_A_RECORD;

const DomainConfigForm: React.FC<DomainConfigFormProps> = ({
  onNext,
  onBack,
  initialData = {
    subdomain: '',
    customDomain: '',
    usesCustomDomain: true,
    isDNSVerified: false,
    email: ''
  },
  email,
  companyData,
  contactData,
  onDeploymentStart,
  onDeploymentComplete
}) => {
  const [formData, setFormData] = useState<DomainFormData>({
    ...initialData,
    email: email || initialData.email || '', // always set from prop
  });
  const [errors, setErrors] = useState<Partial<DomainFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingDNS, setIsVerifyingDNS] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<{success: boolean; message: string; jobId?: string} | null>(null);
  const [requiredRecords, setRequiredRecords] = useState<Array<{type: string; host: string; value: string;}>>([
    { type: 'A', host: '@', value: REQUIRED_A_RECORD },
    // { type: 'CNAME', host: 'www', value: 'yourdomain.com' }
  ]);

  const checkDNS = async (domain: string) => {
    setIsVerifyingDNS(true);
    try {
      const result = await dnsService.verifyDNSWithGoogle(domain);
      
      setFormData(prev => ({ ...prev, isDNSVerified: result.isValid }));
      
      // Update required records if available
      if (result.requiredRecords) {
        setRequiredRecords(result.requiredRecords);
      }
      
      if (!result.isValid) {
        setErrors(prev => ({ 
          ...prev, 
          customDomain: result.message 
        }));
      } else {
        setErrors(prev => ({ ...prev, customDomain: undefined }));
      }
    } catch {
      setErrors(prev => ({ 
        ...prev, 
        customDomain: 'Failed to verify DNS records. Please try again.' 
      }));
    } finally {
      setIsVerifyingDNS(false);
    }
  };

  // Keep formData.email in sync with prop email
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      email: email || '',
    }));
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Always keep email in sync with prop
    setFormData(prev => ({
      ...prev,
      [name]: value,
      email: email || '', // force email from prop
    }));

    if (errors[name as keyof DomainFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DomainFormData> = {};
    
    if (!formData.customDomain.trim()) {
      newErrors.customDomain = 'Custom domain is required';
    } else if (!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(formData.customDomain)) {
      newErrors.customDomain = 'Please enter a valid domain name';
    } else if (!formData.isDNSVerified) {
      newErrors.customDomain = 'Please verify your DNS configuration';
    }

    // Validate email
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setDeploymentStatus(null);

    try {
      // First save the form data
      const submissionResult = await onboardingService.submitOnboardingData(
        companyData || {
          companyName: '',
          industry: '',
          size: '',
          website: ''
        },
        contactData || {
          firstName: '',
          lastName: '',
          email: formData.email || '',
          phoneNumber: '',
          jobTitle: ''
        },
        formData
      );

      if (!submissionResult.success) {
        throw new Error(submissionResult.message);
      }

      // Then trigger the Ansible deployment
      const deploymentResult = await ansibleService.triggerDeployment({
        domain: formData.customDomain,
        email: formData.email || ''
      });

      // Save deployment status
      setDeploymentStatus(deploymentResult);
      
      if (!deploymentResult.success) {
        setErrors(prev => ({ 
          ...prev, 
          customDomain: deploymentResult.message 
        }));
        setIsLoading(false);
        return;
      }
      
      // Start the deployment progress screen
      setIsLoading(false);
      setIsDeploying(true);
      if (onDeploymentStart) {
        onDeploymentStart();
      }
      
    } catch {
      setDeploymentStatus({
        success: false,
        message: 'Failed to deploy infrastructure. Please try again.'
      });
      setErrors(prev => ({ 
        ...prev, 
        customDomain: 'Failed to deploy infrastructure. Please try again.' 
      }));
      setIsLoading(false);
    }
  };

  const handleDeploymentComplete = () => {
    if (onDeploymentComplete) {
      onDeploymentComplete();
    }
    onNext(formData);
  };

  const handleDeploymentError = (error: string) => {
    // Deployment failed, return to form
    setIsDeploying(false);
    setErrors(prev => ({ 
      ...prev, 
      customDomain: error 
    }));
  };

  // Show deployment progress screen if deployment is in progress
  if (isDeploying) {
    return (
      <DeploymentProgress
        domain={formData.customDomain}
        email={formData.email || ''}
        onComplete={handleDeploymentComplete}
        onError={handleDeploymentError}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
  
        <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
          <p className="text-sm text-amber-800 font-medium mb-2">
            To verify your domain, add these DNS records:
          </p>
          <div className="bg-white p-3 rounded border border-amber-200 font-mono text-sm">
            {requiredRecords.map((record, index) => (
              <React.Fragment key={`dns-record-${index}`}>
                <p className="mb-2">Type: <span className="text-amber-700">{record.type}</span></p>
                <p className="mb-2">Host: <span className="text-amber-700">{record.host}</span></p>
                <p className={index < requiredRecords.length - 1 ? "mb-2" : ""}>
                  Value: <span className="text-amber-700">{record.value}</span>
                </p>
                {index < requiredRecords.length - 1 && <hr className="my-2 border-amber-100" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700">
            Custom Domain<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex">
            <div className="relative flex-1">
              <input
                id="customDomain"
                name="customDomain"
                type="text"
                placeholder="app.yourcompany.com"
                required
                value={formData.customDomain}
                onChange={handleChange}
                className={`w-full rounded-l-md border ${
                  errors.customDomain ? 'border-red-500' : 'border-gray-300'
                } bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => checkDNS(formData.customDomain)}
              disabled={!formData.customDomain || isVerifyingDNS}
              className="rounded-l-none border-l-0"
            >
              {isVerifyingDNS ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Verify DNS
                </>
              )}
            </Button>
          </div>
          {errors.customDomain && (
            <p className="text-sm text-red-500 mt-1">{errors.customDomain}</p>
          )}
          <p className="text-sm text-gray-500">Use your own domain for your application</p>
        </div>

        {/* Email field is now hidden */}
        <input type="hidden" name="email" value={email} />
        
        {formData.isDNSVerified && (
          <div className="bg-green-50 p-4 rounded-md border border-green-100">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-sm text-green-800">
                DNS records are properly configured
              </p>
            </div>
          </div>
        )}
        
        {deploymentStatus?.success && (
          <div className="bg-green-50 p-4 rounded-md border border-green-100">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-sm text-green-800">
                {deploymentStatus.message} {deploymentStatus.jobId ? `(Job ID: ${deploymentStatus.jobId})` : ''}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button 
          type="button" 
          variant="outline" 
          size="lg"
          fullWidth
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={!formData.isDNSVerified}
        >
          Complete Setup
        </Button>
      </div>
    </form>
  );
};

export default DomainConfigForm;