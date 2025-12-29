'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { postsAPI, categoriesAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Pagination from '@/components/Pagination';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function PostsPage() {
  const { isEditor } = useAuth();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    status: '',
    category: '',
    search: '',
  });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [filters.page, filters.status, filters.category]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await postsAPI.getAdminAll({
        page: filters.page,
        limit: 10,
        status: filters.status || undefined,
        category: filters.category || undefined,
        search: filters.search || undefined,
      });
      setPosts(response.data.data.posts);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
    fetchPosts();
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;

    try {
      await postsAPI.delete(id);
      toast.success('تم حذف المقال بنجاح');
      fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل حذف المقال');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await postsAPI.updateStatus(id, status);
      toast.success('تم تحديث حالة المقال');
      fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل تحديث الحالة');
    }
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'd MMM yyyy', { locale: ar });
    } catch {
      return '-';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">المقالات</h1>
        <Link href="/dashboard/posts/new" className="btn btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          مقال جديد
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="بحث..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="input flex-1 min-w-[200px]"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            className="input w-auto"
          >
            <option value="">جميع الحالات</option>
            <option value="published">منشور</option>
            <option value="pending">معلق</option>
            <option value="draft">مسودة</option>
            <option value="rejected">مرفوض</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
            className="input w-auto"
          >
            <option value="">جميع التصنيفات</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-secondary">بحث</button>
        </form>
      </div>

      {/* Posts Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="animate-pulse space-y-4 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">العنوان</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">التصنيف</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الكاتب</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الحالة</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">التاريخ</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="font-medium text-gray-800 hover:text-primary-600"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {post.category_name || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {post.author_name}
                    </td>
                    <td className="px-4 py-3">
                      {isEditor ? (
                        <select
                          value={post.status}
                          onChange={(e) => handleStatusChange(post.id, e.target.value)}
                          className={`text-sm px-2 py-1 rounded border-0 ${
                            post.status === 'published' ? 'bg-green-100 text-green-700' :
                            post.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            post.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <option value="draft">مسودة</option>
                          <option value="pending">معلق</option>
                          <option value="published">منشور</option>
                          <option value="rejected">مرفوض</option>
                        </select>
                      ) : (
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
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/posts/${post.id}/edit`}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                          title="تعديل"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        {post.status === 'published' && (
                          <Link
                            href={`/posts/${post.slug}`}
                            target="_blank"
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg"
                            title="عرض"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        )}
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="حذف"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">لا توجد مقالات</p>
            <Link href="/dashboard/posts/new" className="btn btn-primary">
              إنشاء مقال جديد
            </Link>
          </div>
        )}
      </div>

      {pagination && (
        <Pagination
          pagination={pagination}
          onPageChange={(page) => setFilters({ ...filters, page })}
        />
      )}
    </div>
  );
}
