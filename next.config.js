/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: { domains: ['localhost'] },
  rewrites() {
    return [{ source: '/i/:path*', destination: '/api/image/:path*' }]
  },
}

module.exports = nextConfig
