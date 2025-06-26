'use client';

import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/rhf-text-field';
import RHFMultiSelect from 'src/components/hook-form/rhf-multi-select';
import { IUser } from 'src/types/user';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { fetchRoles } from 'src/redux/slices/roleSlice';

const UserSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  roles: Yup.array().min(1, 'Please select at least one role'),
});

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: (data: any) => void;
  currentUser: Partial<IUser> | null;
};

export default function UserDialog({ open, onClose, onSubmit, currentUser }: Props) {
  const { roles } = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open && !roles.length) {
      dispatch(fetchRoles());
    }
  }, [open, roles.length, dispatch]);

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      roles: currentUser?.roles?.map((role) => role.id.toString()) || [],
    },
  });

  useEffect(() => {
    if (currentUser) {
      methods.reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        roles: currentUser.roles?.map((role) => role.id.toString()) || [],
      });
    } else {
      methods.reset({
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
      });
    }
  }, [currentUser, methods]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const roleOptions = roles.map((role) => ({
    value: role.id.toString(),
    label: role.name,
  }));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{currentUser ? 'Edit User' : 'Create New User'}</DialogTitle>

      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ py: 3 }}>
            <RHFTextField name="firstName" label="First Name" />
            <RHFTextField name="lastName" label="Last Name" />
            <RHFTextField name="email" label="Email" />

            <RHFMultiSelect
              name="roles"
              label="Roles"
              options={roleOptions}
              checkbox
              placeholder="Select roles"
              loading={!roles.length}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {currentUser ? 'Update User' : 'Create User'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
