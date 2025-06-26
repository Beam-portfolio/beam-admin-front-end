/* eslint-disable @typescript-eslint/no-var-requires */
'use client';
import React, { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';
//
import { HEADER, NAV } from '../config-layout';
import { AccountPopover, NotificationsPopover } from '../_common';
import { InputAdornment, TextField, Typography } from '@mui/material';
import Iconify from '@/components/iconify';
import Label from '@/components/label';

// ----------------------------------------------------------------------
export default function ShopHeader() {
  const theme = useTheme();
  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  // Search state and handler
  const [searchValue, setSearchValue] = useState('');
  const router = require('next/navigation').useRouter();
  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/shop/products/?search=${encodeURIComponent(searchValue)}&page=1`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderContent = (
    <Stack direction="row" alignItems="center" width={1}>
      {/* Left: Logo + Store Name */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 270 }}>
      <Typography>Beam</Typography>
        <Typography color="primary.main" variant="h6" fontWeight={700} sx={{ letterSpacing: 1 }}>
          AL KHAIL STORE
        </Typography>
      </Stack>
      {/* Center: Nav Links + Search */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        flexGrow={1}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          <Typography
            component="a"
            href="/shop"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Home
          </Typography>
          <Typography
            component="a"
            href="/shop/shops"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Shop
          </Typography>
          <Typography
            component="a"
            href="/shop/products"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Products
          </Typography>
          <Typography
            component="a"
            href="/shop/categories"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Categories
          </Typography>
          <Typography
            component="a"
            href="/shop/messages"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Messages
          </Typography>
        </Stack>
        <TextField
          type="text"
          placeholder="Search products..."
          size="small"
          sx={{
            fontSize: 16,
            width: 200,
            borderRadius: 50,
            '& .MuiOutlinedInput-root': {
              borderRadius: 50,
            },
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  width={24}
                  height={24}
                  style={{ cursor: 'pointer' }}
                  onClick={handleSearch}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0}
        sx={{ minWidth: 180, justifyContent: 'flex-end' }}
      >
        <IconButton color="default">
          <Iconify icon="mdi:heart-outline" width="20" height="20" />
        </IconButton>
        <IconButton component="a" href="/shop/cart" color="default" sx={{ position: 'relative' }}>
          <Label
            color="warning"
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
              transform: 'translate(50%, -50%)',
              borderRadius: 50,
            }}
          >
            <Iconify icon="carbon:dot-mark" width="32" height="32" />
          </Label>
          <Iconify icon="mdi:cart" width="20" height="20" />
        </IconButton>
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </Stack>
  );

  return (
    <AppBar
      sx={{
        // height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop &&
            {
              // height: HEADER.H_DESKTOP_OFFSET,
            }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            // height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
        width: 1,
        borderBottom: `1px solid  ${theme.palette.divider}`,
        height: '4em',
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          position: 'relative',
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
