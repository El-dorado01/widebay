// src/auth.ts
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const adapter = process.env.DISABLE_DB ? undefined : PrismaAdapter(prisma);
export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  ...(adapter ? { adapter } : {}),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      // First sign-in: `user` is the created DB user (with role)
      if (user && "role" in user && user.role) {
        token.role = user.role as "admin" | "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
    async signIn({ profile }) {
      // Runs after user is created/linked
      if (!profile?.email) return true;

      // Check for admin email directly via raw SQL to avoid PrismaClient typings mismatch
      const adminEntry = await prisma.$queryRaw`
        SELECT id, email FROM admin_emails WHERE email = ${profile.email} LIMIT 1
      `;

      if (adminEntry) {
        // Update role in DB if email is admin using raw SQL
        await prisma.$executeRaw`
          UPDATE users SET role = 'admin' WHERE email = ${profile.email}
        `;
      }

      return true;
    },
  },
};

export const handler = NextAuth(authOptions);