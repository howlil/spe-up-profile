/** @format */

import Image from 'next/image';

interface FolderCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: React.ReactNode;
}

export default function FolderCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: FolderCardProps) {
  return (
    <div className='relative pb-8 sm:pb-12 lg:pb-24'>
      {/* Main Container */}
      <div className='relative mx-auto max-w-5xl'>
        {/* Photo + Description Card dalam 1 wrapper */}
        <div className='relative z-10 mx-auto w-full'>
          {/* Photo - responsive aspect ratio */}
          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-t-xl sm:aspect-[16/9] lg:aspect-[1007/350]'>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1000px'
            />
            <div
              className='absolute inset-0 bg-gradient-to-t from-[#68cfe0]/80 to-[#68cfe0]/20'
              aria-hidden='true'
            />
          </div>

          {/* Description Card - Folder Tab Shape */}
          <div className='relative -mt-12 w-full'>
            {/* SVG Background with folder shape - stretches to fill */}
            <svg
              className='absolute inset-0 h-full w-full'
              viewBox='14 0 980 350'
              preserveAspectRatio='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M992.949 45C992.949 38 987.237 32 980.191 32H513.677C510.627 32 507.677 31 505.363 29L468.035 7C465.722 5 462.772 4 459.721 4H26.7077C19.6614 4 13.9492 10 13.9492 17V335C13.9492 342 19.6614 348 26.7077 348H980.191C987.237 348 992.949 342 992.949 335V45Z'
                fill='white'
              />
              <path
                d='M26.708 5H459.722C462.67 5 465.522 6 467.759 8L505.086 30C507.477 32 510.525 33 513.677 33H980.19C987.002 33 992.524 38 992.524 45V335C992.524 342 987.002 347 980.19 347H26.708C19.8967 347 14.3742 342 14.374 335V17C14.374 10 19.8966 5 26.708 5Z'
                stroke='#E5E5E5'
                fill='none'
              />
            </svg>

            {/* Content - padding based content sizing */}
            <div className='relative p-5 pt-6 sm:p-6 sm:pt-8 lg:aspect-[1007/350] lg:p-10 lg:pt-12'>
              <h3 className='mb-2 bg-gradient-to-r from-[#09aac2] to-[#088395] bg-clip-text text-xl font-bold leading-tight text-transparent sm:mb-3 sm:text-2xl lg:mb-4 lg:text-4xl'>
                {title}
              </h3>
              <div className='text-justify text-sm leading-relaxed text-gray-800 sm:text-base lg:text-lg lg:leading-relaxed'>
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
