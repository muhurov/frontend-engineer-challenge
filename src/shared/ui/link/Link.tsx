import { cn } from '@/shared/lib';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

export type LinkProps = {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
} & NextLinkProps;

export const Link = ({
  className,
  disabled,
  children,
  ...other
}: LinkProps) => {
  return (
    <NextLink
      className={cn(
        'text-primary text-sm font-medium transition-all',
        disabled &&
          'pointer-events-none cursor-not-allowed underline font-[100] text-typography-tertiary',
        className,
      )}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      {...other}
    >
      {children}
    </NextLink>
  );
};
