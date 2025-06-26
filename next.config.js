/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Moved optimizeFonts to the correct top-level position
  optimizeFonts: false, // Prevents Next.js from fetching Google Fonts at build time

  experimental: {
    // Removed optimizeFonts from here
  },

  images: {
    domains: ['stgs3yourpass.fra1.digitaloceanspaces.com',
      's3-alpha-sig.figma.com',
      'thumbs.dreamstime.com',
      'd2v5dzhdg4zhx3.cloudfront.net',
      'mysstore.fra1.digitaloceanspaces.com',
      'lectera.com',
      'images.unsplash.com', 
      'plus.unsplash.com', 
      'example.com',  
      'res.cloudinary.com',
      'encrypted-tbn0.gstatic.com'
    ],
  },

  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  trailingSlash: true,

  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

};

module.exports = nextConfig;
