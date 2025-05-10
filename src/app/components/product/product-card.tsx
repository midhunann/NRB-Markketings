'use client';

import { ProductItem } from '@/app/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

interface ProductCardProps {
  product: ProductItem;
  category: string;
}

export default function ProductCard({ product, category }: ProductCardProps) {
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
          fill={true}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
      </Card>
    </motion.div>
  );
}