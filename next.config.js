/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 允许 Edge Function 直接返回 SVG
  async headers() {
    return [
      {
        source: '/api/badge/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, s-maxage=3600' },
          { key: 'Content-Type', value: 'image/svg+xml; charset=utf-8' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
