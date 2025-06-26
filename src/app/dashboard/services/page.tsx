'use client';

import { RoleBasedGuard } from '@/auth/guard';
import { ServiceView } from '@/sections/services/view/view';

export default function Page() {
  return (
    <RoleBasedGuard roles={['ADMIN']}>
      <ServiceView />
    </RoleBasedGuard>
  );
}
