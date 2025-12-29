import axios from 'axios';

// Production URLs - hardcoded for reliability
const PRODUCTION_API = 'https://qahwajie-alriyadh.com/api';
const PRODUCTION_BASE = 'https://qahwajie-alriyadh.com';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || PRODUCTION_API;

// Base URL for uploads/images - ALWAYS use production
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${PRODUCTION_BASE}${path}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة التوكن لكل طلب
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// معالجة الأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Posts API
export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getAdminAll: (params) => api.get('/posts/admin/all', { params }),
  getBySlug: (slug) => api.get(`/posts/slug/${slug}`),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  updateStatus: (id, status) => api.patch(`/posts/${id}/status`, { status }),
  delete: (id) => api.delete(`/posts/${id}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getBySlug: (slug) => api.get(`/categories/slug/${slug}`),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Tags API
export const tagsAPI = {
  getAll: () => api.get('/tags'),
  getPopular: (limit = 10) => api.get('/tags/popular', { params: { limit } }),
  getBySlug: (slug) => api.get(`/tags/slug/${slug}`),
  create: (data) => api.post('/tags', data),
  update: (id, data) => api.put(`/tags/${id}`, data),
  delete: (id) => api.delete(`/tags/${id}`),
};

// Comments API
export const commentsAPI = {
  getByPost: (postId) => api.get(`/comments/post/${postId}`),
  getAdminAll: (params) => api.get('/comments/admin/all', { params }),
  create: (data) => api.post('/comments', data),
  updateStatus: (id, status) => api.patch(`/comments/${id}/status`, { status }),
  delete: (id) => api.delete(`/comments/${id}`),
};

// Users API
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Upload API
export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getMyFiles: (params) => api.get('/upload/my-files', { params }),
  deleteFile: (id) => api.delete(`/upload/${id}`),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentPosts: (limit = 5) => api.get('/dashboard/recent-posts', { params: { limit } }),
  getRecentComments: (limit = 5) => api.get('/dashboard/recent-comments', { params: { limit } }),
  getTopPosts: (limit = 5) => api.get('/dashboard/top-posts', { params: { limit } }),
  getMonthlyStats: () => api.get('/dashboard/monthly-stats'),
};

// Settings API
export const settingsAPI = {
  getAll: () => api.get('/settings'),
  getAdmin: () => api.get('/settings/admin'),
  update: (key, value) => api.put(`/settings/${key}`, { value }),
  updateAll: (settings) => api.put('/settings', settings),
};

export default api;
