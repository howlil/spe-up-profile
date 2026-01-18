/** @format */

import Link from 'next/link';

interface PrimaryButtonProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PrimaryButton({
  href = '/event',
  children = 'Explore for More',
  className = '',
}: PrimaryButtonProps) {
  return (
    <div className={`mt-8 flex justify-end ${className}`}>
      <Link
        href={href}
        className='inline-flex items-center rounded-full border border-white bg-gradient-to-r from-[#3C8C98] to-[#52e8ff] px-8 py-3 text-base font-semibold italic text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg'
      >
        {children}
      </Link>
    </div>
  );
}

