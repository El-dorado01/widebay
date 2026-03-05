// components/admin/featured/ProductSearchResults.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import Image from 'next/image';
import debounce from 'lodash/debounce';
import { toast } from 'sonner';

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
};

type Props = {
  section: 'trending' | 'discounted';
  excludedIds: string[];
  onAdd: (id: string) => void;
  onlyDiscounted?: boolean;
};

export default function ProductSearchResults({
  section,
  excludedIds,
  onAdd,
  onlyDiscounted = false,
}: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `/api/admin/products/search?q=${encodeURIComponent(searchQuery)}`
        );
        if (res.ok) {
          const products: Product[] = await res.json();

          let filtered = products.filter((p) => !excludedIds.includes(p.id));

          // ← APPLY DISCOUNT FILTER ONLY IF NEEDED
          if (onlyDiscounted) {
            filtered = filtered.filter(
              (p) => p.discountPrice !== null && p.discountPrice > 0
            );
          }

          setResults(filtered);
        }
      } catch {
        toast.error('Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400),
    [excludedIds, onlyDiscounted] // ← Add dependency
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  return (
    <div className='space-y-4'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder='Search products to add...'
          className='pl-10'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {(loading || results.length > 0) && (
        <div className='space-y-2 max-h-64 overflow-y-auto rounded-lg border bg-muted/50 p-3'>
          {loading && (
            <div className='flex justify-center py-6'>
              <Loader2 className='h-5 w-5 animate-spin' />
            </div>
          )}

          {!loading && results.length === 0 && query.length >= 2 && (
            <p className='text-center text-sm text-muted-foreground py-6'>
              {onlyDiscounted
                ? 'No products with a discount price found'
                : 'No products found'}
            </p>
          )}

          {!loading &&
            results.map((product) => (
              <Button
                key={product.id}
                variant='outline'
                className='w-full justify-start text-left font-normal h-auto py-3'
                onClick={() => onAdd(product.id)}
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded overflow-hidden border shrink-0'>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={40}
                      height={40}
                      className='object-cover'
                      unoptimized
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm truncate'>{product.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      ${product.price.toFixed(2)}
                      {product.discountPrice && (
                        <span className='ml-2 text-destructive'>
                          → ${product.discountPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}
