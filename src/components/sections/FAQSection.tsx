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
      question: "How does the 14-day free trial work?",
      answer: "You can sign up for Lysticle without providing any payment information. You'll have full access to all features for 14 days. Before your trial ends, we'll send you a reminder to upgrade to a paid plan. If you don't upgrade, your account will be downgraded to a limited free version."
    },
    {
      question: "Do I need technical skills to use Lysticle?",
      answer: "Not at all! Lysticle is designed for non-technical users. Our drag-and-drop editor and pre-built templates make it easy to create beautiful listicles without any coding knowledge."
    },
    {
      question: "Can I use my own domain name?",
      answer: "Yes, on the Pro and Business plans, you can connect your own custom domain. We provide simple instructions to help you set up the DNS records required."
    },
    {
      question: "How do I integrate product offers and affiliate links?",
      answer: "Lysticle makes it easy to add product offers and affiliate links. You can either use our direct integrations with platforms like Shopify and Amazon, or manually add your affiliate links to any product featured in your listicles."
    },
    {
      question: "What analytics does Lysticle provide?",
      answer: "We provide comprehensive analytics including page views, time on page, click-through rates on each list item, conversion rates, and more. Pro and Business plans include A/B testing capabilities to optimize your content for maximum conversions."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, on all paid plans you can export your analytics data in CSV format. Business plan users also have access to our API for more advanced data integration needs."
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