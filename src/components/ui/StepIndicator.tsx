import React from 'react';
import { Check } from 'lucide-react';

type Step = {
  id: number;
  name: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number;
  className?: string;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  steps, 
  currentStep,
  className = '',
}) => {
  return (
    <nav aria-label="Progress" className={`w-full ${className}`}>
      <ol role="list" className="flex items-center">
        {steps.map((step, index) => (
          <li key={step.id} className={`relative flex items-center ${index === steps.length - 1 ? 'flex-1' : 'flex-1'}`}>
            {step.id < currentStep ? (
              // Completed step
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 group">
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : step.id === currentStep ? (
              // Current step
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-white"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : (
              // Future step
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            )}
            
            {index !== steps.length - 1 && (
              <div className="hidden sm:block absolute top-10 text-center w-full">
                <span
                  className={`text-sm font-medium ${
                    step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;