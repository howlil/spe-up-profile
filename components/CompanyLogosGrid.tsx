/** @format */

import CompanyLogo from './CompanyLogo';

interface CompanyData {
  src: string;
  alt: string;
}

interface CompanyLogosGridProps {
  companies?: CompanyData[];
  className?: string;
}

const defaultCompanies: CompanyData[] = [
  {
    src: '/home/pwc.webp',
    alt: 'PwC - PricewaterhouseCoopers',
  },
  {
    src: '/home/pertaminia.webp',
    alt: 'Pertamina',
  },
  {
    src: '/home/slb.webp',
    alt: 'SLB - Schlumberger',
  },
  {
    src: '/home/rfd.webp',
    alt: 'RFD',
  },
  {
    src: '/home/hcml.webp',
    alt: 'HCML',
  },
  {
    src: '/home/bp.webp',
    alt: 'BP - British Petroleum',
  },
  {
    src: '/home/petrocina.webp',
    alt: 'PetroChina',
  },
  {
    src: '/home/aiv.webp',
    alt: 'AIV',
  },
];

export default function CompanyLogosGrid({
  companies = defaultCompanies,
  className = '',
}: CompanyLogosGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4 lg:grid-cols-8 lg:gap-8 ${className}`}>
      {companies.map((company, index) => (
        <CompanyLogo
          key={index}
          src={company.src}
          alt={company.alt}
        />
      ))}
    </div>
  );
}