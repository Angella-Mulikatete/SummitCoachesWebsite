/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ❌ REMOVE swcMinify (automatically enabled)
  // swcMinify: true,

  compress: true,
  poweredByHeader: false,

  experimental: {
    // ❌ REMOVE this:
    // optimizeCss: true,
    // optimizePackageImports: ["lucide-react", "framer-motion"],

    // ✔ Correct location (Next.js 15 uses turbo)
    turbo: {
      resolveAlias: {
        "lucide-react": ["lucide-react"],
        "framer-motion": ["framer-motion"],
      },
      optimizeCss: true,
    },
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-PROTECTION", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://admin.summitcoachesug.com/api/v1/:path*',
      },
    ]
  },
};

export default nextConfig;
