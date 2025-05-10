// src/app/lib/animations.ts

/**
 * Common animation variants for consistent animations across components
 */

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  export const slideUp = {
    initial: { opacity: 0, y: 40 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 }
    }
  };
  
  export const staggerContainer = (staggerChildren: number = 0.2, delayChildren: number = 0) => ({
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  });
  
  /**
   * Scroll animation utilities
   */
  export const scrollFadeIn = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        bounce: 0.2,
        duration: 0.8 
      }
    }
  };
  
  /**
   * Button hover effects
   */
  export const buttonHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    tap: { scale: 0.98 }
  };