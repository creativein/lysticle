import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from './Button';
import { fadeInUp } from '../../utils/animations';

interface CookieBannerProps {
  onAccept: () => void;
  onReject: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onReject }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-50"
    >
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        <div className="text-sm text-gray-700 leading-relaxed">
          We value your privacy. We and our partners use cookies and similar technologies to provide you with a better browsing experience, analyze site traffic, and personalize content. You can manage your preferences by selecting "Cookie Settings" or accept our recommended settings.{' '}
          <a href="/privacy-policy" className="text-blue-600 hover:underline font-medium">
            Privacy Policy</a> · {' '}
          <a href="/terms-of-use" className="text-blue-600 hover:underline font-medium">
            Terms of Use
          </a>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            onClick={() => {
              onReject();
              setIsVisible(false);
            }}
            className="px-6 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Decline Optional
          </Button>
          <Button
            onClick={() => {
              onAccept();
              setIsVisible(false);
            }}
            className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700"
          >
            Allow Cookies
          </Button>
        </div>
      </div>
    </motion.div>
  );
};