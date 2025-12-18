// middleware.ts (edge-safe)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Diagnostic: top-level log to confirm Next loads this file on startup
console.log("Middleware loaded: src/middleware.ts (withAuth)");

export default withAuth(
  (req: NextRequest) => {
    const { nextUrl } = req;
    const token = (req as any).nextauth?.token; // token from next-auth (JWT)

    const isLoggedIn = !!token;
    const userRole = token?.role as string | undefined; // "admin" or "user"

    // More diagnostics for each invocation
    try {
      console.log("Middleware invoked - path:", nextUrl.pathname, "userRole:", userRole, "token:", token ? JSON.stringify(token) : undefined);
    } catch (e) {
      console.log("Middleware invoked - path:", nextUrl.pathname, "userRole:", userRole);
    }

    const isAdminRoute = nextUrl.pathname.startsWith("/admin");
    const isAdminRoot = nextUrl.pathname === "/admin" || nextUrl.pathname === "/admin/";
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
    const isLoginPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/login/";

    // If hitting /admin directly, redirect to /admin/dashboard (or to login if not authenticated)
    if (isAdminRoot) {
      if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
      if (userRole !== "admin") return NextResponse.redirect(new URL("/dashboard", nextUrl));
      return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
    }

    // Not logged in → send to login for other protected routes
    if ((isAdminRoute || isDashboardRoute) && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // Logged in but trying to access wrong dashboard
    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    if (isDashboardRoute && userRole === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
    }

    // If on login but already logged in → redirect to correct dashboard
    if (isLoginPage && isLoggedIn) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
      }
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // return true so middleware handler always runs and can make custom redirects
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/login/:path*",
  ],
};
