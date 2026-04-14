'use client';

import { SESSION_API_CACHE_KEY, useLoginMutation } from '@/entities/session';
import { LoginForm } from '@/features/login-form';
import { ROUTE_PATH } from '@/shared/config';
import { Link, Spinner, Typography } from '@/shared/ui';

export const LoginPage = () => {
  const [, { isLoading }] = useLoginMutation({
    fixedCacheKey: SESSION_API_CACHE_KEY,
  });

  return (
    <main className="flex flex-col gap-6 grow items-stretch justify-center px-[80px] relative">
      {isLoading && <Spinner />}
      <Typography.Heading>Войти в систему</Typography.Heading>
      <LoginForm />
      <Link href={ROUTE_PATH.RECOVER_PASSWORD} className="self-center">
        Забыли пароль?
      </Link>
    </main>
  );
};
