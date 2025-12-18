// src/auth.ts
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    async jwt({ token, user }) {
      // Only on first sign-in (user object from DB)
      if (user) {
        token.role = (user.role as 'admin' | 'user') || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as 'admin' | 'user';
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.email) return;

      // Correct model name: AdminEmail → prisma.adminEmail
      const adminEntry = await prisma.adminEmail.findUnique({
        where: { email: user.email },
      });

      if (adminEntry) {
        // Correct model name: User → prisma.user
        await prisma.user.update({
          where: { id: user.id },
          data: { role: 'admin' },
        });
      }
      // Else: role remains default "user" from schema
    },
  },
};

export const handler = NextAuth(authOptions);
