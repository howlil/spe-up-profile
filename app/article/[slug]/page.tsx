/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, ArrowLeft, Calendar, User, Eye, Tag } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  views: number;
  publishedAt: string | null;
  createdAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const res = await fetch(`/api/articles/public/${slug}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            setError('Artikel tidak ditemukan');
          } else {
            setError('Gagal memuat artikel');
          }
          return;
        }

        const data = await res.json();
        setArticle(data.article);
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError('Terjadi kesalahan saat memuat artikel');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#3C8C98]" />
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Artikel tidak ditemukan'}
          </h1>
          <p className="text-gray-600 mb-8">
            Artikel yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link
            href="/article"
            className="inline-flex items-center gap-2 bg-[#3C8C98] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2d6b75] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Artikel
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Cover Image */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {/* Background Image */}
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#3C8C98] to-[#2d6b75]" />
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          aria-hidden="true"
        />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/article"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 lg:p-16">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            {article.category && (
              <span className="inline-block bg-[#3C8C98] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                {article.category.name}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{article.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-[#3C8C98] pl-6">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#3C8C98] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-5 h-5 text-gray-500" />
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#3C8C98] hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share & Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/article"
              className="inline-flex items-center gap-2 text-[#3C8C98] font-medium hover:text-[#2d6b75] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Lihat Artikel Lainnya
            </Link>

            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">Share:</span>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link berhasil disalin!');
                  }
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#3C8C98] hover:text-white transition-colors"
                aria-label="Share article"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
