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
  Slide,
  TextField,
} from '@mui/material';
import React from 'react';
import { TransitionProps } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { changeNewPlan } from '@/redux/slices/PlanSlice';
import { UploadBox } from '../upload';
import Iconify from '../iconify';

interface CreatePlanDialogProps {
  open: boolean;
  onClose: () => void;
  handleSave: () => void;
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export function CreatePlanDialog({ onClose, open, handleSave }: CreatePlanDialogProps) {
  const error = useSelector((state: any) => state.PlansSlice.error);
  const newPlan = useSelector((state: any) => state.PlansSlice.newPlan);
  const loadingB = useSelector((state: any) => state.PlansSlice.loadingB);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeNewPlan({ value: '', field: 'name' }));
    dispatch(changeNewPlan({ value: '', field: 'credits' }));
    dispatch(changeNewPlan({ value: '', field: 'amountJOD' }));
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(changeNewPlan({ value, field: name }));
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullWidth
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
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
        <IconButton onClick={handleClose} sx={{}}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <TextField
            id="outlined-disabled"
            label="Name"
            error={!!error.name}
            helperText={error.name}
            name="name"
            value={newPlan.name}
            fullWidth
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': {
                borderStyle: 'dashed', // Set the border style to dashed
              },
            }}
            onChange={handleChange}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
            }}
          >
            <TextField
              error={!!error.credits}
              helperText={error.credits}
              id="outlined"
              label="Credits"
              type="number"
              name="credits"
              value={newPlan.credits}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderStyle: 'dashed', // Set the border style to dashed
                },
              }}
              onChange={handleChange}
            />
            <TextField
              error={!!error.amountJOD}
              helperText={error.amountJOD}
              id="outlined"
              type="number"
              label="AmountJOD"
              name="amountJOD"
              value={newPlan.amountJOD}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderStyle: 'dashed', // Set the border style to dashed
                },
              }}
              onChange={handleChange}
            />
          </Box>
          <Typography variant="subtitle2">
            {newPlan.credits} Credits/Month : {newPlan.amountJOD} JOD
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loadingB}
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
