/** @format */

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

export default function FormTextarea({
  id,
  name,
  label,
  placeholder,
  rows = 4,
  required = false,
  className = '',
}: FormTextareaProps) {
  return (
    <div className={`group ${className}`}>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-gray-700 mb-2'
      >
        {label} {required && <span className='text-[#3C8C98]'>*</span>}
      </label>
      <div className='relative'>
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          className='w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-[#3C8C98] focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-400 resize-none'
          placeholder={placeholder}
        />
        <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#3C8C98]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>
      </div>
    </div>
  );
}