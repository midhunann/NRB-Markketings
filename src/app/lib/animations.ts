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
    },
    offscreen: { opacity: 0 },
    onscreen: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  });
  
  /**
   * Scroll animation utilities for Framer Motion's whileInView
   */
  export const scrollFadeIn = {
    offscreen: { opacity: 0, y: 30 },
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
   * Button hover and tap effects
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
  
  /**
   * Card hover effects
   */
  export const cardHover = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };
  
  /**
   * Animation for staggered grid items
   */
  export const gridItem = (index: number) => ({
    offscreen: { 
      opacity: 0, 
      y: 20 
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  });
  
  /**
   * Animation for ripple effect
   */
  export const rippleEffect = {
    initial: { 
      width: 0,
      height: 0,
      opacity: 0.5 
    },
    animate: { 
      width: 200,
      height: 200,
      opacity: 0,
      transition: {
        duration: 0.8
      }
    }
  };