import { Variants } from 'framer-motion';

// Container animation variants
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade in from bottom animation
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade in from left animation
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade in from right animation
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Stagger animation for children
export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Card hover animation
export const cardHover = {
  scale: 1.02,
  y: -8,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  },
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
};

// Navbar scroll animation
export const navbarScroll = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  transition: {
    duration: 0.3,
    ease: "easeInOut",
  },
};

// Mobile-friendly viewport settings
export const mobileViewport = {
  once: true,
  margin: "-20px",
  amount: 0.3,
};

// Desktop viewport settings
export const desktopViewport = {
  once: true,
  margin: "-50px",
  amount: 0.5,
};

// Responsive animation helper
export const getResponsiveAnimation = (isMobile: boolean): Variants => ({
  hidden: { 
    opacity: 0, 
    y: isMobile ? 20 : 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: isMobile ? 0.4 : 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

// Smooth page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
};

// Loading animation
export const loadingSpinner = {
  animate: {
    rotate: 360,
  },
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear",
  },
};

// Floating animation for decorative elements
export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
