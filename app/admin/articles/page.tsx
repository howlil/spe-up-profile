/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Plus, Edit, Trash2, Eye, Calendar, User, Tag, FileText, Loader2
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  views: number;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  category: { id: string; name: string; slug: string } | null;
}

export default function ArticlesAdmin() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const statuses = ['All Status', 'PUBLISHED', 'DRAFT', 'ARCHIVED'];

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/articles');
      if (res.status === 401) {
        router.push('/login?redirect=/admin/articles');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || a.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (a: Article) => { setSelectedArticle(a); setShowDeleteModal(true); };
  const handleEdit = (id: string) => router.push(`/admin/articles/edit/${id}`);

  const confirmDelete = async () => {
    if (!selectedArticle) return;
    try {
      const res = await fetch(`/api/articles/${selectedArticle.id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter(a => a.id !== selectedArticle.id));
        setShowDeleteModal(false);
      }
    } catch (error) { console.error('Delete failed:', error); }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-emerald-100 text-emerald-800';
      case 'DRAFT': return 'bg-amber-100 text-amber-800';
      case 'ARCHIVED': return 'bg-slate-100 text-slate-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <>
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Articles Management</h1>
          <p className="text-xs text-gray-500">{filteredArticles.length} articles</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => router.push('/admin/articles/categories')} className="h-9 px-4 border border-purple-300 bg-purple-50 text-purple-700 rounded-md text-sm font-medium flex items-center gap-1.5 hover:bg-purple-100 transition-colors">
            <Tag className="w-4 h-4" />Categories
          </button>
          <button onClick={() => router.push('/admin/articles/new')} className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors">
            <Plus className="w-4 h-4" />New Article
          </button>
        </div>
      </header>

      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search articles..." value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full h-10 pl-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
          </div>
          <select value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="h-10 px-3 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            {statuses.map(s => <option key={s} value={s} className="text-gray-900">{s}</option>)}
          </select>
        </div>
      </div>

      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Article</th>
                <th className="text-left p-3 font-medium text-gray-700">Author</th>
                <th className="text-left p-3 font-medium text-gray-700">Category</th>
                <th className="text-left p-3 font-medium text-gray-700">Views</th>
                <th className="text-left p-3 font-medium text-gray-700">Status</th>
                <th className="text-center p-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedArticles.map(a => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                        {a.coverImage ? <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover" /> : <FileText className="w-6 h-6 text-gray-400 m-3" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{a.title}</p>
                        <p className="text-gray-500 line-clamp-1">{a.excerpt || 'No excerpt'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3"><span className="text-gray-900">{a.author}</span></td>
                  <td className="p-3"><span className="text-gray-900">{a.category?.name || '-'}</span></td>
                  <td className="p-3"><div className="flex items-center gap-1 text-gray-500"><Eye className="w-3 h-3" /><span>{a.views}</span></div></td>
                  <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(a.status)}`}>{a.status}</span></td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleEdit(a.id)} className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md"><Edit className="w-3.5 h-3.5 text-amber-600" /></button>
                      <button onClick={() => handleDelete(a)} className="w-7 h-7 flex items-center justify-center hover:bg-red-50 rounded-md"><Trash2 className="w-3.5 h-3.5 text-red-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredArticles.length === 0 && <div className="text-center py-12"><FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" /><p className="text-sm text-gray-500">No articles found</p></div>}
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Delete Article</h2>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-800">Delete <strong className="text-gray-900">{selectedArticle?.title}</strong>?</p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowDeleteModal(false)} className="h-8 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
              <button onClick={confirmDelete} className="h-8 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}