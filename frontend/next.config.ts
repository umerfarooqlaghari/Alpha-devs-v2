import type { NextConfig } from "next";
import path from "path";

const frontendRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  reactCompiler: false,
  outputFileTracingRoot: frontendRoot,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
    ],
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: process.env.NEXT_PUBLIC_API_URL 
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
            : 'http://localhost:3001/api/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
