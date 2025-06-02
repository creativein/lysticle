import React, { forwardRef } from 'react';

type InputProps = {
  label?: string;
  helperText?: string;
  error?: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    helperText, 
    error, 
    id, 
    type = 'text', 
    placeholder, 
    required = false, 
    disabled = false, 
    className = '',
    autoComplete,
    onChange,
    onBlur,
    value,
    ...props 
  }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          autoComplete={autoComplete}
          className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;