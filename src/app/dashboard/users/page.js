'use client';

import { useState, useEffect } from 'react';
import { usersAPI } from '@/lib/api';
import Pagination from '@/components/Pagination';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    role: '',
    search: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'writer',
    bio: '',
  });

  useEffect(() => {
    fetchUsers();
  }, [filters.page, filters.role]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await usersAPI.getAll({
        page: filters.page,
        limit: 10,
        role: filters.role || undefined,
        search: filters.search || undefined,
      });
      setUsers(response.data.data.users);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
    fetchUsers();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('الاسم والبريد الإلكتروني مطلوبان');
      return;
    }

    if (!editingUser && !formData.password) {
      toast.error('كلمة المرور مطلوبة');
      return;
    }

    try {
      if (editingUser) {
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password;
        await usersAPI.update(editingUser.id, updateData);
        toast.success('تم تحديث المستخدم بنجاح');
      } else {
        await usersAPI.create(formData);
        toast.success('تم إنشاء المستخدم بنجاح');
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      bio: user.bio || '',
    });
    setShowModal(true);
  };

  const handleToggleActive = async (user) => {
    try {
      await usersAPI.update(user.id, { is_active: !user.is_active });
      toast.success(user.is_active ? 'تم تعطيل المستخدم' : 'تم تفعيل المستخدم');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل تحديث الحالة');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      await usersAPI.delete(id);
      toast.success('تم حذف المستخدم بنجاح');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل حذف المستخدم');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '', role: 'writer', bio: '' });
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'd MMM yyyy', { locale: ar });
    } catch {
      return '-';
    }
  };

  const getRoleBadge = (role) => {
    const roles = {
      admin: { label: 'مدير', class: 'badge-danger' },
      editor: { label: 'محرر', class: 'badge-warning' },
      writer: { label: 'كاتب', class: 'badge-info' },
    };
    return roles[role] || { label: role, class: 'badge-info' };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">المستخدمين</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          مستخدم جديد
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="بحث بالاسم أو البريد..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="input flex-1 min-w-[200px]"
          />
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value, page: 1 })}
            className="input w-auto"
          >
            <option value="">جميع الأدوار</option>
            <option value="admin">مدير</option>
            <option value="editor">محرر</option>
            <option value="writer">كاتب</option>
          </select>
          <button type="submit" className="btn btn-secondary">بحث</button>
        </form>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="animate-pulse space-y-4 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">المستخدم</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الدور</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الحالة</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">تاريخ التسجيل</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-bold">
                            {user.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${getRoleBadge(user.role).class}`}>
                        {getRoleBadge(user.role).label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleActive(user)}
                        className={`badge cursor-pointer ${user.is_active ? 'badge-success' : 'badge-danger'}`}
                      >
                        {user.is_active ? 'نشط' : 'معطل'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
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
            <p className="text-gray-500">لا يوجد مستخدمين</p>
          </div>
        )}
      </div>

      {pagination && (
        <Pagination
          pagination={pagination}
          onPageChange={(page) => setFilters({ ...filters, page })}
        />
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? 'تعديل المستخدم' : 'مستخدم جديد'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="أدخل الاسم"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور {editingUser ? '(اتركها فارغة لعدم التغيير)' : '*'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الدور *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input"
                >
                  <option value="writer">كاتب</option>
                  <option value="editor">محرر</option>
                  <option value="admin">مدير</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نبذة
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="input resize-none"
                  rows={3}
                  placeholder="نبذة عن المستخدم (اختياري)"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingUser ? 'تحديث' : 'إنشاء'}
                </button>
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
