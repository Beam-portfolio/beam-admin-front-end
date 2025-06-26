/* eslint-disable react-hooks/exhaustive-deps */
/*
  ProjectNewEditForm: Create/Edit Project Form
  - Fields match backend Project entity
  - Supports both create and edit modes
  - Uses Material-UI and react-hook-form
*/

import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import dayjs from 'dayjs';
import {
  Card,
  Stack,
  Grid,
  MenuItem,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import ProjectFormSectionTitle from './ProjectsFormSectionTitle';
import { useAuthContext } from '@/auth/hooks';
import axiosInstance from '@/utils/axios';
import { getFileNameFromUrl } from '@/utils/file';
import { fetchTypes } from '@/redux/slices/projectsSlice';
import { MultiValueInput } from '@/components/inputs';

export type ProjectFormValues = {
  technologies?: any;
  liveLink?: string | null;
  surceCode?: string | null;
  type?: any;
  title: string;
  img: string;
  status: string;
  Price: number;
  description: string;
  fromDate: Date;
  toDate: Date;
  gallery?: string[];
  typeId: string;
  stack: string;
  subtitle: string;
  testimonial: string;
};
const ProjectSchema: Yup.ObjectSchema<ProjectFormValues> = Yup.object().shape({
  technologies: Yup.array().of(Yup.string().required('Technology is required')).min(1, 'At least one technology is required').required('At least one technology is required'),
  liveLink: Yup.string().url('Must be a valid URL').nullable().notRequired(),
  surceCode: Yup.string().url('Must be a valid URL').nullable().notRequired(),
  title: Yup.string().required('Project title is required'),
  img: Yup.string().required('Main image is required'),
  status: Yup.string().required('Status is required'),
  Price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive'),
  description: Yup.string().required('Description is required'),
  fromDate: Yup.date().required('Date is required'),
  toDate: Yup.date().required('Date is required'),
  gallery: Yup.array().of(Yup.string().required('Gallery image is required')).max(4),
  typeId: Yup.string().required('Type ID is required')
    .required('Type is required'),
  type: Yup.object().nullable(),
  stack: Yup.string().required('Stack is required'),
  subtitle: Yup.string().required('Subtitle is required'),
  testimonial: Yup.string().required('Testimonial is required'),
});



type Props = {
  currentProject?: any;
};
const PROJECT_STATUS_OPTIONS = ['completed', 'in progress', 'not started']
type GalleryImage = {
  file: File | null;
  preview: string;
  id?: number;
  projectId?: number | string;
  isNew?: boolean;
};

export default function ProjectNewEditForm({ currentProject }: Props) {
  const [removedGalleryImageIds, setRemovedGalleryImageIds] = useState<number[]>([]);
  // ...existing hooks
  const router = useRouter();
  const theme = useTheme()
  const { types } = useAppSelector((state) => state.projects);
  const [mainImage, setMainImage] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { user } = useAuthContext();

  const defaultValues: ProjectFormValues = {
    technologies: currentProject?.technologies || [],
    liveLink: currentProject?.liveLink || '',
    surceCode: currentProject?.surceCode || '',
    title: currentProject?.title || '',
    img: currentProject?.img || '',
    status: currentProject?.status || 'active',
    Price: currentProject?.Price ?? undefined,
    description: currentProject?.description || '',
    fromDate: currentProject?.fromDate
      ? dayjs(currentProject.fromDate).toDate()
      : new Date(),
    toDate: currentProject?.toDate
      ? dayjs(currentProject.toDate).toDate()
      : new Date(),
    gallery: Array.isArray(currentProject?.gallery)
      ? currentProject.gallery.filter((v: any): v is string => typeof v === 'string')
      : [],
    typeId: currentProject?.type.id || '',
    type: currentProject?.type || null,
    stack: currentProject?.stack || '',
    subtitle: currentProject?.subtitle || '',
    testimonial: currentProject?.testimonial || '',
  };


  const memoizedDefaults = useMemo(() => defaultValues, [currentProject]);

  const methods = useForm<ProjectFormValues>({
    resolver: yupResolver(ProjectSchema),
    defaultValues: memoizedDefaults,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, },
  } = methods;
  const values = watch();

  const onSubmit = async (data: any) => {
    try {
      let imageUrl = data.img;
      console.log('mainImage:', mainImage, 'type:', typeof mainImage, 'instanceof File:', mainImage instanceof File);
      if (mainImage instanceof File) {
        if (currentProject && currentProject.img && currentProject.img.startsWith('http')) {
          const fileName = getFileNameFromUrl(currentProject.img);
          if (fileName) {
            try {
              await axiosInstance.delete(`/v1/files/${fileName}`);
            } catch (err) {
              console.error(`Failed to delete old main image ${fileName}:`, err);
            }
          }
        }
        const formData = new FormData();
        formData.append('file', mainImage);
        const uploadRes = await axiosInstance.post('/v1/files/upload', formData);
        imageUrl = uploadRes.data.url;
      }

      const filesToUpload = galleryImages.filter(img => img.file instanceof File);
      const existingUrls = galleryImages
        .filter(img => typeof img.preview === 'string' && !img.file)
        .map(img => img.preview);

      const uploadedUrls: string[] = [];
      for (const img of filesToUpload) {
        const formData = new FormData();
        formData.append('file', img.file as File);
        const uploadRes = await axiosInstance.post('/v1/files/upload', formData);
        uploadedUrls.push(uploadRes.data.url);
      }

      const finalGallery = [...existingUrls, ...uploadedUrls];

      let imagesToDelete: string[] = [];
      if (currentProject) {
        const originalGallery: string[] = Array.isArray(currentProject.gallery)
          ? currentProject.gallery
          : [];
        imagesToDelete = originalGallery.filter(
          (url: string) => !finalGallery.includes(url) && url.startsWith('http')
        );
        for (const url of imagesToDelete) {
          const fileName = getFileNameFromUrl(url);
          if (fileName) {
            try {
              await axiosInstance.delete(`/v1/files/${fileName}`);
            } catch (err) {
              console.error(`Failed to delete file ${fileName}:`, err);
            }
          }
        }
      }

      data.img = imageUrl;
      data.gallery = finalGallery;
      const te = types?.find((type: any) => +type.id === +data.typeId);
      data.type = te;

      if (!currentProject) {
        await axiosInstance.post('/projects', { ...data });
        enqueueSnackbar('Project created successfully!', { variant: 'success' });
        router.push('/dashboard/projects');
      } else {
        await axiosInstance.patch(`/projects/${currentProject.id}`, { ...data });
        enqueueSnackbar('Project updated successfully!', { variant: 'success' });
        router.push('/dashboard/projects');
      }
    } catch (error: any) {
      enqueueSnackbar(`Something went wrong: ${error?.message || error}`, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (currentProject && currentProject.projectGallery) {
      setGalleryImages(
        currentProject.projectGallery.map((img: any) => ({
          file: null,
          preview: img.image,
          id: img.id,
          projectId: img.projectId,
          isNew: false,
        }))
      );
      setRemovedGalleryImageIds([]); // reset removals on project change
      setValue('gallery', currentProject.projectGallery.map((img: any) => img.image));
    }
  }, [currentProject, setValue]);

  const handleDropMainImage = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setMainImage(file);
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          setValue('img', base64Image);
        };
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (!types || types.length === 0) {
      dispatch(fetchTypes());
    }
  }, [dispatch]);

  const handleDropGalleryImages = useCallback(
    (acceptedFiles: File[]) => {
      const newGalleryImages = [
        ...galleryImages,
        ...acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          isNew: true,
        })),
      ];
      setGalleryImages(newGalleryImages);
      setValue('gallery', newGalleryImages.map((img) => img.preview));
    },
    [galleryImages, setValue]
  );

  const onRemoveImage = useCallback(
    async (fileOrPreview: File | string) => {
      setGalleryImages((prev) => {
        const previewToRemove =
          typeof fileOrPreview === 'string'
            ? fileOrPreview
            : (fileOrPreview as any).preview || '';
        const toRemove = prev.find((img) => img.preview === previewToRemove);

        // If the image is an existing one (has id and preview is a URL), delete from server
        if (toRemove && toRemove.id && typeof toRemove.preview === 'string' && toRemove.preview.startsWith('http')) {
          const fileName = getFileNameFromUrl(toRemove.preview);
          if (fileName) {
            axiosInstance.delete(`/v1/files/${fileName}`).catch((err) => {
              console.error(`Failed to delete gallery image ${fileName}:`, err);
            });
          }
          setRemovedGalleryImageIds((ids) => [...ids, toRemove.id!]);
        }

        const updated = prev.filter((img) => img.preview !== previewToRemove);
        setValue('gallery', updated.map((img) => img.preview));
        return updated;
      });
    },
    [setGalleryImages, setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Left column: Section titles */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <ProjectFormSectionTitle title="Project Details" />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{
            p: 3, mb: 3,
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            color: '#D0D0D7'
          }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <RHFTextField name="title" label="Title" />
                <RHFTextField name="subtitle" label="Subtitle" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <RHFTextField name="stack" label="Stack" />
                <RHFTextField name="testimonial" label="Testimonial" />
              </Stack>
              <RHFTextField name="description" label="Description" multiline rows={4}
                sx={{ bgcolor: '#D0D0D7 !important', borderRadius: 1 }} />
              <Stack direction="row" spacing={2}>
                <RHFTextField name="status" label="Status" select>
                  {PROJECT_STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </RHFTextField>
                <RHFTextField name="typeId" label="Type" select>
                  {types?.map((type: any) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Stack>
              <Controller
                name="fromDate"
                control={methods.control}
                render={({ field }) => (
                  <RHFTextField
                    name="fromDate"
                    label="From Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dayjs(field.value).format('YYYY-MM-DD')}
                    onChange={(e) => field.onChange(dayjs(e.target.value).toDate())}
                  />
                )}
              />
              <Controller
                name="toDate"
                control={methods.control}
                render={({ field }) => (
                  <RHFTextField
                    name="toDate"
                    label="To Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dayjs(field.value).format('YYYY-MM-DD')}
                    onChange={(e) => field.onChange(dayjs(e.target.value).toDate())}
                  />
                )}
              />
              <RHFTextField
                error={!!errors.Price}
                helperText={errors.Price?.message}
                name="Price"
                label="Price"
                type="number"
              />

              {/* Technologies Input */}
              <Controller
                name="technologies"
                control={methods.control}
                render={({ field }) => (
                  <MultiValueInput
                    values={field.value || []}
                    onChange={field.onChange}
                    label="Technologies"
                    placeholder="Add technology and press Enter"
                  />
                )}
              />
              {/* Live Link Input */}
              <RHFTextField
                name="liveLink"
                label="Live Link"
                placeholder="https://example.com"
                error={!!errors.liveLink}
                helperText={errors.liveLink?.message}
              />
              {/* Source Code Input */}
              <RHFTextField
                name="surceCode"
                label="Source Code"
                placeholder="https://github.com/example/project"
                error={!!errors.surceCode}
                helperText={errors.surceCode?.message}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <ProjectFormSectionTitle title="Images & Gallery" />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{
            p: 3, mb: 3,
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          }}>
            <Stack spacing={3}>
              <RHFUpload
                onDrop={handleDropMainImage}
                name="img"
                helperText="Upload main image"
                sx={{ bgcolor: '#D0D0D7 !important', borderRadius: 1, border: `1px solid ${theme.palette.primary.main} !important` }}
              />
              {/* Gallery Image Upload */}
              <RHFUpload
                name="gallery"
                multiple
                onDrop={handleDropGalleryImages}
                onRemove={onRemoveImage}
                helperText="Upload gallery images"
                sx={{ bgcolor: '#D0D0D7 !important', borderRadius: 1, border: `1px solid ${theme.palette.primary.main} !important` }}
              />
            </Stack>

          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={methods.formState.isSubmitting}
            >
              {!currentProject ? 'Create Project' : 'Save Changes'}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
