import { RoleBasedGuard } from '@/auth/guard';
import SettingsView from '@/sections/settings/settingsView';

export const metadata = {
  title: 'Dashboard: Settings',
};

export default function SettingsPage() {
  return (
    <RoleBasedGuard roles={['ADMIN']}>
      <SettingsView />
    </RoleBasedGuard>
  );
}
