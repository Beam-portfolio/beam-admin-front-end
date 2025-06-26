import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  IconButton,
  Box,
  TextField,
  Slide,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TransitionProps } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import Iconify from '../iconify';
import { changeNewService, setEditMode } from '@/redux/slices/serviceSlice';

interface CreateCatDialogProps {
  open: boolean;
  onClose: () => void;
  handleSave: () => void;
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export function CreateServiceDialog({ onClose, open, handleSave }: CreateCatDialogProps) {
  const newService = useSelector((state: any) => state.service.newService);
  const ladingB = useSelector((state: any) => state.service.ladingB);
  const [color, setColor] = useState({ from: '#3b82f6', to: '#a855f7' });

  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.service.error);

  const handleClose = () => {
    dispatch(changeNewService({ value: '', field: 'icon' }));
    dispatch(changeNewService({ value: '', field: 'title' }));
    dispatch(changeNewService({ value: '', field: 'desc' }));
    dispatch(changeNewService({ value: '', field: 'color' }));
    dispatch(setEditMode(null));
    onClose();
  };



  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeNewService({
        value: e.target.value,
        field: 'title',
      })
    );
  };

  const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeNewService({
        value: e.target.value,
        field: 'desc',
      })
    );
  };

  const handleChangeColor = () => {
    dispatch(
      changeNewService({
        value: color,
        field: 'color',
      })
    );
  };

  useEffect(() => {
    handleChangeColor()
  }, [color, dispatch, color.to, color.from]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullWidth
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide"
      BackdropProps={{
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
        }}
      >
        {newService.id ? `Update ${newService.title} service` : 'Create a new service'}
        <IconButton onClick={handleClose} sx={{}}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <TextField
            id="service-icon"
            label="Icon (iconify string, e.g. mdi:globe)"
            value={newService.icon || ''}
            fullWidth
            required
            sx={{ width: '100%' }}
            error={error && error.icon}
            helperText={error && error.icon}
            onChange={e => dispatch(changeNewService({ value: e.target.value, field: 'icon' }))}
          />
          <TextField
            id="service-title"
            label="Title"
            value={newService.title || ''}
            fullWidth
            required
            sx={{
              width: '100%',
            }}
            error={error && error.title}
            helperText={error && error.title}
            onChange={handleChangeTitle}
          />
          <TextField
            id="service-desc"
            label="Description"
            value={newService.desc || ''}
            fullWidth
            multiline
            minRows={2}
            sx={{ width: '100%' }}
            error={error && error.desc}
            helperText={error && error.desc}
            onChange={handleChangeDesc}
          />
          <label>Colors (Gradient)</label>
          <Stack direction="row" spacing={2}>
            <TextField
              id="service-color"
              label="Color-From"
              name='from'
              value={color.from}
              fullWidth
              sx={{ width: '100%' }}
              error={error && error.color}
              helperText={error && error.color}
              onChange={e => {
                setColor({ ...color, from: e.target.value });

              }}
            />
            <TextField
              id="service-color"
              label="Color-To"
              name='to'
              value={color.to}
              fullWidth
              sx={{ width: '100%' }}
              error={error && error.color}
              helperText={error && error.color}
              onChange={e => {
                setColor({ ...color, to: e.target.value });
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={ladingB}
          sx={{ backgroundColor: '#212B36', color: '#fff' }}
          onClick={handleSave}
        >
          Publish
        </LoadingButton>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
