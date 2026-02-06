/** @format */

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
    Save,
    ArrowLeft,
    Eye,
    Upload,
    X
} from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import for Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-[400px] bg-gray-50 animate-pulse rounded-md"></div>
});

// Mock categories
const categories = [
    { id: 1, name: 'Technology', color: '#3B82F6' },
    { id: 2, name: 'Research', color: '#8B5CF6' },
    { id: 3, name: 'Innovation', color: '#F59E0B' },
    { id: 4, name: 'Sustainability', color: '#10B981' },
    { id: 5, name: 'Career Development', color: '#EC4899' },
    { id: 6, name: 'Academic', color: '#6366F1' },
];

const statuses = ['draft', 'published', 'archived'];

// Quill modules configuration
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
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align',
    'list',
    'blockquote',
    'link', 'image'
];

export default function NewArticlePage() {
    const router = useRouter();
    const coverInputRef = useRef<HTMLInputElement>(null);

    const [article, setArticle] = useState({
        title: '',
        content: '',
        topic: 'Technology',
        status: 'draft',
        author: '',
        coverImage: '',
        tags: [] as string[],
        excerpt: ''
    });

    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [tagInput, setTagInput] = useState('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const url = e.target?.result as string;
                setArticle(prev => ({ ...prev, coverImage: url }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleContentChange = (content: string) => {
        setArticle(prev => ({ ...prev, content }));
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!article.tags.includes(tagInput.trim().toLowerCase())) {
                setArticle(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim().toLowerCase()]
                }));
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setArticle(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSave = async (publish: boolean = false) => {
        setIsSaving(true);
        const dataToSave = {
            ...article,
            status: publish ? 'published' : article.status
        };

        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Saving article:', dataToSave);
        setIsSaving(false);

        if (publish) {
            router.push('/admin/articles');
        }
    };

    // Calculate word count
    const wordCount = article.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;

    return (
        <>
            {/* Header */}
            <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-900">New Article</h1>
                        <p className="text-xs text-gray-500">{wordCount} words</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className={`h-8 px-3 text-xs rounded-md flex items-center gap-1.5 transition-all ${isPreview
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        {isPreview ? 'Edit' : 'Preview'}
                    </button>

                    <button
                        onClick={() => handleSave(false)}
                        disabled={isSaving}
                        className="h-8 px-3 border border-gray-200 text-gray-700 text-xs rounded-md hover:bg-gray-50 flex items-center gap-1.5 disabled:opacity-50 transition-all"
                    >
                        <Save className="w-3.5 h-3.5" />
                        Save Draft
                    </button>

                    <button
                        onClick={() => handleSave(true)}
                        disabled={isSaving || !article.title.trim()}
                        className="h-8 px-3 bg-emerald-500 text-white text-xs rounded-md hover:bg-emerald-600 flex items-center gap-1.5 disabled:opacity-50 transition-all"
                    >
                        {isSaving ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Editor - 2/3 width */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {!isPreview ? (
                                    <>
                                        {/* Cover Image */}
                                        <div className="relative border-b border-gray-200">
                                            {article.coverImage ? (
                                                <div className="relative h-48 bg-gray-100">
                                                    <img
                                                        src={article.coverImage}
                                                        alt="Cover"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        onClick={() => setArticle(prev => ({ ...prev, coverImage: '' }))}
                                                        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => coverInputRef.current?.click()}
                                                    className="h-32 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all"
                                                >
                                                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                                    <p className="text-xs text-gray-500">Click to upload cover image</p>
                                                </div>
                                            )}
                                            <input
                                                ref={coverInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </div>

                                        {/* Title */}
                                        <div className="p-4 border-b border-gray-200">
                                            <input
                                                type="text"
                                                value={article.title}
                                                onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                                                className="w-full text-xl font-semibold text-gray-900 focus:outline-none placeholder-gray-400"
                                                placeholder="Article title..."
                                            />
                                            <textarea
                                                value={article.excerpt}
                                                onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                                                className="w-full mt-2 text-sm text-gray-600 focus:outline-none placeholder-gray-400 resize-none"
                                                placeholder="Write a brief excerpt..."
                                                rows={2}
                                            />
                                        </div>

                                        {/* Quill Editor */}
                                        <div className="quill-wrapper">
                                            <ReactQuill
                                                theme="snow"
                                                value={article.content}
                                                onChange={handleContentChange}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                placeholder="Start writing your article here..."
                                                className="quill-editor"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    /* Preview */
                                    <div className="p-6">
                                        {article.coverImage && (
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                className="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                        )}
                                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title || 'Untitled Article'}</h1>
                                        {article.excerpt && (
                                            <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
                                        )}
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                                            <span>By {article.author || 'Anonymous'}</span>
                                            <span>•</span>
                                            <span>{new Date().toLocaleDateString()}</span>
                                            <span className="px-2 py-0.5 rounded-full text-xs" style={{
                                                backgroundColor: `${categories.find(c => c.name === article.topic)?.color}15`,
                                                color: categories.find(c => c.name === article.topic)?.color
                                            }}>
                                                {article.topic}
                                            </span>
                                        </div>
                                        <div
                                            className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: article.content || '<p class="text-gray-400">No content yet...</p>' }}
                                        />
                                        {article.tags.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {article.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar - 1/3 width */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* Article Settings */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-xs font-semibold text-gray-900 mb-3">Article Settings</h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            value={article.topic}
                                            onChange={(e) => setArticle(prev => ({ ...prev, topic: e.target.value }))}
                                            className="w-full h-8 px-2 text-xs text-gray-900 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={article.status}
                                            onChange={(e) => setArticle(prev => ({ ...prev, status: e.target.value }))}
                                            className="w-full h-8 px-2 text-xs text-gray-900 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                        >
                                            {statuses.map(status => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Author</label>
                                        <input
                                            type="text"
                                            value={article.author}
                                            onChange={(e) => setArticle(prev => ({ ...prev, author: e.target.value }))}
                                            className="w-full h-8 px-2 text-xs text-gray-900 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            placeholder="Author name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Tags</label>
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleAddTag}
                                            className="w-full h-8 px-2 text-xs text-gray-900 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            placeholder="Type and press Enter"
                                        />
                                        {article.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {article.tags.map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                                                    >
                                                        #{tag}
                                                        <button
                                                            onClick={() => handleRemoveTag(tag)}
                                                            className="hover:text-red-600 transition-colors"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
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
        .quill-wrapper .quill-editor {
          border: none;
        }
        .quill-wrapper .ql-toolbar {
          border: none;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 8px 12px;
        }
        .quill-wrapper .ql-container {
          border: none;
          font-size: 14px;
          min-height: 400px;
        }
        .quill-wrapper .ql-editor {
          padding: 16px;
          min-height: 400px;
          color: #374151;
          line-height: 1.7;
        }
        .quill-wrapper .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
        .quill-wrapper .ql-editor h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #111827;
        }
        .quill-wrapper .ql-editor h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }
        .quill-wrapper .ql-editor h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #374151;
        }
        .quill-wrapper .ql-editor blockquote {
          border-left: 3px solid #3b82f6;
          padding-left: 12px;
          margin: 12px 0;
          color: #4b5563;
          font-style: italic;
        }
        .quill-wrapper .ql-editor img {
          max-width: 100%;
          border-radius: 8px;
          margin: 16px 0;
        }
      `}</style>
        </>
    );
}
