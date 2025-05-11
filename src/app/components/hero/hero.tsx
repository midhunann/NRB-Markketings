"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { motion } from 'framer-motion';

interface HeroProps {
  headline?: string;
  subheadline?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  headline = "Welcome to NRB Marketings",
  subheadline = "Your one-stop for Government & Industrial Supplies.",
  buttonText = "Get Started",
  buttonUrl = "/products"
}) => {
  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center bg-[var(--primary)]"
      aria-label="Welcome to NRB Marketings"
    >
      {/* Content Container - Slightly adjusted positioning */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center transform -translate-y-18"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Headline */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {headline}
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subheadline}
          </motion.p>
          
          {/* Call-to-Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href={buttonUrl}>
              <Button 
                className="bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-2xl px-8 py-4 hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-lg"
              >
                {buttonText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;