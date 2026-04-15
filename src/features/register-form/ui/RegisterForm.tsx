'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useCreateUserMutation, USER_API_CACHE_KEY } from '@/entities/user';
import { GraphQLErrorResponse } from '@/shared/api/types';
import { ROUTE_PATH } from '@/shared/config';
import { getValidationMessage } from '@/shared/lib';
import { Button, InputController } from '@/shared/ui';

import { DEFAULT_VALUES } from '../model/consts';
import { registerSchema } from '../model/schema';

export const RegisterForm = () => {
  const router = useRouter();

  const [createUser, { error, reset }] = useCreateUserMutation({
    fixedCacheKey: USER_API_CACHE_KEY,
  });

  const { handleSubmit, control, setError, clearErrors } = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(registerSchema),
  });

  const handleCreateUser = handleSubmit(async ({ email, password }) => {
    try {
      await createUser({ email, password }).unwrap();

      toast.success('Регистрация прошла успешно', { duration: 2000 });

      router.push(ROUTE_PATH.LOGIN);
    } catch (e) {
      toast.error('Ошибка регистрации', { duration: 2000 });
    }
  });

  useEffect(() => {
    const { field, message } = getValidationMessage(
      (error as GraphQLErrorResponse)?.response?.errors?.[0]?.message,
    );

    if (field) setError(field as keyof typeof DEFAULT_VALUES, { message });

    return () => {
      reset();
      clearErrors();
    };
  }, [error]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleCreateUser}>
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
      <InputController
        name="repeatPassword"
        control={control}
        label="Повторите пароль"
        id="repeatPassword"
      />
      <Button type="submit">Зарегистрироваться</Button>
    </form>
  );
};
