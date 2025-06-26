"use client";

import { RoleBasedGuard } from '@/auth/guard';
import { CustomerWordView } from '@/sections/customers-word/view/view';

export default function Page() {
  return (
    <RoleBasedGuard roles={['ADMIN']}>
      <CustomerWordView />
    </RoleBasedGuard>
  );
}
