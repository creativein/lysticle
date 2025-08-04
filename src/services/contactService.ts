export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
}

class ContactService {
  private readonly API_URL = import.meta.env.VITE_PROXY_API_URL;

  // Client-side validations
  validateName(name: string): ValidationResult {
    if (!name.trim()) {
      return { isValid: false, message: 'Full name is required' };
    }
    if (name.trim().length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters long' };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return { isValid: false, message: 'Name can only contain letters, spaces, hyphens and apostrophes' };
    }
    return { isValid: true, message: '' };
  }

  validateEmail(email: string): ValidationResult {
    if (!email.trim()) {
      return { isValid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true, message: '' };
  }

  validatePhone(phone: string): ValidationResult {
    if (!phone.trim()) {
      return { isValid: false, message: 'Phone number is required' };
    }
    // Remove all non-numeric characters and check length
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return { isValid: false, message: 'Please enter a valid 10-digit phone number' };
    }
    return { isValid: true, message: '' };
  }

  validateMessage(message: string): ValidationResult {
    if (!message.trim()) {
      return { isValid: false, message: 'Message is required' };
    }
    if (message.trim().length < 10) {
      return { isValid: false, message: 'Message must be at least 10 characters long' };
    }
    return { isValid: true, message: '' };
  }

  async submitContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      // Validate all fields before submission
      const nameValidation = this.validateName(formData.name);
      const emailValidation = this.validateEmail(formData.email);
      const phoneValidation = this.validatePhone(formData.phone);
      const messageValidation = this.validateMessage(formData.message);

      if (!nameValidation.isValid || !emailValidation.isValid || 
          !phoneValidation.isValid || !messageValidation.isValid) {
        return {
          success: false,
          message: 'Please fix validation errors before submitting'
        };
      }

      const response = await fetch(`${this.API_URL}/proxy.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'contact',
          payload: {
            ...formData,
            // Add metadata
            submitted_at: new Date().toISOString(),
            source: window.location.href,
            // Get UTM parameters from URL if present
            utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
            utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
            utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
            utm_term: new URLSearchParams(window.location.search).get('utm_term') || '',
            utm_content: new URLSearchParams(window.location.search).get('utm_content') || ''
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      const result = await response.json();
      return {
        success: true,
        message: 'Thank you for your message. We will contact you soon!'
      };

    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit contact form'
      };
    }
  }
}

export const contactService = new ContactService();
