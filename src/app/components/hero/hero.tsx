"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
      className="relative w-full h-screen flex items-center justify-center"
      aria-label="Welcome to NRB Marketings"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden bg-[var(--primary)]">
        <Image
          src="/images/hero-background-2.png"
          alt="NRB Marketings background"
          fill
          priority
          className="object-cover w-full h-full"
        />
        {/* Dark overlay with primary color */}
        <div className="absolute inset-0 bg-[var(--primary)] opacity-40"></div>
      </div>
      
      {/* Content Container - Centered with proper vertical alignment */}
      <div className="container relative z-10 mx-auto px-4 w-full max-w-6xl flex items-center justify-center h-full">
        <motion.div 
          className="flex flex-col items-center justify-center mx-auto text-center transform -translate-y-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Headline - Added whitespace-nowrap and overflow handling */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--nude)] whitespace-nowrap overflow-visible w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {headline}
          </motion.h1>
          
          {/* Subheadline - Added whitespace-nowrap and overflow handling */}
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-[var(--nude)]/90 whitespace-nowrap overflow-visible w-full"
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
                className="bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-md px-8 py-4 hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-lg"
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