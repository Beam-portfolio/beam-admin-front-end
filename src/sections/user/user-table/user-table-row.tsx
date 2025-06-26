import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import {
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  ListItemText,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import Label from 'src/components/label';
import { timeAgo } from '@/utils/format-time';
import { useAppSelector } from '@/redux/hooks';
import { LoadingButton } from '@mui/lab';

type Props = {
  row: any;
  selected: boolean;
  onSelectRow: (id: string) => void;
  onDeleteRow: (id: number) => void;
  onEditRow: VoidFunction;
  loading: boolean;
};

export default function UserTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  loading,
}: Props) {
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleConfirmDelete = async () => {
    await onDeleteRow(row.id);
    setOpenConfirm(false);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={row.firstName} src={row.photo} sx={{ mr: 2 }} />

          <ListItemText
            primary={row.firstName + ' ' + row.lastName}
            primaryTypographyProps={{ typography: 'body2' }}
            secondary={row.email}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell>
          {row?.roles?.length > 0
            ? row?.roles?.map((role: any) => (
                <Label
                  key={role?.id}
                  sx={{ ml: 0.5 }}
                  variant="soft"
                  color={
                    (String(role?.name)?.toLocaleLowerCase() === 'admin' && 'info') ||
                    (String(role?.name)?.toLocaleLowerCase() === 'manager' && 'success') ||
                    (String(role?.name)?.toLocaleLowerCase() === 'seller' && 'warning') ||
                    'default'
                  }
                >
                  {role?.name}
                </Label>
              ))
            : null}
        </TableCell>

        <TableCell>
          <Stack direction="row" spacing={1}>
            <Label
              variant="soft"
              color={
                (String(row?.roles[0]?.name) && 'success') ||
                !(String(row?.roles[0]?.name) && 'error') ||
                'default'
              }
            >
              {row?.isActive ? 'Active' : 'Inactive'}
            </Label>
          </Stack>
        </TableCell>

        <TableCell>{timeAgo(row?.lastActiveAt)}</TableCell>

        <TableCell>
          <IconButton
            onClick={() => {
              onEditRow();
              handleCloseMenu();
            }}
          >
            <Iconify icon="eva:edit-fill" width={20} height={20} />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpenConfirm(true);
              handleCloseMenu();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
      </Popover>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user {row.firstName} {row.lastName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <LoadingButton
            disabled={loading}
            loading={loading}
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
