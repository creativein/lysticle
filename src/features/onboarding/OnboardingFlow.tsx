import React, { useState } from 'react';
import OnboardingLayout from './OnboardingLayout';
import CompanyDetailsForm, { CompanyFormData } from './CompanyDetailsForm';
import ContactDetailsForm, { ContactFormData } from './ContactDetailsForm';
import DomainConfigForm, { DomainFormData } from './DomainConfigForm';
import OnboardingSuccess from './OnboardingSuccess';
import InputMask from 'react-input-mask'; // Add this import if not already present

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

  // Add validation status for email and phone
  const [validationStatus, setValidationStatus] = useState({
    email: { isValid: null as boolean | null, message: '', isChecking: false },
    phone: { isValid: null as boolean | null, message: '', isChecking: false }
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

  // Email validation logic (copied from CTASection)
  const validateEmail = (email: string) => {
    if (!email) {
      setValidationStatus(prev => ({
        ...prev,
        email: { isValid: null, message: '', isChecking: false }
      }));
      return;
    }
    setValidationStatus(prev => ({
      ...prev,
      email: { ...prev.email, isChecking: true }
    }));
    if (window.$ && window.$.fn && window.$.fn.xverifyEmail) {
      try {
        window.$('#onboarding-email').xverifyEmail({
          apikey: '1014891-140AFB3A',
          callback: function(response: { status: string; message?: string }) {
            const isValid = response.status === 'valid';
            setValidationStatus(prev => ({
              ...prev,
              email: {
                isValid,
                message: isValid ? 'Email verified' : response.message || 'Invalid email',
                isChecking: false
              }
            }));
          }
        });
      } catch (error) {
        basicEmailValidation(email);
      }
    } else {
      basicEmailValidation(email);
    }
  };

  const basicEmailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setTimeout(() => {
      setValidationStatus(prev => ({
        ...prev,
        email: {
          isValid,
          message: isValid ? 'Email format valid' : 'Invalid email format',
          isChecking: false
        }
      }));
    }, 500);
  };

  // Phone validation logic (copied from CTASection)
  const validatePhone = (phone: string) => {
    if (!phone) {
      setValidationStatus(prev => ({
        ...prev,
        phone: { isValid: null, message: '', isChecking: false }
      }));
      return;
    }
    setValidationStatus(prev => ({
      ...prev,
      phone: { ...prev.phone, isChecking: true }
    }));
    if (window.$ && window.$.fn && window.$.fn.xverifyPhone) {
      try {
        window.$('#onboarding-phone').xverifyPhone({
          apikey: 'demo',
          callback: function(response: { status: string; message?: string }) {
            const isValid = response.status === 'valid';
            setValidationStatus(prev => ({
              ...prev,
              phone: {
                isValid,
                message: isValid ? 'Phone verified' : response.message || 'Invalid phone number',
                isChecking: false
              }
            }));
          }
        });
      } catch (error) {
        basicPhoneValidation(phone);
      }
    } else {
      basicPhoneValidation(phone);
    }
  };

  const basicPhoneValidation = (phone: string) => {
    const cleanPhone = phone.replace(/[\s-()_]/g, '');
    const isValid = /^\d{10}$/.test(cleanPhone);
    setTimeout(() => {
      setValidationStatus(prev => ({
        ...prev,
        phone: {
          isValid,
          message: isValid ? 'Phone format valid' : 'Please enter a valid 10-digit phone number',
          isChecking: false
        }
      }));
    }, 500);
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
              validationStatus={validationStatus}
              validateEmail={validateEmail}
              validatePhone={validatePhone}
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
              email={contactData.email} // <-- pass email from ContactDetailsForm
              companyData={companyData}
              contactData={contactData}
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