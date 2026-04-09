import { ROUTE_PATH } from '@/shared/config';
import { Link, Typography } from '@/shared/ui';

export const getAuthFooterTitle = (pathname: string) => {
  switch (pathname) {
    case ROUTE_PATH.LOGIN:
      return (
        <Typography.Paragraph color="secondary" size="md">
          Еще не зарегистрированы?{' '}
          <Link href={ROUTE_PATH.REGISTER}>Регистрация</Link>
        </Typography.Paragraph>
      );
    case ROUTE_PATH.REGISTER:
      return (
        <Typography.Paragraph color="secondary" size="md">
          Уже есть аккаунт? <Link href={ROUTE_PATH.LOGIN}>Войти</Link>
        </Typography.Paragraph>
      );
    default:
      return null;
  }
};
