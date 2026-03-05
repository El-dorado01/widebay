// components/admin/featured/FeaturedProductList.tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
};

type Props = {
  products: Product[];
  section: 'trending' | 'discounted';
  onRemove: (id: string) => void;
  loading: boolean;
};

export default function FeaturedProductList({
  products,
  onRemove,
  loading,
}: Props) {
  if (loading) {
    return (
      <p className='text-center text-muted-foreground py-8'>
        Loading featured products...
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className='text-center text-muted-foreground py-8'>
        No products featured yet
      </p>
    );
  }

  return (
    <>
      <Separator />
      <div className='space-y-3'>
        {products.map((product) => (
          <div
            key={product.id}
            className='flex items-center justify-between p-4 rounded-lg border bg-card'
          >
            <div className='flex items-center gap-4'>
              <div className='relative w-14 h-14 rounded-lg overflow-hidden border'>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className='object-cover'
                  unoptimized
                />
              </div>
              <div>
                <p className='font-medium'>{product.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {product.discountPrice ? (
                    <>
                      <span className='line-through'>
                        ${product.price.toFixed(2)}
                      </span>{' '}
                      <Badge variant='destructive'>
                        ${product.discountPrice.toFixed(2)}
                      </Badge>
                    </>
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </p>
              </div>
            </div>

            <Button
              size='sm'
              variant='ghost'
              className='text-destructive hover:bg-destructive/10'
              onClick={() => onRemove(product.id)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
