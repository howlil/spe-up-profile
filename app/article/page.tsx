/** @format */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import ArticleCard from '../../components/ArticleCard';

// Article Topics Data
const topicsData = [
  { id: 1, name: 'Technology', count: 15 },
  { id: 2, name: 'Research', count: 8 },
  { id: 3, name: 'Industry News', count: 12 },
  { id: 4, name: 'Innovation', count: 6 },
  { id: 5, name: 'Sustainability', count: 9 },
  { id: 6, name: 'Career Development', count: 7 },
  { id: 7, name: 'Academic', count: 11 },
  { id: 8, name: 'Case Studies', count: 5 },
];

// Dummy Articles Data
const articlesData = [
  {
    id: 1,
    cover: '/articles/article1.webp',
    title: 'Advanced Petroleum Engineering Techniques in Deep Water Drilling',
    description: 'Exploring cutting-edge methodologies and technologies that are revolutionizing deep water drilling operations in the petroleum industry.',
    datePost: '15-01-2026',
    createdBy: 'Dr. Sarah Johnson',
    topic: 'Technology',
  },
  {
    id: 2,
    cover: '/articles/article2.webp',
    title: 'Sustainable Energy Transition: The Role of Petroleum Engineers',
    description: 'How petroleum engineers are adapting their skills to contribute to renewable energy projects and sustainable development.',
    datePost: '12-01-2026',
    createdBy: 'Prof. Michael Chen',
    topic: 'Sustainability',
  },
  {
    id: 3,
    cover: '/articles/article3.webp',
    title: 'AI and Machine Learning Applications in Oil and Gas Exploration',
    description: 'Discovering how artificial intelligence is transforming seismic data analysis and reservoir characterization.',
    datePost: '10-01-2026',
    createdBy: 'Dr. Amanda Rodriguez',
    topic: 'Innovation',
  },
  {
    id: 4,
    cover: '/articles/article4.webp',
    title: 'Career Pathways for Young Petroleum Engineers in 2026',
    description: 'A comprehensive guide to career opportunities and skill development for the next generation of petroleum engineers.',
    datePost: '08-01-2026',
    createdBy: 'John Williams',
    topic: 'Career Development',
  },
  {
    id: 5,
    cover: '/articles/article5.webp',
    title: 'Enhanced Oil Recovery: Latest Research Findings',
    description: 'Recent breakthroughs in enhanced oil recovery techniques and their practical applications in field operations.',
    datePost: '05-01-2026',
    createdBy: 'Dr. Lisa Thompson',
    topic: 'Research',
  },
  {
    id: 6,
    cover: '/articles/article6.webp',
    title: 'Digital Transformation in Petroleum Industry Operations',
    description: 'How digital technologies are streamlining operations and improving efficiency across the petroleum value chain.',
    datePost: '03-01-2026',
    createdBy: 'Mark Anderson',
    topic: 'Technology',
  },
  {
    id: 7,
    cover: '/articles/article7.webp',
    title: 'Environmental Impact Assessment in Oil and Gas Projects',
    description: 'Best practices for conducting comprehensive environmental assessments in petroleum engineering projects.',
    datePost: '01-01-2026',
    createdBy: 'Dr. Emma Davis',
    topic: 'Academic',
  },
  {
    id: 8,
    cover: '/articles/article8.webp',
    title: 'Unconventional Resources: Shale Gas Development Strategies',
    description: 'Analyzing successful strategies for shale gas development and their economic and technical implications.',
    datePost: '28-12-2025',
    createdBy: 'Robert Miller',
    topic: 'Industry News',
  },
  {
    id: 9,
    cover: '/articles/article9.webp',
    title: 'Reservoir Simulation: Modern Approaches and Challenges',
    description: 'Exploring advanced reservoir simulation techniques and addressing common challenges in reservoir modeling.',
    datePost: '25-12-2025',
    createdBy: 'Dr. Kevin Zhang',
    topic: 'Research',
  },
  {
    id: 10,
    cover: '/articles/article10.webp',
    title: 'Safety Protocols in Offshore Petroleum Operations',
    description: 'Comprehensive overview of safety measures and risk management strategies for offshore drilling operations.',
    datePost: '22-12-2025',
    createdBy: 'Sarah Wilson',
    topic: 'Industry News',
  },
  {
    id: 11,
    cover: '/articles/article11.webp',
    title: 'Carbon Capture and Storage: Implementation Challenges',
    description: 'Examining the technical and economic challenges of implementing carbon capture and storage technologies.',
    datePost: '20-12-2025',
    createdBy: 'Dr. James Lee',
    topic: 'Sustainability',
  },
  {
    id: 12,
    cover: '/articles/article12.webp',
    title: 'Petroleum Economics: Market Analysis and Forecasting',
    description: 'Understanding market dynamics and developing accurate forecasting models for petroleum commodities.',
    datePost: '18-12-2025',
    createdBy: 'Maria Garcia',
    topic: 'Academic',
  },
];

const ARTICLES_PER_PAGE = 10;

export default function ArticlePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Filter articles by selected topic
  const filteredArticles = selectedTopic
    ? articlesData.filter(article => article.topic === selectedTopic)
    : articlesData;

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to page 1 when topic changes
  const handleTopicChange = (topic: string | null) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                  {selectedTopic ? `Articles in "${selectedTopic}"` : 'Latest Articles'}
                </h2>
                <p className='text-gray-600'>
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                  {selectedTopic && (
                    <button
                      onClick={() => handleTopicChange(null)}
                      className='ml-2 text-[#3C8C98] hover:text-[#2cb385] underline'
                    >
                      Clear filter
                    </button>
                  )}
                </p>
              </div>

              {/* Articles Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {currentArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    cover={article.cover}
                    title={article.title}
                    description={article.description}
                    datePost={article.datePost}
                    createdBy={article.createdBy}
                    topic={article.topic}
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
            </div>

            {/* Sidebar - Topics - 1/4 width on large screens */}
            <div className='lg:col-span-1'>
              <div className='bg-gray-50 rounded-xl p-6 sticky top-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-6'>Topics</h3>
                
                {/* All Articles Option */}
                <button
                  onClick={() => handleTopicChange(null)}
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                    selectedTopic === null
                      ? 'bg-[#3C8C98] text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className='flex justify-between items-center'>
                    <span>All Articles</span>
                    <span className='text-sm opacity-75'>{articlesData.length}</span>
                  </div>
                </button>

                {/* Topic List */}
                <div className='space-y-2'>
                  {topicsData.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicChange(topic.name)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedTopic === topic.name
                          ? 'bg-[#3C8C98] text-white'
                          : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <div className='flex justify-between items-center'>
                        <span>{topic.name}</span>
                        <span className='text-sm opacity-75'>{topic.count}</span>
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