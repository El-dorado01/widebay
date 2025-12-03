// components/Testimonials.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Crashed my Mavic 3 Pro on a paid shoot — they overnighted a new gimbal camera from stock. Saved a $25k job. Absolute legends.",
    author: "Alex Rivera",
    role: "Commercial Drone Pilot & Cinematographer",
    company: "Netflix Originals",
    logo: "/customers/cinema-pro.jpg",
  },
  {
    quote:
      "We run 200+ Matrice 350s for power line inspection. Their same-day battery and motor shipping has literally never let us down.",
    author: "Dr. Emma Chen",
    role: "Head of Drone Operations",
    company: "Southern California Edison",
    logo: "/customers/surveyor.png",
  },
  {
    quote:
      "Needed a Mini 4 Pro camera assembly at 3 AM for a sunrise real estate shoot. Live chat answered in 30 seconds, part shipped in 20 minutes. Mind blown.",
    author: "Jordan Lee",
    role: "Real Estate & FPV Pilot",
    company: "Featured on YouTube (1.2M subs)",
    logo: "/customers/dji-creator.jpg",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-foreground">
            Loved by Pilots Worldwide
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            From Hollywood cinematographers to enterprise fleets — here&apos;s why
            they trust us when the shot (or job) depends on it.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-border hover:shadow-2xl hover:ring-primary/20 transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                  <Quote className="h-8 w-8 rotate-180" />
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-8 text-lg leading-relaxed text-foreground/85 italic font-medium">
                “{t.quote}”
              </blockquote>

              {/* Author */}
              <div className="mt-10 flex items-center gap-5">
                <div className="h-16 w-16 min-w-16 rounded-full bg-muted/70 flex items-center justify-center overflow-hidden shadow-md">
                  <Image
                    src={t.logo}
                    alt={t.company}
                    width={60}
                    height={60}
                    className="h-full w-full min-w-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">
                    {t.author}
                  </p>
                  <p className="text-sm text-muted-foreground leading-tight">
                    {t.role}
                    <br />
                    <span className="font-medium text-foreground/90">
                      {t.company}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-3xl font-black text-foreground">
            4.9/5 Average Rating • 8,400+ Verified Reviews
          </p>
          <p className="text-muted-foreground mt-2">
            From pilots in 120+ countries
          </p>
        </motion.div>
      </div>
    </section>
  );
}
