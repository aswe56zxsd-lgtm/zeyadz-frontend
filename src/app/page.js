'use client';

import { useState, useEffect, useCallback } from 'react';

// SVG Icons Components
const CoffeeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 21V19H20V21H2ZM20 8V5H18V8H20ZM20 3C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V8C22 8.53043 21.7893 9.03914 21.4142 9.41421C21.0391 9.78929 20.5304 10 20 10H18V13C18 14.0609 17.5786 15.0783 16.8284 15.8284C16.0783 16.5786 15.0609 17 14 17H6C4.93913 17 3.92172 16.5786 3.17157 15.8284C2.42143 15.0783 2 14.0609 2 13V3H20ZM16 5H4V13C4 13.5304 4.21071 14.0391 4.58579 14.4142C4.96086 14.7893 5.46957 15 6 15H14C14.5304 15 15.0391 14.7893 15.4142 14.4142C15.7893 14.0391 16 13.5304 16 13V5Z"/>
  </svg>
);

const TeapotIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4C14.21 4 16 5.79 16 8H17C18.1 8 19 8.9 19 10V11C19 12.1 18.1 13 17 13H16V14C16 16.21 14.21 18 12 18H8C5.79 18 4 16.21 4 14V8C4 5.79 5.79 4 8 4H12ZM8 6C6.9 6 6 6.9 6 8V14C6 15.1 6.9 16 8 16H12C13.1 16 14 15.1 14 14V8C14 6.9 13.1 6 12 6H8ZM17 10H16V11H17V10ZM20 6V8H22V6H20ZM20 16H22V14H20V16ZM20 12H22V10H20V12Z"/>
  </svg>
);

const SparkleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2ZM19 13L19.74 16.26L23 17L19.74 17.74L19 21L18.26 17.74L15 17L18.26 16.26L19 13ZM5 17L5.74 19.26L8 20L5.74 20.74L5 23L4.26 20.74L2 20L4.26 19.26L5 17Z"/>
  </svg>
);

const PhoneIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const StarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

const TargetIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"/>
  </svg>
);

const TrophyIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2C18.5 2 19 2.5 19 3V7C19 9.21 17.21 11 15 11H14.65C14.2 12.72 12.73 14 11 14H10V16H13V22H7V16H10V14H9C7.27 14 5.8 12.72 5.35 11H5C2.79 11 1 9.21 1 7V3C1 2.5 1.5 2 2 2H6V0H14V2H18ZM6 4H3V7C3 8.1 3.9 9 5 9H6V4ZM14 9H6V4H14V9ZM17 4H14V9H15C16.1 9 17 8.1 17 7V4Z"/>
  </svg>
);

const TieIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2L8 4L6 6L8 9L12 22L16 9L18 6L16 4L18 2H6ZM9.88 4H14.12L13.12 5.5L14 7.2L12 14.1L10 7.2L10.88 5.5L9.88 4Z"/>
  </svg>
);

const TrayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 17H22V19H2V17ZM4 14H20C20.55 14 21 14.45 21 15V16H3V15C3 14.45 3.45 14 4 14ZM6.5 6C7.33 6 8 6.67 8 7.5C8 8.33 7.33 9 6.5 9C5.67 9 5 8.33 5 7.5C5 6.67 5.67 6 6.5 6ZM6.5 4C4.57 4 3 5.57 3 7.5C3 9.43 4.57 11 6.5 11C8.43 11 10 9.43 10 7.5C10 5.57 8.43 4 6.5 4ZM17.5 6C18.33 6 19 6.67 19 7.5C19 8.33 18.33 9 17.5 9C16.67 9 16 8.33 16 7.5C16 6.67 16.67 6 17.5 6ZM17.5 4C15.57 4 14 5.57 14 7.5C14 9.43 15.57 11 17.5 11C19.43 11 21 9.43 21 7.5C21 5.57 19.43 4 17.5 4ZM12 6C12.83 6 13.5 6.67 13.5 7.5C13.5 8.33 12.83 9 12 9C11.17 9 10.5 8.33 10.5 7.5C10.5 6.67 11.17 6 12 6ZM12 4C10.07 4 8.5 5.57 8.5 7.5C8.5 9.43 10.07 11 12 11C13.93 11 15.5 9.43 15.5 7.5C15.5 5.57 13.93 4 12 4Z"/>
  </svg>
);

const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Helper function to render icons by name
const renderIcon = (iconName, className = "w-6 h-6") => {
  const icons = {
    coffee: <CoffeeIcon className={className} />,
    teapot: <TeapotIcon className={className} />,
    sparkle: <SparkleIcon className={className} />,
    phone: <PhoneIcon className={className} />,
    star: <StarIcon className={className} />,
    target: <TargetIcon className={className} />,
    trophy: <TrophyIcon className={className} />,
    tie: <TieIcon className={className} />,
    tray: <TrayIcon className={className} />,
    whatsapp: <WhatsAppIcon className={className} />,
    check: <CheckIcon className={className} />,
    chevronDown: <ChevronDownIcon className={className} />,
  };
  return icons[iconName] || null;
};

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Dynamic data states
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false); // Start with false to show default content immediately

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/homepage`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        setPageData(data.data);
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      // On error, page will continue showing default data
    }
  }, [API_URL]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Default/fallback data
  const defaultServices = [
    {
      title: 'قهوجي وصباب الرياض للرجال',
      desc: 'يتولى فريق قهوجي وصباب الرياض تقديم القهوة العربية الأصيلة بالطريقة التقليدية المعروفة. يحرص قهوجيين الرياض على انتقاء أجود أنواع البن الخولاني واليمني، مع إضافة الهيل والزعفران لنكهة لا تُنسى.',
      icon: 'coffee'
    },
    {
      title: 'صبابين قهوة الرياض',
      desc: 'صبابين قهوة الرياض محترفون في فن صب القهوة وتقديمها للضيوف بأسلوب يعكس الأصالة والرقي. يلتزم فريق مباشرين قهوة بارتداء الزي السعودي التقليدي الأنيق من ثوب وغترة وعقال.',
      icon: 'teapot'
    },
    {
      title: 'صبابات قهوة وقهوجيات الرياض',
      desc: 'نوفر صبابات قهوة وقهوجيات الرياض للحفلات والمناسبات النسائية. تتميز صبابات الرياض بالاحترافية والحشمة التامة في التعامل مع الضيفات الكريمات.',
      icon: 'sparkle'
    }
  ];

  const defaultFeatures = [
    { icon: 'star', text: 'خبرة +20 عاماً في الضيافة' },
    { icon: 'target', text: 'قهوجيين بالرياض مدربين' },
    { icon: 'coffee', text: 'أجود أنواع البن الخولاني' },
    { icon: 'trophy', text: 'فناجين كريستال فاخرة' },
    { icon: 'tie', text: 'الزي التقليدي الأنيق' },
    { icon: 'tray', text: 'صواني تقديم مذهبة' }
  ];

  const defaultEvents = [
    'حفلات الزفاف والأعراس',
    'مجالس العزاء',
    'حفلات التخرج',
    'المؤتمرات والاجتماعات الرسمية',
    'الولائم والعزائم العائلية',
    'المعارض والفعاليات'
  ];

  const defaultDrinks = [
    {
      category: 'القهوة بأنواعها',
      items: ['القهوة العربية الأصيلة بالهيل والزعفران', 'القهوة التركية الفاخرة', 'الكابتشينو واللاتيه']
    },
    {
      category: 'الشاي والأعشاب',
      items: ['الشاي الأحمر والأخضر', 'شاي النعناع والليمون', 'الأعشاب الطبيعية المنوعة']
    },
    {
      category: 'المشروبات الباردة',
      items: ['العصائر الطبيعية الطازجة', 'المشروبات المثلجة المنعشة', 'الموهيتو والكوكتيلات']
    }
  ];

  const defaultFaqs = [
    { q: 'ما هي أسعار خدمات قهوجيين وصبابين بالرياض؟', a: 'تختلف الأسعار حسب نوع المناسبة وعدد الضيوف والخدمات المطلوبة. اتصل على رقم قهوجي بالرياض 0509702164 للحصول على عرض سعر مفصل من أرقام قهوجيين وصابين الرياض.' },
    { q: 'هل تقدمون خدمة قهوجيات الرياض للمناسبات النسائية؟', a: 'نعم، نوفر قهوجيات الرياض وصبابات الرياض المحترفات للمناسبات النسائية. صبابات قهوة بالحشمة والاحترافية التامة.' },
    { q: 'ما المناطق التي يغطيها قهوجيين الرياض؟', a: 'يغطي فريق قهوجي وصبابين بالرياض جميع أحياء ومناطق الرياض وضواحيها: شمال، جنوب، شرق، غرب الرياض. قهوجين وصبابين بالرياض في خدمتكم.' },
    { q: 'كيف أحصل على أرقام قهوجيين في الرياض؟', a: 'يمكنك التواصل مباشرة على أرقام قهوجيين بالرياض 0509702164. نستقبل اتصالاتكم على مدار 24 ساعة للحصول على أرقام قهوجين وترتيب موعد المناسبة.' }
  ];

  // Static data - التصميم البنفسجي الثابت
  const steps = [
    { num: '01', title: 'اتصل بنا', desc: 'تواصل على رقم قهوجي بالرياض 0509702164' },
    { num: '02', title: 'حدد التفاصيل', desc: 'نوع المناسبة وعدد الضيوف' },
    { num: '03', title: 'اختر الخدمات', desc: 'قهوجي وصبابين قهوة بالرياض' },
    { num: '04', title: 'استمتع', desc: 'قهوجيين وصبابين الرياض في خدمتكم' }
  ];

  const whyUsFeatures = [
    'قهوجي وصبابين بالرياض مدربين على أعلى مستوى من الاحترافية',
    'أجود أنواع القهوة العربية والبن الخولاني والبرازيلي',
    'قهوجي وصبابين قهوة بالرياض يقدمون الشاي بأنواعه والمشروبات الساخنة',
    'فناجين وأطقم صيني وكريستال فاخرة',
    'صواني تقديم مذهبة ومرصعة',
    'مباشرين قهوة الرياض بالزي التقليدي الأنيق'
  ];

  const hostServices = [
    'استقبال الضيوف بأسلوب راقٍ',
    'تقديم القهوة العربية والشاي والعصائر',
    'الإشراف على فريق قهوجيين وصبابين بالرياض',
    'التنسيق مع صاحب المناسبة لضمان رضا الضيوف'
  ];

  // Helper functions to get data from API or fallback to defaults
  const getSetting = (key, defaultValue = '') => {
    return pageData?.settings?.[key] || defaultValue;
  };

  // Get section content with fallback - works for any section
  const getSectionContent = (section, key, defaultValue = '') => {
    return pageData?.sections?.[section]?.content?.[key] || defaultValue;
  };

  // Get section content with fallback
  const getHeroContent = (key, defaultValue = '') => {
    return getSectionContent('hero', key, defaultValue);
  };

  // Dynamic data with fallbacks - الألوان ثابتة (#8305A5 و #F17405)
  // Priority: sections.hero.content (from admin panel) > settings > default
  const phoneNumber = getHeroContent('phone', '') || getSetting('phone_number', '0509702164');
  const siteName = getHeroContent('site_name', '') || getSetting('site_name', 'قهوجي الرياض');
  const siteSlogan = getHeroContent('site_slogan', '') || getSetting('site_slogan', 'قهوجيين وصبابين الرياض');
  const whatsappNumber = getHeroContent('whatsapp', '') || getSetting('whatsapp_number', '966509702164');
  const heroBadge = getHeroContent('badge', 'أفضل قهوجي بالرياض - قهوجيين وصبابين');
  const heroStats = getHeroContent('stats', null);

  // Get dynamic whyus_features and host_services from settings
  const whyUsFeaturesDynamic = pageData?.settings?.whyus_features || whyUsFeatures;
  const hostServicesDynamic = pageData?.settings?.host_services || hostServices;
  const bookingStepsDynamic = pageData?.settings?.booking_steps || steps;

  // Use API data if available, otherwise use defaults
  const displayServices = pageData?.services?.length > 0
    ? pageData.services.map(s => ({ title: s.title, desc: s.description, icon: s.icon || 'coffee' }))
    : defaultServices;

  const displayFeatures = pageData?.features?.length > 0
    ? pageData.features.map(f => ({ icon: f.icon || 'star', text: f.title }))
    : defaultFeatures;

  const displayEvents = pageData?.events?.length > 0
    ? pageData.events.map(e => e.title)
    : defaultEvents;

  const displayDrinks = pageData?.drinks && Object.keys(pageData.drinks).length > 0
    ? Object.keys(pageData.drinks).map(category => ({
        category: category,
        items: pageData.drinks[category].map(d => d.title || d.name)
      }))
    : defaultDrinks;

  const displayFaqs = pageData?.faqs?.length > 0
    ? pageData.faqs.map(f => ({ q: f.question, a: f.answer }))
    : defaultFaqs;

  const displayKeywords = pageData?.keywords?.length > 0
    ? pageData.keywords.map(k => k.keyword)
    : [];

  // Loading screen with purple theme
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8305A5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8305A5] font-bold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header - Purple Background */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-2' : 'bg-[#8305A5] py-3'}`}
        role="banner"
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl" aria-label="التنقل الرئيسي">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 sm:gap-3" aria-label="الصفحة الرئيسية - قهوجي الرياض">
              <img
                src="/images/logo.webp"
                alt="قهوجي الرياض - شعار"
                width={80}
                height={80}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              />
              <div>
                <span className={`text-base sm:text-lg md:text-xl font-bold transition-colors ${scrolled ? 'text-[#8305A5]' : 'text-white'}`}>
                  {siteName}
                </span>
                <p className={`text-[10px] sm:text-xs md:text-sm transition-colors ${scrolled ? 'text-[#666666]' : 'text-white/80'}`}>
                  {siteSlogan}
                </p>
              </div>
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className={`group flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8305A5] ${
                scrolled
                  ? 'bg-[#8305A5] text-white shadow-lg'
                  : 'bg-white text-[#8305A5] shadow-lg'
              }`}
              aria-label="اتصل للحجز: 0509702164"
            >
              <span className="hidden sm:inline">احجز الآن</span>
              <PhoneIcon className="w-4 h-4 group-hover:animate-bounce" aria-hidden="true" />
              <span className="font-bold">{phoneNumber}</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section - White Background */}
      <section className="relative flex items-center justify-center overflow-hidden bg-white pt-24 sm:pt-28 pb-8 sm:pb-12" aria-labelledby="hero-title">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#8305A5]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6" role="status" aria-live="polite">
              <span className="w-1.5 h-1.5 bg-[#F17405] rounded-full animate-pulse" aria-hidden="true"></span>
              <span className="text-[#8305A5] text-xs sm:text-sm font-semibold">{heroBadge}</span>
            </div>

            <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl font-black text-[#8305A5] mb-3 sm:mb-4 leading-tight">
              {siteName}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F17405] mb-4 sm:mb-6">
              {siteSlogan}
            </p>

            <p className="text-sm sm:text-base text-[#666666] max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              نقدم خدمات <strong className="text-[#8305A5]">قهوجي وصبابين الرياض</strong> على أعلى مستوى من الاحترافية والجودة.
              يضم فريقنا نخبة من <strong className="text-[#8305A5]">قهوجيين وصبابين بالرياض</strong> المدربين على فنون الضيافة العربية الأصيلة.
              <br className="hidden sm:block" />
              <span className="text-[#F17405] font-semibold">خبرة تزيد عن 20 عاماً</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
              <a
                href={`tel:${phoneNumber}`}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8305A5] hover:bg-[#6a0485] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8305A5]"
                aria-label="اتصل الآن على الرقم 0509702164"
              >
                <PhoneIcon className="w-5 h-5 group-hover:animate-bounce" aria-hidden="true" />
                <span>اتصل الآن: {phoneNumber}</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#8305A5] text-[#8305A5] hover:bg-[#8305A5] hover:text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8305A5]"
                aria-label="تواصل معنا عبر واتساب"
              >
                <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
                <span>واتساب</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto mt-10 sm:mt-12 px-4">
              {(heroStats || [
                { number: '+20', label: 'سنة خبرة' },
                { number: '+5000', label: 'مناسبة' },
                { number: '+50', label: 'قهوجي محترف' }
              ]).map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#F17405]">{stat.number || stat.num}</div>
                  <div className="text-[#666666] text-[10px] sm:text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - من نحن */}
      <section id="about" data-animate className="py-6 sm:py-8 lg:py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-4 sm:mb-6">
              <span className="inline-block bg-[#8305A5]/10 text-[#8305A5] px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                من نحن
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#8305A5] mb-4">
                أفضل قهوجي بالرياض
              </h2>
              <p className="text-sm sm:text-base text-[#666666] max-w-3xl mx-auto leading-relaxed">
                نحن نقدم خدمات <strong className="text-[#8305A5]">قهوجي وصبابين الرياض</strong> على أعلى مستوى من الاحترافية والجودة.
                يضم فريقنا نخبة من <strong className="text-[#8305A5]">قهوجيين وصبابين بالرياض</strong> المدربين على فنون الضيافة العربية الأصيلة،
                والذين يتميزون بالخبرة الواسعة في التعامل مع جميع أنواع المناسبات.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {displayFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="group bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-[#8305A5]/10 hover:border-[#8305A5] transition-all duration-500 transform hover:-translate-y-1 text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-[#8305A5] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-white">
                    {renderIcon(feature.icon, "w-5 h-5 sm:w-6 sm:h-6")}
                  </div>
                  <p className="text-[#333333] font-medium text-[10px] sm:text-xs">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section - لماذا نحن أفضل قهوجي في الرياض */}
      <section id="why-us" data-animate className="py-6 sm:py-8 lg:py-10 bg-[#8305A5] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
          <div className={`transition-all duration-1000 ${isVisible['why-us'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-4 sm:mb-6">
              <span className="inline-block bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                لماذا نحن
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                لماذا نحن <span className="text-[#F17405]">أفضل قهوجي في الرياض</span>؟
              </h2>
              <p className="text-sm sm:text-base text-white/90 max-w-3xl mx-auto leading-relaxed">
                عندما تبحث عن <strong className="text-[#F17405]">قهوجي وصبابين</strong> محترفين، ستجد لدينا كل ما يلزم لإنجاح مناسبتك.
                فنحن نوفر <strong className="text-[#F17405]">قهوجين</strong> ذوي خبرة تزيد عن 20 عاماً في مجال الضيافة.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {whyUsFeaturesDynamic.map((feature, i) => (
                <div
                  key={i}
                  className="group bg-white p-4 rounded-xl text-center hover:bg-[#F17405] transition-all duration-500 transform hover:-translate-y-1 shadow-md"
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-[#8305A5] group-hover:bg-white rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white group-hover:text-[#8305A5]" />
                  </div>
                  <p className="font-medium text-xs sm:text-sm text-[#8305A5] group-hover:text-white">{feature}</p>
                </div>
              ))}
            </div>

            {/* CTA inside */}
            <div className="mt-8 text-center">
              <p className="text-white/80 text-sm mb-3">للتواصل والحجز مع <strong className="text-[#F17405]">قهوجي الرياض قهوجيين وصبابين</strong></p>
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 bg-white text-[#8305A5] px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>{phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - خدمات قهوجيين وصبابين الرياض */}
      <section id="services" data-animate className="py-6 sm:py-8 lg:py-10 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className={`transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-4 sm:mb-6">
              <span className="inline-block bg-[#F17405]/10 text-[#F17405] px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                خدماتنا
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#8305A5] mb-4">
                خدمات قهوجيين وصبابين الرياض
              </h2>
              <p className="text-sm sm:text-base text-[#666666] max-w-2xl mx-auto">
                نقدم أفضل خدمات <strong className="text-[#8305A5]">قهوجي وصبابين بالرياض</strong> لجميع المناسبات
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {displayServices.map((service, i) => (
                <div
                  key={i}
                  className="group relative bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#8305A5]/10 hover:border-[#8305A5] transition-all duration-500 hover:shadow-xl overflow-hidden"
                >
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#8305A5] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white">
                      {renderIcon(service.icon, "w-6 h-6 sm:w-7 sm:h-7")}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#8305A5] mb-2">{service.title}</h3>
                    <p className="text-[#666666] leading-relaxed text-xs sm:text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Phone Numbers Section - أرقام قهوجيين وصبابين بالرياض */}
      <section id="contact-numbers" data-animate className="py-6 sm:py-8 lg:py-10 bg-[#F17405] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative">
          <div className={`transition-all duration-1000 ${isVisible['contact-numbers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-4">
              <span className="inline-block bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                تواصل معنا
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                أرقام قهوجيين وصبابين بالرياض
              </h2>
              <p className="text-sm sm:text-base text-white/90 max-w-3xl mx-auto leading-relaxed">
                هل تبحث عن <strong className="text-white">أرقام قهوجين</strong> موثوقة؟ نحن نوفر لك <strong className="text-white">أرقام قهوجيين وصابين الرياض</strong> للتواصل المباشر والحجز الفوري.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center shadow-xl">
              <p className="text-[#8305A5] font-semibold text-sm mb-3">للحجز الفوري من أرقام قهوجيين في الرياض</p>
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-3 bg-[#8305A5] text-white px-6 py-4 rounded-xl font-bold text-xl sm:text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-4"
              >
                <PhoneIcon className="w-6 h-6 animate-bounce" />
                <span>{phoneNumber}</span>
              </a>
              <p className="text-[#666666] text-xs sm:text-sm">
                نستقبل اتصالاتكم على مدار <strong className="text-[#F17405]">24 ساعة</strong> لترتيب موعد المناسبة.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-semibold text-sm mt-4 transition-all duration-300 transform hover:scale-105"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>تواصل واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - قهوجي صبابين الرياض للمناسبات */}
      <section id="events" data-animate className="py-6 sm:py-8 lg:py-10 bg-[#8305A5] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
          <div className={`transition-all duration-1000 ${isVisible.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-4 sm:mb-6">
              <span className="inline-block bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                المناسبات
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                قهوجي صبابين الرياض <span className="text-[#F17405]">للمناسبات المختلفة</span>
              </h2>
              <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
                يقدم <strong className="text-[#F17405]">قهوجي صبابين الرياض</strong> خدماتهم في جميع المناسبات
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {displayEvents.map((event, i) => (
                <div
                  key={i}
                  className="group bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl text-center hover:bg-[#F17405] transition-all duration-500 transform hover:-translate-y-1 shadow-md"
                >
                  <p className="font-medium text-xs sm:text-sm text-[#8305A5] group-hover:text-white">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Host Service - مضيف قهوة بالرياض */}
      <section id="host" data-animate className="py-6 sm:py-8 lg:py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className={`transition-all duration-1000 ${isVisible.host ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-[#8305A5]/10 text-[#8305A5] px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
                  خدمة متكاملة
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#8305A5] mb-4">
                  مضيف قهوة بالرياض
                </h2>
                <p className="text-sm sm:text-base text-[#666666] mb-6 leading-relaxed">
                  نفخر بتقديم خدمة <strong className="text-[#8305A5]">مضيف قهوة بالرياض</strong> الشاملة التي تتضمن الإشراف الكامل على الضيافة من البداية حتى النهاية.
                </p>
                <h3 className="text-base sm:text-lg font-bold text-[#8305A5] mb-3">ما يقدمه مضيف القهوة:</h3>
                <ul className="space-y-2">
                  {hostServicesDynamic.map((service, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#8305A5] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </span>
                      <span className="text-[#333333] text-xs sm:text-sm">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f8f8f8] rounded-2xl p-6 sm:p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#8305A5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CoffeeIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#8305A5] mb-3">أفضل مضيف قهوة الرياض</h3>
                  <p className="text-[#666666] text-xs sm:text-sm mb-4">
                    <strong className="text-[#8305A5]">مباشرين قهوة الرياض</strong> في خدمتكم لجميع المناسبات
                  </p>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="inline-flex items-center gap-2 bg-[#8305A5] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    <span>احجز الآن</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drinks Section - المشروبات التي نقدمها */}
      <section id="drinks" data-animate className="py-6 sm:py-8 lg:py-10 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className={`transition-all duration-1000 ${isVisible.drinks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-4 sm:mb-6">
              <span className="inline-block bg-[#8305A5]/10 text-[#8305A5] px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                المشروبات
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#8305A5] mb-4">
                قهوجي وصبابين: المشروبات التي نقدمها
              </h2>
              <p className="text-sm sm:text-base text-[#666666] max-w-2xl mx-auto">
                يقدم فريق <strong className="text-[#8305A5]">قهوجي وصبابين</strong> تشكيلة متنوعة من المشروبات
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {displayDrinks.map((drink, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-[#8305A5]/10 hover:border-[#8305A5] transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="bg-[#8305A5] p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold text-white">{drink.category}</h3>
                  </div>
                  <div className="p-4 sm:p-5">
                    <ul className="space-y-2 sm:space-y-3">
                      {drink.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-[#333333]">
                          <span className="w-1.5 h-1.5 bg-[#F17405] rounded-full"></span>
                          <span className="text-xs sm:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section id="booking" data-animate className="py-6 sm:py-8 lg:py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className={`transition-all duration-1000 ${isVisible.booking ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-4 sm:mb-6">
              <span className="inline-block bg-[#F17405]/10 text-[#F17405] px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                كيفية الحجز
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#8305A5] mb-4">
                احجز قهوجي في الرياض بـ 4 خطوات
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {bookingStepsDynamic.map((step, i) => (
                <div key={i} className="relative group">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#8305A5]/10 hover:border-[#8305A5] transition-all duration-500 hover:shadow-lg text-center">
                    <div className="text-2xl sm:text-3xl font-black text-[#8305A5]/20 group-hover:text-[#8305A5]/40 transition-colors mb-2">
                      {step.num}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#8305A5] mb-1">{step.title}</h3>
                    <p className="text-[#666666] text-[10px] sm:text-xs">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" data-animate className="py-6 sm:py-8 lg:py-10 bg-[#f8f8f8]" aria-labelledby="faq-title">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className={`transition-all duration-1000 ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-4 sm:mb-6">
              <span className="inline-block bg-[#8305A5]/10 text-[#8305A5] px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                أسئلة شائعة
              </span>
              <h2 id="faq-title" className="text-2xl sm:text-3xl font-bold text-[#8305A5] mb-4">
                الأسئلة المتكررة عن قهوجيين الرياض
              </h2>
            </div>

            <div className="space-y-3" role="region" aria-label="الأسئلة الشائعة">
              {displayFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden border-2 border-[#8305A5]/10 transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-right hover:bg-[#f8f8f8] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8305A5]"
                    aria-expanded={activeAccordion === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-button-${i}`}
                  >
                    <span className="font-semibold text-[#333333] text-xs sm:text-sm pl-3">{faq.q}</span>
                    <span className={`w-7 h-7 sm:w-8 sm:h-8 bg-[#8305A5] text-white rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${activeAccordion === i ? 'rotate-180' : ''}`} aria-hidden="true">
                      <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={`overflow-hidden transition-all duration-300 ${activeAccordion === i ? 'max-h-48' : 'max-h-0'}`}
                    hidden={activeAccordion !== i}
                  >
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-[#666666] text-xs sm:text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keywords Section - الكلمات المفتاحية */}
      {displayKeywords.length > 0 && (
        <section id="keywords" data-animate className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-[#8305A5] to-[#6a0485] relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#F17405] rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative">
            <div className={`transition-all duration-1000 ${isVisible.keywords ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-center mb-6 sm:mb-8">
                <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                  الكلمات المفتاحية
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  خدماتنا الأكثر بحثاً
                </h2>
                <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
                  اكتشف أفضل خدمات <strong className="text-[#F17405]">قهوجي وصبابين الرياض</strong> التي يبحث عنها عملاؤنا
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {displayKeywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 bg-white text-[#8305A5] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default border-2 border-white/50 hover:border-[#F17405] hover:bg-[#F17405] hover:text-white"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA - Purple Background */}
      <section className="py-6 sm:py-8 lg:py-10 bg-[#8305A5] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            احجز الآن مع أفضل
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F17405] mb-4 sm:mb-6">
            قهوجي بالرياض - قهوجيين وصبابين
          </h3>
          <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto">
            لا تتردد في التواصل معنا لحجز خدمات <strong className="text-[#F17405]">قهوجيين وصبابين الرياض</strong> لمناسبتك القادمة.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`tel:${phoneNumber}`}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#8305A5] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <PhoneIcon className="w-5 h-5 group-hover:animate-bounce" />
              <span>{phoneNumber}</span>
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#8305A5] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>واتساب</span>
            </a>
          </div>
          <p className="text-white/60 mt-6 text-xs sm:text-sm">نحن في خدمتكم على مدار 24 ساعة</p>
        </div>
      </section>

      {/* SEO Article Section - محتوى إضافي للـ SEO */}
      <section id="seo-content" data-animate className="py-6 sm:py-8 lg:py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className={`transition-all duration-1000 ${isVisible['seo-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <article className="prose max-w-none">
              <div className="bg-[#f8f8f8] rounded-2xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[#8305A5] mb-4 text-center">
                  قهوجي الرياض - قهوجيين وصبابين الرياض
                </h2>
                <p className="text-[#666666] leading-relaxed text-sm sm:text-base mb-4">
                  إذا كنت تبحث عن <strong className="text-[#8305A5]">قهوجي الرياض</strong> أو <strong className="text-[#8305A5]">قهوجيين وصابين الرياض</strong>،
                  فأنت في المكان الصحيح. نحن نقدم أفضل خدمات <strong className="text-[#8305A5]">قهوجي وصبابين الرياض</strong> بخبرة تزيد عن 20 عاماً في مجال الضيافة العربية الأصيلة.
                </p>
                <p className="text-[#666666] leading-relaxed text-sm sm:text-base mb-4">
                  يتميز فريق <strong className="text-[#8305A5]">قهوجي وصباب الرياض</strong> بالاحترافية العالية والخبرة الواسعة.
                  سواء كنت تحتاج <strong className="text-[#8305A5]">قهوجي وصباب</strong> لحفل زفاف أو <strong className="text-[#8305A5]">قهوجين</strong> لمجلس عزاء،
                  فإن <strong className="text-[#8305A5]">قهوجيين وصبابين الرياض</strong> جاهزون لخدمتكم.
                </p>
                <p className="text-[#666666] leading-relaxed text-sm sm:text-base">
                  نوفر <strong className="text-[#8305A5]">قهوجي</strong> محترف و<strong className="text-[#8305A5]">قهوجين وصبابين بالرياض</strong> لجميع المناسبات.
                  فريق <strong className="text-[#8305A5]">قهوجيين وصبابين بالرياض</strong> متاح على مدار الساعة.
                  للحصول على <strong className="text-[#8305A5]">قهوجي في الرياض</strong> اتصل الآن على <strong className="text-[#F17405]">0509702164</strong>.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border-2 border-[#8305A5]/10 rounded-xl p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#8305A5] mb-3">صبابين قهوة الرياض</h3>
                  <p className="text-[#666666] text-xs sm:text-sm leading-relaxed">
                    <strong className="text-[#8305A5]">صبابين قهوة الرياض</strong> محترفون في تقديم القهوة العربية.
                    احصل على <strong className="text-[#8305A5]">ارقام قهوجين</strong> وتواصل مع <strong className="text-[#8305A5]">ارقام قهوجيين وصابين الرياض</strong> مباشرة.
                    <strong className="text-[#8305A5]">ارقام قهوجيين</strong> متاحة 24 ساعة.
                  </p>
                </div>
                <div className="bg-white border-2 border-[#8305A5]/10 rounded-xl p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#8305A5] mb-3">مباشرين قهوة</h3>
                  <p className="text-[#666666] text-xs sm:text-sm leading-relaxed">
                    فريق <strong className="text-[#8305A5]">مباشرين قهوة</strong> محترف ومدرب.
                    نوفر <strong className="text-[#8305A5]">صبابات قهوة</strong> و<strong className="text-[#8305A5]">قهوجيات الرياض</strong> للمناسبات النسائية.
                    <strong className="text-[#8305A5]">صبابات الرياض</strong> بالحشمة والاحترافية.
                  </p>
                </div>
              </div>

              <div className="bg-[#8305A5]/5 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-[#8305A5] mb-4 text-center">
                  قهوجيين بالرياض - قهوجي وصبابين بالرياض
                </h3>
                <p className="text-[#666666] text-sm sm:text-base leading-relaxed mb-4 text-center">
                  نحن <strong className="text-[#8305A5]">قهوجيين بالرياض</strong> الأفضل. خدمات <strong className="text-[#8305A5]">قهوجي وصبابين بالرياض</strong> متميزة.
                  فريق <strong className="text-[#8305A5]">قهوجي وصبابين</strong> محترف. <strong className="text-[#8305A5]">قهوجي وصبابين قهوة بالرياض</strong> في خدمتكم.
                </p>
                <p className="text-[#666666] text-sm sm:text-base leading-relaxed mb-4 text-center">
                  <strong className="text-[#8305A5]">قهوجي صبابين الرياض</strong> - <strong className="text-[#8305A5]">قهوجي الرياض قهوجيين وصبابين</strong> -
                  <strong className="text-[#8305A5]">أرقام قهوجيين في الرياض</strong> - <strong className="text-[#8305A5]">أرقام قهوجيين بالرياض</strong>
                </p>
                <p className="text-[#666666] text-sm sm:text-base leading-relaxed text-center">
                  <strong className="text-[#8305A5]">أفضل قهوجي بالرياض</strong> - <strong className="text-[#8305A5]">مباشرين قهوة الرياض</strong> -
                  <strong className="text-[#8305A5]">رقم قهوجي بالرياض</strong>: <strong className="text-[#F17405]">0509702164</strong> -
                  <strong className="text-[#8305A5]">مضيف قهوة بالرياض</strong> - <strong className="text-[#8305A5]">أفضل مضيف قهوة الرياض</strong> -
                  <strong className="text-[#8305A5]">قهوجيين الرياض</strong>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer - Purple Background */}
      <footer className="bg-[#8305A5] text-white py-8 sm:py-12" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <img
                src="/images/logo.webp"
                alt="قهوجي الرياض - شعار"
                width={100}
                height={100}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
              <div>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{siteName}</p>
                <p className="text-white/70 text-xs sm:text-sm">{siteSlogan}</p>
              </div>
            </div>
            <p className="text-white/70 mb-4 text-xs sm:text-sm max-w-xl mx-auto">
              أفضل خدمات <strong>قهوجي وصبابين بالرياض</strong> - <strong>قهوجيين وصبابين الرياض</strong> -
              <strong>صبابين قهوة الرياض</strong> - <strong>مباشرين قهوة</strong> - <strong>قهوجيات الرياض</strong>
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="text-xl sm:text-2xl font-bold text-[#F17405] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded"
              aria-label={`اتصل بنا على الرقم ${phoneNumber}`}
            >
              {phoneNumber}
            </a>
            <div className="border-t border-white/20 mt-6 pt-6">
              <p className="text-white/50 text-[10px] sm:text-xs">
                جميع الحقوق محفوظة © {new Date().getFullYear()} {siteName} - {siteSlogan}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <aside className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 flex flex-col gap-3" aria-label="روابط التواصل السريع">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
          aria-label="تواصل معنا عبر واتساب"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
        </a>
      </aside>

      <aside className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50" aria-label="زر الاتصال السريع">
        <a
          href={`tel:${phoneNumber}`}
          className="group w-12 h-12 sm:w-14 sm:h-14 bg-[#F17405] hover:bg-[#d96504] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F17405]"
          aria-label="اتصل بنا الآن"
        >
          <PhoneIcon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
        </a>
      </aside>
    </div>
  );
}
