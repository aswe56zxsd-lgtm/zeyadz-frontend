import './globals.css';

export const metadata = {
  metadataBase: new URL('https://qahwajiz.com'),
  title: 'قهوجي الرياض | أفضل قهوجيين وصبابين للمناسبات والحفلات - 0532637955',
  description: 'قهوجي الرياض - أفضل خدمات قهوجيين وصبابين للمناسبات والحفلات. قهوجي وصباب محترف للأعراس والمؤتمرات. احجز الآن 0532637955',
  keywords: 'قهوجي الرياض, قهوجيين الرياض, صبابين الرياض, قهوجي وصباب, صبابات قهوة, مباشرين قهوة, قهوجيين وصبابين بالرياض, أرقام قهوجيين, قهوجي للمناسبات, صباب قهوة الرياض',
  authors: [{ name: 'قهوجي الرياض' }],
  creator: 'قهوجي الرياض',
  publisher: 'قهوجي الرياض',
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: false,
  },
  openGraph: {
    title: 'قهوجي الرياض | أفضل قهوجيين وصبابين للمناسبات - 0532637955',
    description: 'أفضل خدمات قهوجيين وصبابين للمناسبات والحفلات في الرياض. خبرة 20 عاماً. احجز الآن!',
    url: 'https://qahwajiz.com',
    siteName: 'قهوجي الرياض',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'قهوجي الرياض - قهوجيين وصبابين',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'قهوجي الرياض | قهوجيين وصبابين للمناسبات',
    description: 'أفضل خدمات قهوجيين وصبابين للمناسبات والحفلات في الرياض',
    images: ['/og-image.png'],
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
    canonical: 'https://qahwajiz.com',
    languages: {
      'ar-SA': 'https://qahwajiz.com',
    },
  },
  verification: {
    google: 'verification_token',
  },
  category: 'خدمات',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8305a5',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://qahwajiz.com/#business",
        "name": "قهوجي الرياض",
        "alternateName": "قهوجيين وصبابين الرياض",
        "description": "أفضل خدمات قهوجيين وصبابين للمناسبات والحفلات في الرياض. خبرة تزيد عن 20 عاماً في الضيافة العربية الأصيلة.",
        "url": "https://qahwajiz.com",
        "telephone": "+966532637955",
        "priceRange": "$$",
        "image": "https://qahwajiz.com/og-image.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "الرياض",
          "addressRegion": "الرياض",
          "addressCountry": "SA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "24.7136",
          "longitude": "46.6753"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "areaServed": {
          "@type": "City",
          "name": "الرياض"
        },
        "serviceType": ["قهوجي", "صبابين", "ضيافة", "خدمات مناسبات"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "500"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://qahwajiz.com/#website",
        "url": "https://qahwajiz.com",
        "name": "قهوجي الرياض",
        "description": "أفضل خدمات قهوجيين وصبابين الرياض",
        "publisher": {
          "@id": "https://qahwajiz.com/#business"
        },
        "inLanguage": "ar-SA"
      },
      {
        "@type": "WebPage",
        "@id": "https://qahwajiz.com/#webpage",
        "url": "https://qahwajiz.com",
        "name": "قهوجي الرياض | أفضل قهوجيين وصبابين للمناسبات",
        "isPartOf": {
          "@id": "https://qahwajiz.com/#website"
        },
        "about": {
          "@id": "https://qahwajiz.com/#business"
        },
        "description": "أفضل خدمات قهوجيين وصبابين للمناسبات والحفلات في الرياض",
        "inLanguage": "ar-SA"
      },
      {
        "@type": "Service",
        "name": "خدمات قهوجيين وصبابين الرياض",
        "provider": {
          "@id": "https://qahwajiz.com/#business"
        },
        "serviceType": "خدمات ضيافة ومناسبات",
        "areaServed": "الرياض",
        "description": "خدمات قهوجيين وصبابين محترفين للمناسبات والحفلات والأعراس في الرياض"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "ما هي أسعار خدمات قهوجيين وصبابين؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "تختلف الأسعار حسب نوع المناسبة وعدد الضيوف والخدمات المطلوبة. اتصل بنا على 0532637955 للحصول على عرض سعر مفصل."
            }
          },
          {
            "@type": "Question",
            "name": "هل تقدمون خدمة قهوجيات للمناسبات النسائية؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، نوفر قهوجيات الرياض وصبابات الرياض المحترفات للمناسبات النسائية."
            }
          },
          {
            "@type": "Question",
            "name": "ما المناطق التي تغطونها في الرياض؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نغطي جميع أحياء ومناطق الرياض وضواحيها: شمال الرياض، جنوب الرياض، شرق الرياض، غرب الرياض."
            }
          },
          {
            "@type": "Question",
            "name": "هل يمكن حجز الخدمة في نفس اليوم؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، نوفر خدمة الحجز الفوري حسب التوفر."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <meta name="version" content="3.1.0" />
        <meta httpEquiv="cache-control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="pragma" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-[#333333]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[9999] focus:bg-[#8305a5] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8305a5]"
        >
          تخطي للمحتوى الرئيسي
        </a>
        <main id="main-content" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
