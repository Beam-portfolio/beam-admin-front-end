'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import RHFMultiSelect from 'src/components/hook-form/rhf-multi-select';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// redux
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { createUser } from 'src/redux/slices/userSlice';
import { fetchRoles } from 'src/redux/slices/roleSlice';

export default function UserCreateView() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { roles } = useAppSelector((state) => state.role);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    roles: Yup.array().min(1, 'Please select at least one role'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      await dispatch(createUser(data)).unwrap();
      enqueueSnackbar('User created successfully!');
      router.push(paths.dashboard.user.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to create user!', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  });

  const roleOptions = roles.map((role) => ({
    value: role.id.toString(),
    label: role.name,
  }));

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.list },
          { name: 'New user' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="firstName" label="First name" />
              <RHFTextField name="lastName" label="Last name" />
            </Stack>

            <RHFTextField name="email" label="Email address" />

            <RHFTextField name="password" label="Password" type="password" />

            <RHFMultiSelect
              name="roles"
              label="Roles"
              options={roleOptions}
              checkbox
              placeholder="Select roles"
              loading={!roles.length}
            />

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Create User
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
    </Container>
  );
}
