import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import OnboardingFlow from '../features/onboarding/OnboardingFlow';

const DemoPage = () => {
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

      {/* <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">
              Welcome to the Lysticle Demo
            </h1>
            <p className="text-gray-600 mb-8">
              This is a preview of the Lysticle platform. Here you can explore our features
              and see how easy it is to create engaging listicles.
            </p>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-8 bg-gray-100 rounded-lg w-3/4 animate-pulse" />
                <div className="h-8 bg-gray-100 rounded-lg w-1/2 animate-pulse" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
              </div>

              <div className="flex justify-center">
                <Button variant="primary" size="lg">
                  Start Creating Your First Listicle
                </Button>
              </div> }
            </div> }
          </div>
        </motion.div>
      </main> */}
      <OnboardingFlow />
    </div>
  );
};

export default DemoPage;