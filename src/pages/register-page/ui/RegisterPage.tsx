'use client';

import { useCreateUserMutation, USER_API_CACHE_KEY } from '@/entities/user';
import { RegisterForm } from '@/features/register-form';
import { ROUTE_PATH } from '@/shared/config';
import { Link, Spinner, Typography } from '@/shared/ui';

export default function RegisterPage() {
  const [, { isLoading }] = useCreateUserMutation({
    fixedCacheKey: USER_API_CACHE_KEY,
  });

  return (
    <main className="flex flex-col gap-6 grow items-stretch justify-center px-[80px] relative">
      {isLoading && <Spinner />}
      <Typography.Heading>Регистрация в системе</Typography.Heading>
      <RegisterForm />
      <Typography.Paragraph className="text-center">
        Зарегистрировавшись, пользователь принимает условия{' '}
        <Link className="text-[12px]/[1.4]" href={ROUTE_PATH.REGISTER} disabled>
          договора оферты
        </Link>{' '}
        и{' '}
        <Link className="text-[12px]/[1.4]" href={ROUTE_PATH.REGISTER} disabled>
          политики конфиденциальности
        </Link>
      </Typography.Paragraph>
    </main>
  );
}
