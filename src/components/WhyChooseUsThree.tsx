// components/WhyChooseUs.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { PlaneTakeoff, BadgeCheck, Warehouse, Headphones } from "lucide-react";

const reasons = [
  {
    icon: PlaneTakeoff,
    title: "AOG Emergency Response",
    description: "Critical parts delivered in under 4 hours, 24/7/365",
  },
  {
    icon: BadgeCheck,
    title: "Certified & Traceable",
    description: "FAA/EASA 8130-3 • Full documentation • OEM & PMA",
  },
  {
    icon: Warehouse,
    title: "50,000+ Parts In Stock",
    description: "Immediate availability from global warehouses",
  },
  {
    icon: Headphones,
    title: "Expert Support Team",
    description: "Aviation specialists ready to assist — ATA chapters included",
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function WhyChooseUsThree() {
  return (
      <section className="py-10 mx-auto max-w-7xl px-4 lg:px-6">
        {/* Compact 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                className="group flex items-start gap-5 transition-all px-4 lg:px-0"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-lg leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
  );
}
