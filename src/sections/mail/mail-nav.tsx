import PropTypes from 'prop-types';
// @mui
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
//
import MailNavItem from './mail-nav-item';
import { MailNavItemSkeleton } from './mail-skeleton';
import { MailNavProps } from '@/types/mailTypes';

// ----------------------------------------------------------------------

export default function MailNav({
  loading,
  openNav,
  onCloseNav,
  //
  labels,
  selectedLabelId,
  handleClickLabel,
  //
  onToggleCompose,
}: MailNavProps) {
  const mdUp = useResponsive('up', 'md');

  const renderSkeleton = (
    <>
      {[...Array(8)].map((_, index) => (
        <MailNavItemSkeleton sx={{}} key={index} />
      ))}
    </>
  );

  const sortedLabels = [...labels].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const renderList = (
    <Stack
      direction='column'
      gap={2}
    >
      {sortedLabels.map((label) => (
        <MailNavItem
          key={label.id}
          label={label}
          selected={selectedLabelId === label.id}
          onClickNavItem={() => {
            handleClickLabel(label.id);
          }}
        />
      ))}
    </Stack>
  );

  const renderContent = (
    <>
      <Stack
        sx={{
          p: (theme) => ({
            xs: theme.spacing(2.5, 2.5, 2, 2.5),
            md: theme.spacing(2, 1.5),
          }),
        }}
      >
        <Button
          fullWidth
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="solar:pen-bold" />}
          onClick={onToggleCompose}
        >
          Compose
        </Button>
      </Stack>

      <Scrollbar>
        <Stack
          sx={{
            px: { xs: 3.5, md: 2.5 },
          }}
        >
          {loading && renderSkeleton}

          {!!labels.length && renderList}
        </Stack>
      </Scrollbar>
    </>
  );

  return mdUp ? (
    null
  ) : (
    <Drawer
      open={openNav}
      onClose={onCloseNav}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: 260,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}

MailNav.propTypes = {
  handleClickLabel: PropTypes.func,
  labels: PropTypes.array,
  loading: PropTypes.bool,
  onCloseNav: PropTypes.func,
  onToggleCompose: PropTypes.func,
  openNav: PropTypes.bool,
  selectedLabelId: PropTypes.string,
};
