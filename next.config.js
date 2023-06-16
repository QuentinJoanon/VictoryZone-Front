/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.slack.com',
        port: '',
        pathname: '/files-pri',
      },
    ],
  },
};

module.exports = nextConfig;
