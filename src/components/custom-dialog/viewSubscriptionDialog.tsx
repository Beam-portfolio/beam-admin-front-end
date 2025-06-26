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
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import {
  closeSubF,
  closeViewRow,
  openCancelSub,
  setRefund,
} from '@/redux/slices/subscriptionsSlice';
import React, { useEffect } from 'react';
import { TransitionProps } from 'notistack';
import Label from '../label';
import Iconify from '../iconify';

interface ViewSubscriptionDialogProps {
  data: any;
  openSub: boolean;
  onClose: () => void;
  handleOpenRef: () => void;
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export function ViewSubscriptionDialog({
  onClose,
  data,
  openSub,
  handleOpenRef,
}: ViewSubscriptionDialogProps) {
  const subscriptions = useSelector((state: any) => state.SubscriptionsSlice.subscriptions);
  const Subscription = subscriptions.find(
    (subscription: ISubscription) => subscription?.user?.id === data[0]?.user?.id
  );

  const [history, setHistory] = React.useState<
    { id: string; amountJOD: string; credits: string; status: string; createdAt: string }[]
  >([]);

  const customer = data[0]?.user;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeViewRow());
    dispatch(closeSubF());
  };

  useEffect(() => {
    if (data) {
      const newHis =
        Array.isArray(data) &&
        data?.map((item: any) => ({
          id: item.id,
          amountJOD: item.amountJOD,
          credits: item.credits,
          status: item.status,
          createdAt: item.createdAt,
        }));
      setHistory(newHis || []);
    }
  }, [data]);

  return (
    <Dialog
      open={openSub}
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
          p: 2,
        }}
      >
        Subscription details
        <IconButton onClick={handleClose} sx={{}}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {Subscription && (
          <Stack spacing={2} sx={{}}>
            <Stack
              sx={{
                p: 2,
                // m: 2,
                boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                }}
              >
                Current subscription
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <ListItemText
                  primary={`${Subscription.credits} Credits/month`}
                  secondary={`JOD ${Subscription.amountJOD} charged every month`}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    fontSize: '12px',
                  }}
                />

                <LoadingButton
                  sx={{
                    mr: 2,
                    color: '#B71D18',
                    backgroundColor: '#FF563014',
                  }}
                  onClick={() => {
                    dispatch(openCancelSub());
                  }}
                >
                  Cancel subscription
                </LoadingButton>
              </Box>
            </Stack>

            <Stack
              sx={{
                p: 2,
                boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Customer
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1,
                }}
              >
                <Avatar alt={customer.fullName} src={customer.profilePicture} sx={{ mr: 2 }} />

                <ListItemText
                  primary={customer.fullName}
                  secondary={customer.email}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                  }}
                />
              </Box>
            </Stack>

            <Stack spacing={3}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  mb: 0,
                  mt: 1,
                }}
              >
                Billing history
              </Typography>
            </Stack>
            <Stack spacing={0} sx={{ p: 2 }}>
              {history.length > 0 &&
                history.map((item: any) => (
                  <Box
                    key={item.id}
                    sx={{
                      width: '100%',
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '0.5px dashed #919EAB33',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 3,
                      }}
                    >
                      <Typography>{fDate(item.createdAt)}</Typography>
                      <Label
                        variant="soft"
                        color={
                          (item.status === 'paid' && 'success') ||
                          (item.status === 'canceled' && 'error') ||
                          'default'
                        }
                      >
                        {item.status}
                      </Label>
                      <Typography>JOD {item.amountJOD}</Typography>
                    </Box>
                    <LoadingButton
                      sx={{
                        color: '#212B36',
                        border: '0.5px solid #919EAB52',
                        p: 0.5,
                      }}
                      onClick={() => {
                        dispatch(setRefund(item));
                        handleOpenRef();
                      }}
                    >
                      Refund
                    </LoadingButton>
                  </Box>
                ))}
            </Stack>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
