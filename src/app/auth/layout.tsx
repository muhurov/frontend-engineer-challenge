import Image from 'next/image';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-7/18">
        <header className="pl-5 pt-4">
          <Image alt="brand" src="/brand.png" width={200} height={40} />
        </header>
        <section className="flex grow justify-center align-center">
          {children}
        </section>
        <footer className="h-footer border-t-2 border-t-stroke-8"></footer>
      </section>
      <aside className="flex items-center justify-center w-11/18 bg-logo-gray">
        <Image alt="logo" src="/logo.png" width={512} height={480} />
      </aside>
    </main>
  );
}
