'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import { ROUTE_PATH } from '@/shared/config/routes';
import { Spinner } from '@/shared/ui';

export const Guest = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, isHydrated } = useAppSelector((state) => state.session);
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && isAuth) {
      router.replace(ROUTE_PATH.DASHBOARD);
    }
  }, [isAuth, isHydrated, router]);

  if (!isHydrated)
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );

  return !isAuth ? <>{children}</> : null;
};
