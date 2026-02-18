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
    src: '/home/company-pwc.webp',
    alt: 'PwC - PricewaterhouseCoopers',
  },
  {
    src: '/home/company-pertamina.webp',
    alt: 'Pertamina',
  },
  {
    src: '/home/company-slb.webp',
    alt: 'SLB - Schlumberger',
  },
  {
    src: '/home/company-rfd.webp',
    alt: 'RFD',
  },
  {
    src: '/home/company-hcml.webp',
    alt: 'HCML',
  },
  {
    src: '/home/company-bp.webp',
    alt: 'BP - British Petroleum',
  },
  {
    src: '/home/company-petrochina.webp',
    alt: 'PetroChina',
  },
  {
    src: '/home/company-aiv.webp',
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