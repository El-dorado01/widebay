// components/TrustBadges.tsx
"use client";

import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Globe,
  Plane,
  FileCheck,
  Stamp,
  BadgeCheck,
} from "lucide-react";

const badges = [
  { name: "FAA Approved", icon: ShieldCheck, color: "text-blue-600" },
  { name: "EASA Part-145", icon: Globe, color: "text-blue-700" },
  { name: "ASA-100 Accredited", icon: Award, color: "text-purple-600" },
  { name: "ISO 9001:2015", icon: FileCheck, color: "text-emerald-600" },
  { name: "Dual Release 8130-3", icon: Stamp, color: "text-indigo-600" },
  {
    name: "Traceability Guaranteed",
    icon: BadgeCheck,
    color: "text-green-600",
  },
  { name: "24/7 AOG Support", icon: Plane, color: "text-red-600" },
  { name: "100% OEM & PMA", icon: CheckCircle2, color: "text-teal-600" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TrustBadges() {
  return (
    <section className="py-20 bg-slate-50/50">
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
            Certified. Accredited. Trusted Worldwide.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We meet the highest aviation standards — so you can fly with
            confidence.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8"
        >
          {badges.map((badge) => {
            const Icon = badge.icon;

            return (
              <motion.div
                key={badge.name}
                variants={badgeVariants}
                whileHover={{ scale: 1.1 }}
                className="group flex flex-col items-center justify-center"
              >
                <div className="relative mb-4 p-6 rounded-3xl bg-white shadow-md ring-1 ring-border transition-all duration-300 group-hover:shadow-2xl group-hover:ring-primary/30">
                  <Icon
                    className={`h-12 w-12 text-muted-foreground transition-all duration-300 group-hover:${badge.color.replace(
                      "text-",
                      ""
                    )} group-hover:scale-110`}
                    strokeWidth={1.8}
                  />
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute inset-0 blur-xl ${badge.color} opacity-30`}
                    />
                  </div>
                </div>
                <p className="text-center text-sm font-medium text-foreground/80 leading-tight">
                  {badge.name}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Optional bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground">
            All parts come with full certification, traceability, and export
            documentation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
