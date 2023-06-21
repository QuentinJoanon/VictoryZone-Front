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
        hostname: 'projet-14-victory-zone-back-production.up.railway.app',
        //port: '',
        //pathname: '',
      },
      {
        protocol: 'https',
        hostname: 'fr.wikipedia.org',
        //port: '',
        //pathname: '',
      },
    ],
  },
};

module.exports = nextConfig;
