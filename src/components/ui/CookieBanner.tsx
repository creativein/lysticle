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
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
          <a href="/privacy-policy" className="text-blue-600 hover:underline">
            Learn more
          </a>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              onReject();
              setIsVisible(false);
            }}
          >
            Reject All
          </Button>
          <Button
            onClick={() => {
              onAccept();
              setIsVisible(false);
            }}
          >
            Accept All
          </Button>
        </div>
      </div>
    </motion.div>
  );
};