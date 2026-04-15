'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SESSION_API_CACHE_KEY } from '@/entities/session';
import { useRecoverPasswordMutation } from '@/entities/user';
import {
  OnSuccessProps,
  RecoverPasswordForm,
} from '@/features/recover-password-form';
import { ArrowLeft } from '@/shared/assets/icons';
import { ROUTE_PATH } from '@/shared/config';
import { Button, IconButton, Spinner, Typography } from '@/shared/ui';

export default function RecoverPasswordPage() {
  const router = useRouter();

  const [recoverData, setRecoverData] = useState<OnSuccessProps>();

  const [, { isLoading, isSuccess }] = useRecoverPasswordMutation({
    fixedCacheKey: SESSION_API_CACHE_KEY,
  });

  const handleBack = () => {
    router.replace(ROUTE_PATH.LOGIN);
  };

  const handleProceedResetPassword = () => {
    const { success, token, email } = recoverData ?? {};

    if (!success) return;

    router.replace(
      `${ROUTE_PATH.RESET_PASSWORD}?token=${token}&email=${email}`,
    );
  };

  const handleSuccess = (data: OnSuccessProps) => {
    setRecoverData(data);
  };

  if (isSuccess)
    return (
      <main className="flex flex-col gap-6 grow items-stretch justify-center p-[24px] md:p-[80px]">
        <Typography.Heading className="flex gap-2">
          Проверьте свою почту
        </Typography.Heading>
        <Typography.Paragraph size="md">
          Мы отправили на почту письмо с ссылкой для восстановления пароля
          (заработает, когда бэк включит письма, а пока кнопка имитирует переход
          по ссылке из письма)
        </Typography.Paragraph>
        <Button variant="secondary" onClick={handleProceedResetPassword}>
          Сбросить пароль
        </Button>
      </main>
    );

  return (
    <main className="flex flex-col gap-6 grow items-stretch justify-center p-[24px] md:p-[80px] relative">
      {isLoading && <Spinner />}
      <Typography.Heading className="flex gap-2">
        <IconButton icon={ArrowLeft} onClick={handleBack} /> Восстановление
        пароля
      </Typography.Heading>
      <Typography.Paragraph size="md">
        Укажите адрес почты, на который был зарегистрирован аккаунт
      </Typography.Paragraph>
      <RecoverPasswordForm onSuccess={handleSuccess} />
    </main>
  );
}
