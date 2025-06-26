'use client';

import { RoleBasedGuard } from '@/auth/guard';
import ProductCreateView from '@/sections/projects/view/Projects-create-view';

export default function ServicesListPage() {
  return (
    <RoleBasedGuard roles={['ADMIN', 'SELLER']}>
      <ProductCreateView />
    </RoleBasedGuard>
  );
}
