'use client';

export default function Pagination({ pagination, onPageChange }) {
  const { page, pages, total } = pagination;

  if (pages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (pages <= maxVisiblePages) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(pages);
      } else if (page >= pages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = pages - 3; i <= pages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(page - 1);
        pageNumbers.push(page);
        pageNumbers.push(page + 1);
        pageNumbers.push('...');
        pageNumbers.push(pages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 sm:px-3 sm:py-2 rounded-lg bg-surface-dark border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-main"
        aria-label="الصفحة السابقة"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
            disabled={pageNum === '...'}
            className={`min-w-[36px] sm:min-w-[40px] px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-main transition-colors ${
              pageNum === page
                ? 'bg-primary text-white'
                : pageNum === '...'
                ? 'bg-transparent text-text-muted cursor-default'
                : 'bg-surface-dark border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="p-2 sm:px-3 sm:py-2 rounded-lg bg-surface-dark border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-main"
        aria-label="الصفحة التالية"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Total - Hidden on very small screens */}
      <span className="hidden sm:inline-block text-xs sm:text-sm text-text-muted mr-2 sm:mr-4 font-main">
        إجمالي: {total} مقال
      </span>
    </div>
  );
}
