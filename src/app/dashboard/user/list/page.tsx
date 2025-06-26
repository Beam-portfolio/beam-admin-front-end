'use client';

import { RoleBasedGuard } from '@/auth/guard';
import { UserListView } from 'src/sections/user/view';

export default function UserListPage() {
  return  (
    <RoleBasedGuard roles={['ADMIN']}>  
    <UserListView />
    </RoleBasedGuard>
  );
}
