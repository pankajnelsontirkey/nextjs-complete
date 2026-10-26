/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
    qualities: [25, 50, 75]
  },
  reactCompiler: true
};

export default nextConfig;
