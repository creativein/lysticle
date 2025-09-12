import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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

        <div className="mb-6 flex flex-col items-center">
          <div className="flex items-center justify-center">
            <div className="relative">
              <span className="text-4xl font-bold text-gray-300 mr-2">${price}</span>
              <div className="absolute top-1/2 left-0 right-0 border-t-2 border-red-500 transform -rotate-12"></div>
            </div>
            <span className="text-gray-300 ml-2">/month</span>
          </div>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ 
              scale: 1,
              boxShadow: [
                "0 0 0 0 rgba(124, 58, 237, 0)",
                "0 0 0 10px rgba(124, 58, 237, 0.1)",
                "0 0 0 20px rgba(124, 58, 237, 0)",
              ]
            }}
            transition={{ 
              scale: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            className="mt-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-full font-semibold inline-block shadow-lg">
              Free Until December 2025
            </span>
          </motion.div>
          <span className="mt-3 text-sm text-gray-500">No credit card required</span>
        </div>

        <Button variant={isPopular ? 'primary' : 'outline'} fullWidth onClick={() => navigate('/onboard')}>
          Get Started For Free
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
      name: "Starter",
      price: "29",
      description: "Perfect for bloggers and content creators",
      features: [
        "Up to 50,000 monthly visitors",
        "10 Active advertisers",
        "5 Content categories",
        "Basic SEO optimization",
        "Social sharing integration",
        "Real-time analytics dashboard",
        "Email support",
        "5 Premium templates",
        "Community access"
      ],
      excluded: [
        "Custom domain support",
        "Advanced SEO tools",
        "Priority support",
        "White-label solution",
        "API access",
        "Team collaboration"
      ],
      isPopular: false
    },
    {
      name: "Professional",
      price: "79",
      description: "Scale your affiliate marketing business",
      features: [
        "Unlimited monthly visitors",
        "30 Active advertisers",
        "Unlimited categories",
        "Advanced SEO & schema markup",
        "Social media automation",
        "Advanced analytics suite",
        "Priority support",
        "All premium templates",
        "Custom domain support",
        "No Lystical branding",
        "A/B testing tools"
      ],
      excluded: [
        "White-label solution",
        "API access",
        "Team collaboration"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "199",
      description: "Complete solution for agencies and teams",
      features: [
        "Unlimited listicle sites",
        "Unlimited advertisers",
        "Enterprise SEO suite",
        "Full affiliate API access",
        "White-label solution",
        "Team collaboration tools",
        "Custom integrations",
        "Dedicated success manager",
        "SLA support guarantee",
        "Advanced security features",
        "Custom reporting"
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
            Simple, transparent <span className="text-violet-600">pricing</span>
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your needs. Upgrade or downgrade anytime, no contracts required.
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