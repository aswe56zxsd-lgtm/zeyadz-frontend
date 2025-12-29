import Link from 'next/link';

// Coffee Cup Logo Component
const CoffeeLogo = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#c59a35] pt-10 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 border-t border-[#b08a2f]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Logo & Description */}
          <div className="flex flex-col gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-[#1c1c1c]">
              <div className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                <CoffeeLogo className="h-full w-full" />
              </div>
              <span className="text-base sm:text-lg font-bold font-main text-[#1c1c1c]">قهوجي الرياض</span>
            </div>
            <p className="text-xs sm:text-sm text-[#2d2a2d] leading-relaxed font-main">
              نقدم أرقى خدمات الضيافة والقهوة العربية الأصيلة لجميع المناسبات والحفلات في الرياض
            </p>
            <div className="flex gap-4 mt-1 sm:mt-2">
              <a href="https://wa.me/966509702164" target="_blank" rel="noopener noreferrer" className="text-[#2d2a2d] hover:text-white transition-colors" aria-label="واتساب">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2-.1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>
                </svg>
              </a>
              <a href="tel:+966509702164" className="text-[#2d2a2d] hover:text-white transition-colors" aria-label="اتصال">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.3a1 1 0 01.9.7l1.5 4.5a1 1 0 01-.5 1.2l-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.7.9V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1c1c1c] uppercase mb-3 sm:mb-4 font-main">خدماتنا</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/categories" className="text-[#2d2a2d] hover:text-white transition-colors text-xs sm:text-sm font-main">
                  قهوجي للحفلات
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-[#2d2a2d] hover:text-white transition-colors text-xs sm:text-sm font-main">
                  صبابين قهوة
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-[#2d2a2d] hover:text-white transition-colors text-xs sm:text-sm font-main">
                  مباشرين
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-[#2d2a2d] hover:text-white transition-colors text-xs sm:text-sm font-main">
                  خدمة الأفراح
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1c1c1c] uppercase mb-3 sm:mb-4 font-main">تواصل معنا</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 text-[#2d2a2d] text-xs sm:text-sm font-main">
                <svg className="w-4 h-4 mt-0.5 text-[#1c1c1c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-start gap-2 text-[#2d2a2d] text-xs sm:text-sm font-main">
                <svg className="w-4 h-4 mt-0.5 text-[#1c1c1c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>متاح على مدار الساعة</span>
              </li>
              <li className="flex items-start gap-2 text-[#2d2a2d] text-xs sm:text-sm font-main">
                <svg className="w-4 h-4 mt-0.5 text-[#1c1c1c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.3a1 1 0 01.9.7l1.5 4.5a1 1 0 01-.5 1.2l-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.7.9V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
                </svg>
                <span dir="ltr">0509702164</span>
              </li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div className="rounded-lg overflow-hidden bg-[#1c1c1c] p-4 sm:p-5 lg:p-6 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase mb-3 sm:mb-4 font-main">احجز الآن</h3>
            <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 font-main">
              للحجز والاستفسار تواصل معنا مباشرة
            </p>
            <a
              href="https://wa.me/966509702164"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 sm:py-2.5 bg-[#c59a35] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#b08a2f] transition-colors font-main"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.5 14.4c-.3-.2-1.8-.9-2-.1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>
              </svg>
              واتساب
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#1c1c1c]/20 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs text-[#2d2a2d] font-main text-center sm:text-right">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} قهوجي الرياض
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="/privacy" className="text-xs text-[#2d2a2d] hover:text-white font-main transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="text-xs text-[#2d2a2d] hover:text-white font-main transition-colors">
              شروط الخدمة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
