import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Button from '../ui/Button';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  excluded?: string[];
  isPopular?: boolean;
  delay: number;
}

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  excluded = [],
  isPopular = false,
  delay 
}: PricingTierProps) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl overflow-hidden shadow-sm border ${isPopular ? 'border-violet-400 ring-4 ring-violet-100' : 'border-gray-200'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {isPopular && (
        <div className="bg-violet-600 text-white text-center py-2 font-medium text-sm">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        
        <Button variant={isPopular ? 'primary' : 'outline'} fullWidth>
          Get Started
        </Button>
        
        <div className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
          
          {excluded.map((feature, index) => (
            <div key={index} className="flex items-start opacity-50">
              <X size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-500">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const tiers = [
    {
      name: "Basic",
      price: "29",
      description: "Perfect for bloggers and content creators",
      features: [
        "5 listicle sites",
        "10+ viral templates",
        "Basic SEO optimization",
        "Social sharing tools",
        "Basic analytics dashboard",
        "Email support"
      ],
      excluded: [
        "Advanced affiliate integration",
        "Custom domain",
        "Advanced SEO tools",
        "Priority support"
      ],
      isPopular: false
    },
    {
      name: "Pro",
      price: "79",
      description: "Ideal for affiliate marketers and growing brands",
      features: [
        "25 listicle sites",
        "50+ conversion templates",
        "Advanced SEO & schema markup",
        "Full affiliate network integration",
        "Custom domain support",
        "Advanced analytics & A/B testing",
        "Priority support",
        "Social media automation"
      ],
      excluded: [
        "White-label solution",
        "API access"
      ],
      isPopular: true
    },
    {
      name: "Business",
      price: "199",
      description: "For agencies and enterprise teams",
      features: [
        "Unlimited listicle sites",
        "All premium templates",
        "Enterprise SEO suite",
        "Full affiliate network integration",
        "Custom domain support",
        "Advanced analytics & A/B testing",
        "Priority support",
        "Social media automation",
        "White-label solution",
        "API access",
        "Team collaboration tools"
      ],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Choose your path to <span className="text-violet-600">conversion success</span>
          </h2>
          <p className="text-xl text-gray-600">
            Start driving traffic, engagement, and sales with proven listicle templates. All plans include everything you need to create viral content.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <PricingTier 
              key={index}
              name={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              excluded={tier.excluded}
              isPopular={tier.isPopular}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600">
            Need a custom plan? <a href="#cta" className="text-violet-600 font-medium">Contact us</a> for enterprise pricing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;