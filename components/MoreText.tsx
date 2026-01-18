/** @format */

interface MoreTextProps {
  content?: string;
  position?: 'left' | 'center' | 'right';
  className?: string;
}

export default function MoreText({
  content = 'and many more...',
  position = 'right',
  className = '',
}: MoreTextProps) {
  const positionClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mt-6 sm:mt-8 ${positionClasses[position]} ${className}`}>
      <p className='italic font-thin text-xl text-gray-600 sm:text-2xl lg:text-3xl'>
        {content}
      </p>
    </div>
  );
}