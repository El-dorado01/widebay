// types/product.ts
export type Product = {
  id: string; // UUID from Prisma
  name: string;
  category: string; // category name (joined)
  price: number;
  discountPrice: number | null;
  stock: number;
  description: string;
  imageUrl: string;
};
