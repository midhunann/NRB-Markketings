"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface Step {
  title: string;
  description: string;
  image: string;
}

interface ProcessScrollerProps {
  steps?: Step[];
}

export default function ProcessScroller({
  steps = [
    { title: "1. Source Auction", description: "We procure the best assets…", image: "/images/bg-1.png" },
    { title: "2. Quality Check", description: "Rigorous inspection…", image: "/images/bg-2.png" },
    { title: "3. Nationwide Delivery", description: "Safe & on‑time shipping…", image: "/images/bg-3.png" },
    { title: "4. After‑Sales Support", description: "24/7 service desk…", image: "/images/hero-background.jpg" },
  ]
}: ProcessScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  // Create refs for each step
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Setup IntersectionObserver to detect which step is most visible
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setCurrentStepIndex(index);
          }
        });
      },
      { 
        root: null, 
        rootMargin: "-40% 0px -40% 0px", 
        threshold: 0.6 
      }
    );
    
    // Observe all step elements
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  // Animation variants
  const imageVariants = {
    hidden: (isEven: boolean) => ({ 
      x: isEven ? -30 : 30, 
      opacity: 0 
    }),
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };
  
  const textVariants = {
    hidden: (isEven: boolean) => ({ 
      x: isEven ? 30 : -30, 
      opacity: 0 
    }),
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut", 
        delay: 0.2 
      } 
    },
  };
  
  return (
    <div 
      ref={containerRef} 
      className="relative py-20 bg-white"
      id="process"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-[var(--primary)]">
          Our Process
        </h2>
        
        {/* Steps display - now each step sits in its own section */}
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={`process-step-${index}`}
              ref={(el) => { stepRefs.current[index] = el }}
              data-index={index}
              className="scroll-mt-20 mb-24 last:mb-12"
            >
              <motion.div
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={isEven}
              >
                {/* Image */}
                <motion.div 
                  className="w-full md:w-1/2 relative rounded-lg overflow-hidden shadow-lg h-64 md:h-80"
                  variants={imageVariants}
                  custom={isEven}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[var(--primary)]/20"></div>
                </motion.div>
                
                {/* Text content */}
                <motion.div 
                  className="w-full md:w-1/2 text-center md:text-left"
                  variants={textVariants}
                  custom={isEven}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-[var(--primary)]">
                    {step.title}
                  </h3>
                  <div className="w-12 h-1 bg-[var(--secondary)] mb-4 mx-auto md:mx-0"></div>
                  <p className="text-base md:text-lg text-[var(--primary)]/80">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
        
        {/* Progress indicator is now fixed on the side */}
        <div className="fixed top-1/2 -translate-y-1/2 right-4 z-40 hidden lg:flex flex-col gap-3">
          {steps.map((_, index) => (
            <button
              key={`step-indicator-${index}`}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentStepIndex 
                  ? 'h-6 bg-[var(--secondary)]' 
                  : 'bg-[var(--primary)]/30'
              }`}
              onClick={() => {
                const targetElement = stepRefs.current[index];
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                }
              }}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Mobile progress indicator */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {steps.map((_, index) => (
            <button
              key={`step-indicator-mobile-${index}`}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentStepIndex 
                  ? 'w-8 bg-[var(--secondary)]' 
                  : 'bg-[var(--primary)]/30'
              }`}
              onClick={() => {
                const targetElement = stepRefs.current[index];
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                }
              }}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}