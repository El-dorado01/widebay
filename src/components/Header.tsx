// src/components/Header.tsx
"use client";

import {
  Search,
  ShoppingCart,
  Menu,
  Phone,
  X,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-4 z-50 px-4 md:px-8 min-w-full">
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
              {/* Replace everything from <Sheet open={open}... to </Sheet> with this: */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-full relative z-50"
                  >
                    {open ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>

                <SheetContent side="top" className="h-screen pt-28 px-6">
                  <div className="flex flex-col h-full justify-between">
                    <div className="space-y-6 mt-8">
                      {["Homepage", "Contact us", "About us"].map((label) => (
                        <SheetClose asChild key={label}>
                          <Link
                            href={
                              label === "Homepage"
                                ? "/"
                                : `/${label.toLowerCase().replace(" ", "-")}`
                            }
                            className="py-4 border-b border-gray-200 text-lg font-medium hover:text-primary transition flex items-center justify-between"
                          >
                            {label}
                            <ChevronRightIcon className="h-5 w-5" />
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="space-y-4 pb-10">
                      <SheetClose asChild>
                        <Button className="w-full rounded-full bg-primary hover:bg-primary/80 text-lg h-14">
                          Sign up
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button className="w-full rounded-full bg-primary/10 hover:bg-primary/30 text-lg h-14">
                          Cart
                          <ShoppingCart className="ml-3 h-6 w-6" />
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      {/* {open && (
        <div
          className="fixed inset-0 bg-black/40 z-60"
          onClick={() => setOpen(false)}
        />
      )} */}
    </>
  );
}
