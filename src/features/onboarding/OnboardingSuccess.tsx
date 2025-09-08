import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';

type OnboardingSuccessProps = {
  domainInfo: {
    domain: string;
    isCustomDomain: boolean;
  };
  email: string; // Add email prop for login details
  onDashboardRedirect: () => void;
};

const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({
  domainInfo,
  email,
  onDashboardRedirect,
}) => {
  const handleGoToDashboard = () => {
    // Open the user's domain in a new tab
    const url = `https://${domainInfo.domain}/admin`;
    window.open(url, '_blank', 'noopener,noreferrer');

    // Also call the original redirect handler for any additional logic
    onDashboardRedirect();
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


      {/* CMS Portal Login Details with Go to Dashboard button */}
      <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto border border-blue-100 text-left flex flex-col gap-3 items-stretch">
        <div>
          <p className="font-medium text-blue-800 mb-2">CMS Portal Login Details</p>
          <div className="space-y-1 text-sm text-blue-700">
            <p><span className="font-semibold">Login Via:</span> {email}</p>
            <p><span className="font-semibold">Password:</span> <span className="font-mono">{import.meta.env.VITE_CMS_PASSWORD}</span></p>
          </div>
          <p className="text-xs text-blue-500 mt-2">You can change your password after logging in.</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="mt-4 w-full"
          onClick={handleGoToDashboard}
        >
          Go to Dashboard
        </Button>
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

      {/* Button moved to CMS Portal Login Details box above */}
    </div>
  );
};

export default OnboardingSuccess;