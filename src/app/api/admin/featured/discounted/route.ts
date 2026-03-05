// app/api/admin/featured/discounted/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const productIdSchema = z.object({ productId: z.string().uuid() });

export async function GET() {
  const discounted = await prisma.discountedProduct.findMany({
    include: { product: { include: { category: true } } },
    orderBy: { position: 'asc' },
  });

  return NextResponse.json(discounted.map((d) => d.product));
}

export async function POST(req: NextRequest) {
  try {
    const { productId } = productIdSchema.parse(await req.json());

    const existing = await prisma.discountedProduct.findUnique({
      where: { productId },
    });
    if (existing)
      return NextResponse.json(
        { error: 'Already discounted' },
        { status: 400 }
      );

    await prisma.discountedProduct.create({ data: { productId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { productId } = productIdSchema.parse(await req.json());
    await prisma.discountedProduct.delete({ where: { productId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove' }, { status: 500 });
  }
}
