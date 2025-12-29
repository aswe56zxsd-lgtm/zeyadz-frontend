'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authAPI, uploadAPI, getImageUrl } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!profileData.name.trim()) {
      toast.error('الاسم مطلوب');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.updateProfile(profileData);
      updateUser(response.data.data);
      toast.success('تم تحديث الملف الشخصي');
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل التحديث');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('كلمات المرور غير متطابقة');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setPasswordLoading(true);
    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('تم تغيير كلمة المرور');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل تغيير كلمة المرور');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadAPI.uploadImage(file);
      // Here you would typically update the user's avatar
      toast.success('تم رفع الصورة بنجاح');
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">الملف الشخصي</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Avatar & Basic Info */}
          <div className="card">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={getImageUrl(user.avatar)}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-primary-600">
                      {user?.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <label className="absolute bottom-0 left-0 p-1.5 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50">
                  {uploading ? (
                    <div className="w-5 h-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"></div>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
                <span className={`badge mt-2 ${
                  user?.role === 'admin' ? 'badge-danger' :
                  user?.role === 'editor' ? 'badge-warning' : 'badge-info'
                }`}>
                  {user?.role === 'admin' && 'مدير'}
                  {user?.role === 'editor' && 'محرر'}
                  {user?.role === 'writer' && 'كاتب'}
                </span>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نبذة عني
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="input resize-none"
                  rows={4}
                  placeholder="اكتب نبذة مختصرة عنك..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">تغيير كلمة المرور</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور الحالية
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تأكيد كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={passwordLoading}
                className="btn btn-secondary"
              >
                {passwordLoading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4">معلومات الحساب</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">البريد الإلكتروني</dt>
                <dd className="text-gray-800">{user?.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">الدور</dt>
                <dd className="text-gray-800">
                  {user?.role === 'admin' && 'مدير'}
                  {user?.role === 'editor' && 'محرر'}
                  {user?.role === 'writer' && 'كاتب'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="card bg-yellow-50 border-yellow-100">
            <h3 className="font-semibold text-yellow-800 mb-2">ملاحظة</h3>
            <p className="text-sm text-yellow-700">
              لتغيير البريد الإلكتروني أو الدور، يرجى التواصل مع مدير النظام.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
