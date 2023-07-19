/**
 
@type {import('next').NextConfig}*/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        //port: '',
        //pathname: '',
      },
      {
        protocol: 'https',
        hostname: 'esport-website-backend-production.up.railway.app',
        //port: '',
        //pathname: '',
      },
      {
        protocol: 'https',
        hostname: 'fr.wikipedia.org',
        //port: '',
        //pathname: '',
      },
      {
        protocol: 'https',
        hostname: 'fr.freepik.com',
        //port: '',
        //pathname: '',
      },
    ],
  },
};

module.exports = nextConfig;
