import { ProductItem } from '@/app/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: ProductItem;
  category: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="w-full aspect-square bg-muted flex items-center justify-center">
        {product.image ? (
          <Image 
            src={product.image || '/placeholder.png'} 
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="text-6xl text-muted-foreground/30">
            {product.name.substring(0, 1)}
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg truncate">{product.name}</CardTitle>
        {product.packSize && (
          <CardDescription>Pack Size: {product.packSize}</CardDescription>
        )}
      </CardHeader>
      
      {product.description && (
        <CardContent className="py-2">
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </CardContent>
      )}
      
      <CardFooter className="mt-auto pt-4">
        <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="w-full">
          <Button variant="outline" className="w-full">
            Enquire
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}