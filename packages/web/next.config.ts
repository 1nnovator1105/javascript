import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@monorepo/shared": path.resolve(__dirname, "../shared/dist"),
    };
    return config;
  },
};

export default nextConfig;
