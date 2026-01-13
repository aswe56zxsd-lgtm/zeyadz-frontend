'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://qahwajiz-com-backend.onrender.com/api';

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch data from API
    const fetchData = async () => {
      try {
        const timestamp = Date.now();
        const response = await fetch(`${API_URL}/homepage?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          }
        });
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get section data helper
  const getSection = (key) => data?.sections?.[key]?.content || {};
  const getServices = () => data?.services || [];
  const getFeatures = () => data?.features || [];
  const getTestimonials = () => data?.testimonials || [];
  const getFaqs = () => data?.faqs || [];
  const getEvents = () => data?.events || [];
  const getDrinks = () => data?.drinks || [];

  // Hero section data
  const hero = getSection('hero');
  const about = getSection('about');
  const servicesSection = getSection('services');
  const whyus = getSection('whyus');
  const eventsSection = getSection('events');
  const drinksSection = getSection('drinks');
  const contact = getSection('contact');
  const faqSection = getSection('faq');

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
                alt="نخوة القهوة"
                fill
                className="object-contain"
                priority
                style={{ background: 'transparent' }}
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-coffee-dark tracking-wide font-sans">{hero.title || 'قهوجي الرياض'}</h1>
              <div className="h-0.5 w-12 bg-gold mt-1 mb-1"></div>
              <span className="text-xs text-bronze font-bold uppercase tracking-widest">{hero.subtitle || 'ضيافة ملكية فاخرة'}</span>
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
              href={`tel:${hero.phone || '0532637955'}`}
              aria-label={`اتصل بنا على ${hero.phone || '0532637955'}`}
            >
              <span className="material-symbols-outlined text-sm">call</span>
              <span>{hero.phone || '0532637955'}</span>
            </a>
            <a
              className="md:hidden text-coffee-dark border-2 border-coffee-dark/30 p-3 rounded-full flex items-center justify-center hover:bg-coffee-dark hover:text-white transition-all duration-300 hover:scale-110 transform"
              href={`tel:${hero.phone || '0532637955'}`}
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
              {hero.badge && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-sm px-4 py-1.5 mb-2">
                  <span className="material-symbols-outlined text-white text-sm">star</span>
                  <span className="text-white font-bold text-sm tracking-wide">{hero.badge}</span>
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-sans text-white" style={{ textShadow: '3px 3px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)' }}>
                {hero.title || 'قهوجي الرياض'}
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 font-bold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>{hero.subtitle || 'فخامة الضيافة العربية الأصيلة'}</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-white max-w-2xl leading-relaxed border-r-4 border-white pr-6 font-sans" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
                {hero.description || 'نقدم لكم أرقى خدمات القهوة والشاي بلمسة تراثية فاخرة تليق بضيوفكم ومناسباتكم الكبرى.'}
              </p>
              {hero.experience && (
                <p className="text-gold font-bold text-xl" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>{hero.experience}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <a
                  className="bg-gold hover:bg-white hover:text-coffee-dark text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105 transform"
                  href={`tel:${hero.phone || '0532637955'}`}
                  style={{ boxShadow: '0 10px 40px rgba(183,66,167,0.4)' }}
                  aria-label="اطلب خدمة القهوجيين الآن"
                >
                  <span className="material-symbols-outlined group-hover:rotate-12 transition-transform text-2xl">call</span>
                  اتصل الآن: {hero.phone || '0532637955'}
                </a>
                {hero.whatsapp && (
                  <a
                    className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform"
                    href={`https://wa.me/${hero.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ boxShadow: '0 10px 30px rgba(34,197,94,0.4)' }}
                  >
                    <span className="material-symbols-outlined">chat</span>
                    واتساب
                  </a>
                )}
              </div>
              {/* Stats */}
              {hero.stats && hero.stats.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-8">
                  {hero.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-black text-gold" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>{stat.number}</div>
                      <div className="text-white text-sm font-bold" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-cream-bg" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        </div>

        {/* About Section */}
        <section className="py-20 relative bg-cream-bg" id="about">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center mb-16">
              <span className="text-bronze font-bold text-sm uppercase tracking-wider mb-2 block">من نحن</span>
              <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-6">{about.title || 'أفضل قهوجي بالرياض'}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-coffee-dark via-gold to-coffee-dark mx-auto rounded-full mb-6"></div>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-text-muted leading-relaxed mb-8">
                {about.description || 'نحن مؤسسة رائدة في مجال الضيافة بالرياض، نجمع بين عراقة الماضي وأناقة الحاضر.'}
              </p>
              {about.experience && (
                <div className="inline-flex items-center gap-4 bg-coffee-dark text-white px-8 py-4 rounded-2xl">
                  <span className="text-4xl font-black text-gold">{about.experience}</span>
                  <span className="text-lg font-bold">{about.experienceLabel || 'عاماً من الخبرة'}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        {getFeatures().length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-6">{whyus.title || 'لماذا نحن؟'}</h2>
                <p className="text-text-muted">{whyus.subtitle || 'مميزات خدماتنا'}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {getFeatures().map((feature) => (
                  <div key={feature.id} className="bg-cream-bg p-8 rounded-lg shadow-lg border-t-4 border-gold text-center hover:shadow-xl transition-shadow">
                    {feature.icon && (
                      <span className="material-symbols-outlined text-5xl text-gold mb-4">{feature.icon}</span>
                    )}
                    <h3 className="text-xl font-bold text-coffee-dark mb-3">{feature.title}</h3>
                    <p className="text-text-muted">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section className="py-24 bg-cream-bg" id="services">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-4">{servicesSection.title || 'خدماتنا'}</h2>
              <p className="text-text-muted">{servicesSection.subtitle || 'نكيف خدماتنا لتناسب طبيعة وخصوصية مناسبتكم'}</p>
            </div>
            {getServices().length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {getServices().map((service) => (
                  <div key={service.id} className="group relative h-80 rounded-sm overflow-hidden shadow-lg cursor-pointer border border-gold/10">
                    <div className="absolute inset-0 bg-coffee-dark transition-colors duration-500 group-hover:bg-gold flex flex-col items-center justify-center p-6 text-center z-10">
                      {service.icon && (
                        <span className="material-symbols-outlined text-6xl text-white mb-4">{service.icon}</span>
                      )}
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      {service.description && (
                        <p className="text-white/80 text-sm">{service.description}</p>
                      )}
                      <div className="w-12 h-1 bg-gold group-hover:bg-white transition-colors mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {['حفلات الزفاف والملكة', 'المؤتمرات الرسمية', 'العزائم والولائم', 'بيوت العزاء'].map((title, index) => (
                  <div key={index} className="group relative h-80 rounded-sm overflow-hidden shadow-lg cursor-pointer border border-gold/10">
                    <div className="absolute inset-0 bg-coffee-dark transition-colors duration-500 group-hover:bg-gold flex flex-col items-center justify-center p-6 text-center z-10">
                      <div className="octagon-border w-32 h-32 mb-6 mx-auto transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src={`/images/${index + 3}.webp`}
                          alt={title}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                      <div className="w-12 h-1 bg-gold group-hover:bg-white transition-colors"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Events Section */}
        {getEvents().length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-4">{eventsSection.title || 'المناسبات'}</h2>
                <p className="text-text-muted">{eventsSection.subtitle || 'نخدم جميع أنواع المناسبات'}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {getEvents().map((event) => (
                  <div key={event.id} className="bg-cream-bg p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                    {event.icon && (
                      <span className="material-symbols-outlined text-5xl text-gold mb-4">{event.icon}</span>
                    )}
                    <h3 className="text-xl font-bold text-coffee-dark mb-2">{event.title}</h3>
                    {event.description && (
                      <p className="text-text-muted text-sm">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Drinks Section */}
        {getDrinks().length > 0 && (
          <section className="py-20 bg-cream-bg">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mb-4">{drinksSection.title || 'مشروباتنا'}</h2>
                <p className="text-text-muted">{drinksSection.subtitle || 'تشكيلة متنوعة من المشروبات'}</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {getDrinks().map((drink) => (
                  <div key={drink.id} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border-t-4 border-gold">
                    {drink.icon && (
                      <span className="material-symbols-outlined text-4xl text-gold mb-3">{drink.icon}</span>
                    )}
                    <h3 className="text-lg font-bold text-coffee-dark mb-2">{drink.title}</h3>
                    {drink.description && (
                      <p className="text-text-muted text-sm">{drink.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {getTestimonials().length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <div className="text-center mb-16">
                <span className="text-gold font-bold tracking-widest uppercase text-xs">تجارب حقيقية</span>
                <h2 className="text-2xl md:text-3xl font-black text-coffee-dark mt-2">آراء العملاء</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {getTestimonials().map((testimonial, index) => (
                  <div key={testimonial.id} className={`p-8 rounded-tl-3xl rounded-br-3xl shadow-lg ${index === 1 ? 'bg-coffee-dark text-white transform md:-translate-y-2' : 'bg-cream-bg'}`}>
                    <div className="flex text-gold mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-sm">star</span>
                      ))}
                    </div>
                    <p className={`italic mb-6 leading-relaxed ${index === 1 ? 'text-white/90' : 'text-text-muted'}`}>"{testimonial.content}"</p>
                    <div className={`flex items-center gap-3 border-t pt-4 ${index === 1 ? 'border-white/20' : 'border-gold/10'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${index === 1 ? 'bg-white text-coffee-dark' : 'bg-coffee-dark text-gold'}`}>
                        {testimonial.name?.charAt(0) || 'ع'}
                      </div>
                      <p className={`font-bold text-sm ${index === 1 ? 'text-white' : 'text-coffee-dark'}`}>{testimonial.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {getFaqs().length > 0 && (
          <section className="py-16 bg-cream-bg">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-black text-coffee-dark text-center mb-10">{faqSection.title || 'الأسئلة الشائعة'}</h2>
              <div className="space-y-4">
                {getFaqs().map((faq, index) => (
                  <div key={faq.id} className={`bg-white border-r-4 ${index % 2 === 0 ? 'border-gold' : 'border-coffee-dark'} rounded-l-lg p-6 shadow-sm`}>
                    <h3 className="font-bold text-coffee-dark text-lg mb-2">{faq.question}</h3>
                    <p className="text-text-muted text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA Section */}
        <section className="py-24 bg-coffee-dark relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCODg2MEIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTUwIDUwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTBjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMHMtMTAtNC40NzctMTAtMTAgNC40NzctMTAgMTAtMTB6TTEwIDEwYzAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTBjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMFMwIDI1LjUyMyAwIDIwczQuNDc3LTEwIDEwLTEwem0xMCA4YzQuNDE4IDAgOC0zLjU4MiA4LThzLTMuNTgyLTgtOC04LTggMy41ODItOCA4IDMuNTgyIDggOCA4em00MCA0MGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIC8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 drop-shadow-md">
              {contact.title || 'مناسبتك تستحق الفخامة'}
            </h2>
            <p className="text-base md:text-lg text-white mb-10 font-bold">{contact.subtitle || 'قهوجي الرياض – مؤسسة نخوة القهوة'}</p>
            <div className="flex flex-col items-center gap-8">
              <a
                className="inline-flex items-center gap-4 bg-gradient-to-r from-gold via-primary-magenta to-gold hover:from-white hover:to-white hover:text-coffee-dark text-white px-14 py-6 rounded-3xl font-black text-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
                href={`tel:${hero.phone || '0532637955'}`}
                style={{ boxShadow: '0 15px 50px rgba(183,66,167,0.5)' }}
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
                <li><a className="hover:text-gold transition-colors flex items-center justify-center md:justify-start gap-2" href={`tel:${hero.phone || '0532637955'}`}><span className="material-symbols-outlined text-xs">chevron_left</span>اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">تواصل معنا</h3>
              <div className="space-y-4">
                <a href={`tel:${hero.phone || '0532637955'}`} className="flex items-center justify-center md:justify-start gap-3 text-white hover:text-gold transition-colors">
                  <span className="material-symbols-outlined text-gold">call</span>
                  <span dir="ltr">{hero.phone || '0532637955'}</span>
                </a>
                <p className="flex items-center justify-center md:justify-start gap-3 text-white hover:text-gold transition-colors">
                  <span className="material-symbols-outlined text-gold">location_on</span>
                  الرياض، المملكة العربية السعودية
                </p>
                {hero.whatsapp && (
                  <a href={`https://wa.me/${hero.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 text-white hover:text-gold transition-colors">
                    <span className="material-symbols-outlined text-gold">chat</span>
                    واتساب
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-sm text-gray-400">© 2025 قهوجي الرياض - مؤسسة نخوة القهوة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-gold hover:bg-coffee-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 hover:scale-110 animate-bounce"
          title="العودة للأعلى"
        >
          <span className="material-symbols-outlined text-2xl">arrow_upward</span>
        </button>
      )}

      {/* WhatsApp Float Button */}
      {hero.whatsapp && (
        <a
          href={`https://wa.me/${hero.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 hover:scale-110"
          title="تواصل عبر واتساب"
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
        </a>
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
