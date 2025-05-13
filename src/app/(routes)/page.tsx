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
      headline="Welcome to NRB Marketings"
      subheadline="Your one-stop for Government & Industrial Supplies."
      buttonText="Get Started"
      buttonUrl="/products"
      />
      
      {/* Service Areas Carousel */}
      <ServiceCarousel />
      
      {/* Company Introduction */}
      <section className="py-20 bg-[var(--primary)]/10">
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
          <h2 className="text-3xl font-bold text-[var(--primary)]">About NRB Marketings</h2>
          <div className="w-16 h-1 bg-[var(--secondary)] mx-auto md:mx-0"></div>
          <p className="text-lg text-gray-700">
          NRB Marketings is a leading supplier for government departments and industrial clients across Tamil Nadu. 
          With over 15 years of experience in the industry, we have established ourselves as a trusted partner 
          for quality products and reliable services.
          </p>
          <p className="text-lg text-gray-700">
          We specialize in providing chemicals, electronics, plumbing supplies, PSDAS (Portable Smart Data Acquisition Systems), 
          and even quality seafood to various government departments and organizations.
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
            className="inline-flex items-center text-lg font-medium text-[var(--primary)] hover:text-[var(--secondary)] underline underline-offset-4 transition-colors duration-300 group"
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-[var(--primary)] text-3xl md:text-4xl font-bold mb-4">Our Product Categories</h2>
            <p className="text-center text-[var(--primary)]/80 max-w-2xl mx-auto">
              Explore our extensive range of high-quality products designed for government and institutional needs
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
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden border border-border/50 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    <CardHeader className="relative">
                      <div className="absolute top-0 left-0 w-1 h-0 bg-white group-hover:h-full transition-all duration-500"></div>
                      <CardTitle className="group-hover:translate-x-1 transition-transform duration-300">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/90">{category.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="text-sm text-white/80 flex justify-between items-center">
                      <span>{category.items.length} products</span>
                      <span className="hover:text-white opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
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
      <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mb-12 text-center"
        >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          With over 15 years of excellence, we deliver unparalleled service and quality
        </p>
        </motion.div>
        
        <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        >
        {features.map((feature, index) => (
          <motion.div 
          key={index}
          variants={fadeInUp}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
          <div className="bg-background p-8 rounded-lg shadow-sm flex flex-col h-full border border-border/50 hover:shadow-md transition-all duration-300">
            <div className="mb-4 text-[var(--primary)]">
            <div className="w-12 h-1 bg-[var(--secondary)] mb-4"></div>
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
          </motion.div>
        ))}
        </motion.div>
      </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--secondary)] relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      ></div>
      
      <motion.div 
        className="container relative z-10 mx-auto px-4 text-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--secondary-foreground)]">Ready to Partner With Us?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-[var(--secondary-foreground)]/90">
        With over 15 years of experience serving government departments, we are committed to delivering excellence in every product.
        </p>
        <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        <Link href="/contact">
          <Button 
          size="lg" 
          variant="default" 
          className="bg-[var(--primary)] text-white transition-all duration-300 transform hover:shadow-lg px-8 py-6 text-lg rounded-2xl"
          >
          Get in Touch
          </Button>
        </Link>
        </motion.div>
      </motion.div>
      </section>
    </main>
  );
}