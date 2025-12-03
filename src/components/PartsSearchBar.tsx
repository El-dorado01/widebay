// components/PartsSearchBar.tsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, CheckCircle2, X, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Real-world DJI parts mock data
const mockParts = [
  {
    id: 1,
    pn: "CP.MA.00000462.01",
    description: "Mavic 3 Pro Intelligent Flight Battery",
    drone: "DJI Mavic 3 Pro / Cine",
    inStock: true,
  },
  {
    id: 2,
    pn: "CP.FP.00000160.01",
    description: "DJI FPV Goggles V2",
    drone: "DJI FPV Combo",
    inStock: true,
  },
  {
    id: 3,
    pn: "BC.PT.SS000301.01",
    description: "Propellers (Pair) for Air 3",
    drone: "DJI Air 3 / Air 3S",
    inStock: true,
  },
  {
    id: 4,
    pn: "CP.IN.00000029.01",
    description: "Gimbal Camera Assembly",
    drone: "DJI Mini 4 Pro",
    inStock: false,
  },
  {
    id: 5,
    pn: "CP.RN.00000334.01",
    description: "Remote Controller RC-N2",
    drone: "Multiple (Mini 4 Pro, Air 3, etc.)",
    inStock: true,
  },
  {
    id: 6,
    pn: "CP.MA.00000686.01",
    description: "ND Filter Set (ND16/64/256)",
    drone: "DJI Mavic 3 Classic",
    inStock: true,
  },
];

export default function PartsSearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return mockParts.filter(
      (part) =>
        part.pn.toLowerCase().includes(q) ||
        part.description.toLowerCase().includes(q) ||
        part.drone.toLowerCase().includes(q)
    );
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        window.location.href = `/part/${results[selectedIndex].pn}`;
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  return (
    <section className="py-20 bg-linear-to-b from-slate-50/50 to-white">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            Find Your DJI Part in Seconds
          </h2>
          <p className="mt-4 lg:text-xl text-muted-foreground">
            Search 10,000+ genuine parts by part number, drone model, or keyword
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Try: Mavic 3 battery, Mini 4 Pro gimbal, FPV goggles, ND filter..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setSelectedIndex(0);
              }}
              onFocus={() => results.length > 0 && setIsOpen(true)}
              className="h-20 pl-16 pr-20 lg:text-xl rounded-3xl shadow-xl focus:shadow-2xl transition-all duration-300 border-2 border-transparent focus:border-primary/30"
            />
            {query && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted"
                onClick={() => {
                  setQuery("");
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
              >
                <X className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Results Dropdown */}
          <AnimatePresence>
            {isOpen && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="absolute top-full left-0 right-0 mt-4 rounded-3xl bg-white shadow-2xl border overflow-hidden z-50 ring-1 ring-black/5"
              >
                <div className="max-h-96 overflow-y-auto py-3">
                  {results.map((part, index) => (
                    <Link
                      key={part.id}
                      href={`/part/${part.pn}`}
                      className={cn(
                        "flex items-center justify-between px-8 py-5 transition-all duration-200",
                        selectedIndex === index
                          ? "bg-primary/5 border-l-4 border-primary"
                          : "hover:bg-muted/60"
                      )}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-3 rounded-2xl bg-primary/10">
                          <Package className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-4 mb-1">
                            <span className="font-mono lg:text-lg font-bold text-foreground">
                              {part.pn}
                            </span>
                            {part.inStock ? (
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                                In Stock – Ships Today
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Pre-Order</Badge>
                            )}
                          </div>
                          <p className="text-base font-medium text-foreground/90">
                            {part.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-600" />
                            {part.drone}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>

                <div className="border-t bg-linear-to-r from-primary/5 to-transparent px-8 py-4 text-center text-sm font-medium text-muted-foreground">
                  Found {results.length} genuine DJI part
                  {results.length !== 1 ? "s" : ""} • ↑↓ to navigate • Enter to
                  view
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results */}
          {isOpen && query && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-full left-0 right-0 mt-4 rounded-3xl bg-white shadow-2xl border p-10 text-center"
            >
              <p className="lg:text-lg text-muted-foreground mb-4">
                No results for &quot;
                <span className="font-bold text-foreground">{query}</span>&quot;
              </p>
              <Button size="lg" className="rounded-full">
                Chat with a DJI Expert
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}