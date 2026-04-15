import { ReactNode } from 'react';

import { Auth } from '@/features/auth';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <Auth>{children}</Auth>;
}
