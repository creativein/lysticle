import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';
import { Link } from 'react-router-dom';
import { ArrowLeft, ListChecks } from 'lucide-react';
import Button from '../components/ui/Button';

const TermsOfUse = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      {...pageTransition}
    >
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
      <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Use</h1>
        
        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using our platform, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, then you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily access our platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Account</h2>
            <p className="mb-4">
              To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Service Modifications</h2>
            <p className="mb-4">
              We reserve the right to withdraw or amend our service, and any service or material we provide, in our sole discretion without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall we be liable for any damages arising out of the use or inability to use our platform, even if we have been notified of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Governing Law</h2>
            <p className="mb-4">
              These terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
            <p className="mb-4">
              For any questions about these Terms, please contact us at:
            </p>
            <p className="font-medium">
              Email: support@lysticle.com<br />
            </p>
          </section>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Last updated: September 12, 2025
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default TermsOfUse;