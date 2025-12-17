// app/admin/layout.tsx
"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Package, Tag, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 border-b px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            {/* <h1 className="text-2xl font-bold">Admin Dashboard</h1> */}
            <Badge variant="secondary">Administrator Mode</Badge>
          </div>
        </header>

        {/* Admin Navigation Tabs */}
        <div className="border-b bg-background hidden md:flex items-center justify-between space-x-2 px-6">
            <h3>Quick Links</h3>
            <nav className="flex gap-6 px-6">
                <Link
                href="/admin/categories"
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    pathname.startsWith("/admin/categories")
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                >
                <Tag className="h-4 w-4" />
                Categories
                </Link>
                <Link
                href="/admin/products"
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    pathname.startsWith("/admin/products")
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                >
                <Package className="h-4 w-4" />
                Products
                </Link>
                <Link
                href="/admin/featured"
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    pathname.startsWith("/admin/featured")
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                >
                <TrendingUp className="h-4 w-4" />
                Featured Items
                </Link>
            </nav>
        </div>

        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
