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
import { changeNewInterest, setEditMode } from 'src/redux/slices/InterestsSlice';
import { UploadBox } from '../upload';
import Iconify from '../iconify';

interface CreateInterestDialogProps {
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

export function CreateInterestDialog({ onClose, open, handleSave }: CreateInterestDialogProps) {
  const newInterest = useSelector((state: any) => state.InterestsSlice.newInterest);
  const ladingB = useSelector((state: any) => state.InterestsSlice.ladingB);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.InterestsSlice.error);

  const handleClose = () => {
    dispatch(changeNewInterest({ value: '', field: 'image' }));
    dispatch(changeNewInterest({ value: '', field: 'description' }));
    dispatch(changeNewInterest({ value: '', field: 'name' }));
    dispatch(setEditMode(null));
    onClose();
  };

  const handleFileDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      dispatch(changeNewInterest({ value: file, field: 'image' }));
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeNewInterest({
        value: e.target.value,
        field: 'name',
      })
    );
  };

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeNewInterest({
        value: e.target.value,
        field: 'description',
      })
    );
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
        {newInterest.id ? `Update ${newInterest.name} Interest` : 'Create a new Interest'}
        <IconButton onClick={handleClose} sx={{}}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                pl: 1,
              }}
            >
              Ad banner
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#637381',
                pl: 1,
              }}
            >
              Upload an image with 2:1 ratio to make sure it doesn’t get cropped
            </Typography>
            <UploadBox
              placeholder="Upload file"
              sx={{ width: 1, height: '10em' }}
              onDrop={handleFileDrop}
              preview={typeof newInterest.image === 'string' ? newInterest.image : previewUrl}
              error={error && error.image}
              helperText={error && error.image}
            />
          </Box>
          <TextField
            id="outlined-disabled"
            label="Name"
            value={newInterest.name}
            fullWidth
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': {
                // Set the border style to dashed
              },
            }}
            error={error && error.name}
            helperText={error && error.name}
            onChange={handleChangeTitle}
          />

          <TextField
            id="outlined"
            label="Description"
            value={newInterest.description}
            fullWidth
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': {
                // Set the border style to dashed
              },
            }}
            error={error && error.description}
            helperText={error && error.description}
            onChange={handleChangeUrl}
          />
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
