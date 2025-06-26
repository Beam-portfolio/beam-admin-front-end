// @mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import UserCard from './user-card';

// ----------------------------------------------------------------------

export function ProfileDialog({ user, open, onClose, ...other }: any) {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} {...other}>
      <DialogTitle
        sx={{ pb: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}
      >
        <IconButton
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={onClose}
        >
          <Icon icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ typography: 'body2' }}>{user && <UserCard user={user} />}</DialogContent>
    </Dialog>
  );
}
