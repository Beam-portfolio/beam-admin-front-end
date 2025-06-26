import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
//
import MailItem from './mail-item';
import { MailItemSkeleton } from './mail-skeleton';
import { MailListProps } from '@/types/mailTypes';
import { Divider } from '@mui/material';

// ----------------------------------------------------------------------

export default function MailList({
  loading,
  mails,
  //
  openMail,
  onCloseMail,
  onClickMail,
  //
  selectedLabelId,
  selectedMailId,
}: MailListProps) {
  const mdUp = useResponsive('up', 'md');

  const renderSkeleton = (
    <>
      {[...Array(8)].map((_, index) => (
        <MailItemSkeleton sx={{}} key={index} />
      ))}
    </>
  );

  const sortedMails = [...mails].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const renderList = (
    <>
      {sortedMails.map((mile: any) => (
        <MailItem
          key={mile.id}
          mail={mile}
          selected={selectedMailId === mile.id}
          onClickMail={() => {
            onClickMail(mile.id);
          }}
          sx={{}}
        />
      ))}
    </>
  );

  const renderContent = (
    <>
      <Stack sx={{ p: 2 }}>
        {mdUp ? (
          <>
          <Typography variant='h4' color={'primary.main'} >Mails</Typography>
          <Divider/>
          </>
        ) : (
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {selectedLabelId}
          </Typography>
        )}
      </Stack>

      <Scrollbar sx={{ px: 2 }}>
        {loading && renderSkeleton}

        {!!mails.length && renderList}
      </Scrollbar>
    </>
  );

  return mdUp ? (
    <Stack
      sx={{
        width: 350,
        flexShrink: 0,
        borderRadius: 1.5,
        background: `linear-gradient(135deg, #2563eb66 0%, #a855f791 100%)`,
      }}
    >
      {renderContent}
    </Stack>
  ) : (
    <Drawer
      open={openMail}
      onClose={onCloseMail}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: 350,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}

MailList.propTypes = {
  loading: PropTypes.bool,
  mails: PropTypes.object,
  onClickMail: PropTypes.func,
  onCloseMail: PropTypes.func,
  openMail: PropTypes.bool,
  selectedLabelId: PropTypes.string,
  selectedMailId: PropTypes.string,
};
