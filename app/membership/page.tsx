/** @format */

import Image from 'next/image';
import FolderCard from '../../components/FolderCard';
import SectionTitle from '../../components/SectionTitle';

export default function MembershipPage() {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section
        className='relative h-[50vh] min-h-[400px] w-full overflow-hidden sm:h-[60vh] lg:h-[70vh]'
        aria-label='Membership Hero'
      >
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src='/membership/cover.webp'
            alt='SPE Membership - Society of Petroleum Engineers'
            fill
            className='object-cover object-top'
            priority
            sizes='100vw'
          />
          {/* Gradient overlay from bottom */}
          <div
            className='absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black to-transparent'
            aria-hidden='true'
          />
        </div>
      </section>

      {/* SPE Membership Section */}
      <section
        className='relative overflow-hidden py-12 sm:py-16 lg:py-20'
        aria-labelledby='spe-membership-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Section Title */}
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='spe-membership-heading'
              variant='center'
            >
              SPE Membership
            </SectionTitle>
          </div>

          {/* Membership Card Display */}
          <FolderCard
            imageSrc='/membership/membership-card-image.webp'
            imageAlt='SPE Members'
            title='SPE Membership'
            description={
              <p>
                <span className='bg-gradient-to-r from-[#2cb385] to-[#134d39] bg-clip-text font-bold text-transparent'>
                  SPE Membership
                </span>{' '}
                is carried out to{' '}
                <span className='bg-gradient-to-r from-[#2cb385] to-[#134d39] bg-clip-text font-bold text-transparent'>
                  provide information and opportunities for members to
                  participate in activities
                </span>{' '}
                organized by SPE. The procedure mechanism as well as the terms
                and conditions of being a member of the SPE in this work program
                are carried out in accordance with the provisions of the SPE
                International. It is hoped that this program will make it easier
                for applicants to become members of the SPE.
              </p>
            }
          />
        </div>

     
        <div className='absolute left-0 top-1/3 z-20 hidden w-[280px] -translate-x-1/4 md:block lg:w-[380px] xl:w-[480px] 2xl:w-[550px]'>
          <div className='relative aspect-[457/355]'>
            <Image
              src='/membership/lanyard.webp'
              alt='SPE Membership Lanyard'
              fill
              className='object-contain object-left'
              sizes='(max-width: 1024px) 280px, (max-width: 1280px) 380px, (max-width: 1536px) 480px, 550px'
            />
          </div>
        </div>

        {/* Right - Card Mockup */}
        <div className='absolute right-0 top-1/3 z-20 hidden w-[320px] translate-x-1/4 md:block lg:w-[450px] xl:w-[580px] 2xl:w-[680px]'>
          <div className='relative aspect-[560/448]'>
            <Image
              src='/membership/card-lanyard.webp'
              alt='SPE Membership Card Mockup'
              fill
              className='object-contain object-right'
              sizes='(max-width: 1024px) 320px, (max-width: 1280px) 450px, (max-width: 1536px) 580px, 680px'
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className='py-12 sm:py-16 lg:py-20'
        aria-labelledby='benefits-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Section Title */}
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='benefits-heading'
              variant='left'
            >
              Benefits
            </SectionTitle>
          </div>

          {/* Benefits Grid */}
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {/* Benefit Card 1 - Participate */}
            <BenefitCard
              iconSrc='/membership/account-hard-hat.svg'
              iconAlt='Participate in Work Programs'
              description={
                <>
                  Have opportunity to{' '}
                  <span className='font-bold'>
                    participate in many of work programs
                  </span>{' '}
                  offered by SPE UP SC, including Company Visits, Training and
                  Mentoring, Coaching, and numerous others.
                </>
              }
            />

            {/* Benefit Card 2 - Free Access */}
            <BenefitCard
              iconSrc='/membership/cloud.svg'
              iconAlt='Free Access to Webinars'
              description={
                <>
                  Get <span className='font-bold'>free access</span> to view SPE
                  webinars to get online education and also access{' '}
                  <span className='font-bold'>online courses</span> through SPE
                  Website.
                </>
              }
            />

            {/* Benefit Card 3 - Updates */}
            <BenefitCard
              iconSrc='/membership/email.svg'
              iconAlt='Receive Updates'
              description={
                <>
                  Receive the{' '}
                  <span className='font-bold'>
                    latest updates and important information
                  </span>{' '}
                  about SPE, where you will get regular news, event
                  announcements directly delivered to your inbox.
                </>
              }
            />

            {/* Benefit Card 4 - Communicate */}
            <BenefitCard
              iconSrc='/membership/Vector.svg'
              iconAlt='Communicate with Members'
              description={
                <>
                  Able to{' '}
                  <span className='font-bold'>
                    virtually communicate, exchange knowledge, and collaborate
                  </span>{' '}
                  with other members from around the world.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section
        className='py-12 sm:py-16 lg:py-20'
        aria-labelledby='tutorial-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Section Title */}
          <div className='mb-4 sm:mb-6'>
            <SectionTitle
              id='tutorial-heading'
              variant='center'
            >
              Tutorial
            </SectionTitle>
          </div>

          {/* Subtitle with gradient text */}
          <p className='mb-8 text-center text-lg sm:text-xl lg:text-2xl'>
            <span className='bg-gradient-to-r from-[#39717a] to-[#68cfe0] bg-clip-text text-transparent'>
              <span className='font-[var(--font-playfair)] italic'>
                Register yourself
              </span>{' '}
              now through our link, you can access on the detailed guidebook
              below
            </span>
          </p>

          {/* Gradient Bar with Link */}
          <div className='mb-10 sm:mb-14'>
            <a
              href='https://bit.ly/GuideBookMembershipSPEUPSC'
              target='_blank'
              rel='noopener noreferrer'
              className='flex h-[180px] w-full items-center justify-center rounded-[15px] bg-gradient-to-r from-[#3C8C98] to-[#142e32] shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl sm:h-[220px] lg:h-[280px]'
            >
              <span className='text-center text-base font-semibold text-white underline sm:text-lg lg:text-xl'>
                https://bit.ly/GuideBookMembershipSPEUPSC
              </span>
            </a>
          </div>

          {/* Video Tutorials */}
          <div className='grid gap-8 lg:grid-cols-2 lg:gap-5'>
            {/* NEW Member Video */}
            <div className='flex flex-col gap-3 sm:gap-4'>
              <p className='text-center text-lg sm:text-xl lg:text-2xl'>
                <span className='bg-gradient-to-r from-[#39717a] to-[#68cfe0] bg-clip-text text-transparent'>
                  If you&apos;re are{' '}
                  <span className='font-[var(--font-playfair)] italic'>
                    New
                  </span>
                  , click this video below
                </span>
              </p>
              <div className='relative aspect-video overflow-hidden rounded-lg shadow-lg'>
                <iframe
                  src='https://www.youtube.com/embed/x_8oF4gDlzw'
                  title='Tutorial for New SPE Members'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  className='absolute inset-0 h-full w-full'
                />
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200'>
                  <Image
                    src='/logo.webp'
                    alt='SPE'
                    width={32}
                    height={32}
                    className='rounded-full object-contain'
                  />
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-900'>
                    Tutorial on Joining SPE UP SC Membership
                  </p>
                  <p className='text-xs text-red-500'>
                    SPE Universitas Pertamina SC
                  </p>
                </div>
              </div>
            </div>

            {/* RENEW Member Video */}
            <div className='flex flex-col gap-3 sm:gap-4'>
              <p className='text-center text-lg sm:text-xl lg:text-2xl'>
                <span className='bg-gradient-to-r from-[#39717a] to-[#68cfe0] bg-clip-text text-transparent'>
                  If you want to{' '}
                  <span className='font-[var(--font-playfair)] italic'>
                    Renew
                  </span>
                  , click this video below
                </span>
              </p>
              <div className='relative aspect-video overflow-hidden rounded-lg shadow-lg'>
                <iframe
                  src='https://www.youtube.com/embed/Em4O0D3efqU'
                  title='Tutorial for Renewing SPE Membership'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  className='absolute inset-0 h-full w-full'
                />
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200'>
                  <Image
                    src='/logo.webp'
                    alt='SPE'
                    width={32}
                    height={32}
                    className='rounded-full object-contain'
                  />
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-900'>
                    TUTORIAL RENEW MEMBERSHIP SPE International by SPE
                    Universitas Pertamina Student Chapter
                  </p>
                  <p className='text-xs text-red-500'>
                    SPE Universitas Pertamina SC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Person Section */}
      <section
        className='py-12 sm:py-16 lg:py-20'
        aria-labelledby='contact-person-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Section Title */}
          <div className='mb-8 sm:mb-12'>
            <p className='text-center text-2xl font-medium underline decoration-[#68cfe0] underline-offset-4 sm:text-3xl'>
              <span className='bg-gradient-to-r from-[#39717a] to-[#68cfe0] bg-clip-text text-transparent'>
                Contact Person
              </span>
            </p>
          </div>

          {/* Contact Cards - side by side */}
          <div className='flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-start sm:gap-12 lg:gap-20'>
            {/* Director */}
            <ContactCard
              imageSrc='/membership/direktor.webp'
              name='Tianno Revanoya'
              role='Director'
              department='Human Resource & Development'
              phone='+62 813-8916-5307'
              reverse={false}
            />

            {/* Co-Director */}
            <ContactCard
              imageSrc='/membership/codirektor.webp'
              name='Caroline Lydia'
              role='Co-Director'
              department='Human Resource & Development'
              phone='+62 813-8916-5307'
              reverse={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Benefit Card Component
interface BenefitCardProps {
  iconSrc: string;
  iconAlt: string;
  description: React.ReactNode;
}

function BenefitCard({ iconSrc, iconAlt, description }: BenefitCardProps) {
  return (
    <div className='flex flex-col rounded-2xl bg-gradient-to-b from-[#142e32] to-[#3C8C98] p-6 shadow-lg'>
      {/* Icon Container */}
      <div className='mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-2xl bg-white shadow-md sm:h-36 sm:w-36'>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={100}
          height={100}
          className='h-20 w-20 object-contain sm:h-24 sm:w-24'
        />
      </div>

      {/* Description */}
      <p className='text-center text-sm italic leading-relaxed text-white sm:text-justify'>
        {description}
      </p>
    </div>
  );
}

// Contact Card Component
interface ContactCardProps {
  imageSrc: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  reverse?: boolean;
}

function ContactCard({
  imageSrc,
  name,
  role,
  department,
  phone,
  reverse = false,
}: ContactCardProps) {
  return (
    <div
      className={`flex items-center gap-1 ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Photo Container with Role Label */}
      <div className='flex flex-col items-center'>
        {/* Photo with teal oval accent inside white circle */}
        <div className='relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36'>
          {/* White circular container */}
          <div className='relative h-full w-full overflow-hidden rounded-full bg-white shadow-lg'>
            {/* Teal gradient oval - INSIDE white circle, positioned top-right, behind photo */}
            <div
              className='absolute -right-3 -top-2 h-36 w-14 rotate-[46deg] rounded-full bg-gradient-to-b from-[#68cfe0] to-[#39717a] sm:h-40 sm:w-16 lg:h-44 lg:w-16'
              aria-hidden='true'
            />
            {/* Photo - on top of oval */}
            <div className='absolute inset-0 overflow-hidden rounded-br-xl'>
              <Image
                src={imageSrc}
                alt={name}
                fill
                className='object-cover'
                sizes='144px'
              />
            </div>
          </div>
        </div>

        {/* Role Label - below photo - italic serif */}
        <p className='mt-1 font-serif text-lg italic text-[#68cfe0] sm:text-xl lg:text-2xl'>
          {role}
        </p>
      </div>

      {/* Info */}
      <div className={`${reverse ? 'text-left' : 'text-left'}`}>
        {/* Name - italic serif */}
        <h3 className='font-serif text-lg italic text-gray-900 sm:text-xl lg:text-2xl'>
          {name}
        </h3>
        {/* Department - neutral 500 */}
        <p className='text-base font-medium text-neutral-500 sm:text-lg lg:text-xl'>
          {department}
        </p>
        {/* Phone - neutral 500 */}
        <p className='text-base font-medium text-neutral-500 sm:text-lg lg:text-xl'>
          {phone}
        </p>
      </div>
    </div>
  );
}
