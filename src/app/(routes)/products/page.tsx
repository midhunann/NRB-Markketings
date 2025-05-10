import { productCategories } from '@/app/lib/data';
import ProductCard from '@/app/components/product/product-card';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Products & Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our wide range of high-quality products and services designed for government departments and businesses.
        </p>
      </div>

      {/* Filter Tabs - Simple Version */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2 min-w-full">
          {productCategories.map((category) => (
            <a 
              key={category.id}
              href={`#${category.slug}`}
              className="whitespace-nowrap px-4 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      {/* Product Categories */}
      <div className="space-y-16">
        {productCategories.map((category) => (
          <section key={category.id} id={category.slug} className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">{category.name}</h2>
            <p className="text-lg mb-6 text-muted-foreground">{category.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.items.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  category={category.slug} 
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Custom Solutions?</h2>
        <p className="mb-6">
          Don&apos;t see what you&apos;re looking for? We offer customized solutions for government departments and businesses.
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90"
        >
          Contact for Custom Requirements
        </a>
      </div>
    </div>
  );
}