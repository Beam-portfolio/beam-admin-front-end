"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Grid } from '@mui/material';
import CustomerWordCard from './customer-word-card';


export function CustomerWordView({customerWords}: any) {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Container
        maxWidth={settings.themeStretch ? false : 'xl'}
        sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}
      >
        <Box>
          <Typography variant="h4">Testimonials</Typography>
        </Box>
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
        {Array.isArray(customerWords) && customerWords.length > 0 ? (
          <Grid container spacing={1}>
            {customerWords.map(({ id, name, nickName, word, avatar }: any) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={id}>
                <CustomerWordCard
                  id={id}
                  name={name}
                  nickName={nickName}
                  word={word}
                  avatar={avatar}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ py: 5, textAlign: 'center', width: '100%' }}>
            No testimonials found.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
