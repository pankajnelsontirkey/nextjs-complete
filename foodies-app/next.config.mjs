/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.35'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.S3_HOSTNAME,
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
