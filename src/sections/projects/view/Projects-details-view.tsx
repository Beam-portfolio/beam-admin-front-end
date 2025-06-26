'use client';

import { useState, useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { TOUR_PUBLISH_OPTIONS } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { fetchServiceById } from 'src/redux/slices/serviceSlice';
import { useSnackbar } from 'notistack';
//
import ServiceDetailsToolbar from '../service-details-toolbar';
import ServiceDetailsContent from '../service-details-content';

// ----------------------------------------------------------------------

export default function ServiceDetailsView() {
  const { id } = useParams();
  const settings = useSettingsContext();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { currentService, loading } = useAppSelector((state) => state.service);

  const [publish, setPublish] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(Number(id)))
        .unwrap()
        .catch((err) => {
          enqueueSnackbar(err || 'Failed to fetch service details', { variant: 'error' });
        });
    }
  }, [dispatch, id, enqueueSnackbar]);

  useEffect(() => {
    if (currentService) {
      setPublish(currentService.publish);
    }
  }, [currentService]);

  const handleChangePublish = (): void => {
    throw new Error('Function not implemented.');
  };

  if (loading || !currentService) {
    return (
      <Container sx={{ textAlign: 'center', py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <ServiceDetailsToolbar
        publish={publish}
        liveLink=""
        publishOptions={TOUR_PUBLISH_OPTIONS}
        backLink={paths.dashboard.service.root}
        editLink={paths.dashboard.service.edit(`${currentService?.id}`)}
        onChangePublish={handleChangePublish}
        sx={{}}
      />

      <ServiceDetailsContent service={currentService} />
    </Container>
  );
}
