import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>{children}</h3>;
};

type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
  return <p className={`mt-2 text-sm text-gray-500 ${className}`}>{children}</p>;
};

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
};

export default {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};