'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { createReduxStore, AppStore } from '@/app/store/config';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = createReduxStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
