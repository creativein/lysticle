import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  delay: number;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen, delay }: FAQItemProps) => {
  return (
    <motion.div 
      className="border-b border-gray-200 py-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        {isOpen ? (
          <ChevronUp size={20} className="text-violet-600" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>
      
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? 12 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How quickly can I see results with Lysticle.com?",
      answer: "Most users see increased traffic within 2-4 weeks of publishing their first listicles. Our SEO-optimized templates are designed to rank faster on Google, and the viral-ready formats often generate social shares immediately upon publication."
    },
    {
      question: "What makes Lysticle different from regular blog posts?",
      answer: "Listicles have 73% higher engagement rates than traditional blog posts. Our platform specializes in creating scannable, shareable content with built-in affiliate integration, social sharing optimization, and conversion-focused layouts that turn readers into buyers."
    },
    {
      question: "Can I track which products are generating the most revenue?",
      answer: "Absolutely! Our analytics dashboard shows click-through rates, conversion data, and revenue attribution for each product in your listicles. You can see exactly which items in your top-10 lists are driving the most affiliate commissions or sales."
    },
    {
      question: "Do I need to be tech-savvy to create high-converting listicles?",
      answer: "Not at all! Our intuitive editor and smart templates do the heavy lifting. Just add your products, write short descriptions, and our system handles the SEO optimization, social meta tags, and mobile responsiveness automatically."
    },
    {
      question: "How does the affiliate integration work?",
      answer: "Lysticle integrates directly with Amazon Associates, ShareASale, Commission Junction, and 50+ other affiliate networks. Simply connect your accounts, and our system will automatically insert your affiliate links and track performance across all your listicles."
    },
    {
      question: "Can my listicles go viral on social media?",
      answer: "Yes! Our templates are designed with viral mechanics in mind - compelling headlines, shareable formats, and social-optimized images. Many of our users have achieved 10K+ shares on platforms like Pinterest, Facebook, and Instagram."
    }
  ];
  
  const [openIndex, setOpenIndex] = useState(0);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Frequently Asked <span className="text-violet-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Lysticle. Can't find the answer you're looking for? Contact our support team.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;