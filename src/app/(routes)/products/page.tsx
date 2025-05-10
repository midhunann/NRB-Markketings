'use client';

// import { Metadata } from 'next';
import { productCategories } from '@/app/lib/data';
import ProductCard from '@/app/components/product/product-card';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { staggerContainer, scrollFadeIn } from '@/app/lib/animations';
import CategoryTab, { CategoryTabsDrawer } from '@/app/components/product/category-tab';
import { useRef, useState, KeyboardEvent } from 'react';
import { handleTabKeyDown, getActiveTabFromScroll } from '@/app/lib/tab-utils';

export default function ProductsPage() {
  // State for tab navigation
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Scroll-spy: Update active tab based on scroll position
  useMotionValueEvent(scrollY, "change", () => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const newActiveTab = getActiveTabFromScroll(productCategories);
      if (newActiveTab !== activeTabIndex) {
        setActiveTabIndex(newActiveTab);
        
        // Scroll tab into view if necessary
        if (tabsContainerRef.current) {
          const tabElement = tabsContainerRef.current.children[newActiveTab] as HTMLElement;
          if (tabElement) {
            const container = tabsContainerRef.current;
            const scrollLeft = container.scrollLeft;
            const containerWidth = container.clientWidth;
            
            const tabLeft = tabElement.offsetLeft;
            const tabWidth = tabElement.clientWidth;
            
            // Check if tab is not fully visible
            if (tabLeft < scrollLeft || tabLeft + tabWidth > scrollLeft + containerWidth) {
              // Scroll to make tab visible
              container.scrollTo({
                left: tabLeft - containerWidth / 2 + tabWidth / 2,
                behavior: 'smooth'
              });
            }
          }
        }
      }
    }
  });
  
  // Handle keyboard navigation in tab list
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    handleTabKeyDown(e, activeTabIndex, productCategories.length, setActiveTabIndex);
  };

  // Function to scroll to selected category
  const scrollToSelectedCategory = (index: number) => {
    const section = document.getElementById(`tabpanel-${productCategories[index].slug}`);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Products & Services</h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our wide range of high-quality products and services designed for government departments and businesses.
        </p>
      </motion.div>

      {/* Category Tabs - Horizontal scrollable on desktop/tablet */}
      <motion.div 
        className="sticky top-16 z-20 bg-background/90 backdrop-blur-sm py-3 mb-8 border-b"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Tab List for Desktop/Tablet */}
        <div 
          className="hidden md:flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          ref={tabsContainerRef}
          role="tablist"
          aria-label="Product Categories"
          onKeyDown={handleKeyDown}
        >
          {productCategories.map((category, index) => (
            <div key={category.id} className="snap-start">
              <CategoryTab
                category={category}
                isActive={activeTabIndex === index}
                index={index}
                onSelect={(index) => {
                  setActiveTabIndex(index);
                  scrollToSelectedCategory(index);
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Drawer/Bottom Sheet for Mobile */}
        <CategoryTabsDrawer 
          categories={productCategories}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={(index) => {
            setActiveTabIndex(index);
            scrollToSelectedCategory(index);
          }}
        />
      </motion.div>

      {/* Product Categories Sections */}
      <div className="space-y-20">
        {productCategories.map((category) => (
          <section 
            key={category.id} 
            className="scroll-mt-32"
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
              <h2 className="text-2xl md:text-3xl font-bold mb-3 border-b pb-2">{category.name}</h2>
              <p className="text-base md:text-lg mb-6 text-muted-foreground">{category.description}</p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
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
        className="mt-20 bg-primary/5 border border-primary/20 rounded-lg p-6 md:p-8 text-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeIn}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4">Need Custom Solutions?</h2>
        <p className="mb-6">
          Don&apos;t see what you&apos;re looking for? We offer customized solutions for government departments and businesses.
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          aria-label="Contact for custom requirements"
        >
          Contact for Custom Requirements
        </a>
      </motion.div>
    </div>
  );
}