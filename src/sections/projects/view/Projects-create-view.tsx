'use client';

import { Container } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import ProjectNewEditForm from '../Projects-new-edit-form';

export default function ProjectCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new project"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Projects', href: paths.dashboard.projects.root },
          { name: 'New Project' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProjectNewEditForm />
    </Container>
  );
}
