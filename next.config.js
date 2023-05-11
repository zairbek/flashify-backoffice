/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
}

module.exports = nextConfig
