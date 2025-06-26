'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { usePublicResetContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Icon } from '@iconify/react';
import { SubmitButton } from 'src/components/auth-components';
import { Button, Box, OutlinedInput } from '@mui/material';

// ----------------------------------------------------------------------

type CodeInputProps = {
  length?: number;
  setValue: (name: 'code', value: string) => void;
  watch: (name: 'code') => string;
};

import React, { useRef } from 'react';

function CodeInput({ length = 6, setValue, watch }: CodeInputProps) {
  const value = watch('code') || '';
  const inputs = Array.from({ length }, (_, i) => value[i] || '');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (idx: number) => {
    const ref = inputRefs.current[idx];
    if (ref) ref.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;
    const chars = val.split('');
    const newValue = value.split('');
    newValue[idx] = chars[0];
    // If user pasted more than one character
    for (let i = 1; i < chars.length && idx + i < length; i++) {
      newValue[idx + i] = chars[i];
    }
    setValue('code', newValue.join('').slice(0, length));
    // Move focus
    const nextIdx = idx + chars.length < length ? idx + chars.length : length - 1;
    if (chars.length === 1 && val) focusInput(nextIdx);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      const newValue = value.split('');
      if (inputs[idx]) {
        // Clear current box and keep focus
        newValue[idx] = '';
        setValue('code', newValue.join(''));
        e.preventDefault();
      } else if (idx > 0) {
        // Move focus to previous and clear it
        newValue[idx - 1] = '';
        setValue('code', newValue.join(''));
        focusInput(idx - 1);
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('Text').replace(/[^0-9]/g, '');
    if (pasted.length > 1) {
      e.preventDefault();
      const chars = pasted.split('').slice(0, length);
      setValue('code', chars.join(''));
      setTimeout(() => focusInput(chars.length >= length ? length - 1 : chars.length), 0);
    }
  };

  return (
    <Box display="flex" gap={1} justifyContent="center" mb={2}>
      {inputs.map((char, idx) => (
        <OutlinedInput
          key={idx}
          id={`code-input-${idx}`}
          value={char}
          inputRef={(el) => (inputRefs.current[idx] = el)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center', fontSize: 24, width: 48, height: 56 },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, idx)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          sx={{
            '& input': { p: 0, textAlign: 'center' },
            width: 50,
            height: 50,
            borderRadius: 1,
          }}
        />
      ))}
    </Box>
  );
}

export default function JwtResetPasswordView({
  sent,
  setSent,
}: {
  sent: boolean;
  setSent: Dispatch<SetStateAction<boolean>>;
}) {
  const { resetPasswordWithCode } = usePublicResetContext();
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const password = useBoolean();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    code: Yup.string().required('Code is required').length(6, 'Code must be 6 digits'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPasswordWithCode(data.email, data.code, data.password);
      setSuccess(true);
      setErrorMsg('');
      // setSent(false);
      reset();
    } catch (error: any) {
      console.error(error.message);
      setErrorMsg(error?.message || 'Something went wrong');
    }
  });

  const renderHead = (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Typography variant="h4">Reset Password</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Please set your new password
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={1}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {success && <Alert severity="success">Password reset successfully! you can now login</Alert>}

      <RHFTextField name="email" label="Email address" />
      <CodeInput length={6} setValue={methods.setValue} watch={methods.watch} />

      <RHFTextField
        name="password"
        label="New Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <SubmitButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Reset Password
        <InputAdornment position="end">
          <IconButton onClick={password.onToggle} edge="end">
            <Icon icon="eva:arrow-ios-forward-fill" width="24" height="24" color="#fff" />
          </IconButton>
        </InputAdornment>
      </SubmitButton>

      <Stack spacing={0} direction="row" alignItems={'center'} justifyContent="space-between">
        <Button
          component={RouterLink}
          href={paths.auth.jwt.login}
          color="inherit"
          // variant="subtitle2"
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
            alignSelf: 'flex-end',
            m: 0,
            mt: -2,
          }}
        >
          Return to sign in
        </Button>
        <Link
          component={Button}
          onClick={() => {
            setSent(false);
          }}
          // href={paths.auth.jwt.forgotPassword}
          color="inherit"
          variant="subtitle2"
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
            alignSelf: 'flex-end',
          }}
        >
          Don’t have a code?
          <span style={{ color: '#DB2777', cursor: 'pointer' }}> Resend</span>
        </Link>
      </Stack>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {sent && !success && (
        <Alert sx={{ p: 0.5, mb: 1 }} severity="success">
          Password reset code sent to your email.
        </Alert>
      )}
      {renderForm}
    </FormProvider>
  );
}
