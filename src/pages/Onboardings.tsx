import { ArrowLeft, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { OnboardingTable } from '../components/ui/OnboardingTable';
import { ContactTable } from '../components/ui/ContactTable';
import { TabButton } from '../components/ui/TabButton';
import { useState } from 'react';

const OnboardingsPage = () => {
  const [activeTab, setActiveTab] = useState<'onboardings' | 'contacts'>('onboardings');
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
      <main className="container mx-auto px-4 py-4">
        <div className="mb-8">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <TabButton
                isActive={activeTab === 'onboardings'}
                onClick={() => setActiveTab('onboardings')}
              >
                Onboardings
              </TabButton>
              <TabButton
                isActive={activeTab === 'contacts'}
                onClick={() => setActiveTab('contacts')}
              >
                Contact Forms
              </TabButton>
            </nav>
          </div>
          
          {activeTab === 'onboardings' ? (
            <OnboardingTable />
          ) : (
            <ContactTable />
          )}
        </div>
      </main>
    </div>
  );
};

export default OnboardingsPage;