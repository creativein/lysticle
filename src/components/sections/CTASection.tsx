import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Users } from 'lucide-react';
import Button from '../ui/Button';

const CTASection = () => {
  return (
    <section id="cta" className="py-20 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your content strategy?
              </h2>
              <p className="text-lg md:text-xl mb-8 text-violet-100">
                Book a free consultation with our content strategy experts and discover how Lysticle can help you create high-converting listicles.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Clock size={20} className="text-violet-200 mr-3" />
                  <span className="text-violet-100">30-minute strategy session</span>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="text-violet-200 mr-3" />
                  <span className="text-violet-100">1-on-1 with a content expert</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={20} className="text-violet-200 mr-3" />
                  <span className="text-violet-100">Flexible scheduling</span>
                </div>
              </div>
              <Button variant="outline" size="lg" className="bg-white text-violet-600 border-white hover:bg-violet-50">
                Book Your Free Consultation
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
            
            {/* Consultation Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4">
                Schedule a Consultation
              </h3>
              <p className="mb-6 text-violet-100">
                Tell us about your business and we'll show you how Lysticle can help you achieve your goals.
              </p>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-violet-100">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-violet-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-violet-100">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@company.com"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-violet-200"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1 text-violet-100">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="xxx-xxx-xxxx"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-violet-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-violet-100">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Tell us about your content goals..."
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-violet-200"
                  />
                </div>
                
                <Button type="submit" variant="primary" fullWidth className="bg-white !text-violet-600 border-white hover:bg-violet-50 hover:!text-white">
                  Request Free Consultation
                </Button>
              </form>
              
              <p className="mt-4 text-xs text-center text-violet-200">
                By scheduling a consultation, you agree to our Terms of Service and Privacy Policy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;