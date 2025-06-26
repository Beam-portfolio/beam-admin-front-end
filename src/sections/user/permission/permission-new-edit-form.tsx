'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/rhf-text-field';

const PermissionSchema = Yup.object().shape({
  name: Yup.string().required('Permission name is required'),
  description: Yup.string(),
});

export default function PermissionNewEditForm() {
  const methods = useForm({
    resolver: yupResolver(PermissionSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <RHFTextField name="name" label="Permission Name" />
          <RHFTextField name="description" label="Description" multiline rows={3} />
        </Stack>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Create Permission
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
