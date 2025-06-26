'use client';

import { PermissionListView } from 'src/sections/user/permission/view';
import { RoleBasedGuard } from '@/auth/guard';

export default function PermissionListPage() {
  return (
    <RoleBasedGuard roles={['ADMIN']}>
      <PermissionListView />
    </RoleBasedGuard>
  );
}
