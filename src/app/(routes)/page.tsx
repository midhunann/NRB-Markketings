"use client";

import Link from 'next/link';
import { companyInfo, features, productCategories } from '../lib/data';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Hero } from '@/app/components/hero/hero'; 
import { motion } from 'framer-motion';

export default function Home() {
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Using our new component */}
      <Hero 
        headline="Leading Supplier for Government Departments"
        subheading={companyInfo.tagline}
        description={companyInfo.aboutShort}
        primaryButtonText="Explore Products"
        primaryButtonUrl="/products"
        secondaryButtonText="Contact Us"
        secondaryButtonUrl="/contact"
      />

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Product Categories</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
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
                <motion.div key={category.id} variants={fadeInUp}>
                <Link href={`/products#${category.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden border border-border/50">
                    <CardHeader className="relative">
                      <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500"></div>
                      <CardTitle className="group-hover:translate-x-1 transition-transform duration-300">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground flex justify-between items-center">
                      <span>{category.items.length} products</span>
                      <span className="text-primary opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
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
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Us</h2>
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
              >
                <div className="bg-background p-8 rounded-lg shadow-sm flex flex-col h-full border border-border/50 hover:shadow-md transition-all duration-300">
                  <div className="mb-4 text-primary">
                    {/* You can add icons here later if needed */}
                    <div className="w-12 h-1 bg-secondary mb-4"></div>
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
      <section className="py-20 bg-secondary relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary-foreground">Ready to Partner With Us?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-secondary-foreground/90">
            With over 15 years of experience serving government departments, we are committed to delivering excellence in every product.
          </p>
          <Link href="/contact">
            <Button 
              size="lg" 
              variant="default" 
              className="bg-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get in Touch
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}