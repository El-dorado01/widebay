// app/admin/dashboard/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Package, Tag, TrendingUp, Percent } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function AdminOverview() {
  // Fetch live metrics
  const [categoryCount, productCount, trendingCount, discountCount] =
    await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.trendingProduct.count(),
      prisma.discountedProduct.count(),
    ]);

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Welcome back, Admin</h2>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Categories
            </CardTitle>
            <Tag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{categoryCount}</div>
            <p className='text-xs text-muted-foreground'>
              Manage all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Products
            </CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{productCount}</div>
            <p className='text-xs text-muted-foreground'>
              Add or edit products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Trending Items
            </CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{trendingCount}</div>
            <p className='text-xs text-muted-foreground'>Currently featured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Discount Items
            </CardTitle>
            <Percent className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{discountCount}</div>
            <p className='text-xs text-muted-foreground'>In carousel</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Link href='/admin/categories'>
          <Card className='hover:shadow-md transition-shadow cursor-pointer h-full'>
            <CardHeader>
              <CardTitle>Manage Categories</CardTitle>
              <CardDescription>
                Create and organize product categories
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href='/admin/products'>
          <Card className='hover:shadow-md transition-shadow cursor-pointer h-full'>
            <CardHeader>
              <CardTitle>Add Products</CardTitle>
              <CardDescription>List new items in your store</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href='/admin/featured'>
          <Card className='hover:shadow-md transition-shadow cursor-pointer h-full'>
            <CardHeader>
              <CardTitle>Featured Sections</CardTitle>
              <CardDescription>
                Control trending & discount items
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
