import React from 'react';
import { Box, Grid, Typography, Stack, TextField, Button, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Iconify from '@/components/iconify';

const ShopFooterSection = () => (
  <Box sx={{ background: '#181B23', color: '#fff', py: 6, mt: 0, px: 12 }}>
    <Grid container spacing={4} sx={{ py: 4, borderBottom: '2px solid #333' }}>
      <Grid item xs={12} md={3}>
        <Typography fontWeight={700} mb={2}>
          AL KHAIL STORE
        </Typography>
        <Typography variant="body2" color="rgba(156, 163, 175, 1)">
          Your trusted destination for beauty products.
        </Typography>
        <Stack direction="row" spacing={1} mt={2}>
          <IconButton>
            <Iconify
              color="rgba(156, 163, 175, 1)"
              icon="ic:baseline-facebook"
              width="24"
              height="24"
            />
          </IconButton>
          <IconButton>
            <Iconify
              color="rgba(156, 163, 175, 1)"
              icon="mdi:instagram"
              width="24"
              height="24"
            />{' '}
          </IconButton>
          <IconButton>
            <Iconify color="rgba(156, 163, 175, 1)" icon="mdi:twitter" width="24" height="24" />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight={700} mb={2}>
          Quick Links
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2" sx={{ color: 'rgba(156, 163, 175, 1)', cursor: 'default' }}>
            About Us
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(156, 163, 175, 1)', cursor: 'default' }}>
            Shop
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(156, 163, 175, 1)', cursor: 'default' }}>
            FAQ
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight={700} mb={2}>
          Customer Service
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2" sx={{ color: 'rgba(156, 163, 175, 1)', cursor: 'default' }}>
            Shipping
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(156, 163, 175, 1)', cursor: 'default' }}>
            Returns
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(156, 163, 175, 1)', cursor: 'default' }}>
            Payment Options
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight={700} mb={2}>
          Newsletter
        </Typography>
        <Typography variant="body2" color="rgba(156, 163, 175, 1)">
          Subscribe to get special offers and updates
        </Typography>
        <Stack direction="row" spacing={0} mt={2}>
          <TextField
            size="small"
            placeholder="Your email"
            variant="filled"
            sx={{
              flex: 1,
              '& .MuiFilledInput-root': {
                height: 36,
                borderRadius: '50px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: 'rgba(75, 75, 75, 1)',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
              },
              '& input': {
                padding: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: 36,
              borderRadius: '50px',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              textTransform: 'none',
              px: 3, // padding left/right to control button width
              fontSize: 14,
            }}
          >
            Subscribe
          </Button>
        </Stack>
      </Grid>
    </Grid>
    <Typography align="center" variant="body2" color="grey.500" mt={3}>
      All rights reserved.
    </Typography>
  </Box>
);

export default ShopFooterSection;
