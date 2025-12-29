'use client';

import { useState, useEffect } from 'react';
import { categoriesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent_id: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('اسم التصنيف مطلوب');
      return;
    }

    try {
      if (editingCategory) {
        await categoriesAPI.update(editingCategory.id, formData);
        toast.success('تم تحديث التصنيف بنجاح');
      } else {
        await categoriesAPI.create(formData);
        toast.success('تم إنشاء التصنيف بنجاح');
      }
      fetchCategories();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      parent_id: category.parent_id || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا التصنيف؟')) return;

    try {
      await categoriesAPI.delete(id);
      toast.success('تم حذف التصنيف بنجاح');
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل حذف التصنيف');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', parent_id: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">التصنيفات</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          تصنيف جديد
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الاسم</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الوصف</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">المقالات</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{category.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">
                      {category.description || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge badge-info">{category.posts_count || 0}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
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
            <p className="text-gray-500 mb-4">لا توجد تصنيفات</p>
            <button onClick={() => setShowModal(true)} className="btn btn-primary">
              إنشاء تصنيف جديد
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? 'تعديل التصنيف' : 'تصنيف جديد'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم التصنيف *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="أدخل اسم التصنيف"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input resize-none"
                  rows={3}
                  placeholder="وصف التصنيف (اختياري)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التصنيف الأب
                </label>
                <select
                  value={formData.parent_id}
                  onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                  className="input"
                >
                  <option value="">بدون</option>
                  {categories
                    .filter((c) => c.id !== editingCategory?.id)
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingCategory ? 'تحديث' : 'إنشاء'}
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
