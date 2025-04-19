import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**', 
      },
      // Add your localhost configuration
      {
        protocol: 'http', // Use http for localhost
        hostname: 'localhost', // Add localhost for local dev
        port: '4000', // Specify the port
        pathname: '/uploads/**', // Path to your image uploads
      },
    ],
  },
};

export default nextConfig;
