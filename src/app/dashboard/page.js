'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardAPI } from '@/lib/api';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, recentPostsRes, topPostsRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentPosts(5),
        dashboardAPI.getTopPosts(5),
      ]);

      setStats(statsRes.data.data);
      setRecentPosts(recentPostsRes.data.data);
      setTopPosts(topPostsRes.data.data);

      if (isAdmin) {
        const commentsRes = await dashboardAPI.getRecentComments(5);
        setRecentComments(commentsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'إجمالي المقالات',
      value: stats?.posts?.total || 0,
      icon: '📝',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'المنشورة',
      value: stats?.posts?.published || 0,
      icon: '✅',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'في الانتظار',
      value: stats?.posts?.pending || 0,
      icon: '⏳',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'المسودات',
      value: stats?.posts?.draft || 0,
      icon: '📋',
      color: 'bg-gray-50 text-gray-600',
    },
  ];

  if (isAdmin) {
    statCards.push(
      {
        title: 'المستخدمين',
        value: stats?.totalUsers || 0,
        icon: '👥',
        color: 'bg-purple-50 text-purple-600',
      },
      {
        title: 'إجمالي المشاهدات',
        value: stats?.totalViews || 0,
        icon: '👁️',
        color: 'bg-indigo-50 text-indigo-600',
      }
    );
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card h-24 bg-gray-100"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">مرحباً، {user?.name}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">{stat.title}</div>
                <div className="text-2xl font-bold mt-1">{stat.value}</div>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">أحدث المقالات</h2>
            <Link href="/dashboard/posts" className="text-primary-600 text-sm hover:underline">
              عرض الكل
            </Link>
          </div>
          {recentPosts.length > 0 ? (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/dashboard/posts/${post.id}/edit`}
                      className="font-medium text-gray-800 hover:text-primary-600 truncate block"
                    >
                      {post.title}
                    </Link>
                    <div className="text-sm text-gray-500">{post.author_name}</div>
                  </div>
                  <span className={`badge ${
                    post.status === 'published' ? 'badge-success' :
                    post.status === 'pending' ? 'badge-warning' :
                    post.status === 'rejected' ? 'badge-danger' : 'badge-info'
                  }`}>
                    {post.status === 'published' && 'منشور'}
                    {post.status === 'pending' && 'معلق'}
                    {post.status === 'draft' && 'مسودة'}
                    {post.status === 'rejected' && 'مرفوض'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">لا توجد مقالات</p>
          )}
        </div>

        {/* Top Posts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">الأكثر مشاهدة</h2>
          </div>
          {topPosts.length > 0 ? (
            <div className="space-y-3">
              {topPosts.map((post, index) => (
                <div key={post.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      className="font-medium text-gray-800 hover:text-primary-600 truncate block"
                    >
                      {post.title}
                    </Link>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {post.views}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">لا توجد مقالات</p>
          )}
        </div>

        {/* Recent Comments (Admin/Editor only) */}
        {isAdmin && recentComments.length > 0 && (
          <div className="card lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">أحدث التعليقات</h2>
              <Link href="/dashboard/comments" className="text-primary-600 text-sm hover:underline">
                عرض الكل
              </Link>
            </div>
            <div className="space-y-3">
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{comment.commenter_name}</span>
                    <span className={`badge ${
                      comment.status === 'approved' ? 'badge-success' :
                      comment.status === 'pending' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {comment.status === 'approved' && 'موافق'}
                      {comment.status === 'pending' && 'معلق'}
                      {comment.status === 'rejected' && 'مرفوض'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{comment.content}</p>
                  <div className="text-xs text-gray-400 mt-2">على: {comment.post_title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
