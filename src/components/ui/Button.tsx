import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  to?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border-2 border-violet-600 text-violet-600 hover:bg-violet-50 focus:ring-violet-500',
    ghost: 'text-violet-600 hover:bg-violet-50 focus:ring-violet-500',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-2.5',
    lg: 'text-lg px-8 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${widthClass} 
    ${disabledClass}
    ${className}
  `;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;