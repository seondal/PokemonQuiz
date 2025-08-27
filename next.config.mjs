/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
