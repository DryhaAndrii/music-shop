/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '',
  assetPrefix: '',
  images: {
    domains: ['https://music-shop-client.netlify.app/'],
  },
};

export default nextConfig;

