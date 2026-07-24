import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.16"],

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.1.42:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;