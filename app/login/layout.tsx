/** @format */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - SPE UP SC',
  description: 'Login to SPE Universitas Pertamina Student Chapter',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}