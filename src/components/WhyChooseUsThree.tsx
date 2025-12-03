// components/WhyChooseUsThree.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Package, Headphones, Zap } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Lightning-Fast Shipping",
    description:
      "Same-day dispatch on all orders before 3 PM — worldwide express",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine DJI",
    description:
      "Serial-verified parts straight from DJI — no clones, no fakes",
  },
  {
    icon: Package,
    title: "10,000+ Parts In Stock",
    description: "Props, batteries, cameras, motors, ESCs — ready to ship now",
  },
  {
    icon: Headphones,
    title: "Pilot-to-Pilot Support",
    description:
      "Real drone experts on chat & phone — 7 days a week, instant help",
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
    <section className="py-20 mx-auto max-w-7xl px-6 lg:px-8">
      {/* Optional subtle header (you can remove if you want ultra-minimal) */}
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          Why Pilots Choose Us
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Fast. Real. Built for people who actually fly.
        </p>
      </div>

      {/* Clean 4-column horizontal layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
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
              className="group flex items-start gap-6 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon Circle */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-lg">
                <Icon className="h-8 w-8" strokeWidth={2.2} />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg leading-tight">
                  {reason.title}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
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
