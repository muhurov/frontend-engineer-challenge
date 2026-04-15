'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { clearSession, selectSession, useGetMeQuery } from '@/entities/session';
import { ROUTE_PATH } from '@/shared/config/routes';
import { Spinner, Typography } from '@/shared/ui';

interface AuthProps {
  children: React.ReactNode;
}

export const Auth = ({ children }: AuthProps) => {
  const dispatch = useAppDispatch();
  const { isAuth, isHydrated } = useAppSelector(selectSession);
  const router = useRouter();

  const { isLoading, isError, error } = useGetMeQuery(undefined, {
    skip: !isAuth || !isHydrated,
  });

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuth) {
      router.replace(ROUTE_PATH.LOGIN);
      return;
    }

    if (isError) {
      const errorStatus = (error as any)?.status;
      const isUnauthorized =
        errorStatus === 401 ||
        (error as any)?.message?.includes('Unauthorized');

      if (isUnauthorized) {
        dispatch(clearSession());

        router.replace(ROUTE_PATH.LOGIN);
      }
    }
  }, [isAuth, isHydrated, isError, error, router, dispatch]);

  if (!isHydrated || (isAuth && isLoading)) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  }

  if ((error as any)?.status === 'FETCH_ERROR')
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <Typography.Heading>
          Сервер не доступен, попробуйте обновить страницу позже
        </Typography.Heading>
      </div>
    );

  return isAuth && !isError ? <>{children}</> : null;
};
