// src/types/next-auth.d.ts
import { NextRequest } from "next/server";
import { type Session } from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: "admin" | "user";
  }

  interface Session {
    user: {
      id: string; // Add the id here
      role: "admin" | "user";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Optional: if you want strong typing on token.id too
    role?: "admin" | "user";
  }
}

declare module "next/server" {
  interface NextRequest {
    auth: Session | null;
  }
}