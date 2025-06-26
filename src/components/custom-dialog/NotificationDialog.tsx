import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import {
  changeStateValue,
  closeNotificationsDialog,
  setError,
  setSOptions,
} from 'src/redux/slices/notificationSlice';
import axios from 'src/utils/axios';
import { useBoolean } from '@/hooks/use-boolean';
import { fetchServices } from '@/redux/slices/productsReducer';
import { useAppDispatch } from '@/redux/hooks';

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export default function NotificationDialog() {
  const dispatch = useAppDispatch();
  const open = useSelector((state: RootState) => state?.NotificationsSlice?.openNotification);
  const target = useSelector((state: RootState) => state?.NotificationsSlice?.target);
  const targetId = useSelector((state: RootState) => state?.NotificationsSlice?.targetId);
  const title = useSelector((state: RootState) => state?.NotificationsSlice?.title);
  const content = useSelector((state: RootState) => state?.NotificationsSlice?.content);
  const services = useSelector((state: RootState) => state?.service?.services);
  const SOptions = useSelector((state: RootState) => state?.NotificationsSlice?.SOptions);

  const error = useSelector((state: RootState) => state?.NotificationsSlice?.error);
  const loading = useBoolean();
  const handleClose = () => {
    dispatch(closeNotificationsDialog());
  };

  const handleConfirm = async () => {
    const newErrors: any = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title for the category';
    }

    if (!content.trim()) {
      newErrors.content = 'Please content a target';
    }

    if (!target.trim()) {
      newErrors.target = 'Please enter a target';
    }

    if (Object.keys(newErrors).length > 0) {
      dispatch(setError(newErrors));
      return;
    }

    const requestBody = {
      type: 'general',
      title,
      message: 'We have added a new service!',
      body: content,
    };

    try {
      loading.onTrue();

      const response = await axios.post(
        `/notifications/?targetGroup=${target}&targetId=${targetId}`,
        requestBody
      );
      if (response.data.message === 'Notification sent successfully') {
        dispatch(setError({}));
        dispatch(changeStateValue({ type: 'target', value: '' }));
        dispatch(changeStateValue({ type: 'title', value: '' }));
        dispatch(changeStateValue({ type: 'content', value: '' }));
        dispatch(changeStateValue({ type: 'targetId', value: '' }));
        dispatch(closeNotificationsDialog());
        // dispatch
        loading.onFalse();
      } else {
        dispatch(setError({}));
        dispatch(closeNotificationsDialog());
        loading.onFalse();
      }
    } catch (error) {
      setError({ error: error.message });
    }
  };

  React.useEffect(() => {
    async function fetchS() {
      await dispatch(fetchServices());
    }
    fetchS();
  }, []);

  React.useEffect(() => {
    if (services.length) {
      const dropOptions = services.map((service) => ({
        label: service.title,
        value: service.id,
      }));
      dispatch(setSOptions(dropOptions));
    }
  }, [services]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Send a notification</DialogTitle>
      <DialogContent
        sx={{
          pb: 3,
        }}
      >
        <FormControl
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 3,
          }}
          fullWidth
        >
          {error.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.error}
            </Alert>
          )}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '50%', mt: 1 }}>
              <InputLabel id="SendTo-simple-select-label">Send to</InputLabel>
              <Select
                error={!!error.target}
                labelId="SendTo-simple-select-label"
                id="SendTo-simple-select"
                label="Send To"
                name="SendTo"
                value={target}
                defaultValue="ALL_BOOKED_CUSTOMERS"
                onChange={(event) =>
                  dispatch(changeStateValue({ type: 'target', value: event.target.value }))
                }
              >
                <MenuItem value="ALL_BOOKED_CUSTOMERS">All booked customers</MenuItem>
                <MenuItem value="CUSTOMERS_BOOKED_SERVICE">Service</MenuItem>
                <MenuItem value="CUSTOMERS_SPECIFIC_CLASS">Specific class</MenuItem>
              </Select>
            </FormControl>
            {target === 'CUSTOMERS_BOOKED_SERVICE' && (
              <FormControl sx={{ width: '50%', mt: 1 }}>
                <InputLabel id="Service-simple-select-label">Service</InputLabel>
                <Select
                  error={!!error.targetId}
                  labelId="Service-simple-select-label"
                  id="Service-simple-select"
                  label="Service"
                  name="targetId"
                  value={targetId}
                  // defaultValue='ALL_BOOKED_CUSTOMERS'
                  onChange={(event) =>
                    dispatch(changeStateValue({ type: 'targetId', value: event.target.value }))
                  }
                >
                  {SOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          <TextField
            error={!!error.title}
            helperText={error.title}
            fullWidth
            type="text"
            placeholder="Notification title"
            name="title"
            value={title}
            onChange={(event) =>
              dispatch(changeStateValue({ type: 'title', value: event.target.value }))
            }
          />
          <TextField
            error={!!error.content}
            helperText={error.content}
            fullWidth
            type="text"
            multiline
            rows={3}
            placeholder="Notification content"
            name="content"
            value={content}
            onChange={(event) =>
              dispatch(changeStateValue({ type: 'content', value: event.target.value }))
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          border: '1px dashed #919EAB33',
        }}
      >
        <Button
          sx={{
            backgroundColor: '#212B36',
            color: '#fff',
            border: '1px solid #212B36',
            '&:hover': {
              backgroundColor: 'transparent',
              border: '1px solid #212B36',
              color: '#212B36',
            },
          }}
          onClick={handleConfirm}
        >
          Send notification
        </Button>
        <Button
          sx={{
            border: '1px solid #ccc',
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
