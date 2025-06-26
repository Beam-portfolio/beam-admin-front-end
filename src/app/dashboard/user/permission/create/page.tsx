'use client';

import { PermissionCreateView } from 'src/sections/user/permission/view';
import { RoleBasedGuard } from '@/auth/guard';

export default function PermissionCreatePage() {
  return (
    <RoleBasedGuard roles={['ADMIN']}>
      <PermissionCreateView />
    </RoleBasedGuard>
  );
}
