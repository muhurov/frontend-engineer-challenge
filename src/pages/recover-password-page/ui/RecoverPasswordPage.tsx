'use client';

import { useRouter } from 'next/navigation';

import { RecoverPasswordForm } from '@/features/recover-password-form';
import { ArrowLeft } from '@/shared/assets/icons';
import { ROUTE_PATH } from '@/shared/config';
import { Button, IconButton, Typography } from '@/shared/ui';

export const RecoverPasswordPage = () => {
  const navigate = useRouter();
  const isEmailSent = true;

  const handleBack = () => {
    navigate.replace(ROUTE_PATH.LOGIN);
  };

  if (isEmailSent)
    return (
      <main className="flex flex-col gap-6 grow items-stretch justify-center p-[80px]">
        <Typography.Heading className="flex gap-2">
          Проверьте свою почту
        </Typography.Heading>
        <Typography.Paragraph size="md">
          Мы отправили на почту письмо с ссылкой для восстановления пароля
        </Typography.Paragraph>
        <Button variant="secondary" onClick={handleBack}>
          Назад в авторизацию
        </Button>
      </main>
    );

  return (
    <main className="flex flex-col gap-6 grow items-stretch justify-center p-[80px]">
      <Typography.Heading className="flex gap-2">
        <IconButton icon={ArrowLeft} onClick={handleBack} /> Восстановление
        пароля
      </Typography.Heading>
      <Typography.Paragraph size="md">
        Укажите адрес почты, на который был зарегистрирован аккаунт
      </Typography.Paragraph>
      <RecoverPasswordForm onBack={handleBack} />
    </main>
  );
};
