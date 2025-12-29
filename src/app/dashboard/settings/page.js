'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://qahwajie-alriyadh.com';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    phone_number: '',
    whatsapp_number: '',
    site_name: '',
    site_description: '',
    email: '',
    address: '',
    working_hours: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/settings/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const settingsObj = {};
        response.data.data.forEach(s => {
          settingsObj[s.setting_key] = s.setting_value || '';
        });
        setSettings(prev => ({ ...prev, ...settingsObj }));
      }
    } catch (error) {
      console.error('خطأ في جلب الإعدادات:', error);
      toast.error('حدث خطأ في جلب الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/api/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('تم حفظ الإعدادات بنجاح');
      }
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error);
      toast.error('حدث خطأ في حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c59a35]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">إعدادات الموقع</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* معلومات الاتصال */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#c59a35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            معلومات الاتصال
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={settings.phone_number}
                onChange={(e) => handleChange('phone_number', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#c59a35] focus:ring-1 focus:ring-[#c59a35] outline-none"
                placeholder="05xxxxxxxx"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1">يظهر في زر "اتصل الآن"</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                رقم الواتساب (مع رمز الدولة)
              </label>
              <input
                type="tel"
                value={settings.whatsapp_number}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#c59a35] focus:ring-1 focus:ring-[#c59a35] outline-none"
                placeholder="966509702164"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1">بدون + أو 00 (مثال: 966509702164)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#c59a35] focus:ring-1 focus:ring-[#c59a35] outline-none"
                placeholder="info@example.com"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                ساعات العمل
              </label>
              <input
                type="text"
                value={settings.working_hours}
                onChange={(e) => handleChange('working_hours', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#c59a35] focus:ring-1 focus:ring-[#c59a35] outline-none"
                placeholder="08:00 - 23:00"
              />
            </div>
          </div>
        </div>

        {/* معلومات الموقع */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#c59a35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            معلومات الموقع
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                اسم الموقع
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => handleChange('site_name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#c59a35] focus:ring-1 focus:ring-[#c59a35] outline-none"
                placeholder="اسم الموقع"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                وصف الموقع
              </label>
              <textarea
                value={settings.site_description}
                onChange={(e) => handleChange('site_description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#c59a35] focus:ring-1 focus:ring-[#c59a35] outline-none resize-none"
                placeholder="وصف مختصر للموقع"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                العنوان
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#c59a35] focus:ring-1 focus:ring-[#c59a35] outline-none"
                placeholder="العنوان الكامل"
              />
            </div>
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#c59a35] text-white font-semibold rounded-lg hover:bg-[#b08a2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                جاري الحفظ...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                حفظ الإعدادات
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
