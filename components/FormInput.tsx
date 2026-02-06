/** @format */

interface FormInputProps {
  id: string;
  name: string;
  type?: 'text' | 'email';
  label: string;
  placeholder: string;
  required?: boolean;
  className?: string;
}

export default function FormInput({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  required = false,
  className = '',
}: FormInputProps) {
  return (
    <div className={`group ${className}`}>
      <label
        htmlFor={id}
        className='block text-sm font-semibold text-gray-800 mb-2'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <div className='relative'>
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          className='w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:border-[#3C8C98] focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-400'
          placeholder={placeholder}
        />
        <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#3C8C98]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>
      </div>
    </div>
  );
}