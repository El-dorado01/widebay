// components/admin/featured/FeaturedSectionCard.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProductSearchResults from './ProductSearchResults';
import FeaturedProductList from './FeaturedProductList';

type FeaturedSection = 'trending' | 'discounted';

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
};

type Props = {
  title: string;
  description: string;
  icon: string;
  section: FeaturedSection;
  featuredProducts: Product[];
  onAdd: (id: string, section: FeaturedSection) => Promise<void>;
  onRemove: (id: string, section: FeaturedSection) => Promise<void>;
  loading: boolean;
  maxRecommended: number | null;
  onlyDiscounted?: boolean; // ← NEW
};

export default function FeaturedSectionCard({
  title,
  description,
  icon,
  section,
  featuredProducts,
  onAdd,
  onRemove,
  loading,
  maxRecommended,
  onlyDiscounted = false, // default false
}: Props) {
  const featuredIds = featuredProducts.map((p) => p.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-3 text-2xl'>
          <span className='text-3xl'>{icon}</span>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <ProductSearchResults
          section={section}
          excludedIds={featuredIds}
          onAdd={(id) => onAdd(id, section)}
          onlyDiscounted={onlyDiscounted} // ← PASS IT DOWN
        />

        <FeaturedProductList
          products={featuredProducts}
          section={section}
          onRemove={(id) => onRemove(id, section)}
          loading={loading}
        />

        {maxRecommended !== null && (
          <p className='text-center text-sm text-muted-foreground'>
            {featuredProducts.length} / {maxRecommended} products
          </p>
        )}
      </CardContent>
    </Card>
  );
}
