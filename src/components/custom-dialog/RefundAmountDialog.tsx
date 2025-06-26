import { ISubscription } from '@/types/Subscriptions';
import { fDate } from '@/utils/format-time';
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
  ListItemText,
  Avatar,
  Slide,
  Alert,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import {
  closeRefF,
  openSubF,
  refundSubscription,
  setHistory,
  setRefund,
} from '@/redux/slices/subscriptionsSlice';
import React from 'react';
import { TransitionProps } from 'notistack';
import { AppDispatch } from '@/redux/store';
import Label from '../label';
import Iconify from '../iconify';

interface RefundAmountDialogProps {
  viewHistory: any;
  openRef: boolean;
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export function RefundAmountDialog({ viewHistory, openRef }: RefundAmountDialogProps) {
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(setRefund({ history: {} }));
    dispatch(closeRefF());
    dispatch(openSubF());
  };

  const handleSave = async () => {
    await dispatch(refundSubscription(viewHistory.id));
    dispatch(setRefund({ history: {} }));
    dispatch(closeRefF());
    dispatch(openSubF());
  };

  return (
    <Dialog
      open={openRef}
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
        Issue a refund
        <IconButton onClick={handleClose} sx={{}}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {viewHistory && (
          <Stack spacing={3}>
            <Typography variant="h5">Refund amount: JOD {viewHistory.amountJOD}</Typography>
            <Typography
              sx={{
                fontSize: '14px',
              }}
            >
              The customer will get their money back but will still be subscribed and charged next
              billing cycle, please don’t forget to cancel the subscription if needed.
            </Typography>

            <Alert sx={{ color: '#003768' }} severity="info">
              Refunds can take multiple days to appear on your customer's statement
            </Alert>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{ backgroundColor: '#FFAB00' }} onClick={handleSave}>
          Refund amount
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
