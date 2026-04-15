'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SESSION_API_CACHE_KEY } from '@/entities/session';
import { useResetPasswordMutation } from '@/entities/user';
import { GraphQLErrorResponse } from '@/shared/api';
import { getValidationMessage } from '@/shared/lib';
import { Button, InputController } from '@/shared/ui';

import { DEFAULT_VALUES } from '../model/consts';
import { resetPasswordSchema } from '../model/schema';

export type ResetPasswordFormProps = {
  email: string;
  token: string;
};

export const ResetPasswordForm = ({ email, token }: ResetPasswordFormProps) => {
  const [resetPassword, { error }] = useResetPasswordMutation({
    fixedCacheKey: SESSION_API_CACHE_KEY,
  });

  const { control, handleSubmit, setError } = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleResetPassword = handleSubmit(async (data) => {
    try {
      await resetPassword({ password: data.password, email, token }).unwrap();

      toast.success('Успешно', { duration: 2000 });
    } catch (e) {
      toast.error('Ошибка', { duration: 2000 });
    }
  });

  useEffect(() => {
    const { message } = getValidationMessage(
      (error as GraphQLErrorResponse)?.response?.errors?.[0]?.message,
    );

    setError('password', { message });
  }, [error]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleResetPassword}>
      <InputController
        control={control}
        name="password"
        id="password"
        label="Введите пароль"
      />
      <InputController
        control={control}
        name="repeatPassword"
        id="repeatPassword"
        label="Повторите пароль"
      />
      <Button type="submit">Изменить пароль</Button>
    </form>
  );
};
