'use client';

import { useState, useEffect } from 'react';
import { tagsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await tagsAPI.getAll();
      setTags(response.data.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tagName.trim()) {
      toast.error('اسم الوسم مطلوب');
      return;
    }

    try {
      if (editingTag) {
        await tagsAPI.update(editingTag.id, { name: tagName });
        toast.success('تم تحديث الوسم بنجاح');
      } else {
        await tagsAPI.create({ name: tagName });
        toast.success('تم إنشاء الوسم بنجاح');
      }
      fetchTags();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ');
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الوسم؟')) return;

    try {
      await tagsAPI.delete(id);
      toast.success('تم حذف الوسم بنجاح');
      fetchTags();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل حذف الوسم');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTag(null);
    setTagName('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">الوسوم</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          وسم جديد
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-100 rounded-full animate-pulse"></div>
            ))}
          </div>
        ) : tags.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full group"
              >
                <span className="text-gray-700">#{tag.name}</span>
                <span className="text-xs bg-white text-gray-500 px-2 py-0.5 rounded-full">
                  {tag.posts_count || 0}
                </span>
                <div className="hidden group-hover:flex items-center gap-1 mr-2">
                  <button
                    onClick={() => handleEdit(tag)}
                    className="p-1 text-gray-400 hover:text-primary-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">لا توجد وسوم</p>
            <button onClick={() => setShowModal(true)} className="btn btn-primary">
              إنشاء وسم جديد
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingTag ? 'تعديل الوسم' : 'وسم جديد'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الوسم *
                </label>
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="input"
                  placeholder="أدخل اسم الوسم"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingTag ? 'تحديث' : 'إنشاء'}
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
