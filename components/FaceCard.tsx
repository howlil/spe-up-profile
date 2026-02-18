/** @format */

import Image from 'next/image';

interface FaceCardProps {
  name: string;
  position: string;
  imageSrc: string;
  imageAlt: string;
}

export default function FaceCard({
  name,
  position,
  imageSrc,
  imageAlt,
}: FaceCardProps) {
  return (
    <div className='group relative flex flex-col items-center w-full max-w-48 sm:max-w-52 md:w-52 md:max-w-none lg:w-56 xl:w-60 transition-transform hover:scale-105'>
      <div className='relative w-full overflow-hidden '>
        {/* Gradient di dalam area gambar (di belakang image) */}
        <div className='relative w-full aspect-[15/16] overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] bg-gradient-to-b from-[#FFFFFF]  to-[#3C8C98]/70'>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className='object-cover object-center'
            sizes='(max-width: 640px) 192px, (max-width: 768px) 208px, (max-width: 1024px) 224px, (max-width: 1280px) 240px, 256px'
          />
        </div>

        {/* Name and Position Section - tetap di dalam card */}
        <div className='py-2 text-center text-neutral-900'>
        <p
          className='text-xl sm:text-2xl  font-normal leading-tight'
          style={{fontFamily: 'Geller, serif', fontStyle: 'italic'}}
        >
          {name}
        </p>
        <p className='text-xs sm:text-sm leading-tight font-normal mt-1 text-neutral-500 w-5/6 mx-auto'>
          {position}
        </p>
        </div>
      </div>
    </div>
  );
}
