import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  metadataBase: new URL('https://qahwajie-alriyadh.com'),
  title: 'قهوجيين وصبابين الرياض | أفضل خدمات القهوجي والصباب في الرياض',
  description: 'قهوجيين وصبابين الرياض - نقدم أفضل خدمات القهوجي والصباب لجميع المناسبات والحفلات والأعراس. قهوجي الرياض، صبابين قهوة، مباشرين قهوة عربية أصيلة. احجز الآن 0509702164',
  keywords: 'قهوجي الرياض, قهوجيين وصبابين الرياض, صبابين قهوة, مباشرين قهوة, قهوجي للحفلات, صبابات قهوة الرياض, أرقام قهوجيين بالرياض, أفضل قهوجي بالرياض, قهوجي, صباب قهوة, خدمات ضيافة الرياض, قهوة عربية, مباشرين حفلات',
  authors: [{ name: 'قهوجيين وصبابين الرياض' }],
  creator: 'قهوجيين وصبابين الرياض',
  publisher: 'قهوجيين وصبابين الرياض',
  openGraph: {
    title: 'قهوجيين وصبابين الرياض | أفضل خدمات القهوجي والصباب',
    description: 'نقدم أفضل خدمات القهوجي والصباب في الرياض لجميع المناسبات والحفلات والأعراس. احجز الآن 0509702164',
    url: 'https://qahwajie-alriyadh.com',
    siteName: 'قهوجيين وصبابين الرياض',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: 'https://qahwajie-alriyadh.com/uploads/images/1.webp',
        width: 1200,
        height: 630,
        alt: 'قهوجيين وصبابين الرياض',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'قهوجيين وصبابين الرياض | أفضل قهوجي في الرياض',
    description: 'أفضل خدمات القهوجي والصباب في الرياض لجميع المناسبات. احجز الآن!',
    images: ['https://qahwajie-alriyadh.com/uploads/images/1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://qahwajie-alriyadh.com',
  },
  verification: {
    google: '2Caiv0YqsLOtKjgh8KfY9p8Adw0m3rO_3ih-VxQdVoo',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#c59a35" />
        <link rel="icon" href="/favicon.ico" />
        {/* Preconnect للصور - مهم جداً لتسريع LCP */}
        <link rel="preconnect" href="https://qahwajie-alriyadh.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.qahwajie-alriyadh.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://qahwajie-alriyadh.com" />
        <link rel="dns-prefetch" href="https://www.qahwajie-alriyadh.com" />
        {/* Preload LCP image - High Priority */}
        <link
          rel="preload"
          href="https://qahwajie-alriyadh.com/uploads/images/1.webp"
          as="image"
          type="image/webp"
          fetchpriority="high"
        />
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/TheYearofHandicrafts-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/TheYearofHandicrafts-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Schema.org للأعمال المحلية - مهم جداً لـ SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "قهوجيين وصبابين الرياض",
              "alternateName": "قهوجي الرياض",
              "description": "أفضل خدمات القهوجي والصباب في الرياض لجميع المناسبات والحفلات والأعراس. نقدم القهوة العربية الأصيلة بأيدي خبراء محترفين.",
              "url": "https://qahwajie-alriyadh.com",
              "telephone": "+966509702164",
              "email": "info@qahwajie-alriyadh.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "الرياض",
                "addressLocality": "الرياض",
                "addressRegion": "منطقة الرياض",
                "postalCode": "12345",
                "addressCountry": "SA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "24.7136",
                "longitude": "46.6753"
              },
              "image": "https://qahwajie-alriyadh.com/uploads/images/1.webp",
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "08:00",
                "closes": "23:00"
              },
              "sameAs": [
                "https://wa.me/966509702164"
              ],
              "areaServed": {
                "@type": "City",
                "name": "الرياض"
              },
              "serviceType": ["قهوجي", "صباب قهوة", "خدمات ضيافة", "قهوة عربية"],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[9999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
          تخطي للمحتوى الرئيسي
        </a>
        <AuthProvider>
          <main id="main-content">
            {children}
          </main>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: 'Handicrafts, Segoe UI, Tahoma, Arial, sans-serif',
              },
            }}
          />
        </AuthProvider>
        {/* Clixtell - حماية من النقرات الوهمية - قبل إغلاق body */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var script=document.createElement('script');
              var prefix=document.location.protocol;
              script.async=true;script.type='text/javascript';
              var target=prefix + '//scripts.clixtell.com/track.js';
              script.src=target;var elem=document.head;
              elem.appendChild(script);
            `
          }}
        />
        <noscript>
          <img src="//tracker.clixtell.com/track/t.gif" alt="" />
        </noscript>
      </body>
    </html>
  );
}
