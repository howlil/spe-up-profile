/** @format */

import Image from 'next/image';
import SectionTitle from '../../../components/SectionTitle';
import MotionFadeIn from '../../../components/MotionFadeIn';

const alumniTestimonials = [
  {
    name: 'Asyifa Defirsta',
    position: 'Vice President of SPE UP SC 2022/2023',
    imageSrc: '/alumnae/alumanae/asyfa.webp',
    testimonials: [
      `One of the most transformative things about being part of SPE was how it built my confidence in so many ways. Coming from a technical background, it's easy to focus only on the numbers, but SPE pushed me out of my comfort zone and taught me how to actually own my voice in professional spaces.`,
      `One of the biggest things I got was definitely a boost in confidence. Being actively involved in the organization really helped me when it comes to representing my experience, whether it's during interviews or professional discussions at work. It gives you a track record to talk about and helps you get on the same page with different people much faster.`,
      `All those times meeting and connecting with different people along the way really made a difference. It's not something you notice immediately, but those interactions eventually add up and help you feel more at ease once you're actually in the industry. Plus, since SPE is already so well-known in this field, it gives you a solid common ground with almost everyone you meet at work. It really gave me the right mindset to start my career on a good note!`,
    ],
  },
  {
    name: 'M. Chairafy Hamid',
    position: 'President of SPE UP SC 2023/2024',
    imageSrc: '/alumnae/alumanae/charafy.webp',
    testimonials: [
      `I joined the Society of Petroleum Engineers (SPE) Universitas Pertamina Student Chapter early in my university journey. At that time, it was one of the first organizations I felt genuinely interested in joining, as it offered a chance to learn more about the energy industry while connecting with other students who shared similar interests.`,
      `As time went by, my involvement in SPE grew into something much more meaningful. It became a place where I could learn, contribute ideas, and work closely with people who were equally passionate about creating valuable experiences for students. Eventually, I had the opportunity to serve as President of the chapter, where together with an amazing team to organized various programs, from technical sessions, industry talks, and activities that support our member better understand the professional world with building bridges between students and industry professionals.`,
      `I'm truly grateful to have been part of a community that continues to support and inspire future energy professionals.`,
    ],
  },
  {
    name: 'Shahar Banun',
    position: 'President of SPE UP SC 2024/2025',
    imageSrc: '/alumnae/alumanae/shahar.webp',
    testimonials: [
      `SPE Universitas Pertamina Student Chapter has been one of the most meaningful parts of my university journey. Through SPE, I learned not only technical knowledge about the energy industry but also the true meaning of leadership, collaboration, and taking initiative to create impact. Starting as a staff member in the External Affairs Department, then serving as Director, and eventually being entrusted as President, I had the opportunity to grow alongside an incredible team that continuously pushed boundaries and created opportunities for our members.`,
      `Being part of the chapter also allowed me to participate in international competitions and professional programmes, while contributing to the chapter's recognition as one of the top student chapters globally through the 2026 SPE Presidential Award. SPE UP SC will always be a place that nurtures growth, ambition, and a shared vision to contribute to the future of the energy industry.`,
    ],
  },
];

function AlumniTestimonialCard({
  name,
  position,
  imageSrc,
  testimonials,
}: {
  name: string;
  position: string;
  imageSrc: string;
  testimonials: string[];
}) {
  return (
    <article className='h-full w-full pt-20'>
      <div className='relative flex h-full flex-col rounded-[2.5rem] bg-gradient-to-b from-[#0eb4d1] to-[#052f45] px-6 pb-8 pt-24 text-white shadow-xl sm:px-10 sm:pb-10 sm:pt-28'>
        <div className='absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white/30 shadow-lg sm:h-48 sm:w-48'>
          <Image
            src={imageSrc}
            alt={name}
            fill
            className='object-cover object-center'
            sizes='(max-width: 640px) 160px, 192px'
          />
        </div>
        <div className='text-center'>
          <h3
            className='text-2xl leading-tight sm:text-3xl'
            style={{fontFamily: 'Geller, serif', fontStyle: 'italic'}}
          >
            {name}
          </h3>
          <p className='mt-2 text-sm leading-tight sm:text-base'>{position}</p>
          <p
            className='mt-3 text-[5rem] font-black leading-none text-white sm:text-[6rem]'
            style={{fontFamily: 'Georgia, serif'}}
            aria-hidden='true'
          >
            &ldquo;
          </p>
        </div>
        <div className='flex-1 space-y-6 text-justify text-base leading-relaxed sm:text-lg'>
          {testimonials.map((paragraph, idx) => (
            <p key={`${name}-${idx}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function AlumnaeMorePage() {
  return (
    <main className='min-h-screen bg-white'>
      <MotionFadeIn>
      {/* Hero Section */}
      <section className='relative h-[60vh] min-h-[400px] w-full sm:h-[70vh] lg:h-[80vh]'>
        {/* Background Image */}
        <Image
          src='/home/new-hero.webp'
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

        <div className='mt-12 grid grid-cols-1 items-stretch gap-14 sm:mt-16 sm:grid-cols-2 sm:gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-10'>
          {alumniTestimonials.map(testimonial => (
            <AlumniTestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              position={testimonial.position}
              imageSrc={testimonial.imageSrc}
              testimonials={testimonial.testimonials}
            />
          ))}
        </div>
      </section>
      </MotionFadeIn>
    </main>
  );
}
