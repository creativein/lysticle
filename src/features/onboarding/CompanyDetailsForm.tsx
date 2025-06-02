import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

type CompanyDetailsFormProps = {
  onNext: (data: CompanyFormData) => void;
  initialData?: CompanyFormData;
};

export type CompanyFormData = {
  companyName: string;
  industry: string;
  size: string;
  website: string;
};

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({ 
  onNext,
  initialData = {
    companyName: '',
    industry: '',
    size: '',
    website: '',
  },
}) => {
  const [formData, setFormData] = useState<CompanyFormData>(initialData);
  const [errors, setErrors] = useState<Partial<CompanyFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof CompanyFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CompanyFormData> = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
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
      <Input
        id="companyName"
        label="Company Name"
        placeholder="Enter your company name"
        required
        value={formData.companyName}
        onChange={handleChange}
        error={errors.companyName}
        name="companyName"
      />
      
      <div className="space-y-2">
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
          Industry<span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className={`w-full rounded-md border ${
            errors.industry ? 'border-red-500' : 'border-gray-300'
          } bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          required
        >
          <option value="" disabled>
            Select your industry
          </option>
          <option value="technology">Technology</option>
          <option value="healthcare">Healthcare</option>
          <option value="finance">Finance</option>
          <option value="education">Education</option>
          <option value="retail">Retail</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="other">Other</option>
        </select>
        {errors.industry && (
          <p className="text-sm text-red-500">{errors.industry}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
          Company Size
        </label>
        <select
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select company size
          </option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501-1000">501-1000 employees</option>
          <option value="1000+">1000+ employees</option>
        </select>
      </div>
      
      <Input
        id="website"
        label="Company Website"
        placeholder="https://example.com"
        type="url"
        value={formData.website}
        onChange={handleChange}
        error={errors.website}
        name="website"
        helperText="Optional but helpful for personalization"
      />
      
      <Button 
        type="submit" 
        variant="primary" 
        size="lg" 
        fullWidth 
        isLoading={isLoading}
      >
        Continue
      </Button>
    </form>
  );
};

export default CompanyDetailsForm;