'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

// Coffee Cup Logo Component
const CoffeeLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor"/>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('تم تسجيل الدخول بنجاح');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark py-8 sm:py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white">
            <div className="w-8 h-8 sm:w-10 sm:h-10 text-primary">
              <CoffeeLogo className="h-full w-full" />
            </div>
            <span className="text-xl sm:text-2xl font-bold font-main">قهوجي الرياض</span>
          </Link>
          <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-white font-main">تسجيل الدخول</h2>
          <p className="mt-2 text-sm sm:text-base text-text-muted font-main">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-primary hover:text-primary/80 transition-colors">
              أنشئ حساباً جديداً
            </Link>
          </p>
        </div>

        <div className="bg-surface-dark rounded-lg sm:rounded-xl p-5 sm:p-8 ring-1 ring-white/5">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2 font-main">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#252525] border-0 rounded-lg text-white placeholder-text-muted focus:ring-2 focus:ring-primary focus:outline-none font-main text-sm sm:text-base"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2 font-main">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#252525] border-0 rounded-lg text-white placeholder-text-muted focus:ring-2 focus:ring-primary focus:outline-none font-main text-sm sm:text-base"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-50 font-main"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  جاري تسجيل الدخول...
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
            <p className="text-xs sm:text-sm text-text-muted text-center mb-2 sm:mb-3 font-main">حسابات تجريبية:</p>
            <div className="space-y-2 text-xs sm:text-sm font-main">
              <div className="flex flex-col sm:flex-row sm:justify-between bg-[#252525] p-2.5 sm:p-3 rounded-lg gap-1 sm:gap-0">
                <span className="text-white">المدير:</span>
                <span className="text-text-muted text-xs sm:text-sm">admin@example.com / password123</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between bg-[#252525] p-2.5 sm:p-3 rounded-lg gap-1 sm:gap-0">
                <span className="text-white">المحرر:</span>
                <span className="text-text-muted text-xs sm:text-sm">editor@example.com / password123</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between bg-[#252525] p-2.5 sm:p-3 rounded-lg gap-1 sm:gap-0">
                <span className="text-white">الكاتب:</span>
                <span className="text-text-muted text-xs sm:text-sm">writer@example.com / password123</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-text-muted font-main">
          <Link href="/" className="hover:text-primary transition-colors">
            العودة للرئيسية
          </Link>
        </p>
      </div>
    </div>
  );
}
