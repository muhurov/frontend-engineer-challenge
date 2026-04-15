import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className,
  variant = 'primary',
  children,
  ...other
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'w-full h-[48px] text-white rounded-[8px] font-medium transition-opacity hover:opacity-90 active:scale-[0.98]',
        variant === 'primary' && 'bg-button-primary',
        variant === 'secondary' && 'bg-button-secondary text-font-accent',
        variant === 'tertiary' && 'bg-button-tertiary text-font-accent',
        className,
      )}
      {...other}
    >
      {children}
    </button>
  );
};
