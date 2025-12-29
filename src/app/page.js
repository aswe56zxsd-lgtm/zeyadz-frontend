'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { postsAPI, categoriesAPI, tagsAPI, getImageUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [settings, setSettings] = useState({
    phone_number: '0509702164',
    whatsapp_number: '966509702164',
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('الكل');

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsRes, categoriesRes, tagsRes] = await Promise.all([
        postsAPI.getAll({ page, limit: 6 }),
        categoriesAPI.getAll(),
        tagsAPI.getPopular(10),
      ]);

      setPosts(postsRes.data.data.posts);
      setPagination(postsRes.data.data.pagination);
      setCategories(categoriesRes.data.data);
      setTags(tagsRes.data.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['الكل', 'قهوة', 'ثقافة', 'ضيافة'];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 m-4 sm:m-6 lg:m-8 rounded-3xl overflow-hidden ring-2 ring-primary/40 shadow-2xl shadow-primary/20">
          <Image
            src={getImageUrl('/uploads/images/1.webp')}
            alt="قهوجيين وصبابين الرياض"
            fill
            priority
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            className="object-cover object-center"
            quality={50}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIRAAAgIBAwUBAAAAAAAAAAAAAQIDBAAFESESEyIxQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABkRAAIDAQAAAAAAAAAAAAAAAAECABEhMf/aAAwDAQACEQMRAD8AzKhqVynp0Vd4QrxDbrt5AHIGfjHOZLBZqU7ZlirwpGVIO8QA5+/eMY0TQBQEiZn/2Q=="
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c]/30 via-[#1c1c1c]/50 to-[#1c1c1c]/95" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-2xl mx-auto sm:mx-0 text-center sm:text-right">
            <div className="mb-4 sm:mb-6 inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase text-primary backdrop-blur-sm font-main">
              خدمات الضيافة
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-main mb-4 sm:mb-6 leading-tight">
              قهوجيين وصبابين الرياض
            </h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-7 sm:leading-8 text-gray-200 font-main max-w-xl mx-auto sm:mx-0">
              نقدم لكم أرقى خدمات الضيافة والقهوة العربية الأصيلة لجميع المناسبات والحفلات بأيدي خبراء محترفين
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-start justify-center">
              <a
                href={`https://wa.me/${settings.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#1c1c1c] px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#252525] transition-colors font-main"
              >
                احجز عبر واتساب
              </a>
              <a
                href={`tel:+${settings.whatsapp_number}`}
                className="inline-flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/20 transition-colors font-main"
              >
                اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 border-b border-[#3a3a3a] pb-4 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-main">خدمة مميزة</h2>
          <Link href="/categories" className="flex items-center gap-1 text-sm font-semibold text-[#e8b84a] hover:text-primary font-main self-start sm:self-auto">
            عرض الكل
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="group relative overflow-hidden rounded-2xl bg-surface-dark shadow-xl ring-2 ring-primary/30 transition-all hover:shadow-2xl hover:ring-primary/50">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden m-3 mb-0 md:mb-3 md:ml-0 rounded-xl">
              <Image
                src={getImageUrl('/uploads/images/2.webp')}
                alt="قهوجي محترف لجميع المناسبات"
                fill
                sizes="(max-width: 480px) 90vw, (max-width: 768px) 60vw, 400px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105 rounded-xl ring-1 ring-primary/20"
                quality={50}
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-surface-dark/70 via-transparent to-transparent md:bg-gradient-to-l md:from-surface-dark/80 md:via-transparent md:to-transparent"></div>
            </div>
            <div className="p-5 sm:p-6 md:p-8 md:w-1/3 flex flex-col justify-center relative z-10 bg-surface-dark">
              <div className="mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 font-main">ضيافة</span>
                <span className="text-xs text-text-muted font-main">خدمة متميزة</span>
              </div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl font-bold text-white font-main leading-tight group-hover:text-primary transition-colors">
                قهوجي محترف لجميع المناسبات
              </h3>
              <p className="mb-4 sm:mb-6 text-sm text-text-muted leading-relaxed font-main line-clamp-3">
                نقدم خدمات القهوة العربية الأصيلة مع فريق محترف من القهوجيين والصبابين لجعل مناسبتك مميزة
              </p>
              <a
                href={`https://wa.me/${settings.whatsapp_number}`}
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 font-main"
              >
                احجز الآن
                <svg className="w-4 h-4 mr-1 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="bg-[#252525] py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-main">أحدث المقالات</h2>
            <div className="flex flex-wrap gap-2 sm:bg-surface-dark sm:p-1 sm:rounded-lg sm:border sm:border-white/5">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors font-main ${
                    activeFilter === filter
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-dark sm:bg-transparent text-text-muted hover:bg-white/5'
                  }`}
                  aria-label={`تصفية حسب ${filter}`}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col overflow-hidden rounded-2xl bg-surface-dark ring-1 ring-primary/20">
                  <div className="m-3 mb-0 rounded-xl aspect-[16/9] w-auto skeleton ring-2 ring-primary/30"></div>
                  <div className="p-4 sm:p-5">
                    <div className="h-4 skeleton w-1/4 mb-2 rounded"></div>
                    <div className="h-5 skeleton w-3/4 mb-2 rounded"></div>
                    <div className="h-4 skeleton w-full rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              {pagination && pagination.pages > 1 && (
                <div className="mt-8 sm:mt-12 flex justify-center">
                  <Pagination pagination={pagination} onPageChange={setPage} />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-surface-dark rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-text-muted font-main">لا توجد مقالات حالياً</p>
            </div>
          )}

          {posts.length > 0 && pagination && pagination.pages > 1 && (
            <div className="mt-8 sm:mt-12 flex justify-center">
              <button
                className="flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors font-main"
                aria-label="تحميل المزيد من المقالات"
              >
                تحميل المزيد
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden bg-primary/90 py-10 sm:py-12 lg:py-16">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1c1c1c 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-main mb-3 sm:mb-4">
            تواصل معنا الآن
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/90 mb-6 sm:mb-8 font-main px-4">
            للحجز والاستفسار عن خدماتنا، تواصل معنا عبر الواتساب أو الاتصال المباشر
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface-dark px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-surface-dark/80 transition-colors font-main"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.5 14.4c-.3-.2-1.8-.9-2-.1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>
              </svg>
              واتساب
            </a>
            <a
              href={`tel:+${settings.whatsapp_number}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/20 transition-colors font-main"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.3a1 1 0 01.9.7l1.5 4.5a1 1 0 01-.5 1.2l-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.7.9V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
              </svg>
              {settings.phone_number}
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${settings.whatsapp_number}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
        aria-label="تواصل معنا عبر واتساب"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.5 14.4c-.3-.2-1.8-.9-2-.1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>
        </svg>
      </a>
    </div>
  );
}
