import React, { useState } from 'react';
import OnboardingLayout from './OnboardingLayout';
import CompanyDetailsForm, { CompanyFormData } from './CompanyDetailsForm';
import ContactDetailsForm, { ContactFormData } from './ContactDetailsForm';
import DomainConfigForm, { DomainFormData } from './DomainConfigForm';
import OnboardingSuccess from './OnboardingSuccess';

const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    companyName: '',
    industry: '',
    size: '',
    website: '',
  });
  const [contactData, setContactData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
  });
  const [domainData, setDomainData] = useState<DomainFormData>({
    subdomain: '',
    customDomain: '',
    usesCustomDomain: false,
  });

  const handleCompanySubmit = (data: CompanyFormData) => {
    setCompanyData(data);
    setStep(2);
  };

  const handleContactSubmit = (data: ContactFormData) => {
    setContactData(data);
    setStep(3);
  };

  const handleDomainSubmit = (data: DomainFormData) => {
    setDomainData(data);
    setStep(4);
  };

  const handleDashboardRedirect = () => {
    // Additional logic can be added here (analytics, cleanup, etc.)
    console.log('User completed onboarding and navigated to dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingLayout 
            title="Company Information" 
            description="Tell us about your company to get started."
            step={1}
          >
            <CompanyDetailsForm onNext={handleCompanySubmit} initialData={companyData} />
          </OnboardingLayout>
        );
      case 2:
        return (
          <OnboardingLayout 
            title="Contact Information" 
            description="Provide your contact details for account management."
            step={2}
          >
            <ContactDetailsForm 
              onNext={handleContactSubmit} 
              onBack={() => setStep(1)} 
              initialData={contactData} 
            />
          </OnboardingLayout>
        );
      case 3:
        return (
          <OnboardingLayout 
            title="Set Up Your Domain" 
            description="Choose how your users will access your application."
            step={3}
          >
            <DomainConfigForm 
              onNext={handleDomainSubmit} 
              onBack={() => setStep(2)} 
              initialData={domainData} 
            />
          </OnboardingLayout>
        );
      case 4:
        return (
          <OnboardingLayout 
            title="Onboarding Complete" 
            description="Your application is ready to use."
            step={4}
          >
            <OnboardingSuccess 
              domainInfo={{
                domain: domainData.customDomain || `${domainData.subdomain}.example.com`,
                isCustomDomain: !!domainData.customDomain,
              }}
              onDashboardRedirect={handleDashboardRedirect}
            />
          </OnboardingLayout>
        );
      default:
        return null;
    }
  };

  return renderStep();
};

export default OnboardingFlow;