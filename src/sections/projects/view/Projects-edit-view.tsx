'use client';

import { useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useSnackbar } from 'notistack';
//
import ProjectNewEditForm from '../Projects-new-edit-form';
import { LoadingScreen } from '@/components/loading-screen';
import { fetchProjectById } from '@/redux/slices/projectsSlice';
import NotFoundPage from '@/app/not-found';

// ----------------------------------------------------------------------

export default function ProjectEditView() {
  const { projectId } = useParams();
  const settings = useSettingsContext();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const ProjectsState = useAppSelector((state) => state.projects);
  const currentProject = ProjectsState?.currentProject;
  const loading = ProjectsState?.loading || false;

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(Number(projectId)));
    }
  }, [dispatch, projectId, enqueueSnackbar]);

  if (loading) return <LoadingScreen />;
  if (!currentProject && !loading) return <NotFoundPage />;
  console.log(currentProject);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Projects',
            href: paths.dashboard.projects.root,
          },
          {
            name: currentProject?.title || '',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProjectNewEditForm currentProject={currentProject} />
    </Container>
  );
}
