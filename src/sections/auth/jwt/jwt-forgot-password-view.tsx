'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { usePublicResetContext } from 'src/auth/hooks';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { Icon } from '@iconify/react';
import { useBoolean } from '@/hooks/use-boolean';
import { SubmitButton } from 'src/components/auth-components';
import JwtResetPasswordView from './jwt-reset-password-view';

// ----------------------------------------------------------------------

export default function JwtForgotPasswordView() {
  const { sendResetCode } = usePublicResetContext();

  const [errorMsg, setErrorMsg] = useState('');
  const [sent, setSent] = useState(false);
  const send = useBoolean();

  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await sendResetCode(data.email);
      setSent(true);
      setErrorMsg('');
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error?.message || 'Something went wrong');
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Forgot your password?</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Please enter the email address associated with your account and we will email you a link to
        reset your password.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <SubmitButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Send Request
        <InputAdornment position="end">
          <IconButton onClick={send.onToggle} edge="end">
            <Icon icon="eva:arrow-ios-forward-fill" width="24" height="24" color="#fff" />
          </IconButton>
        </InputAdornment>
      </SubmitButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          alignSelf: 'flex-end',
          ml: 1,
        }}
      >
        Return to sign in
      </Link>
    </Stack>
  );

  const renderWelcome = (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      spacing={2}
      sx={{
        borderTopLeftRadius: 'inherit',
        borderBottomLeftRadius: 'inherit',
        width: '50%',
        height: '100%',
        backgroundImage: `
      linear-gradient(to top right, rgba(236, 72, 153, 0.8),  rgba(139, 92, 246, 0.8)),
      url('/assets/background/authForm.png')
    `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF',
      }}
    >
      <Typography variant="h5">Welcome to AL KHAIL</Typography>
      <Typography
        sx={{
          maxWidth: '50%',
          textAlign: 'center',
        }}
        variant="body2"
      >
        A one-stop shop offering a wide variety of products for all your needs
      </Typography>
    </Stack>
  );

  return (
    <Stack
      sx={{
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        position: 'relative',
      }}
    >
      <StyledAuthWrapper
        sx={{
          width: '60% !important',
          height: '83% !important',
          maxHeight: '650px',
          boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.1), 0px 4px 6px 0px rgba(0, 0, 0, 0.1) ',
        }}
      >
        {renderWelcome}
        <Box
          sx={{
            width: '50%',
            p: '2em !important',
          }}
        >
          {sent ? (
            <JwtResetPasswordView setSent={setSent} sent={sent} />
          ) : (
            <FormProvider methods={methods} onSubmit={onSubmit}>
              {renderHead}
              {renderForm}
            </FormProvider>
          )}
        </Box>
      </StyledAuthWrapper>
    </Stack>
  );
}
