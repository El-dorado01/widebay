// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Plane } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Replace these with your actual aircraft/spare parts images
const carouselImages = [
  "/hero/engine.jpg",
  "/hero/cockpit-parts.jpg",
  "/hero/landing-gear.jpg",
  "/hero/avionics.jpg",
  "/hero/turbine-blades.jpg",
];

const trustAvatars = [
  { src: "/avatars/airline-1.jpg", name: "Delta Air Lines" },
  { src: "/avatars/airline-2.jpg", name: "FedEx Express" },
  { src: "/avatars/airline-3.png", name: "Lufthansa Technik" },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-50 pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side – Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Trust Avatars */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-3">
                {trustAvatars.map((avatar, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="relative"
                  >
                    <div className="size-12 overflow-hidden rounded-full border-2 border-white shadow-md ring-2 ring-primary/20">
                      <Image
                        src={avatar.src}
                        alt={avatar.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Trusted by 200+ airlines
                </span>
                <br />
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  AOG support 24/7
                </span>
              </div>
            </motion.div>

            {/* Hero Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl xl:text-7xl"
              >
                Global Aircraft
                <span className="block text-primary">Spare Parts</span>
                Delivered in Hours
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-2xl text-lg text-muted-foreground lg:text-xl"
              >
                Certified OEM & PMA parts for Boeing, Airbus, Embraer, and more.
                Instant quotes • Worldwide shipping • AOG emergency response.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="rounded-full px-8 text-lg h-14 shadow-lg hover:shadow-xl transition-shadow"
              >
                Search Parts Catalog
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-lg hover:text-white h-14 border-2"
              >
                <Plane className="mr-1 h-5 w-5" />
                Request AOG Support
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side – Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
            </div>

            {/* Carousel Images */}
            <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl">
              {carouselImages.map((src, i) => (
                <motion.div
                  key={src}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    currentImageIndex === i ? "opacity-100" : "opacity-0"
                  )}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: currentImageIndex === i ? 1 : 0,
                    scale: currentImageIndex === i ? 1 : 1.05,
                  }}
                  transition={{ duration: 1.2 }}
                >
                  <Image
                    src={src}
                    alt={`Aircraft spare parts ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                </motion.div>
              ))}

              {/* Carousel Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      currentImageIndex === i
                        ? "w-10 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -top-4 -right-4 rounded-full bg-primary px-6 py-3 text-white shadow-xl"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Plane className="h-5 w-5" />
                50,000+ Parts in Stock
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
