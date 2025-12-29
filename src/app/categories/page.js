'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categoriesAPI, getImageUrl } from '@/lib/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Navbar />

      {/* Header */}
      <section className="relative py-10 sm:py-12 lg:py-16">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(34, 25, 17, 0.7), rgba(34, 25, 17, 0.95)), url('${getImageUrl('/uploads/images/1.jpeg')}')`
            }}
          ></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs sm:text-sm text-text-muted mb-3 sm:mb-4 font-main">
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <span className="mx-1.5 sm:mx-2">/</span>
            <span className="text-white">التصنيفات</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 font-main">التصنيفات</h1>
          <p className="text-text-muted font-main max-w-2xl text-sm sm:text-base">استعرض المقالات حسب التصنيف واكتشف محتوى متنوع في مجالات مختلفة</p>
        </div>
      </section>

      {/* Categories */}
      <main className="flex-1 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-surface-dark rounded-lg sm:rounded-xl p-4 sm:p-6 ring-1 ring-white/5">
                  <div className="h-5 sm:h-6 skeleton w-1/2 mb-2 sm:mb-3"></div>
                  <div className="h-4 skeleton w-3/4"></div>
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group bg-surface-dark rounded-lg sm:rounded-xl p-4 sm:p-6 ring-1 ring-white/5 hover:ring-primary/30 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors font-main mb-1.5 sm:mb-2">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-text-muted text-xs sm:text-sm line-clamp-2 font-main">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="bg-primary/20 text-primary px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold font-main flex-shrink-0">
                      {category.posts_count || 0} مقال
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-text-muted font-main">عرض المقالات</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-surface-dark rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-text-muted font-main text-sm sm:text-base">لا توجد تصنيفات</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
