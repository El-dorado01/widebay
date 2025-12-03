"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import aircraftData from "@/data/aircraft.json"; // ← we’ll create this in a sec

export default function HeroSearch() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background images – automatic responsive switching */}
      <Image
        src="/hero/dji-fpv.jpg"
        alt="Widebay Parts certified inventory hangar"
        fill
        priority
        className="object-cover hidden md:block"
      />
      <Image
        src="/hero/dji-fpv.jpg"
        alt="Widebay Parts certified inventory hangar"
        fill
        priority
        quality={90}
        className="object-cover md:hidden"
      />
      {/* Silent, looping, full-bleed MP4 background */}
      {/* <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover hidden md:block" // desktop
        >
          <source src="/hanger-bg.mp4" type="video/mp4" />
        </video>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover md:hidden" // mobile
        >
          <source src="/hanger-bg.mp4" type="video/mp4" />
        </video>
      </div> */}

      {/* Dark overlay for perfect text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 container px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-5xl mx-auto">
          Certified Aircraft Spare Parts — Delivered Worldwide in 24–72h
        </h1>

        {/* Mega-Search Card – always visible, sticky on scroll if you want later */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Make */}
              <div className="md:col-span-3">
                <Label className="text-xs mb-1 font-medium text-accent-foreground">
                  Make
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue className="w-full" placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(aircraftData).map((make) => (
                      <SelectItem
                        key={make}
                        value={make}
                        className="focus:text-white"
                      >
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model – auto-populated after Make */}
              <div className="md:col-span-3">
                <Label className="text-xs mb-1 font-medium text-accent-foreground">
                  Model
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      className="w-full"
                      placeholder="First select make"
                    />
                  </SelectTrigger>
                  <SelectContent>{/* populated client-side */}</SelectContent>
                </Select>
              </div>

              {/* Part Number / Keyword */}
              <div className="md:col-span-4">
                <Label className="text-xs mb-1 font-medium text-accent-foreground">
                  Part Number or Keyword
                </Label>
                <Input
                  placeholder="e.g. 100-555-1234 or brake"
                  className="h-9"
                />
              </div>

              {/* CTA */}
              <div className="md:col-span-2 flex items-end">
                <Button
                  size="lg"
                  className="w-full h-9 bg-primary hover:bg-primary/90 rounded-full font-semibold"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find Part
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
