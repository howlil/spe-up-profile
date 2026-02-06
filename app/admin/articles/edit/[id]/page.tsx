/** @format */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Save, ArrowLeft, Eye, Upload, X, Trash2, Loader2 } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-50 animate-pulse rounded-md"></div>
});

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  status: string;
  categoryId: string | null;
  tags: string[];
}

const statuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'align': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['blockquote'],
    ['link', 'image'],
    ['clean']
  ],
};

const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'align', 'list', 'blockquote', 'link', 'image'
];

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [articleRes, categoriesRes] = await Promise.all([
        fetch(`/api/articles/${params.id}`),
        fetch('/api/articles/categories')
      ]);

      if (articleRes.status === 401 || categoriesRes.status === 401) {
        router.push(`/login?redirect=/admin/articles/edit/${params.id}`);
        return;
      }

      if (articleRes.ok) {
        const data = await articleRes.json();
        setArticle({
          ...data.article,
          tags: data.article.tags || []
        });
      }
      if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !article) return;

    setIsUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setArticle({ ...article, coverImage: data.url });
      } else {
        setUploadError(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleContentChange = (content: string) => {
    if (article) setArticle({ ...article, content });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() && article) {
      e.preventDefault();
      if (!article.tags.includes(tagInput.trim().toLowerCase())) {
        setArticle({ ...article, tags: [...article.tags, tagInput.trim().toLowerCase()] });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (article) {
      setArticle({ ...article, tags: article.tags.filter(tag => tag !== tagToRemove) });
    }
  };

  const handleSave = async () => {
    if (!article) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/articles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      if (res.ok) {
        router.push('/admin/articles');
      }
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/articles/${params.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/articles');
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (!article) return <div className="flex items-center justify-center h-full"><p>Article not found</p></div>;

  const wordCount = article.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900"><ArrowLeft className="w-4 h-4" /></button>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">Edit Article</h1>
            <p className="text-xs text-gray-500">{wordCount} words</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowDeleteModal(true)} className="h-9 px-4 border border-red-300 text-red-600 text-sm rounded-md hover:bg-red-50 flex items-center gap-1.5 font-medium transition-colors">
            <Trash2 className="w-4 h-4" />Delete
          </button>
          <button onClick={() => setIsPreview(!isPreview)} className={`h-9 px-4 text-sm rounded-md flex items-center gap-1.5 font-medium transition-colors ${isPreview ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            <Eye className="w-4 h-4" />{isPreview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={handleSave} disabled={isSaving} className="h-9 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-md flex items-center gap-1.5 disabled:opacity-50 font-medium transition-colors">
            <Save className="w-4 h-4" />{isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {!isPreview ? (
                  <>
                    <div className="relative border-b border-gray-200">
                      {article.coverImage ? (
                        <div className="relative h-48 bg-gray-100">
                          <img src={article.coverImage} alt="Cover" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = ''; setUploadError('Failed to load image'); }} />
                          <button onClick={() => setArticle({ ...article, coverImage: '' })} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-md">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div onClick={() => !isUploading && coverInputRef.current?.click()} className={`h-32 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 ${isUploading ? 'opacity-50 cursor-wait' : ''}`}>
                          {isUploading ? (
                            <><Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-2" /><p className="text-xs text-gray-500">Uploading...</p></>
                          ) : (
                            <><Upload className="w-6 h-6 text-gray-400 mb-2" /><p className="text-xs text-gray-500">Click to upload cover image</p>{uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}</>
                          )}
                        </div>
                      )}
                      <input ref={coverInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                    <div className="p-4 border-b border-gray-200">
                      <input type="text" value={article.title} onChange={(e) => setArticle({ ...article, title: e.target.value })} className="w-full text-xl font-semibold text-gray-900 focus:outline-none" placeholder="Article title..." />
                      <textarea value={article.excerpt || ''} onChange={(e) => setArticle({ ...article, excerpt: e.target.value })} className="w-full mt-2 text-sm text-gray-600 focus:outline-none resize-none" placeholder="Write a brief excerpt..." rows={2} />
                    </div>
                    <div className="quill-wrapper">
                      <ReactQuill theme="snow" value={article.content} onChange={handleContentChange} modules={quillModules} formats={quillFormats} placeholder="Start writing..." className="quill-editor" />
                    </div>
                  </>
                ) : (
                  <div className="p-6">
                    {article.coverImage && <img src={article.coverImage} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title || 'Untitled'}</h1>
                    {article.excerpt && <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>}
                    <div className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: article.content || '<p>No content yet...</p>' }} />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Article Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">Category</label>
                    <select value={article.categoryId || ''} onChange={(e) => setArticle({ ...article, categoryId: e.target.value || null })} className="w-full h-9 px-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="" className="text-gray-600">No category</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id} className="text-gray-900">{cat.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">Status</label>
                    <select value={article.status} onChange={(e) => setArticle({ ...article, status: e.target.value })} className="w-full h-9 px-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      {statuses.map(s => <option key={s} value={s} className="text-gray-900">{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">Author</label>
                    <input type="text" value={article.author} onChange={(e) => setArticle({ ...article, author: e.target.value })} className="w-full h-9 px-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Author name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">Tags</label>
                    <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} className="w-full h-9 px-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Type and press Enter" />
                    {article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {article.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            #{tag}<button onClick={() => handleRemoveTag(tag)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
            <div className="p-4 border-b border-gray-200"><h3 className="text-base font-semibold text-gray-900">Delete Article</h3></div>
            <div className="p-4"><p className="text-sm text-gray-700">Are you sure? This cannot be undone.</p></div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowDeleteModal(false)} className="h-8 px-4 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md transition-colors">Cancel</button>
              <button onClick={handleDelete} className="h-8 px-4 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .quill-wrapper .quill-editor { border: none; }
        .quill-wrapper .ql-toolbar { border: none; border-bottom: 1px solid #e5e7eb; background: #f9fafb; padding: 8px 12px; }
        .quill-wrapper .ql-container { border: none; font-size: 14px; min-height: 400px; }
        .quill-wrapper .ql-editor { padding: 16px; min-height: 400px; color: #374151; line-height: 1.7; }
        .quill-wrapper .ql-editor.ql-blank::before { color: #9ca3af; font-style: normal; }
      `}</style>
    </>
  );
}