import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-blue-50 opacity-80" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-300 opacity-10 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-blue-300 opacity-10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-teal-300 opacity-10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #6366F1 1px, transparent 1px),
                           linear-gradient(to bottom, #6366F1 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;