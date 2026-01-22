/** @format */

import Image from 'next/image';

interface ArticleCardProps {
  cover: string;
  title: string;
  description: string;
  datePost: string;
  createdBy: string;
  topic: string;
}

export default function ArticleCard({
  cover,
  title,
  description,
  datePost,
  createdBy,
  topic,
}: ArticleCardProps) {
  return (
    <article className='group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
      {/* Cover Image */}
      <div className='relative aspect-[16/9] overflow-hidden'>
        <Image
          src={cover}
          alt={title}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
        
        {/* Topic Badge */}
        <div className='absolute top-4 left-4'>
          <span className='bg-[#3C8C98] text-white px-3 py-1 rounded-full text-xs font-medium'>
            {topic}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        {/* Title */}
        <h3 className='text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#3C8C98] transition-colors'>
          {title}
        </h3>

        {/* Description */}
        <p className='text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed'>
          {description}
        </p>

        {/* Meta Information */}
        <div className='flex items-center justify-between text-xs text-gray-500'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              <svg
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              <span>{createdBy}</span>
            </div>
            
            <div className='flex items-center gap-1'>
              <svg
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <span>{datePost}</span>
            </div>
          </div>

          {/* Read More Arrow */}
          <div className='flex items-center gap-1 text-[#3C8C98] group-hover:text-[#2cb385] transition-colors'>
            <span className='font-medium'>Read More</span>
            <svg
              className='w-4 h-4 transition-transform group-hover:translate-x-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}