/** @format */

'use client';

import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Image from 'next/image';

type NavigationItem = {
  href: string;
  label: string;
  submenu?: Array<{href: string; label: string}>;
};

const navigationItems: NavigationItem[] = [
  {href: '/', label: 'Home'},
  {
    href: '/about',
    label: 'About Us',
    submenu: [
      {href: '/about/achievement', label: 'Achievement'},
      {href: '/about/vision-mission', label: 'Vision & Mission'},
      {href: '/about/core-value', label: 'Core Value'},
      {href: '/about/face-of-spe', label: 'Face of SPE'},
      {href: '/about/partnership', label: 'Partnership'},
    ],
  },
  {href: '/event', label: 'Event'},
  {href: '/membership', label: 'Membership'},
  {href: '/alumnae', label: 'Alumnae'},
  {href: '/protect', label: 'PROTECT'},
  {href: '/spe-java', label: 'SPE Java'},
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Toggle dropdown
  const toggleDropdown = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close menu when pathname changes (handles browser back/forward navigation)
  // Using ref to track previous pathname to avoid unnecessary state updates
  useLayoutEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // Close dropdown when pathname changes
    setOpenDropdown(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMobileMenu();
    }
  };

  return (
    <nav
      className='sticky top-0 z-50 w-full bg-[#1a1a1a] border-b border-[#3C8C98]'
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center rounded-lg px-3 py-2 transition-colors'
            aria-label='SPE Java - Go to homepage'
          >
            <Image
              src='/logo.webp'
              alt='SPE Java - Students, Young, Energy'
              width={150}
              height={50}
              className='h-auto max-h-12 w-auto object-contain sm:max-h-14'
              priority
            />
          </Link>

          <div className='flex items-center gap-4'>
            {/* Desktop Navigation */}
            <div
              ref={dropdownRef}
              className='hidden md:flex md:items-center md:space-x-1'
            >
              {navigationItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  item.submenu?.some((sub) => pathname === sub.href);
                const isDropdownOpen = openDropdown === item.href;

                if (item.submenu) {
                  return (
                    <div
                      key={item.href}
                      className='relative'
                      onMouseEnter={() => setOpenDropdown(item.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link
                        href={item.href}
                        className='group relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-all'
                        aria-current={isActive ? 'page' : undefined}
                        aria-haspopup='true'
                        aria-expanded={isDropdownOpen}
                        onFocus={() => setOpenDropdown(item.href)}
                      >
                        <span
                          className={`transition-all ${
                            isActive || isDropdownOpen
                              ? 'bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] bg-clip-text text-transparent'
                              : 'text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                        {/* Chevron icon */}
                        <svg
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isDropdownOpen ? 'rotate-180' : ''
                          } ${
                            isActive || isDropdownOpen
                              ? 'text-[#3C8C98]'
                              : 'text-white'
                          }`}
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                        {/* Line span untuk hover dan aktif */}
                        <span
                          className={`absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] transition-all duration-300 ${
                            isActive || isDropdownOpen
                              ? 'w-8 opacity-100'
                              : 'group-hover:w-8 group-hover:opacity-100 opacity-0'
                          }`}
                          aria-hidden='true'
                        />
                      </Link>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div
                          className='absolute left-0 top-full mt-1 min-w-[200px] rounded-md bg-[#1a1a1a] border border-[#2a2a2a] shadow-lg py-2 z-50 transform transition-all duration-200 ease-out opacity-100 translate-y-0'
                          role='menu'
                        >
                          {item.submenu.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                role='menuitem'
                                className={`group relative block px-4 py-2 text-sm font-medium transition-all ${
                                  isSubActive
                                    ? 'bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] bg-clip-text text-transparent bg-[#2a2a2a]'
                                    : 'text-white hover:bg-[#2a2a2a] hover:text-[#3C8C98]'
                                }`}
                                aria-current={isSubActive ? 'page' : undefined}
                              >
                                <span className='relative z-10'>
                                  {subItem.label}
                                </span>
                                {/* Line span untuk hover dan aktif */}
                                <span
                                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] transition-all duration-300 ${
                                    isSubActive
                                      ? 'w-full opacity-100'
                                      : 'group-hover:w-full group-hover:opacity-100 opacity-0'
                                  }`}
                                  aria-hidden='true'
                                />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='group relative px-4 py-2 text-sm font-medium rounded-md transition-all'
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span
                      className={`transition-all ${
                        isActive
                          ? 'bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] bg-clip-text text-transparent'
                          : 'text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    {/* Line span untuk hover dan aktif */}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] transition-all duration-300 ${
                        isActive
                          ? 'w-8 opacity-100'
                          : 'group-hover:w-8 group-hover:opacity-100 opacity-0'
                      }`}
                      aria-hidden='true'
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              type='button'
              className='md:hidden rounded-md p-2 text-white transition-colors hover:bg-[#2a2a2a]'
              aria-expanded={isMobileMenuOpen}
              aria-controls='mobile-menu'
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMobileMenu}
              onKeyDown={handleKeyDown}
            >
              <span className='sr-only'>
                {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {isMobileMenuOpen ? (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          id='mobile-menu'
          className='md:hidden border-t border-[#2a2a2a] bg-[#1a1a1a]'
          role='menu'
        >
          <div className='space-y-1 px-2 pb-3 pt-2'>
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href ||
                item.submenu?.some((sub) => pathname === sub.href);
              const isDropdownOpen = openDropdown === item.href;

              if (item.submenu) {
                return (
                  <div
                    key={item.href}
                    className='space-y-1'
                  >
                    <div className='group relative flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium transition-all'>
                      <Link
                        href={item.href}
                        className='flex-1 text-left'
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(item.href);
                        }}
                      >
                        <span
                          className={`transition-all ${
                            isActive || isDropdownOpen
                              ? 'bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] bg-clip-text text-transparent'
                              : 'text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                      {/* Chevron icon button */}
                      <button
                        type='button'
                        onClick={() => toggleDropdown(item.href)}
                        className='ml-2 p-1 transition-transform duration-300'
                        aria-expanded={isDropdownOpen}
                        aria-label={
                          isDropdownOpen ? 'Close submenu' : 'Open submenu'
                        }
                      >
                        <svg
                          className={`h-5 w-5 transition-transform duration-300 ${
                            isDropdownOpen ? 'rotate-180' : ''
                          } ${
                            isActive || isDropdownOpen
                              ? 'text-[#3C8C98]'
                              : 'text-white'
                          }`}
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Dropdown Submenu */}
                    {isDropdownOpen && (
                      <div className='ml-4 space-y-1 border-l-2 border-[#2a2a2a] pl-4'>
                        {item.submenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              role='menuitem'
                              onClick={closeMobileMenu}
                              className='group relative block rounded-md px-3 py-2 text-sm font-medium transition-all'
                              aria-current={isSubActive ? 'page' : undefined}
                            >
                              <span
                                className={`transition-all ${
                                  isSubActive
                                    ? 'bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] bg-clip-text text-transparent'
                                    : 'text-gray-300'
                                }`}
                              >
                                {subItem.label}
                              </span>
                              {/* Line span untuk hover dan aktif */}
                              <span
                                className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] transition-all duration-300 ${
                                  isSubActive
                                    ? 'w-full opacity-100'
                                    : 'group-hover:w-full group-hover:opacity-100 opacity-0'
                                }`}
                                aria-hidden='true'
                              />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role='menuitem'
                  onClick={closeMobileMenu}
                  className='group relative block rounded-md px-3 py-2 text-base font-medium transition-all'
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className={`transition-all ${
                      isActive
                        ? 'bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] bg-clip-text text-transparent'
                        : 'text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                  {/* Line span untuk hover dan aktif */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-t from-[#3C8C98] to-[#52e8ff] transition-all duration-300 ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'group-hover:w-full group-hover:opacity-100 opacity-0'
                    }`}
                    aria-hidden='true'
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
