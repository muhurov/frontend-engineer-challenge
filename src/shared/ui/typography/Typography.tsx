import { ElementType, ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type TypographyProps = {
  className?: string;
  Component?: ElementType;
  children: ReactNode;
};

export type TypographyParagraphProps = TypographyProps & {
  variant?: 'primary';
  color?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
};

export type TypographyHeadingProps = TypographyProps & {
  variant?: 'primary';
};

export const Typography = ({
  className,
  Component = 'p',
  children,
}: TypographyProps) => {
  return <Component className={className}>{children}</Component>;
};

Typography.Paragraph = ({
  variant = 'primary',
  color = 'primary',
  size = 'sm',
  className,
  ...other
}: TypographyParagraphProps) => {
  return (
    <Typography
      className={cn(
        'text-sm',
        variant === 'primary' && 'font-normal',
        color === 'primary' && 'text-typography-tertiary',
        color === 'secondary' && 'text-typography-secondary',
        size === 'sm' && 'text-[12px]/[1.4]',
        className,
      )}
      {...other}
    />
  );
};

Typography.Heading = ({
  variant = 'primary',
  className,
  ...other
}: TypographyHeadingProps) => {
  return (
    <Typography
      Component="h1"
      className={cn(
        variant === 'primary' && 'text-[32px]/[1.2] font-medium',
        className,
      )}
      {...other}
    />
  );
};
