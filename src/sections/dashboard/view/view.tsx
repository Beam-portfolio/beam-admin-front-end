'use client';

import { bgBlur } from '@/theme/css';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
// import { fDate } from 'src/utils/format-time';
import DashboardContent from '../dashpoard-content';
// import { Button } from '@mui/material';
// import { useAuthContext } from '@/auth/hooks';
// import axiosInstance, { endpoints } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
// import { fetchLatestReviews, fetchReviews } from '@/redux/slices/reviewsSlice';
import ProductDetailsReview from '../last-projects-view';
import LastProjectsView from '../last-projects-view';
import { fetchLastProjects, fetchProjects } from '@/redux/slices/projectsSlice';
import { SplashScreen } from '@/components/loading-screen';
import NotFoundPage from '@/app/not-found';
import { fetchServices } from '@/redux/slices/serviceSlice';
import ServicesListPage from '@/app/dashboard/projects/new/page';
import { Box, Divider, Grid, Stack } from '@mui/material';
import ServiceCard from '@/sections/services/card';
import ServiceView from '../service-view';
import { CustomerWordView } from '../testimonials-view';
import { fetchCustomerWords } from '@/redux/slices/customerWordSlice';
// import { fetchLatestOrders } from '@/redux/slices/ordersSlice';
// import { useDispatch } from 'react-redux';
// import { fetchSellers } from '@/redux/slices/SellersSlice';
// import { fetchCustomers, fetchUsers } from '@/redux/slices/userSlice';
// import { fetchProducts } from '@/redux/slices/productsReducer';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();
  const appDispatch = useAppDispatch();
  const { lastProjects, loading } = useAppSelector(state => state.projects)
  const { services, isLoading } = useAppSelector(state => state.service)
  const { customerWords, isLoading: isLoadingCustomerWords } = useAppSelector(state => state.customerWord)

  useEffect(() => {
    appDispatch(fetchLastProjects());
    appDispatch(fetchServices());
    appDispatch(fetchCustomerWords());
    appDispatch(fetchProjects())
  }, []);


  if (loading || isLoading || isLoadingCustomerWords) {
    return <SplashScreen />
  }

  if ((!isLoading && !isLoading && isLoadingCustomerWords) && (!services || !lastProjects || !customerWords)) {
    return <NotFoundPage />
  }

  return (
    <Container sx={{
    }} maxWidth={settings.themeStretch ? false : 'xl'}>
      <DashboardContent />
      <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ p: 4 }}>
        {lastProjects && <LastProjectsView lastProjects={lastProjects} />}
        {services &&
          <ServiceView services={services} />
        }
        {customerWords && <CustomerWordView customerWords={customerWords} />}
      </Container>
    </Container>
  );
}
