// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// DJI Drone Hero Images (replace with your real ones)
const carouselImages = [
  "/hero/hero-image.jpg",
  "/hero/dji-air.jpg",
  "/hero/inspire-3.jpg",
  "/hero/dji-fpv.jpg",
  "/hero/matrice-350.jpg",
];

const trustAvatars = [
  { src: "/avatars/dji-creator.jpg", name: "National Geographic" },
  { src: "/avatars/cinema-pro.jpg", name: "Netflix Productions" },
  { src: "/avatars/surveyor.png", name: "Skydio & DJI Enterprise" },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-4">
                {trustAvatars.map((avatar, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="relative"
                  >
                    <div className="size-14 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-primary/20">
                      <Image
                        src={avatar.src}
                        alt={avatar.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-sm leading-tight">
                <span className="font-bold text-foreground block">
                  Trusted by 50,000+ Pilots & Creators
                </span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle2 className="h-4 w-4 min-w-4" />
                  Same-Day Shipping Worldwide
                </span>
              </div>
            </motion.div>

            {/* Hero Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl font-black tracking-tighter text-foreground lg:text-6xl xl:text-7xl"
              >
                Genuine DJI
                <span className="block text-primary">Spare Parts</span>
                In Stock • Shipped Today
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-2xl text-lg lg:text-xl text-muted-foreground font-medium"
              >
                Original props, batteries, gimbal cameras, motors, ESCs & more
                for Mavic, Air, Mini, FPV, Inspire, Matrice — all 100% authentic
                DJI parts.
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
                className="rounded-full px-10 text-lg h-16 shadow-xl hover:shadow-2xl transition-all font-bold"
              >
                <Zap className="mr-2 h-6 w-6" />
                Search DJI Parts Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 text-lg h-16 border-2 font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Need Help? Chat Live
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side – Drone Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[680px]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl">
              {carouselImages.map((src, i) => (
                <motion.div
                  key={src}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    currentImageIndex === i ? "opacity-100" : "opacity-0"
                  )}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{
                    opacity: currentImageIndex === i ? 1 : 0,
                    scale: currentImageIndex === i ? 1 : 1.08,
                  }}
                  transition={{ duration: 1.4 }}
                >
                  <Image
                    src={src}
                    alt={`DJI drone spare parts ${i + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              ))}

              {/* Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300 backdrop-blur-sm",
                      currentImageIndex === i
                        ? "w-12 bg-white shadow-lg"
                        : "w-2.5 bg-white/60 hover:bg-white/90"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -top-6 -right-6 rounded-full bg-primary px-8 py-5 text-white shadow-2xl font-bold lg:text-lg"
            >
              <span className="flex items-center gap-3">
                <Zap className="h-7 w-7" />
                10,000+ Parts Ready to Ship
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
