import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ListChecks } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import OnboardingFlow from '../features/onboarding/OnboardingFlow';
import { utmService } from '../services/utmService';

const DemoPage = () => {
  const location = useLocation();
  const utmParams = location.state?.utmParams || utmService.getUTMParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <nav className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-violet-700">
            <ListChecks size={32} strokeWidth={2} />
            <span className="text-2xl font-bold">lysticle</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <OnboardingFlow utmParams={utmParams} />
    </div>
  );
};

export default DemoPage;