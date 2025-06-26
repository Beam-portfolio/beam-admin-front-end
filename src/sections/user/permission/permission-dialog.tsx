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
import { IPermission } from 'src/types/permission';

const PermissionSchema = Yup.object().shape({
  name: Yup.string().required('Permission name is required'),
  key: Yup.string().required('Permission key is required'),
  resource: Yup.string().required('Resource is required'),
  action: Yup.string().required('Action is required'),
  description: Yup.string(),
});

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: (data: any) => void;
  currentPermission: Partial<IPermission> | null;
};

export default function PermissionDialog({ open, onClose, onSubmit, currentPermission }: Props) {
  const methods = useForm({
    resolver: yupResolver(PermissionSchema),
    defaultValues: {
      name: currentPermission?.name || '',
      key: currentPermission?.key || '',
      resource: currentPermission?.resource || '',
      action: currentPermission?.action || '',
      description: currentPermission?.description || '',
    },
  });

  useEffect(() => {
    if (currentPermission) {
      methods.reset({
        name: currentPermission.name,
        key: currentPermission.key,
        resource: currentPermission.resource,
        action: currentPermission.action,
        description: currentPermission.description,
      });
    } else {
      methods.reset({
        name: '',
        key: '',
        resource: '',
        action: '',
        description: '',
      });
    }
  }, [currentPermission, methods]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{currentPermission ? 'Edit Permission' : 'Create New Permission'}</DialogTitle>

      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ py: 3 }}>
            <RHFTextField name="name" label="Permission Name" />
            <RHFTextField name="key" label="Permission Key" />
            <RHFTextField name="resource" label="Resource" />
            <RHFTextField name="action" label="Action" />
            <RHFTextField name="description" label="Description" multiline rows={3} />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {currentPermission ? 'Update Permission' : 'Create Permission'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
