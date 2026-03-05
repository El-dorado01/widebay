// app/api/admin/featured/trending/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const productIdSchema = z.object({ productId: z.string().uuid() });

export async function GET() {
  const trending = await prisma.trendingProduct.findMany({
    include: { product: { include: { category: true } } },
    orderBy: { position: 'asc' },
  });

  return NextResponse.json(trending.map((t) => t.product));
}

export async function POST(req: NextRequest) {
  try {
    const { productId } = productIdSchema.parse(await req.json());

    // Check if already trending
    const existing = await prisma.trendingProduct.findUnique({
      where: { productId },
    });
    if (existing)
      return NextResponse.json({ error: 'Already trending' }, { status: 400 });

    // Optional: limit to 8
    const count = await prisma.trendingProduct.count();
    if (count >= 8)
      return NextResponse.json(
        { error: 'Max 8 trending products' },
        { status: 400 }
      );

    await prisma.trendingProduct.create({ data: { productId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { productId } = productIdSchema.parse(await req.json());
    await prisma.trendingProduct.delete({ where: { productId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove' }, { status: 500 });
  }
}
