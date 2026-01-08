import type { NextConfig } from 'next';

import path from 'path';

const nextConfig: NextConfig = {
  // Disable Next.js ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS?.split(','),
  },
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;
