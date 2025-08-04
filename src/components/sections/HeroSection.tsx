import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, List, Sparkles, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero content */}
          <motion.div 
            className="lg:w-1/2 lg:pr-16 text-center lg:text-left mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-violet-100 text-violet-800 rounded-full mb-6">
              <Sparkles size={16} className="mr-2" />
              <span className="text-sm font-medium">Turn Clicks Into Conversions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              <span className="text-violet-600">Listicle Magic</span> That Drives Real Results
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Boost traffic, engagement, and sales with high-converting, SEO-friendly listicles. Create viral top-10s, product roundups, and how-to guides in minutes—all optimized for social sharing and Google rankings.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button size="lg" onClick={() => navigate('/onboard')}>
                Get Started For Free
                <ArrowRight size={20} className="ml-2" />
              </Button>
              
              {/* <Button variant="outline" size="lg">
                Watch Demo
              </Button> */}
            </div>
            
            <p className="mt-6 text-gray-500 text-sm">
              No credit card required. Start creating viral content today.
            </p>
          </motion.div>
          
          {/* Hero illustration */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Abstract shapes */}
              <div className="absolute -left-10 -top-10 w-24 h-24 bg-violet-200 rounded-2xl transform rotate-12 animate-pulse" />
              <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-blue-200 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              {/* Main illustration */}
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <List size={24} />
                      <span className="font-bold text-xl">Lysticle</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Top 10 Products That Actually Made Me Money</h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex gap-4">
                        <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-violet-600">{item}</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                          <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                          <div className="h-3 bg-gray-100 rounded w-5/6" />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center text-violet-600 font-medium">
                      <Rocket size={16} className="mr-1" />
                      <span>Published</span>
                    </div>
                    <div className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
                      $2,847 earned
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;