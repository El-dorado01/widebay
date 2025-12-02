// src/components/Header.tsx
"use client";

import {
  Search,
  ShoppingCart,
  Menu,
  Phone,
  ChevronRight,
  X,
  ChevronRightIcon,
  HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-4 z-100 px-4 md:px-8 min-w-full">
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
              <Sheet open={open} onOpenChange={setOpen}>
                {open ? (
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      onClick={() => setOpen(false)}
                      size="icon"
                      className="md:hidden rounded-full"
                    >
                      <X className="size-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden rounded-full"
                    >
                      <Menu className="size-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                )}
                <SheetContent
                  side="top"
                  className={cn(
                    "h-screen pt-28 px-4 md:px-8 flex flex-col items-center justify-between"
                  )}
                >
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <div className="flex w-full flex-col gap-6">
                    {["Homepage", "Contact us", "About us"].map((label) => (
                      <Item
                        key={label}
                        size="sm"
                        className="border-b border-gray-300"
                        asChild
                      >
                        <Link
                          key={label}
                          href={
                            label === "Homepage"
                              ? "/"
                              : `/${label.toLowerCase().replace(" ", "-")}`
                          }
                          onClick={() => setOpen(false)}
                          className="hover:text-primary transition"
                        >
                          <ItemMedia>
                            <HomeIcon className="size-5" />
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle>{label}</ItemTitle>
                          </ItemContent>
                          <ItemActions>
                            <ChevronRightIcon className="size-4" />
                          </ItemActions>
                        </Link>
                      </Item>
                    ))}
                  </div>
                  <div className="flex flex-col gap-6 items-center justify-center text-lg font-medium w-full pb-4">
                    <Button
                      onClick={() => setOpen(false)}
                      className="w-full rounded-full bg-primary hover:bg-primary/80"
                    >
                      Sign up
                    </Button>
                    <Button
                      onClick={() => setOpen(false)}
                      className="w-full rounded-full bg-[#00D4AA] hover:bg-[#00b894]"
                    >
                      <Phone className="mr-2 h-5 w-5" /> 24/7 AOG
                    </Button>
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
