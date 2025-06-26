import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';

export const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
