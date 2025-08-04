import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Users, AlertCircle, CheckCircle } from 'lucide-react';
import InputMask from 'react-input-mask';
import Button from '../ui/Button';
import { contactService } from '../../services/contactService';

declare global {
  interface Window {
    $?: any;
    jQuery?: any;
  }
}

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [validationStatus, setValidationStatus] = useState({
    email: { isValid: null as boolean | null, message: '', isChecking: false },
    phone: { isValid: null as boolean | null, message: '', isChecking: false }
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    // Ensure jQuery and xverify are loaded
    const initializeXverify = () => {
      if (typeof window !== 'undefined' && window.$ && window.$.fn) {
        // Check if xverify plugins are available
        if (window.$.fn.xverifyEmail && window.$.fn.xverifyPhone) {
          console.log('XVerify initialized successfully');
        } else {
          console.log('XVerify plugins not found, checking again...');
          setTimeout(initializeXverify, 500);
        }
      } else {
        console.log('jQuery not loaded, checking again...');
        setTimeout(initializeXverify, 500);
      }
    };
    
    // Initial check after component mount
    setTimeout(initializeXverify, 1000);
  }, []);

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

    // Check if xverify is available
    if (window.$ && window.$.fn && window.$.fn.xverifyEmail) {
      try {
        window.$('#email').xverifyEmail({
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
        console.error('XVerify email validation error:', error);
        // Fallback to basic email validation
        basicEmailValidation(email);
      }
    } else {
      console.warn('XVerify email plugin not available, using basic validation');
      // Fallback to basic email validation
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
    }, 500); // Simulate API delay
  };

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

    // Check if xverify is available
    if (window.$ && window.$.fn && window.$.fn.xverifyPhone) {
      try {
        window.$('#phone').xverifyPhone({
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
        console.error('XVerify phone validation error:', error);
        // Fallback to basic phone validation
        basicPhoneValidation(phone);
      }
    } else {
      console.warn('XVerify phone plugin not available, using basic validation');
      // Fallback to basic phone validation
      basicPhoneValidation(phone);
    }
  };

  const basicPhoneValidation = (phone: string) => {
    // Remove mask characters and validate the cleaned phone number
    const cleanPhone = phone.replace(/[\s-()_]/g, '');
    // Check if we have exactly 10 digits for US phone numbers
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
    }, 500); // Simulate API delay
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear previous errors
    setFormErrors(prev => ({ ...prev, [id]: '' }));
    
    // Trigger validation for email and phone with debounce
    if (id === 'email') {
      setTimeout(() => validateEmail(value), 500);
    } else if (id === 'phone') {
      setTimeout(() => validatePhone(value), 500);
    }
  };

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (validationStatus.email.isValid === false) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (validationStatus.phone.isValid === false) {
      errors.phone = 'Please enter a valid phone number';
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitMessage(null);
      
      try {
        const result = await contactService.submitContactForm(formData);
        if (result.success) {
          setSubmitMessage({ type: 'success', text: result.message });
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
        } else {
          setSubmitMessage({ type: 'error', text: result.message });
        }
      } catch (error) {
        setSubmitMessage({ 
          type: 'error', 
          text: 'An error occurred while submitting the form. Please try again.' 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getInputClassName = (field: 'email' | 'phone') => {
    const baseClass = "w-full px-4 py-2 rounded-lg bg-white/5 border focus:outline-none focus:ring-2 text-white placeholder-violet-200";
    const validationClass = validationStatus[field].isValid === true 
      ? "border-green-400 focus:ring-green-400/30" 
      : validationStatus[field].isValid === false 
      ? "border-red-400 focus:ring-red-400/30"
      : "border-white/20 focus:ring-white/30";
    
    return `${baseClass} ${validationClass}`;
  };

  const ValidationIcon = ({ field }: { field: 'email' | 'phone' }) => {
    const status = validationStatus[field];
    
    if (status.isChecking) {
      return <div className="animate-spin h-4 w-4 border-2 border-violet-200 border-t-transparent rounded-full" />;
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
    <section id="cta" className="py-20 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to turn clicks into conversions?
              </h2>
              <p className="text-lg md:text-xl mb-8 text-violet-100">
                Join thousands of affiliate marketers, content creators, and brands driving real results. Book a free consultation and see how Lysticle.com can boost your traffic, engagement, and sales.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Clock size={20} className="text-violet-200 mr-3" />
                  <span className="text-violet-100">See results in 30 days or less</span>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="text-violet-200 mr-3" />
                  <span className="text-violet-100">Personalized strategy session</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={20} className="text-violet-200 mr-3" />
                  <span className="text-violet-100">No commitment required</span>
                </div>
              </div>
              <Button variant="outline" size="lg" className="bg-white text-violet-600 border-white hover:bg-violet-50">
                Start Creating Viral Content
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
            
            {/* Consultation Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4">
                Get Started Today
              </h3>
              <p className="mb-6 text-violet-100">
                Tell us about your goals and we'll show you how to create high-converting listicles that drive real results.
              </p>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-violet-100">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-violet-200"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-300">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-violet-100">
                    Work Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className={getInputClassName('email')}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <ValidationIcon field="email" />
                    </div>
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-300">{formErrors.email}</p>
                  )}
                  {validationStatus.email.message && !formErrors.email && (
                    <p className={`mt-1 text-sm ${validationStatus.email.isValid ? 'text-green-300' : 'text-red-300'}`}>
                      {validationStatus.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1 text-violet-100">
                    Phone
                  </label>
                  <div className="relative">
                    <InputMask
                      mask="999-999-9999"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="xxx-xxx-xxxx"
                      className={getInputClassName('phone')}
                      id="phone"
                      type="text"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <ValidationIcon field="phone" />
                    </div>
                  </div>
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-300">{formErrors.phone}</p>
                  )}
                  {validationStatus.phone.message && !formErrors.phone && (
                    <p className={`mt-1 text-sm ${validationStatus.phone.isValid ? 'text-green-300' : 'text-red-300'}`}>
                      {validationStatus.phone.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-violet-100">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="What type of content do you want to create? (Product reviews, top-10 lists, how-to guides, etc.)"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-violet-200"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  className="bg-white !text-violet-600 border-white hover:bg-violet-50 hover:!text-white"
                  disabled={validationStatus.email.isChecking || validationStatus.phone.isChecking || isSubmitting}
                >
                  {isSubmitting 
                    ? 'Sending...' 
                    : (validationStatus.email.isChecking || validationStatus.phone.isChecking)
                      ? 'Validating...'
                      : 'Get My Free Strategy Session'
                  }
                </Button>
              </form>
              
              {submitMessage && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {submitMessage.text}
                </div>
              )}
              
              <p className="mt-4 text-xs text-center text-violet-200">
                By scheduling a consultation, you agree to our Terms of Service and Privacy Policy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;