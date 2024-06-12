import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  reactStrictMode: true,
  images: {
    domains: ['music-shop-client.netlify.app'],
  },
  assetPrefix: isProduction ? 'https://music-shop-client.netlify.app/' : '',
};