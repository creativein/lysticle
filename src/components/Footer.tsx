import React from 'react';
import { ListChecks } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <ListChecks size={32} className="text-violet-400" />
            <span className="text-2xl font-bold">lysticle</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
          </nav>

          <nav className="flex flex-wrap justify-center gap-6">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-use" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a>
          </nav>
          
          <p className="text-center text-gray-500">
            &copy; {currentYear} Lysticle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;