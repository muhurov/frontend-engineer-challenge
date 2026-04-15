import { ComponentPropsWithRef, InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

export type InputProps = ComponentPropsWithRef<'input'> & {
  label: string;
  className?: string;
  id: string;
  type?: 'email' | 'input';
  name: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  ref,
  label,
  className,
  id,
  type = 'input',
  name,
  error,
  value,
  ...other
}: InputProps) => {
  return (
    <div className="relative w-full pt-4">
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder=" "
        className={cn(
          'peer w-full border-b bg-transparent py-2 outline-none transition-colors',
          error ? 'border-red-500' : 'border-gray-300 focus:border-[#31a0f2]',
          className,
        )}
        value={value}
        {...other}
      />
      <label
        htmlFor="email"
        className={cn(
          'absolute left-0 top-5 origin-[0] -translate-y-6 scale-75 text-[15px]/1.6 duration-300 pointer-events-none',
          'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75',
          error ? 'text-red-500' : 'text-placeholder peer-focus:text-[#31a0f2]',
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
    </div>
  );
};
