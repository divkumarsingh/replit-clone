import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["esbuild"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replit.com",
        pathname: "/cdn-cgi/image/**"
      }
    ]
  }
};

export default nextConfig;
