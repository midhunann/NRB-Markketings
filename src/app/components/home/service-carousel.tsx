"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type ServiceItem = {
  name: string;
  logo: string;
};

const serviceItems: ServiceItem[] = [
  { name: "Central & State Government", logo: "/images/service-area/IFS.png" },
  { name: "Corporation & Municipality", logo: "/images/service-area/PWD.png" },
  { name: "Town Panchayat", logo: "/images/service-area/panchayat.png" },
  { name: "Village Panchayat", logo: "/images/service-area/panchayat.png" },
  { name: "Public Health Department", logo: "/images/service-area/PWD.png" },
  { name: "Tamil Nadu Tourism", logo: "/images/service-area/tamil-nadu.png" },
  { name: "Forest Department", logo: "/images/service-area/PWD.png" },
  { name: "Public Works Department", logo: "/images/service-area/PWD.png" },
  { name: "Tamil Nadu Tourism Department", logo: "/images/service-area/ttdc.png" },
];

export const ServiceCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);  
  // For smooth scrolling effect
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const scroll = () => {
      if (carouselRef.current && !isPaused) {
        const scrollWidth = carouselRef.current.scrollWidth / 2; // Divide by 2 because we duplicated the items
        const scrollLeft = carouselRef.current.scrollLeft;
        
        // If we reach the middle (end of the first set of items), reset to start
        if (scrollLeft >= scrollWidth) {
          carouselRef.current.scrollLeft = 0;
        } else {
          carouselRef.current.scrollLeft += 3; // Slow, very smooth scroll
        }
      }
    };
    
    // Set up interval for auto scroll - slower for smoother appearance
    const interval = setInterval(scroll, 35);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
            <motion.h2 
            className="text-2xl font-bold text-center mb-6 text-[var(--primary)] tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            >
            Explore Our Service Areas
            </motion.h2>
        
        <div className="relative overflow-hidden py-2">
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ 
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none', /* for Internet Explorer */
              scrollbarWidth: 'none', /* for Firefox */
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Duplicate items for smooth infinite effect */}
            {[...serviceItems, ...serviceItems].map((item, index) => (
              <motion.div 
            key={`${item.name}-${index}`} 
            className="flex-none w-56 transition-transform duration-300"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
              >
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 flex flex-col items-center">
                <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-100 rounded-full p-3">
                  <Image
                src={item.logo}
                alt={item.name}
                width={64}
                height={64}
                className="object-contain"
                  />
                </div>
                <h3 className="text-center font-medium text-[var(--primary)] text-sm mt-2">
                  {item.name}
                </h3>
                <div className="w-8 h-1 bg-[var(--secondary)] mt-2 rounded-full"></div>
              </div>
            </div>
              </motion.div>
            ))}
          </div>
          
          {/* Add left and right gradient indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
          </div>
    </section>
  );
};

export default ServiceCarousel;