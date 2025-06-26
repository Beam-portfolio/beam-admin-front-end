'use client';

import { RoleListView } from 'src/sections/user/role/view';
import { RoleBasedGuard } from '@/auth/guard';

export default function RoleListPage() {
  return (
    <RoleBasedGuard roles={['ADMIN']}>
      <RoleListView />
    </RoleBasedGuard>
  );
}
