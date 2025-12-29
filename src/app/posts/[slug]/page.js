'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { postsAPI, commentsAPI, getImageUrl } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function PostPage() {
  const { slug } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getBySlug(slug);
      setPost(response.data.data);

      const commentsRes = await commentsAPI.getByPost(response.data.data.id);
      setComments(commentsRes.data.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      toast.error('يرجى كتابة تعليق');
      return;
    }

    if (!isAuthenticated && (!guestName.trim() || !guestEmail.trim())) {
      toast.error('يرجى إدخال الاسم والبريد الإلكتروني');
      return;
    }

    setSubmitting(true);

    try {
      const data = {
        content: commentContent,
        post_id: post.id,
      };

      if (!isAuthenticated) {
        data.guest_name = guestName;
        data.guest_email = guestEmail;
      }

      const response = await commentsAPI.create(data);
      toast.success(response.data.message);

      if (response.data.data.status === 'approved') {
        fetchPost();
      }

      setCommentContent('');
      setGuestName('');
      setGuestEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل إرسال التعليق');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'd MMMM yyyy', { locale: ar });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background-dark">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 skeleton w-3/4 mb-4"></div>
              <div className="h-64 skeleton mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 skeleton"></div>
                <div className="h-4 skeleton"></div>
                <div className="h-4 skeleton w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background-dark">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4 font-main">المقال غير موجود</h1>
            <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90 transition-colors font-main">
              العودة للرئيسية
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

      <main className="flex-1 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article>
            {/* Breadcrumb */}
            <nav className="text-xs sm:text-sm text-text-muted mb-4 sm:mb-6 font-main">
              <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span className="mx-1.5 sm:mx-2">/</span>
              {post.category_name && (
                <>
                  <Link href={`/categories/${post.category_slug}`} className="hover:text-primary transition-colors">
                    {post.category_name}
                  </Link>
                  <span className="mx-1.5 sm:mx-2">/</span>
                </>
              )}
              <span className="text-white line-clamp-1">{post.title}</span>
            </nav>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 font-main leading-tight">{post.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-text-muted mb-6 sm:mb-8 font-main text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#252525] rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm sm:text-base">
                    {post.author_name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-white text-sm sm:text-base">{post.author_name}</div>
                  {post.author_bio && (
                    <div className="text-xs sm:text-sm text-text-muted hidden sm:block">{post.author_bio}</div>
                  )}
                </div>
              </div>
              <span className="text-[#3a3a3a] hidden sm:inline">|</span>
              <span className="hidden sm:inline">{formatDate(post.published_at)}</span>
              <span className="text-[#3a3a3a] hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views} مشاهدة
              </span>
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative h-48 sm:h-72 lg:h-96 mb-6 sm:mb-8 rounded-2xl overflow-hidden ring-2 ring-primary/30 shadow-xl shadow-primary/10">
                <Image
                  src={getImageUrl(post.featured_image)}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/40 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="bg-[#252525] text-text-muted px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-white transition-colors font-main"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none mb-8 sm:mb-12 font-main"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Related Posts */}
            {post.related && post.related.length > 0 && (
              <div className="border-t border-[#3a3a3a] pt-6 sm:pt-8 mb-8 sm:mb-12">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 font-main">مقالات ذات صلة</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {post.related.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/posts/${relatedPost.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl bg-surface-dark ring-1 ring-primary/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40"
                    >
                      {relatedPost.featured_image && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden m-3 mb-0 rounded-xl">
                          <div
                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 rounded-xl ring-1 ring-primary/20"
                            style={{ backgroundImage: `url('${getImageUrl(relatedPost.featured_image)}')` }}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-surface-dark/50 via-transparent to-transparent pointer-events-none" />
                        </div>
                      )}
                      <div className="p-3 sm:p-4">
                        <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-primary transition-colors line-clamp-2 font-main">
                          {relatedPost.title}
                        </h4>
                        {relatedPost.excerpt && (
                          <p className="text-xs sm:text-sm text-text-muted mt-1.5 sm:mt-2 line-clamp-2 font-main">
                            {relatedPost.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="border-t border-[#3a3a3a] pt-6 sm:pt-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 font-main">
                التعليقات ({comments.length})
              </h3>

              {/* Comment Form */}
              <div className="bg-surface-dark rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 ring-1 ring-white/5">
                <h4 className="font-bold text-white mb-3 sm:mb-4 font-main text-sm sm:text-base">أضف تعليقاً</h4>
                <form onSubmit={handleSubmitComment} className="space-y-3 sm:space-y-4">
                  {!isAuthenticated && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="اسمك"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#252525] border-0 rounded-lg text-white placeholder-text-muted focus:ring-2 focus:ring-primary focus:outline-none font-main text-sm sm:text-base"
                      />
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="بريدك الإلكتروني"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#252525] border-0 rounded-lg text-white placeholder-text-muted focus:ring-2 focus:ring-primary focus:outline-none font-main text-sm sm:text-base"
                      />
                    </div>
                  )}
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="اكتب تعليقك هنا..."
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#252525] border-0 rounded-lg text-white placeholder-text-muted focus:ring-2 focus:ring-primary focus:outline-none resize-none font-main text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-50 font-main"
                  >
                    {submitting ? 'جاري الإرسال...' : 'إرسال التعليق'}
                  </button>
                </form>
              </div>

              {/* Comments List */}
              {comments.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-surface-dark rounded-lg sm:rounded-xl p-4 sm:p-6 ring-1 ring-white/5">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#252525] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm sm:text-base">
                            {(comment.user_name || comment.guest_name)?.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                            <span className="font-semibold text-white font-main text-sm sm:text-base">
                              {comment.user_name || comment.guest_name}
                            </span>
                            <span className="text-xs sm:text-sm text-text-muted font-main">
                              {formatDate(comment.created_at)}
                            </span>
                          </div>
                          <p className="text-text-muted font-main text-sm sm:text-base">{comment.content}</p>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-3 sm:mt-4 pr-3 sm:pr-6 border-r-2 border-[#3a3a3a] space-y-3 sm:space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#252525] rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary text-xs sm:text-sm font-semibold">
                                      {(reply.user_name || reply.guest_name)?.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                      <span className="font-semibold text-xs sm:text-sm text-white font-main">
                                        {reply.user_name || reply.guest_name}
                                      </span>
                                      <span className="text-xs text-text-muted font-main">
                                        {formatDate(reply.created_at)}
                                      </span>
                                    </div>
                                    <p className="text-text-muted text-xs sm:text-sm font-main">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 text-text-muted font-main text-sm sm:text-base">
                  لا توجد تعليقات بعد. كن أول من يعلق!
                </div>
              )}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
