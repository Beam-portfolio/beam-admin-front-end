// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import { Divider, Grid, Typography } from '@mui/material';
import ServiceCard from './service-card';

// ----------------------------------------------------------------------


export default function ServiceView({ services }: any) {

  return (
    <Stack
      direction="column"
      sx={{
        mb: 5,
      }}
    >
      <Typography sx={{ p: 2 }} variant="h5">
        Services
      </Typography>

      <Divider />

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
          <Grid container spacing={2} p={2}>
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
    </Stack>
  );
}
