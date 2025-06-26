'use client';

import { RoleCreateView } from 'src/sections/user/role/view';
import { RoleBasedGuard } from '@/auth/guard';

export default function RoleCreatePage() {
  return (
    <RoleBasedGuard roles={['ADMIN']}>
      <RoleCreateView />
    </RoleBasedGuard>
  );
}
