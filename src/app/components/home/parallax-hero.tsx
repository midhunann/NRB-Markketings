"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/app/components/ui/button";

interface SlideProps {
  background: string;
  headline: string;
  subheadline: string;
  buttonText: string;
  buttonUrl: string;
}

interface ParallaxHeroProps {
  slides?: SlideProps[];
}

export default function ParallaxHero({ 
  slides = [
    {
      background: "/images/hero-background-2.png",
      headline: "Turning Government Surplus into Your Advantage",
      subheadline: "Quality assets, delivered nationwide.",
      buttonText: "Request a Quote",
      buttonUrl: "/contact"
    }
  ] 
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [touchStartY, setTouchStartY] = useState(0);
  
  // Automatic slide progression with a pause when user interacts
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplayEnabled, slides.length]);
  
  // Reset autoplay when user stops interacting
  useEffect(() => {
    const resumeAutoplay = () => {
      setAutoplayEnabled(true);
    };
    
    // Resume autoplay after user inactivity (5s)
    const inactivityTimer = setTimeout(resumeAutoplay, 5000);
    
    return () => clearTimeout(inactivityTimer);
  }, [currentSlideIndex]);
  
  // Manual slide navigation with wheel and touch events
  useEffect(() => {
    // Debounce function to prevent multiple rapid slide changes
    let wheelDebounceTimer: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      // Only hijack wheel events inside the hero section
      if (!containerRef.current?.contains(e.target as Node)) return;
      
      clearTimeout(wheelDebounceTimer);
      wheelDebounceTimer = setTimeout(() => {
        if (e.deltaY > 10) {
          setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
          setAutoplayEnabled(false);
        } else if (e.deltaY < -10) {
          setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
          setAutoplayEnabled(false);
        }
      }, 50);
    };
    
    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return;
      setTouchStartY(e.touches[0].clientY);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return;
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      // Use a threshold to prevent accidental slides
      if (Math.abs(diff) < 30) return;
      
      if (diff > 30) {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
        setAutoplayEnabled(false);
        setTouchStartY(touchEndY); // Reset to prevent multiple triggers
      } else if (diff < -30) {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
        setAutoplayEnabled(false);
        setTouchStartY(touchEndY); // Reset to prevent multiple triggers
      }
    };
    
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(wheelDebounceTimer);
    };
  }, [slides.length, touchStartY]);
  
  // Parallax effect for background images
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[var(--primary)]"
      aria-roledescription="banner"
    >
      {/* Background images with parallax effect */}
      {slides.map((slide, index) => {
        return (
          <motion.div
            key={`slide-bg-${index}`}
            className="absolute inset-0 h-screen"
            animate={{ 
              opacity: currentSlideIndex === index ? 1 : 0,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            style={{ zIndex: slides.length - index }} // Fix z-index stacking
            aria-hidden={currentSlideIndex !== index}
          >
            <div className="relative w-full h-full">
              <motion.div
                style={{ 
                  y: backgroundY, 
                  height: "120%", 
                  width: "100%", 
                  position: "absolute", 
                  top: "-10%" // Start slightly above for smoother parallax
                }}
                className="will-change-transform"
              >
                <Image
                  src={slide.background}
                  alt={`Background for ${slide.headline}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                  quality={90}
                />
              </motion.div>
              {/* Dark overlay with primary color */}
              <div className="absolute inset-0 bg-[var(--primary)] opacity-50"></div>
            </div>
          </motion.div>
        );
      })}
      
      {/* Content layers */}
      <div className="relative z-30 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 w-full max-w-6xl">
          {slides.map((slide, index) => {
            return (
              <motion.div
                key={`slide-content-${index}`}
                className="w-full mx-auto text-center"
                initial={false}
                animate={{ 
                  opacity: currentSlideIndex === index ? 1 : 0,
                  y: currentSlideIndex === index ? 0 : 20,
                  transition: { 
                    duration: 0.8, 
                    ease: "easeOut"
                  }
                }}
                style={{
                  display: currentSlideIndex === index ? "block" : "none",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "100%"
                }}
                aria-hidden={currentSlideIndex !== index}
              >
                {/* Headline */}
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--nude)] mx-auto max-w-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlideIndex === index ? 1 : 0,
                    y: currentSlideIndex === index ? 0 : 20
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {slide.headline}
                </motion.h1>
                
                {/* Subheadline */}
                <motion.p
                  className="text-xl md:text-2xl mb-10 text-[var(--nude)]/90 mx-auto max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlideIndex === index ? 1 : 0,
                    y: currentSlideIndex === index ? 0 : 20
                  }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {slide.subheadline}
                </motion.p>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlideIndex === index ? 1 : 0,
                    y: currentSlideIndex === index ? 0 : 20
                  }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="inline-block"
                >
                  <Link href={slide.buttonUrl}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-md px-8 py-6 hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-all duration-300 font-medium shadow-lg text-lg"
                      >
                        {slide.buttonText}
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Slide navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={`slide-nav-${index}`}
            className={`h-3 transition-all duration-300 rounded-full ${
              index === currentSlideIndex 
                ? 'bg-[var(--secondary)] w-8' 
                : 'bg-[var(--nude)]/40 w-3'
            }`}
            onClick={() => {
              setCurrentSlideIndex(index);
              setAutoplayEnabled(false);
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlideIndex ? "true" : "false"}
          />
        ))}
      </div>
      
      {/* Scroll indicator with improved animation */}
      <motion.div 
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[var(--nude)]/80 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-sm mb-2">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-[var(--nude)]/60 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 bg-[var(--nude)]/60 rounded-full"
            initial={{ height: "20%" }}
            animate={{ 
              height: ["20%", "60%", "20%"],
              y: [0, 4, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
      
      {/* Keyboard controls - hidden but accessible */}
      <div className="sr-only">
        <button 
          onClick={() => {
            setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
            setAutoplayEnabled(false);
          }}
          aria-label="Previous slide"
        >
          Previous slide
        </button>
        <button 
          onClick={() => {
            setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
            setAutoplayEnabled(false);
          }}
          aria-label="Next slide"
        >
          Next slide
        </button>
      </div>
      
      {/* Add swipe indicator for mobile */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
        <motion.div
          className="flex items-center text-xs text-[var(--nude)]/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            repeat: 3,
            repeatDelay: 3,
            duration: 1.5,
            delay: 2
          }}
        >
          <motion.span
            animate={{ x: [-5, 5, -5] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            ⟵
          </motion.span>
          <span className="mx-2">Swipe to navigate</span>
          <motion.span
            animate={{ x: [5, -5, 5] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            ⟶
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}