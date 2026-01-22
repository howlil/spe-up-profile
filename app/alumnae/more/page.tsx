/** @format */

import Image from 'next/image';
import SectionTitle from '../../../components/SectionTitle';
import LeaderCard from '../../../components/LeaderCard';

// Cabinet Data
const cabinets = [
  {
    name: 'The Founder Cabinet',
    year: '2020/2021',
    leaders: [
      {
        name: 'Izza Nafia Pinem',
        position: 'President of SPE UP SC 2020/2021',
        imageSrc: '/alumnae/alumnae-more/izza.webp',
      },
      {
        name: 'Arsalan Umar',
        position: 'Vice President of SPE UP SC 2020/2021',
        imageSrc: '/alumnae/alumnae-more/arsalan.webp',
      },
    ],
  },
  {
    name: 'Maturation Cabinet',
    year: '2021/2022',
    leaders: [
      {
        name: 'Giovanni J. B. Mitakda',
        position: 'President of SPE UP SC 2021/2022',
        imageSrc: '/alumnae/alumnae-more/giovany.webp',
      },
      {
        name: 'Abednego Amurwa L.',
        position: 'Vice President of SPE UP SC 2021/2022',
        imageSrc: '/alumnae/alumnae-more/abednego.webp',
      },
    ],
  },
  {
    name: 'Extraction Cabinet',
    year: '2022/2023',
    leaders: [
      {
        name: 'M. Kenandipa Putrayandra',
        position: 'President of SPE UP SC 2022/2023',
        imageSrc: '/alumnae/alumnae-more/mkenandiap.webp',
      },
      {
        name: 'Asyifa Defirsta S.',
        position: 'Vice President of SPE UP SC 2022/2023',
        imageSrc: '/alumnae/alumnae-more/asyfadefi.webp',
      },
    ],
  },
  {
    name: 'Compaction Cabinet',
    year: '2024/2025',
    leaders: [
      {
        name: 'M. Chairafy Hamid',
        position: 'President of SPE UP SC 2024/2025',
        imageSrc: '/alumnae/alumnae-more/chairafy.webp',
      },
      {
        name: 'Bima Putra Rayyan',
        position: 'Vice President of SPE UP SC 2024/2025',
        imageSrc: '/alumnae/alumnae-more/bima.webp',
      },
    ],
  },
  {
    name: 'Expansion Cabinet',
    year: '2024/2025',
    leaders: [
      {
        name: 'Shahar Banun',
        position: 'President of SPE UP SC 2024/2025',
        imageSrc: '/alumnae/alumnae-more/saharbanun.webp',
      },
      {
        name: 'Sandy Sadrio',
        position: 'Vice President of SPE UP SC 2024/2025',
        imageSrc: '/alumnae/alumnae-more/sandi.webp',
      },
    ],
  },
  {
    name: 'Escalation Cabinet',
    year: '2025/2026',
    leaders: [
      {
        name: 'Alfahmi Zikri',
        position: 'President of SPE UP SC 2025/2026',
        imageSrc: '/alumnae/alumnae-more/alfahmi.webp',
      },
      {
        name: 'Raditya Demas Pratama',
        position: 'Vice President of SPE UP SC 2025/2026',
        imageSrc: '/alumnae/alumnae-more/raditya.webp',
      },
    ],
  },
];

export default function AlumnaeMorePage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative h-[60vh] min-h-[400px] w-full sm:h-[70vh] lg:h-[80vh]'>
        {/* Background Image */}
        <Image
          src='/home/hero.webp'
          alt='SPE Alumnae Leaders'
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />

        {/* Gradient Overlays */}
        <div
          className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60'
          aria-hidden='true'
        />
        <div
          className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50'
          aria-hidden='true'
        />

        {/* Hero Text */}
        <div className='absolute bottom-8 left-0 right-0 flex flex-col items-center px-6 text-center sm:bottom-12 sm:px-12 lg:bottom-16 lg:px-24'>
          {/* Year over Year - italic serif, thin */}
          <p
            className='mb-2 text-3xl font-thin text-white drop-shadow-lg sm:text-4xl lg:text-6xl'
            style={{ fontFamily: 'Geller, serif', fontStyle: 'italic' }}
          >
            Year over Year
          </p>
          {/* Main Heading - max-w-7xl */}
          <h1 className='mx-auto max-w-7xl text-5xl font-bold text-white drop-shadow-lg sm:text-6xl lg:text-8xl'>
            President & Vice <br /> President of SPE UP SC
          </h1>
        </div>
      </section>

      {/* What Do Alumnae Say Section */}
      <section className='px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20'>
        <SectionTitle variant='center' lineThickness='thick'>
          What Do Alumnae Say
        </SectionTitle>

        {/* Cabinets Grid - 2 columns on desktop */}
        <div className='mt-12 grid gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20'>
          {cabinets.map((cabinet, index) => (
            <div key={index} className='flex flex-col'>
              {/* Cabinet Name */}
              <h2
                className='mb-8 text-center text-2xl text-[#3C8C98] sm:text-3xl lg:text-4xl'
                style={{ fontFamily: 'SF Pro, sans-serif', fontStyle: 'italic', fontWeight: 500 }}
              >
                {cabinet.name}
              </h2>

              {/* Leaders Grid */}
              <div className='flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-14'>
                {cabinet.leaders.map((leader, leaderIndex) => (
                  <div key={leaderIndex} className='w-[180px] sm:w-[220px] lg:w-[280px]'>
                    <LeaderCard
                      name={leader.name}
                      position={leader.position}
                      imageSrc={leader.imageSrc}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
