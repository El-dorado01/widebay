// components/FeaturedProducts.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Mavic 3 Pro Intelligent Flight Battery",
    price: 209,
    originalPrice: 249,
    discount: 16,
    image: "/products/battery.webp",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    name: "Mini 4 Pro Gimbal Camera Assembly",
    price: 679,
    originalPrice: 799,
    discount: 15,
    image: "/products/gimbal.webp",
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: 3,
    name: "DJI Air 3 Low-Noise Propellers (Pair)",
    price: 12,
    originalPrice: 19,
    discount: 37,
    image: "/products/air-props.png",
    badge: "37% OFF",
    inStock: true,
  },
  {
    id: 4,
    name: "DJI FPV Goggles V2 + Motion Controller",
    price: 549,
    originalPrice: 699,
    discount: 21,
    image: "/products/fpv.jpg",
    badge: null,
    inStock: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function FeaturedProducts() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-foreground">
            Featured Deals Right Now
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Genuine DJI parts • Limited-time discounts • Ships today
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <Link href={`/product/${product.id}`} className="block">
                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                      <Zap className="h-4 w-4" />-{product.discount}%
                    </span>
                  </div>
                )}

                {/* Best Seller / Hot Deal Badge */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-square bg-linear-to-br from-slate-100 to-slate-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-foreground line-clamp-2 group-hover:text-primary transition">
                    {product.name}
                  </h3>

                  {/* Pricing */}
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-black text-foreground">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="mt-5 w-full rounded-full bg-primary py-4 text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-lg hover:shadow-xl">
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link href="/deals">
            <button className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              View All Deals
              <ArrowRight className="h-6 w-6" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
