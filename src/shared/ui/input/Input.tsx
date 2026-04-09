import { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

export type InputProps = {
  label: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, className, ...other }: InputProps) => {
  return (
    <div className="relative w-full pt-4">
      <input
        type="email"
        id="email"
        name="email"
        placeholder=" "
        className={cn(
          'peer w-full border-b border-gray-300 bg-transparent py-2 outline-none transition-colors focus:border-[#31a0f2]',
          className,
        )}
        {...other}
      />
      <label
        htmlFor="email"
        className="absolute left-0 top-5 origin-[0] -translate-y-6 scale-75 text-sm text-typography-tertiary duration-300 
               peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#31a0f2]"
      >
        {label}
      </label>
    </div>
  );
};
