'use client';
import * as Yup from 'yup';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/auth/hooks';
import axiosInstance from '@/utils/axios';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeFields, fetchSettings, UpdateSettings } from '@/redux/slices/settings';
import { LoadingButton } from '@mui/lab';
import { SplashScreen } from '@/components/loading-screen';

const dataSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
});

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().required('New password is required'),
  confirmNewPassword: Yup.string()
    .required('Confirm new password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const accountSettingsSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  address: Yup.string().required('Address is required'),
  mapAddress: Yup.string().required('Map Address is required'),
  phone: Yup.string().required('Phone is required'),
  whatsapp: Yup.string().required('Whatsapp is required'),
  linkedin: Yup.string().required('linkedin is required'),
  github: Yup.string().required('Github is required'),
  about: Yup.string().required('About is required'),
})

const SettingsView = () => {
  const settings = useSettingsContext();
  const { user, resetPassword } = useAuthContext();
  const theme = useTheme();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const dispatch = useAppDispatch()
  const { settings: generalSettings, loading } = useAppSelector(state => state.settings)

  const handleChangeSetting = (e) => {
    const { name, value } = e.target

    console.log(e.target);

    dispatch(changeFields({ name, value }))
  }

  const [errors, setErrors] = useState({})

  const handleUpdatePassword = async () => {
    try {
      await changePasswordSchema.validateSync(
        { currentPassword, newPassword, confirmNewPassword },
        { abortEarly: false }
      );
      await resetPassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      toast.success('Password updated successfully');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(errors);
      }
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleSaveChanges = async () => {
    const data = {
      firstName,
      lastName,
      email,
    };
    try {
      await dataSchema.validateSync(data, { abortEarly: false });
      const response = await axiosInstance.patch(`/users/${user.id}`, data);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(errors);
      }
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleUpdateGeneralSettings = async () => {
    try {
      await accountSettingsSchema.validateSync(generalSettings, { abortEarly: false });
      await dispatch(UpdateSettings(generalSettings))
      await dispatch(fetchSettings())
      toast.success('Settings updated successfully')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(errors);
      }
      toast.error(error.message || 'Something went wrong')
    }
  }

  const defaultInputLabelSx = {
    color: 'rgba(108, 108, 179, 0.5)',
    '&.Mui-focused': {
      color: 'rgba(108, 108, 179, 0.5)',
    },
  };

  const defaultInputSx = {
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: '#D0D0D7 !important',
    borderRadius: 1,
  };

  useEffect(() => {
    dispatch(fetchSettings())
  }, [])

  if (loading) return <SplashScreen />

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your account preferences and system settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, background: `linear-gradient(135deg, #2563eb66 0%, #a855f791 100%)` }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Admin Settings
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={2} direction={'row'} alignItems={'center'}>
                <TextField
                  fullWidth
                  label="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    setErrors({
                      ...errors,
                      firstName: undefined,
                    })
                  }}
                  error={errors.firstName}
                  helperText={errors.firstName}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="LastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    setErrors({
                      ...errors,
                      lastName: undefined,
                    })
                  }}
                  error={errors.lastName}
                  helperText={errors.lastName}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors({
                      ...errors,
                      email: undefined,
                    })
                  }}
                  error={errors.email}
                  helperText={errors.email}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSaveChanges}
                  sx={{ bgcolor: 'primary.main', }}
                >
                  Save
                </Button>
              </Stack>

              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
              >
                <Typography variant="h6" sx={{ mb: 0 }}>
                  Password Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
                  Update your account password
                </Typography></Stack>
              {/* <Stack spacing={2}> */}
              <Stack spacing={2} direction={'row'} alignItems={'center'}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value)
                    setErrors({
                      ...errors,
                      currentPassword: undefined,
                    })
                  }}
                  error={errors.currentPassword}
                  helperText={errors.currentPassword}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    setErrors({
                      ...errors,
                      newPassword: undefined,
                    })
                  }}
                  error={errors.newPassword}
                  helperText={errors.newPassword}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value)
                    setErrors({
                      ...errors,
                      confirmNewPassword: undefined,
                    })
                  }}
                  error={errors.confirmNewPassword}
                  helperText={errors.confirmNewPassword}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                {/* <Sta item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}> */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleUpdatePassword}
                  sx={{ bgcolor: 'primary.main' }}
                >
                  Save
                </Button>
                {/* </Grid> */}
              </Stack>

            </Stack>
          </Card>

        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3, background: `linear-gradient(135deg, #2563eb66 0%, #a855f791 100%)` }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              General Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Update your account general Settings Address, Whatsapp ....
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={2} direction={'row'} alignItems={'center'}>
                <TextField
                  fullWidth
                  label="Email"
                  name='email'
                  type="text"
                  value={generalSettings.email}
                  onChange={(e) => handleChangeSetting(e)}
                  error={errors.email}
                  helperText={errors.email}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name='phone'
                  type="text"
                  value={generalSettings.phone}
                  onChange={(e) => handleChangeSetting(e)}
                  error={errors.phone}
                  helperText={errors.phone}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
              </Stack>
              <Stack spacing={2} direction={'row'} alignItems={'center'}>
                <TextField
                  fullWidth
                  label="Map Address"
                  name='mapAddress'
                  type="text"
                  value={generalSettings.mapAddress}
                  onChange={(e) => handleChangeSetting(e)}
                  error={errors.mapAddress}
                  helperText={errors.mapAddress}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Address"
                  name='address'
                  type="text"
                  value={generalSettings.address}
                  onChange={(e) => handleChangeSetting(e)}
                  error={errors.address}
                  helperText={errors.address}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />

              </Stack>
              <Stack spacing={2} direction={'row'} alignItems={'center'}>
                <TextField
                  fullWidth
                  label="Whatsapp"
                  name='whatsapp'
                  type="text"
                  value={generalSettings.whatsapp}
                  onChange={(e) => handleChangeSetting(e)}
                  error={errors.whatsapp}
                  helperText={errors.whatsapp}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="linkedin"
                  name='linkedin'
                  type="text"
                  value={generalSettings.linkedin}
                  onChange={(e) => handleChangeSetting(e)}
                  error={errors.linkedin}
                  helperText={errors.linkedin}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
              </Stack>
              <Stack spacing={2} direction={'row'} alignItems={'center'}>
                <TextField
                  fullWidth
                  label="Github"
                  name='github'
                  type="text"
                  value={generalSettings.github}
                  onChange={(e) => handleChangeSetting(e)}
                  error={errors.github}
                  helperText={errors.github}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="About"
                  name='about'
                  type="text"
                  value={generalSettings.about}
                  onChange={(e) => handleChangeSetting(e)}
                  error={errors.about}
                  helperText={errors.about}
                  InputLabelProps={{
                    sx: {
                      ...defaultInputLabelSx,
                    },
                  }}
                  inputProps={{
                    sx: {
                      ...defaultInputSx,
                    },
                  }}
                />
              </Stack>
              {/* <Box> */}
              <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
                <LoadingButton
                  variant="contained"
                  onClick={handleUpdateGeneralSettings}
                  loading={loading}
                  size='large'
                  sx={{ bgcolor: 'primary.main' }}
                >
                  Save
                </LoadingButton>
              </Stack>
              {/* </Box> */}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsView;
