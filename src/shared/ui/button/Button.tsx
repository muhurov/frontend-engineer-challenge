import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...other }: ButtonProps) => {
  return (
    <button
      className={cn(
        'w-full h-[48px] bg-[#31a0f2] text-white rounded-[8px] font-medium transition-opacity hover:opacity-90 active:scale-[0.98]',
        className,
      )}
      {...other}
    >
      {children}
    </button>
  );
};
