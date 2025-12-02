// components/PartsSearchBar.tsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Plane, CheckCircle2, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data – replace with your actual API later
const mockParts = [
  {
    id: 1,
    pn: "65-12345-100",
    description: "Landing Gear Actuator",
    aircraft: "Boeing 737",
    inStock: true,
  },
  {
    id: 2,
    pn: "D5321234500000",
    description: "Wing Slat Track",
    aircraft: "Airbus A320",
    inStock: true,
  },
  {
    id: 3,
    pn: "101-123456-01",
    description: "Hydraulic Pump",
    aircraft: "Embraer E195",
    inStock: false,
  },
  {
    id: 4,
    pn: "BAC27TEX1234",
    description: "Cockpit Decal Set",
    aircraft: "Multiple",
    inStock: true,
  },
  {
    id: 5,
    pn: "NAS6203-12",
    description: "Bolt, Hex Head",
    aircraft: "Multiple",
    inStock: true,
  },
  {
    id: 6,
    pn: "A35321-001",
    description: "APU Starter Generator",
    aircraft: "ATR 72",
    inStock: true,
  },
];

export default function PartsSearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return mockParts.filter(
      (part) =>
        part.pn.toLowerCase().includes(q) ||
        part.description.toLowerCase().includes(q) ||
        part.aircraft.toLowerCase().includes(q)
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
      <div className="mx-auto max-w-4xl px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Find the Part You Need — Instantly
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Search over 50,000 certified aircraft parts by part number,
            description, or aircraft
          </p>
        </motion.div>

        {/* Search Input + Dropdown */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter part number, description, or aircraft (e.g. 65-12345, slat track, A320...)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setSelectedIndex(0);
              }}
              onFocus={() => results.length > 0 && setIsOpen(true)}
              className="h-16 pl-12 pr-14 text-lg rounded-2xl shadow-lg focus:shadow-xl transition-shadow"
            />
            {query && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  setQuery("");
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Results Dropdown */}
          <AnimatePresence>
            {isOpen && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-3 rounded-2xl bg-white shadow-2xl border ring-1 ring-black/5 overflow-hidden z-50"
              >
                <div className="max-h-96 overflow-y-auto py-2">
                  {results.map((part, index) => (
                    <a
                      key={part.id}
                      href={`/part/${part.pn}`}
                      className={cn(
                        "flex items-center justify-between px-6 py-4 transition-colors",
                        selectedIndex === index
                          ? "bg-primary/5"
                          : "hover:bg-muted/50"
                      )}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-semibold text-foreground">
                              {part.pn}
                            </span>
                            {part.inStock ? (
                              <Badge
                                variant="default"
                                className="bg-emerald-100 text-emerald-700"
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                In Stock
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Lead Time</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {part.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Plane className="h-3.5 w-3.5" />
                            {part.aircraft}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </a>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t bg-muted/30 px-6 py-3 text-center text-sm text-muted-foreground">
                  Found {results.length} part{results.length !== 1 ? "s" : ""} •
                  Press ↑↓ to navigate • Enter to view
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results */}
          {isOpen && query && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-full left-0 right-0 mt-3 rounded-2xl bg-white shadow-2xl border p-8 text-center"
            >
              <p className="text-muted-foreground">
                No parts found for "
                <span className="font-medium text-foreground">{query}</span>"
              </p>
              <Button variant="link" className="mt-4">
                Contact our AOG team for help →
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
