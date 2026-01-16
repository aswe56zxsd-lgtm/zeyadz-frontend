'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Icons
const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const LogoutIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const SaveIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SectionIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const ServiceIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const StarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CoffeeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 21V19H20V21H2ZM20 8V5H18V8H20ZM20 3C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V8C22 8.53043 21.7893 9.03914 21.4142 9.41421C21.0391 9.78929 20.5304 10 20 10H18V13C18 14.0609 17.5786 15.0783 16.8284 15.8284C16.0783 16.5786 15.0609 17 14 17H6C4.93913 17 3.92172 16.5786 3.17157 15.8284C2.42143 15.0783 2 14.0609 2 13V3H20ZM16 5H4V13C4 13.5304 4.21071 14.0391 4.58579 14.4142C4.96086 14.7893 5.46957 15 6 15H14C14.5304 15 15.0391 14.7893 15.4142 14.4142C15.7893 14.0391 16 13.5304 16 13V5Z"/>
  </svg>
);

const QuestionIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TagIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sections');
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      JSON.parse(userData); // Validate user data format
      fetchData(token);
    } catch {
      router.push('/login');
    }
  }, [router]);

  const fetchData = async (token) => {
    try {
      const response = await fetch(`${API_URL}/homepage/admin/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSaveSection = async (sectionKey, content) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const section = data.sections.find(s => s.section_key === sectionKey);

      const response = await fetch(`${API_URL}/homepage/sections/${sectionKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          section_name: section.section_name,
          content: content,
          is_active: section.is_active
        }),
      });

      const result = await response.json();
      if (result.success) {
        showMessage('success', 'تم الحفظ بنجاح');
        fetchData(token);
      } else {
        showMessage('error', result.message || 'حدث خطأ');
      }
    } catch (error) {
      showMessage('error', 'حدث خطأ في الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveItem = async (endpoint, id, itemData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = id
        ? `${API_URL}/homepage/${endpoint}/${id}`
        : `${API_URL}/homepage/${endpoint}`;

      const response = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });

      const result = await response.json();
      if (result.success) {
        showMessage('success', id ? 'تم التحديث بنجاح' : 'تمت الإضافة بنجاح');
        fetchData(token);
      } else {
        showMessage('error', result.message || 'حدث خطأ');
      }
    } catch (error) {
      showMessage('error', 'حدث خطأ');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (endpoint, id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/homepage/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        showMessage('success', 'تم الحذف بنجاح');
        fetchData(token);
      } else {
        showMessage('error', result.message || 'حدث خطأ');
      }
    } catch (error) {
      showMessage('error', 'حدث خطأ في الحذف');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8305A5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#666666] font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'sections', name: 'أقسام الصفحة', icon: SectionIcon },
    { id: 'services', name: 'الخدمات', icon: ServiceIcon },
    { id: 'features', name: 'المميزات', icon: StarIcon },
    { id: 'events', name: 'المناسبات', icon: CalendarIcon },
    { id: 'drinks', name: 'المشروبات', icon: CoffeeIcon },
    { id: 'faqs', name: 'الأسئلة الشائعة', icon: QuestionIcon },
    { id: 'keywords', name: 'الكلمات المفتاحية', icon: TagIcon },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]" dir="rtl">
      {/* Header - Fixed Position */}
      <header className="bg-[#8305A5] text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo & Title */}
            <div className="flex items-center gap-4 sm:gap-5">
              <Image
                src="/images/logo-new-one.webp"
                alt="قهوجي الرياض"
                width={60}
                height={60}
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] object-contain"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold">قهوجي الرياض</span>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-sm font-medium border border-white/20"
              >
                <HomeIcon className="w-5 h-5" />
                <span>للموقع</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 bg-[#F17405] hover:bg-[#d96504] rounded-xl transition-all duration-300 text-sm font-medium shadow-md"
              >
                <LogoutIcon className="w-5 h-5" />
                <span>خروج</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-white/10 transition-colors border border-white/20"
            >
              {mobileMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#6a0485] border-t border-white/10">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-5 py-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-base"
              >
                <HomeIcon className="w-6 h-6" />
                <span>زيارة الموقع</span>
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 bg-[#F17405] hover:bg-[#d96504] rounded-xl transition-colors text-base font-medium"
              >
                <LogoutIcon className="w-6 h-6" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Message Toast */}
      {message.text && (
        <div className={`fixed top-24 sm:top-28 left-1/2 transform -translate-x-1/2 z-40 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ${
          message.type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <SaveIcon className="w-5 h-5" />
            ) : (
              <CloseIcon className="w-5 h-5" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Main Content with padding for fixed header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pt-24 sm:pt-28 lg:pt-32">
        {/* Tabs - Desktop */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm mb-6 p-2">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#8305A5] text-white shadow-lg shadow-[#8305A5]/30'
                      : 'bg-transparent text-[#666666] hover:bg-[#8305A5]/5 hover:text-[#8305A5]'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs - Mobile/Tablet */}
        <div className="lg:hidden bg-white rounded-2xl shadow-sm mb-4 sm:mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide p-2 gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#8305A5] text-white shadow-lg'
                      : 'bg-[#f8f9fa] text-[#666666]'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Sections Tab */}
          {activeTab === 'sections' && data?.sections && (
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#8305A5] rounded-xl flex items-center justify-center">
                  <SectionIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#333333]">أقسام الصفحة الرئيسية</h2>
                  <p className="text-[#666666] text-sm">إدارة محتوى أقسام الموقع</p>
                </div>
              </div>
              <div className="space-y-4">
                {data.sections.map((section) => (
                  <SectionEditor
                    key={section.id}
                    section={section}
                    onSave={(content) => handleSaveSection(section.section_key, content)}
                    saving={saving}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && data?.services && (
            <div className="p-4 sm:p-6 lg:p-8">
              <ItemsEditor
                title="الخدمات"
                description="إدارة خدمات قهوجي الرياض"
                icon={ServiceIcon}
                items={data.services}
                endpoint="services"
                fields={[
                  { name: 'title', label: 'العنوان', type: 'text', placeholder: 'أدخل عنوان الخدمة' },
                  { name: 'description', label: 'الوصف', type: 'textarea', placeholder: 'أدخل وصف الخدمة' },
                  { name: 'icon', label: 'الأيقونة', type: 'select', options: ['coffee', 'teapot', 'sparkle', 'star', 'trophy'] },
                  { name: 'sort_order', label: 'الترتيب', type: 'number' },
                  { name: 'is_active', label: 'مفعل', type: 'checkbox' },
                ]}
                onSave={handleSaveItem}
                onDelete={handleDeleteItem}
                saving={saving}
              />
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && data?.features && (
            <div className="p-4 sm:p-6 lg:p-8">
              <ItemsEditor
                title="المميزات"
                description="إدارة مميزات الخدمة"
                icon={StarIcon}
                items={data.features}
                endpoint="features"
                fields={[
                  { name: 'title', label: 'العنوان', type: 'text', placeholder: 'أدخل عنوان الميزة' },
                  { name: 'icon', label: 'الأيقونة', type: 'select', options: ['star', 'target', 'coffee', 'trophy', 'tie', 'tray'] },
                  { name: 'sort_order', label: 'الترتيب', type: 'number' },
                  { name: 'is_active', label: 'مفعل', type: 'checkbox' },
                ]}
                onSave={handleSaveItem}
                onDelete={handleDeleteItem}
                saving={saving}
              />
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && data?.events && (
            <div className="p-4 sm:p-6 lg:p-8">
              <ItemsEditor
                title="المناسبات"
                description="إدارة أنواع المناسبات"
                icon={CalendarIcon}
                items={data.events}
                endpoint="events"
                fields={[
                  { name: 'title', label: 'العنوان', type: 'text', placeholder: 'أدخل نوع المناسبة' },
                  { name: 'description', label: 'الوصف', type: 'textarea', placeholder: 'أدخل وصف المناسبة (اختياري)' },
                  { name: 'sort_order', label: 'الترتيب', type: 'number' },
                  { name: 'is_active', label: 'مفعل', type: 'checkbox' },
                ]}
                onSave={handleSaveItem}
                onDelete={handleDeleteItem}
                saving={saving}
              />
            </div>
          )}

          {/* Drinks Tab */}
          {activeTab === 'drinks' && data?.drinks && (
            <div className="p-4 sm:p-6 lg:p-8">
              <ItemsEditor
                title="المشروبات"
                description="إدارة قائمة المشروبات"
                icon={CoffeeIcon}
                items={data.drinks}
                endpoint="drinks"
                fields={[
                  { name: 'name', label: 'اسم المشروب', type: 'text', placeholder: 'أدخل اسم المشروب' },
                  { name: 'category', label: 'الفئة', type: 'select', options: ['القهوة بأنواعها', 'الشاي والأعشاب', 'المشروبات الباردة'] },
                  { name: 'sort_order', label: 'الترتيب', type: 'number' },
                  { name: 'is_active', label: 'مفعل', type: 'checkbox' },
                ]}
                onSave={handleSaveItem}
                onDelete={handleDeleteItem}
                saving={saving}
              />
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === 'faqs' && data?.faqs && (
            <div className="p-4 sm:p-6 lg:p-8">
              <ItemsEditor
                title="الأسئلة الشائعة"
                description="إدارة الأسئلة المتكررة"
                icon={QuestionIcon}
                items={data.faqs}
                endpoint="faqs"
                fields={[
                  { name: 'question', label: 'السؤال', type: 'textarea', placeholder: 'أدخل السؤال' },
                  { name: 'answer', label: 'الجواب', type: 'textarea', placeholder: 'أدخل الجواب' },
                  { name: 'sort_order', label: 'الترتيب', type: 'number' },
                  { name: 'is_active', label: 'مفعل', type: 'checkbox' },
                ]}
                onSave={handleSaveItem}
                onDelete={handleDeleteItem}
                saving={saving}
              />
            </div>
          )}

          {/* Keywords Tab */}
          {activeTab === 'keywords' && (
            <div className="p-4 sm:p-6 lg:p-8">
              <ItemsEditor
                title="الكلمات المفتاحية"
                description="إدارة الكلمات المفتاحية للصفحة الرئيسية"
                icon={TagIcon}
                items={data?.keywords || []}
                endpoint="keywords"
                fields={[
                  { name: 'keyword', label: 'الكلمة المفتاحية', type: 'text', placeholder: 'أدخل الكلمة المفتاحية' },
                  { name: 'sort_order', label: 'الترتيب', type: 'number' },
                  { name: 'is_active', label: 'مفعل', type: 'checkbox' },
                ]}
                onSave={handleSaveItem}
                onDelete={handleDeleteItem}
                saving={saving}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#8305A5] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} قهوجي الرياض - لوحة التحكم
          </p>
        </div>
      </footer>
    </div>
  );
}

// Section Editor Component
function SectionEditor({ section, onSave, saving }) {
  const [content, setContent] = useState(section.content || {});
  const [expanded, setExpanded] = useState(false);

  const handleChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border-2 border-[#e9ecef] rounded-xl overflow-hidden hover:border-[#8305A5]/30 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 sm:p-5 flex items-center justify-between bg-[#f8f9fa] hover:bg-[#e9ecef] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${section.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="font-semibold text-[#333333] text-sm sm:text-base">{section.section_name}</span>
        </div>
        <span className={`transform transition-transform duration-300 text-[#8305A5] ${expanded ? 'rotate-180' : ''}`}>
          <ChevronDownIcon className="w-5 h-5" />
        </span>
      </button>

      {expanded && (
        <div className="p-4 sm:p-6 space-y-4 bg-white">
          {typeof content === 'object' && Object.keys(content).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                {key}
              </label>
              {typeof content[key] === 'string' ? (
                content[key].length > 100 ? (
                  <textarea
                    value={content[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#8305A5] focus:outline-none transition-colors text-sm sm:text-base resize-y min-h-[100px]"
                    rows={3}
                  />
                ) : (
                  <input
                    type="text"
                    value={content[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#8305A5] focus:outline-none transition-colors text-sm sm:text-base"
                  />
                )
              ) : (
                <textarea
                  value={JSON.stringify(content[key], null, 2)}
                  onChange={(e) => {
                    try {
                      handleChange(key, JSON.parse(e.target.value));
                    } catch {}
                  }}
                  className="w-full px-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#8305A5] focus:outline-none font-mono text-xs sm:text-sm transition-colors resize-y min-h-[120px]"
                  rows={5}
                  dir="ltr"
                />
              )}
            </div>
          ))}
          <button
            onClick={() => onSave(content)}
            disabled={saving}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#8305A5] text-white rounded-xl hover:bg-[#6a0485] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <SaveIcon className="w-5 h-5" />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      )}
    </div>
  );
}

// Items Editor Component
function ItemsEditor({ title, description, icon: Icon, items, endpoint, fields, onSave, onDelete, saving }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const handleNew = () => {
    setEditingItem('new');
    const defaultData = {};
    fields.forEach(f => {
      defaultData[f.name] = f.type === 'checkbox' ? true : f.type === 'number' ? 0 : '';
    });
    setFormData(defaultData);
  };

  const handleSave = () => {
    onSave(endpoint, editingItem === 'new' ? null : editingItem, formData);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({});
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#8305A5] rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#333333]">{title}</h2>
            <p className="text-[#666666] text-sm">{description}</p>
          </div>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-[#F17405] text-white rounded-xl hover:bg-[#d96504] transition-all duration-300 font-medium shadow-lg shadow-[#F17405]/30 w-full sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          <span>إضافة جديد</span>
        </button>
      </div>

      {/* Edit Form */}
      {editingItem && (
        <div className="bg-[#f8f9fa] p-4 sm:p-6 rounded-2xl mb-6 border-2 border-[#8305A5]/20">
          <h3 className="text-lg font-bold text-[#8305A5] mb-4">
            {editingItem === 'new' ? 'إضافة عنصر جديد' : 'تعديل العنصر'}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#8305A5] focus:outline-none transition-colors text-sm sm:text-base resize-y min-h-[100px]"
                    rows={3}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#8305A5] focus:outline-none transition-colors text-sm sm:text-base bg-white"
                  >
                    <option value="">اختر...</option>
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[field.name] || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
                      className="w-5 h-5 text-[#8305A5] rounded border-2 border-[#e9ecef] focus:ring-[#8305A5]"
                    />
                    <span className="text-[#666666] text-sm">تفعيل العنصر</span>
                  </label>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [field.name]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
                    }))}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#8305A5] focus:outline-none transition-colors text-sm sm:text-base"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8305A5] text-white rounded-xl hover:bg-[#6a0485] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium w-full sm:w-auto"
            >
              <SaveIcon className="w-5 h-5" />
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-[#e9ecef] text-[#666666] rounded-xl hover:bg-[#dee2e6] transition-colors font-medium w-full sm:w-auto"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-12 bg-[#f8f9fa] rounded-2xl">
            <Icon className="w-12 h-12 text-[#e9ecef] mx-auto mb-3" />
            <p className="text-[#666666]">لا توجد عناصر</p>
            <button
              onClick={handleNew}
              className="mt-4 text-[#8305A5] hover:text-[#6a0485] font-medium text-sm"
            >
              + إضافة عنصر جديد
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 bg-[#f8f9fa] rounded-xl hover:bg-[#e9ecef] transition-all duration-300 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <p className="font-medium text-[#333333] truncate text-sm sm:text-base">
                    {item.title || item.question || item.name || item.keyword}
                  </p>
                </div>
                {item.category && (
                  <span className="inline-block text-xs text-white bg-[#8305A5] px-2.5 py-1 rounded-lg mt-1">
                    {item.category}
                  </span>
                )}
                {item.description && (
                  <p className="text-[#666666] text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-[#8305A5] bg-[#8305A5]/10 hover:bg-[#8305A5] hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
                >
                  <EditIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">تعديل</span>
                </button>
                <button
                  onClick={() => onDelete(endpoint, item.id)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">حذف</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
