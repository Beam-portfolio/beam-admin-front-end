'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import PermissionNewEditForm from '../permission-new-edit-form';

export default function PermissionCreateView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Create a new permission"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User Management', href: paths.dashboard.user.root },
          { name: 'Permissions', href: paths.dashboard.user.permission.list },
          { name: 'New permission' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <PermissionNewEditForm />
    </Container>
  );
}
