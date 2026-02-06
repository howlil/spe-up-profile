/** @format */

import { ChangeEvent } from 'react';

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormTextarea({
  id,
  name,
  label,
  placeholder,
  rows = 4,
  required = false,
  className = '',
  value,
  onChange,
}: FormTextareaProps) {
  return (
    <div className={`group ${className}`}>
      <label
        htmlFor={id}
        className='block text-sm font-semibold text-gray-800 mb-2'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <div className='relative'>
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          value={value}
          onChange={onChange}
          className='w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:border-[#3C8C98] focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-400 resize-none'
          placeholder={placeholder}
        />
        <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#3C8C98]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>
      </div>
    </div>
  );
}