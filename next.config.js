// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true  // enables the App Router ("/app" folder)
  },
  // (No basePath or rewrites needed since this is standalone)
};

module.exports = nextConfig;
