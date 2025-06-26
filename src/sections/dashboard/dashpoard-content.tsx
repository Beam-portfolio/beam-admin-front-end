'use client';
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { Icon } from '@iconify/react';
import BookingWidgetSummary from './widget-summary';
import { fNumber } from '@/utils/format-number';
import { useAppSelector } from '@/redux/hooks';

function DashboardContent() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const { projects } = useAppSelector(state => state.projects)
  const { services } = useAppSelector(state => state.service)
  const {customerWords} = useAppSelector(state => state.customerWord)

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 0 }}
      maxWidth={settings.themeStretch ? false : 'xl'}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: -2, mt: 3 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{}}>
        {[0, 1, 2, 3].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <BookingWidgetSummary
              sx={{
                background: `linear-gradient(135deg, #2563eb66 0%, #a855f791 100%)`,
                boxShadow: '0px 5px 5px 0px rgba(0, 0, 0, 0.4)'
              }}
              title={['Total Visits', 'Projects', 'Services', 'Testimonials'][index]}
              total={
                [fNumber(1230), fNumber(projects.length), fNumber(services.length), fNumber(customerWords.length)][index]
              }
              color={
                [
                  'rgb(231, 238, 252)',
                  'rgb(229, 231, 235)',
                  'rgb(219, 234, 254)',
                  'rgb(229, 231, 235)',
                ][index]
              }
              type={['info', 'info', 'info', 'info'][index]}
              icon={
                <Icon
                  color={[theme.palette.primary.main, '#2563eb', '#059669', '#7c3aed'][index]}
                  icon={
                    [
                      'mdi:eye-outline',
                      'si:projects-alt-line',
                      'material-symbols:room-service-outline',
                      'dashicons:testimonial',
                    ][index]
                  }
                  width="20"
                  height="20"
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DashboardContent;
