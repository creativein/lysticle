import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
      {...pageTransition}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including when you:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create an account or sign up for our services</li>
              <li>Use our platform features and functionalities</li>
              <li>Contact us for support or other inquiries</li>
              <li>Subscribe to our newsletters or communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Cookies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p className="mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send you related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing</h2>
            <p className="mb-4">
              We do not share your personal information with third parties except as described in this privacy policy or with your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Security</h2>
            <p className="mb-4">
              The security of your information is important to us. We implement appropriate technical and organizational measures to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to our use of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
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
    </motion.div>
  );
};

export default PrivacyPolicy;