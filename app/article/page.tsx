/** @format */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ArticleCard from '../../components/ArticleCard';
import { Loader2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  author: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    articles: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const ARTICLES_PER_PAGE = 10;

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch articles
  const fetchArticles = async (page: number, categoryId: string | null) => {
    setLoading(true);
    try {
      let url = `/api/articles/public?page=${page}&limit=${ARTICLES_PER_PAGE}`;
      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/articles/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchArticles(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  // Handle category change
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).replace(/\//g, '-');
  };

  // Get total articles count
  const totalArticles = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 0;

  // Get selected category name
  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : null;

  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-br-[60px] sm:h-[70vh] lg:h-[80vh]'>
        {/* Background Image */}
        <Image
          src='/articles/hero.webp'
          alt='SPE UP SC Articles'
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />

        {/* Gradient Overlay */}
        <div
          className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[rgba(155,255,231,0.3)]'
          aria-hidden='true'
        />

        {/* Hero Content */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white px-6'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4'>
              Articles
            </h1>
            <p className='text-lg sm:text-xl lg:text-2xl font-light max-w-2xl mx-auto'>
              Discover insights, research, and innovations in petroleum engineering
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='px-6 py-12 sm:px-12 lg:px-24'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* Articles Grid - 3/4 width on large screens */}
            <div className='lg:col-span-3'>
              {/* Articles Header */}
              <div className='mb-8'>
                <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                  {selectedCategoryName ? `Articles in "${selectedCategoryName}"` : 'Latest Articles'}
                </h2>
                <p className='text-gray-600'>
                  {totalArticles} article{totalArticles !== 1 ? 's' : ''} found
                  {selectedCategory && (
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className='ml-2 text-[#3C8C98] hover:text-[#2cb385] underline'
                    >
                      Clear filter
                    </button>
                  )}
                </p>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className='flex items-center justify-center py-20'>
                  <Loader2 className='w-8 h-8 animate-spin text-[#3C8C98]' />
                </div>
              ) : articles.length === 0 ? (
                <div className='text-center py-20'>
                  <p className='text-gray-500'>No articles found</p>
                </div>
              ) : (
                <>
                  {/* Articles Grid */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                    {articles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        cover={article.coverImage || '/articles/default.webp'}
                        title={article.title}
                        description={article.excerpt || ''}
                        datePost={formatDate(article.publishedAt || article.createdAt)}
                        createdBy={article.author}
                        topic={article.category?.name || 'Uncategorized'}
                        slug={article.slug}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className='flex justify-center items-center gap-2'>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-[#3C8C98] text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar - Categories - 1/4 width on large screens */}
            <div className='lg:col-span-1'>
              <div className='bg-gray-50 rounded-xl p-6 sticky top-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-6'>Categories</h3>
                
                {/* All Articles Option */}
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                    selectedCategory === null
                      ? 'bg-[#3C8C98] text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className='flex justify-between items-center'>
                    <span>All Articles</span>
                  </div>
                </button>

                {/* Category List */}
                <div className='space-y-2'>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#3C8C98] text-white'
                          : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <div className='flex justify-between items-center'>
                        <span>{category.name}</span>
                        <span className='text-sm opacity-75'>{category._count.articles}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}