/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    instrumentationHook: process.env.NEXT_PUBLIC_API_MOCKING === "enabled",
  },
  env: {
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
  },
  transpilePackages: ["@opensystemslab/map"],
};

export default nextConfig;
