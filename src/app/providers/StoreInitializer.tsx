'use client';

import { useEffect } from 'react';

import { sessionSlice } from '@/entities/session';

import { useAppDispatch } from '../store/hooks';

export default function StoreInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(sessionSlice.actions.hydrateSession());
  }, [dispatch]);

  return <>{children}</>;
}
