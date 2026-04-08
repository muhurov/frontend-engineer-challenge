import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // Использовать 308 (постоянный) редирект
      },
    ];
  },
};

export default nextConfig;
