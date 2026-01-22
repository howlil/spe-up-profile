/** @format */

import Image from 'next/image';
import AlumniCard from '../../components/AlumniCard';
import SectionTitle from '../../components/SectionTitle';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import PrimaryButton from '../../components/PrimaryButton';

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
          <form className='mx-auto max-w-6xl'>
            {/* Form Grid - 2 Columns on larger screens */}
            <div className='grid gap-x-8 gap-y-6 lg:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-6'>
                <FormInput
                  id='name'
                  name='name'
                  label='Name'
                  placeholder='Input your Full Name'
                  required
                />
                <FormInput
                  id='institution'
                  name='institution'
                  label='Institution'
                  placeholder='Input your Institution'
                  required
                />
                <FormInput
                  id='position'
                  name='position'
                  label='Position'
                  placeholder='Input your Current Position'
                  required
                />

                {/* File Upload - Styled */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Upload Photo File (Mandatory){' '}
                    <span className='italic text-red-500'>*max 5 mb</span>
                  </label>
                  <div className='flex items-center gap-4 rounded-xl border-2 border-dashed border-gray-300 bg-white/50 p-4 transition-colors hover:border-[#3C8C98]'>
                    <label className='cursor-pointer rounded-lg border border-gray-300 bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#3C8C98] hover:text-white'>
                      Choose Files
                      <input
                        type='file'
                        name='photo'
                        accept='image/*'
                        className='hidden'
                      />
                    </label>
                    <span className='text-sm text-gray-400'>No file chosen</span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-6'>
                <FormInput
                  id='email'
                  name='email'
                  type='email'
                  label='Email'
                  placeholder='Input your University Email (Ex : 1917@student.univ)'
                  required
                />
                <FormInput
                  id='phone'
                  name='phone'
                  label='Personal Phone Number'
                  placeholder='Input your Personal Phone Number'
                  required
                />
                <FormTextarea
                  id='message'
                  name='message'
                  label='Message'
                  placeholder='Input the message you want to convey'
                  rows={5}
                  required
                />
              </div>
            </div>

            {/* Bottom Section - Full Width */}
            <div className='mt-8 flex flex-col items-start gap-6 pt-8'>
              {/* NDA Checkbox */}
              <label className='group flex cursor-pointer items-center gap-3'>
                <div className='relative'>
                  <input
                    type='checkbox'
                    id='nda'
                    name='nda'
                    className='peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-gray-300 transition-all checked:border-[#3C8C98] checked:bg-[#3C8C98]'
                  />
                  <svg
                    className='pointer-events-none absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white peer-checked:block'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={3}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <span className='text-sm text-gray-700 transition-colors group-hover:text-[#3C8C98]'>
                  I want to protect my data with NDA
                </span>
              </label>

              {/* Submit Button - Left aligned */}
              <button
                type='submit'
                className='group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#3C8C98] to-[#2d6b75] px-12 py-4 text-center font-semibold text-white shadow-lg transition-all hover:shadow-xl sm:w-auto'
              >
                <span className='relative z-10'>Submit Application</span>
                <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-[#52e8ff] to-[#3C8C98] transition-transform group-hover:translate-x-0' />
              </button>
            </div>
          </form>
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
