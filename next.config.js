const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    eslint: { ignoreDuringBuilds: true },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
            { protocol: 'https', hostname: 'cdn.simpleicons.org' },
            { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
            { protocol: 'https', hostname: 'github.com' },
        ],
        dangerouslyAllowSVG: true,
    },
    // Include content directory in transpilation
    transpilePackages: ['content'],
    // Add content directory to webpack resolve modules
    webpack: (config) => {
        config.resolve.modules.push(path.resolve('./content'))
        return config
    },
}

module.exports = nextConfig
