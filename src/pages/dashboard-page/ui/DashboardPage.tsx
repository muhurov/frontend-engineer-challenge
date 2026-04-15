'use client';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { clearSession, sessionApi } from '@/entities/session';
import { Button, Typography } from '@/shared/ui';

export const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const {
    data: { me },
  } = useAppSelector(sessionApi.endpoints.getMe.select(undefined));

  const handleLogout = () => {
    dispatch(clearSession());
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 m-auto">
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
};
