/** @format */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  FileText
} from 'lucide-react';

// Mock data untuk artikel
const articlesData = [
  {
    id: 1,
    cover: '/articles/article1.webp',
    title: 'Advanced Petroleum Engineering Techniques in Deep Water Drilling',
    description: 'Exploring cutting-edge methodologies and technologies that are revolutionizing deep water drilling operations.',
    datePost: '15-01-2026',
    createdBy: 'Dr. Sarah Johnson',
    topic: 'Technology',
    status: 'published',
    views: 1243,
  },
  {
    id: 2,
    cover: '/articles/article2.webp',
    title: 'Sustainable Energy Transition: The Role of Petroleum Engineers',
    description: 'How petroleum engineers are adapting their skills to contribute to renewable energy projects.',
    datePost: '12-01-2026',
    createdBy: 'Prof. Michael Chen',
    topic: 'Sustainability',
    status: 'published',
    views: 987,
  },
  {
    id: 3,
    cover: '/articles/article3.webp',
    title: 'AI and Machine Learning Applications in Oil and Gas Exploration',
    description: 'Discovering how artificial intelligence is transforming seismic data analysis.',
    datePost: '10-01-2026',
    createdBy: 'Dr. Amanda Rodriguez',
    topic: 'Innovation',
    status: 'draft',
    views: 0,
  },
  {
    id: 4,
    cover: '/articles/article4.webp',
    title: 'Career Pathways for Young Petroleum Engineers in 2026',
    description: 'A comprehensive guide to career opportunities for the next generation.',
    datePost: '08-01-2026',
    createdBy: 'John Williams',
    topic: 'Career Development',
    status: 'published',
    views: 756,
  },
  {
    id: 5,
    cover: '/articles/article5.webp',
    title: 'Digital Transformation in Oil and Gas Industry',
    description: 'How digital technologies are reshaping traditional petroleum operations.',
    datePost: '05-01-2026',
    createdBy: 'Dr. Lisa Chen',
    topic: 'Technology',
    status: 'published',
    views: 892,
  },
  {
    id: 6,
    cover: '/articles/article6.webp',
    title: 'Environmental Impact Assessment in Drilling Operations',
    description: 'Best practices for minimizing environmental impact during drilling activities.',
    datePost: '03-01-2026',
    createdBy: 'Prof. Robert Smith',
    topic: 'Sustainability',
    status: 'draft',
    views: 0,
  },
  {
    id: 7,
    cover: '/articles/article7.webp',
    title: 'Advanced Reservoir Simulation Techniques',
    description: 'Modern computational methods for reservoir modeling and simulation.',
    datePost: '01-01-2026',
    createdBy: 'Dr. Maria Rodriguez',
    topic: 'Research',
    status: 'published',
    views: 654,
  },
  {
    id: 8,
    cover: '/articles/article8.webp',
    title: 'Safety Protocols in Offshore Operations',
    description: 'Comprehensive safety guidelines for offshore petroleum operations.',
    datePost: '28-12-2025',
    createdBy: 'Captain James Wilson',
    topic: 'Academic',
    status: 'published',
    views: 1123,
  },
  {
    id: 9,
    cover: '/articles/article9.webp',
    title: 'Renewable Energy Integration in Petroleum Companies',
    description: 'How traditional oil companies are transitioning to renewable energy sources.',
    datePost: '25-12-2025',
    createdBy: 'Dr. Emily Johnson',
    topic: 'Sustainability',
    status: 'published',
    views: 987,
  },
  {
    id: 10,
    cover: '/articles/article10.webp',
    title: 'Geophysical Survey Methods for Oil Exploration',
    description: 'Modern geophysical techniques used in petroleum exploration.',
    datePost: '22-12-2025',
    createdBy: 'Prof. David Brown',
    topic: 'Research',
    status: 'draft',
    views: 0,
  },
  {
    id: 11,
    cover: '/articles/article11.webp',
    title: 'Economic Analysis of Petroleum Projects',
    description: 'Financial modeling and economic evaluation of oil and gas projects.',
    datePost: '20-12-2025',
    createdBy: 'Dr. Sarah Taylor',
    topic: 'Academic',
    status: 'published',
    views: 543,
  },
  {
    id: 12,
    cover: '/articles/article12.webp',
    title: 'Innovation in Drilling Technology',
    description: 'Latest innovations and technological advances in drilling equipment.',
    datePost: '18-12-2025',
    createdBy: 'Engineer Mike Davis',
    topic: 'Innovation',
    status: 'archived',
    views: 432,
  },
];

const topics = ['All Topics', 'Technology', 'Research', 'Innovation', 'Sustainability', 'Career Development', 'Academic'];
const statuses = ['All Status', 'published', 'draft', 'archived'];

export default function ArticlesAdmin() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter articles
  const filteredArticles = articlesData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'All Topics' || article.topic === selectedTopic;
    const matchesStatus = selectedStatus === 'All Status' || article.status === selectedStatus;

    return matchesSearch && matchesTopic && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'search') setSearchQuery(value);
    if (filterType === 'topic') setSelectedTopic(value);
    if (filterType === 'status') setSelectedStatus(value);
  };

  const handleDelete = (id: number) => {
    setSelectedArticle(id);
    setShowDeleteModal(true);
  };

  const handleExportAll = () => {
    // Handle bulk export logic here - exports all filtered articles
    console.log('Export all articles:', filteredArticles);
  };

  const handleEditArticle = (articleId: number) => {
    router.push(`/admin/articles/edit/${articleId}`);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Delete article:', selectedArticle);
    setShowDeleteModal(false);
    setSelectedArticle(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'draft':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'archived':
        return 'bg-slate-100 text-slate-700 border border-slate-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <>
      {/* Header */}
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Articles Management</h1>
          <p className="text-xs text-gray-500">{filteredArticles.length} articles found</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/admin/articles/categories')}
            className="h-8 px-3 border border-purple-200 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 hover:border-purple-300 text-xs flex items-center gap-1.5 transition-all"
          >
            <Tag className="w-3.5 h-3.5" />
            Categories
          </button>

          <button
            onClick={() => router.push('/admin/articles/new')}
            className="h-8 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm text-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            New Article
          </button>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, authors..."
              value={searchQuery}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={selectedTopic}
              onChange={(e) => handleFilterChange('topic', e.target.value)}
              className="h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        {/* Items per page selector */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-8 px-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>items per page</span>
          </div>
          <div className="text-xs text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredArticles.length)} of {filteredArticles.length} articles
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Article</th>
                  <th className="text-left p-3 font-medium text-gray-700">Author</th>
                  <th className="text-left p-3 font-medium text-gray-700">Topic</th>
                  <th className="text-left p-3 font-medium text-gray-700">Date</th>
                  <th className="text-left p-3 font-medium text-gray-700">Views</th>
                  <th className="text-left p-3 font-medium text-gray-700">Status</th>
                  <th className="text-center p-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedArticles.map((article, index) => (
                  <tr key={article.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-gray-25'}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                          <img
                            src={article.cover}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 line-clamp-2">{article.title}</p>
                          <p className="text-gray-500 text-xs line-clamp-1 mt-1">{article.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-900">
                        <User className="w-3 h-3 text-gray-400" />
                        <span>{article.createdBy}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-900">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <span>{article.topic}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{article.datePost}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="w-3 h-3" />
                        <span>{article.views.toLocaleString('en-US')}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`h-4 px-2 text-xs rounded-full capitalize ${getStatusBadge(article.status)}`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 rounded-md transition-all group"
                          title="View Article"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600 group-hover:text-blue-700" />
                        </button>
                        <button
                          onClick={() => handleEditArticle(article.id)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md transition-all group"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-700" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-red-50 rounded-md transition-all group"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-600 group-hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredArticles.length > 0 && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3 text-xs border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-8 w-8 text-xs rounded-md transition-all ${currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-8 px-3 text-xs border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>

            <div className="text-xs text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No articles found</h3>
            <p className="text-xs text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button className="h-8 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs flex items-center gap-1.5 mx-auto transition-all">
              <Plus className="w-3.5 h-3.5" />
              Create New Article
            </button>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Delete Article</h2>
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-600">
                Are you sure you want to delete this article? This action cannot be undone.
              </p>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="h-8 px-4 border border-gray-200 rounded-md hover:bg-gray-50 text-xs transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="h-8 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}