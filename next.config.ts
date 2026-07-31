import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore - Next.js 16+ dev origin security config
  allowedDevOrigins: ['192.168.56.1', 'localhost:3000'],
  /* config options here */
};

export default nextConfig;
