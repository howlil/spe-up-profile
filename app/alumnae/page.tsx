/** @format */

import Image from 'next/image';
import AlumniCard from '../../components/AlumniCard';
import SectionTitle from '../../components/SectionTitle';
import PrimaryButton from '../../components/PrimaryButton';
import AlumniForm from '../../components/AlumniForm';

// Alumni Data - logoSize: 'sm' | 'md' | 'lg' | 'xl' (optional, default: 'md')
const alumniData: {
  name: string;
  major: string;
  position: string;
  imageSrc: string;
  logoSrc: string;
  logoAlt: string;
  logoSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}[] = [
  {
    name: 'Trisha Amanda',
    major: "Petroleum Eng'19",
    position: 'Jr. Completion Engineer @PT Pertamina Hulu Rokan',
    imageSrc: '/alumnae/alumanae/trhisa.webp',
    logoSrc: '/alumnae/logo/pertamina.webp',
    logoAlt: 'PT Pertamina Hulu Rokan',
    logoSize: 'lg',
  },
  {
    name: 'Ferdiansyah Rahman',
    major: "Petroleum Eng'19",
    position: 'BPS @PT Pertamina Hulu Energi',
    imageSrc: '/alumnae/alumanae/ferdiansha.webp',
    logoSrc: '/alumnae/logo/pertaminia-hulu.webp',
    logoAlt: 'PT Pertamina Hulu Energi',
    logoSize: 'lg',
  },
  {
    name: 'Tracy Tesalonica C',
    major: "Petroleum Eng'19",
    position: 'Jr. Drilling & Workover Engineer @Geoenergies',
    imageSrc: '/alumnae/alumanae/tracy.webp',
    logoSrc: '/alumnae/logo/geoenergi.webp',
    logoAlt: 'Geoenergies',
    logoSize: '2xl',
  },
  {
    name: 'M. Kenandipa Putrayandara',
    major: "Petroleum Eng'19",
    position: 'Field Process & Facilities Engineer @PT Pertamina Hulu Energi OSES',
    imageSrc: '/alumnae/alumanae/kenandipa.webp',
    logoSrc: '/alumnae/logo/pertaminai-ohe.webp',
    logoAlt: 'PT Pertamina Hulu Energi',
    logoSize: 'xl',
  },
  {
    name: 'Naufal Hendra',
    major: "Petroleum Eng'19",
    position: 'Drilling Fluid Engineer @Halliburton',
    imageSrc: '/alumnae/alumanae/naufal.webp',
    logoSrc: '/alumnae/logo/haliburton.webp',
    logoAlt: 'Halliburton',
    logoSize: 'lg',
  },
  {
    name: 'Shahar Banun',
    major: "Petroleum Eng'21",
    position: 'Data Tech Engineer @Whitson',
    imageSrc: '/alumnae/alumanae/shahar.webp',
    logoSrc: '/alumnae/logo/whitson.webp',
    logoAlt: 'Whitson',
    logoSize: 'lg',
  },
  {
    name: 'Bima Putra Rayyan',
    major: "Petroleum Eng'20",
    position: 'Jr. Mud Engineer @PT Elnusa Tbk',
    imageSrc: '/alumnae/alumanae/bimaputra.webp',
    logoSrc: '/alumnae/logo/elnusa.webp',
    logoAlt: 'PT Elnusa Tbk',
    logoSize: 'lg',
  },
  {
    name: 'Alshavira Rizka',
    major: "Petroleum Eng'20",
    position: 'Jr. Reservoir Engineer @Rock Flow Dynamics',
    imageSrc: '/alumnae/alumanae/alshavira.webp',
    logoSrc: '/alumnae/logo/rfd.webp',
    logoAlt: 'Rock Flow Dynamics',
    logoSize: 'lg',
  },
  {
    name: 'Asyifa Defirsta',
    major: "Petroleum Eng'19",
    position: 'BPS @PT Pertamina Hulu Energi',
    imageSrc: '/alumnae/alumanae/asyfa.webp',
    logoSrc: '/alumnae/logo/pertaminia-hulu.webp',
    logoAlt: 'PT Pertamina',
    logoSize: 'lg',
  },
  {
    name: 'Nahdi Arsalan Umar',
    major: "Petroleum Eng'17",
    position: 'Well Intervention Engineer @Petronas',
    imageSrc: '/alumnae/alumanae/nahdi.webp',
    logoSrc: '/alumnae/logo/petronas.webp',
    logoAlt: 'Petronas',
    logoSize: 'xl',
  },
];

export default function AlumnaePage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative h-[60vh] min-h-[400px] w-full sm:h-[70vh] lg:h-[80vh]'>
        {/* Background Image */}
        <Image
          src='/home/hero.webp'
          alt='SPE Alumnae'
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />

        {/* Gradient Overlays */}
        <div
          className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50'
          aria-hidden='true'
        />
        <div
          className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50'
          aria-hidden='true'
        />

        {/* Hero Text */}
        <div className='absolute bottom-12 left-0 right-0 px-6 sm:bottom-16 sm:px-12 lg:bottom-20 lg:px-24'>
          <h1 className='max-w-5xl font-serif text-4xl text-white drop-shadow-lg sm:text-5xl lg:text-7xl'>
            <span className='italic'>S</span>
            <span>hout</span>
            <span className='italic'> O</span>
            <span>ut to </span>
            <span className='bg-gradient-to-r from-[#3C8C98] to-[#00deff] bg-clip-text italic text-transparent'>
              SPEople&apos;s{' '}
            </span>
            <span className='italic'>A</span>
            <span>lumnae</span>
            <span>!</span>
          </h1>
        </div>
      </section>

      {/* What Do Alumnae Say Section */}
      <section className='px-6 py-12 sm:px-12 sm:py-16 lg:px-24 lg:py-20'>
        <SectionTitle variant='center' lineThickness='thick'>
          What Do Alumnae Say
        </SectionTitle>

        {/* Alumni Grid */}
        <div className='mt-8 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:mt-16 lg:grid-cols-5 lg:gap-6'>
          {alumniData.map((alumni, index) => (
            <AlumniCard
              key={index}
              name={alumni.name}
              major={alumni.major}
              position={alumni.position}
              imageSrc={alumni.imageSrc}
              logoSrc={alumni.logoSrc}
              logoAlt={alumni.logoAlt}
              logoSize={alumni.logoSize}
            />
          ))}
        </div>

        {/* Explore for More Button */}
        <PrimaryButton href='/alumnae/more' />
      </section>

      {/* Alumnae Data Form Section */}
      <section className='relative overflow-hidden  px-6 py-16 sm:px-12 sm:py-20 lg:px-24 lg:py-24'>
        {/* Decorative Background Elements */}

        {/* Section Title */}
        <div className='relative z-10 mb-12 lg:mb-16'>
          <SectionTitle variant='left' lineThickness='thick'>
            Alumnae Data
          </SectionTitle>
          <p className='mt-4 max-w-2xl text-gray-600'>
            Join our alumni network! Fill in your information below to stay connected with the SPE community.
          </p>
        </div>

        {/* Main Content - Full Width */}
        <div className='relative z-10'>
          <AlumniForm />
        </div>

        {/* Retro Computer Mockup - Decorative */}
        <div className='pointer-events-none absolute -bottom-20 -right-10 hidden  lg:block xl:-right-0 '>
          <div className='relative h-[500px] w-[650px]'>
            <Image
              src='/alumnae/comp.webp'
              alt=''
              fill
              className='object-contain'
              sizes='650px'
              aria-hidden='true'
            />
          </div>
        </div>
      </section>
    </main>
  );
}
