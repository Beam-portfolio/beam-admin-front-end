'use client';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// routes
import { usePathname, useRouter } from 'src/routes/hooks';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { AuthContext } from 'src/auth/context/jwt';
import { useContext, useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const OPTIONSs = [
  {
    label: 'Home',
    linkTo: '/',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const [OPTIONS, setOPTIONS] = useState(OPTIONSs);
  // const { user } = useMockedUser();
  const { user } = useContext(AuthContext);

  const { logout } = useAuthContext();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  useEffect(() => {
    if (user) {
      // if (user.role.toLowerCase() === 'user') {
      //   setOPTIONS([
      //     ...OPTIONSs,
      //     {
      //       label: 'Settings',
      //       linkTo: '/shop/settings',
      //     },
      //   ]);
      // }
      // if (user.role.toLowerCase() === 'seller') {
      //   setOPTIONS([
      //     ...OPTIONSs,
      //     {
      //       label: 'Settings',
      //       linkTo: '/dashboard/settings/seller',
      //     },
      //   ]);
      // }
      // if (user.role.toLowerCase() === 'admin') {
      //   setOPTIONS([
      //     ...OPTIONSs,
      //     {
      //       label: 'Settings',
      //       linkTo: '/dashboard/settings/admin',
      //     },
      //   ]);
      // }
    }
  }, [user]);

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.primary.main, 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photo}
          alt={user?.firstName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.primary.main}`,
          }}
        />
      </IconButton>
      <Typography
        sx={{
          minWidth: 'fit-content',
          fontSize: '14px',
          color: 'primary.main'
        }}
      >
        {user?.firstName + ' ' + user?.lastName}
      </Typography>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
