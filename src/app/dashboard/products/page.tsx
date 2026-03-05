import { getProducts, getCategories } from '@/lib/actions';
import ProductGrid from '@/components/products/ProductGrid';
import { SearchForm } from '@/components/search-form';

export const metadata = {
  title: 'All Products',
};

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || 'all';

  const [products, categories] = await Promise.all([
    getProducts(selectedCategory === 'all' ? undefined : selectedCategory),
    getCategories(),
  ]);

  return (
    <div className='container mx-auto px-6 py-8 max-w-7xl'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-2'>All Products</h1>
        <p className='text-muted-foreground text-lg'>
          Discover our full collection of premium items
        </p>
      </div>

      <ProductGrid
        products={products}
        categories={categories}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
