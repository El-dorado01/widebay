// components/products/ProductCard.tsx
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
  category: { name: string };
};

export default function ProductCard({ product }: { product: Product }) {
  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== null;

  const [isAdded, setIsAdded] = useState(false);

  // Check if product is already in cart on mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.some((item: any) => item.id === product.id);
    setIsAdded(exists);
  }, [product.id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: displayPrice,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    setIsAdded(true);
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
    });
  };

  return (
    <Card className='group overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full py-0'>
      <div className='relative aspect-square bg-muted'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-500'
          unoptimized
        />
        {hasDiscount && (
          <Badge className='absolute top-3 left-3 bg-destructive text-white'>
            Sale
          </Badge>
        )}
      </div>

      <CardContent className='px-5 flex-1 flex flex-col'>
        <p className='text-sm text-muted-foreground capitalize mb-2'>
          {product.category.name}
        </p>
        <h3 className='font-semibold line-clamp-2 mb-3'>{product.name}</h3>

        <div className='mt-auto'>
          <div className='flex items-end gap-2'>
            <p className='text-xl font-bold'>${displayPrice.toFixed(2)}</p>
            {hasDiscount && (
              <p className='text-sm line-through text-muted-foreground'>
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className='p-5 pt-0'>
        <Button
          onClick={handleAddToCart}
          disabled={isAdded}
          variant={isAdded ? 'secondary' : 'default'}
          className='w-full'
        >
          {isAdded ? (
            <>
              <Check className='mr-2 h-4 w-4' />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className='mr-2 h-4 w-4' />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
