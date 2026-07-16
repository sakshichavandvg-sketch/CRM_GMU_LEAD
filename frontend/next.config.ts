import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.1.53:8080/api/:path*', // Forward to your Gateway
      },
    ]
  },
};
export default nextConfig;