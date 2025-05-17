"use client";

import Link from 'next/link';
import { features, productCategories } from '../lib/data';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Hero } from '@/app/components/hero/hero';
import { ServiceCarousel } from '@/app/components/home/service-carousel';
import { motion } from 'framer-motion';

export default function Home() {
  // Animation variants
  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section with full-viewport height */}
      <Hero 
      headline="Empowering Tomorrow’s Infrastructure Today"
      subheadline="Premium government‑surplus assets & industrial essentials—reliably sourced, expertly delivered."
      buttonText="Browse Catalog"
      buttonUrl="/products"
      />
      
      {/* Service Areas Carousel */}
      <ServiceCarousel />
      
      {/* Company Introduction */}
      <section className="py-20 bg-[#c9c1b1]">
      <div className="container mx-auto px-4">
        <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center md:text-left"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        >
        {/* Left column: Company info */}
        <motion.div className="space-y-5" variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-[var(--primary)]">Who We Are</h2>
          <div className="w-16 h-1 bg-[var(--secondary)] mx-auto md:mx-0"></div>
          <p className="text-lg text-gray-700">
          For years, NRB Markketings has bridged government auctions and industry needs—transforming surplus assets into cost‑smart solutions for public departments.
          </p>
          <p className="text-lg text-gray-700">
          From state‑of‑the‑art electronics and durable plumbing supplies to eco‑friendly PSDAS controls and premium seafood, we deliver unmatched quality and service.
          </p>
        </motion.div>
        
        {/* Right column: Link to About page */}
        <motion.div 
          className="flex flex-col items-center md:items-start justify-center space-y-6 md:pl-12"
          variants={fadeInUp}
        >
          <p className="text-lg text-gray-700">
          Our extensive product range and commitment to quality have made us the preferred choice for government departments 
          across Tamil Nadu.
          </p>
          <motion.div
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
          >
          <Link 
            href="/about"
            className="inline-flex items-center text-lg font-medium text-[var(--primary)] underline underline-offset-4 transition-colors duration-300 group"
          >
            Learn more about our company
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
          </motion.div>
        </motion.div>
        </motion.div>
      </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-[var(--nude)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-8 text-center"
          >
            <h2 className="text-[var(--primary)] text-3xl md:text-4xl font-bold mb-4">Explore Our Solutions</h2>
            <p className="text-center text-[var(--primary)]/80 max-w-2xl mx-auto">
              Dive into our diverse range—from precision electronics to large‑scale water‑management systems—crafted for institutional performance.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {productCategories.map((category) => (
              <motion.div 
                key={category.id} 
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link href={`/products#${category.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden border border-border/50 bg-[var(--primary)] text-[var(--secondary)] hover:bg-[var(--primary)]/90 flex flex-col">
                    <CardHeader className="relative py-1">
                      <div className="absolute top-0 left-0 w-1 h-0 bg-[var(--secondary)] group-hover:h-full transition-all duration-500"></div>
                      <CardTitle className="text-base group-hover:translate-x-1 transition-transform duration-300 h-6">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-1 flex-grow">
                      <CardDescription className="text-[var(--nude)]/90 text-sm line-clamp-2 min-h-[40px]">{category.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="text-xs text-[var(--nude)]/80 py-2 flex justify-between items-center h-8">
                      <span>{category.items.length} products</span>
                      <span className="opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        View →
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-8 bg-[#c9c1b1]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-[var(--primary)] text-3xl font-bold mb-2">Your Trusted Partner</h2>
            <p className="text-[var(--primary)] max-w-2xl mx-auto text-sm">
              Proven excellence in procurement, quality control, and pan‑India delivery—backed by a 100% satisfaction guarantee.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature) => (
              <motion.div 
                key={feature.title}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <div className="bg-[var(--nude)] p-6 rounded-lg border border-border/50 h-full hover:shadow-md transition-all duration-300">
                  <div className="w-8 h-0.5 bg-[var(--secondary)] mb-3" />
                  <h3 className="text-[var(--primary)] text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-[var(--primary)] text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 bg-[var(--secondary)] relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Pattern Background - Preloaded SVG for better performance */}
        <div 
          className="absolute inset-0 opacity-20 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.30'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
          aria-hidden="true"
        />
        
        <div 
          className="container relative z-10 mx-auto px-4 md:px-8 max-w-4xl text-center"
        >
          <motion.div 
            className="rounded-3xl bg-[var(--secondary)]/90 backdrop-blur-sm p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 id="cta-heading" className="sr-only">Get a Quote</h2>
            <p className="mb-6 text-lg md:text-xl text-[var(--primary)]/90 font-medium">
              Start your next project with confidence—partner with India&apos;s leading government‑surplus dealer.
            </p>

            <Link 
              href="/contact"
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  variant="default" 
                  className="bg-[var(--primary)] text-[var(--nude)] hover:bg-[var(--primary)]/90 transition-all duration-300 px-8 py-4 text-lg md:text-xl rounded-xl shadow-md hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    <span className="group-hover:hidden">Get Your Free Quote Today</span>
                    <span className="hidden group-hover:inline">Request a Quote →</span>
                  </span>
                  <span 
                    className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/80 to-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  ></span>
                </Button>
              </motion.div>
            </Link>
            
            <p className="mt-4 text-sm text-[var(--primary)]/70">
              No obligations. Typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}