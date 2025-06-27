import { useState, useEffect } from 'react';

interface UseResponsiveAnimationReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export const useResponsiveAnimation = (): UseResponsiveAnimationReturn => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    const checkMotionPreference = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    // Initial check
    updateScreenSize();
    checkMotionPreference();

    // Event listeners
    window.addEventListener('resize', updateScreenSize);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkMotionPreference);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateScreenSize);
      motionQuery.removeEventListener('change', checkMotionPreference);
    };
  }, []);

  return {
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    prefersReducedMotion,
    screenSize,
  };
};

// Animation configuration based on screen size
export const getResponsiveAnimationConfig = (
  screenSize: 'mobile' | 'tablet' | 'desktop',
  prefersReducedMotion: boolean
) => {
  if (prefersReducedMotion) {
    return {
      duration: 0,
      stiffness: 0,
      damping: 0,
      reduce: true,
    };
  }

  switch (screenSize) {
    case 'mobile':
      return {
        duration: 0.3,
        stiffness: 400,
        damping: 25,
        reduce: false,
      };
    case 'tablet':
      return {
        duration: 0.4,
        stiffness: 350,
        damping: 22,
        reduce: false,
      };
    case 'desktop':
    default:
      return {
        duration: 0.5,
        stiffness: 300,
        damping: 20,
        reduce: false,
      };
  }
};

// Touch-friendly interaction detection
export const useTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-expect-error - Legacy IE property
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  return isTouch;
};
