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
      content: "Lysticle has transformed the way we create content. Our conversion rates have increased by 43% since we started using their listicle templates.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      content: "The analytics tools are incredible. I can now see exactly which items in my lists are performing well and optimize accordingly.",
      author: "James Wilson",
      role: "Content Creator",
      company: "StyleBlog",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      content: "As a non-technical person, I was amazed at how easy it was to create beautiful, SEO-optimized listicles that actually convert.",
      author: "Emily Chen",
      role: "Founder",
      company: "BeautyEssentials",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const clientLogos = [
    {
      name: "Google",
      url: "https://images.pexels.com/photos/5063385/pexels-photo-5063385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Gmail",
      url: "https://images.pexels.com/photos/5833772/pexels-photo-5833772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Facebook",
      url: "https://images.pexels.com/photos/5063440/pexels-photo-5063440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Twitter",
      url: "https://images.pexels.com/photos/5063474/pexels-photo-5063474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
            Loved by content creators <span className="text-violet-600">worldwide</span>
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers are saying about how Lysticle has transformed their content strategy.
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
        
        {/* <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
            {clientLogos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo.url}
                alt={`${logo.name} logo`}
                className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default TestimonialSection;