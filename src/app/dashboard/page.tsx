import { RoleBasedGuard } from '@/auth/guard';
import OneView from 'src/sections/dashboard/view/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Home',
};

export default function Page() {

  return <RoleBasedGuard roles={['ADMIN']}>
      <OneView />
</RoleBasedGuard>;
}
