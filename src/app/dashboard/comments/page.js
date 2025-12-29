'use client';

import { useState, useEffect } from 'react';
import { commentsAPI } from '@/lib/api';
import Pagination from '@/components/Pagination';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    status: '',
  });

  useEffect(() => {
    fetchComments();
  }, [filters.page, filters.status]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await commentsAPI.getAdminAll({
        page: filters.page,
        limit: 20,
        status: filters.status || undefined,
      });
      setComments(response.data.data.comments);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await commentsAPI.updateStatus(id, status);
      toast.success('تم تحديث حالة التعليق');
      fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل تحديث الحالة');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا التعليق؟')) return;

    try {
      await commentsAPI.delete(id);
      toast.success('تم حذف التعليق بنجاح');
      fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل حذف التعليق');
    }
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'd MMM yyyy - HH:mm', { locale: ar });
    } catch {
      return '-';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">التعليقات</h1>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">تصفية:</span>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            className="input w-auto"
          >
            <option value="">جميع التعليقات</option>
            <option value="pending">في الانتظار</option>
            <option value="approved">موافق عليها</option>
            <option value="rejected">مرفوضة</option>
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="card h-32 bg-gray-100"></div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {(comment.user_name || comment.guest_name)?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">
                        {comment.user_name || comment.guest_name}
                        {comment.guest_email && (
                          <span className="text-sm text-gray-400 mr-2">({comment.guest_email})</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{formatDate(comment.created_at)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <div className="text-sm text-gray-500">
                    على مقال: <span className="text-primary-600">{comment.post_title}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={comment.status}
                    onChange={(e) => handleStatusChange(comment.id, e.target.value)}
                    className={`text-sm px-3 py-1.5 rounded-lg border-0 cursor-pointer ${
                      comment.status === 'approved' ? 'bg-green-100 text-green-700' :
                      comment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}
                  >
                    <option value="pending">معلق</option>
                    <option value="approved">موافق</option>
                    <option value="rejected">مرفوض</option>
                  </select>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500">لا توجد تعليقات</p>
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
