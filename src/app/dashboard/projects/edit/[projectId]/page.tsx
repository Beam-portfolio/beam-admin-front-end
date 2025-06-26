'use client';

import { RoleBasedGuard } from '@/auth/guard';
import ProjectEditView from '@/sections/projects/view/Projects-edit-view';

export default function ProjectEditPage() {
  return (
    <RoleBasedGuard roles={['ADMIN', 'SELLER']}>
      <ProjectEditView />
    </RoleBasedGuard>
  );
}
