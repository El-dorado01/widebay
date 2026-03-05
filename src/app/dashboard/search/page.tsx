import { searchProducts } from '@/lib/actions';
import { SearchX, Search } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps) {
  const { q } = await searchParams;
  return { title: q ? `Results for "${q}"` : 'Search' };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  const results = query ? await searchProducts(query) : [];

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      {/* Header */}
      <div className='mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2 mb-1'>
            <Search className='size-5 text-muted-foreground' />
            <h1 className='text-2xl font-bold tracking-tight'>
              {query ? `Results for "${query}"` : 'Search'}
            </h1>
          </div>
          {query && (
            <p className='text-muted-foreground text-sm'>
              {results.length === 0
                ? 'No products found.'
                : `${results.length} product${results.length === 1 ? '' : 's'} found`}
            </p>
          )}
        </div>
        {query && (
          <Button
            asChild
            variant='outline'
            size='sm'
            className='h-9'
          >
            <Link href='/dashboard/search'>Clear Results</Link>
          </Button>
        )}
      </div>

      {/* No query typed yet */}
      {!query && (
        <div className='flex flex-col items-center justify-center min-h-[50vh] text-center'>
          <div className='relative mb-8'>
            <div className='absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-150' />
            <div className='relative bg-sidebar border-2 border-dashed border-accent/20 rounded-3xl p-10 shadow-lg'>
              <Search
                className='size-14 text-accent mx-auto'
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h2 className='text-2xl font-bold tracking-tight mb-2'>
            Start searching
          </h2>
          <p className='text-muted-foreground max-w-xs'>
            Type anything in the search bar above to find products by name,
            description, or category.
          </p>
        </div>
      )}

      {/* No results */}
      {query && results.length === 0 && (
        <div className='flex flex-col items-center justify-center min-h-[50vh] text-center'>
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
            No results found
          </h2>
          <p className='text-muted-foreground mb-8 max-w-xs'>
            We couldn't find anything matching <strong>"{query}"</strong>. Try a
            different search term.
          </p>
          <Button
            asChild
            className='bg-accent hover:bg-accent/90 text-white h-11 px-8 rounded-xl shadow-lg shadow-accent/20'
          >
            <Link href='/dashboard/products'>Browse All Products</Link>
          </Button>
        </div>
      )}

      {/* Results grid */}
      {results.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {results.map((product) => (
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
