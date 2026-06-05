/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // Vercel에서는 불필요
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // TappyType 정적 랜딩(public/tappytype/) — /tappytype 클린 URL 제공
  async rewrites() {
    return [{ source: '/tappytype', destination: '/tappytype/index.html' }]
  },
}

module.exports = nextConfig
