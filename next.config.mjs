const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: process.env.NEXT_PUBLIC_API_MOCKING === "enabled",
  },
  env: {
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
  },
};

console.log(
  "Instrumentation Hook Enabled:",
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled",
);

export default nextConfig;
