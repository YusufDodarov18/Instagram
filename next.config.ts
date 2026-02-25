import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["your-api-domain.com"],
    domains: [
      "37.27.29.18",
      "instagram-api.softclub.tj",
      "http://37.27.29.18:8003/images",
      "https://instagram-api.softclub.tj",
    ],
  },
};

export default nextConfig;
