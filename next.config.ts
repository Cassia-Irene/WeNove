import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// allow example.com and imgur.com images
module.exports = {
  images: {
    remotePatterns: [
      new URL('https://example.com/images/**'),
      new URL('https://imgur.com/**'),
      new URL('https://example.com'),
    ],
  },
}