import React, { ReactNode } from 'react';
import { CircleUser, BarChart3, Building2, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';

type OnboardingLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  step: number;
};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  title,
  description,
  step,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col">
      
      <main className="flex-1 max-w-3xl mx-auto w-full">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-8 justify-between max-w-xs sm:max-w-md mx-auto">
              <StepIcon 
                Icon={Building2} 
                active={step >= 1} 
                complete={step > 1}
                text="Company"
              />
              <StepConnector active={step > 1} />
              <StepIcon 
                Icon={CircleUser} 
                active={step >= 2} 
                complete={step > 2}
                text="Contact"
              />
              <StepConnector active={step > 2} />
              <StepIcon 
                Icon={Globe} 
                active={step >= 3} 
                complete={step > 3}
                text="Domain"
              />
            </div>
            {children}
          </CardContent>
        </Card>
      </main>

    </div>
  );
};

type StepIconProps = {
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  complete: boolean;
  text: string;
};

const StepIcon: React.FC<StepIconProps> = ({ Icon, active, complete, text }) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`flex items-center justify-center h-10 w-10 rounded-full transition-colors ${
          complete ? 'bg-blue-600' : active ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-100'
        }`}
      >
        <Icon className={`h-5 w-5 ${complete ? 'text-white' : active ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>
      <span className={`mt-2 text-xs font-medium ${active ? 'text-blue-600' : 'text-gray-500'}`}>
        {text}
      </span>
    </div>
  );
};

const StepConnector: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="w-16 sm:w-24 h-0.5 mx-1 rounded-full transition-colors" style={{ 
      backgroundColor: active ? '#2563EB' : '#E5E7EB'
    }} />
  );
};

export default OnboardingLayout;