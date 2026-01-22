/** @format */

import Image from 'next/image';

interface LeaderCardProps {
  name: string;
  position: string;
  imageSrc: string;
}

export default function LeaderCard({
  name,
  position,
  imageSrc,
}: LeaderCardProps) {
  return (
    <div className='flex flex-col items-center gap-2 transition-transform hover:scale-105'>
      {/* Card with gradient background */}
      <div className='relative aspect-[250/291] w-full overflow-hidden rounded-br-[40px] rounded-tl-[40px] bg-gradient-to-b from-white to-[rgba(60,140,152,0.8)] sm:rounded-br-[50px] sm:rounded-tl-[50px] lg:rounded-br-[60px] lg:rounded-tl-[60px]'>
        <Image
          src={imageSrc}
          alt={name}
          fill
          className='object-cover object-top'
          sizes='(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px'
        />
      </div>

      {/* Name and Position */}
      <div className='w-full text-center'>
        <p
          className='whitespace-nowrap text-lg leading-tight text-black sm:text-xl lg:text-2xl'
          style={{ fontFamily: 'Geller, serif', fontStyle: 'italic' }}
        >
          {name}
        </p>
        <p className='mt-1 text-sm leading-tight text-neutral-500 sm:text-base lg:text-lg'>
          {position}
        </p>
      </div>
    </div>
  );
}
