// components/PartsSearchBar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Package,
  CheckCircle2,
  X,
  ArrowRight,
  Zap,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function PartsSearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Live search effect with debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/products/search?q=${encodeURIComponent(query)}`,
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
          setSelectedIndex(0);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        window.location.href = `/products/${results[selectedIndex].id}`;
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  return (
    <section className='py-20 bg-linear-to-b from-slate-50/50 to-white'>
      <div className='mx-auto max-w-5xl px-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-2xl lg:text-3xl font-bold tracking-tight text-foreground'>
            Find Your Next Drone
          </h2>
          <p className='mt-4 lg:text-xl text-muted-foreground'>
            Search our entire catalog of premium drones and accessories
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className='relative max-w-3xl mx-auto'>
          <div className='relative'>
            <Search className='absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground' />
            <Input
              ref={inputRef}
              type='text'
              placeholder='Search products...'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => query.length > 0 && setIsOpen(true)}
              className='h-20 pl-16 pr-20 lg:text-xl rounded-3xl shadow-xl focus:shadow-2xl transition-all duration-300 border-2 border-transparent focus:border-primary/30'
            />
            {query && (
              <Button
                size='icon'
                variant='ghost'
                className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted'
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
              >
                {isLoading ? (
                  <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
                ) : (
                  <X className='h-6 w-6' />
                )}
              </Button>
            )}
          </div>

          {/* Results Dropdown */}
          <AnimatePresence>
            {isOpen && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className='absolute top-full left-0 right-0 mt-4 rounded-3xl bg-white shadow-2xl border overflow-hidden z-50 ring-1 ring-black/5'
              >
                <div className='max-h-96 overflow-y-auto py-3'>
                  {results.map((product, index) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className={cn(
                        'flex items-center justify-between px-8 py-5 transition-all duration-200',
                        selectedIndex === index
                          ? 'bg-primary/5 border-l-4 border-primary'
                          : 'hover:bg-muted/60',
                      )}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className='flex items-center gap-5'>
                        {product.imageUrl ? (
                          <div className='relative h-14 w-14 rounded-xl overflow-hidden bg-muted/50 border'>
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className='object-cover'
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className='p-3 rounded-2xl bg-primary/10'>
                            <Package className='h-7 w-7 text-primary' />
                          </div>
                        )}
                        <div>
                          <div className='flex items-center gap-4 mb-1'>
                            <span className='lg:text-lg font-bold text-foreground'>
                              {product.name}
                            </span>
                            {product.stock > 0 ? (
                              <Badge className='bg-emerald-100 text-emerald-700 hover:bg-emerald-200'>
                                <CheckCircle2 className='mr-1.5 h-4 w-4' />
                                In Stock
                              </Badge>
                            ) : (
                              <Badge variant='secondary'>Pre-Order</Badge>
                            )}
                          </div>
                          <p className='font-semibold text-primary'>
                            ${(product.price / 100).toFixed(2)}
                          </p>
                          {product.category?.name && (
                            <p className='text-sm text-muted-foreground mt-1 flex items-center gap-2'>
                              <Zap className='h-4 w-4 text-amber-500' />
                              {product.category.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <ArrowRight className='h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors' />
                    </Link>
                  ))}
                </div>

                <div className='border-t bg-linear-to-r from-primary/5 to-transparent px-8 py-4 text-center text-sm font-medium text-muted-foreground'>
                  Found {results.length} item{results.length !== 1 ? 's' : ''} •
                  ↑↓ to navigate • Enter to view
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results */}
          {isOpen && query && !isLoading && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute top-full left-0 right-0 mt-4 rounded-3xl bg-white shadow-2xl border p-10 text-center z-50'
            >
              <p className='lg:text-lg text-muted-foreground mb-4'>
                No results for &quot;
                <span className='font-bold text-foreground'>{query}</span>&quot;
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
