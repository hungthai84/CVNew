import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.scena.ai" },
    ],
  },
};

export default nextConfig;
