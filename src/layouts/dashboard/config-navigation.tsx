import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  projects: <Icon icon="si:projects-alt-line" width="20" height="20" />,
  dashboard: <Icon icon="carbon:analytics" width="20" height="20" />,
  service: <Icon icon="material-symbols:room-service-outline" width="20" height="20" />,
  persons: <Icon icon="fontisto:persons" width="20" height="20" />,
  analytics: (
    <Icon
      icon="streamline:money-graph-analytics-business-product-graph-data-chart-analysis"
      width="20"
      height="20"
    />
  ),
  settings: <Icon icon="carbon:settings" width="20" height="20" />,
  testimonial: <Icon icon="dashicons:testimonial" width="20" height="20" />,
  mail: icon('ic_mail'),
};

// ----------------------------------------------------------------------

export function useNavData() {

  return useMemo(
    () => [
      // OVERVIEW
      {
        subheader: 'MANAGEMENT',
        items: [
          { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
          { title: 'Projects', path: paths.dashboard.projects.root, icon: ICONS.projects },
          { title: 'Services', path: paths.dashboard.services, icon: ICONS.service },
          {title: 'Testimonials', path: paths.dashboard.testimonials, icon: ICONS.testimonial},
          { title: 'Mail', path: paths.dashboard.mail, icon: ICONS.mail },
          { title: 'Settings', path: paths.dashboard.settings.admin, icon: ICONS.settings },
        ],
      },
    ],
    []
  );

}
