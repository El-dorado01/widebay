// components/FeaturedCategories.tsx
"use client";

import { motion, Variants } from "framer-motion";
import {
  Camera,
  Battery,
  Zap,
  Radio,
  Cpu,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Gimbal & Cameras",
    icon: Camera,
    color: "from-purple-500 to-purple-600",
    href: "/category/gimbal-cameras",
    description: "Hasselblad, Zenmuse, Mini 4K, FPV cameras",
  },
  {
    title: "Batteries & Chargers",
    icon: Battery,
    color: "from-emerald-500 to-emerald-600",
    href: "/category/batteries",
    description: "Intelligent Flight Batteries, hubs, fast chargers",
  },
  {
    title: "Propellers",
    icon: Zap,
    color: "from-orange-500 to-orange-600",
    href: "/category/propellers",
    description: "Low-noise, quick-release, carbon fiber props",
  },
  {
    title: "Remote Controllers",
    icon: Radio,
    color: "from-blue-500 to-blue-600",
    href: "/category/controllers",
    description: "RC-N1, RC-N2, RC Pro, Smart Controller",
  },
  {
    title: "Motors & ESCs",
    icon: Cpu,
    color: "from-red-500 to-red-600",
    href: "/category/motors-escs",
    description: "Replacement motors, ESCs, arms, frames",
  },
  {
    title: "ND Filters & Accessories",
    icon: Shield,
    color: "from-cyan-500 to-cyan-600",
    href: "/category/filters-accessories",
    description: "ND/PL filters, lens hoods, landing gear, cases",
  },
];

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
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
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
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-foreground">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Genuine DJI parts for every model — Mavic, Air, Mini, FPV, Inspire &
            Enterprise
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
              <motion.div key={category.title} variants={itemVariants}>
                <Link
                  href={category.href}
                  className="group block relative overflow-hidden rounded-3xl bg-muted/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${category.color}`}
                    />
                  </div>

                  <div className="relative p-8 lg:p-10 text-center">
                    {/* Icon */}
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg ring-8 ring-white/50 transition-all group-hover:scale-110 group-hover:shadow-2xl">
                      <Icon className="h-11 w-11 text-primary transition-colors group-hover:text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 transition-colors group-hover:text-white">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground transition-colors group-hover:text-white/90 mb-6">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-primary font-bold transition-all group-hover:text-white">
                      <span>Shop Now</span>
                      <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-3" />
                    </div>
                  </div>

                  {/* Shine sweep effect */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -inset-10 bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
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
            <button className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              View All 10,000+ DJI Parts
              <ArrowRight className="h-6 w-6" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
