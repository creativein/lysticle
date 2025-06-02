import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Layout, 
  ListChecks, 
  ShoppingBag, 
  Sparkles, 
  BarChart, 
  Smartphone, 
  Search 
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  return (
    <motion.div 
      className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Instant Site Builder",
      description: "One-click setup for landing pages and SEO-optimized listicles with a drag-and-drop editor for non-technical users."
    },
    {
      icon: <Layout size={24} />,
      title: "Listicle Templates",
      description: "Pre-built, high-converting templates tailored for different industries like beauty, tech, SaaS, fashion, and more."
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Offer Integration",
      description: "Easily embed product offers, affiliate links, coupon codes, or promotional content with Shopify and Amazon integrations."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Smart Content Engine",
      description: "AI-assisted title and copy generation with auto-populated product blurbs, images, and pricing."
    },
    {
      icon: <BarChart size={24} />,
      title: "Analytics & A/B Testing",
      description: "Real-time engagement metrics and built-in split testing for headlines and order of list items."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile-First Design",
      description: "Fully responsive with AMP support for lightning-fast load times on all devices and screen sizes."
    },
    {
      icon: <Search size={24} />,
      title: "SEO & Sharing Tools",
      description: "Schema markup for featured snippets and built-in social sharing buttons with Open Graph tag generation."
    },
    {
      icon: <ListChecks size={24} />,
      title: "Monetization Ready",
      description: "Easy affiliate tracking and embed newsletter forms or lead magnets to maximize your revenue."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Everything you need to create <span className="text-violet-600">high-converting</span> listicles
          </h2>
          <p className="text-xl text-gray-600">
            Our platform provides all the tools to create, publish, and monetize listicles without any technical skills.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;