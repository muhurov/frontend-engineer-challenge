import { ElementType, ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type TypographyProps = {
  className?: string;
  Component?: ElementType;
  children: ReactNode;
};

export type TypographyParagraphProps = TypographyProps & {
  variant?: 'normal';
  size?: 'sm';
};

export type TypographyHeadingProps = TypographyProps & {
  variant?: 'normal';
};

export const Typography = ({
  className,
  Component = 'p',
  children,
}: TypographyProps) => {
  return <Component className={className}>{children}</Component>;
};

Typography.Paragraph = ({
  variant = 'normal',
  size = 'sm',
  className,
  ...other
}: TypographyParagraphProps) => {
  return (
    <Typography
      className={cn(
        'text-typography-tertiary',
        variant === 'normal' && 'font-normal',
        size === 'sm' && 'text-sm',
        className,
      )}
      {...other}
    />
  );
};

Typography.Heading = ({
  variant = 'normal',
  className,
  ...other
}: TypographyHeadingProps) => {
  return (
    <Typography
      Component="h1"
      className={cn(
        variant === 'normal' && 'text-[32px]/[1.2] font-medium',
        className,
      )}
      {...other}
    />
  );
};
