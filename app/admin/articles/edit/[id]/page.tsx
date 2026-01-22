/** @format */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  Bold, 
  Italic, 
  Underline,
  Link,
  Image,
  List,
  ListOrdered,
  Quote,
  Type,
  Eye,
  Upload
} from 'lucide-react';

// Mock article data - in real app, this would come from API
const mockArticle = {
  id: 1,
  title: 'Advanced Petroleum Engineering Techniques in Deep Water Drilling',
  content: `
    <h2>Introduction</h2>
    <p>Exploring cutting-edge methodologies and technologies that are revolutionizing deep water drilling operations in the petroleum industry.</p>
    
    <h3>Key Technologies</h3>
    <p>The advancement of petroleum engineering has led to breakthrough technologies that enable efficient deep water drilling operations. These include:</p>
    
    <ul>
      <li>Advanced drilling fluid systems</li>
      <li>Real-time monitoring technologies</li>
      <li>Enhanced safety protocols</li>
      <li>Environmental protection measures</li>
    </ul>
    
    <h3>Implementation Challenges</h3>
    <p>While these technologies offer significant advantages, implementation comes with unique challenges that require careful consideration and planning.</p>
    
    <blockquote>
      "The future of petroleum engineering lies in the successful integration of advanced technologies with sustainable practices." - Industry Expert
    </blockquote>
    
    <h3>Conclusion</h3>
    <p>As the industry continues to evolve, these advanced techniques will play a crucial role in meeting global energy demands while maintaining environmental responsibility.</p>
  `,
  topic: 'Technology',
  status: 'published',
  author: 'Dr. Sarah Johnson',
  dateCreated: '2026-01-15',
  coverImage: '/articles/article1.webp',
  tags: ['drilling', 'technology', 'petroleum', 'engineering']
};

const topics = ['Technology', 'Research', 'Innovation', 'Sustainability', 'Career Development', 'Academic'];
const statuses = ['draft', 'published', 'archived'];

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  
  const [article, setArticle] = useState(mockArticle);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // Format toolbar functions
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertImage = () => {
    if (imageUrl) {
      formatText('insertImage', imageUrl);
      setImageUrl('');
      setShowImageModal(false);
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const link = document.createElement('a');
        link.href = linkUrl;
        link.textContent = linkText;
        link.target = '_blank';
        link.className = 'text-blue-600 hover:underline';
        range.insertNode(link);
        selection.removeAllRanges();
      }
      setLinkUrl('');
      setLinkText('');
      setShowLinkModal(false);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setArticle(prev => ({
        ...prev,
        content: editorRef.current!.innerHTML
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving article:', article);
    setIsSaving(false);
    // Show success message or redirect
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In real app, upload to server and get URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        formatText('insertImage', url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Articles</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-lg font-semibold text-gray-900">Edit Article</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                isPreview 
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                  : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Eye className="w-4 h-4" />
              {isPreview ? 'Edit Mode' : 'Preview'}
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Article Meta */}
              <div className="p-6 border-b border-gray-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      value={article.title}
                      onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 transition-all"
                      placeholder="Enter article title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={article.coverImage}
                        onChange={(e) => setArticle(prev => ({ ...prev, coverImage: e.target.value }))}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 transition-all"
                        placeholder="https://example.com/image.jpg"
                      />
                      <label className="flex items-center gap-2 px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-all text-blue-700 font-medium">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {!isPreview ? (
                <>
                  {/* Toolbar */}
                  <div className="p-4 border-b border-gray-200 bg-slate-50">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Text Formatting */}
                      <div className="flex items-center gap-1 border-r border-gray-300 pr-3">
                        <button
                          onClick={() => formatText('bold')}
                          className="p-2 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all text-gray-700 border border-transparent hover:border-blue-200"
                          title="Bold"
                        >
                          <Bold className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => formatText('italic')}
                          className="p-2 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all text-gray-700 border border-transparent hover:border-blue-200"
                          title="Italic"
                        >
                          <Italic className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => formatText('underline')}
                          className="p-2 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all text-gray-700 border border-transparent hover:border-blue-200"
                          title="Underline"
                        >
                          <Underline className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Headings */}
                      <div className="flex items-center gap-1 border-r border-gray-300 pr-3">
                        <select
                          onChange={(e) => formatText('formatBlock', e.target.value)}
                          className="px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium transition-all"
                          defaultValue=""
                        >
                          <option value="">Format</option>
                          <option value="h1">Heading 1</option>
                          <option value="h2">Heading 2</option>
                          <option value="h3">Heading 3</option>
                          <option value="p">Paragraph</option>
                        </select>
                      </div>

                      {/* Lists */}
                      <div className="flex items-center gap-1 border-r border-gray-300 pr-3">
                        <button
                          onClick={() => formatText('insertUnorderedList')}
                          className="p-2 hover:bg-amber-100 hover:text-amber-700 rounded-md transition-all text-gray-700 border border-transparent hover:border-amber-200"
                          title="Bullet List"
                        >
                          <List className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => formatText('insertOrderedList')}
                          className="p-2 hover:bg-amber-100 hover:text-amber-700 rounded-md transition-all text-gray-700 border border-transparent hover:border-amber-200"
                          title="Numbered List"
                        >
                          <ListOrdered className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Insert */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setShowLinkModal(true)}
                          className="p-2 hover:bg-emerald-100 hover:text-emerald-700 rounded-md transition-all text-gray-700 border border-transparent hover:border-emerald-200"
                          title="Insert Link"
                        >
                          <Link className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowImageModal(true)}
                          className="p-2 hover:bg-emerald-100 hover:text-emerald-700 rounded-md transition-all text-gray-700 border border-transparent hover:border-emerald-200"
                          title="Insert Image"
                        >
                          <Image className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => formatText('formatBlock', 'blockquote')}
                          className="p-2 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all text-gray-700 border border-transparent hover:border-purple-200"
                          title="Quote"
                        >
                          <Quote className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Editor */}
                  <div className="p-6 bg-white">
                    <div
                      ref={editorRef}
                      contentEditable
                      dangerouslySetInnerHTML={{ __html: article.content }}
                      onInput={handleContentChange}
                      className="min-h-96 prose max-w-none focus:outline-none border-2 border-dashed border-gray-200 rounded-lg p-6 focus:border-blue-400 focus:bg-blue-50/30 transition-all"
                      style={{
                        lineHeight: '1.7',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </>
              ) : (
                /* Preview */
                <div className="p-6">
                  <div className="mb-6">
                    {article.coverImage && (
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{article.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>By {article.author}</span>
                      <span>•</span>
                      <span>{article.dateCreated}</span>
                      <span>•</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {article.topic}
                      </span>
                    </div>
                  </div>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic *
                  </label>
                  <select
                    value={article.topic}
                    onChange={(e) => setArticle(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium transition-all"
                  >
                    {topics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={article.status}
                    onChange={(e) => setArticle(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium transition-all"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={article.author}
                    onChange={(e) => setArticle(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={article.tags.join(', ')}
                    onChange={(e) => setArticle(prev => ({ 
                      ...prev, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 transition-all"
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Insert Image</h3>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 transition-all"
                placeholder="https://example.com/image.jpg"
                autoFocus
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={insertImage}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium shadow-md"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Insert Link</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 transition-all"
                  placeholder="Link text"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 transition-all"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}