/** @format */

import type {Metadata} from 'next';
import {Geist, Geist_Mono, Playfair_Display} from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['italic', 'normal'],
});

export const metadata: Metadata = {
  title: 'SPE Java - Students, Young, Energy',
  description:
    'Society of Petroleum Engineers Java Section - Students, Young, Energy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
