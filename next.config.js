const path = require('path');

/** @type {import('next').NextConfig} */
const rewrites = async () => {
  return [
    {
      source: '/login/:path*',
      destination: 'https://dev-api.logeetrans.com/:path*',
    },
    {
      source: '/api/user/:path*',
      destination: 'https://dev-api.ecologee.id/:path*',
    },
  ];
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    basicToken: process.env.BASIC_TOKEN,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  rewrites,
};

module.exports = nextConfig;
