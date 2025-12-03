// components/Footer.tsx
"use client";

import { 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  ShieldCheck,
  Zap,
  Package,
  Headphones,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-slate-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-3">
          {/* Column 1 – Logo + Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black text-white">W</span>
              </div>
              <span className="text-2xl font-black tracking-tight">
                Widebay
              </span>
            </div>
            <p className="text-slate-400 max-w-xs leading-relaxed">
              The world&apos;s fastest source for genuine DJI spare parts. From
              creators to enterprise — we keep you flying.
            </p>

            {/* Trust badges */}
            <div className="flex flex-col items-start gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <ShieldCheck className="h-5 w-5 min-w-5 text-emerald-400" />
                <span className="text-sm font-medium">DJI Authorized</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Zap className="h-5 w-5 min-w-5 text-yellow-400" />
                <span className="text-sm font-medium">Same-Day Shipping</span>
              </div>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div className="flex flex-col items-start lg:items-center justify-center">
            <h3 className="font-bold text-lg mb-5">Shop</h3>
            <ul className="space-y-3 text-slate-300">
              {[
                "Mavic Series",
                "Air Series",
                "Mini Series",
                "FPV & Avata",
                "Enterprise",
                "All Parts",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-white transition flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Support */}
          <div className="flex flex-col items-start lg:items-center justify-center">
            <h3 className="font-bold text-lg mb-5">Support</h3>
            <ul className="space-y-3 text-slate-300">
              {[
                "Contact Us",
                "Shipping Info",
                "Returns & Warranty",
                "Serial Verification",
                "Live Chat",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-white transition flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Company */}
          <div className="flex flex-col items-start lg:items-center justify-center">
            <h3 className="font-bold text-lg mb-5">Company</h3>
            <ul className="space-y-3 text-slate-300">
              {[
                "About Us",
                "Careers",
                "Press Kit",
                "Partners",
                "Blog",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-white transition flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 – Contact & Social */}
          <div className="lg:col-span-1 flex flex-col items-start lg:items-center justify-center">
            <h3 className="font-bold text-lg mb-5">We&apos;re Here 24/7</h3>
            <div className="space-y-5 text-slate-300">
              <div className="flex items-center gap-3">
                <Headphones className="h-6 w-6 min-w-6 text-primary" />
                <div>
                  <p className="font-medium text-white">Live Chat & Phone</p>
                  <p className="text-sm">
                    Instant support — pilots helping pilots
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <a
                  href="mailto:support@widebay.com"
                  className="hover:text-white"
                >
                  support@widebay.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-primary" />
                <p>Track your order</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 min-w-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2025 Widebay DJI Parts Pro™ • All rights reserved</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}