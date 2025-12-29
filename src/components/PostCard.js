import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { getImageUrl } from '@/lib/api';

export default function PostCard({ post }) {
  const formatDate = (date) => {
    try {
      return format(new Date(date), 'd MMM yyyy', { locale: ar });
    } catch {
      return '';
    }
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-surface-dark shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ring-1 ring-primary/20">
      {/* Image */}
      <Link href={`/posts/${post.slug}`} className="block" aria-label={`قراءة المقال: ${post.title}`}>
        <div className="relative aspect-[16/9] w-full overflow-hidden m-3 mb-0 rounded-xl">
          {post.featured_image ? (
            <Image
              src={getImageUrl(post.featured_image)}
              alt={post.title || 'صورة المقال'}
              fill
              sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, 380px"
              className="object-cover object-center transition-transform duration-500 hover:scale-105 rounded-xl ring-2 ring-primary/30"
              quality={50}
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-[#252525] flex items-center justify-center rounded-xl ring-2 ring-primary/30">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {/* Shadow overlay for blending */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-surface-dark/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        {/* Category & Time */}
        <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
          {post.category_name && (
            <span className="text-xs font-semibold text-primary uppercase font-main truncate">
              {post.category_name}
            </span>
          )}
          <span className="text-xs text-text-muted flex items-center gap-1 font-main flex-shrink-0">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDate(post.published_at)}
          </span>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="mb-2 text-base sm:text-lg lg:text-xl font-bold text-white font-main line-clamp-2 hover:text-primary transition-colors leading-snug">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mb-3 sm:mb-4 flex-1 text-xs sm:text-sm text-text-muted line-clamp-2 sm:line-clamp-3 font-main leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="text-xs px-2 py-0.5 sm:py-1 bg-[#252525] text-text-muted rounded hover:bg-primary hover:text-white transition-colors font-main"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Author */}
        <div className="mt-auto flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#252525] flex items-center justify-center flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-primary">
              {post.author_name?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-sm font-medium text-white font-main truncate block">{post.author_name}</span>
          </div>
          <div className="flex items-center gap-1 text-text-muted flex-shrink-0">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.5 12C3.7 7.9 7.5 5 12 5s8.3 2.9 9.5 7c-1.2 4.1-5 7-9.5 7s-8.3-2.9-9.5-7z" />
            </svg>
            <span className="text-xs font-main">{post.views || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
