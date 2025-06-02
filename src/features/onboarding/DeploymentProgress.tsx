import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Loader2, Server, Globe, Database, Shield, Rocket } from 'lucide-react';

interface DeploymentStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  duration: number; // in seconds
  status: 'pending' | 'running' | 'completed' | 'error';
}

interface DeploymentProgressProps {
  domain: string;
  email: string;
  onComplete: () => void;
  onError: (error: string) => void;
}

const DeploymentProgress: React.FC<DeploymentProgressProps> = ({
  domain,
  email,
  onComplete,
  onError
}) => {
  const [steps] = useState<DeploymentStep[]>([
    {
      id: 'infrastructure',
      title: 'Setting up Infrastructure',
      description: 'Provisioning servers and network configuration',
      icon: Server,
      duration: 8,
      status: 'pending'
    },
    {
      id: 'security',
      title: 'Configuring Security',
      description: 'Setting up SSL certificates and firewall rules',
      icon: Shield,
      duration: 6,
      status: 'pending'
    },
    {
      id: 'database',
      title: 'Initializing Database',
      description: 'Creating database schema and initial data',
      icon: Database,
      duration: 10,
      status: 'pending'
    },
    {
      id: 'domain',
      title: 'Configuring Domain',
      description: `Setting up DNS routing for ${domain}`,
      icon: Globe,
      duration: 12,
      status: 'pending'
    },
    {
      id: 'deployment',
      title: 'Deploying Application',
      description: 'Building and deploying your application',
      icon: Rocket,
      duration: 9,
      status: 'pending'
    }
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepsState, setStepsState] = useState(steps);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(45);

  useEffect(() => {
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let currentTime = 0;

    const timer = setInterval(() => {
      currentTime += 0.5;
      setTimeElapsed(currentTime);
      
      const progressPercentage = Math.min((currentTime / totalDuration) * 100, 100);
      setProgress(progressPercentage);
      setEstimatedTimeRemaining(Math.max(totalDuration - currentTime, 0));

      // Update step statuses
      let accumulatedTime = 0;
      const newStepsState = steps.map((step, index) => {
        const stepStartTime = accumulatedTime;
        const stepEndTime = accumulatedTime + step.duration;
        accumulatedTime += step.duration;

        if (currentTime < stepStartTime) {
          return { ...step, status: 'pending' as const };
        } else if (currentTime >= stepStartTime && currentTime < stepEndTime) {
          setCurrentStepIndex(index);
          return { ...step, status: 'running' as const };
        } else {
          return { ...step, status: 'completed' as const };
        }
      });

      setStepsState(newStepsState);

      // Complete the deployment
      if (currentTime >= totalDuration) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [steps, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Rocket className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Deploying Your Application
          </h1>
          <p className="text-gray-600">
            Setting up your infrastructure for <span className="font-semibold text-blue-600">{domain}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Time Elapsed: {formatTime(timeElapsed)}</span>
            <span>Est. Remaining: {formatTime(estimatedTimeRemaining)}</span>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            {stepsState.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : step.status === 'running' ? (
                      <div className="relative">
                        <Circle className="w-6 h-6 text-blue-500" />
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin absolute top-1 left-1" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <Icon className={`w-5 h-5 ${
                        step.status === 'completed' ? 'text-green-500' :
                        step.status === 'running' ? 'text-blue-500' :
                        'text-gray-400'
                      }`} />
                      <h3 className={`text-lg font-semibold ${
                        step.status === 'completed' ? 'text-green-700' :
                        step.status === 'running' ? 'text-blue-700' :
                        'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      {step.status === 'running' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          In Progress
                        </span>
                      )}
                      {step.status === 'completed' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      step.status === 'completed' ? 'text-green-600' :
                      step.status === 'running' ? 'text-blue-600' :
                      'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-sm ${
                      step.status === 'completed' ? 'text-green-500' :
                      step.status === 'running' ? 'text-blue-500' :
                      'text-gray-400'
                    }`}>
                      ~{step.duration}s
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Notification will be sent to <span className="font-medium">{email}</span> upon completion
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeploymentProgress;
