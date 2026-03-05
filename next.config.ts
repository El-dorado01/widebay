import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows ANY https hostname
      },
      {
        protocol: 'http',
        hostname: '**', // Optional: allow http (not recommended for production)
      },
    ],
  }
};

export default nextConfig;
