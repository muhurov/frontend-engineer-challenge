import { LoginForm } from '@/features/login-form';
import { ROUTE_PATH } from '@/shared/config';
import { Link, Typography } from '@/shared/ui';

export const LoginPage = () => {
  return (
    <main className="flex flex-col gap-6 grow items-stretch justify-center px-[80px]">
      <Typography.Heading>Войти в систему</Typography.Heading>
      <LoginForm />
      <Link href={ROUTE_PATH.RECOVER_PASSWORD} className="self-center">
        Забыли пароль?
      </Link>
    </main>
  );
};
