import { ArrowLeft, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { OnboardingTable } from '../components/ui/OnboardingTable';

const OnboardingsPage = () => {
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
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Onboardings</h1>
        <div className="mb-8">
          <OnboardingTable />
        </div>
      </main>
    </div>
  );
};

export default OnboardingsPage;