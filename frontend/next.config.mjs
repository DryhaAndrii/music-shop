/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  basePath: '',
  assetPrefix: '',
  images: {
    domains: ['https://music-shop-client.netlify.app/'],
  },
};

export default nextConfig;

