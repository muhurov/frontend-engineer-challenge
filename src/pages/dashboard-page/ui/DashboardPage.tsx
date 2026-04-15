'use client';

import toast from 'react-hot-toast';

import { useAppSelector } from '@/app/store/hooks';
import { sessionApi, useLogoutMutation } from '@/entities/session';
import { getTokens } from '@/shared/lib';
import { Button, Spinner, Typography } from '@/shared/ui';

export default function DashboardPage() {
  const [logout, { isLoading }] = useLogoutMutation();
  const {
    data: { me },
  } = useAppSelector(sessionApi.endpoints.getMe.select(undefined));

  const handleLogout = async () => {
    try {
      logout({ refreshToken: getTokens().refreshToken }).unwrap();

      toast.success('Логаут прошел успешно');
    } catch (e) {
      toast.error('Ошибка логаута');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 m-auto relative">
      {isLoading && <Spinner />}
      <Typography.Heading>Dashboard</Typography.Heading>
      <div className="flex flex-col gap-2">
        <Typography.Heading variant="secondary" className="self-center">
          Logged in user:
        </Typography.Heading>
        <Typography.Paragraph>email: {me.email}</Typography.Paragraph>
        <Typography.Paragraph>id: {me.id}</Typography.Paragraph>
        <Typography.Paragraph>status: {me.status}</Typography.Paragraph>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </main>
  );
}
