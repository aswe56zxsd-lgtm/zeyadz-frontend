'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// Coffee Cup Logo Component
const CoffeeLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor"/>
  </svg>
);

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuOpen && !e.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'bg-[#c59a35] backdrop-blur-sm border-[#b08a2f]/30'
          : 'bg-[#c59a35] backdrop-blur-sm border-[#b08a2f]/30'
      }`}
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 text-[#1c1c1c] transition-opacity hover:opacity-80">
            <div className="size-8 text-white">
              <CoffeeLogo className="h-full w-full" />
            </div>
            <h2 className="text-xl font-bold font-main text-[#1c1c1c]">قهوجي الرياض</h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="التنقل الرئيسي">
            <Link href="/" className="text-sm font-medium font-main text-[#1c1c1c] hover:text-white transition-colors">
              الرئيسية
            </Link>
            <Link href="/categories" className="text-sm font-medium font-main text-white">
              المدونة
            </Link>
            <Link href="/tags" className="text-sm font-medium font-main text-[#1c1c1c] hover:text-white transition-colors">
              خدماتنا
            </Link>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#1c1c1c]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في المقالات..."
              className="w-64 rounded-lg border-0 bg-white/90 py-2 pr-10 pl-4 text-sm text-[#1c1c1c] placeholder-[#1c1c1c]/60 focus:ring-2 focus:ring-white focus:outline-none font-main"
            />
          </form>

          {/* User Menu - يظهر فقط للمستخدمين المسجلين (الأدمن) */}
          {isAuthenticated && (
            <div className="relative user-menu-container">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="قائمة المستخدم"
                aria-expanded={userMenuOpen}
              >
                <div className="w-7 h-7 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white text-xs font-semibold">
                  {user?.name?.charAt(0)}
                </div>
                <svg className={`w-4 h-4 text-[#1c1c1c] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-surface-dark rounded-xl shadow-xl border border-white/5 py-2 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white">{user?.name}</p>
                    <p className="text-xs text-text-muted">{user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-muted hover:bg-white/5 hover:text-primary transition-colors font-main"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    لوحة التحكم
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-muted hover:bg-white/5 hover:text-primary transition-colors font-main"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    الملف الشخصي
                  </Link>
                  <hr className="my-2 border-white/10" />
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-main"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1c1c1c] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#1c1c1c] border-t border-[#5a555a]/30">
          <div className="px-4 py-4 space-y-2">
            {/* Search Mobile */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#c59a35]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في المقالات..."
                className="w-full rounded-lg border-0 bg-[#3a353a] py-2.5 pr-10 pl-4 text-sm text-white placeholder-[#b0b0b0] focus:ring-2 focus:ring-primary focus:outline-none font-main"
              />
            </form>

            <Link
              href="/"
              className="block py-2.5 px-4 text-sm font-medium text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors font-main"
              onClick={() => setMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              href="/categories"
              className="block py-2.5 px-4 text-sm font-medium text-primary hover:bg-white/5 rounded-lg transition-colors font-main"
              onClick={() => setMenuOpen(false)}
            >
              المدونة
            </Link>
            <Link
              href="/tags"
              className="block py-2.5 px-4 text-sm font-medium text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors font-main"
              onClick={() => setMenuOpen(false)}
            >
              خدماتنا
            </Link>

            {/* قائمة المستخدم - تظهر فقط للأدمن المسجلين */}
            {isAuthenticated && (
              <div className="pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-[#c59a35] flex items-center justify-center text-[#1c1c1c] text-sm font-semibold">
                      {user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-text-muted">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block py-2.5 px-4 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors font-main"
                    onClick={() => setMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-right py-2.5 px-4 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-main"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
