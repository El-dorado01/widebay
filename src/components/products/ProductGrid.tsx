// components/products/ProductGrid.tsx
'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import ProductCard from './ProductCard';
import Link from 'next/link';

type Category = { id: string; name: string };

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
  category: { name: string };
};

type Props = {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
};

export default function ProductGrid({
  products,
  categories,
  selectedCategory,
}: Props) {
  return (
    <div className='space-y-8'>
      {/* Category Filter Tabs - Horizontally Scrollable */}
      <div className='flex justify-center'>
        <Tabs
          value={selectedCategory}
          className='w-full'
        >
          <div className='overflow-x-auto pb-2'>
            {' '}
            {/* Enables horizontal scroll */}
            <TabsList className='inline-flex h-14 rounded-xl bg-muted/50 gap-2 p-1 min-w-max'>
              {/* No grid anymore — natural flex flow */}
              <TabsTrigger
                value='all'
                asChild
              >
                <Link
                  href='/dashboard/products'
                  className='px-6'
                >
                  All
                </Link>
              </TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.name.toLowerCase()}
                  asChild
                >
                  <Link
                    href={`/dashboard/products?category=${cat.name.toLowerCase()}`}
                    className='px-6'
                  >
                    {cat.name}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <div className='relative mb-8'>
            <div className='absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-150' />
            <div className='relative bg-sidebar border-2 border-dashed border-accent/20 rounded-3xl p-10 shadow-lg'>
              <SearchX
                className='size-14 text-accent mx-auto'
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h2 className='text-2xl font-bold tracking-tight mb-2'>
            No products found
          </h2>
          <p className='text-muted-foreground mb-8 max-w-xs'>
            There are no products in this category yet. Try another category or
            browse all.
          </p>
          <Button
            asChild
            className='bg-accent hover:bg-accent/90 text-white h-11 px-8 rounded-xl shadow-lg shadow-accent/20'
          >
            <Link href='/dashboard/products'>View All Products</Link>
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
