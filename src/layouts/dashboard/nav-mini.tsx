// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// theme
import { bgBlur, hideScroll } from 'src/theme/css';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// components
import Logo from 'src/components/logo';
import { NavSectionMini } from 'src/components/nav-section';
//
import { useTheme } from '@mui/material/styles';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton } from '../_common';
import { Typography,  } from '@mui/material';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useMockedUser();

  const theme = useTheme()

  const navData = useNavData();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
        // background: 'linear-gradient(to bottom right, rgb(28, 28, 124), #0f0f26) ',
        background: '#D0D0D7',
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >

        <Typography
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '5em'
          }}>Beam</Typography>

        <NavSectionMini
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Stack>
    </Box>
  );
}
