/** @format */

interface SectionTitleProps {
  children: React.ReactNode;
  id?: string;
  variant?: 'left' | 'right' | 'center' | 'center-gradient';
  italic?: boolean;
  lineThickness?: 'thin' | 'thick';
  className?: string;
}

export default function SectionTitle({
  children,
  id,
  variant = 'left',
  italic = false,
  lineThickness = 'thin',
  className = '',
}: SectionTitleProps) {
  const baseClasses = 'text-4xl font-normal text-[#3C8C98] sm:text-5xl lg:text-6xl';
  const italicClasses = italic ? 'font-[var(--font-playfair)] italic' : '';
  const titleClasses = `${baseClasses} ${italicClasses} ${className}`.trim();
  const lineClasses = lineThickness === 'thick' ? 'h-[6px]' : 'h-1';

  // Render berdasarkan variant
  switch (variant) {
    case 'left':
      return (
        <div className='flex items-center gap-4'>
          <h2 id={id} className={titleClasses}>
            {children}
          </h2>
          <div className={`${lineClasses} flex-1 bg-[#3C8C98]`} aria-hidden='true' />
        </div>
      );

    case 'right':
      return (
        <div className='flex items-center gap-4'>
          <div className={`${lineClasses} flex-1 bg-[#3C8C98]`} aria-hidden='true' />
          <h2 id={id} className={titleClasses}>
            {children}
          </h2>
        </div>
      );

    case 'center':
      return (
        <div className='flex items-center justify-center gap-4'>
          <div className={`${lineClasses} w-full max-w-[200px] bg-[#3C8C98] sm:max-w-[300px] lg:max-w-xs`} aria-hidden='true' />
          <h2 id={id} className={`${titleClasses} whitespace-nowrap`}>
            {children}
          </h2>
          <div className={`${lineClasses} w-full max-w-[200px] bg-[#3C8C98] sm:max-w-[300px] lg:max-w-xs`} aria-hidden='true' />
        </div>
      );

    case 'center-gradient':
      return (
        <div className='flex items-center justify-center gap-4'>
          <div className={`${lineClasses} flex-1 bg-gradient-to-r from-transparent to-[#3C8C98] max-w-xs`} />
          <h2 id={id} className={titleClasses}>
            {children}
          </h2>
          <div className={`${lineClasses} flex-1 bg-gradient-to-l from-transparent to-[#3C8C98] max-w-xs`} />
        </div>
      );

    default:
      return (
        <h2 id={id} className={titleClasses}>
          {children}
        </h2>
      );
  }
}