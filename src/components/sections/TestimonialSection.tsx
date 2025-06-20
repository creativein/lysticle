import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  company: string;
  image: string;
  delay: number;
}

const TestimonialCard = ({ content, author, role, company, image, delay }: TestimonialProps) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} fill="currentColor" />
        ))}
      </div>
      <p className="text-gray-700 mb-6">{content}</p>
      <div className="flex items-center">
        <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4 object-cover" />
        <div>
          <h4 className="font-bold text-gray-900">{author}</h4>
          <p className="text-gray-600 text-sm">{role}, {company}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    {
      content: "Our traffic increased 28.5% after switching to Lysticle's SEO-optimized templates. The built-in affiliate integration helped us triple our revenue from content marketing.",
      author: "Sarah Johnson",
      role: "Content Marketing Manager",
      company: "GrowthHackers",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      content: "The analytics dashboard is a game-changer. I can see exactly which products in my listicles are driving clicks and conversions. My affiliate commissions have doubled!",
      author: "James Wilson",
      role: "Affiliate Marketer",
      company: "TechReviews Pro",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      content: "Lysticle's viral templates helped my beauty product roundups go viral on Pinterest and Instagram. One listicle generated 50K+ social shares and $12K in sales!",
      author: "Emily Chen",
      role: "Beauty Blogger",
      company: "GlowUp Beauty",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Join thousands driving <span className="text-violet-600">real results</span>
          </h2>
          <p className="text-xl text-gray-600">
            See how affiliate marketers, content creators, and brands are turning clicks into conversions with Lysticle.com.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              image={testimonial.image}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;