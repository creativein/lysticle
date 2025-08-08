import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import InputMask from 'react-input-mask';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { onboardingService } from '../../services/onboardingService';

type ValidationStatus = {
  email: { isValid: boolean | null; message: string; isChecking: boolean };
  phone: { isValid: boolean | null; message: string; isChecking: boolean };
};

import { CompanyFormData } from './CompanyDetailsForm';

type ContactDetailsFormProps = {
  onNext: (data: ContactFormData) => void;
  onBack: () => void;
  initialData?: ContactFormData;
  validationStatus: ValidationStatus;
  validateEmail: (email: string) => void;
  validatePhone: (phone: string) => void;
  companyData?: CompanyFormData;
};

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
};

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({ 
  onNext,
  onBack,
  initialData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
  },
  validationStatus,
  validateEmail,
  validatePhone,
  companyData,
}) => {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (name === 'email') {
      validateEmail(value);
    }
    if (name === 'phoneNumber') {
      validatePhone(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      validateEmail(value);
    }
    if (name === 'phoneNumber') {
      validatePhone(value);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (validationStatus.email.isValid === false) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (validationStatus.phone.isValid === false) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    
    try {
      // Save the contact form data with company data if available
      const submissionResult = await onboardingService.submitOnboardingData(
        companyData || {
          companyName: '',
          industry: '',
          size: '',
          website: ''
        },
        formData,
        {
          subdomain: '',
          customDomain: '',
          usesCustomDomain: false,
          isDNSVerified: false,
          email: formData.email
        } // Empty domain data as it's not available yet
      );

      if (!submissionResult.success) {
        throw new Error(submissionResult.message);
      }

      setIsLoading(false);
      onNext(formData);
    } catch (error) {
      setIsLoading(false);
      setErrors(prev => ({
        ...prev,
        email: 'Failed to save contact information. Please try again.'
      }));
    }
  };

  const getInputClassName = (field: 'email' | 'phone') => {
    const baseClass = "w-full px-4 py-2 rounded-lg bg-white/5 border focus:outline-none focus:ring-2 text-black placeholder-gray-400";
    const validationClass = validationStatus[field].isValid === true 
      ? "border-green-400 focus:ring-green-400/30" 
      : validationStatus[field].isValid === false 
      ? "border-red-400 focus:ring-red-400/30"
      : "border-gray-200 focus:ring-gray-200/30";
    return `${baseClass} ${validationClass}`;
  };

  const ValidationIcon = ({ field }: { field: 'email' | 'phone' }) => {
    const status = validationStatus[field];
    if (status.isChecking) {
      return <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-transparent rounded-full" />;
    }
    if (status.isValid === true) {
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    }
    if (status.isValid === false) {
      return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            required
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-white/5 border focus:outline-none focus:ring-2 text-black placeholder-gray-400 ${
              errors.firstName ? 'border-red-400 focus:ring-red-400/30' : 'border-gray-200 focus:ring-gray-200/30'
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            required
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-white/5 border focus:outline-none focus:ring-2 text-black placeholder-gray-400 ${
              errors.lastName ? 'border-red-400 focus:ring-red-400/30' : 'border-gray-200 focus:ring-gray-200/30'
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <div className="relative">
          <input
            id="onboarding-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            className={getInputClassName('email')}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <ValidationIcon field="email" />
          </div>
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
        {validationStatus.email.message && !errors.email && (
          <p className={`mt-1 text-sm ${validationStatus.email.isValid ? 'text-green-600' : 'text-red-500'}`}>
            {validationStatus.email.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <div className="relative">
          <InputMask
            mask="999-999-9999"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="xxx-xxx-xxxx"
            className={getInputClassName('phone')}
            id="onboarding-phone"
            name="phoneNumber"
            type="text"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <ValidationIcon field="phone" />
          </div>
        </div>
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
        )}
        {validationStatus.phone.message && !errors.phoneNumber && (
          <p className={`mt-1 text-sm ${validationStatus.phone.isValid ? 'text-green-600' : 'text-red-500'}`}>
            {validationStatus.phone.message}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">Optional</p>
      </div>
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
          Job Title
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          placeholder="e.g., Marketing Manager"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200/30 text-black placeholder-gray-400"
        />
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
          disabled={validationStatus.email.isChecking || validationStatus.phone.isChecking}
        >
          {validationStatus.email.isChecking || validationStatus.phone.isChecking ? 'Validating...' : 'Continue'}
        </Button>
      </div>
    </form>
  );
};

export default ContactDetailsForm;