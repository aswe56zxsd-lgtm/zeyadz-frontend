'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { postsAPI, getImageUrl } from '@/lib/api';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      fetchResults();
    } else {
      setLoading(false);
      setPosts([]);
    }
  }, [query, page]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await postsAPI.getAll({ search: query, page, limit: 9 });
      setPosts(response.data.data.posts);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching search results:', error);
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
            <span className="text-white">نتائج البحث</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 font-main">
            نتائج البحث
          </h1>
          {query && (
            <p className="text-text-muted font-main text-sm sm:text-base">
              نتائج البحث عن: <span className="text-primary font-semibold">"{query}"</span>
            </p>
          )}
          {pagination && (
            <div className="mt-3 sm:mt-4">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/20 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold font-main">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {pagination.total} نتيجة
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <main className="flex-1 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!query ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-surface-dark rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 font-main">ابحث عن مقالات</h2>
              <p className="text-text-muted font-main text-sm sm:text-base">استخدم مربع البحث في الأعلى للبحث عن المقالات</p>
            </div>
          ) : loading ? (
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

              {pagination && pagination.pages > 1 && (
                <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
                  <Pagination pagination={pagination} onPageChange={setPage} />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-surface-dark rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 font-main">لا توجد نتائج</h2>
              <p className="text-text-muted mb-4 sm:mb-6 font-main text-sm sm:text-base">
                لم نتمكن من العثور على نتائج تطابق "{query}"
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-text-muted font-main">
                <p>جرب:</p>
                <ul className="list-disc list-inside">
                  <li>استخدام كلمات مختلفة</li>
                  <li>استخدام كلمات أقل</li>
                  <li>التحقق من الإملاء</li>
                </ul>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-primary/90 transition-colors font-main mt-4 sm:mt-6"
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

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-background-dark">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
