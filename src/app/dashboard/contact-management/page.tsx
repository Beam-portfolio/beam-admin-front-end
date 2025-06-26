import { RoleBasedGuard } from '@/auth/guard';
import { Typography } from '@mui/material';

export default function ContactPage() {

  return <RoleBasedGuard roles={['ADMIN']}>
    <Typography>this is contact managment</Typography>
  </RoleBasedGuard>

}
