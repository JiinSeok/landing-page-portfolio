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
  // TappyType 랜딩은 tappytype.com으로 이전됨 — 예전 링크(이력서 등) 보호용 영구 리다이렉트
  async redirects() {
    return [
      { source: '/tappytype', destination: 'https://tappytype.com/', permanent: true },
      {
        source: '/tappytype/:path*',
        destination: 'https://tappytype.com/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
