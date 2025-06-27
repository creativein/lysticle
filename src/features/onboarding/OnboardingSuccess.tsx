import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { databaseService } from '../../services/databaseService';
import { UTMParams } from '../../services/utmService';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  companyName: string;
  industry?: string;
  domain?: string;
}

type OnboardingSuccessProps = {
  domainInfo: {
    domain: string;
    isCustomDomain: boolean;
  };
  onDashboardRedirect: () => void;
  userData: UserData;
  utmParams: UTMParams;
};

const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({
  domainInfo,
  onDashboardRedirect,
  userData,
  utmParams
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{success?: boolean; message?: string}>({});

  const handleGoToDashboard = async () => {
    // First, try to save the conversion data
    setIsSaving(true);
    
    try {
      const result = await databaseService.saveConversion({
        userData,
        utmData: utmParams,
        conversionType: 'onboarding_complete'
      });
      
      setSaveStatus({
        success: result.success,
        message: result.message
      });
      
      // Open the user's domain in a new tab
      const url = `https://${domainInfo.domain}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // Also call the original redirect handler for any additional logic
      onDashboardRedirect();
    } catch (error) {
      console.error('Failed to save conversion data:', error);
      setSaveStatus({
        success: false,
        message: 'Failed to save data, but redirecting you to dashboard'
      });
      
      // Still continue with the redirect even if saving failed
      const url = `https://${domainInfo.domain}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      onDashboardRedirect();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="text-center space-y-6 py-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Setup Complete!
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Your account has been successfully set up and your application is being prepared.
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto border border-gray-100">
        <p className="font-medium text-gray-900 mb-1">Your application will be available at:</p>
        <a 
          href={`https://${domainInfo.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-mono bg-white py-2 px-3 rounded border border-gray-200 break-all block transition-colors duration-200"
        >
          https://{domainInfo.domain}
        </a>
      </div>
      
      {domainInfo.isCustomDomain && (
        <div className="bg-amber-50 rounded-lg p-4 max-w-md mx-auto border border-amber-100 text-left">
          <p className="font-medium text-amber-800 mb-2">DNS Configuration Complete</p>
          <div className="space-y-2 text-sm text-amber-700">
            <p>✓ Your domain has been verified and configured</p>
            <p>✓ SSL certificate will be automatically provisioned</p>
            <p>✓ Your application will be accessible at the domain above</p>
          </div>
        </div>
      )}
      
      {saveStatus.message && (
        <div className={`rounded-lg p-4 max-w-md mx-auto border text-left ${
          saveStatus.success ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
        }`}>
          <p>{saveStatus.message}</p>
        </div>
      )}
      
      <div className="pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleGoToDashboard}
          isLoading={isSaving}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Saving...
            </>
          ) : (
            'Go to Dashboard'
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingSuccess;