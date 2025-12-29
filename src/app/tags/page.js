'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { tagsAPI, getImageUrl } from '@/lib/api';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await tagsAPI.getAll();
      setTags(response.data.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
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
            <span className="text-white">الوسوم</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 font-main">الوسوم</h1>
          <p className="text-text-muted font-main max-w-2xl text-sm sm:text-base">استعرض المقالات حسب الوسوم واكتشف المواضيع التي تهمك</p>
        </div>
      </section>

      {/* Tags */}
      <main className="flex-1 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-10 sm:h-12 w-24 sm:w-28 skeleton rounded-full"></div>
              ))}
            </div>
          ) : tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.slug}`}
                  className="group bg-surface-dark border border-white/10 text-white px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg hover:bg-primary hover:border-primary transition-all flex items-center gap-2 sm:gap-3 font-main"
                >
                  <span className="group-hover:text-white">#{tag.name}</span>
                  <span className="bg-white/10 text-text-muted text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">
                    {tag.posts_count || 0}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-surface-dark rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <p className="text-text-muted font-main text-sm sm:text-base">لا توجد وسوم</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
