// components/FeaturedCategories.tsx
"use client";

import { motion, Variants } from "framer-motion";
import {
  Package,
  Plane,
  Zap,
  Wrench,
  Gauge,
  Cpu,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Avionics & Instruments",
    icon: Gauge,
    color: "from-gray-500 to-gray-600",
    href: "/category/avionics",
    description: "EFIS, FMS, radios, transponders",
  },
  {
    title: "Landing Gear",
    icon: Plane,
    color: "from-indigo-500 to-indigo-600",
    href: "/category/landing-gear",
    description: "Wheels, brakes, struts, actuators",
  },
  {
    title: "Hydraulics",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
    href: "/category/hydraulics",
    description: "Pumps, actuators, accumulators",
  },
  {
    title: "Engine & APU",
    icon: Cpu,
    color: "from-red-500 to-red-600",
    href: "/category/engine-apu",
    description: "Turbine blades, fuel nozzles, starters",
  },
  {
    title: "Airframe & Structures",
    icon: Wrench,
    color: "from-emerald-500 to-emerald-600",
    href: "/category/airframe",
    description: "Wing components, slats, flaps, doors",
  },
  {
    title: "Interior & Galleys",
    icon: Package,
    color: "from-amber-500 to-amber-600",
    href: "/category/interior",
    description: "Seats, panels, monuments, lavatories",
  },
];

// Properly typed variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut", // This is a valid easing string
    },
  },
};

export default function FeaturedCategories() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse our most requested aircraft spare parts — certified,
            traceable, and ready to ship.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                variants={itemVariants} // Correctly typed + used
              >
                <Link
                  href={category.href}
                  className="group block relative overflow-hidden rounded-3xl bg-muted/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${category.color}`}
                    />
                  </div>

                  <div className="relative p-8 lg:p-10 text-center">
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg ring-8 ring-white/50 transition-all group-hover:scale-110 group-hover:shadow-2xl">
                      <Icon className="h-10 w-10 text-primary transition-colors group-hover:text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 transition-colors group-hover:text-white">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground transition-colors group-hover:text-white/90 mb-6">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-primary font-medium transition-all group-hover:text-white">
                      <span>Browse Parts</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -inset-10 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/catalog">
            <button className="text-sm inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
              View Full Catalog (50,000+ Parts)
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
