/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    // تفعيل تحسين الصور لتقليل الحجم تلقائياً
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qahwajie-alriyadh.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.qahwajie-alriyadh.com',
        pathname: '/**',
      },
    ],
    // أحجام الصور المستجيبة - محسنة لتقليل الحجم
    deviceSizes: [380, 480, 640, 750, 828, 1080],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // تقليل جودة الصور قليلاً للأداء الأفضل
    minimumCacheTTL: 31536000,
    formats: ['image/webp'],
  },
  // تحسين Performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // إزالة polyfills غير ضرورية للمتصفحات الحديثة
  swcMinify: true,
  // تحسين الحزم
  experimental: {
    optimizePackageImports: ['react-hot-toast', 'date-fns', 'date-fns-jalali'],
  },
  // تقليل حجم JavaScript
  modularizeImports: {
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
  },
  // Headers للتخزين المؤقت
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

