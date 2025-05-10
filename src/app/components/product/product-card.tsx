'use client';

import { ProductItem } from '@/app/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
// import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface ProductCardProps {
  product: ProductItem;
  category: string;
}

export default function ProductCard({ product, category }: ProductCardProps) {
  const [isInStock] = useState(() => Math.random() > 0.2); // 80% chance to be in stock
  
  // Ripple effect for button
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const rippleCounter = React.useRef(0);
  
  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isInStock) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const id = rippleCounter.current;
    rippleCounter.current += 1;
    
    setRipples([...ripples, { x, y, id }]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 10 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden group border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full aspect-square bg-muted overflow-hidden">
          <Image 
            src={product.image || `/api/placeholder/400/400?text=${encodeURIComponent(product.name.substring(0, 1))}`}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {category === 'electronics' && (
            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              Best Seller
            </div>
          )}
        </div>
        
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
          {product.packSize && (
            <CardDescription className="text-sm">Pack Size: {product.packSize}</CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="pb-2">
          {product.description ? (
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              High quality {category} product from NRB Markketings
            </p>
          )}
          
          {product.price && (
            <p className="mt-2 font-medium">
              ₹{product.price}
              {product.packSize && <span className="text-xs text-muted-foreground ml-1">per unit</span>}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="mt-auto pt-2">
          <div className="w-full relative overflow-hidden">
            <Button 
              variant={isInStock ? "default" : "outline"}
              className={`w-full relative ${!isInStock ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md'}`}
              disabled={!isInStock}
              aria-label={isInStock ? `Add ${product.name} to cart` : `${product.name} out of stock`}
              onClick={addRipple}
            >
              {isInStock ? "Add to Cart" : "Out of Stock"}
              
              {/* Ripple effect */}
              {ripples.map(ripple => (
                <span
                  key={ripple.id}
                  className="absolute rounded-full bg-white/30 animate-ripple"
                  style={{
                    top: ripple.y - 50,
                    left: ripple.x - 50,
                    width: '100px',
                    height: '100px',
                  }}
                />
              ))}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}