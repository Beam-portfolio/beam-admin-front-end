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
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { fetchPermissions } from 'src/redux/slices/permissionSlice';
import { IRole } from 'src/types/role';

const RoleSchema = Yup.object().shape({
  name: Yup.string().required('Role name is required'),
  description: Yup.string(),
  permissions: Yup.array().min(1, 'Please select at least one permission'),
});

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: (data: any) => void;
  currentRole?: Partial<IRole> | null;
};

export default function RoleDialog({ open, onClose, onSubmit, currentRole }: Props) {
  const dispatch = useAppDispatch();
  const { permissions, loading } = useAppSelector((state) => state.permission);

  const methods = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues: {
      name: currentRole?.name || '',
      description: currentRole?.description || '',
      permissions: currentRole?.permissions?.map((p) => String(p.id)) || [],
    },
  });

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  useEffect(() => {
    if (currentRole) {
      methods.reset({
        name: currentRole.name,
        description: currentRole.description,
        permissions: currentRole.permissions?.map((p) => String(p.id)) || [],
      });
    } else {
      methods.reset({
        name: '',
        description: '',
        permissions: [],
      });
    }
  }, [currentRole, methods]);

  // Update the debug logging
  console.log('Current Role:', currentRole);
  console.log(
    'Current Role Permissions:',
    currentRole?.permissions?.map((p) => ({
      id: p.id,
      name: p.name,
      resource: p.resource,
      action: p.action,
    }))
  );

  // Or for a more concise version:
  console.log(
    'Current Role Permissions:',
    currentRole?.permissions?.map((p) => `${p.name} (${p.resource}:${p.action})`)
  );

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const permissionOptions = permissions.map((permission) => ({
    value: permission.id.toString(),
    label: `${permission.resource} - ${permission.action}`,
  }));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{currentRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>

      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ py: 3 }}>
            <RHFTextField name="name" label="Role Name" />

            <RHFTextField name="description" label="Description" multiline rows={3} />

            <RHFMultiSelect
              name="permissions"
              label="Permissions"
              options={permissionOptions}
              checkbox
              placeholder="Select permissions"
              loading={loading}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {currentRole ? 'Update Role' : 'Create Role'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
