// @mui
import Box from '@mui/material/Box';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { useSettingsContext } from 'src/components/settings';
//
import Main from '../dashboard/main';
import { usePathname } from 'next/navigation';
import ShopHeader from './shopHeader';
import ShopFooterSection from './shop-footer-section';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ShopLayout({ children }: Props) {
  const settings = useSettingsContext();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  if (isHorizontal) {
    return (
      <>
        <ShopHeader />
        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <ShopHeader />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Main>{children}</Main>
        </Box>
        <ShopFooterSection />
      </>
    );
  }

  return (
    <>
      <ShopHeader />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
      <ShopFooterSection />
    </>
  );
}
