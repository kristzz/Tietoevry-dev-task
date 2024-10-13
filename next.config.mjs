/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.ggpht.com',
        },
        {
          protocol: 'https',
          hostname: '**.googleusercontent.com',
        },
      ],
    },
  };
  
  export default nextConfig;
  