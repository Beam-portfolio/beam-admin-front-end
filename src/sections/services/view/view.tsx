'use client';

// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CreateServiceDialog } from 'src/components/custom-dialog/createCatDialog';
import { LoadingScreen } from 'src/components/loading-screen';
import axiosInstance from '@/utils/axios';
import ServiceCard from '../card';
import { useAppDispatch } from '@/redux/hooks';
import { useAuthContext } from '@/auth/hooks';
import { changeNewService, closeCreateDialog, createService, fetchServices, openCreateDialog, setError, setLadingB, updateService } from '@/redux/slices/serviceSlice';
import NotFoundPage from '@/app/not-found';
import { Grid } from '@mui/material';
// ----------------------------------------------------------------------

export function ServiceView() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  const dispatch = useAppDispatch();

  const services = useSelector((state: any) => state.service.services);
  const [refresh, setRefresh] = useState<boolean>(false);
  const lading = useSelector((state: any) => state.service.isLoading);
  const error = useSelector((state: any) => state.service.error);
  const open = useSelector((state: any) => state.service.open);
  const editMode = useSelector((state: any) => state.service.editMode);
  const newService = useSelector((state: any) => state.service.newService);

  const handleOpen = () => {
    dispatch(openCreateDialog());
  };
  const handleClose = () => {
    dispatch(closeCreateDialog());
  };

  const handleSave = async () => {
    try {
      const newErrors: any = {};

      if (!newService.title.trim()) {
        newErrors.title = 'Please enter a name for the service';
      }
      if (!newService.icon) {
        newErrors.icon = 'Please upload an icon for the service';
      }

      if (Object.keys(newErrors).length > 0) {
        dispatch(setError(newErrors));
        return;
      }

      dispatch(setLadingB(true));

      if (!editMode) {
        await dispatch(createService(newService))
        setRefresh((prev) => !prev);
      } else {
        console.log(newService);
        await dispatch(updateService({ id: editMode, service: newService }))
        setRefresh((prev) => !prev);
      }
      dispatch(setLadingB(false));
      dispatch(changeNewService({ value: '', field: 'name' }));
      dispatch(changeNewService({ value: '', field: 'icon' }));
      dispatch(changeNewService({ value: '', field: 'id' }));
      dispatch(changeNewService({ value: '', field: 'desc' }));
      dispatch(changeNewService({ value: '', field: 'color' }));

      dispatch(closeCreateDialog());
    } catch (error) {
      dispatch(setLadingB(false));
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    dispatch(fetchServices());
  }, [refresh]);
  if (lading) return <LoadingScreen />;

  if (error) return <NotFoundPage />;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Container
        maxWidth={settings.themeStretch ? false : 'xl'}
        sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}
      >
        <Box>
          <Typography variant="h4">Services</Typography>
        </Box>
        <LoadingButton
          color="inherit"
          type="submit"
          variant="contained"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.16667 14.6667C7.16667 14.8877 7.25446 15.0996 7.41074 15.2559C7.56702 15.4122 7.77899 15.5 8 15.5C8.22101 15.5 8.43297 15.4122 8.58926 15.2559C8.74554 15.0996 8.83333 14.8877 8.83333 14.6667V8.83333H14.6667C14.8877 8.83333 15.0996 8.74554 15.2559 8.58926C15.4122 8.43297 15.5 8.22101 15.5 8C15.5 7.77899 15.4122 7.56702 15.2559 7.41074C15.0996 7.25446 14.8877 7.16667 14.6667 7.16667H8.83333V1.33333C8.83333 1.11232 8.74554 0.900358 8.58926 0.744078C8.43297 0.587797 8.22101 0.5 8 0.5C7.77899 0.5 7.56702 0.587797 7.41074 0.744078C7.25446 0.900358 7.16667 1.11232 7.16667 1.33333V7.16667H1.33333C1.11232 7.16667 0.900358 7.25446 0.744078 7.41074C0.587797 7.56702 0.5 7.77899 0.5 8C0.5 8.22101 0.587797 8.43297 0.744078 8.58926C0.900358 8.74554 1.11232 8.83333 1.33333 8.83333H7.16667V14.6667Z"
                fill="white"
              />
            </svg>
          }
          onClick={() => {
            handleOpen();
          }}
          sx={{
            height: '3em',
          }}
        >
          Create Service
        </LoadingButton>
      </Container>

      <Box
        sx={{
          mt: 5,
          width: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { sx: 'center', sm: 'flex-start' },
          alignItems: { sx: 'center', sm: 'flex-start' },
          gap: 5,
          flexDirection: { xs: 'column', sm: 'row' },
          borderRadius: 2,
        }}
      >
        {Array.isArray(services) && services.length > 0 ? (
          <Grid container spacing={1}>
            {services.map(({ id, title, desc, icon, color }) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={id}>
                <ServiceCard id={id} title={title} desc={desc} icon={icon} color={color} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ py: 5, textAlign: 'center', width: '100%' }}>
            No services found.
          </Typography>
        )}
      </Box>
      <CreateServiceDialog open={open} onClose={handleClose} handleSave={handleSave} />
    </Container>
  );
}
