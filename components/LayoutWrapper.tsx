/** @format */

'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin');

  // Admin pages use their own layout
  if (isAdminPage) {
    return children;
  }

  // Login page has no navbar/footer
  if (isLoginPage) {
    return (
      <main id='main-content' role='main'>
        {children}
      </main>
    );
  }

  return (
    <>
      <a
        href='#main-content'
        className='skip-link'
      >
        Skip to main content
      </a>
      <Navbar />
      <main
        id='main-content'
        role='main'
      >
        {children}
      </main>
      <Footer />
    </>
  );
}