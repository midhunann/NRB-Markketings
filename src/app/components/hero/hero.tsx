"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { useInView } from 'framer-motion';

interface HeroProps {
  /**
   * Main headline displayed in the hero section
   */
  headline: string;
  /**
   * Subheading text displayed below the headline
   */
  subheading: string;
  /**
   * Additional descriptive text for the hero section
   */
  description: string;
  /**
   * URL for the background image
   * @default "/images/hero-background.jpg"
   */
  backgroundImage?: string;
  /**
   * Primary CTA button text
   * @default "Explore Products"
   */
  primaryButtonText?: string;
  /**
   * Primary CTA button URL
   * @default "/products"
   */
  primaryButtonUrl?: string;
  /**
   * Secondary CTA button text
   * @default "Contact Us"
   */
  secondaryButtonText?: string;
  /**
   * Secondary CTA button URL
   * @default "/contact"
   */
  secondaryButtonUrl?: string;
}

/**
 * Hero component for the homepage
 * 
 * Features:
 * - Full-viewport background with optimized image loading
 * - Animated content entrance with Framer Motion
 * - Responsive text sizing across all breakpoints
 * - Accessible semantic structure and keyboard navigation
 * - Gradient overlay for improved text readability
 */
export const Hero: React.FC<HeroProps> = ({
  headline,
  subheading,
  description,
  backgroundImage = "/images/hero-background.jpg",
  primaryButtonText = "Explore Products",
  primaryButtonUrl = "/products",
  secondaryButtonText = "Contact Us",
  secondaryButtonUrl = "/contact"
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Welcome to NRB Markketings"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder div for where the image will be */}
        <div className="w-full h-full bg-primary/80" aria-hidden="true">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREjFBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/80"
        aria-hidden="true"
      ></div>

      {/* Content Container */}
      <div className="container relative z-20 mx-auto px-4 text-primary-foreground">
        <motion.div 
          className="max-w-3xl"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Headline */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            variants={itemVariants}
          >
            {headline}
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            className="text-xl md:text-2xl mb-6 text-primary-foreground/90 font-light"
            variants={itemVariants}
          >
            {subheading}
          </motion.p>
          
          {/* Description */}
          <motion.p 
            className="text-base md:text-lg mb-8 max-w-2xl text-primary-foreground/80"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          
          {/* Call-to-Action Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-8"
            variants={itemVariants}
          >
            <Link href={primaryButtonUrl}>
              <Button 
                size="lg" 
                variant="secondary"
                className="transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:outline-none"
              >
                {primaryButtonText}
              </Button>
            </Link>
            
            <Link href={secondaryButtonUrl}>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none"
              >
                {secondaryButtonText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements - Animated Accent Lines */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-secondary"></div>
        <div className="absolute bottom-0 left-1/3 w-1/6 h-2 bg-secondary/80"></div>
      </motion.div>
    </section>
  );
};

export default Hero;