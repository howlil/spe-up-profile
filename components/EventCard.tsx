/** @format */

import Image from 'next/image';

/** Ukuran gambar popup per event: small | medium | large. Bisa disesuaikan per id di eventsData. */
export type PopupImageSize = 'small' | 'medium' | 'large';

const POPUP_SIZE_CLASSES: Record<PopupImageSize, string> = {
  small: 'h-[45%] px-2 sm:h-[50%] sm:px-4 lg:h-[55%] lg:px-6',
  medium: 'h-[55%] px-2 sm:h-[60%] sm:px-4 lg:h-[65%] lg:px-6',
  large: 'h-[70%] px-2 sm:h-[75%] sm:px-4 lg:h-[80%] lg:px-6',
};

const POPUP_BASE_CLASS = 'absolute inset-x-0 bottom-0 z-10';

interface EventCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: React.ReactNode;
  popupImageSrc?: string;
  popupImageAlt?: string;
  popupImageSize?: PopupImageSize;

  popupImageClassName?: string;
  /** Override penuh: semua class container popup (harus include positioning). */
  popupClassName?: string;
  /** Scale gambar popup (wajib). Default: scale-100. Contoh: scale-[1.8], scale-110, md:scale-[2]. */
  imageScaleClass?: string;
}

export default function EventCard({
  imageSrc,
  imageAlt = 'Event background',
  title,
  description,
  popupImageSrc,
  popupImageAlt = 'Event highlight',
  popupImageSize = 'medium',
  popupImageClassName,
  popupClassName,
  imageScaleClass = 'scale-100',
}: EventCardProps) {
  const popupContainerClass =
    popupClassName ??
    (popupImageClassName
      ? `${POPUP_BASE_CLASS} ${popupImageClassName}`
      : `${POPUP_BASE_CLASS} ${POPUP_SIZE_CLASSES[popupImageSize]}`);

  return (
    <div className='relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg'>
      {/* Card atas (teal): gambar di dalam card */}
      <div className='relative overflow-hidden rounded-t-2xl'>
        <div className='relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gradient-to-b from-[#3C8C98] to-[#142e32] sm:aspect-[16/9] lg:aspect-[979/401]'>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className='object-cover object-center'
              />
            )}

            {/* Popup Image - ukuran mengikuti popupImageSize per event */}
            {popupImageSrc && (
              <div className={popupContainerClass}>
                <div className='relative h-full w-full'>
                  <Image
                    src={popupImageSrc}
                    alt={popupImageAlt}
                    fill
                    className={`object-contain drop-shadow-2xl ${imageScaleClass}`}
                  />
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Description Card - Folder Tab Shape, content contained */}
      <div className='relative z-20 -mt-4 min-w-0 overflow-hidden sm:-mt-6 lg:-mt-8'>
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

        <div className='relative min-w-0 overflow-hidden p-5 pt-6 sm:p-6 sm:pt-8 lg:p-10 lg:pt-12'>
          <h3 className='mb-2 break-words bg-gradient-to-r from-[#09aac2] to-[#088395] bg-clip-text text-2xl font-bold leading-tight text-transparent sm:mb-3 sm:text-3xl lg:mb-4 lg:text-5xl'>
            {title}
          </h3>
          <div className='min-w-0 overflow-hidden text-justify text-sm leading-relaxed text-gray-800 break-words sm:text-base lg:text-lg lg:leading-relaxed'>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
