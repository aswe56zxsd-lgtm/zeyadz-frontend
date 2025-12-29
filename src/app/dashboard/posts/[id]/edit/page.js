'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { postsAPI, categoriesAPI, tagsAPI, uploadAPI, getImageUrl } from '@/lib/api';
import toast from 'react-hot-toast';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category_id: '',
    tags: [],
    featured_image: '',
    status: 'draft',
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [postRes, categoriesRes, tagsRes] = await Promise.all([
        postsAPI.getById(id),
        categoriesAPI.getAll(),
        tagsAPI.getAll(),
      ]);

      const post = postRes.data.data;
      setFormData({
        title: post.title,
        content: post.content || '',
        excerpt: post.excerpt || '',
        category_id: post.category_id || '',
        tags: post.tags?.map((t) => t.id) || [],
        featured_image: post.featured_image || '',
        status: post.status,
      });
      setCategories(categoriesRes.data.data);
      setTags(tagsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('فشل تحميل المقال');
      router.push('/dashboard/posts');
    } finally {
      setFetching(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadAPI.uploadImage(file);
      setFormData({ ...formData, featured_image: response.data.data.url });
      toast.success('تم رفع الصورة بنجاح');
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  const handleTagToggle = (tagId) => {
    const newTags = formData.tags.includes(tagId)
      ? formData.tags.filter((tid) => tid !== tagId)
      : [...formData.tags, tagId];
    setFormData({ ...formData, tags: newTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('العنوان مطلوب');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('المحتوى مطلوب');
      return;
    }

    setLoading(true);
    try {
      await postsAPI.update(id, {
        ...formData,
        category_id: formData.category_id || null,
      });
      toast.success('تم تحديث المقال بنجاح');
      router.push('/dashboard/posts');
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل تحديث المقال');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card h-20 bg-gray-100"></div>
            <div className="card h-96 bg-gray-100"></div>
          </div>
          <div className="space-y-6">
            <div className="card h-40 bg-gray-100"></div>
            <div className="card h-40 bg-gray-100"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">تعديل المقال</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="card">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان المقال *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input text-xl font-bold"
                placeholder="أدخل عنوان المقال"
              />
            </div>

            {/* Content */}
            <div className="card">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المحتوى *
              </label>
              <Editor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="اكتب محتوى المقال هنا..."
              />
            </div>

            {/* Excerpt */}
            <div className="card">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المقتطف
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="input resize-none"
                rows={3}
                placeholder="وصف مختصر للمقال (اختياري)"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish */}
            <div className="card">
              <h3 className="font-semibold mb-4">النشر</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">الحالة</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="input"
                  >
                    <option value="draft">مسودة</option>
                    <option value="published">منشور</option>
                    <option value="pending">معلق</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-1"
                  >
                    {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn btn-secondary"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="card">
              <h3 className="font-semibold mb-4">الصورة البارزة</h3>
              {formData.featured_image ? (
                <div className="relative mb-4">
                  <img
                    src={getImageUrl(formData.featured_image)}
                    alt="Featured"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, featured_image: '' })}
                    className="absolute top-2 left-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors">
                    {uploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                    ) : (
                      <>
                        <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-500 text-sm">اضغط لرفع صورة</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              )}
            </div>

            {/* Category */}
            <div className="card">
              <h3 className="font-semibold mb-4">التصنيف</h3>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="input"
              >
                <option value="">اختر تصنيفاً</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="card">
              <h3 className="font-semibold mb-4">الوسوم</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.tags.includes(tag.id)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
