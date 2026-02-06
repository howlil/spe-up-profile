/** @format */

'use client';

import Image from 'next/image';
import { Suspense, useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, AlertCircle, Upload, X, FileText } from 'lucide-react';
import FaceCard from '../../components/FaceCard';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import SectionTitle from '../../components/SectionTitle';

function AboutPageContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Partnership form state
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    subject: '',
    message: '',
    nda: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formState, setFormState] = useState({
    loading: false,
    success: false,
    error: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/jpg',
        'image/png',
      ];
      if (!allowedTypes.includes(file.type)) {
        setFormState(prev => ({ ...prev, error: 'Invalid file type. Only PDF, DOC, DOCX, and images are allowed.' }));
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setFormState(prev => ({ ...prev, error: 'File too large. Maximum size is 10MB.' }));
        return;
      }
      setSelectedFile(file);
      setFormState(prev => ({ ...prev, error: '' }));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePartnershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ loading: true, success: false, error: '' });

    try {
      let filePath = null;

      // Upload file first if selected
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', selectedFile);

        const uploadRes = await fetch('/api/partnerships/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadRes.ok) {
          const uploadData = await uploadRes.json();
          throw new Error(uploadData.error || 'File upload failed');
        }

        const uploadData = await uploadRes.json();
        filePath = uploadData.url;
      }

      // Submit partnership form
      const res = await fetch('/api/partnerships/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, filePath }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setFormState({ loading: false, success: true, error: '' });
      setFormData({ name: '', institution: '', email: '', subject: '', message: '', nda: false });
      setSelectedFile(null);
    } catch (error) {
      setFormState({
        loading: false,
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    // Handle anchor links from navigation
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [pathname, searchParams]);

  return (
    <div className='min-h-screen bg-white'>
      {/* Achievement Section */}
      <section
        id='achievement'
        className='relative overflow-x-hidden bg-white py-12 sm:py-16 lg:py-20 scroll-mt-24'
        aria-labelledby='achievement-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Heading */}
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='achievement-heading'
              variant='left'
            >
              Achievement
            </SectionTitle>
          </div>

          {/* Content Grid - Ratio 2/5 : 3/5 */}
          <div className='grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12'>
            {/* Text Content (Left) - 2/5 */}
            <div className='flex flex-col justify-start'>
              <div className='space-y-4 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8'>
                <p className='text-justify lg:pr-12'>
                  The SPE Outstanding Student Chapter Award 2025 is the{' '}
                  <span className='font-semibold text-[#3C8C98]'>
                    highest recognition given by SPE International
                  </span>{' '}
                  to student chapters worldwide for exceptional performance in
                  technical dissemination, professional development, and
                  community engagement. We are{' '}
                  <span className='font-semibold text-[#3C8C98]'>
                    honored to be among the elite chapters receiving this award
                  </span>
                  , a testament to our unwavering commitment to excellence,
                  innovation, and collaboration within the energy community.
                  This achievement not only elevates our chapter&apos;s global
                  standing but also motivates our members to continuously strive
                  for greater impact in the industry.
                </p>
              </div>
            </div>

            {/* Certificates (Right) - 3/5 */}
            <div className='relative flex items-center justify-center'>
              {/* Mobile: Stacked layout with badge */}
              <div className='relative grid w-full grid-cols-1 gap-4 sm:hidden'>
                <div className='relative aspect-[16/11] overflow-hidden rounded-lg bg-white shadow-lg'>
                  <Image
                    src='/about-us/achiev/cert1.webp'
                    alt='SPE Presidential Award Outstanding Student Chapter - Universitas Pertamina'
                    fill
                    className='object-cover'
                    sizes='100vw'
                  />
                </div>
                <div className='relative aspect-[16/11] overflow-hidden rounded-lg bg-white shadow-lg'>
                  <Image
                    src='/about-us/achiev/cert2.webp'
                    alt='SPE Regional Outstanding Student Chapter - Universitas Pertamina Chapter'
                    fill
                    className='object-cover'
                    sizes='100vw'
                  />
                </div>
                {/* Badge for mobile */}
                <div className='flex justify-center mt-4'>
                  <div className='relative h-32 w-32'>
                    <Image
                      src='/about-us/achiev/badgeStudentChapter.webp'
                      alt='SPE 2025 Outstanding Student Chapter Award Badge'
                      fill
                      className='object-contain'
                      sizes='128px'
                    />
                  </div>
                </div>
              </div>

              {/* Desktop: Polaroid style with rotation */}
              <div className='relative hidden h-[500px] w-full sm:block lg:h-[600px]'>
                {/* Certificate 1 - Top Left, Rotated */}
                <div className='absolute left-0 top-0 z-10 flex items-center justify-center'>
                  <div className='flex-none rotate-[-6deg]'>
                    <div className='relative h-[280px] w-[380px] bg-white shadow-[4.98px_11.621px_9.629px_0px_rgba(0,0,0,0.25)] sm:h-[320px] sm:w-[430px]'>
                      <div className='relative h-full w-full overflow-hidden'>
                        <Image
                          src='/about-us/achiev/cert1.webp'
                          alt='SPE Presidential Award Outstanding Student Chapter - Universitas Pertamina'
                          fill
                          className='object-cover'
                          sizes='(max-width: 1024px) 380px, 430px'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate 2 - Bottom Right, Rotated, Overlapping C1, Extending to edge */}
                <div className='absolute bottom-8 right-0 z-0 flex items-center justify-center sm:bottom-12 lg:right-[-5%] xl:right-[-8%] 2xl:right-[-12%]'>
                  <div className='flex-none rotate-[-6deg]'>
                    <div className='relative h-[280px] w-[380px] bg-white shadow-[4.98px_11.621px_9.629px_0px_rgba(0,0,0,0.25)] sm:h-[320px] sm:w-[430px]'>
                      <div className='relative h-full w-full overflow-hidden'>
                        <Image
                          src='/about-us/achiev/cert2.webp'
                          alt='SPE Regional Outstanding Student Chapter - Universitas Pertamina Chapter'
                          fill
                          className='object-cover'
                          sizes='(max-width: 1024px) 380px, 430px'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge - Next to C1, upper right area */}
                <div className='absolute left-[380px] top-0 z-20 sm:left-[420px] lg:left-[450px]'>
                  <div className='flex-none rotate-[6deg]'>
                    <div className='relative h-40 w-40 sm:h-48 sm:w-48 xl:h-56 xl:w-56'>
                      <Image
                        src='/about-us/achiev/badgeStudentChapter.webp'
                        alt='SPE 2025 Outstanding Student Chapter Award Badge'
                        fill
                        className='object-contain'
                        sizes='(min-width: 1280px) 224px, (min-width: 640px) 192px, 160px'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section
        id='vision-mission'
        className='relative bg-white py-12 sm:py-16 lg:py-20 scroll-mt-20'
        aria-labelledby='vision-mission-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Heading */}
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='vision-mission-heading'
              variant='left'
            >
              Vision & Mission
            </SectionTitle>
          </div>

          {/* Content Layout - Image left, Text right with proper spacing */}
          <div className='relative grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12'>
            {/* Image Placeholder (Left) - Maintains grid structure */}
            <div className='relative aspect-[3/4] w-full lg:h-full'>
              {/* Mobile Image - Normal positioning */}
              <div className='absolute inset-0 overflow-hidden rounded-lg lg:hidden'>
                <Image
                  src='/about-us/visi.webp'
                  alt='Vision and Mission illustration'
                  fill
                  className='object-cover'
                  sizes='100vw'
                />
              </div>

              {/* Desktop Image - Extended positioning */}
              <div className='absolute top-40 -left-20 inset-0 lg:h-full w-[calc(30vw+10%+5rem)] hidden lg:block'>
                <Image
                  src='/about-us/visi.webp'
                  alt='Vision and Mission illustration'
                  fill
                  className='object-cover'
                  sizes='60vw'
                />
              </div>
            </div>

            {/* Text Content (Right) */}
            <div className='flex flex-col justify-center space-y-6'>
              {/* Vision - Above the green box */}
              <div className='space-y-4 text-left lg:text-right'>
                <h3 className='text-2xl font-semibold text-gray-900 sm:text-3xl'>
                  Vision.
                </h3>
                <p className='text-base leading-7 text-gray-700 sm:text-lg sm:leading-8'>
                  <span className='font-semibold text-[#3C8C98]'>
                    SPE UP SC
                  </span>{' '}
                  as an agile and impactful youth energy organization that
                  fosters{' '}
                  <span className='font-semibold italic text-[#f0a931]'>
                    innovation
                  </span>
                  ,{' '}
                  <span className='font-semibold italic text-[#3C8C98]'>
                    collaboration
                  </span>
                  , and{' '}
                  <span className='font-semibold italic text-[#2cb385]'>
                    sustainable
                  </span>{' '}
                  contribution.
                </p>
              </div>

              {/* Mission - Green rounded box with reversed gradient */}
              <div className='rounded-2xl bg-gradient-to-r from-[#2B9494] to-[#45E384] p-6 sm:p-8'>
                <h3 className='mb-4 text-left lg:text-right text-2xl font-semibold text-white sm:text-3xl'>
                  Mission.
                </h3>
                <ul className='space-y-3 text-left text-sm leading-6 text-white sm:text-base sm:leading-7'>
                  <li className='flex items-start gap-3'>
                    <span className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white' />
                    <span>
                      To encourage and empower the capacity and potential of
                      members to become{' '}
                      <span className='font-semibold'>
                        adaptive, professional, and impactful individuals
                      </span>{' '}
                      through structured self-development programs relevant to
                      the needs of the oil and gas industry.
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white' />
                    <span>
                      To initiate and strengthen cross-sector collaborations
                      with industries, universities, and communities to expand
                      networks,{' '}
                      <span className='font-semibold'>
                        create real impact, and build national and international
                        alliances
                      </span>
                      .
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white' />
                    <span>
                      To build an innovative, collaborative, and supportive
                      ecosystem that fosters{' '}
                      <span className='font-semibold'>
                        professional growth, promotes co-creation, and diverse
                        perspectives exchange
                      </span>
                      .
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Section */}
      <section
        id='core-value'
        className='bg-white py-12 sm:py-16 lg:py-20'
        aria-labelledby='core-value-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Heading */}
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='core-value-heading'
              variant='right'
            >
              Core Value
            </SectionTitle>
          </div>

          {/* Mobile: 2-column grid */}
          <div className='grid grid-cols-2 gap-4 sm:hidden'>
            {[
              'Integrity',
              'Mobility (Adaptability)',
              'Transformative Impact',
              'Commit',
              'Professional Excellence',
              'Alliance',
            ].map((value, index) => (
              <div
                key={index}
                className={`rounded-full py-3 px-4 text-center text-sm font-normal transition-all ${index === 1 || index === 2 || index === 4
                  ? 'bg-[#3C8C98] text-white'
                  : 'border-2 border-[#3C8C98] bg-white text-[#3C8C98]'
                  }`}
              >
                {value}
              </div>
            ))}
          </div>

          {/* Desktop: 7 columns layout */}
          <div className='hidden sm:grid grid-cols-7 gap-4'>
            {/* Empty columns (2/7) */}
            <div className='col-span-2'></div>

            {/* Core Values content (5/7) */}
            <div className='col-span-5 flex flex-col justify-end'>
              <div className='flex flex-wrap justify-end gap-4 sm:gap-6'>
                {[
                  'Integrity',
                  'Mobility (Adaptability)',
                  'Transformative Impact',
                  'Commit',
                  'Professional Excellence',
                  'Alliance',
                ].map((value, index) => (
                  <div
                    key={index}
                    className={`rounded-full py-2 px-12 text-center text-md font-normal transition-all sm:text-lg ${index === 1 || index === 2 || index === 4
                      ? 'bg-[#3C8C98] text-white'
                      : 'border-2 border-[#3C8C98] bg-white text-[#3C8C98]'
                      }`}
                    style={{
                      width: 'fit-content',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Face of SPE Section */}
      <section
        id='face-of-spe'
        className='bg-gray-50 py-12 sm:py-16 lg:py-20 '
        aria-labelledby='face-of-spe-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Heading */}
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='face-of-spe-heading'
              variant='left'
            >
              Face of SPE UP SC
            </SectionTitle>
          </div>

          {/* Face Cards Layout */}
          <div className='flex flex-col items-center gap-8'>
            {/* Row 1: President and Vice President - Centered with gap */}
            <div className='flex items-center justify-center gap-8 '>
              <FaceCard
                name='Alfahmi Zikri'
                position='President of SPE UP SC 2025/2026'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Alfahmi Zikri - President of SPE UP SC 2025/2026'
              />
              <div className='mt-0 md:mt-16'>
                <FaceCard
                  name='Raditya Demas'
                  position='Vice President of SPE UP SC 2025/2026'
                  imageSrc='/about-us/face/radit.webp'
                  imageAlt='Raditya Demas - Vice President of SPE UP SC 2025/2026'
                />
              </div>
            </div>

            {/* Row 2: Department Members - Flex wrap with 4 per row */}
            <div className='flex flex-wrap items-start justify-center gap-8  w-full '>
              <FaceCard
                name='Fadhillah Fatin'
                position='Head of Finance and Business'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Fadhillah Fatin - Head of Finance and Business'
              />
              <FaceCard
                name='Reihan Alfaridh'
                position='Head of Secretary'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Reihan Alfaridh - Head of Secretary'
              />
              <FaceCard
                name='Vidya Leonita'
                position='Head of Quality Inspector Department'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Vidya Leonita - Head of Quality Inspector Department'
              />
              <FaceCard
                name='Diva Barbara'
                position='Director of External Affairs Department'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Diva Barbara - Director of External Affairs Department'
              />
              <FaceCard
                name='Aldi Septialdi'
                position='Director of Media Creative & Information Department'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Aldi Septialdi - Director of Media Creative & Information Department'
              />
              <FaceCard
                name='Aisyah Iffatusilmi'
                position='Director of Competition Department'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Aisyah Iffatusilmi - Director of Competition Department'
              />
              <FaceCard
                name='Puja Dian'
                position='Director of Education & Training Department'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Puja Dian - Director of Education & Training Department'
              />
              <FaceCard
                name='Tianno Revanoya'
                position='Director of Human Resource Development Department'
                imageSrc='/about-us/face/fahmi.webp'
                imageAlt='Tianno Revanoya - Director of Human Resource Development Department'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section
        id='partnership'
        className='bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-16 lg:py-20 scroll-mt-24'
        aria-labelledby='partnership-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Heading */}
          <div className='mb-8 sm:mb-12'>
            <SectionTitle
              id='partnership-heading'
              variant='center-gradient'
            >
              Partnership
            </SectionTitle>
          </div>

          {/* Content Grid */}
          <div className='grid gap-8 lg:grid-cols-2 lg:gap-12 items-start'>
            {/* Modern Contact Form (Left) */}
            <div className='relative'>
              {/* Background decoration */}
              <div className='absolute -inset-4 bg-gradient-to-r from-[#3C8C98]/10 to-[#45E384]/10 rounded-3xl blur-xl opacity-30'></div>

              <div className='relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8'>
                {formState.success ? (
                  <div className='text-center py-8'>
                    <CheckCircle className='mx-auto h-16 w-16 text-emerald-500' />
                    <h3 className='mt-4 text-xl font-semibold text-gray-900'>Request Submitted!</h3>
                    <p className='mt-2 text-gray-600'>
                      Thank you for your interest. Our team will contact you soon.
                    </p>
                    <button
                      onClick={() => setFormState({ loading: false, success: false, error: '' })}
                      className='mt-6 rounded-full bg-[#3C8C98] px-8 py-3 font-semibold text-white transition-all hover:bg-[#2d6b75]'
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <>
                    <div className='mb-6'>
                      <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
                        Let&apos;s Connect
                      </h3>
                      <p className='text-gray-600'>
                        Ready to collaborate? Send us a message and let&apos;s
                        create something amazing together.
                      </p>
                    </div>

                    {formState.error && (
                      <div className='mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700'>
                        <AlertCircle className='h-5 w-5' />
                        <span className='text-sm'>{formState.error}</span>
                      </div>
                    )}

                    <form onSubmit={handlePartnershipSubmit} className='space-y-6'>
                      {/* Name & Institution Row */}
                      <div className='grid gap-4 sm:grid-cols-2'>
                        <FormInput
                          id='name'
                          name='name'
                          type='text'
                          label='Full Name'
                          placeholder='John Doe'
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        <FormInput
                          id='institution'
                          name='institution'
                          type='text'
                          label='Institution'
                          placeholder='Your University'
                          required
                          value={formData.institution}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Email & Subject Row */}
                      <div className='grid gap-4 sm:grid-cols-2'>
                        <FormInput
                          id='email'
                          name='email'
                          type='email'
                          label='Email Address'
                          placeholder='john@example.com'
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <FormInput
                          id='subject'
                          name='subject'
                          type='text'
                          label='Subject'
                          placeholder='Partnership Inquiry'
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Message */}
                      <FormTextarea
                        id='message'
                        name='message'
                        label='Message'
                        placeholder='Tell us about your partnership ideas and how we can collaborate...'
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                      />

                      {/* File Upload */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-800 mb-2'>
                          Upload File{' '}
                          <span className='text-gray-500 font-normal'>(Optional)</span>
                        </label>
                        {selectedFile ? (
                          <div className='flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl'>
                            <FileText className='w-8 h-8 text-[#3C8C98]' />
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-gray-900 truncate'>{selectedFile.name}</p>
                              <p className='text-xs text-gray-500'>
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type='button'
                              onClick={removeFile}
                              className='p-1 hover:bg-gray-200 rounded-full transition-colors'
                            >
                              <X className='w-5 h-5 text-gray-500' />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor='file'
                            className='flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#3C8C98] hover:bg-[#3C8C98]/5 transition-all duration-300'
                          >
                            <Upload className='w-8 h-8 text-gray-400 mb-2' />
                            <p className='text-sm text-gray-600'>
                              <span className='font-medium text-[#3C8C98]'>Click to upload</span>{' '}
                              or drag and drop
                            </p>
                            <p className='text-xs text-gray-400 mt-1'>
                              PDF, DOC, DOCX, or Images up to 10MB
                            </p>
                          </label>
                        )}
                        <input
                          ref={fileInputRef}
                          type='file'
                          id='file'
                          name='file'
                          onChange={handleFileChange}
                          accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
                          className='hidden'
                        />
                      </div>

                      {/* NDA Checkbox */}
                      <div className='flex items-start gap-3'>
                        <div className='relative flex items-center'>
                          <input
                            type='checkbox'
                            id='nda'
                            name='nda'
                            checked={formData.nda}
                            onChange={handleInputChange}
                            className='h-5 w-5 rounded border-2 border-gray-300 text-[#3C8C98] focus:ring-[#3C8C98] focus:ring-offset-0'
                          />
                        </div>
                        <label
                          htmlFor='nda'
                          className='text-sm text-gray-600 leading-relaxed'
                        >
                          I want to protect my data with{' '}
                          <span className='font-medium text-[#3C8C98]'>
                            Non-Disclosure Agreement (NDA)
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className='pt-4'>
                        <button
                          type='submit'
                          disabled={formState.loading}
                          className='group relative w-full overflow-hidden rounded-full bg-[#3C8C98] px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <span className='relative z-10 flex items-center justify-center gap-2'>
                            {formState.loading ? (
                              <>
                                <Loader2 className='h-5 w-5 animate-spin' />
                                Sending...
                              </>
                            ) : (
                              'Send Partnership Request'
                            )}
                          </span>
                          <div className='absolute inset-0 bg-gradient-to-r from-[#2d6b75] to-[#3cb385] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Map (Right) */}
            <div className='relative h-full min-h-[600px] lg:min-h-[700px]'>
              {/* Background decoration */}
              <div className='absolute -inset-4 bg-gradient-to-l from-[#3C8C98]/10 to-[#45E384]/10 rounded-3xl blur-xl opacity-30'></div>

              <div className='relative h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.789164!3d-6.2285678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f13094c83677%3A0x1f4300031365732b!2sUniversitas%20Pertamina!5e0!3m2!1sen!2sid!4v1736789012345!5m2!1sen!2sid'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  className='absolute inset-0 rounded-2xl'
                  title='Universitas Pertamina Location'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Image Section */}
      <section className='relative w-full  '>
        <div className='relative  aspect-[9/16]] w-full  '>
          <Image
            src='/about-us/spet.webp'
            alt='SPE Team'
            fill
            className='object-cover'
            sizes='100vw'
            priority
          />
        </div>
      </section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AboutPageContent />
    </Suspense>
  );
}
