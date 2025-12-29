'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { postsAPI, tagsAPI, getImageUrl } from '@/lib/api';

export default function TagPage() {
  const { slug } = useParams();
  const [tag, setTag] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (slug) {
      fetchData();
    }
  }, [slug, page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tagRes, postsRes] = await Promise.all([
        tagsAPI.getBySlug(slug),
        postsAPI.getAll({ tag: slug, page, limit: 9 }),
      ]);

      setTag(tagRes.data.data);
      setPosts(postsRes.data.data.posts);
      setPagination(postsRes.data.data.pagination);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !tag) {
    return (
      <div className="min-h-screen flex flex-col bg-background-dark">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 skeleton w-1/4 mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-surface-dark rounded-xl ring-1 ring-white/5 overflow-hidden">
                    <div className="aspect-[16/9] w-full skeleton"></div>
                    <div className="p-6">
                      <div className="h-4 skeleton w-1/4 mb-3"></div>
                      <div className="h-6 skeleton w-3/4 mb-2"></div>
                      <div className="h-4 skeleton w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="min-h-screen flex flex-col bg-background-dark">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-surface-dark rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4 font-main">الوسم غير موجود</h1>
            <p className="text-text-muted mb-6 font-main">عذراً، لم نتمكن من العثور على هذا الوسم</p>
            <Link
              href="/tags"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90 transition-colors font-main"
            >
              عرض جميع الوسوم
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <Link href="/tags" className="hover:text-primary transition-colors">الوسوم</Link>
            <span className="mx-1.5 sm:mx-2">/</span>
            <span className="text-white">#{tag.name}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 font-main">#{tag.name}</h1>
          <div className="mt-4 sm:mt-6 flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/20 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold font-main">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {pagination?.total || posts.length} مقال
            </span>
          </div>
        </div>
      </section>

      {/* Posts */}
      <main className="flex-1 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface-dark rounded-lg sm:rounded-xl ring-1 ring-white/5 overflow-hidden">
                  <div className="aspect-[16/9] w-full skeleton"></div>
                  <div className="p-4 sm:p-6">
                    <div className="h-3 sm:h-4 skeleton w-1/4 mb-2 sm:mb-3"></div>
                    <div className="h-5 sm:h-6 skeleton w-3/4 mb-2"></div>
                    <div className="h-3 sm:h-4 skeleton w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
                  <Pagination pagination={pagination} onPageChange={setPage} />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-surface-dark rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-text-muted mb-4 sm:mb-6 font-main text-sm sm:text-base">لا توجد مقالات بهذا الوسم</p>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-primary/90 transition-colors font-main"
              >
                العودة للرئيسية
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
