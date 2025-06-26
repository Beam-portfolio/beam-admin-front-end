import sumBy from 'lodash/sumBy';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import ProjectsList from './projects-list';
// types
//

// ----------------------------------------------------------------------



export default function LastProjectsView({ lastProjects }: any) {
  return (
    <Stack
      direction="column"
      sx={{
        mb: 0,
        mt: 0,
        borderRadius: 2,
      }}
    >
      <Typography sx={{ p: 2 }} variant="h5">
        Latest Projects
      </Typography>

      <Divider />

      <ProjectsList projects={lastProjects} />
    </Stack>
  );
}
