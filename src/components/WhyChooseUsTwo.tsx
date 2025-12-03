// components/WhyChooseUsOne.tsx  (renamed so you can keep all three variants)
"use client";

import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Package,
  HeadphonesIcon,
  Rocket,
} from "lucide-react";

const reasons = [
  {
    icon: Rocket,
    title: "Same-Day Shipping",
    description:
      "Order before 3 PM — your DJI parts ship today, anywhere in the world",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine DJI Parts",
    description:
      "Directly sourced from DJI — serial numbers verified, no fakes ever",
  },
  {
    icon: Package,
    title: "10,000+ Parts In Stock",
    description: "Props, batteries, cameras, motors, ESCs — ready to ship now",
  },
  {
    icon: HeadphonesIcon,
    title: "DJI Expert Support",
    description:
      "Drone pilots helping drone pilots — live chat & phone 7 days a week",
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

export default function WhyChooseUsTwo() {
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
            Why Drone Pilots Choose Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Fast. Authentic. Obsessed with keeping you in the air.
          </p>
        </motion.div>

        {/* Compact 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="group flex lg:flex-col items-start lg:items-center gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-xl hover:ring-primary/30 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                  <Icon className="h-7 w-7" strokeWidth={2.2} />
                </div>

                {/* Text */}
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-lg leading-tight">
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
      </div>
    </section>
  );
}
