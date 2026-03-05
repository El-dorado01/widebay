// lib/prisma.ts - updated to force client reload
import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@/generated/prisma/client';
// import { PrismaClient } from '@/generated/prisma/client';
// import { PrismaClient } from '@/generated/prisma';
const url = process.env.DATABASE_URL!; // e.g., "file:./data/widebay.db"

const adapter = new PrismaBetterSqlite3({ url });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
