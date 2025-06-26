import { useDropzone } from 'react-dropzone';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
//
import Iconify from '../iconify';
//
import { UploadProps } from './types';

// ----------------------------------------------------------------------

export default function UploadBox({
  placeholder,
  error,
  disabled,
  preview,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });

  const hasError = isDragReject || error;

  return (
    <Box
      {...getRootProps()}
      sx={{
        m: 0.5,
        width: 64,
        height: 64,
        flexShrink: 0,
        display: 'flex',
        borderRadius: 1,
        cursor: 'pointer',
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        background: `url(${preview})`,
        backgroundSize: 'cover',
        border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        ...(isDragActive && {
          opacity: 0.72,
        }),
        ...(disabled && {
          opacity: 0.48,
          pointerEvents: 'none',
        }),
        ...(hasError && {
          color: 'error.main',
          bgcolor: 'error.lighter',
          borderColor: 'error.light',
        }),
        '&:hover': {
          opacity: 0.72,
        },
        ...sx,
      }}
    >
      <input type="image" accept="image/*" {...getInputProps()} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Iconify icon="eva:cloud-upload-fill" width={28} />
        {placeholder}
      </Box>
    </Box>
  );
}
