// components/trending-products.tsx
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp } from 'lucide-react';

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
  categoryName: string;
};

type Props = {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
};

export default function TrendingProducts({
  products,
  categories,
  selectedCategory,
}: Props) {
  if (products.length === 0) {
    return (
      <section>
        <h2 className='text-2xl font-bold mb-6'>Trending Products</h2>
        <div className='flex flex-col items-center justify-center py-16 text-center'>
          <div className='relative mb-8'>
            <div className='absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-150' />
            <div className='relative bg-sidebar border-2 border-dashed border-accent/20 rounded-3xl p-10 shadow-lg'>
              <TrendingUp
                className='size-14 text-accent mx-auto'
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h3 className='text-xl font-bold tracking-tight mb-2'>
            Nothing trending here yet
          </h3>
          <p className='text-muted-foreground mb-8 max-w-xs text-sm'>
            Check back soon or browse all our available products.
          </p>
          <Button
            asChild
            className='bg-accent hover:bg-accent/90 text-white h-10 px-6 rounded-xl shadow-lg shadow-accent/20'
          >
            <Link href='/dashboard/products'>Browse All</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className='text-2xl font-bold mb-6'>Trending Products</h2>

      {/* Category Tabs */}
      <div className='flex justify-center mb-8'>
        <Tabs
          value={selectedCategory}
          className='w-full max-w-4xl'
        >
          <TabsList className='grid grid-cols-6 w-full h-12 rounded-lg bg-muted'>
            <TabsTrigger
              value='all'
              asChild
            >
              <Link href={{ query: { category: 'all' } }}>All Items</Link>
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.name.toLowerCase()}
                asChild
              >
                <Link href={{ query: { category: cat.name.toLowerCase() } }}>
                  {cat.name}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className='grid auto-rows-min gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        {products.map((product) => (
          <Card
            key={product.id}
            className='hover:shadow-lg transition-shadow overflow-hidden flex flex-col'
          >
            <CardHeader className='p-0'>
              <div className='relative w-full h-56 bg-muted'>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className='object-cover'
                  unoptimized
                />
              </div>
            </CardHeader>
            <CardContent className='pt-4 grow'>
              <CardTitle className='text-base line-clamp-2'>
                {product.name}
              </CardTitle>
              <p className='text-sm text-muted-foreground mt-1 capitalize'>
                {product.categoryName}
              </p>
              <p className='mt-3 text-xl font-semibold text-primary'>
                ${product.discountPrice?.toFixed(2) ?? product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className='mt-auto'>
              <Button
                asChild
                variant='outline'
                className='w-full'
              >
                <Link href={`/product/${product.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
