'use client'
// @mui
import { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};
import { useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useAuthContext } from '../hooks';

export default function RoleBasedGuard({ hasContent, roles, children, sx }: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { user } = useAuthContext();
  const router = useRouter();

  const currentRole = user?.role?.name;

  useEffect(() => {
    if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
      router.replace('/');
    }
  }, [roles, currentRole, router]);

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return null;
  }

  return <>{children}</>;
}
