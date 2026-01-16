'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Clear cache on mount
    const version = '3.2.0';
    const cachedVersion = localStorage.getItem('siteVersion');
    if (cachedVersion !== version) {
      localStorage.setItem('siteVersion', version);
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
    }

    // Fetch all homepage data
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/homepage`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await response.json();
        if (data.success) {
          setPageData(data.data);
          setKeywords(data.data.keywords || []);
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [API_URL]);

  // Get section content helper
  const getSection = (key) => {
    if (!pageData?.sections?.[key]) return null;
    return pageData.sections[key];
  };

  // Get setting value helper
  const getSetting = (key, defaultValue = '') => {
    return pageData?.settings?.[key] || defaultValue;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get phone number from settings or use default
  const phoneNumber = getSetting('phone', '0532637955');
  const siteName = getSetting('site_name', 'نخوة القهوة');
  const siteSlogan = getSetting('site_slogan', 'ضيافة ملكية فاخرة');

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-coffee-dark font-bold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-bg text-text-main antialiased flex flex-col selection:bg-gold selection:text-white font-main">
      {/* Header */}
      <header className="bg-cream-bg/95 backdrop-blur-md sticky top-0 z-50 border-b border-gold/20 shadow-sm">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative overflow-hidden">
              <Image
                src="/images/logo-new-one.webp"
                alt={siteName}
                fill
                className="object-contain"
                priority
                style={{ background: 'transparent' }}
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-coffee-dark tracking-wide font-sans">{siteName}</h1>
              <div className="h-0.5 w-12 bg-gold mt-1 mb-1"></div>
              <span className="text-xs text-bronze font-bold uppercase tracking-widest">{siteSlogan}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              className="hidden md:flex items-center gap-2 text-coffee-dark font-bold hover:text-gold transition-colors text-lg"
              href="#services"
            >
              خدماتنا
            </a>
            <a
              className="hidden md:flex items-center gap-2 bg-coffee-dark text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-gold transition-all duration-300 border border-transparent hover:border-coffee-dark/20 hover:scale-105 transform"
              href={`tel:${phoneNumber}`}
              aria-label={`اتصل بنا على ${phoneNumber}`}
            >
              <span className="material-symbols-outlined text-sm">call</span>
              <span>{phoneNumber}</span>
            </a>
            <a
              className="md:hidden text-coffee-dark border-2 border-coffee-dark/30 p-3 rounded-full flex items-center justify-center hover:bg-coffee-dark hover:text-white transition-all duration-300 hover:scale-110 transform"
              href={`tel:${phoneNumber}`}
              aria-label="اتصل بنا"
            >
              <span className="material-symbols-outlined">call</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        {(() => {
          const heroSection = getSection('hero');
          const heroContent = heroSection?.content || {};
          const badge = heroContent.badge || 'الخيار الأول للضيافة في الرياض';
          const title = heroContent.title || 'قهوجي الرياض';
          const subtitle = heroContent.subtitle || 'فخامة الضيافة العربية الأصيلة';
          const description = heroContent.description || 'نقدم لكم أرقى خدمات القهوة والشاي بلمسة تراثية فاخرة تليق بضيوفكم ومناسباتكم الكبرى.';

          return (
            <div className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  alt="قهوجي الرياض - صباب محترف يقدم القهوة العربية الأصيلة في مناسبة فاخرة"
                  src="/images/3.webp"
                  fill
                  className="object-cover scale-105"
                  priority
                />
              </div>
              <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 py-20">
                <div className="max-w-4xl mx-auto md:mx-0 md:mr-auto text-right text-white space-y-8 pl-0 md:pl-20">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-sm px-4 py-1.5 mb-2">
                    <span className="material-symbols-outlined text-white text-sm">star</span>
                    <span className="text-white font-bold text-sm tracking-wide">{badge}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-sans text-white" style={{ textShadow: '3px 3px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)' }}>
                    {title}
                    <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 font-bold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>{subtitle}</span>
                  </h1>
                  <p className="text-lg md:text-xl font-medium text-white max-w-2xl leading-relaxed border-r-4 border-white pr-6 font-sans" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
                    {description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5 pt-4">
                    <a
                      className="bg-gold hover:bg-white hover:text-coffee-dark text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105 transform"
                      href={`tel:${phoneNumber}`}
                      style={{ boxShadow: '0 10px 40px rgba(183,66,167,0.4)' }}
                      aria-label={`اطلب خدمة القهوجيين الآن - اتصل على ${phoneNumber}`}
                    >
                      <span className="material-symbols-outlined group-hover:rotate-12 transition-transform text-2xl">coffee_maker</span>
                      اطلب الخدمة الآن
                    </a>
                    <a
                      className="bg-white/10 backdrop-blur-md border-2 border-white hover:bg-white hover:text-coffee-dark text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform"
                      href="#about"
                      style={{ boxShadow: '0 10px 30px rgba(255,255,255,0.2)' }}
                      aria-label="اكتشف المزيد عن خدماتنا"
                    >
                      اكتشف المزيد
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-cream-bg" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
            </div>
          );
        })()}

        {/* About Section */}
        <section className="py-20 relative bg-cream-bg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNEEyQzJBIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjMiLz48Y2lyY2xlIGN4PSIxMyIgY3k9IjEzIiByPSIzIi8+PC9nPjwvc3ZnPg==')]" id="about">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-5/12 relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-gold to-coffee-dark rounded-xl opacity-20 rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="relative bg-white p-10 rounded-lg shadow-xl border border-gold/10 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="octagon-border w-36 h-36 mb-6 mx-auto">
                    <Image
                      src="/images/1.webp"
                      alt="دلة القهوة العربية التقليدية - رمز الأصالة والضيافة السعودية"
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-3xl font-black text-coffee-dark mb-2">الأصالة</h3>
                  <div className="w-16 h-1 bg-gold mb-6"></div>
                  <p className="text-text-muted text-lg leading-relaxed">
                    نعتز بتقديم القهوة السعودية وفق تقاليدها العريقة، حيث يلتقي كرم الضيافة بجودة التقديم.
                  </p>
                </div>
              </div>

              <div className="lg:w-7/12">
                <span className="text-bronze font-bold text-sm uppercase tracking-wider mb-2 block font-sans">مؤسسة نخوة القهوة</span>
                <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-6 leading-tight font-sans">
                  من نحن – رواد الضيافة<br />
                  <span className="text-coffee-dark relative inline-block">
                    في المملكة
                    <svg className="absolute w-full h-3 -bottom-1 right-0 text-coffee-dark/20" preserveAspectRatio="none" viewBox="0 0 100 10">
                      <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3"></path>
                    </svg>
                  </span>
                </h2>
                <div className="space-y-6 text-sm md:text-base text-text-muted leading-relaxed font-normal text-justify font-sans">
                  <p>
                    نحن مؤسسة رائدة في مجال الضيافة بالرياض، نجمع بين عراقة الماضي وأناقة الحاضر. "نخوة القهوة" ليست مجرد اسم، بل هي وعد بتقديم تجربة ضيافة ملكية تليق بمقام ضيوفكم.
                  </p>
                  <p>
                    نفخر بامتلاكنا فريقاً من أمهر القهوجيين والصبابين السعوديين المدربين على أعلى مستويات الإتيكيت والاحترافية. هدفنا الأسمى هو راحة ضيوفكم وتميز مناسبتكم بلمسات فنية في التقديم.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="octagon-border w-20 h-20 flex-shrink-0">
                      <Image
                        src="/images/2.webp"
                        alt="صباب محترف يرتدي الزي السعودي التقليدي"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-coffee-dark text-xl">طاقم محترف</h4>
                      <p className="text-sm text-text-muted">مدرب على أعلى مستوى</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="octagon-border w-20 h-20 flex-shrink-0">
                      <Image
                        src="/images/6.webp"
                        alt="القهوة العربية الأصيلة بالطريقة التقليدية"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-coffee-dark text-xl">تراث أصيل</h4>
                      <p className="text-sm text-text-muted">التزام بالتقاليد السعودية</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-bg/50 skew-x-12 transform origin-top-right"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-6 font-sans">لماذا قهوجي الرياض عنصر أساسي لنجاح مناسبتك؟</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-coffee-dark via-gold to-coffee-dark mx-auto rounded-full mb-6"></div>
              <p className="text-base text-text-muted font-normal font-sans">الضيافة هي واجهة المضيف، ونحن هنا لنجعل واجهتكم مشرفة بأعلى معايير الجودة.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="bg-cream-bg hover:bg-white p-8 rounded-sm shadow-lg border-t-4 border-gold hover:shadow-golden transition-all duration-300 group">
                <div className="octagon-border w-24 h-24 mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Image
                    src="/images/2.webp"
                    alt="قهوجي محترف يستقبل الضيوف بابتسامة ترحيبية"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-bold text-coffee-dark mb-3 font-sans">انطباع أول مذهل</h3>
                <p className="text-text-muted text-sm leading-relaxed font-sans">نضمن لك استقبالاً حاراً وراقياً يترك أثراً طيباً في نفوس الحضور من اللحظة الأولى لدخولهم.</p>
              </div>
              <div className="bg-coffee-dark text-white p-8 rounded-sm shadow-xl border-t-4 border-white transform md:-translate-y-4 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full -mr-10 -mt-10"></div>
                <div className="octagon-border w-24 h-24 mb-6 mx-auto relative">
                  <Image
                    src="/images/4.webp"
                    alt="صباب يقدم خدمة احترافية لراحة المضيف"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-sans">راحة المضيف</h3>
                <p className="text-white/90 text-sm leading-relaxed font-sans">تفرغ لاستقبال ضيوفك والحديث معهم، واترك أعباء الصب والتقديم والضيافة علينا بالكامل.</p>
              </div>
              <div className="bg-cream-bg hover:bg-white p-8 rounded-sm shadow-lg border-t-4 border-gold hover:shadow-golden transition-all duration-300 group">
                <div className="octagon-border w-24 h-24 mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Image
                    src="/images/5.webp"
                    alt="تقديم القهوة العربية بالطريقة التقليدية الأصيلة"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-bold text-coffee-dark mb-3 font-sans">إحياء التراث</h3>
                <p className="text-text-muted text-sm leading-relaxed font-sans">نقدم القهوة العربية بالطريقة التقليدية الأصيلة التي تعبر عن كرم الضيافة السعودية المتوارثة.</p>
              </div>
            </div>

            {/* Quality Guarantee Section */}
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-coffee-dark to-text-main rounded-2xl p-1 shadow-2xl overflow-hidden">
              <div className="bg-white/95 backdrop-blur-xl rounded-[14px] p-8 md:p-12 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCODg2MEIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTUwIDUwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTBjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMHMtMTAtNC40NzctMTAtMTAgNC40NzctMTAgMTAtMTB6TTEwIDEwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTBjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMFMwIDI1LjUyMyAwIDIwczQuNDc3LTEwIDEwLTEwem0xMCA4YzQuNDE4IDAgOC0zLjU4MiA4LThzLTMuNTgyLTgtOC04LTggMy41ODItOCA4IDMuNTgyIDggOCA4em00MCA0MGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIC8+PC9nPjwvZz48L3N2Zz4=')] opacity-[0.03] z-0"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                  <div className="md:w-1/2 text-right">
                    <h2 className="text-xl md:text-2xl font-black text-coffee-dark mb-6 font-sans">خدمة قهوجيين بالرياض تضمن لك:</h2>
                    <p className="text-sm md:text-base text-text-muted mb-8 leading-relaxed border-r-4 border-coffee-dark pr-4 font-sans">معاييرنا لا تقبل القسمة على اثنين، الجودة لدينا التزام وليست خياراً.</p>
                    <a className="inline-flex items-center gap-3 bg-coffee-dark text-white px-8 py-3 rounded-2xl font-bold hover:bg-white hover:text-coffee-dark transition-all duration-300 shadow-lg hover:scale-105 transform" href={`tel:${phoneNumber}`} aria-label={`احجز موعدك الآن - اتصل على ${phoneNumber}`}>
                      <span className="material-symbols-outlined">call</span>
                      احجز موعدك الآن
                    </a>
                  </div>
                  <div className="md:w-1/2 grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4 bg-cream-bg p-4 rounded-lg border border-gold/20 hover:border-gold transition-colors">
                      <div className="octagon w-12 h-12 flex-shrink-0">
                        <Image
                          src="/images/1.webp"
                          alt="حبوب البن الفاخرة - خولاني وهرري"
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-base font-bold text-coffee-dark">قهوة فاخرة (خولاني، هرري)</span>
                    </div>
                    <div className="flex items-center gap-4 bg-cream-bg p-4 rounded-lg border border-gold/20 hover:border-gold transition-colors">
                      <div className="octagon w-12 h-12 flex-shrink-0">
                        <Image
                          src="/images/2.webp"
                          alt="معايير النظافة والتعقيم العالية"
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-base font-bold text-coffee-dark">نظافة تامة وتعقيم شامل</span>
                    </div>
                    <div className="flex items-center gap-4 bg-cream-bg p-4 rounded-lg border border-gold/20 hover:border-gold transition-colors">
                      <div className="octagon w-12 h-12 flex-shrink-0">
                        <Image
                          src="/images/4.webp"
                          alt="الالتزام بالمواعيد والزي الموحد"
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-base font-bold text-coffee-dark">التزام صارم بالمواعيد والزي</span>
                    </div>
                    <div className="flex items-center gap-4 bg-cream-bg p-4 rounded-lg border border-gold/20 hover:border-gold transition-colors">
                      <div className="octagon w-12 h-12 flex-shrink-0">
                        <Image
                          src="/images/5.webp"
                          alt="أسعار تنافسية وشفافة"
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-base font-bold text-coffee-dark">أسعار تنافسية وشفافة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professionalism Section */}
        <section className="py-20 bg-coffee-dark relative text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCODg2MEIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTUwIDUwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTBjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMHMtMTAtNC40NzctMTAtMTAgNC40NzctMTAgMTAtMTB6TTEwIDEwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTBjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMFMwIDI1LjUyMyAwIDIwczQuNDc3LTEwIDEwLTEwem0xMCA4YzQuNDE4IDAgOC0zLjU4MiA4LThzLTMuNTgyLTgtOC04LTggMy41ODItOCA4IDMuNTgyIDggOCA4em00MCA0MGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIC8+PC9nPjwvZz48L3N2Zz4=')] opacity-[0.03]"></div>
          <div className="container mx-auto px-4 max-w-5xl text-center space-y-8 relative z-10">
            <span className="text-white font-bold tracking-widest uppercase text-xs border-2 border-white px-4 py-1 rounded-full font-sans">التميز شعارنا</span>
            <h2 className="text-2xl md:text-3xl font-black font-sans text-white">احترافية لا تقبل المساومة</h2>
            <p className="text-base md:text-lg text-white leading-relaxed font-normal max-w-4xl mx-auto font-sans">
              فريقنا ليس مجرد مقدمي خدمة، بل هم <span className="text-white font-black">سفراء للضيافة</span>. يتم اختيارهم بعناية فائقة وتدريبهم على فن الإتيكيت، وحسن المظهر، واللباقة في الحديث. يرتدون الزي السعودي الرسمي (الثوب، الشماغ، والدقلة الفاخرة) ليعكسوا أصالة المكان وهيبة المناسبة.
            </p>
            <div className="flex justify-center gap-4 mt-8 opacity-70">
              <span className="material-symbols-outlined text-5xl">person_apron</span>
              <span className="material-symbols-outlined text-5xl">coffee</span>
              <span className="material-symbols-outlined text-5xl">groups</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-cream-bg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNEEyQzJBIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjMiLz48Y2lyY2xlIGN4PSIxMyIgY3k9IjEzIiByPSIzIi8+PC9nPjwvc3ZnPg==')]" id="services">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-4 font-sans">لجميع أنواع المناسبات</h2>
              <p className="text-text-muted text-sm md:text-base font-normal font-sans">نكيف خدماتنا لتناسب طبيعة وخصوصية مناسبتكم</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group relative h-80 rounded-sm overflow-hidden shadow-lg cursor-pointer border border-gold/10">
                <div className="absolute inset-0 bg-coffee-dark transition-colors duration-500 group-hover:bg-gold flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="octagon-border w-32 h-32 mb-6 mx-auto transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src="/images/3.webp"
                      alt="خدمات قهوجيين لحفلات الزفاف والملكة"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">حفلات الزفاف والملكة</h3>
                  <div className="w-12 h-1 bg-gold group-hover:bg-white transition-colors"></div>
                </div>
              </div>
              <div className="group relative h-80 rounded-sm overflow-hidden shadow-lg cursor-pointer border border-gold/10">
                <div className="absolute inset-0 bg-white transition-colors duration-500 group-hover:bg-coffee-dark flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="octagon-border w-32 h-32 mb-6 mx-auto transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src="/images/4.webp"
                      alt="خدمات ضيافة للمؤتمرات والفعاليات الرسمية"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-coffee-dark group-hover:text-white mb-2 transition-colors">المؤتمرات الرسمية</h3>
                  <div className="w-12 h-1 bg-coffee-dark group-hover:bg-gold transition-colors"></div>
                </div>
              </div>
              <div className="group relative h-80 rounded-sm overflow-hidden shadow-lg cursor-pointer border border-gold/10">
                <div className="absolute inset-0 bg-coffee-dark transition-colors duration-500 group-hover:bg-gold flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="octagon-border w-32 h-32 mb-6 mx-auto transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src="/images/5.webp"
                      alt="صبابين محترفين للعزائم والولائم"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">العزائم والولائم</h3>
                  <div className="w-12 h-1 bg-gold group-hover:bg-white transition-colors"></div>
                </div>
              </div>
              <div className="group relative h-80 rounded-sm overflow-hidden shadow-lg cursor-pointer border border-gold/10">
                <div className="absolute inset-0 bg-white transition-colors duration-500 group-hover:bg-coffee-dark flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="octagon-border w-32 h-32 mb-6 mx-auto transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src="/images/6.webp"
                      alt="خدمات قهوجيين لبيوت العزاء"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-coffee-dark group-hover:text-white mb-2 transition-colors">بيوت العزاء</h3>
                  <div className="w-12 h-1 bg-coffee-dark group-hover:bg-gold transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Coffee Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
              <div className="md:w-1/2 space-y-8">
                <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-8 font-sans">أفضل قهوجي بالرياض <br /><span className="text-coffee-dark text-xl">لماذا نحن؟</span></h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-coffee-dark flex items-center justify-center shrink-0 text-white font-bold text-lg shadow-lg rotate-3">1</div>
                    <div>
                      <h4 className="text-lg font-bold text-coffee-dark mb-1 font-sans">الخبرة الطويلة</h4>
                      <p className="text-text-muted text-sm font-sans">سنوات من العمل في قصور الرياض وقاعاتها الكبرى.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-coffee-dark flex items-center justify-center shrink-0 text-white font-bold text-lg shadow-lg -rotate-2">2</div>
                    <div>
                      <h4 className="text-lg font-bold text-coffee-dark mb-1 font-sans">سرعة البديهة</h4>
                      <p className="text-text-muted text-sm font-sans">فريقنا يفهم إشارة المضيف ويلبي الطلبات فوراً.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-coffee-dark flex items-center justify-center shrink-0 text-white font-bold text-lg shadow-lg rotate-1">3</div>
                    <div>
                      <h4 className="text-lg font-bold text-coffee-dark mb-1 font-sans">تغطية شاملة</h4>
                      <p className="text-text-muted text-sm font-sans">مهما كان عدد الضيوف، لدينا العدد الكافي من الصبابين.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-coffee-dark/10 transform rotate-6 rounded-3xl"></div>
                <div className="bg-coffee-dark p-8 md:p-12 rounded-3xl shadow-2xl relative text-center text-white border-2 border-white/30">
                  <span className="material-symbols-outlined text-7xl text-white mb-4">award_star</span>
                  <h3 className="text-xl md:text-2xl font-black mb-2 font-sans text-white">نضمن لكم "بيض الوجه"</h3>
                  <p className="text-white text-sm mb-8 font-sans">سمعتكم هي أمانة في أعناقنا</p>
                  <div className="flex justify-center gap-2">
                    <span className="material-symbols-outlined text-white">star</span>
                    <span className="material-symbols-outlined text-white">star</span>
                    <span className="material-symbols-outlined text-white">star</span>
                    <span className="material-symbols-outlined text-white">star</span>
                    <span className="material-symbols-outlined text-white">star</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-cream-bg border border-gold/10 rounded-xl p-8 shadow-sm hover:shadow-golden transition-shadow duration-300 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-right">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 border-2 border-gold/20 text-coffee-dark">
                  <span className="material-symbols-outlined text-4xl">man</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black text-coffee-dark mb-3 font-sans">صبابين قهوة الرياض – سرعة وأناقة</h3>
                  <p className="text-text-muted text-sm leading-relaxed font-sans">
                    فريق من الشباب السعودي النشيط، يتميزون بالخفة في الحركة والمهارة في صب القهوة دون انقطاع، مع الحفاظ على الابتسامة والهدوء.
                  </p>
                </div>
              </div>
              <div className="bg-cream-bg border border-gold/10 rounded-xl p-8 shadow-sm hover:shadow-golden transition-shadow duration-300 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-right">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 border-2 border-gold/20 text-coffee-dark">
                  <span className="material-symbols-outlined text-4xl">woman</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black text-coffee-dark mb-3 font-sans">قهوجيات الرياض – ضيافة نسائية</h3>
                  <p className="text-text-muted text-sm leading-relaxed font-sans">
                    للمناسبات النسائية، نوفر "صبابات" و"مباشرات" على أعلى مستوى من الرقي والأمانة، بزي موحد وخدمة تضمن خصوصية وراحة ضيوفك.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 bg-gradient-to-r from-coffee-dark to-text-main text-white border-y-4 border-gold/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-black mb-4 font-sans">مباشر قهوة ومضيف قهوة بالرياض</h2>
            <p className="text-sm md:text-base text-white max-w-3xl mx-auto mb-10 font-sans">إذا كنت تحتاج إلى "مباشر" خاص لخدمة كبار الشخصيات (VIP) أو للإشراف الكامل على بوفيه المشروبات.</p>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-right">
                <h3 className="text-lg font-bold text-white mb-1 font-sans">تواصل سريع</h3>
                <p className="text-white text-xs font-sans">متواجدون على مدار 24 ساعة</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto flex-col sm:flex-row">
                <a className="bg-gold hover:bg-white hover:text-coffee-dark text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform" href={`tel:${phoneNumber}`} aria-label={`اتصل على ${phoneNumber}`}>
                  <span className="material-symbols-outlined">phone_iphone</span>
                  <span>{phoneNumber}</span>
                </a>
                <a className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform" href={`https://wa.me/966${phoneNumber.replace(/^0/, '')}`} aria-label="تواصل معنا عبر واتساب" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined">chat</span>
                  <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Details Section */}
        <section className="py-20 bg-cream-bg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNEEyQzJBIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjMiLz48Y2lyY2xlIGN4PSIxMyIgY3k9IjEzIiByPSIzIi8+PC9nPjwvc3ZnPg==')]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-1 bg-gold"></div>
                  <h2 className="text-xl md:text-2xl font-black text-coffee-dark font-sans">خدماتنا بالتفصيل</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gold/10 hover:border-gold/40 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-gold mt-1">coffee</span>
                    <div>
                      <span className="font-bold text-coffee-dark block text-lg">القهوة العربية</span>
                      <span className="text-text-muted text-sm">شقراء، غامقة، بالهيل والزعفران والمستكة.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gold/10 hover:border-gold/40 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-gold mt-1">emoji_food_beverage</span>
                    <div>
                      <span className="font-bold text-coffee-dark block text-lg">الشاي بأنواعه</span>
                      <span className="text-text-muted text-sm">أحمر، أخضر، مغربي، كرك، عدني.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gold/10 hover:border-gold/40 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-gold mt-1">local_florist</span>
                    <div>
                      <span className="font-bold text-coffee-dark block text-lg">مشروبات الأعشاب</span>
                      <span className="text-text-muted text-sm">نعناع، حبق، زنجبيل، ليمون، زهورات.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gold/10 hover:border-gold/40 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-gold mt-1">nutrition</span>
                    <div>
                      <span className="font-bold text-coffee-dark block text-lg">التمور الفاخرة</span>
                      <span className="text-text-muted text-sm">خلاص، سكري، صقعي (محشي سادة أو مكسرات).</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-1 bg-gold"></div>
                  <h2 className="text-xl md:text-2xl font-black text-coffee-dark font-sans">تغطية شاملة للرياض</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md border border-gold/10 relative overflow-hidden h-full">
                  <div className="absolute -right-10 -bottom-10 opacity-5">
                    <span className="material-symbols-outlined text-9xl text-coffee-dark">map</span>
                  </div>
                  <p className="text-sm md:text-base text-text-muted mb-8 leading-relaxed font-sans">
                    نصل إليكم أينما كنتم في مدينة الرياض وضواحيها. نغطي كافة الأحياء بسرعة وكفاءة عالية.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-cream-bg text-coffee-dark p-3 rounded-md text-center font-bold border border-gold/20 hover:bg-gold hover:text-white transition-colors cursor-default">شمال الرياض</div>
                    <div className="bg-cream-bg text-coffee-dark p-3 rounded-md text-center font-bold border border-gold/20 hover:bg-gold hover:text-white transition-colors cursor-default">شرق الرياض</div>
                    <div className="bg-cream-bg text-coffee-dark p-3 rounded-md text-center font-bold border border-gold/20 hover:bg-gold hover:text-white transition-colors cursor-default">غرب الرياض</div>
                    <div className="bg-cream-bg text-coffee-dark p-3 rounded-md text-center font-bold border border-gold/20 hover:bg-gold hover:text-white transition-colors cursor-default">جنوب الرياض</div>
                    <div className="col-span-2 bg-cream-bg text-coffee-dark p-3 rounded-md text-center font-bold border border-gold/20 hover:bg-gold hover:text-white transition-colors cursor-default">الدرعية وضواحي الرياض</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-gold font-bold tracking-widest uppercase text-xs font-sans">تجارب حقيقية</span>
              <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mt-2 font-sans">آراء العملاء</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-cream-bg p-8 rounded-tl-3xl rounded-br-3xl shadow-lg border border-transparent hover:border-gold/30 transition-all">
                <div className="flex text-gold mb-4">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                </div>
                <p className="text-text-muted italic mb-6 leading-relaxed">"بيض الله وجيهكم، القهوة كايفة والصبابين قمة في الاحترام والأدب. انصح بالتعامل مع مؤسسة نخوة القهوة."</p>
                <div className="flex items-center gap-3 border-t border-gold/10 pt-4">
                  <div className="w-10 h-10 bg-coffee-dark rounded-full flex items-center justify-center text-gold font-bold">أ</div>
                  <p className="font-bold text-coffee-dark text-sm">أبو عبدالله</p>
                </div>
              </div>
              <div className="bg-coffee-dark text-white p-8 rounded-tl-3xl rounded-br-3xl shadow-xl transform md:-translate-y-2 relative">
                <div className="absolute top-4 left-4 text-gold/20 text-6xl font-serif">&ldquo;</div>
                <div className="flex text-gold mb-4">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                </div>
                <p className="text-white/90 italic mb-6 leading-relaxed">"تعاملنا معهم في زواج ابني، التزام بالوقت وزي موحد يفتح النفس. شكراً لكم."</p>
                <div className="flex items-center gap-3 border-t border-white/20 pt-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-coffee-dark font-bold">أ</div>
                  <p className="font-bold text-white text-sm">أم فهد</p>
                </div>
              </div>
              <div className="bg-cream-bg p-8 rounded-tl-3xl rounded-br-3xl shadow-lg border border-transparent hover:border-gold/30 transition-all">
                <div className="flex text-gold mb-4">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                </div>
                <p className="text-text-muted italic mb-6 leading-relaxed">"أفضل قهوجي بالرياض بلا منازع، الدلال نظيفة والقهوة طعمها في الراس."</p>
                <div className="flex items-center gap-3 border-t border-gold/10 pt-4">
                  <div className="w-10 h-10 bg-coffee-dark rounded-full flex items-center justify-center text-gold font-bold">م</div>
                  <p className="font-bold text-coffee-dark text-sm">مشعل العتيبي</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {pageData?.faqs && pageData.faqs.length > 0 && (
          <section className="py-16 bg-cream-bg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNEEyQzJBIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjMiLz48Y2lyY2xlIGN4PSIxMyIgY3k9IjEzIiByPSIzIi8+PC9nPjwvc3ZnPg==')]">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-black text-coffee-dark text-center mb-10 font-sans">الأسئلة الشائعة</h2>
              <div className="space-y-4">
                {pageData.faqs.map((faq, index) => (
                  <div key={faq.id} className={`bg-white border-r-4 ${index % 2 === 0 ? 'border-gold' : 'border-coffee-dark'} rounded-l-lg p-6 shadow-sm`}>
                    <h3 className="font-bold text-coffee-dark text-lg mb-2">{faq.question}</h3>
                    <p className="text-text-muted text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Keywords Section */}
        {keywords.length > 0 && (
          <section className="py-12 bg-white border-t border-gold/10">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-black text-coffee-dark font-sans">خدماتنا تشمل</h2>
                <div className="w-16 h-1 bg-gold mx-auto mt-3"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {keywords.map((item) => (
                  <span
                    key={item.id}
                    className="bg-cream-bg text-coffee-dark px-5 py-2.5 rounded-full text-sm font-bold border border-gold/20 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 cursor-default"
                  >
                    {item.keyword}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 bg-coffee-dark relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCODg2MEIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTUwIDUwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTBjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMHMtMTAtNC40NzctMTAtMTAgNC40NzctMTAgMTAtMTB6TTEwIDEwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTBjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMFMwIDI1LjUyMyAwIDIwczQuNDc3LTEwIDEwLTEwem0xMCA4YzQuNDE4IDAgOC0zLjU4MiA4LThzLTMuNTgyLTgtOC04LTggMy41ODItOCA4IDMuNTgyIDggOCA4em00MCA0MGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIC8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 drop-shadow-md font-sans">
              مناسبتك تستحق <span className="text-white">الفخامة</span>
            </h2>
            <p className="text-base md:text-lg text-white mb-10 font-bold font-sans">قهوجي الرياض – مؤسسة نخوة القهوة</p>
            <div className="flex flex-col items-center gap-8">
              <a
                className="inline-flex items-center gap-4 bg-gradient-to-r from-gold via-primary-magenta to-gold hover:from-white hover:to-white hover:text-coffee-dark text-white px-14 py-6 rounded-3xl font-black text-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
                href={`tel:${phoneNumber}`}
                style={{ boxShadow: '0 15px 50px rgba(183,66,167,0.5)' }}
                aria-label={`اتصل الآن على ${phoneNumber}`}
              >
                <span className="material-symbols-outlined text-4xl">call</span>
                اتصل الآن
              </a>
              <div className="inline-flex items-center gap-2 text-lg font-medium text-white border-2 border-white/50 px-8 py-3 rounded-full bg-black/20 backdrop-blur-sm">
                <span className="material-symbols-outlined">location_on</span>
                تغطية كاملة داخل الرياض
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2D1A18] text-gray-400 py-16 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-4 gap-10 mb-10 text-center md:text-right">
            <div className="md:col-span-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo-new-one.webp"
                    alt="نخوة القهوة"
                    width={40}
                    height={40}
                    className="object-contain"
                    style={{ background: 'transparent' }}
                  />
                </div>
                <h3 className="text-2xl font-black text-white">مؤسسة نخوة القهوة</h3>
              </div>
              <p className="text-gray-500 leading-relaxed max-w-md mx-auto md:mx-0">
                الخيار الأمثل لخدمات الضيافة العربية في الرياض. نقدم تجربة استثنائية تمزج بين الأصالة والفخامة لتشريف مناسباتكم.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">روابط سريعة</h3>
              <ul className="space-y-3">
                <li><a className="hover:text-gold transition-colors flex items-center justify-center md:justify-start gap-2" href="#"><span className="material-symbols-outlined text-xs">chevron_left</span>الرئيسية</a></li>
                <li><a className="hover:text-gold transition-colors flex items-center justify-center md:justify-start gap-2" href="#about"><span className="material-symbols-outlined text-xs">chevron_left</span>من نحن</a></li>
                <li><a className="hover:text-gold transition-colors flex items-center justify-center md:justify-start gap-2" href="#services"><span className="material-symbols-outlined text-xs">chevron_left</span>خدماتنا</a></li>
                <li><a className="hover:text-gold transition-colors flex items-center justify-center md:justify-start gap-2" href={`tel:${phoneNumber}`}><span className="material-symbols-outlined text-xs">chevron_left</span>اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">تواصل معنا</h3>
              <div className="space-y-4">
                <a href={`tel:${phoneNumber}`} className="flex items-center justify-center md:justify-start gap-3 text-white hover:text-gold transition-colors" aria-label={`اتصل بنا على ${phoneNumber}`}>
                  <span className="material-symbols-outlined text-gold">call</span>
                  <span dir="ltr">{phoneNumber}</span>
                </a>
                <p className="flex items-center justify-center md:justify-start gap-3 text-white hover:text-gold transition-colors">
                  <span className="material-symbols-outlined text-gold">location_on</span>
                  الرياض، المملكة العربية السعودية
                </p>
                <p className="flex items-center justify-center md:justify-start gap-3 text-white hover:text-gold transition-colors">
                  <span className="material-symbols-outlined text-gold">mail</span>
                  info@nakhwa-coffee.com
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center">
            <div className="flex flex-col items-center gap-6">
              <p className="text-sm text-gray-400">© 2025 قهوجي الرياض - مؤسسة نخوة القهوة. جميع الحقوق محفوظة.</p>
              <div className="flex gap-6 flex-wrap justify-center">
                <a className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 text-sm" href="#" title="الموقع الإلكتروني">
                  <span className="material-symbols-outlined text-base">language</span>
                  <span>الموقع</span>
                </a>
                <a className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 text-sm" href={`https://wa.me/966${phoneNumber.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" title="واتساب" aria-label="تواصل معنا عبر واتساب">
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>واتساب</span>
                </a>
                <a className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 text-sm" href={`tel:${phoneNumber}`} title="اتصل بنا" aria-label={`اتصل بنا على ${phoneNumber}`}>
                  <span className="material-symbols-outlined text-base">call</span>
                  <span>اتصل</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button - Floating */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-gold hover:bg-coffee-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 hover:scale-110 animate-bounce"
          title="العودة للأعلى"
        >
          <span className="material-symbols-outlined text-2xl">arrow_upward</span>
        </button>
      )}

      {/* Material Symbols Style */}
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}
