// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/_next/static/:path*',
                destination: '/_next/static/:path*',
            },
            {
                source: '/static/:path*',
                destination: '/static/:path*',
            },
        ]
    },
}

module.exports = nextConfig