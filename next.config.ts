import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { esmExternals: 'loose' },
  transpilePackages: ['framer-motion'],
};

export default nextConfig;
