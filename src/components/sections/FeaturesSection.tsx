import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Target, 
  MousePointer, 
  BarChart3, 
  ShoppingCart, 
  Zap, 
  Globe, 
  TrendingUp 
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
      icon: <Search size={24} />,
      title: "SEO-Boosted Layouts",
      description: "Rank faster with our optimized templates featuring schema markup, meta tags, and structure designed for featured snippets and higher search rankings."
    },
    {
      icon: <Target size={24} />,
      title: "Affiliate & Ad Integration",
      description: "Built-in affiliate link management, product embeds, coupon codes, and ad placements. Seamlessly integrate with Amazon, Shopify, and major affiliate networks."
    },
    {
      icon: <MousePointer size={24} />,
      title: "One-Click Publishing",
      description: "Publish directly to your blog, social media, or standalone landing pages. Multi-platform sharing with automatic Open Graph tags and social optimization."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analytics Dashboard",
      description: "Track clicks, conversions, and engagement in real-time. See which list items perform best and optimize your content for maximum revenue."
    },
    {
      icon: <ShoppingCart size={24} />,
      title: "Perfect for eCommerce",
      description: "Ideal for product reviews, comparison sites, and buying guides. Built-in product cards, pricing displays, and 'Buy Now' button integration."
    },
    {
      icon: <Zap size={24} />,
      title: "Smart Content Engine",
      description: "AI-powered title generation, auto-populated product information, and intelligent content suggestions to create engaging listicles faster."
    },
    {
      icon: <Globe size={24} />,
      title: "Mobile-First & Fast",
      description: "Lightning-fast load times with AMP support and mobile-optimized designs that keep readers engaged and reduce bounce rates."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Viral Content Templates",
      description: "Proven templates for top-10 lists, product roundups, how-to guides, and comparison posts that drive social shares and backlinks."
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
            Why <span className="text-violet-600">Lysticle.com?</span>
          </h2>
          <p className="text-xl text-gray-600">
            Stop publishing static content. Start driving results with dynamic listicles your audience loves to click, share, and convert on.
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