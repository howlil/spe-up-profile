/** @format */

import Image from 'next/image';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import MoreText from '../components/MoreText';
import CompanyLogosGrid from '../components/CompanyLogosGrid';

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section
        className='relative aspect-square w-full overflow-hidden sm:aspect-video'
        aria-label='Hero section'
      >
        <div className='absolute inset-0'>
          <Image
            src='/home/hero.webp'
            alt='SPE Universitas Pertamina community gathering'
            fill
            className='object-cover'
            priority
            quality={90}
          />
          {/* Overlay untuk readability */}
          <div
            className='absolute inset-0 bg-black/30'
            aria-hidden='true'
          />
          {/* Gradient fade dari bawah (black to none) */}
          <div
            className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent'
            aria-hidden='true'
          />
        </div>

        {/* Hero Content */}
        <div className='relative z-10 flex h-full items-center justify-center'>
          <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='space-y-1 sm:space-y-2'>
              <h1 className='text-2xl font-semibold leading-tight text-left text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl '>
                Welcome <span className='text-[#3C8C98]'>SPEople!</span>{' '}
                Let&apos;s
              </h1>
              <p className='text-2xl font-normal leading-tight text-left text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl '>
                <span className='font-[var(--font-playfair)] italic'>
                  Escalate
                </span>{' '}
                with Us
              </p>
            </div>
          </div>
        </div>

        {/* Sponsor logo - bottom right, responsive */}
        <div className='absolute bottom-2 right-2 z-10 sm:bottom-4 sm:right-4'>
          <div className='rounded bg-white px-3 py-2  '>
            <Image
              src='/home/sponsor.png'
              alt='Sponsor tNavigator'
              width={160}
              height={48}
              className='h-7 w-auto object-contain sm:h-8 md:h-10 lg:h-11 xl:h-12'
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        className='bg-white py-12 sm:py-16 lg:py-20'
        aria-labelledby='about-heading'
      >
        {/* Heading - dalam container */}
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='about-heading'
              variant='left'
            >
              About Us
            </SectionTitle>
          </div>
        </div>

        {/* Content Grid */}
        <div className='mx-auto grid  max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8'>
          {/* Images Section (Left) */}
          <div className='relative   lg:-ml-22 '>
            <div className='relative aspect-[16/10] w-full overflow-hidden lg:rounded-r-lg'>
              <Image
                src='/home/about.webp'
                alt='SPE Universitas Pertamina activities'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>
          </div>

          {/* Text Content (Right) */}
          <div className='flex  flex-col justify-center'>
            <div className='space-y-6 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8'>
              <p className='text-justify'>
                <span className='font-semibold text-[#3C8C98]'>
                  SPE Universitas Pertamina SC
                </span>{' '}
                is located in Jakarta and provide society activities in
                Universitas Pertamina. SPE Universitas Pertamina SC is under SPE
                Java Section.
              </p>

              <p className='text-justify'>
                We are linked to SPE Student Chapter around the world, allowing
                us to act as vibrant intermediaries between Universitas
                Pertamina students to students from prestigious universities
                globally. This interconnected community not only provides a
                platform for knowledge exchange but also cultivates skills
                essential for career advancement, ensuring that student members
                are well-equipped for success in the energy sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section
        className='bg-gray-50 py-12 sm:py-16 lg:py-20'
        aria-labelledby='achievement-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Heading dengan garis */}
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='achievement-heading'
              variant='right'
            >
              Achievement
            </SectionTitle>
          </div>

          {/* Achievement Content */}
          <div className='relative grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12'>
            {/* Text Content (Left) */}
            <div className='flex flex-col justify-start'>
              <div className='space-y-4 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8'>
                <p className='text-justify lg:pr-12'>
                  The SPE Outstanding Student Chapter Award 2025 is the{' '}
                  <span className='font-semibold text-[#3C8C98]'>
                    highest recognition given by SPE International
                  </span>{' '}
                  to student chapters worldwide for exceptional performance in
                  technical dissemination, professional development, and
                  community engagement.
                </p>
              </div>
            </div>

            {/* Certificates (Right) with Badge Overlay */}
            <div className='flex flex-col gap-4'>
              {/* Badge for Mobile - Above certificates */}

              {/* Certificates Grid */}
              <div className='relative grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {/* Certificate 1 */}
                <div className='relative aspect-[16/11] overflow-hidden rounded-lg shadow-lg'>
                  <Image
                    src='/home/cert1.webp'
                    alt='SPE Presidential Award Outstanding Student Chapter - Universitas Pertamina'
                    fill
                    className='object-cover'
                    sizes='(max-width: 1024px) 50vw, 30vw'
                  />
                </div>

                {/* Certificate 2 */}
                <div className='relative aspect-[16/11] overflow-hidden rounded-lg shadow-lg'>
                  <Image
                    src='/home/cert2.webp'
                    alt='SPE Regional Outstanding Student Chapter - Universitas Pertamina Chapter'
                    fill
                    className='object-cover'
                    sizes='(max-width: 1024px) 50vw, 30vw'
                  />
                </div>

                {/* Badge - Overlapping small part of bottom left edge only */}
                <div className='absolute bottom-0 left-0 -ml-32 -mb-32 z-10  lg:block'>
                  <div className='relative h-48 w-48 xl:h-56 xl:w-56'>
                    <Image
                      src='/home/badgeStudentChapter.webp'
                      alt='SPE 2025 Outstanding Student Chapter Award Badge'
                      fill
                      className='object-contain drop-shadow-2xl'
                      sizes='(min-width: 1280px) 144px, 128px'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Collaboration Section */}
      <section
        className='bg-white py-12 sm:py-16 lg:py-20'
        aria-labelledby='collaboration-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Heading dengan garis */}
          <div className='mb-8 sm:mb-12'>
            {/* Mobile: Stacked layout */}
            <div className='flex flex-col gap-3 sm:hidden'>
              <div
                className='h-1 w-24 bg-[#3C8C98]'
                aria-hidden='true'
              />
              <h2
                id='collaboration-heading'
                className='text-3xl font-normal text-[#3C8C98]'
              >
                <span className='font-[var(--font-playfair)] italic text-[#3C8C98]'>
                  Our Previous
                </span>{' '}
                <span className='text-[#3C8C98]'>Company Collaboration</span>
              </h2>
            </div>
            {/* Desktop: Horizontal layout */}
            <div className='hidden sm:block'>
              <SectionTitle
                id='collaboration-heading'
                variant='center'
              >
                <span className='font-[var(--font-playfair)] italic text-[#3C8C98]'>
                  Our Previous
                </span>{' '}
                <span className='text-[#3C8C98]'>Company Collaboration</span>
              </SectionTitle>
            </div>
          </div>

          {/* Company Logos Grid */}
          <CompanyLogosGrid />

          {/* And many more text */}
          <MoreText
            content='and many more...'
            position='right'
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section
        className='bg-white py-12 sm:py-16 lg:py-20'
        aria-labelledby='what-we-do-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Heading dengan garis yang menyambung ke hanging photos */}
          <div className='relative mb-8 sm:mb-12'>
            <SectionTitle
              id='what-we-do-heading'
              variant='left'
              italic={true}
              lineThickness='thick'
              className='whitespace-nowrap'
            >
              What We Do
            </SectionTitle>

            {/* Hanging Photos - positioned from the teal line, 1/3 width */}
            {/* Hanging Photos - only visible on desktop (lg+) */}
            <div className='absolute right-24 top-[3px] hidden w-1/2 lg:block'>
              <div className='relative h-[320px] w-full'>
                <Image
                  src='/home/wwd/hiasan.webp'
                  alt='Hanging photo decorations'
                  fill
                  className='object-contain object-top'
                  sizes='33vw'
                />
              </div>
            </div>
          </div>

          {/* Content Grid - Left: 2 Event Cards | Right: Photo Grid */}
          <div className='grid gap-8 lg:grid-cols-2 lg:gap-8'>
            {/* Left Grid - 2 Vertical Event Cards side by side */}
            <div className='grid grid-cols-2 gap-4'>
              {/* Card 1 - IPTC 2025 */}
              <div className='group relative aspect-[3/5] overflow-hidden rounded-bl-[20px] rounded-tr-[20px] shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl'>
                <Image
                  src='/home/wwd/wwd1.webp'
                  alt='The International Petroleum Technology Conference (IPTC) 2025'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 50vw, 25vw'
                />
                {/* Dark overlay dengan opacity untuk background gelap */}
                <div
                  className='absolute inset-0 bg-black/40'
                  aria-hidden='true'
                />
                {/* Dark gradient overlay at bottom */}
                <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent' />
                {/* Text content with blue line */}
                <div className='absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 lg:p-6'>
                  <div className='mb-2 h-[4px] w-[50px] bg-[#35a9ff]' />
                  <h3 className='text-sm font-normal leading-tight text-white sm:text-base lg:text-lg'>
                    The International Petroleum Technology Conference (IPTC){' '}
                    <span className='font-semibold'>2025</span>
                  </h3>
                </div>
              </div>

              {/* Card 2 - AES 2023 */}
              <div className='group relative aspect-[3/5] overflow-hidden rounded-bl-[20px] rounded-tr-[20px] shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl'>
                <Image
                  src='/home/wwd/wwd2.webp'
                  alt='Annual Energy Symposium (AES) 2023'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 50vw, 25vw'
                />
                {/* Dark overlay dengan opacity untuk background gelap */}
                <div
                  className='absolute inset-0 bg-black/40'
                  aria-hidden='true'
                />
                {/* Dark gradient overlay at bottom */}
                <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent' />
                {/* Text content with blue line */}
                <div className='absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 lg:p-6'>
                  <div className='mb-2 h-[4px] w-[50px] bg-[#35a9ff]' />
                  <h3 className='text-sm font-normal leading-tight text-white sm:text-base lg:text-lg'>
                    Annual Energy Symposium (AES){' '}
                    <span className='font-semibold'>2023</span>
                  </h3>
                </div>
              </div>
            </div>

            {/* Right Grid - Photo Grid + Button */}
            <div className='relative flex flex-col lg:pt-[200px]'>
              {/* Photo Grid */}
              <div className='relative'>
                {/* Top Row: kakandi (2fr) + care (1fr) */}
                <div className=' lg:ml-12 grid grid-cols-[2fr_1fr] items-start gap-3'>
                  {/* kakandi - person with SPE banner (LARGER) */}
                  <div className='relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg'>
                    <Image
                      src='/home/wwd/kakandi.webp'
                      alt='SPE Member with Banner'
                      fill
                      className='object-cover'
                      sizes='(max-width: 1024px) 35vw, 18vw'
                    />
                    {/* Dark overlay dengan opacity */}
                    <div
                      className='absolute inset-0 bg-black/40'
                      aria-hidden='true'
                    />
                  </div>

                  {/* care - activity photo (SMALLER, pink border) */}
                  <div className='relative aspect-[16/18] overflow-hidden rounded-2xl shadow-lg'>
                    <Image
                      src='/home/wwd/care.webp'
                      alt='SPE Care Activity'
                      fill
                      className='object-cover'
                      sizes='(max-width: 1024px) 15vw, 8vw'
                    />
                    {/* Dark overlay dengan opacity */}
                    <div
                      className='absolute inset-0 bg-black/40'
                      aria-hidden='true'
                    />
                  </div>
                </div>

                {/* Signboard - positioned to touch bottom of kakandi */}
                <div className='absolute -left-1/3 -top-1/6 lg:-top-1/2 z-20 w-full -rotate-4 '>
                  <div className='relative aspect-[9/16] w-full'>
                    <Image
                      src='/home/wwd/signboard.webp'
                      alt='SPE Signboard on Easel'
                      fill
                      className='object-contain'
                      sizes='(max-width: 1024px) 38vw, 20vw'
                    />
                  </div>
                </div>

                {/* Bottom Row: Wide group photo - with left padding for signboard */}
                <div className='mt-4 pl-[32%] lg:pl-[28%] lg:ml-12'>
                  <div className='relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg'>
                    <Image
                      src='/home/wwd/foto-rame.webp'
                      alt='SPE Group Photo'
                      fill
                      className='object-cover'
                      sizes='(max-width: 1024px) 50vw, 25vw'
                    />
                    {/* Dark overlay dengan opacity */}
                    <div
                      className='absolute inset-0 bg-black/40'
                      aria-hidden='true'
                    />
                  </div>
                </div>
              </div>

              {/* Primary Button - positioned at bottom right */}
              <PrimaryButton href='/about' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
