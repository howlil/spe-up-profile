'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Side - Login Form */}
      <div className='flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 bg-white'>
        <div className='w-full max-w-md mx-auto'>
          {/* Back to Home Link */}
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-gray-600 hover:text-[#3C8C98] transition-colors mb-8 group'
          >
            <svg
              className='w-5 h-5 transition-transform group-hover:-translate-x-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to Home
          </Link>

          {/* Login Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Login</h1>
            <p className='text-gray-600'>
              Enter your email and password to log in!
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Error Message */}
            {error && (
              <div className='p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm'>
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email Address <span className='text-red-500'>*</span>
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Enter your email'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C98] focus:border-transparent transition-colors'
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Password <span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Enter your password'
                  className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C98] focus:border-transparent transition-colors'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                >
                  {showPassword ? (
                    <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                    </svg>
                  ) : (
                    <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className='text-right'>
              <button
                type='button'
                className='text-sm text-[#3C8C98] hover:text-[#2cb385] transition-colors'
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-gradient-to-r from-[#3C8C98] to-[#52e8ff] text-white py-3 px-4 rounded-lg font-medium hover:from-[#2d6b75] hover:to-[#3C8C98] focus:outline-none focus:ring-2 focus:ring-[#3C8C98] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
            >
              {isLoading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin'></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className='mt-8 text-center'>
            <p className='text-gray-600'>
              Don&apos;t have an account?{' '}
              <button className='text-[#3C8C98] hover:text-[#2cb385] font-medium transition-colors'>
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - SPE Branding */}
      <div className='hidden lg:flex flex-1 relative bg-gradient-to-br from-[#3C8C98] to-[#1a4c52] overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-20 w-32 h-32 rounded-full border-2 border-white'></div>
          <div className='absolute top-40 right-32 w-20 h-20 rounded-full border border-white'></div>
          <div className='absolute bottom-32 left-16 w-24 h-24 rounded-full border-2 border-white'></div>
          <div className='absolute bottom-20 right-20 w-16 h-16 rounded-full border border-white'></div>
        </div>

        {/* Main Content */}
        <div className='relative z-10 flex flex-col items-center justify-center p-12 text-center text-white'>
          {/* SPE Logo */}
          <div className='mb-8'>
            <Image
              src='/logo.webp'
              alt='SPE UP SC'
              width={200}
              height={80}
              className='object-contain drop-shadow-lg'
            />
          </div>

          {/* Welcome Text */}
          <div className='space-y-6 max-w-md'>
            <h2 className='text-4xl font-bold'>Welcome Back!</h2>
            <p className='text-lg text-white/90 leading-relaxed'>
              Access your SPE Universitas Pertamina Student Chapter dashboard and continue your journey in petroleum engineering excellence.
            </p>

            {/* Key Features */}
            <div className='space-y-3 mt-8'>
              <div className='flex items-center gap-3 text-left'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span className='text-sm'>Manage Events & Activities</span>
              </div>
              <div className='flex items-center gap-3 text-left'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span className='text-sm'>Access Member Resources</span>
              </div>
              <div className='flex items-center gap-3 text-left'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span className='text-sm'>Connect with Alumni Network</span>
              </div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className='absolute bottom-12 left-1/2 -translate-x-1/2'>
            <p className='text-sm text-white/80 font-light'>
              Solutions. People. Energy.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32'></div>
        <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24'></div>
      </div>
    </div>
  );
}