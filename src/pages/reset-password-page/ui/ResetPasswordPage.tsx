'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { SESSION_API_CACHE_KEY } from '@/entities/session';
import { useResetPasswordMutation } from '@/entities/user';
import {
  ResetPasswordForm,
  getIsValidationError,
} from '@/features/reset-password-form';
import { GraphQLErrorResponse } from '@/shared/api';
import { ROUTE_PATH } from '@/shared/config';
import { Button, Spinner, Typography } from '@/shared/ui';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [, { isLoading, isSuccess, error, reset }] = useResetPasswordMutation({
    fixedCacheKey: SESSION_API_CACHE_KEY,
  });

  const token = searchParams?.get('token');
  const email = searchParams?.get('email');
  const isLinkInvalid = !token || !email;
  const isError = error && !getIsValidationError(error as GraphQLErrorResponse);

  const handleBack = () => {
    router.replace(ROUTE_PATH.LOGIN);
  };

  const handleRetry = () => {
    reset();
    router.refresh();
  };

  useEffect(
    () => () => {
      reset();
    },
    [],
  );

  if (isLinkInvalid)
    return (
      <main className="flex flex-col gap-6 grow items-stretch justify-center p-[80px]">
        <Typography.Heading className="flex gap-2">
          Ссылка для восстановления пароля не верна
        </Typography.Heading>
        <Button variant="secondary" onClick={handleBack}>
          Назад в авторизацию
        </Button>
      </main>
    );

  if (isSuccess)
    return (
      <main className="flex flex-col gap-6 grow items-stretch justify-center p-[80px]">
        <Typography.Heading className="flex gap-2">
          Пароль был восстановлен
        </Typography.Heading>
        <Typography.Paragraph size="md">
          Перейдите на страницу авторизации, чтобы войти в систему с новым
          паролем
        </Typography.Paragraph>
        <Button variant="secondary" onClick={handleBack}>
          Назад в авторизацию
        </Button>
      </main>
    );

  if (isError)
    return (
      <main className="flex flex-col gap-6 grow items-stretch justify-center p-[80px]">
        <Typography.Heading className="flex gap-2">
          Пароль не был восстановлен
        </Typography.Heading>
        <Typography.Paragraph size="md">
          По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте ещё
          раз через некоторое время.
        </Typography.Paragraph>
        <Button variant="secondary" onClick={handleBack}>
          Назад в авторизацию
        </Button>
        <Button variant="tertiary" onClick={handleRetry}>
          Попробовать заново
        </Button>
      </main>
    );

  return (
    <main className="flex flex-col gap-6 grow items-stretch justify-center p-[80px] relative">
      {isLoading && <Spinner />}
      <Typography.Heading className="flex gap-2">
        Задайте пароль
      </Typography.Heading>
      <Typography.Paragraph size="md">
        Напишите новый пароль, который будете использовать для входа
      </Typography.Paragraph>
      <ResetPasswordForm token={token} email={email} />
    </main>
  );
}
