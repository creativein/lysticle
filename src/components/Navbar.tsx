import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ListChecks } from 'lucide-react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-violet-700">
            <ListChecks size={32} strokeWidth={2} />
            <span className="text-2xl font-bold">lysticle</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-violet-700 font-medium transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-violet-700 font-medium transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-violet-700 font-medium transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-violet-700 font-medium transition-colors">
              FAQ
            </a>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => {
                document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book a Call
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#features" className="text-gray-700 hover:text-violet-700 font-medium py-2 transition-colors" onClick={toggleMenu}>
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-violet-700 font-medium py-2 transition-colors" onClick={toggleMenu}>
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-violet-700 font-medium py-2 transition-colors" onClick={toggleMenu}>
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-violet-700 font-medium py-2 transition-colors" onClick={toggleMenu}>
              FAQ
            </a>
            <div className="pt-2">
              <Button variant="primary" fullWidth onClick={() => {
                document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                toggleMenu();
              }}>
                Book a Call
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;