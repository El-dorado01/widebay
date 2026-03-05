'use client';

import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export function SearchForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const doSearch = () => {
    const q = inputRef.current?.value.trim();
    if (q) {
      router.push(`/dashboard/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      <Label
        htmlFor='search'
        className='sr-only'
      >
        Search
      </Label>
      <div className='flex-1'>
        <Input
          ref={inputRef}
          id='search'
          placeholder='Search products, categories, or descriptions...'
          className='w-full h-9 bg-background text-foreground border-border placeholder:text-muted-foreground focus-visible:ring-accent'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              doSearch();
            }
          }}
        />
      </div>
      <Button
        type='submit'
        size='icon'
        variant='secondary'
        className='size-9 shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent hover:text-white transition-colors'
        aria-label='Search'
      >
        <Search className='size-4' />
      </Button>
    </form>
  );
}
