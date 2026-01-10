/** @format */

import Image from 'next/image';
import {MapPin, Mail, Instagram, Linkedin} from 'lucide-react';

export default function Footer() {
  return (
    <footer className='relative overflow-hidden'>
      {/* White rounded section at top */}
      <div className='relative h-[120px] bg-white sm:h-[140px] lg:h-[160px]'>
        {/* Rounded bottom corners overlay */}
        <div className='absolute bottom-0 left-0 right-0 h-[60px] rounded-t-[30px] bg-black sm:h-[70px] lg:h-[80px]' />

        {/* Logo - positioned to overlap white and black sections - 1/5 page width */}
        <div className='absolute left-4 top-0 z-30 sm:left-12 lg:left-24'>
          <div className='rounded-full bg-[#3C8C98] px-8 py-4 shadow-lg sm:px-10 sm:py-5 lg:px-12 lg:py-6'>
            <Image
              src='/logo.webp'
              alt='SPE Java - Solutions. People. Energy.'
              width={280}
              height={100}
              className='h-auto w-[150px] object-contain sm:w-[240px] lg:w-[280px]'
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* Main black section */}
      <div className='relative bg-black pb-0'>
        {/* Grid container - phone breaks out of container */}
        <div className='grid lg:grid-cols-[1fr_2fr]'>
          {/* Left Side - Phone Image - Flush to left and bottom edges */}
          <div className='relative hidden lg:block'>
            {/* Phone image positioned absolutely to break out of grid */}
            <div className='absolute -bottom-0 -left-0 z-10'>
              <div className='relative h-[350px] w-[450px] xl:h-[400px] xl:w-[500px]'>
                <Image
                  src='/home/footter.webp'
                  alt='Vintage Rotary Phone'
                  fill
                  className='object-contain object-left-bottom'
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Contact Information (3fr) */}
          <div className='flex flex-col justify-center space-y-8 px-4 py-12 sm:px-8 lg:px-12 lg:py-16'>
            <h2 className='text-4xl font-medium text-white lg:text-5xl'>
              Contact Us
            </h2>

            <div className='space-y-6'>
              {/* Address */}
              <div className='flex items-start gap-5'>
                <div className='flex-shrink-0'>
                  <MapPin
                    className='h-10 w-10 text-white'
                    strokeWidth={1.5}
                  />
                </div>
                <p className='pt-1 text-base leading-relaxed text-white sm:text-lg lg:text-xl'>
                  Jl. Teuku Nyak Arief, RT.7/RW.8, Simprug, Kec. Kby. Lama, Kota
                  Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12220
                </p>
              </div>

              {/* Email */}
              <div className='flex items-center gap-5'>
                <div className='flex-shrink-0'>
                  <Mail
                    className='h-10 w-10 text-white'
                    strokeWidth={1.5}
                  />
                </div>
                <p className='text-base text-white sm:text-lg lg:text-xl'>
                  speupsc@gmail.com
                </p>
              </div>

              {/* Instagram */}
              <div className='flex items-center gap-5'>
                <div className='flex-shrink-0'>
                  <Instagram
                    className='h-10 w-10 text-white'
                    strokeWidth={1.5}
                  />
                </div>
                <p className='text-base text-white sm:text-lg lg:text-xl'>
                  speupsc
                </p>
              </div>

              {/* LinkedIn */}
              <div className='flex items-center gap-5'>
                <div className='flex-shrink-0'>
                  <Linkedin
                    className='h-10 w-10 text-white'
                    strokeWidth={1.5}
                  />
                </div>
                <p className='text-base text-white sm:text-lg lg:text-xl'>
                  SPE Universitas Pertamina SC
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Phone Image - shown only on mobile/tablet */}
        <div className='relative flex justify-center lg:hidden'>
          <div className='relative h-[250px] w-[320px] sm:h-[300px] sm:w-[380px]'>
            <Image
              src='/home/footter.webp'
              alt='Vintage Rotary Phone'
              fill
              className='object-contain'
              priority={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
