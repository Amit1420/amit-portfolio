import type { NextConfig } from "next";

const sections = ['about','skills','experience','projects','awards','appreciation','contact']

const nextConfig: NextConfig = {
  async rewrites() {
    return sections.map(id => ({
      source: `/${id}`,
      destination: '/',
    }))
  },
}

export default nextConfig;
