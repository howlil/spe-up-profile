/** @format */

import Image from 'next/image';

type LeaderCardFrameStyle = 'leader' | 'face';

interface LeaderCardProps {
  name: string;
  position: string;
  imageSrc: string;
  /** `face` = same image frame gradient & shape as FaceCard (Face of SPE) */
  frameStyle?: LeaderCardFrameStyle;
}

export default function LeaderCard({
  name,
  position,
  imageSrc,
  frameStyle = 'leader',
}: LeaderCardProps) {
  const positionMatch = position.match(/^(.*)\s(\d{4}\/\d{4})$/);
  const positionLabel = positionMatch ? positionMatch[1] : position;
  const positionYear = positionMatch ? positionMatch[2] : null;

  const frameClassName =
    frameStyle === 'face'
      ? 'relative aspect-[15/16] w-full overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] bg-gradient-to-b from-[#FFFFFF] to-[#3C8C98]/70'
      : 'relative aspect-[250/291] w-full overflow-hidden rounded-br-[40px] rounded-tl-[40px] bg-gradient-to-b from-white to-[rgba(60,140,152,0.8)] sm:rounded-br-[50px] sm:rounded-tl-[50px] lg:rounded-br-[60px] lg:rounded-tl-[60px]';

  const imageClassName =
    frameStyle === 'face' ? 'object-cover object-center' : 'object-cover object-top';

  return (
    <div className='flex flex-col items-center gap-2 transition-transform hover:scale-105'>
      {/* Card with gradient background */}
      <div className={frameClassName}>
        <Image
          src={imageSrc}
          alt={name}
          fill
          className={imageClassName}
          sizes='(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px'
        />
      </div>

      {/* Name and Position */}
      <div className='w-full text-center'>
        <p
          className='text-base leading-tight text-black sm:whitespace-nowrap sm:text-xl lg:text-2xl'
          style={{ fontFamily: 'Geller, serif', fontStyle: 'italic' }}
        >
          {name}
        </p>
        <p className='mt-1 text-[11px] leading-tight text-neutral-500 sm:text-sm'>
          {positionLabel}
          {positionYear ? <span className='block'>{positionYear}</span> : null}
        </p>
      </div>
    </div>
  );
}
