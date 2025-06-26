'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import RoleNewEditForm from '../role-new-edit-form';

export default function RoleCreateView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Create a new role"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User Management', href: paths.dashboard.user.root },
          { name: 'Roles', href: paths.dashboard.user.role.list },
          { name: 'New role' },
        ]}
      />

      <RoleNewEditForm />
    </Container>
  );
}
