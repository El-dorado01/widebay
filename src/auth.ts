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
    async signIn({ user }) {
      if (!user.email) return true;

      const adminEntry = await prisma.adminEmail.findUnique({
        where: { email: user.email },
      });

      if (adminEntry) {
        // Check if user already exists and if role needs updating
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser && existingUser.role !== 'admin') {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { role: 'admin' },
          });
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      // Only on first sign-in (user object from DB)
      if (user) {
        token.id = user.id;
        token.role = (user.role as 'admin' | 'user') || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as 'admin' | 'user';
      }
      if (token.id) {
        (session.user as any).id = token.id;
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
