'use client';

import { useState, useEffect } from 'react';
import { uploadAPI, getImageUrl } from '@/lib/api';
import Pagination from '@/components/Pagination';
import toast from 'react-hot-toast';

export default function MediaPage() {
  const [files, setFiles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchFiles();
  }, [page]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await uploadAPI.getMyFiles({ page, limit: 20 });
      setFiles(response.data.data.files);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      if (selectedFiles.length === 1) {
        await uploadAPI.uploadImage(selectedFiles[0]);
        toast.success('تم رفع الملف بنجاح');
      } else {
        await uploadAPI.uploadImages(selectedFiles);
        toast.success(`تم رفع ${selectedFiles.length} ملفات بنجاح`);
      }
      fetchFiles();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل رفع الملفات');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الملف؟')) return;

    try {
      await uploadAPI.deleteFile(id);
      toast.success('تم حذف الملف بنجاح');
      fetchFiles();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل حذف الملف');
    }
  };

  const copyUrl = (path) => {
    const url = getImageUrl(path);
    navigator.clipboard.writeText(url);
    toast.success('تم نسخ الرابط');
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">الملفات</h1>
        <label className="btn btn-primary cursor-pointer">
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              جاري الرفع...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              رفع ملفات
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Files Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : files.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="group relative bg-white rounded-lg border overflow-hidden"
            >
              <div className="aspect-square">
                {file.mime_type?.startsWith('image/') ? (
                  <img
                    src={getImageUrl(file.path)}
                    alt={file.original_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(file.path)}
                  className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100"
                  title="نسخ الرابط"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <a
                  href={getImageUrl(file.path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100"
                  title="فتح"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
                  title="حذف"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* File Info */}
              <div className="p-2">
                <p className="text-sm text-gray-700 truncate" title={file.original_name}>
                  {file.original_name}
                </p>
                <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 mb-4">لا توجد ملفات مرفوعة</p>
          <label className="btn btn-primary cursor-pointer inline-flex">
            رفع ملفات
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {pagination && (
        <Pagination pagination={pagination} onPageChange={setPage} />
      )}
    </div>
  );
}
