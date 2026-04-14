'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SESSION_API_CACHE_KEY, useLoginMutation } from '@/entities/session';
import { ROUTE_PATH } from '@/shared/config';
import { Button, InputController } from '@/shared/ui';

import { DEFAULT_VALUES } from '../model/consts';
import { loginSchema } from '../model/schema';

export const LoginForm = () => {
  const router = useRouter();

  const [login, { error }] = useLoginMutation({
    fixedCacheKey: SESSION_API_CACHE_KEY,
  });

  const { handleSubmit, control, setError, clearErrors } = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = handleSubmit(async ({ email, password }) => {
    try {
      await login({ email, password }).unwrap();

      toast.success('Логин прошел успешно', { duration: 2000 });

      router.push(ROUTE_PATH.DASHBOARD);
    } catch (e) {
      toast.error('Ошибка логина', { duration: 2000 });
    }
  });

  useEffect(() => {
    if (error) setError('password', { message: 'Введены неверные данные' });

    return () => {
      clearErrors();
    };
  }, [error]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
      <InputController
        name="email"
        control={control}
        label="Введите e-mail"
        id="email"
        type="input"
      />
      <InputController
        name="password"
        control={control}
        label="Введите пароль"
        id="password"
      />
      <Button type="submit">Войти</Button>
    </form>
  );
};
