/** @format */

import Image from 'next/image';

interface CompanyLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CompanyLogo({
  src,
  alt,
  className = '',
}: CompanyLogoProps) {
  return (
    <div className={`flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4 ${className}`}>
      <div className='relative h-10 w-full sm:h-12'>
        <Image
          src={src}
          alt={alt}
          fill
          className='object-contain'
          sizes='(max-width: 640px) 120px, 150px'
        />
      </div>
    </div>
  );
}