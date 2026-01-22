/** @format */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import EventCard from '../../components/EventCard';
import MoreText from '../../components/MoreText';
import CompanyLogosGrid from '../../components/CompanyLogosGrid';

// Events Data
const eventsData = [
  {
    id: 1,
    title: 'PETROBOWL',
    popupImageSrc: '/events/slide/slide1-popup.png',
    popupCenterImageSrc: '/events/slide/slide2-popup-center.png',
    description: (
      <p>
        PetroBowl is a prestigious{' '}
        <span className='font-bold text-[#2cb385]'>global competition</span>{' '}
        that challenges students on their knowledge of petroleum engineering,
        energy sectors, and related disciplines. It&apos;s a fast-paced,{' '}
        <span className='font-bold text-[#2cb385]'>quiz-style competition</span>{' '}
        that demands both individual expertise and effective teamwork. SPE UP SC
        has proudly achieved{' '}
        <span className='font-bold text-[#2cb385]'>impressive results</span> in
        PetroBowl, having secured{' '}
        <span className='font-bold text-[#2cb385]'>1st place</span> in SPE Asia
        Pacific Regional Qualifier 2022.
      </p>
    ),
  },
  {
    id: 2,
    title: 'IPTC',
    popupImageSrc: '/events/slide/slide2-muncul.png',
    imageSrc: '/events/slide/bg slide 2.png',
    description: (
      <p>
        The International Petroleum Technology Conference (IPTC) offers a{' '}
        <span className='font-bold text-[#2cb385]'>comprehensive platform</span>{' '}
        for students to gain hands-on{' '}
        <span className='font-bold text-[#2cb385]'>exposure</span> to the{' '}
        <span className='font-bold text-[#2cb385]'>latest trends</span> and{' '}
        <span className='font-bold text-[#2cb385]'>technologies</span> in the
        energy industry. By attending IPTC, our members are able to connect with
        global professionals, attend insightful technical sessions, and
        participate in various knowledge-sharing activities, preparing them to
        become{' '}
        <span className='font-bold text-[#2cb385]'>future leaders</span>.
      </p>
    ),
  },
  {
    id: 3,
    title: 'SPE SPC',
    popupImageSrc: '/events/slide/slide3-popup.png',
    imageSrc: '/events/slide/bgslide3.png',
    description: (
      <p>
        The SPE Student Paper Contest (SPC) provides a platform for students to
        present their{' '}
        <span className='font-bold text-[#2cb385]'>
          research and innovations
        </span>{' '}
        to a panel of industry experts. We are proud to share that two of our
        members have won the SPC, an accomplishment that reflects the high
        caliber of students within our chapter. Their success has not only
        elevated our chapter&apos;s reputation but has also{' '}
        <span className='font-bold text-[#2cb385]'>
          inspired fellow students
        </span>{' '}
        to push the boundaries of technical knowledge and research.
      </p>
    ),
  },
  {
    id: 4,
    title: 'SPE Gathering',
    popupImageSrc: '/events/slide/slide4-popup.png',
    imageSrc: '/events/slide/slide4-bg.png',
    description: (
      <p>
        Student chapters in the Java section frequently organize SPE gatherings,
        which offer numerous benefits. These events provide{' '}
        <span className='font-bold text-[#2cb385]'>
          valuable networking
        </span>{' '}
        opportunities, enhance knowledge sharing, and{' '}
        <span className='font-bold text-[#2cb385]'>
          foster collaboration
        </span>{' '}
        among students and professionals in the industry. By participating in
        these gatherings, officers can gain insights into the latest
        developments in the field, exchange ideas with peers, and{' '}
        <span className='font-bold text-[#2cb385]'>build connections</span> that
        are beneficial for their future careers.
      </p>
    ),
  },
  {
    id: 5,
    title: 'AES',
    popupImageSrc: '/events/slide/slide5-popup.png',
    description: (
      <p>
        The Annual Energy Symposium (AES) is a significant event that brings
        together students, professionals, and academics to discuss current
        issues, innovations, and future trends in the energy sector. Organized
        by various educational and industry institutions, AES typically features
        a range of activities, including{' '}
        <span className='font-bold text-[#2cb385]'>keynote speeches</span>,{' '}
        <span className='font-bold text-[#2cb385]'>panel discussions</span>,{' '}
        <span className='font-bold text-[#2cb385]'>
          technical presentations
        </span>
        , and <span className='font-bold text-[#2cb385]'>competitions</span>.
        SPE UP SC actively participates in AES - SPE Java Indonesia by joining
        as <span className='font-bold text-[#2cb385]'>committee members</span>.
      </p>
    ),
  },
  {
    id: 6,
    title: 'FUTURISTIC',
    popupImageSrc: '/events/slide/slide6-popup.png',
    description: (
      <p>
        FUTURISTIC is a work program that provides{' '}
        <span className='font-bold text-[#2cb385]'>
          insightful discussions
        </span>{' '}
        with{' '}
        <span className='font-bold text-[#2cb385]'>professional speakers</span>{' '}
        through a talk show program. This event, held offline and online,
        attracts over 500+ attendees from various{' '}
        <span className='font-bold text-[#2cb385]'>academic backgrounds</span>{' '}
        and <span className='font-bold text-[#2cb385]'>colleges</span>. We also
        offer exclusive event merchandise, which has proven to be very popular
        and sells out quickly, reflecting the enthusiasm and support of our
        attendees.
      </p>
    ),
  },
  {
    id: 7,
    title: 'COMPANY VISIT',
    popupImageSrc: '/events/slide/slide7-popup.png',
    description: (
      <p>
        Company Visit is a pivotal work program that provides participants with
        an{' '}
        <span className='font-bold text-[#2cb385]'>immersive experience</span>{' '}
        of the daily operations of companies within the oil and gas industry.
        This program offers a unique opportunity to gain{' '}
        <span className='font-bold text-[#2cb385]'>practical insights</span> and
        a deeper understanding of industry practices. These visits give
        participants direct exposure to{' '}
        <span className='font-bold text-[#2cb385]'>professionals</span>,{' '}
        <span className='font-bold text-[#2cb385]'>operations</span>, and{' '}
        <span className='font-bold text-[#2cb385]'>sector innovations</span>,
        preparing them for their{' '}
        <span className='font-bold text-[#2cb385]'>careers</span>.
      </p>
    ),
  },
  {
    id: 8,
    title: 'SPE CARE',
    popupImageSrc: '/events/slide/slide8-popup.png',
    description: (
      <p>
        SPE Care is an initiative to{' '}
        <span className='font-bold text-[#2cb385]'>support community</span> and{' '}
        <span className='font-bold text-[#2cb385]'>
          environmental well-being
        </span>
        . This program is designed to address{' '}
        <span className='font-bold text-[#2cb385]'>societal needs</span> and
        contribute positively to the environment through various outreach
        activities and projects. By fostering a spirit of giving back and
        raising awareness about important issues, SPE Care embodies the
        commitment of SPE UP SC to not only advance the field of petroleum
        engineering but also{' '}
        <span className='font-bold text-[#2cb385]'>contribute</span> to the
        greater good of society and the{' '}
        <span className='font-bold text-[#2cb385]'>environment</span>.
      </p>
    ),
  },
  {
    id: 9,
    title: 'SPE VLOC',
    popupImageSrc: '/events/slide/slide9-popup.png',
    description: (
      <p>
        SPE Vloc is a series of informative content that provides an overview of{' '}
        <span className='font-bold text-[#2cb385]'>
          daily life in the oil and gas field
        </span>
        , as well as other energy sectors. This series successfully engages
        audiences from various study programs and academic years, offering a{' '}
        <span className='font-bold text-[#2cb385]'>unique glimpse</span> into
        the industry&apos;s daily operations. Additionally, we encourage active
        participation through Q&A sessions on IG Stories, which typically
        receive over <span className='font-bold text-[#2cb385]'>600 views</span>
        , fostering interactive and meaningful discussions with our audience.
      </p>
    ),
  },
  {
    id: 10,
    title: 'SCOPO',
    popupImageSrc: '/events/slide/slide10-popup.png',
    description: (
      <p>
        SCOPO Series is a series of{' '}
        <span className='font-bold text-[#2cb385]'>attractive content</span> in
        collaboration with{' '}
        <span className='font-bold text-[#2cb385]'>professional speakers</span>{' '}
        about the agreed theme. We also invite professionals from abroad to
        share their insights, bringing a diverse and{' '}
        <span className='font-bold text-[#2cb385]'>global perspective</span> to
        each session. This podcast is shared on IG Reels, where it garners an
        average of over{' '}
        <span className='font-bold text-[#2cb385]'>4,000 views</span>, and on
        YouTube, with around{' '}
        <span className='font-bold text-[#2cb385]'>300 views per episode</span>.
      </p>
    ),
  },
  {
    id: 11,
    title: 'SPE Internal Mentoring',
    popupImageSrc: '/events/slide/slid11-popup.png',
    description: (
      <p>
        SIM is a work program aimed at{' '}
        <span className='font-bold text-[#2cb385]'>
          enhancing both soft skills and hard skills
        </span>{' '}
        of SPE UP SC&apos;s officers, ambassadors, and active members through a
        structured internal mentoring process. The program provides tailored{' '}
        <span className='font-bold text-[#2cb385]'>mentoring sessions</span>,{' '}
        <span className='font-bold text-[#2cb385]'>workshops</span>, and{' '}
        <span className='font-bold text-[#2cb385]'>hands-on activities</span>,
        focusing on personal and professional development areas such as
        leadership, communication, teamwork, technical knowledge, and
        industry-specific skills.
      </p>
    ),
  },
  {
    id: 12,
    title: 'SOFTWARE TRAINING',
    popupImageSrc: '/events/slide/slide12-popup.png',
    description: (
      <p>
        Software Training is an essential work program aimed at{' '}
        <span className='font-bold text-[#2cb385]'>
          advancing participants&apos; proficiency
        </span>{' '}
        in industry-specific software through{' '}
        <span className='font-bold text-[#2cb385]'>specialized training</span>{' '}
        in partnership with leading oil and gas or service companies. This
        program focuses on developing practical skills and in-depth{' '}
        <span className='font-bold text-[#2cb385]'>
          knowledge of software tools critical
        </span>{' '}
        for various aspects of the oil and gas industry.
      </p>
    ),
  },
];

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + eventsData.length) % eventsData.length
    );
  };

  const currentEvent = eventsData[currentSlide];

  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-br-[60px] sm:h-[70vh] lg:h-[80vh]'>
        {/* Background Image */}
        <Image
          src='/events/hero.webp'
          alt='SPE UP SC Events'
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />

        {/* Gradient Overlay */}
        <div
          className='absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[rgba(155,255,231,0.3)]'
          aria-hidden='true'
        />
      </section>

      {/* Participated Events Intro Text */}
      <section className='px-6 py-8 sm:px-12 sm:py-12 lg:px-24 lg:py-16'>
        <p className='text-center font-thin italic text-2xl text-black sm:text-3xl lg:text-4xl'>
          SPE UP SC Participated on several events
        </p>
      </section>

      {/* Event Slide Section */}
      <section className='relative px-6 pb-16 sm:px-12 lg:px-24 lg:pb-24'>
        {/* Event Card */}
        <EventCard
          key={currentEvent.id}
          popupImageSrc={currentEvent.popupImageSrc}
          popupImageAlt={currentEvent.title}
          popupCenterImageSrc={currentEvent.popupCenterImageSrc}
          popupCenterImageAlt={currentEvent.title}
          imageSrc={currentEvent.imageSrc}
          title={currentEvent.title}
          description={currentEvent.description}
        />

        {/* Slide Indicator */}
        <div className='mt-4 flex justify-center gap-2'>
          {eventsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all sm:h-3 sm:w-3 ${
                index === currentSlide
                  ? 'bg-[#3C8C98] w-6 sm:w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className='absolute left-4 top-1/2 z-30 -translate-y-1/2 sm:left-8 lg:left-12'>
          <button
            onClick={prevSlide}
            className='flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#3C8C98] shadow-lg transition-all hover:bg-white hover:scale-110 sm:h-16 sm:w-16 lg:h-20 lg:w-20'
            aria-label='Previous slide'
          >
            <svg
              className='h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
        </div>

        <div className='absolute right-4 top-1/2 z-30 -translate-y-1/2 sm:right-8 lg:right-12'>
          <button
            onClick={nextSlide}
            className='flex h-12 w-12 items-center justify-center rounded-full bg-[#3C8C98]/80 text-white shadow-lg transition-all hover:bg-[#3C8C98] hover:scale-110 sm:h-16 sm:w-16 lg:h-20 lg:w-20'
            aria-label='Next slide'
          >
            <svg
              className='h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Company Collaboration Section */}
      <section className='px-6 py-8 sm:px-12 sm:py-12 lg:px-24 lg:py-16'>
        {/* Intro Text */}
        <MoreText
          content='And already held event collaboration with several companies'
          position='left'
          className='mb-8 sm:mb-12'
        />

        {/* Company Logos */}
        <CompanyLogosGrid />

        {/* Also Many More */}
        <MoreText content='also many more...' position='right' />
      </section>
    </main>
  );
}
