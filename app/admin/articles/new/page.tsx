/** @format */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Save, ArrowLeft, Eye, Upload, X, Loader2 } from 'lucide-react';
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

export default function NewArticlePage() {
    const router = useRouter();
    const coverInputRef = useRef<HTMLInputElement>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState({
        title: '',
        content: '',
        excerpt: '',
        categoryId: '',
        status: 'DRAFT',
        author: '',
        coverImage: '',
        tags: [] as string[]
    });

    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/articles/categories');
            if (res.status === 401) {
                router.push('/login?redirect=/admin/articles/new');
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setCategories(data.categories || []);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (res.ok) {
                setArticle(prev => ({ ...prev, coverImage: data.url }));
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
        setArticle(prev => ({ ...prev, content }));
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!article.tags.includes(tagInput.trim().toLowerCase())) {
                setArticle(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim().toLowerCase()] }));
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setArticle(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    const handleSave = async (publish: boolean = false) => {
        setIsSaving(true);
        try {
            const body = {
                ...article,
                status: publish ? 'PUBLISHED' : article.status,
                categoryId: article.categoryId || null
            };

            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
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

    const wordCount = article.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;

    if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

    return (
        <>
            <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900"><ArrowLeft className="w-4 h-4" /></button>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-900">New Article</h1>
                        <p className="text-xs text-gray-500">{wordCount} words</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsPreview(!isPreview)} className={`h-9 px-4 text-sm rounded-md flex items-center gap-1.5 font-medium transition-colors ${isPreview ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        <Eye className="w-4 h-4" />{isPreview ? 'Edit' : 'Preview'}
                    </button>
                    <button onClick={() => handleSave(false)} disabled={isSaving} className="h-9 px-4 border border-gray-300 text-gray-700 text-sm rounded-md flex items-center gap-1.5 disabled:opacity-50 font-medium hover:bg-gray-50 transition-colors">
                        <Save className="w-4 h-4" />Save Draft
                    </button>
                    <button onClick={() => handleSave(true)} disabled={isSaving || !article.title.trim()} className="h-9 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-md flex items-center gap-1.5 disabled:opacity-50 font-medium transition-colors">
                        {isSaving ? 'Publishing...' : 'Publish'}
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
                                                    <button onClick={() => setArticle(prev => ({ ...prev, coverImage: '' }))} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-md">
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
                                            <input type="text" value={article.title} onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))} className="w-full text-xl font-semibold text-gray-900 focus:outline-none" placeholder="Article title..." />
                                            <textarea value={article.excerpt} onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))} className="w-full mt-2 text-sm text-gray-600 focus:outline-none resize-none" placeholder="Write a brief excerpt..." rows={2} />
                                        </div>
                                        <div className="quill-wrapper">
                                            <ReactQuill theme="snow" value={article.content} onChange={handleContentChange} modules={quillModules} formats={quillFormats} placeholder="Start writing..." className="quill-editor" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-6">
                                        {article.coverImage && <img src={article.coverImage} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
                                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title || 'Untitled Article'}</h1>
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
                                        <select value={article.categoryId} onChange={(e) => setArticle(prev => ({ ...prev, categoryId: e.target.value }))} className="w-full h-9 px-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                            <option value="" className="text-gray-600">No category</option>
                                            {categories.map(cat => <option key={cat.id} value={cat.id} className="text-gray-900">{cat.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-800 mb-1">Status</label>
                                        <select value={article.status} onChange={(e) => setArticle(prev => ({ ...prev, status: e.target.value }))} className="w-full h-9 px-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                            {statuses.map(s => <option key={s} value={s} className="text-gray-900">{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-800 mb-1">Author</label>
                                        <input type="text" value={article.author} onChange={(e) => setArticle(prev => ({ ...prev, author: e.target.value }))} className="w-full h-9 px-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Author name" />
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
