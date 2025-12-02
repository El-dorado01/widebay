// components/CustomerLogos.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const customers = [
  { name: "Delta Air Lines", logo: "/customers/hawaiian.svg" },
  { name: "FedEx Express", logo: "/customers/air-arabia.svg" },
  { name: "Lufthansa Technik", logo: "/customers/fly-dubai.svg" },
  { name: "Emirates", logo: "/customers/emirates.svg" },
  { name: "American Airlines", logo: "/customers/american.svg" },
  { name: "UPS Airlines", logo: "/customers/jet-blue.svg" },
  { name: "Qatar Airways", logo: "/customers/qatar.svg" },
  { name: "Singapore Airlines", logo: "/customers/singapore.svg" },
  { name: "Air France KLM", logo: "/customers/polish.svg" },
  { name: "DHL Aviation", logo: "/customers/united.svg" },
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

const logoVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function CustomerLogos() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Trusted by the World&apos;s Leading Airlines & MROs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From scheduled maintenance to critical AOG — we keep fleets flying.
          </p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 items-center justify-items-center"
        >
          {customers.map((customer) => (
            <motion.div
              key={customer.name}
              variants={logoVariants}
              className="group relative"
              title={customer.name}
            >
              <div className="relative h-20 w-48 px-6 flex items-center justify-center">
                {/* Grayscale → Color on hover */}
                <Image
                  src={customer.logo}
                  alt={customer.name}
                  width={180}
                  height={60}
                  className="max-h-16 w-auto object-contain transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
                {/* Subtle shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground">
            Serving over{" "}
            <span className="font-semibold text-foreground">
              200 airlines and MRO facilities
            </span>{" "}
            across{" "}
            <span className="font-semibold text-foreground">6 continents</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
