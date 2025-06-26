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
  Avatar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TransitionProps } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import Iconify from '../iconify';
import {
  changeNewCustomerWord,
  setEditMode,
  createCustomerWord,
  updateCustomerWord,
  setError,
  setLadingB,
  closeCreateDialog,
  fetchCustomerWords,
} from '@/redux/slices/customerWordSlice';
import { useAppDispatch } from '@/redux/hooks';
import UploadAvatar from '../upload/upload-avatar';
import axiosInstance from '@/utils/axios';
import { getFileNameFromUrl } from '@/utils/file';
import { useSnackbar } from 'notistack';

interface CreateCustomerWordDialogProps {
  open: boolean;
  onClose: () => void;
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export function CreateCustomerWordDialog({ onClose, open }: CreateCustomerWordDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const newCustomerWord = useSelector((state: any) => state.customerWord.newCustomerWord);
  const ladingB = useSelector((state: any) => state.customerWord.ladingB);
  const editMode = useSelector((state: any) => state.customerWord.editMode);
  const error = useSelector((state: any) => state.customerWord.error);
  const dispatch = useAppDispatch();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [prevAvatarUrl, setPrevAvatarUrl] = useState<string | null>(null);
  const [avatarToDeleteOnSave, setAvatarToDeleteOnSave] = useState<string | null>(null);

  useEffect(() => {
    if (newCustomerWord.avatar && typeof newCustomerWord.avatar === 'string') {
      setAvatarPreview(newCustomerWord.avatar);
      setPrevAvatarUrl(newCustomerWord.avatar);
    } else {
      setAvatarPreview(null);
      setPrevAvatarUrl(null);
    }
    setAvatarFile(null);
  }, [open, newCustomerWord.avatar]);

  const handleClose = () => {
    dispatch(changeNewCustomerWord({ value: '', field: 'avatar' }));
    dispatch(changeNewCustomerWord({ value: '', field: 'name' }));
    dispatch(changeNewCustomerWord({ value: '', field: 'nickName' }));
    dispatch(changeNewCustomerWord({ value: '', field: 'word' }));
    dispatch(setEditMode(null));
    onClose();
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeNewCustomerWord({ value: e.target.value, field }));
  };

  const handleAvatarDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // If in edit mode and previous avatar was a URL, store it for deletion on save
      if (editMode && prevAvatarUrl && prevAvatarUrl.startsWith('http')) {
        setAvatarToDeleteOnSave(prevAvatarUrl);
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      dispatch(changeNewCustomerWord({ value: '', field: 'avatar' }));
    }
  };

  const handleRemoveAvatar = async () => {
    if (editMode && prevAvatarUrl && prevAvatarUrl.startsWith('http')) {
      const fileName = getFileNameFromUrl(prevAvatarUrl);
      if (fileName) {
        try {
          await axiosInstance.delete(`/v1/files/${fileName}`);
        } catch (err) {
          console.error(`Failed to delete previous avatar ${fileName}:`, err);
        }
      }
    }
    setAvatarFile(null);
    setAvatarPreview(null);
    dispatch(changeNewCustomerWord({ value: '', field: 'avatar' }));
  };

  const handleSave = async () => {
    const newErrors: any = {};
    if (!newCustomerWord.name?.trim()) newErrors.name = 'Please enter the customer name';
    if (!newCustomerWord.nickName?.trim()) newErrors.nickName = 'Please enter the customer nickname';
    if (!newCustomerWord.word?.trim()) newErrors.word = 'Please enter the testimonial';
    if (Object.keys(newErrors).length > 0) {
      dispatch(setError(newErrors));
      return;
    }
    dispatch(setLadingB(true));
    let avatarUrl = newCustomerWord.avatar;
    if (avatarFile) {
      const formData = new FormData();
      formData.append('file', avatarFile);
      try {
        const res = await axiosInstance.post('/v1/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        avatarUrl = res.data.url || res.data.path || res.data;
      } catch (uploadErr: any) {
        dispatch(setError({ avatar: uploadErr?.message || 'Failed to upload avatar' }));
        enqueueSnackbar(uploadErr?.message || 'Failed to upload avatar', { variant: 'error' });
        dispatch(setLadingB(false));
        return;
      }
    }
    const payload = { ...newCustomerWord, avatar: avatarUrl };
    try {
      let resultAction;
      if (!editMode) {
        resultAction = await dispatch(createCustomerWord(payload));
      } else {
        resultAction = await dispatch(updateCustomerWord({ id: editMode, customerWord: payload }) as any);
      }
      // Handle error response from API or Redux thunk
      if (resultAction?.error) {
        // Try to extract the most informative error message
        let msg = 'Failed to save testimonial';
        if (resultAction.error.message) {
          msg = resultAction.error.message;
        } else if (typeof resultAction.error === 'string') {
          msg = resultAction.error;
        } else if (resultAction.error.error && resultAction.error.error.message) {
          msg = resultAction.error.error.message;
        } else if (resultAction.error.error && typeof resultAction.error.error === 'string') {
          msg = resultAction.error.error;
        }
        enqueueSnackbar(msg, { variant: 'error' });
        dispatch(setLadingB(false));
        return;
      }
      await dispatch(fetchCustomerWords());
      enqueueSnackbar(
        editMode ? 'Testimonial updated successfully!' : 'Testimonial created successfully!',
        { variant: 'success' }
      );
      // After successful save, delete the old avatar if needed
      if (avatarToDeleteOnSave && avatarToDeleteOnSave.startsWith('http')) {
        const fileName = getFileNameFromUrl(avatarToDeleteOnSave);
        if (fileName) {
          try {
            await axiosInstance.delete(`/v1/files/${fileName}`);
          } catch (err) {
            enqueueSnackbar(`Failed to delete previous avatar: ${fileName}`, { variant: 'warning' });
          }
        }
        setAvatarToDeleteOnSave(null);
      }
      dispatch(setLadingB(false));
      handleClose();
    } catch (err: any) {
      let msg = err?.message || err?.response?.data?.message || 'Something went wrong';
      if (err?.response?.data?.error?.status === 'error' && err?.response?.data?.message) {
        msg = err.response.data.message;
      }
      enqueueSnackbar(msg, { variant: 'error' });
      dispatch(setLadingB(false));
    }
  };


  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullWidth
      keepMounted
      onClose={handleClose}
      aria-describedby="customer-word-dialog-slide"
      BackdropProps={{ sx: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }}
    >
      <DialogTitle
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}
      >
        {editMode ? `Update Testimonial` : 'Add a new Testimonial'}
        <IconButton onClick={handleClose}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <TextField
            id="customer-name"
            label="Name"
            value={newCustomerWord.name || ''}
            fullWidth
            required
            error={error && error.name}
            helperText={error && error.name}
            onChange={handleChange('name')}
          />
          <TextField
            id="customer-nickname"
            label="Nickname (e.g. CEO, Startup X)"
            value={newCustomerWord.nickName || ''}
            fullWidth
            required
            error={error && error.nickName}
            helperText={error && error.nickName}
            onChange={handleChange('nickName')}
          />
          <TextField
            id="customer-word"
            label="Testimonial"
            value={newCustomerWord.word || ''}
            fullWidth
            required
            multiline
            minRows={2}
            error={error && error.word}
            helperText={error && error.word}
            onChange={handleChange('word')}
          />
          <Stack direction="column" alignItems="flex-start" spacing={2}>
          <Typography variant="body2" color="text.secondary">
              Upload a customer photo (optional)
            </Typography>
            <UploadAvatar
              file={avatarFile ? Object.assign(avatarFile, { preview: avatarPreview || '' }) : (avatarPreview || null)}
              error={!!error?.avatar}
              helperText={error && error.avatar}
              onDelete={handleRemoveAvatar}
              onDrop={handleAvatarDrop}
            />

          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={ladingB} sx={{ backgroundColor: '#212B36', color: '#fff' }} onClick={handleSave}>
          {editMode ? 'Update' : 'Publish'}
        </LoadingButton>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
