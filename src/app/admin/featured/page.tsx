// app/admin/featured/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  addTrendingProduct,
  removeTrendingProduct,
  addDiscountedProduct,
  removeDiscountedProduct,
} from '@/lib/actions';
import FeaturedSectionCard from '@/components/FeaturedSectionCard';

type FeaturedSection = 'trending' | 'discounted';

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
};

export default function FeaturedPage() {
  const [trending, setTrending] = useState<Product[]>([]);
  const [discounted, setDiscounted] = useState<Product[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const fetchFeatured = async () => {
    setLoadingFeatured(true);
    try {
      const [trendRes, discRes] = await Promise.all([
        fetch('/api/admin/featured/trending'),
        fetch('/api/admin/featured/discounted'),
      ]);

      if (trendRes.ok) setTrending(await trendRes.json());
      if (discRes.ok) setDiscounted(await discRes.json());
    } catch {
      toast.error('Failed to load featured items');
    } finally {
      setLoadingFeatured(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleAdd = async (productId: string, section: FeaturedSection) => {
    const action =
      section === 'trending' ? addTrendingProduct : addDiscountedProduct;
    const promise = action(productId).then(fetchFeatured);

    toast.promise(promise, {
      loading: 'Adding to featured...',
      success: 'Added successfully!',
      error: 'Failed to add',
    });
  };

  const handleRemove = async (productId: string, section: FeaturedSection) => {
    const action =
      section === 'trending' ? removeTrendingProduct : removeDiscountedProduct;
    const promise = action(productId).then(fetchFeatured);

    toast.promise(promise, {
      loading: 'Removing...',
      success: 'Removed successfully!',
      error: 'Failed to remove',
    });
  };

  return (
    <div className='space-y-6 py-4 px-2'>
      <h2 className='text-2xl font-bold'>Manage Featured Items</h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <FeaturedSectionCard
          title='Trending Products'
          description="Products shown in the 'Trending' section (max 8 recommended)"
          icon='🔥'
          section='trending'
          featuredProducts={trending}
          onAdd={handleAdd}
          onRemove={handleRemove}
          loading={loadingFeatured}
          maxRecommended={8}
        />

        <FeaturedSectionCard
          title='Discount Products'
          description='Products featured in the discount carousel'
          icon='🏷️'
          section='discounted'
          featuredProducts={discounted}
          onAdd={handleAdd}
          onRemove={handleRemove}
          loading={loadingFeatured}
          maxRecommended={null}
          onlyDiscounted={true} // ← ONLY HERE
        />
      </div>
    </div>
  );
}
