import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

type ContactDetailsFormProps = {
  onNext: (data: ContactFormData) => void;
  onBack: () => void;
  initialData?: ContactFormData;
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phoneNumber && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onNext(formData);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="firstName"
          label="First Name"
          placeholder="Enter your first name"
          required
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          name="firstName"
        />
        
        <Input
          id="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          required
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          name="lastName"
        />
      </div>
      
      <Input
        id="email"
        label="Email Address"
        placeholder="you@example.com"
        type="email"
        required
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        name="email"
        autoComplete="email"
      />
      
      <Input
        id="phoneNumber"
        label="Phone Number"
        placeholder="+1 (555) 123-4567"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
        name="phoneNumber"
        helperText="Optional"
      />
      
      <Input
        id="jobTitle"
        label="Job Title"
        placeholder="e.g., Marketing Manager"
        value={formData.jobTitle}
        onChange={handleChange}
        name="jobTitle"
      />
      
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
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ContactDetailsForm;