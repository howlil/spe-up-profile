/** @format */

import Image from 'next/image';

interface EventCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: React.ReactNode;
  popupImageSrc?: string;
  popupImageAlt?: string;
  popupClassName?: string;
  popupCenterImageSrc?: string;
  popupCenterImageAlt?: string;
}

export default function EventCard({
  imageSrc,
  imageAlt = 'Event background',
  title,
  description,
  popupImageSrc,
  popupImageAlt = 'Event highlight',
  popupClassName,
  popupCenterImageSrc,
  popupCenterImageAlt = 'Event caption',
}: EventCardProps) {
  return (
    <div className='relative'>
      {/* Main Container */}
      <div className='relative mx-auto max-w-5xl'>
        {/* Trophy/Center Image - positioned at TOP, overlapping above the card */}
        {popupCenterImageSrc && (
          <div className='relative z-40 mx-auto -mb-16 h-[180px] w-[150px] sm:-mb-20 sm:h-[240px] sm:w-[200px] lg:-mb-28 lg:h-[320px] lg:w-[260px]'>
            <Image
              src={popupCenterImageSrc}
              alt={popupCenterImageAlt}
              fill
              className='object-contain drop-shadow-2xl'
              sizes='(max-width: 768px) 150px, (max-width: 1024px) 200px, 260px'
            />
          </div>
        )}

        {/* Photo Container with gradient background */}
        <div className='relative'>
          {/* Gradient Background Card - with optional image */}
          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#3C8C98] to-[#142e32] sm:aspect-[16/9] lg:aspect-[979/401]'>
            {/* Background Image - optional */}
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className='object-cover object-center'
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1000px'
              />
            )}
          </div>

          {/* Popup Image - extends below the gradient card, BEHIND the folder card */}
          {popupImageSrc && (
            <div
              className={
                popupClassName ||
                'absolute inset-x-0 bottom-0 z-10 h-[75%] translate-y-[35%] px-2 sm:h-[80%] sm:translate-y-[30%] sm:px-4 lg:h-[85%] lg:translate-y-[25%] lg:px-6'
              }
            >
              <div className='relative h-full w-full'>
                <Image
                  src={popupImageSrc}
                  alt={popupImageAlt}
                  fill
                  className='object-contain object-bottom drop-shadow-2xl'
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1000px'
                />
              </div>
            </div>
          )}
        </div>

        {/* Description Card - Folder Tab Shape - ON TOP of popup image */}
        <div className='relative z-20 -mt-4 w-full sm:-mt-6 lg:-mt-8'>
          {/* SVG Background with folder shape */}
          <svg
            className='absolute inset-0 h-full w-full drop-shadow-lg'
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

          {/* Content */}
          <div className='relative p-5 pt-6 sm:p-6 sm:pt-8 lg:p-10 lg:pt-12'>
            <h3 className='mb-2 bg-gradient-to-r from-[#09aac2] to-[#088395] bg-clip-text text-2xl font-bold leading-tight text-transparent sm:mb-3 sm:text-3xl lg:mb-4 lg:text-5xl'>
              {title}
            </h3>
            <div className='text-justify text-sm leading-relaxed text-gray-800 sm:text-base  lg:text-lg lg:leading-relaxed'>
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
