'use client';

import { productCategories } from '@/app/lib/data';
import ProductCard from '@/app/components/product/product-card';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { staggerContainer, scrollFadeIn } from '@/app/lib/animations';
import CategoryTab, { CategoryTabsDrawer } from '@/app/components/product/category-tab';
import { useRef, useState, KeyboardEvent, useEffect } from 'react';
import { handleTabKeyDown, getActiveTabFromScroll } from '@/app/lib/tab-utils';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// Custom CSS variables for brand colors
const brandColors = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  muted: 'var(--muted)',
};

export default function ProductsPage() {
  // State for tab navigation
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  // Effect to center active tab on initial load and handle hash URL
  useEffect(() => {
    if (tabsContainerRef.current && activeTabIndex > 0) {
      centerActiveTab(activeTabIndex);
    }

    // Handle hash URL on page load
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const categoryIndex = productCategories.findIndex(cat => cat.slug === hash);
        if (categoryIndex !== -1) {
          // Set the active tab based on the hash
          setActiveTabIndex(categoryIndex);
          // Scroll to the section with a slight delay to ensure elements are rendered
          setTimeout(() => {
            scrollToSelectedCategory(categoryIndex);
          }, 100);
        }
      }
    }
  }, []);

  // Handle scroll events to update UI
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Update header sticky state based on scroll position
    setIsScrolled(latest > 10);

    // Only run on client side
    if (typeof window !== 'undefined') {
      const newActiveTab = getActiveTabFromScroll(productCategories);
      if (newActiveTab !== activeTabIndex) {
        setActiveTabIndex(newActiveTab);
        centerActiveTab(newActiveTab);
        
        // Update URL hash without scrolling (to prevent infinite loop)
        const newHash = `#${productCategories[newActiveTab].slug}`;
        window.history.replaceState(null, '', `${pathname}${newHash}`);
      }
    }
  });

  // Function to center the active tab in the scrollable container
  const centerActiveTab = (index: number) => {
    if (tabsContainerRef.current) {
      const tabElement = tabsContainerRef.current.children[index] as HTMLElement;
      if (tabElement) {
        const container = tabsContainerRef.current;
        const containerWidth = container.clientWidth;
        const tabLeft = tabElement.offsetLeft;
        const tabWidth = tabElement.clientWidth;

        // Scroll to center the tab
        container.scrollTo({
          left: tabLeft - containerWidth / 2 + tabWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle keyboard navigation in tab list
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    handleTabKeyDown(e, activeTabIndex, productCategories.length, setActiveTabIndex);
  };

  // Function to scroll to selected category with offset for sticky header
  const scrollToSelectedCategory = (index: number) => {
    const section = document.getElementById(`tabpanel-${productCategories[index].slug}`);
    if (section) {
      // Calculate offset to account for BOTH main navbar and product navbar
      const mainNavbarHeight = 25; // Height of your main site navbar
      const productTabsHeight = 60; // Height of the product tabs

      // Add extra padding to ensure the heading is clearly visible
      const extraPadding = 10;
      const totalOffset = mainNavbarHeight + productTabsHeight + extraPadding;
      
      const yOffset = -totalOffset;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // Function to handle tab selection
  const handleTabSelect = (index: number) => {
    setActiveTabIndex(index);
    scrollToSelectedCategory(index);
    
    // Update URL hash
    const categorySlug = productCategories[index].slug;
    router.push(`${pathname}#${categorySlug}`, { scroll: false });
  };

  return (
  <div className="min-h-screen bg-[var(--nude)]">
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-[var(--primary)] text-3xl md:text-4xl font-bold mb-4">
          Our Products & Services
        </h1>
        <p className="text-[var(--primary)]  text-base md:text-xl max-w-2xl mx-auto">
          Explore our wide range of high-quality products and services designed for government departments and businesses.
        </p>
      </motion.div>

      {/* Enhanced Category Tabs Navigation with Curved Corners */}
      <motion.div 
        className={`sticky top-0 md:top-[60px] z-20 max-w-screen-xl mx-auto bg-[var(--primary)] shadow-md rounded-b-3xl ${
          isScrolled ? 'border-t border-[var(--primary)]' : ''
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="container mx-auto">
          {/* Tab List for Desktop/Tablet - Modified to center all tabs */}
          <div className="flex justify-center">
            <div 
              className="hidden md:flex overflow-x-auto flex-nowrap justify-center py-3 max-w-full mx-auto scrollbar-hide"
              ref={tabsContainerRef}
              role="tablist"
              aria-label="Product Categories"
              onKeyDown={handleKeyDown}
            >
              {productCategories.map((category, index) => (
                <div key={category.id} className="mx-1">
                  <Link 
                    href={`/products#${category.slug}`} 
                    scroll={false}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabSelect(index);
                    }}
                    className="no-underline"
                  >
                    <CategoryTab
                      category={category}
                      isActive={activeTabIndex === index}
                      index={index}
                      onSelect={handleTabSelect}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Drawer/Bottom Sheet for Mobile */}
        <div className="md:hidden py-2 flex justify-center">
          <CategoryTabsDrawer 
            categories={productCategories}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={handleTabSelect}
          />
        </div>
      </motion.div>

      {/* Product Categories Sections */}
      <div className="space-y-20 mt-10">
        {productCategories.map((category) => (
          <section 
            key={category.id} 
            className="scroll-mt-32 pt-10"
            role="tabpanel"
            id={`tabpanel-${category.slug}`}
            aria-labelledby={`tab-${category.slug}`}
            tabIndex={0}
          >
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={scrollFadeIn}
            >
              <h2 className="text-primary text-2xl md:text-3xl font-bold mb-3 pb-2 pt-4" 
                  style={{ borderBottom: `2px solid ${brandColors.secondary}` }}>
                {category.name}
              </h2>
              <p className="text-base md:text-lg mb-8 text-primary">
                {category.description}
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              variants={staggerContainer(0.1)}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
            >
              {category.items.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={scrollFadeIn}
                  custom={index}
                >
                  <ProductCard 
                    product={{
                      ...product,
                      // Add placeholder image and price range if not provided
                      image: product.image || `/api/placeholder/400/400?text=${encodeURIComponent(product.name.substring(0, 1))}`,
                      price: product.price || `${(Math.floor(Math.random() * 5) + 1) * 1000}-${(Math.floor(Math.random() * 5) + 6) * 1000}`,
                    }} 
                    category={category.slug}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-28 rounded-lg p-8 md:p-10 text-center shadow-md"
        style={{ 
          backgroundColor: `var(--primary)`,
          border: `1px solid ${brandColors.secondary}`
        }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeIn}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--nude)]">
          Need Custom Solutions?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-lg text-[var(--nude)]">
          Don&apos;t see what you&apos;re looking for? We offer customized solutions for government departments and businesses.
        </p>
        <a
          href="/contact" 
          className="inline-block px-8 py-4 rounded-md font-medium btn-hover-effect"
          aria-label="Contact for custom requirements"
          style={{ 
            backgroundColor: brandColors.secondary,
            color: '#000'
          }}
        >
          Contact for Custom Requirements
        </a>
      </motion.div>
    </div>
  </div>
  );
}