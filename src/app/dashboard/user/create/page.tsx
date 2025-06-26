'use client';

import { RoleBasedGuard } from '@/auth/guard';
import { UserCreateView } from 'src/sections/user/view';

export default function UserCreatePage() {
  return (
    <RoleBasedGuard roles={['ADMIN']}>
      <UserCreateView />
    </RoleBasedGuard>
  );
}
