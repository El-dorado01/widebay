// src/components/Header.tsx
import { Search, ShoppingCart, Menu, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-4 z-70 px-4 md:px-8 min-w-full">
      <div className="mx-auto max-w-7xl rounded-full border border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Left side – Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo only */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-xl">
              W
            </div>

            {/* Desktop Navigation – tight to the logo */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-accent-foreground">
              <Link href="/" className="hover:text-primary transition">
                Homepage
              </Link>
              <Link href="/contact" className="hover:text-primary transition">
                Contact us
              </Link>
              <Link href="/about" className="hover:text-primary transition">
                About us
              </Link>
            </nav>
          </div>

          {/* Right side – Search + Buttons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="text-primary bg-gray-50 hover:bg-primary/30 rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Sign up – red (as in your sample) */}
            <Button className="hidden sm:flex rounded-full bg-primary hover:bg-primary/80 text-white font-medium px-6">
              Sign up
            </Button>

            {/* Cart – soft pink background, cart icon */}
            <Button
              variant="secondary"
              className="rounded-full bg-primary/10 hover:bg-primary/30 text-accent-foreground px-5"
            >
              <span className="hidden sm:inline">Cart</span>
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-screen">
                <div className="flex flex-col gap-6 items-start justify-end text-lg font-medium h-full px-4 pb-6">
                  <Link
                    href="/"
                    className="flex items-center justify-between hover:text-primary transition pb-4 w-full border-b border-b-gray-300"
                  >
                    Homepage
                    <ChevronRight className="ml-2 inline-block h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-between hover:text-primary transition pb-4 w-full border-b border-b-gray-300"
                  >
                    Contact us
                    <ChevronRight className="ml-2 inline-block h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center justify-between hover:text-primary transition pb-4 w-full border-b border-b-gray-300"
                  >
                    About us
                    <ChevronRight className="ml-2 inline-block h-4 w-4" />
                  </Link>
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/80">
                    Sign up
                  </Button>
                  <Button className="w-full rounded-full bg-[#00D4AA] hover:bg-[#00b894]">
                    <Phone className="mr-2 h-5 w-5" /> 24/7 AOG
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
