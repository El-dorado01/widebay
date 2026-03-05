// lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import prisma from './prisma';

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

type CreateCategoryData = {
  name: string;
  description?: string;
};

export async function createCategory(data: CreateCategoryData) {
  const url = `${baseUrl}/api/admin/categories`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name.trim(),
      description: data.description?.trim() || null,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message =
      typeof err.error === 'string'
        ? err.error
        : Array.isArray(err.error)
          ? err.error[0]?.message || 'Validation error'
          : 'Failed to create category';

    throw new Error(message);
  }

  revalidatePath('/admin/categories');
  return await res.json();
}

export async function deleteCategory(id: string) {
  const url = `${baseUrl}/api/admin/categories`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message =
      typeof err.error === 'string'
        ? err.error
        : Array.isArray(err.error)
          ? err.error[0]?.message || 'Validation error'
          : 'Failed to delete category';

    throw new Error(message);
  }

  revalidatePath('/admin/categories');
  return { success: true };
}

export async function createProduct(data: any) {
  const res = await fetch(`${baseUrl}/api/admin/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err.error?.[0]?.message || 'Failed to create product';
    throw new Error(message);
  }

  revalidatePath('/admin/products');
  return await res.json();
}

export async function updateProduct(data: any) {
  const res = await fetch(`${baseUrl}/api/admin/products`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err.error?.[0]?.message || 'Failed to update product';
    throw new Error(message);
  }

  revalidatePath('/admin/products');
  return await res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${baseUrl}/api/admin/products`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err.error?.[0]?.message || 'Failed to delete product';
    throw new Error(message);
  }

  revalidatePath('/admin/products');
  return { success: true };
}

// lib/actions.ts (add these)

export async function addTrendingProduct(productId: string) {
  const res = await fetch(`${baseUrl}/api/admin/featured/trending`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to add to trending');
  }

  revalidatePath('/admin/featured');
}

export async function removeTrendingProduct(productId: string) {
  const res = await fetch(`${baseUrl}/api/admin/featured/trending`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error('Failed to remove from trending');
  revalidatePath('/admin/featured');
}

export async function addDiscountedProduct(productId: string) {
  const res = await fetch(`${baseUrl}/api/admin/featured/discounted`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to add to discounted');
  }

  revalidatePath('/admin/featured');
}

export async function removeDiscountedProduct(productId: string) {
  const res = await fetch(`${baseUrl}/api/admin/featured/discounted`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error('Failed to remove from discounted');
  revalidatePath('/admin/featured');
}
export async function getTrendingProducts(categoryName?: string) {
  let targetCategoryName = categoryName;

  if (categoryName) {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          contains: categoryName,
        },
      },
    });
    if (category) targetCategoryName = category.name;
  }

  const where = targetCategoryName
    ? {
        product: {
          category: {
            name: {
              equals: targetCategoryName,
            },
          },
        },
      }
    : {};

  const trending = await prisma.trendingProduct.findMany({
    where,
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          discountPrice: true,
          imageUrl: true,
          category: {
            select: { name: true },
          },
        },
      },
    },
    orderBy: { position: 'asc' },
  });

  return trending.map((t) => ({
    ...t.product,
    categoryName: t.product.category.name,
  }));
}

// Also add: fetch all categories for tabs
export async function getCategories() {
  return await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });
}

export async function getDiscountedProducts() {
  const discounted = await prisma.discountedProduct.findMany({
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          discountPrice: true,
          imageUrl: true,
        },
      },
    },
    orderBy: { position: 'asc' },
  });

  return discounted.map((d) => d.product);
}

// lib/actions.ts
export async function getProducts(categoryName?: string) {
  let targetCategoryName = categoryName;

  if (categoryName) {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          contains: categoryName,
        },
      },
    });
    if (category) targetCategoryName = category.name;
  }

  const where = targetCategoryName
    ? {
        category: {
          name: {
            equals: targetCategoryName,
          },
        },
      }
    : {};

  return await prisma.product.findMany({
    where,
    include: {
      category: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserOrders(userId: string) {
  if (!userId) return [];

  return await (prisma.order as any).findMany({
    where: { userId },
    include: {
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function searchProducts(query: string) {
  if (!query?.trim()) return [];

  return await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
        { category: { name: { contains: query } } },
      ],
    },
    include: {
      category: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 30,
  });
}
