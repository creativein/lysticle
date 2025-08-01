import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import { useUTMTracking } from '../services/utmService';
import TestimonialSection from '../components/sections/TestimonialSection';
import PricingSection from '../components/sections/PricingSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/animations/BackgroundAnimation';

const LandingPage = () => {
  // Initialize UTM tracking
  useUTMTracking();
  
  return (
    <div className="relative overflow-hidden">
      <BackgroundAnimation />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;