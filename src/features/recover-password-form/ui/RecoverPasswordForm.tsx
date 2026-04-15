'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SESSION_API_CACHE_KEY } from '@/entities/session';
import { useRecoverPasswordMutation } from '@/entities/user';
import { Button, InputController } from '@/shared/ui';

import { DEFAULT_VALUES } from '../model/consts';
import { recoverPasswordSchema } from '../model/schema';

export type OnSuccessProps = {
  email: string;
  token: string;
  success: string;
};

export type RecoverPasswordFormProps = {
  onSuccess: (props: OnSuccessProps) => void;
};

export const RecoverPasswordForm = ({
  onSuccess,
}: RecoverPasswordFormProps) => {
  const [recoverPassword, { error }] = useRecoverPasswordMutation({
    fixedCacheKey: SESSION_API_CACHE_KEY,
  });

  const { control, handleSubmit, setError } = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(recoverPasswordSchema),
  });

  const handleRecoverPassword = handleSubmit(async (data) => {
    try {
      const { requestPasswordReset: { success, token } = {} } =
        await recoverPassword(data).unwrap();

      onSuccess({ email: data.email, success, token });
      toast.success('Успешно');
    } catch (e) {
      toast.error('Ошибка');
    }
  });

  useEffect(() => {
    const errorMessage = (error as any)?.response?.errors?.[0]?.message;

    if (errorMessage) setError('email', { message: errorMessage });
  }, [error]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleRecoverPassword}>
      <InputController
        control={control}
        id="email"
        name="email"
        type="email"
        label="Введите e-mail"
      />
      <Button type="submit" variant="secondary">
        Восстановить пароль
      </Button>
    </form>
  );
};
