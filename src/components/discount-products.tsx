// components/discount-products.tsx
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
};

type Props = {
  products: Product[];
};

const DiscountProducts = ({ products }: Props) => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  if (products.length === 0) {
    return null; // or show a message
  }

  return (
    <section className='w-full py-4'>
      <h2 className='text-2xl font-bold mb-6'>Discount Products</h2>
      <Carousel
        plugins={[plugin.current]}
        className='max-w-full mx-auto md:px-8 relative'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ align: 'start', loop: true }}
      >
        <CarouselContent className='-ml-2 md:-ml-4'>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className='pl-4 basis-full md:basis-1/2 lg:basis-1/3'
            >
              <Card className='relative overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col'>
                <CardHeader className='p-0'>
                  <div className='relative w-full h-64 bg-muted'>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className='object-cover rounded-t-lg'
                      unoptimized
                    />
                  </div>
                </CardHeader>
                <CardContent className='pt-4 grow'>
                  <CardTitle className='text-lg line-clamp-2'>
                    {product.name}
                  </CardTitle>
                  <p className='text-sm text-muted-foreground mt-2'>
                    Limited time offer!
                  </p>
                  <div className='mt-4'>
                    <span className='text-2xl font-bold text-primary'>
                      $
                      {product.discountPrice?.toFixed(2) ??
                        product.price.toFixed(2)}
                    </span>
                    {product.discountPrice && (
                      <span className='ml-2 text-sm line-through text-muted-foreground'>
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className='mt-auto'>
                  <Button
                    asChild
                    variant='secondary'
                    className='w-full bg-white text-primary border border-primary hover:bg-primary hover:text-white shadow-md'
                  >
                    <Link href={`/product/${product.id}`}>Order Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='-left-2 hidden md:flex size-9' />
        <CarouselNext className='-right-2 hidden md:flex size-9' />
      </Carousel>
    </section>
  );
};

export default DiscountProducts;
