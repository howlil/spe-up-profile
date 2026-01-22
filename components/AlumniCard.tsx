/** @format */

import Image from 'next/image';

interface AlumniCardProps {
  name: string;
  major: string;
  position: string;
  imageSrc: string;
  logoSrc: string;
  logoAlt?: string;
  logoSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const logoSizeClasses = {
  sm: 'h-4 sm:h-5 lg:h-6',
  md: 'h-6 sm:h-7 lg:h-8',
  lg: 'h-7 sm:h-8 lg:h-9',
  xl: 'h-16 w-full ',
 '2xl': 'h-32 w-full ',
};

export default function AlumniCard({
  name,
  major,
  position,
  imageSrc,
  logoSrc,
  logoAlt = 'Company Logo',
  logoSize = 'md',
}: AlumniCardProps) {
  return (
    <div className='group relative overflow-hidden rounded-bl-xl rounded-tr-xl shadow-md transition-transform hover:scale-105'>
      {/* Card Container */}
      <div className='relative aspect-[250/392] w-full'>
        {/* Background Photo */}
        <Image
          src={imageSrc}
          alt={name}
          fill
          className='object-cover'
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px'
        />

        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/50' aria-hidden='true' />

        {/* Company Logo at Top */}
        <div className='absolute left-3 right-3 top-3 sm:left-4 sm:right-4 sm:top-4'>
          <div className='flex h-10 items-center justify-center overflow-hidden rounded bg-white px-3 sm:h-12 lg:h-14'>
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={140}
              height={40}
              className={`${logoSizeClasses[logoSize]}  w-auto max-w-full  object-contain`}
            />
          </div>
        </div>

        {/* Info at Bottom */}
        <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
          {/* Blue Accent Bar */}
          <div className='mb-2 h-1 w-10 bg-[#35a9ff]' aria-hidden='true' />

          {/* Name */}
          <h3 className='text-sm font-medium drop-shadow-md sm:text-base'>
            {name}
          </h3>

          {/* Major - Italic */}
          <p className='text-[10px] italic text-gray-200 drop-shadow-md sm:text-xs'>
            {major}
          </p>

          {/* Position */}
          <p className='mt-0.5 text-[10px] leading-tight drop-shadow-md sm:text-xs'>
            {position}
          </p>
        </div>
      </div>
    </div>
  );
}
