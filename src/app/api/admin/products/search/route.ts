// app/api/admin/products/search/route.ts
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() || '';
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

  if (query.length < 2) {
    return Response.json([]);
  }

  const lowerQuery = query.toLowerCase();

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } }, // Exact case match
        { name: { contains: lowerQuery } }, // Lowercase match (case-insensitive)
      ],
    },
    select: {
      id: true,
      name: true,
      price: true,
      discountPrice: true,
      imageUrl: true,
    },
    take: limit,
    orderBy: { name: 'asc' },
  });

  return Response.json(products);
}
