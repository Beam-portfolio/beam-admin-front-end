import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fData } from 'src/utils/format-number';
//
import Iconify from '../iconify';
import { varFade } from '../animate';
import FileThumbnail, { fileData } from '../file-thumbnail';
//
import { UploadProps } from './types';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function MultiFilePreview({ thumbnail, files, onRemove, sx }: UploadProps) {
  return (
    <AnimatePresence initial={false}>
      <Stack
        direction={'row'}
        spacing={2}
        alignItems={'center'}
        justifyContent={'center'}
        flexWrap={'wrap'}
      >
        {files?.map((file) => {
          const { key, name = '', size = 0 } = fileData(file);

          if (thumbnail) {
            return (
              <Stack
                key={key}
                component={m.div}
                {...varFade().inUp}
                alignItems="center"
                display="inline-flex"
                justifyContent="center"
                sx={{
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.25,
                  overflow: 'hidden',
                  position: 'relative',
                  border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                  ...sx,
                }}
              >
                <FileThumbnail
                  tooltip
                  imageView
                  file={file}
                  sx={{ position: 'absolute' }}
                  imgSx={{ position: 'absolute' }}
                />

                {onRemove && (
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      p: 0.5,
                      top: 4,
                      right: 4,
                      position: 'absolute',
                      color: 'common.white',
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                      },
                    }}
                  >
                    <Iconify icon="mingcute:close-line" width={14} />
                  </IconButton>
                )}
              </Stack>
            );
          }

          return (
            <Stack
              key={key}
              component={m.div}
              {...varFade().inUp}
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                my: 1,
                py: 1,
                px: 1.5,
                borderRadius: 1,
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                width: '45%',
                position: 'relative',
                ...sx,
              }}
            >
              <Box sx={{ width: '100%', height: 140 }} component="img" src={file as string} />

              {onRemove && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: 'common.white',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                    '&:hover': { bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72) },
                  }}
                  size="small"
                  onClick={() => onRemove(file)}
                >
                  <Iconify icon="mingcute:close-line" width={16} />
                </IconButton>
              )}
            </Stack>
          );
        })}
      </Stack>
    </AnimatePresence>
  );
}
