// components/WhyChooseUs.tsx
"use client";

import { motion, Variants } from "framer-motion";
import {
  PlaneTakeoff,
  Headphones,
  Warehouse,
  BadgeCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";

// Define features
const features = [
  {
    icon: PlaneTakeoff,
    title: "AOG Emergency Response",
    description:
      "Critical parts delivered worldwide in under 4 hours. 24/7/365 dedicated AOG desk.",
    color: "text-red-600",
    bgGradient: "from-red-50 to-red-100/50",
  },
  {
    icon: BadgeCheck,
    title: "Certified & Traceable Parts",
    description:
      "FAA/EASA dual-release 8130-3 • Full traceability • OEM & PMA from trusted sources.",
    color: "text-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100/50",
  },
  {
    icon: Warehouse,
    title: "50,000+ Parts In Stock",
    description:
      "Rotables, consumables, avionics, engines — ready for immediate shipment from strategic hubs.",
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100/50",
  },
  {
    icon: Headphones,
    title: "Expert Support Team",
    description:
      "Aviation professionals with 15+ years experience. We speak your language — ATA chapters included.",
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-purple-100/50",
  },
];

// Define variants with proper typing
const iconAnimation: Variants = {
  initial: { y: 20, opacity: 0, scale: 0.8 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardAnimation: Variants = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-linear-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Why Airlines Trust Us With Their Fleet
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We don’t just sell parts — we keep aircraft flying safely and on
            schedule.
          </p>
        </motion.div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={cardAnimation}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                // Move transition to motion.div, not as a separate prop
                className="group"
              >
                <Card
                  className={`
                  relative overflow-hidden border-0 shadow-lg
                  hover:shadow-2xl transition-all duration-500 h-full
                  bg-linear-to-br ${feature.bgGradient}
                  hover:-translate-y-3
                `}
                >
                  <div className="p-8 text-center">
                    {/* Icon with animated ring */}
                    <motion.div
                      variants={iconAnimation}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      className="inline-block mb-6"
                    >
                      <div
                        className={`
                        relative p-5 rounded-3xl 
                        bg-white/80 backdrop-blur shadow-xl
                        ring-8 ring-white/50
                        group-hover:scale-110 transition-transform duration-500
                      `}
                      >
                        <Icon
                          className={`h-12 w-12 ${feature.color}`}
                          strokeWidth={2}
                        />

                        {/* Animated orbiting ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 rounded-3xl border-2 border-dashed border-white/30"
                        />
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Subtle bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.color
                      .replace("text-", "from-")
                      .replace("600", "500")} to-transparent opacity-60`}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
