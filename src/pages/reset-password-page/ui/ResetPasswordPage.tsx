'use client';

import { useRouter } from 'next/navigation';

import { ResetPasswordForm } from '@/features/reset-password-form';
import { ROUTE_PATH } from '@/shared/config';
import { Button, Typography } from '@/shared/ui';

export const ResetPasswordPage = () => {
  const router = useRouter();

  const isRestorationSuccess = false;
  const isRestorationFailed = true;

  const handleBack = () => {
    router.replace(ROUTE_PATH.LOGIN);
  };

  if (isRestorationSuccess)
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

  if (isRestorationFailed)
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
        <Button variant="tertiary">Попробовать заново</Button>
      </main>
    );

  return (
    <main className="flex flex-col gap-6 grow items-stretch justify-center p-[80px]">
      <Typography.Heading className="flex gap-2">
        Задайте пароль
      </Typography.Heading>
      <Typography.Paragraph size="md">
        Напишите новый пароль, который будете использовать для входа
      </Typography.Paragraph>
      <ResetPasswordForm />
    </main>
  );
};
