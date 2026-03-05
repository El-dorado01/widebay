// app/dashboard/page.tsx
import { AppSidebar } from '@/components/app-sidebar';
import { SearchForm } from '@/components/search-form';
import DiscountProducts from '@/components/discount-products';
import TrendingProducts from '@/components/trending-products';
import {
  getTrendingProducts,
  getDiscountedProducts,
  getCategories,
} from '@/lib/actions';

type PageProps = {
  searchParams: Promise<{ category?: string }>; // Important: Promise!
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || 'all';

  const [trendingProducts, discountedProducts, categories] = await Promise.all([
    getTrendingProducts(
      selectedCategory === 'all' ? undefined : selectedCategory,
    ),
    getDiscountedProducts(),
    getCategories(),
  ]);

  return (
    <div className='flex flex-1 flex-col gap-8 p-4 w-full'>
      <DiscountProducts products={discountedProducts} />

      <TrendingProducts
        products={trendingProducts}
        categories={categories}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
