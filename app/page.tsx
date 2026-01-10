/** @format */

import Image from 'next/image';

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
      </section>

      {/* About Us Section */}
      <section
        className='bg-white py-12 sm:py-16 lg:py-20'
        aria-labelledby='about-heading'
      >
        {/* Heading - dalam container */}
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className=' '>
            <div className='flex items-center gap-4'>
              <h2
                id='about-heading'
                className='text-4xl font-normal text-[#3C8C98] sm:text-5xl lg:text-6xl'
              >
                About Us
              </h2>
              <div
                className='h-1 flex-1 bg-[#3C8C98]'
                aria-hidden='true'
              />
            </div>
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
            <div className='flex items-center gap-4'>
              <div
                className='h-1 flex-1 bg-[#3C8C98]'
                aria-hidden='true'
              />
              <h2
                id='achievement-heading'
                className='text-4xl font-normal text-[#3C8C98] sm:text-5xl lg:text-6xl'
              >
                Achievement
              </h2>
            </div>
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
            <div className='hidden items-center gap-4 sm:flex'>
              <div
                className='h-1 flex-1 bg-[#3C8C98] max-w-xs'
                aria-hidden='true'
              />
              <h2
                id='collaboration-heading'
                className='text-4xl font-normal text-[#3C8C98] sm:text-5xl lg:text-6xl whitespace-nowrap'
              >
                <span className='font-[var(--font-playfair)] italic text-[#3C8C98]'>
                  Our Previous
                </span>{' '}
                <span className='text-[#3C8C98]'>Company Collaboration</span>
              </h2>
              <div
                className='h-1 flex-1 bg-[#3C8C98] max-w-xs'
                aria-hidden='true'
              />
            </div>
          </div>

          {/* Company Logos Grid */}
          <div className='grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4 lg:grid-cols-8 lg:gap-8'>
            {/* PWC */}
            <div className='flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4'>
              <div className='relative h-10 w-full sm:h-12'>
                <Image
                  src='/home/pwc.webp'
                  alt='PwC - PricewaterhouseCoopers'
                  fill
                  className='object-contain'
                  sizes='(max-width: 640px) 120px, 150px'
                />
              </div>
            </div>

            {/* Pertamina */}
            <div className='flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4'>
              <div className='relative h-10 w-full sm:h-12'>
                <Image
                  src='/home/pertaminia.webp'
                  alt='Pertamina'
                  fill
                  className='object-contain'
                  sizes='(max-width: 640px) 120px, 150px'
                />
              </div>
            </div>

            {/* SLB */}
            <div className='flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4'>
              <div className='relative h-10 w-full sm:h-12'>
                <Image
                  src='/home/slb.webp'
                  alt='SLB - Schlumberger'
                  fill
                  className='object-contain'
                  sizes='(max-width: 640px) 120px, 150px'
                />
              </div>
            </div>

            {/* RFD */}
            <div className='flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4'>
              <div className='relative h-10 w-full sm:h-12'>
                <Image
                  src='/home/rfd.webp'
                  alt='RFD'
                  fill
                  className='object-contain'
                  sizes='(max-width: 640px) 120px, 150px'
                />
              </div>
            </div>

            {/* HCML */}
            <div className='flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4'>
              <div className='relative h-10 w-full sm:h-12'>
                <Image
                  src='/home/hcml.webp'
                  alt='HCML'
                  fill
                  className='object-contain'
                  sizes='(max-width: 640px) 120px, 150px'
                />
              </div>
            </div>

            {/* BP */}
            <div className='flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4'>
              <div className='relative h-10 w-full sm:h-12'>
                <Image
                  src='/home/bp.webp'
                  alt='BP - British Petroleum'
                  fill
                  className='object-contain'
                  sizes='(max-width: 640px) 120px, 150px'
                />
              </div>
            </div>

            {/* PetroChina */}
            <div className='flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4'>
              <div className='relative h-10 w-full sm:h-12'>
                <Image
                  src='/home/petrocina.webp'
                  alt='PetroChina'
                  fill
                  className='object-contain'
                  sizes='(max-width: 640px) 120px, 150px'
                />
              </div>
            </div>

            {/* AIV */}
            <div className='flex items-center justify-center rounded-lg bg-white p-3 shadow-md transition-transform hover:scale-105 sm:p-4'>
              <div className='relative h-10 w-full sm:h-12'>
                <Image
                  src='/home/aiv.webp'
                  alt='AIV'
                  fill
                  className='object-contain'
                  sizes='(max-width: 640px) 120px, 150px'
                />
              </div>
            </div>
          </div>

          {/* And many more text */}
          <div className='mt-6 text-center sm:mt-8'>
            <p className='font-[var(--font-playfair)] italic text-base text-gray-600 sm:text-lg lg:text-xl'>
              and many more...
            </p>
          </div>
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
            <div className='flex items-center gap-4'>
              <h2
                id='what-we-do-heading'
                className='whitespace-nowrap font-[var(--font-playfair)] text-4xl font-normal italic text-[#3C8C98] sm:text-5xl lg:text-6xl'
              >
                What We Do
              </h2>
              <div
                className='h-[6px] flex-1 bg-[#3C8C98]'
                aria-hidden='true'
              />
            </div>

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

              {/* Explore Button - positioned at bottom right */}
              <div className='mt-8 flex justify-end'>
                <a
                  href='/event'
                  className='inline-flex items-center rounded-full border border-white bg-gradient-to-r from-[#3C8C98] to-[#52e8ff] px-8 py-3 text-base font-semibold italic text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg'
                >
                  Explore for More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
