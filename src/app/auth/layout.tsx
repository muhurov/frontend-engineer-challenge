'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

import { getAuthFooterTitle } from '@/entities/auth/lib';
import { ROUTE_PATH } from '@/shared/config';
import { Guest } from '@/features/guest';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hasFooter =
    ROUTE_PATH.LOGIN === pathname || ROUTE_PATH.REGISTER === pathname;

  return (
    <Guest>
      <main className="flex min-h-screen">
        <section className="flex flex-col w-7/18">
          <header className="pl-5 pt-4">
            <Image alt="brand" src="/brand.png" width={200} height={40} />
          </header>
          <section className="flex grow justify-center align-center">
            {children}
          </section>
          {hasFooter && (
            <footer className="flex justify-center items-center h-footer border-t-2 border-t-stroke-8">
              {getAuthFooterTitle(pathname)}
            </footer>
          )}
        </section>
        <aside className="flex items-center justify-center w-11/18 px-[80px] bg-logo-gray">
          <Image alt="logo" src="/logo.png" width={512} height={480} />
        </aside>
      </main>
    </Guest>
  );
}
