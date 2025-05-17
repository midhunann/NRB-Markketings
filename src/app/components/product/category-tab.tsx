'use client';

import { motion } from "framer-motion";
import { Monitor, Beaker, Wrench, Droplets, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { ProductCategory } from "@/app/lib/data";
import { scrollToCategory } from "@/app/lib/tab-utils";

interface CategoryTabProps {
  category: ProductCategory;
  isActive: boolean;
  index: number;
  onSelect: (index: number) => void;
}

// Map of icon names to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  "Monitor": Monitor,
  "Flask": Beaker,
  "PipelineIcon": Wrench,
  "Droplets": Droplets,
};

export default function CategoryTab({ 
  category, 
  isActive, 
  index, 
  onSelect 
}: CategoryTabProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the correct icon component
  const IconComponent = ICON_MAP[category.icon] || Monitor;
  
  return (
    <motion.button
      role="tab"
      id={`tab-${category.slug}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${category.slug}`}
      tabIndex={isActive ? 0 : -1}
      className={`
        relative flex items-center gap-2 whitespace-nowrap px-4 py-3 
        transition-all outline-none
        bg-[var(--primary)] rounded-t-md
        ${isActive 
          ? "text-[var(--secondary)] font-medium" 
          : "text-[var(--nude)] hover:text-[var(--secondary)]"
        }
        focus-visible:ring-2 focus-visible:ring-[var(--nude)] focus-visible:ring-offset-2
      `}
      onClick={() => {
        onSelect(index);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
    >
      <motion.span
        animate={{ 
          scale: isHovered || isActive ? 1.1 : 1,
          rotate: isHovered ? 5 : 0
        }}
        className="text-[var(--secondary)]"
      >
        <IconComponent size={18} />
      </motion.span>
      
      <span className="relative z-10 text-sm md:text-base">{category.name}</span>
      
      {isActive && (
        <motion.div
          className="absolute inset-0 border-b-2 border-[var(--secondary)]"
          layoutId="activeTabBackground"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      )}
    </motion.button>
  );
}

export function CategoryTabsDrawer({
  categories,
  activeTabIndex,
  setActiveTabIndex,
}: {
  categories: ProductCategory[];
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="md:hidden w-full bg-[var(--primary)]">
      <motion.button
        className="flex items-center justify-between w-full px-4 py-3 bg-[var(--primary)] text-[var(--secondary)] rounded-none border-none"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          {(() => {
            const category = categories[activeTabIndex];
            const IconComponent = ICON_MAP[category.icon] || Monitor;
            return (
              <>
                <IconComponent size={18} className="text-[var(--secondary)]" />
                <span>{category.name}</span>
              </>
            );
          })()}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
      
      {isOpen && (
        <motion.div
          className="absolute mt-0 bg-[var(--primary)] border-none rounded-none shadow-lg overflow-hidden z-50 w-full left-0 right-0"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 max-h-60 overflow-y-auto">
            {categories.map((category, idx) => {
              const IconComponent = ICON_MAP[category.icon] || Monitor;
              return (
                <motion.button
                  key={category.id}
                  className={`flex items-center gap-2 w-full text-left px-4 py-3 
                    ${activeTabIndex === idx 
                      ? "text-[var(--secondary)] border-l-4 border-[var(--secondary)]" 
                      : "text-[var(--nude)] hover:text-[var(--secondary)]"
                    }`}
                  onClick={() => {
                    setActiveTabIndex(idx);
                    scrollToCategory(category.slug);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: "var(--primary)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent size={18} />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}